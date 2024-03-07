import { ref } from 'vue'

export default () => {
  let sum = 0
  const changeSum = () => {
    sum += 1
    console.log('changeSum', sum)
  }
  return {
    sum,
    changeSum
  }
}
