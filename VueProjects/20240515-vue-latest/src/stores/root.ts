import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRootStore = defineStore('root', () => {
  const rootList = ref([]),
    menuList = ref([])
  const addRoot = (list: any) => (rootList.value = list)
  const addMenu = (list: any) => (menuList.value = list)

  return { rootList, menuList, addMenu, addRoot }
})
