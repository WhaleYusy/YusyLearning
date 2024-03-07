import { onMounted, reactive } from 'vue'
import axios from 'axios'

export default function () {
  const dogList: any = reactive([])
  const dogListUrl = 'https://dog.ceo/api/breed/pembroke/images/random'

  const getDog = () => {
    axios.get(dogListUrl).then(({ data }) => {
      const { message } = data
      dogList.push(message)
    })
  }

  onMounted(() => {
    getDog()
  })

  return {
    dogList,
    getDog
  }
}
