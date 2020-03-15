# RoadMap

- 1 : Notes list + text editor + search and group by title
- 2 : Tags system + search and group by tags
- 3 : Graph-like file system + roots notes + orphans highlight
- 4 : Text fields for additional data + search and group by fields
- 5 : Fields of any basic type through tags + search and group by fields

[Slate](view/slate/README.md)

---

## Components

### Inputs

#### Editor - Slate

_Blocks :_

- Structure
  - Paragraph
  - [Titles](#slate-block-list)
  - Index : top of the file block
  - [List](#slate-block-list)
  - NestedList
    - content : Paragraph + List
  - Table
    - content : \*
    - html : table
- Metadata : metadata blocks don't contain other blocks and display only their internal data.
  - Code
  - Image
  - Inclusion

---

### Slate Block Title

- Content : Inline[]
- Html : h1-h6

---

### Slate Block List

- Content : Inline[] | NestedList
- Html : ul/ol + li[]
- Actions :
  - insert :
    - path : if Paragraph, transform, else insert after
    - selection :
      - get selected children of lowest common ancestor
      - for each, if Paragraph, replace
      - for each, if successive Lists, merge
  - update : set type and style
    - path : set at path if List
    - selection :
      - lowest common ancestor
      - if List set it
      - else set the selected List children
  - delete :
