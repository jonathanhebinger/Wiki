import { useNodeContext } from '../context'
import { NodeTag } from './node.tag'
import { NodeTagAdd } from './node.tag.add'

export function NodeTagList() {
  const { tags, handleTagRemove } = useNodeContext()

  const tagsElem = tags.map(tag => {
    function handleDelete() {
      handleTagRemove(tag.id)
    }

    return <NodeTag key={tag.id} tag={tag.name} onDelete={handleDelete} />
  })

  tagsElem.push(<NodeTagAdd key="tag.add" />)

  return <div className="flex space-x-2">{tagsElem}</div>
}
