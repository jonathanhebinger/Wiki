export const ArrayUtil = {
  first: <T>( array: T[] ): T => array[ 0 ],
  last: <T>( array: T[] ): T => array[ array.length - 1 ],
  at: <T>( array: T[], index: number ): T => array[ index ],
  previous: <T>( array: T[], index: number ) => array[ index - 1 ],
  next: <T>( array: T[], index: number ) => array[ index + 1 ],
  isEmpty: ( array: any[] ) => !array.length,
  is: {
    array: <T>( value: T | T[] ): value is T[] => Array.isArray( value ),
    empty: ( array: any[] ) => !array.length,
  },
}
