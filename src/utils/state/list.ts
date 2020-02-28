import _ from 'lodash'
import { ID } from 'src/types/models'

export function add<State extends { id: ID }>(
  state: State[],
  data: State | State[],
) {
  data = Array.isArray( data ) ? data : [ data ]
  data.forEach( item => {
    state.push( item )
  } )
}

export function find<State extends { id: ID }>( state: State[], id: ID ) {
  const result = state.find( item => item.id === id )
  if( result ) {
    return result
  }
  throw new Error()
}

export function findOpt<State extends { id: ID }>( state: State[], id: ID ) {
  return state.find( item => item.id === id )
}

export function remove<State extends { id: ID }>( state: State[], id: ID ) {
  return _.remove( state, item => item.id === id )
}
