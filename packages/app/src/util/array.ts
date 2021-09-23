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
  findTuple<T, Id>(items: [Id, T][], id: Id) {
    return (items.find(item => item[0] === id) as [Id, T])[1] as T
  },
}
