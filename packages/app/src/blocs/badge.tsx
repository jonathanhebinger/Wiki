import { surface_className } from 'src/blocs/surface'

export interface Badge_Props {
  className?: string
  label: React.ReactNode
  onClick?: () => void
  onDelete?: () => void
}
export function Badge({
  className = '',
  label,
  onClick,
  onDelete,
}: Badge_Props) {
  return (
    <div className={`${SPACING} ${SURFACE} ${className}`} onClick={onClick}>
      {label}
      {onDelete && (
        <span className="ml-2" onClick={onDelete}>
          X
        </span>
      )}
    </div>
  )
}

const SPACING = 'p-2'
const SURFACE = surface_className({ border: 'rounded', shadow: 'normal' })
