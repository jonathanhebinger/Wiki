import { useEffect, useState } from 'react'

export function useReactiveState<S>(
  reactiveState: S,
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, state$set] = useState(reactiveState)

  useEffect(() => {
    state$set(reactiveState)
  }, [reactiveState])

  return [state, state$set]
}
