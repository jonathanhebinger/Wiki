import { ActionAtomic, ActionPayload } from 'src/types'

export function createAction<Type extends string>( type: Type ): () => ActionAtomic<Type>
export function createAction<Type extends string, Builder extends ( ...args: any[] ) => any>(
  type: Type,
  builder: Builder,
): ( ...args: Parameters<Builder> ) => ActionPayload<Type, ReturnType<Builder>>
export function createAction( type: any, builder?: any ) {
  return ( ...args: any ) => builder ? { type, payload: builder( ...args ) } : { type }
}
