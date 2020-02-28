import * as ReactRedux from 'react-redux'
import { IState } from 'src/types/models'

export const useSelector = ReactRedux.useSelector as <T>( selector: ( state: IState ) => T ) => T
