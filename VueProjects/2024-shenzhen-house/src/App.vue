<script setup>
import { onMounted, ref } from 'vue'
import anjurencaifang from '@/data/2024-shenzhen-anjurencaifang'
import szBaiduMap from '@/map/2024-shenzhen-baidumap'

const map = ref(null)

onMounted(() => {
  initMap()
  initPoint()
  initShenzhen()
})

const initMap = () => {
  map.value = new BMap.Map('map', {
    minZoom: 12, // 最小级别
    enableMapClick: false // 底图不可点
  })
  map.value.centerAndZoom(new BMap.Point(114.196367, 22.638639), 12) // 地图中心点
  map.value.enableScrollWheelZoom(true) // 允许鼠标滚轮放大缩小地图
}

const initPoint = () => {
  console.table(anjurencaifang)
  anjurencaifang.forEach(({ point, name, price, offset = [-50, 5] }) => {
    map.value.addOverlay(new BMap.Marker(new BMap.Point(...point))) // 标点
    map.value.addOverlay(
      // 提示框
      new BMap.Label(`2024 - ${name} - ${price}`, {
        position: new BMap.Point(...point),
        offset: new BMap.Size(...offset)
      })
    )
  })
}

const initShenzhen = () => {
  const szMap = szBaiduMap.filter(({ code }) => code !== '4403')
  szMap.forEach(({ color, baidumap }) => {
    baidumap.forEach(mapPoint => {
      map.value.addOverlay(
        new BMap.Polygon( // 多边形描图
          mapPoint.split(';').map(point => new BMap.Point(...point.split(','))),
          { fillColor: color, fillOpacity: 0.25, strokeColor: 'black', strokeWeight: 1, strokeOpacity: 0.25 }
        )
      )
    })
  })
}
</script>

<template>
  <div id="map" />
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
