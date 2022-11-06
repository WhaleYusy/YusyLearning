import store from '../store'
import axios from '../http/index';

const getData = {
  proLoginQrCode: () => {
    axios.get("/api-user/app/pc/login/qRcode", {redirect_uri: store.state.redirectUri}).then((data) => {
      data = data.data
      if (data.resp_code == 0) {
        store.commit('SET_qrCodeUrl', data.datas.redirectUrl)
        store.commit('SET_dialogVisible', true)
      }
    })
  },
  checkVip: () => {
    return sessionStorage.getItem('userInfoAll') ? (JSON.parse(sessionStorage.getItem('userInfoAll')).member.level > 0 ? true : false) : false
  },
  checkAdmin: () => {
    return sessionStorage.getItem('userInfoAll') ? (JSON.parse(sessionStorage.getItem('userInfoAll')).member.level == 3 ? true : false) : false
  },
  getUserInfoAll: () => {
    return sessionStorage.getItem('userInfoAll') ? JSON.parse(sessionStorage.getItem('userInfoAll')) : ''
  }
}

export default getData
