import * as ReactRedux from 'react-redux'
import { Dispatch } from 'src/types/state'

export const useDispatch = ReactRedux.useDispatch as () => Dispatch
