import { beforeEach, describe } from 'vitest'
import { createTransitions } from './createTransitions.ts'
import { defineStore } from 'pinia'
import { transitions } from './transitionsPlugin.ts'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { IllegalTransitionError } from '../core/IllegalTransitionError.ts'
import { TransitionNotFoundError } from '../core/TransitionNotFoundError.ts'

type State = 'not-fetched' | 'fetching' | string[] | Error

export const itemStoreId = 'item-store'

export const useItemStore = defineStore(itemStoreId, {
  state: (): {
    items: State
  } => ({
    items: 'not-fetched',
  }),
  actions: {
    fetch(shouldFail?: boolean) {
      this.items = 'fetching'

      setTimeout(() => {
        this.items = shouldFail ? new Error('fetch failed') : ['item-1', 'item-2', 'item-3']
      }, 2000)
    },
    reset() {
      this.items = []
    },
  },
})

export const itemStoreTransitions = createTransitions([
  {
    identityFn: (state) => state === 'not-fetched',
    actions: ['fetch'],
  },
  {
    identityFn: (state) => Array.isArray(state) && state.length > 0,
    actions: ['reset'],
  },
  {
    identityFn: (state) => Array.isArray(state) && state.length === 0,
    actions: ['fetch'],
  },
])

describe('transitionsPlugin', () => {
  beforeEach(() => {
    const transitionsPlugin = transitions({
      [itemStoreId]: itemStoreTransitions,
    })

    const MockComponent = {
      template: '',
    }

    mount(MockComponent, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            plugins: [transitionsPlugin],
          }),
        ],
      },
    })
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have correct initial state', () => {
    const itemStore = useItemStore()

    expect(itemStore.items).toEqual('not-fetched')
  })

  it('should transition from not-fetched to fetching when fetch action is called', () => {
    const itemStore = useItemStore()

    itemStore.fetch()

    expect(itemStore.items).toEqual('fetching')
  })

  it.each<{
    testCase: string
    actions: string[]
    actionArgs: any[]
    expected: State
  }>([
    {
      testCase: 'should transition from not-fetched to string[] after 2000ms when fetch action is called',
      actions: ['fetch'],
      actionArgs: [],
      expected: ['item-1', 'item-2', 'item-3'],
    },
    {
      testCase: 'should transition from not-fetched to Error after 2000ms when fetch action is called',
      actions: ['fetch'],
      actionArgs: [true],
      expected: new Error('fetch failed'),
    },
    {
      testCase: 'should transition from string[] to [] when reset action is called',
      actions: ['fetch', 'reset'],
      actionArgs: [],
      expected: [],
    },
  ])('$testCase', ({ actions, actionArgs, expected }) => {
    const itemStore = useItemStore()

    for (const action of actions) {
      // @ts-expect-error
      itemStore[action](...actionArgs)
      vi.runAllTimers()
    }

    expect(itemStore.items).toEqual(expected)
  })

  it.each<{
    testCase: string
    actions: string[]
    actionArgs: any[]
    expected: Error
  }>([
    {
      testCase: 'should throw when state is not-fetched and reset action is called',
      actions: ['reset'],
      actionArgs: [],
      expected: new IllegalTransitionError('not-fetched', 'reset'),
    },
    {
      testCase: 'should throw when state is string[] and fetch action is called',
      actions: ['fetch', 'fetch'],
      actionArgs: [],
      expected: new IllegalTransitionError('item-1,item-2,item-3', 'fetch'),
    },
    {
      testCase: 'should throw when state is Error and reset action is called',
      actions: ['fetch', 'reset'],
      actionArgs: [[true]],
      expected: new TransitionNotFoundError('Error: fetch failed'),
    },
    {
      testCase: 'should throw when state is Error and fetch action is called',
      actions: ['fetch', 'fetch'],
      actionArgs: [[true]],
      expected: new TransitionNotFoundError('Error: fetch failed'),
    },
  ])('$testCase', ({ actions, actionArgs, expected }) => {
    const itemStore = useItemStore()

    expect(() =>
      actions.forEach((action, index) => {
        // @ts-expect-error
        itemStore[action](...(actionArgs[index] ?? []))
        vi.runAllTimers()
      })
    ).toThrowError(expected)
  })
})
