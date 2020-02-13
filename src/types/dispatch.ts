import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { IState } from 'src/types'

export type Dispatch = ThunkDispatch<IState, never, Action>
