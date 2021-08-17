export class AutoMap<K, S> extends Map<K, S> {
  constructor(private readonly builder: (key: K) => S) {
    super()
  }

  get(key: K): S {
    let item = super.get(key)

    if (!item) {
      item = this.builder(key)

      this.set(key, item)
    }

    return item
  }
}
