import { createDraft, current, finishDraft, isDraft, isDraftable } from 'immer'

import { Action } from './action'
import { Atom } from './atom'
import { Universe } from './universe'

export class ActionContext {
  stack: Action<any, any>[] = []
  atoms: Map<Atom<any>, any> = new Map()

  get readonly() {
    return this.stack.length === 0
  }

  constructor(universe: Universe) {
    universe.on.atom.get.observe(({ atom }) => {
      if (this.readonly) return

      const state = atom.state

      if (!this.atoms.has(atom)) {
        this.atoms.set(atom, state)
      }

      if (isDraftable(state) && !isDraft(state)) {
        atom.state = createDraft(state)
      }
    })
    universe.on.atom.set.observe(({ atom, state }) => {
      if (this.readonly) return

      if (!this.atoms.has(atom)) {
        this.atoms.set(atom, atom.state)
      }

      atom.state = state
    })

    universe.on.action.exec.observe(({ action }) => {
      this.stack.push(action)
    })
    universe.on.action.done.observe(() => {
      this.stack.pop()

      if (!this.readonly) return

      const toEmit: Atom<any>[] = []

      this.atoms.forEach((previous, atom) => {
        let state = atom.state

        if (isDraft(state)) {
          state = finishDraft(state)
        }

        if (Array.isArray(state)) {
          state = state.map(item => {
            return isDraft(item) ? current(item) : item
          })
        }

        if (state !== previous) {
          atom.state = state

          toEmit.push(atom)
        }
      })

      this.atoms.clear()

      toEmit.forEach(atom => {
        atom.emit()
      })
    })
  }
}
