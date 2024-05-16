export const getStorage = (key: string) => {
  const storage = window.localStorage.getItem(key)
  return storage ? JSON.parse(storage) : undefined
}

export const updateStorage = (key: string, data: any) => {
  data ? window.localStorage.setItem(key, JSON.stringify(data)) : window.localStorage.removeItem(key)
}
