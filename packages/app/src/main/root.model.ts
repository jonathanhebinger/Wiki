import { NavModel } from '../nav/nav.model'
import { MainModel } from './state/main.model'

export interface RootModel {
  main: MainModel
  nav: NavModel
}
