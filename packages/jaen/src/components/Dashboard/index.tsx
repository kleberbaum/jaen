import {Drawer, DrawerContent, DrawerOverlay} from '@chakra-ui/react'
import * as React from 'react'
import {IconType} from 'react-icons'

import SidebarWithHeader, {
  LinkItemProps,
  SidebarItemKeys
} from './SidebarWithHeader'

const Dashboard: React.FC<{
  tabs: {
    [key: string]: {
      name: string
      icon: any
      element: React.ReactNode
    }
  }
  isOpen: boolean
  onClose: () => void
  /**
   * The callback to be called when the user clicks the editing button.
   */
  onEditingMode: () => void
  /**
   * The callback to be called when the user clicks the discard button.
   */
  onDiscardChanges: () => void
  onPublish: () => void
}> = ({tabs, isOpen, onClose, onEditingMode, onDiscardChanges, onPublish}) => {
  const btnRef = React.useRef<any>(null)

  const [selectedTab, setSelectedTab] = React.useState<SidebarItemKeys | null>(
    null
  )

  const sidebarItems = React.useMemo(
    () =>
      Object.fromEntries(
        Object.entries(tabs).map(([k, {element, ...v}]) => [k, v])
      ),
    [tabs]
  )

  return (
    <Drawer
      isFullHeight={true}
      isOpen={isOpen}
      placement="right"
      size="6xl"
      onClose={onClose}
      finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent>
        <SidebarWithHeader
          onCloseDashboard={onClose}
          defaultSidebarItem={Object.keys(sidebarItems)[0]}
          sidebarItems={sidebarItems}
          onSidebarItemClick={id => setSelectedTab(id)}>
          {selectedTab ? tabs[selectedTab].element : <p>Default tab.</p>}
        </SidebarWithHeader>
      </DrawerContent>
    </Drawer>
  )
}

export default React.memo(Dashboard)
