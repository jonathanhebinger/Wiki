/*
declare namespace V2 {
  export type NodeId = Id<'node'>

  export interface Node {
    id: NodeId
    title: string
    tags: string[]
    content: Block[]
  }

  export interface Block {
    type: 'block'
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
    content: InlineContent[]
  }
  export type InlineContent = Decorate | Text
  export interface Decorate {
    type: 'decorate'
    variant: 'bold' | 'italic' | 'underline' | 'strikethrough'
    content: InlineContent[]
  }
  export interface Text {
    type: 'text'
    text: string
  }

  export interface App {
    nodes: Node[]
    searchBy: {
      title(title: string): Node[]
      tag(tag: string): Node[]
      content(tag: string): Node[]
    }
  }
}

declare namespace V3 {
  export type NodeId = Id<'node'>

  export interface Node {
    id: NodeId
    title: string
    tags: string[]
    content: Block[]
  }

  export type Block = HtmlBlock | List
  export interface HtmlBlock extends Omit<V2.Block, 'content'> {
    type: 'block'
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
    content: InlineContent[]
  }
  export type List = { type: 'list' } & (
    | { variant: 'nodes'; nodes: Node['id'][] }
    | { variant: 'tag'; tag: string }
  )

  export type InlineContent = V2.InlineContent | Link

  export interface Link {
    type: 'link'
    to: LinkToHref | LinkToNode
  }
  export interface LinkToHref {
    type: 'href'
    href: string
  }
  export interface LinkToNode {
    type: 'node'
    node: Node['id']
  }

  export interface App extends V1.App {}
}
*/
export type Id<Name extends string> = string & { name?: Name }
