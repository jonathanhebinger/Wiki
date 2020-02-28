import { ID } from 'src/types/models'

export interface Wrapper<Model extends { id: ID }> { [ index: string ]: Model }
