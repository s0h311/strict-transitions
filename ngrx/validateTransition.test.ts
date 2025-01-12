import { createTransitions } from './createTransitions'
import { validateTransition } from './validateTransition.ts'
import { IllegalTransitionError } from '../core/IllegalTransitionError.ts'
import { TransitionNotFoundError } from '../core/TransitionNotFoundError.ts'

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
    identityFn: (state: State) => state === 'not-fetched',
    actions: [fetchAction],
  },
  {
    identityFn: (state: State) => state === 'fetching',
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

  it.each<{
    testCase: string
    state: State
    action: Action
    expectedError: Error
  }>([
    {
      testCase: 'should throw if action = fetchSuccessfulAction and state = not-fetched',
      state: 'not-fetched',
      action: fetchSuccessfulAction,
      expectedError: new IllegalTransitionError('not-fetched', fetchSuccessfulAction.type),
    },
    {
      testCase: 'should throw if action = fetchFailedAction and state = not-fetched',
      state: 'not-fetched',
      action: fetchFailedAction,
      expectedError: new IllegalTransitionError('not-fetched', fetchFailedAction.type),
    },
    {
      testCase: 'should throw if action = fetchAction and state = fetching',
      state: 'fetching',
      action: fetchAction,
      expectedError: new IllegalTransitionError('fetching', fetchAction.type),
    },
    {
      testCase: "should throw if action = fetchAction and state = ['item-1', 'item-2']",
      state: ['item-1', 'item-2'],
      action: fetchAction,
      expectedError: new TransitionNotFoundError(['item-1', 'item-2']),
    },
    {
      testCase: "should throw if action = fetchAction and state = Error('fetch failed')",
      state: new Error('fetch failed'),
      action: fetchAction,
      expectedError: new TransitionNotFoundError(new Error('fetch failed')),
    },
    {
      testCase: "should throw if action = fetchSuccessfulAction and state = ['item-1', 'item-2']",
      state: ['item-1', 'item-2'],
      action: fetchSuccessfulAction,
      expectedError: new TransitionNotFoundError(['item-1', 'item-2']),
    },
    {
      testCase: "should throw if action = fetchFailedAction and state = Error('fetch failed')",
      state: new Error('fetch failed'),
      action: fetchFailedAction,
      expectedError: new TransitionNotFoundError(new Error('fetch failed')),
    },
    {
      testCase: "should throw if action = fetchSuccessfulAction and state = Error('fetch failed')",
      state: new Error('fetch failed'),
      action: fetchSuccessfulAction,
      expectedError: new TransitionNotFoundError(Error('fetch failed')),
    },
    {
      testCase: "should throw if action = fetchFailedAction and state = ['item-1', 'item-2']",
      state: ['item-1', 'item-2'],
      action: fetchFailedAction,
      expectedError: new TransitionNotFoundError(['item-1', 'item-2']),
    },
  ])('$testCase', ({ state, action, expectedError }) => {
    expect(() => validateTransition(state, action, transitions)).toThrow(expectedError.message)
  })
})
