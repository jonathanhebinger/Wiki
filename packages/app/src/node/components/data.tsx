import { useNode } from 'src/node/context'
import { Type } from 'src/node/type'

export function Node_Data() {
  const { keys } = useNode()

  const Keys = keys.map(key => {
    return (
      <tr className="border-t" key={key.node.id}>
        <td>{key.node.name}</td>
        <td>
          <Value type={key.type} value={key.value} />
        </td>
      </tr>
    )
  })

  return (
    <table className="w-full">
      <tbody>{Keys}</tbody>
    </table>
  )
}

function Value({ type, value }: { value: any; type: Type.Any }) {
  switch (type.type) {
    case 'type':
      return '' + value

    case 'boolean':
      return '' + value
    case 'number':
      return '' + value
    case 'string':
      return value

    case 'array':
      return (
        <div>
          {(value as any[]).map((item, index) => (
            <Value type={type.of} value={item} key={index} />
          ))}
        </div>
      )
    case 'object':
      return (
        <table>
          <tbody>
            {type.keys.map(({ name, type }) => {
              return (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <Value type={type} value={value} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    default:
      return null
  }
}
