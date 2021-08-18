import { useState } from 'react'
import { Collapse } from 'src/blocs/animation/collapse'
import { Divider } from 'src/blocs/divider'
import { Group, GroupItem, GroupLabel } from 'src/blocs/group'
import { useNode } from 'src/node/context'
import { Type } from 'src/node/type'

export function Node_Data() {
  const { keys } = useNode()

  const [collapsed, collapsed$set] = useState(true)

  const Keys = keys.map(key => {
    return (
      <GroupItem className="flex" radius="none" key={key.node.id}>
        <div className="w-1/3 px-2 py-1 self-center">{key.node.name}</div>
        <Divider direction="vertical" />
        <div className="w-2/3 p-2">
          <Value type={key.type} value={key.value} />
        </div>
      </GroupItem>
    )
  })

  function toggle() {
    collapsed$set(!collapsed)
  }

  return (
    <Group border="squared" htmlProps={{ onClick: toggle }}>
      <GroupLabel>Data</GroupLabel>
      <Collapse collapsed={collapsed}>{Keys}</Collapse>
    </Group>
  )
}

function ValueType({ type, value }: { value: Type.Any; type: Type.Type }) {
  switch (type.type) {
  }
}

function Value({ type, value }: { value: any; type: Type.Any }) {
  switch (type.type) {
    case 'type':
      return (
        <Group spacing="sm">
          <GroupItem className="px-2 py-1">A</GroupItem>
        </Group>
      )

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
