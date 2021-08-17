import { Note } from './node'

export type TextNode = TextNode.Any
export namespace TextNode {
  export interface Text {
    type: 'text'
    text: string
  }
  export interface Variable {
    type: 'variable'
    variable: string
  }
  export interface Link {
    type: 'link'
    link: Note['id']
    name: string
  }

  export namespace Decorator {
    export interface Base {
      type: string
      content: Inline
    }

    export interface Bold extends Base {
      type: 'b'
    }
    export interface Italic extends Base {
      type: 'i'
    }
    export interface Underline extends Base {
      type: 'u'
    }
    export interface Strikethrough extends Base {
      type: 's'
    }

    export interface Size extends Base {
      type: 'size'
      size: number
    }
    export interface Font extends Base {
      type: 'font'
      font: string
    }
    export interface Color extends Base {
      type: 'color'
      color: string
    }

    export type Any =
      | Text
      | Variable
      | Bold
      | Italic
      | Underline
      | Strikethrough
      | Size
      | Font
      | Color
  }

  export type Inline = Text | Variable | Link | Decorator.Any

  export interface Root {
    type: 'root'
    content: TextNode[]
  }

  export type Block = Block.Any
  export namespace Block {
    export interface Base {
      type: string
      content: TextNode[]
    }

    export interface Html extends Base {
      type: 'html'
      html: string
    }
    export interface Html extends Base {
      type: 'html'
      html: string
    }

    export type Any = Html
  }

  export type Any = Inline | Block
}
