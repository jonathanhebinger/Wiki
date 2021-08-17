export interface SlateElementRendererProps<Element> {
  attributes: any
  children: React.ReactElement
  element: Element
}

export type SlateElementRenderer<Element> = ( props: SlateElementRendererProps<Element> ) => React.ReactElement
