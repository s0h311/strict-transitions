import { createStore } from 'redux'

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
  switch (action.type) {
    case 'fetch':
      return 'fetching'
    case 'fetched':
      return action.payload
    case 'fetch failed':
      return action.payload
    default:
      return state
  }
}

const store = createStore(reducer)

store.dispatch({ type: 'fetch' })
