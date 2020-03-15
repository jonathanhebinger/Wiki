import React from 'react'
import { EDITOR_ELEMENT_LIST, editorElementRendererList } from './list'

export const EDITOR_ELEMENT = {
  PARAGRAPH: 'paragraph',
  LIST: EDITOR_ELEMENT_LIST,
}

export interface EditorElementProps {
  attributes: any
  children: React.ReactElement
  element: any
}

export const EditorElement = ( props: EditorElementProps ) => {
  const { attributes, children, element } = props
  switch( element.type ) {/*
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>*/
    case EDITOR_ELEMENT.LIST.TYPE:
      return editorElementRendererList( props )
    case EDITOR_ELEMENT.LIST.ITEM:
      return <li {...attributes}>{children}</li>
    case EDITOR_ELEMENT.PARAGRAPH:
    default:
      return <p {...attributes}>{children}</p>
  }
}
