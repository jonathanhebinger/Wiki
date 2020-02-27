import * as ReactRedux from 'react-redux'
import { Dispatch } from 'src/types'

export const useDispatch = ReactRedux.useDispatch as () => Dispatch
