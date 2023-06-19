import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment (a:number, b:number, c?:number) {
    count.value++
    console.log(a, b, c)

  }
  const add = (x: number) => x * 2, bdd = 1
  const a = {
    name: 'yusy',
    age: 16,
    sex: true,
    obj: {
      children: [{
        name: 'xiaojingjing',
      }],
    },
  }
  console.log(add(2), bdd)
  console.log(1 | 1, a)
  console.log(increment(1, 2))
  if (a.age == 1) {
    console.log('2')
  } else {
    console.log('3')
  }
  // 1
  return { count, doubleCount, increment }
})
