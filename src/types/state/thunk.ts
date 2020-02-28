import { IState } from 'src/types/models'
import { AllActions } from 'src/types/state/actions'

export type Thunk<T = void> = ( dispatch: Dispatch, getState: () => IState ) => T

export type Dispatch<Action extends AllActions | Thunk = AllActions> = (
  action: AllActions | Thunk,
) => Action extends Thunk ? ReturnType<Action> : any
