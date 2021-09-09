import { useDataContext } from '../data.context'
import { DataArray } from './data.array'
import { DataObject } from './data.object'
import { DataType } from './type/data.type'

export function DataBlock() {
  const { type } = useDataContext()

  switch (type.type) {
    case 'array':
      return <DataArray />
    case 'object':
      return <DataObject />
    case 'join':
      // return <JoinNode />
      return null
    case 'type':
      return <DataType />
  }

  return null
}

// function JoinNode() {
//   const [, actions] = useNavContext()
//   const { type, draft, $change } = useDataContext<Type.Join, TemplateDataId>()

//   function handleChange([id]: TemplateDataId[]) {
//     id && $change(id)
//   }
//   function handleClick() {
//     actions.open({ type: 'data', template: type.template, data: draft })
//   }

//   const [{ list }] = useTemplatesContext()
//   const data = list
//     .find(template => template.id === type.template)
//     ?.data.find(data => data.id === draft)

//   return (
//     <Shelf>
//       {data && (
//         <Surface
//           className="cursor-pointer"
//           htmlProps={{ onClick: handleClick }}
//         >
//           <Title>
//             <Shelf row>
//               <Icon icon={faLink}></Icon>
//               <div>{data.name}</div>
//             </Shelf>
//           </Title>
//         </Surface>
//       )}
//       {/* <NodeSearch onChange={handleChange} /> */}
//     </Shelf>
//   )
// }
