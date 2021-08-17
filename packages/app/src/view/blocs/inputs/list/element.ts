import { Element } from 'slate'

const TYPE = 'list'
const ITEM = 'list-item'
const ORDERED = 'ordered'
const UNORDERED = 'unordered'
const VARIANT = {
  ORDERED,
  UNORDERED,
}

export const EDITOR_ELEMENT_LIST = {
  TYPE,
  ITEM,
  VARIANT,
}

interface ListBase extends Element {
  type: typeof TYPE
  variant: typeof ORDERED | typeof UNORDERED
}

interface ListOrdered extends ListBase {
  variant: typeof ORDERED
  style: 'upper-roman' | 'lower-alpha'
}

interface ListUnordered extends ListBase {
  variant: typeof UNORDERED
  style: 'circle' | 'square'
}

export type EditorElementList = ListOrdered | ListUnordered

export type EditorElementListDetails = Pick<EditorElementList, 'variant'> & Partial<Pick<EditorElementList, 'style'>>

export interface EditorElementListItem extends Element {
  type: typeof ITEM
}
