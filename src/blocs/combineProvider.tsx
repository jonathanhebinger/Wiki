import React from 'react'

interface CombineProviderProps {
  providers: Array<React.FunctionComponent<unknown>>
  children?: React.ReactNode
}

export const CombineProvider = ( { providers, children }: CombineProviderProps ) => {
  return providers.reduce( ( acc, Provider ) => <Provider>{acc}</Provider>, children )
}
