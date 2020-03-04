import React from 'react'

export const ElementType = {
  Paragraph: 'paragraph',
  List: {
    Numbered: 'list-numbered',
    Bulleted: 'list-bulleted',
    Item: 'list-item',
  },
}

export interface ElementProps {
  attributes: any
  children: React.ReactElement
  element: any
}

export const Element = ( { attributes, children, element }: ElementProps ) => {
  switch( element.type ) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case ElementType.List.Bulleted:
      return <ul {...attributes}>{children}</ul>
    case ElementType.List.Numbered:
      return <ol {...attributes}>{children}</ol>
    case ElementType.List.Item:
      return <li {...attributes}>{children}</li>
    case ElementType.Paragraph:
    default:
      return <p {...attributes}>{children}</p>
  }
}
