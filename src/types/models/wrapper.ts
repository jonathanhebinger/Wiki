import { ID } from 'src/types'

export interface Wrapper<Model extends { id: ID }> { [ index: string ]: Model }
