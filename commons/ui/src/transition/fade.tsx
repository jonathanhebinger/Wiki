import { useEffect, useMemo, useState } from 'react'

import { mergeClassNames } from '../util/class'
import { BaseProps } from '../util/type'

export type FadeState = 'SHOWN' | 'FADING' | 'HIDDEN' | 'UNFADING'
export type FadeProps = BaseProps<{ faded: boolean }>

function getClass(state: FadeState, className: string): string {
  return mergeClassNames(
    'transition-opacity', //tw
    getStateClass(state),
    className,
  )
}
function getStateClass(state: FadeState): string {
  switch (state) {
    case 'SHOWN':
      return '' //tw
    case 'FADING':
      return 'opacity-0' //tw
    case 'HIDDEN':
      return 'hidden' //tw
    case 'UNFADING':
      return 'opacity-100'
  }
}

export default function Fade({
  faded: hidden,
  children,
  className = '',
}: FadeProps) {
  const [state, setState] = useState<FadeState>(hidden ? 'HIDDEN' : 'SHOWN')

  useEffect(() => {
    if (hidden) {
      setState('FADING')
      window.setTimeout(() => setState('HIDDEN'), 150)
    } else {
      setState('UNFADING')
      window.setTimeout(() => setState('SHOWN'), 150)
    }
  }, [hidden])

  const classes = useMemo(() => getClass(state, className), [state, className])

  return <div className={classes}>{children}</div>
}
