import { Paper } from '@material-ui/core'
import React, { useCallback, useMemo, useState } from 'react'
import * as Slate from 'slate'
import { withHistory } from 'slate-history'
import * as ReactSlate from 'slate-react'

import { NodeEditorActionBar } from './editor.action.bar'
import { Leaf } from './editor.leaf'
import { EditorElement } from './element'

export interface EditorProps {
  editing: boolean
  content: string
  onChange: (newContent: string) => void
}

export function Editor({ editing }: EditorProps) {
  const editor = useMemo(() => {
    return withHistory(ReactSlate.withReact(Slate.createEditor()))
  }, [])

  const renderElement = useCallback(props => {
    return <EditorElement {...props} />
  }, [])
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [
        {
          text: 'A line of text in a paragraph.',
        },
      ],
    },
  ])

  const onChange = (newValue: any) => setValue(newValue)

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<any>) => {
      switch (event.key) {
        case 'Enter':
          const nodeEntryItem = Slate.Editor.above(editor, {
            match: node => node.type === 'list-item',
          })

          if (nodeEntryItem) {
            const [item, itemPath] = nodeEntryItem
            const listPath = Slate.Path.parent(itemPath)

            if (Slate.Editor.isEmpty(editor, item)) {
              const next = Slate.Path.next(listPath)

              Slate.Transforms.removeNodes(editor, { at: itemPath })
              Slate.Transforms.insertNodes(
                editor,
                { type: 'paragraph', children: [] },
                { at: next },
              )
              Slate.Transforms.select(editor, next)

              event.preventDefault()
            }
          }
          break
      }
    },
    [editor],
  )

  const [ref, setRef] = useState<any>()

  editor.focus = (path?: Slate.Path) => {
    if (ref && ref.focus) {
      if (path) {
        Slate.Transforms.select(editor, path)
      }
      ref.focus()
    }
  }

  const [info, setInfo] = useState(JSON.stringify(editor.selection))

  const setInfoEvent = () => {
    setInfo(
      JSON.stringify(
        [...Slate.Editor.nodes(editor, { mode: 'highest' })].length,
      ),
    )
  }

  if (editing) {
    const eSetRef = (event: React.FocusEvent<any>) => {
      editor.ref = ref
      setRef(event.target)
    }

    return (
      <ReactSlate.Slate editor={editor} value={value} onChange={onChange}>
        <NodeEditorActionBar />
        <Paper elevation={1}>
          <ReactSlate.Editable
            {...{ ref }}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoFocus
            onKeyDown={onKeyDown}
            onBlur={eSetRef}
            onMouseMove={setInfoEvent}
          />
        </Paper>
        <Paper>{info}</Paper>
      </ReactSlate.Slate>
    )
  } else {
    return (
      <ReactSlate.Slate editor={editor} value={value} onChange={onChange}>
        <ReactSlate.Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly
        />
      </ReactSlate.Slate>
    )
  }
}
