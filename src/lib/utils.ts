/**
 * Replace an object's key.
 *
 * @param object
 * @param oldKey
 * @param newKey
 * @returns The new object
 */
export function replaceKey<
  T extends object,
  O extends keyof T,
  N extends string,
>(object: T, oldKey: O, newKey: N): Omit<T, O> & Record<N, T[O]> {
  const obj = { ...object, [newKey]: object[oldKey] }
  delete obj[oldKey]
  return obj as Omit<T, O> & Record<N, T[O]>
}
