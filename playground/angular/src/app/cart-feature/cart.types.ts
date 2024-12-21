export type Cart = 'not-fetched' | 'fetching' | Item[] | Error

export type Item = {
  id: number
  name: string
}
