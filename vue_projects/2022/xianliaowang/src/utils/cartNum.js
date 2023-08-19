import Vue from 'vue'
import axios from "axios"
import store from '../store'

// 购物车数量变化
export const setCartNumChange = () => {
    axios.post('api-user/app/cart',{pageSize:100,pageNum:1}).then(res => {
        store.dispatch('setCartNumber', res.data.count)
    })
}

// 每次执行加入、删除购物车，执行改变购物车数量
Vue.mixin({
    methods: {
        requestCartNum() {
            setCartNumChange()
        }
    }
})
