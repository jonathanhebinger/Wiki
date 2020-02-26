import { useState } from 'react'

export const useSet = <T>( initialValue: T[] ) => {
  const [ set, setSet ] = useState( new Set( initialValue ) )
  return Object.assign( set, {
    add( value: T ) {
      const res = set.add( value )
      setSet( new Set( set ) )
      return res
    },
    delete( value: T ) {
      const res = set.delete( value )
      setSet( new Set( set ) )
      return res
    },
    clear() {
      setSet( new Set() )
    },
  } )
}
