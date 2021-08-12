import './index.css'

import ReactDOM from 'react-dom'
import { useNode } from 'src/node/context'

import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

function X_Page() {
  return (
    <div className="flex">
      <div>
        <X_Node_About></X_Node_About>
        <X_Node_Parents></X_Node_Parents>
      </div>
      <div className="flex">
        <X_Node_Children></X_Node_Children>
      </div>
    </div>
  )
}

function X_Node_About() {
  return null
}
function X_Node_Parents() {
  const { parents, parents$remove } = useNode()

  const badges = parents.map(parent => {
    return (
      <X_Badge
        className="m-2"
        label={parent.name}
        onClick={() => {}}
        onDelete={() => parents$remove(parent)}
      />
    )
  })

  return <div className="flex flex-row">{badges}</div>
}
function X_Node_Children() {
  return null
}

interface X_Badge_Props {
  className?: string
  label: React.ReactNode
  onClick?: () => void
  onDelete?: () => void
}
function X_Badge({ className = '', label, onClick, onDelete }: X_Badge_Props) {
  return (
    <div className={'border rounded p-2 ' + className} onClick={onClick}>
      {label}
      {onDelete && (
        <span className="ml-2" onClick={onDelete}>
          X
        </span>
      )}
    </div>
  )
}
