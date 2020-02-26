import { AppAction } from 'src/actions'
import { IState } from 'src/types'

export type Thunk = ( dispatch: Dispatch, getState: () => IState ) => T

export type Dispatch = ( action: AppAction | Thunk ) => any

// export type Thunk<ReturnType = void> = ThunkAction<ReturnType, IState, never, Action>
