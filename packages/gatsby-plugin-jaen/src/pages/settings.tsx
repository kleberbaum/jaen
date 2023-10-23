import {
  PageConfig,
  useAuthenticationContext,
  useNotificationsContext
} from '@atsnek/jaen'
import {PageProps} from 'gatsby'
import React from 'react'

import {Settings} from '../components/Settings'

const SettingsPage: React.FC<PageProps> = () => {
  const authentication = useAuthenticationContext()

  const {toast} = useNotificationsContext()

  return (
    <Settings
      data={{
        username: authentication.user?.username,
        details: authentication.user?.details,
        emails: authentication.user?.emails
      }}
      onAccountFormSubmit={async data => {
        try {
          await authentication.updateDetails(data.details)

          toast({
            title: 'Account updated',
            status: 'success'
          })
        } catch (e) {
          toast({
            title: 'Error',
            description: e.message,
            status: 'error'
          })
        }
      }}
      onEmailFormSubmit={async data => {
        try {
          await authentication.addEmail(data.emailAddress)

          toast({
            title: 'Email added',
            status: 'success'
          })
        } catch (e) {
          toast({
            title: 'Error',
            description: e.message,
            status: 'error'
          })
        }
      }}
      onEmailRemove={async emailId => {
        try {
          await authentication.removeEmail(emailId)

          toast({
            title: 'Email removed',
            status: 'success'
          })
        } catch (e) {
          toast({
            title: 'Error',
            description: e.message,
            status: 'error'
          })
        }
      }}
      onPasswordFormSubmit={async data => {
        try {
          await authentication.updatePassword(data.password)

          toast({
            title: 'Password updated',
            status: 'success'
          })
        } catch (e) {
          toast({
            title: 'Error',
            description: e.message,
            status: 'error'
          })
        }
      }}
      onEmailConfirmationResend={async emailId => {
        try {
          await authentication.emailConfirmationResend(emailId)

          toast({
            title: 'Verification email sent',
            status: 'success'
          })
        } catch (e) {
          toast({
            title: 'Error',
            description: e.message,
            status: 'error'
          })
        }
      }}
    />
  )
}

export default SettingsPage

export const pageConfig: PageConfig = {
  label: 'Settings',
  icon: 'FaUserCog',
  menu: {
    order: 100,
    type: 'user'
  },
  auth: {
    isRequired: true
  },
  layout: {
    name: 'jaen'
  }
}

export {Head} from '@atsnek/jaen'
