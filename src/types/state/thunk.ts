import { AllActions } from 'src/state/actions'
import { IState } from 'src/types'

export type Thunk<T = void> = ( dispatch: Dispatch, getState: () => IState ) => T

export type Dispatch<Action extends AllActions | Thunk = AllActions> = (
  action: AllActions | Thunk,
) => Action extends Thunk ? ReturnType<Action> : any
