import { NavModel } from '../nav'
import { MainModel } from './state/main.model'

export interface RootModel {
  main: MainModel
  nav: NavModel
}
