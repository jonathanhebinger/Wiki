# Slate

## Blocks :

- Block
  - Paragraph
  - [Titles](#title)
- Structure
  - Index : top of the file block
  - [List](#list)
  - NestedList
    - content : Paragraph + List
  - Table
    - content : \*
    - html : table
- Metadata : metadata blocks don't contain other blocks and display only their internal data.
  - Code
  - Image
  - Inclusion

## Paragraph

- Content : Inline[]
- Html : p

## Title

- Content : Inline[]
- Html : h1-h6

## List

- Content : [Item](#listitem)[]
- Html : ul/ol
- Actions :
  - insert :
    - path : if Block, transform, else insert after
    - selection :
      - get selected children of lowest common ancestor
      - for each, if Block, replace (if Block empty, delete)
      - for each, if successive similar Lists, merge
  - update : set type and style
    - path : set first list ancestor
    - selection :
      - lowest common ancestor
      - if List set it
      - else set the highest partially selected Lists
  - delete :
    - path : remove first list ancestor, wrap ListItem content in Paragraph (expected for ListNested)
    - selection :
      - if has List as common ancestor
      - same as for path
      - else remove the selected ListItems from the highest selected Lists
- Normalize : if more than one empty ListItem at the end, keep only one, then if not nested, add if necessary empty Paragraph or ListItem if NestedList with focus.

## ListItem

- Content : Inline[] | ListNested
- Html : li
- Actions :
  - move (up, down)
    - path : move
    - selection : if has List as common ancestor move selected children
  - make nested
- Keyboard :
  - enter : split in two ListItems

## ListNested

- Content : Paragraph + List
- Html : none (React.Fragemnt)
- Actions : same as ListItem
- Keyboard :
  - enter :
    - start of Paragraph : new ListItem above in parent
    - in Paragraph :
    - end of Paragraph : new ListItem at start in inner List
- Normalize : merge everything on top to have one Paragraph only
