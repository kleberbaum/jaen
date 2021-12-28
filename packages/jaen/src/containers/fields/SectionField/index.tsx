import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AddIcon,
  DeleteIcon,
  DragHandleIcon,
  CopyIcon
} from '@chakra-ui/icons'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Box,
  ButtonGroup,
  IconButton,
  Skeleton
} from '@chakra-ui/react'
import deepmerge from 'deepmerge'
import * as React from 'react'

import SectionAddPopover from '../../../components/popovers/SectionAdd'
import SectionManagePopover from '../../../components/popovers/SectionManage'
import {useAppDispatch, useAppSelector} from '../../../store'
import {section_add} from '../../../store/slices/pagesSlice'
import {withRedux} from '../../../store/withRedux'
import {merge} from '../../../utils/merge'
import {useJaenPageContext} from '../../../utils/providers/JaenPageProvider'
import {
  JaenSectionProvider,
  useJaenSectionContext
} from '../../../utils/providers/JaenSectionProvider'
import {
  JaenConnection,
  JaenPage,
  JaenSectionData,
  JaenSectionOptions,
  PopoverProps
} from '../../../utils/types'

interface SectionField {
  name: string // chapterName
  displayName: string
  sections: JaenConnection<{}, JaenSectionOptions>[]
}

const SectionField = ({name, displayName, sections}: SectionField) => {
  const jaenSection = useJaenSectionContext()

  if (jaenSection) {
    name = `${jaenSection.chapterName}.${name}`
  }

  console.log('chapterName', name)

  const dispatch = useAppDispatch()

  // sections to dictionary with key as section name
  const sectionsDict = sections.reduce<
    Record<
      string,
      {
        Component: JaenConnection<{}, JaenSectionOptions>
        options: JaenSectionOptions
      }
    >
  >(
    (acc, Section) => ({
      ...acc,
      [Section.options.name]: {
        Component: Section,
        options: Section.options
      }
    }),
    {}
  )

  const {staticJaenPage} = useJaenPageContext()

  const staticChapter = staticJaenPage?.chapters?.[name]

  const dynamicChapter = useAppSelector(
    state => {
      const page = state.pages.find(p => p.id === staticJaenPage?.id)

      return page?.chapters?.[name]
    },
    (l, r) => {
      if (!l || !r) {
        return false
      }

      const shouldUpdate =
        JSON.stringify(Object.keys(l.sections)) !==
        JSON.stringify(Object.keys(r.sections))

      if (shouldUpdate) {
        return false
      }

      for (const key in l.sections) {
        // TODO: check if the section is deleted
        // if (l.sections[key].deleted !== r.sections[key].deleted) {
        //   return false
        // }
      }

      return true
    }
  )

  const chapter = deepmerge(staticChapter || {}, dynamicChapter || {})

  console.log('chapter', chapter)

  const handleSectionAppend = React.useCallback(
    (sectionName: string, id: string, ptrNext: string | null) => {
      dispatch(
        section_add({
          pageId: staticJaenPage?.id!, // TODO: Change to static or dynamic slug
          chapterName: name,
          sectionName,
          between: [
            {
              ...chapter.sections[id],
              id
            },
            ptrNext
              ? {
                  ...chapter.sections[ptrNext],
                  id: ptrNext
                }
              : null
          ]
        })
      )
    },
    []
  )

  const handleSectionPrepend = React.useCallback(
    (sectionName: string, id: string, ptrPrev: string | null) => {
      dispatch(
        section_add({
          pageId: staticJaenPage?.id!, // TODO: Change to static or dynamic slug
          chapterName: name,
          sectionName,
          between: [
            ptrPrev
              ? {
                  ...chapter.sections[ptrPrev],
                  id: ptrPrev
                }
              : null,
            {
              ...chapter.sections[id],
              id
            }
          ]
        })
      )
    },
    []
  )

  const renderedSections = () => {
    const rendered = []

    console.log('rerender sections')

    let ptrHead = chapter.ptrHead

    if (!ptrHead || Object.keys(chapter.sections).length === 0) {
      return (
        <SectionAddPopover
          disabled={false}
          header={
            <>
              Add to <strong>{displayName}</strong>
            </>
          }
          sections={sections.map(s => ({
            name: s.options.name,
            displayName: s.options.displayName
          }))}
          onSelect={name => alert(name)}>
          <Box>
            <Skeleton h="100" />
          </Box>
        </SectionAddPopover>
      )
    }

    while (ptrHead) {
      const section: JaenSectionData | undefined = chapter.sections[ptrHead]
      if (sectionsDict[section.name]) {
        const {Component, options} = sectionsDict[section.name]

        const element = (
          <SectionManagePopover
            key={ptrHead}
            id={ptrHead}
            ptrPrev={section.ptrPrev}
            ptrNext={section.ptrNext}
            header={options.displayName}
            disabled={false}
            onAppend={(id, ptrNext) =>
              handleSectionAppend(section.name, id, ptrNext)
            }
            onPrepend={(id, ptrPrev) =>
              handleSectionPrepend(section.name, id, ptrPrev)
            }
            onDelete={() => null}
            trigger={
              <Box>
                <JaenSectionProvider
                  key={ptrHead}
                  chapterName={name}
                  sectionId={ptrHead}>
                  <Component />
                </JaenSectionProvider>
              </Box>
            }
          />
        )

        rendered.push(element)
      }

      ptrHead = section.ptrNext
    }

    return rendered
  }

  return <>{renderedSections()}</>
}

export default withRedux(SectionField)
