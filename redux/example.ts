import { validateTransition } from './validateTransition'
import { createTransitionStore } from './createTransitionStore'

type State = 'not fetched' | 'fetching' | string[] | Error
type Action =
  | {
      type: 'fetch'
    }
  | {
      type: 'fetch failed'
      payload: Error
    }
  | {
      type: 'fetched'
      payload: string[]
    }

function reducer(state: State = 'not fetched', action: Action) {
  return validateTransition(state, action, [])
}

const store = createTransitionStore([], reducer)

store.dispatch({ type: 'fetch' })
