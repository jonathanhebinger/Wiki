import { createAction } from '@reduxjs/toolkit'
import { NOTE_CLOSE, NOTE_CREATE, NOTE_DELETE, NOTE_OPEN, NOTE_SAVE } from 'src/constants'
import { INote } from 'src/types'

export const noteActionCreate = createAction( NOTE_CREATE, ( title?: string ) => ( { payload: title } ) )
export const noteActionOpen = createAction( NOTE_OPEN, ( id: string ) => ( { payload: id } ) )
export const noteActionClose = createAction( NOTE_CLOSE, ( id: string ) => ( { payload: id } ) )
export const noteActionSave = createAction( NOTE_SAVE, ( note: INote ) => ( { payload: note } ) )
export const noteActionDelete = createAction( NOTE_DELETE, ( id: string ) => ( { payload: id } ) )
