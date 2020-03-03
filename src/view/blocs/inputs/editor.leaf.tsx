import React from 'react'
import { Text } from 'slate'

export type LeafAttributes = Partial<{
  bold: true,
  code: true,
  italic: true,
  underline: true,
  strikethrough: true,
}>

export interface LeafProps {
  attributes: any
  children: React.ReactElement
  leaf: Text & LeafAttributes
}

export const Leaf = ( { attributes, children, leaf }: LeafProps ) => {
  if( leaf.bold ) {
    children = <strong>{children}</strong>
  }
  if( leaf.code ) {
    children = <code>{children}</code>
  }
  if( leaf.italic ) {
    children = <em>{children}</em>
  }
  if( leaf.underline ) {
    children = <u>{children}</u>
  }
  if( leaf.strikethrough ) {
    children = <del>{children}</del>
  }
  return <span {...attributes}>{children}</span>
}
