import constate from 'constate'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noteActionOpen } from 'src/actions'
import { getSelected } from 'src/selectors'

export const [ NoteSelectionProvider, useNoteSelectionContext ] = constate( () => {
  const dispatch = useDispatch()
  const selected = useSelector( getSelected )

  const open = useCallback( ( id: string ) => dispatch( noteActionOpen( id ) ), [ dispatch ] )

  return { selected, open }
} )
