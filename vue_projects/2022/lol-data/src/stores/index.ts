import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { MenuType } from "../types";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export const useMenuStore = defineStore("menu", () => {
  const menuList = ref<MenuType[]>([]);
  const setMenuList = (list: MenuType[]) => {
    menuList.value = list;
  };
  return { menuList, setMenuList };
});
