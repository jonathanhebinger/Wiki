export function mapGet<K, V>(map: Map<K, V>, key: K, defaultValue: V) {
  const value = map.get(key)

  if (!value) {
    map.set(key, defaultValue)

    return defaultValue
  }

  return value
}

export function mapDo<K, V>(
  map: Map<K, V>,
  key: K,
  handler: (value: V, key: K, map: Map<K, V>) => void,
) {
  const value = map.get(key)

  if (value) {
    handler(value, key, map)
  }
}
