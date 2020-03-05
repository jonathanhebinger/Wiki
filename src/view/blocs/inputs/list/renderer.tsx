import React from 'react'
import { Editor, ReactEditor, Transforms } from '../editor'
import { EDITOR_ELEMENT } from '../element'
import { SlateElementRenderer } from '../renderer'
import { EDITOR_ELEMENT_LIST, EditorElementList } from './element'

export const editorElementRendererList: SlateElementRenderer<EditorElementList> =
  ( { attributes, children, element } ) => {
    if( element.style ) {
      attributes.style = Object.assign( attributes.style || {}, { 'list-style-type': element.style } )
    }
    switch( element.variant ) {
      case "ordered":
        return <ol {...attributes}>{children}</ol>
      case "unordered":
      default:
        return <ul {...attributes}>{children}</ul>
    }
  }

export const editorIsList = ( editor: ReactEditor ) => {
  const [ match ] = Editor.nodes( editor, {
    match: node => node.type === EDITOR_ELEMENT_LIST.TYPE,
  } )
  return !!match
}

export const editorInsertList = ( editor: ReactEditor, format: string ) => {
  const isActive = editorIsList( editor )

  Transforms.unwrapNodes( editor, {
    match: node => EDITOR_ELEMENT_LIST.TYPE === node.type,
    split: true,
  } )

  const type = isActive
    ? EDITOR_ELEMENT.PARAGRAPH
    : EDITOR_ELEMENT_LIST.ITEM
  Transforms.setNodes( editor, { type } )
  if( !isActive ) {
    Transforms.wrapNodes( editor, {
      type: format,
      children: [],
    } )
  }

}

export const editorRemovetList = ( editor: ReactEditor, format: string ) => {
  const isActive = editorIsList( editor )

  Transforms.unwrapNodes( editor, {
    match: node => EDITOR_ELEMENT_LIST.TYPE === node.type,
    split: true,
  } )

  const type = isActive
    ? EDITOR_ELEMENT.PARAGRAPH
    : EDITOR_ELEMENT_LIST.ITEM
  Transforms.setNodes( editor, { type } )
  if( !isActive ) {
    Transforms.wrapNodes( editor, {
      type: format,
      children: [],
    } )
  }

}
