import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IState } from 'src/types'

export type Thunk<ReturnType = void> = ThunkAction<ReturnType, IState, never, Action>
