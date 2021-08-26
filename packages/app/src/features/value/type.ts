import { Data, Type } from 'src/features/node/type'

export interface ValueProps {
  Label: React.ReactNode
  value: any
  type: Type.Any
  onChange: (value: Data.Any) => void
}
