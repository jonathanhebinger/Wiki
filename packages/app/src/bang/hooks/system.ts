import constate from 'constate'
import { useEffect, useMemo, useState } from 'react'

import { Action } from '../action'
import { Atom } from '../atom'
import { Observable, Observer, ObserverTerminator } from '../observable'
import {
  createSystem,
  System,
  SystemActions,
  SystemRefs,
  SystemState,
  SystemStructureThis,
} from '../system'
import { Universe } from '../universe'

export function useSystem<C extends object>(
  structure: (() => C & SystemStructureThis<C>) | System<C>,
  universe?: Universe,
): [SystemState<C>, SystemActions<C>, SystemRefs<C>] {
  const { actions, refs, terminators, internalState } = useMemo(() => {
    const system =
      typeof structure === 'function'
        ? createSystem(structure(), universe)
        : structure
    const refs = system.$$

    const internalState: any = {}
    const actions: any = {}
    const terminators = new Set<ObserverTerminator>()

    Object.keys(system.$$).forEach(key => {
      const item = refs[key as keyof typeof refs] as
        | Atom<any>
        | Action<any, any>

      if (item instanceof Atom) {
        internalState[key] = item.state

        item.observe(value => {
          internalState[key] = value

          state$set({ ...internalState })
        })
      } else if (item instanceof Action) {
        actions[key] = system[key as keyof typeof refs]
      }
    })

    return { actions, refs, terminators, internalState }
  }, [])

  const [state, state$set] = useState({ ...internalState })

  useEffect(() => {
    return () => {
      terminators.forEach(terminator => {
        terminator()
      })
    }
  }, [])

  return useMemo(() => {
    return [state, actions, refs]
  }, [state, actions, refs])
}

export function createSystemContext<C extends object>(
  structure: (() => C & SystemStructureThis<C>) | System<C>,
  universe?: Universe,
) {
  return constate(() => {
    return useSystem(structure, universe)
  })
}

export function useObserve<T>(
  observable: Observable<T>,
  observer: Observer<T>,
) {
  useEffect(() => observable.observe(observer), [])
}
