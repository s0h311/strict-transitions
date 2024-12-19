import { createTransitionStore } from './createTransitionStore.ts'
import { createTransitions } from './createTransitions.ts'
import { TransitionStore } from './types.ts'
import { beforeEach } from 'vitest'
import { IllegalTransitionError } from '../core/IllegalTransitionError.ts'
import { TransitionNotFoundError } from '../core/TransitionNotFoundError.ts'

type State = 'not-fetched' | 'fetching' | string[] | Error

type Action =
  | {
      type: 'fetch'
    }
  | {
      type: 'fetch-successful'
      payload: string[]
    }
  | {
      type: 'fetch-failed'
      payload: Error
    }

const transitions = createTransitions([
  {
    condition: (state) => state === 'not-fetched',
    actionTypes: ['fetch'],
  },
  {
    condition: (state) => state === 'fetching',
    actionTypes: ['fetch-successful', 'fetch-failed'],
  },
])

function reducer(state: State = 'not-fetched', action: Action): State {
  switch (action.type) {
    case 'fetch':
      return 'fetching'
    case 'fetch-successful':
      return action.payload
    case 'fetch-failed':
      return action.payload
    default:
      return state
  }
}

describe('createTransitionStore', () => {
  let store: TransitionStore

  beforeEach(() => {
    store = createTransitionStore(transitions, reducer)
  })

  it('should have correct initial state', () => {
    const actual = store.getState()

    expect(actual).toEqual('not-fetched')
  })

  it.each<{
    testCase: string
    actions: Action[]
    expected: State
  }>([
    {
      testCase: 'should transition from not-fetched to fetching when fetch action is dispatched',
      actions: [
        {
          type: 'fetch',
        },
      ],
      expected: 'fetching',
    },
    {
      testCase: 'should transition from fetching to string[] when fetch-successful action is dispatched',
      actions: [
        {
          type: 'fetch',
        },
        {
          type: 'fetch-successful',
          payload: ['item1', 'item2'],
        },
      ],
      expected: ['item1', 'item2'],
    },
    {
      testCase: 'should transition from fetching to Error when fetch-failed action is dispatched',
      actions: [
        {
          type: 'fetch',
        },
        {
          type: 'fetch-failed',
          payload: new Error('fetch failed'),
        },
      ],
      expected: new Error('fetch failed'),
    },
  ])('$testCase', ({ actions, expected }) => {
    for (const action of actions) {
      store.dispatchTransition(action)
    }

    const actual = store.getState()
    expect(actual).toEqual(expected)
  })

  it.each<{
    testCase: string
    actions: Action[]
    expected: string
  }>([
    {
      testCase: 'should throw if state is not-fetched and fetch-successful action is dispatched',
      actions: [
        {
          type: 'fetch-successful',
          payload: ['item1', 'item2'],
        },
      ],
      expected: new IllegalTransitionError('not-fetched', 'fetch-successful').message,
    },
    {
      testCase: 'should throw if state is not-fetched and fetch-failed action is dispatched',
      actions: [
        {
          type: 'fetch-failed',
          payload: new Error('fetch failed'),
        },
      ],
      expected: new IllegalTransitionError('not-fetched', 'fetch-failed').message,
    },
    {
      testCase: 'should throw if state is string[] and fetch action is dispatched',
      actions: [
        {
          type: 'fetch',
        },
        {
          type: 'fetch-successful',
          payload: ['item1', 'item2'],
        },
        {
          type: 'fetch',
        },
      ],
      expected: new TransitionNotFoundError('item1,item2').message,
    },
    {
      testCase: 'should throw if state is Error and fetch action is dispatched',
      actions: [
        {
          type: 'fetch',
        },
        {
          type: 'fetch-failed',
          payload: new Error('fetch failed'),
        },
        {
          type: 'fetch',
        },
      ],
      expected: new TransitionNotFoundError('Error: fetch failed').message,
    },
  ])('$testCase', ({ actions, expected }) => {
    expect(() => actions.forEach((action) => store.dispatchTransition(action))).toThrowError(expected)
  })
})
