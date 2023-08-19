import lodash from 'lodash'
// import moment from 'moment'
import { dayjs } from 'element-plus'

export const getLodashRandom = (min = 0, max = 1) => {
  return lodash.random(min, max)
}

// export const getMomentFormat = (date = new Date()) => {
//   return moment(date).format('YYYY-MM-DD HH:mm:ss')
// }

export const getMomentFormat2 = (date = new Date()) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
