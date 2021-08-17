import constate from 'constate'
import { emit } from 'src/app/store'

export const [NavContextProvider, useNavContext] = constate(() => {
  return {
    add() {
      emit({
        type: 'create',
        payload: {
          name: 'New node',
          tags: [],
        },
      })
    },
  }
})
