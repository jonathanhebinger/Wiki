export const ArrayUtil = {
  add<T>(array: T[], ...items: T[]) {
    array = [...array]

    items.forEach(item => {
      if (!array.includes(item)) {
        array.push(item)
      }
    })

    return array
  },
  remove<T>(array: T[], ...items: T[]) {
    return array.filter(item => !items.includes(item))
  },
  swap<T>(array: T[], index1: number, index2: number) {
    array = [...array]

    let tmp = array[index1]

    array[index1] = array[index2]
    array[index2] = tmp

    return array
  },
  move<T>(array: T[], from: number, to: number) {
    if (from < 0 || from > array.length) return array
    if (to < 0 || to > array.length) return array

    if (from > to) {
      array.splice(to, 0, array[from])
      array.splice(from + 1, 1)
    } else if (from < to) {
      array.splice(to + 1, 0, array[from])
      array.splice(from, 1)
    }

    return array
  },
  clean<T>(array: (T | undefined)[]): T[] {
    return array.filter(item => item !== undefined) as T[]
  },
}
