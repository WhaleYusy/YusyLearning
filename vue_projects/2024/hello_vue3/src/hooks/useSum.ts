import { onUpdated, ref } from 'vue'

export default function () {
  const sum = ref(0)
  const changeSum = () => {
    sum.value += 1
  }
  return {
    sum,
    changeSum
  }
}
