export const ArrayUtil = {
  /**
   * Return items of left that are not in right
   */
  diff<T>(left: T[], right: T[]) {
    return left.filter(item => !right.includes(item))
  },
  /**
   * Return items of left that are not in right
   */
  diffById<T extends { id: Id }, Id>(left: T[], right: T[]) {
    return left.filter(leftItem => {
      return right.every(rightItem => rightItem.id !== leftItem.id)
    })
  },
  findById<T extends { id: Id }, Id>(items: T[], id: Id) {
    return items.find(item => item.id === id) as T
  },
  getPair<T, Id>(items: [Id, T, ...any][], id: Id) {
    return (items.find(item => item[0] === id) as [Id, T])[1] as T
  },
  getTrio<T, Id>(items: [Id, any, T][], id: Id) {
    return (items.find(item => item[0] === id) as [Id, any, T])[2] as T
  },

  setPair<T, Id>(items: [Id, T, ...any][], id: Id, item: T) {
    const target = items.find(item => item[0] === id) as [Id, T]

    target[1] = item
  },
  setTrio<T, Id>(items: [Id, any, T][], id: Id, item: T) {
    const target = items.find(item => item[0] === id) as [Id, any, T]

    target[2] = item
  },
}
