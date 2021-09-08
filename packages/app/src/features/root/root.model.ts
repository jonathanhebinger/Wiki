import { Thunk } from 'easy-peasy'
import { NavModel } from 'src/features/nav/nav.model'

import { TemplatesModel } from '../templates/templates.model'

export type Injections = never

export interface RootModel {
  nav: NavModel
  templates: TemplatesModel

  id$generate: Thunk<RootModel, never, Injections, RootModel, string>
}
