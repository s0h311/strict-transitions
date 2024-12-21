import { createTransitions } from './createTransitions'
import { validateTransition } from './validateTransition.ts'

function createAction(actionName: string) {
  return {
    type: actionName,
  }
}

type State = 'not-fetched' | 'fetching' | string[] | Error

const fetchAction = createAction('fetch')
const fetchSuccessfulAction = createAction('fetch-successful')
const fetchFailedAction = createAction('fetch-failed')

type Action = typeof fetchAction | typeof fetchSuccessfulAction | typeof fetchFailedAction

const transitions = createTransitions([
  {
    condition: (state: State) => state === 'not-fetched',
    actions: [fetchAction],
  },
  {
    condition: (state: State) => state === 'fetching',
    actions: [fetchSuccessfulAction, fetchFailedAction],
  },
])

describe('validateTransition', () => {
  it.each<{
    testCase: string
    state: State
    action: Action
  }>([
    {
      testCase: 'should allow fetchAction when state = not-fetched',
      state: 'not-fetched',
      action: fetchAction,
    },
    {
      testCase: 'should allow fetchSuccessfulAction when state = fetching',
      state: 'fetching',
      action: fetchSuccessfulAction,
    },
    {
      testCase: 'should allow fetchFailedAction when state = fetching',
      state: 'fetching',
      action: fetchFailedAction,
    },
  ])('$testCase', ({ state, action }) => {
    validateTransition(state, action, transitions)

    expect(1).toBe(1)
  })
})
