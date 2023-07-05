export const save = (key: string, value: unknown) => {
  const stringValue = typeof value == 'string'
    ? value
    : JSON.stringify(value)

  window.localStorage.setItem(key, stringValue)
}
