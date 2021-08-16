import { Surface } from 'src/blocs/surface'

export type Modal_Props = {
  children?: React.ReactNode
  className?: string
  bgClassName?: string
  opened?: boolean
  onClickOutside?: () => void
  htmlProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}

const BG_POSITION = 'absolute -inset-0 z-10' //tw
const BG_BACKGROUND = 'bg-gray-500 bg-opacity-25' //tw
const BG_FLEX = 'flex items-center justify-center' //tw

const BG_CLASS = `${BG_POSITION} ${BG_BACKGROUND} ${BG_FLEX}`

export function Modal({
  className = '',
  bgClassName = '',
  children,
  opened = false,
  onClickOutside,
  htmlProps,
}: Modal_Props) {
  if (!opened) return null

  return (
    <div
      className={`${BG_CLASS} ${bgClassName} transform ${
        opened ? 'scale-100' : 'scale-0'
      }`}
      onClick={onClickOutside}
    >
      <Surface
        className={`bg-white ${className}`}
        htmlProps={{
          ...htmlProps,
          onClick: e => {
            htmlProps?.onClick && htmlProps.onClick(e)
            e.stopPropagation()
          },
        }}
      >
        {children}
      </Surface>
    </div>
  )
}
