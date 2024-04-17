<script setup>
import { onMounted, ref } from 'vue'
import data from './data/data-2024'
import shenzhen from './data/shenzhen'

const map = ref(null)

onMounted(() => {
  initMap()
  initPoint()
  initShenzhen()
})

const initMap = () => {
  map.value = new BMapGL.Map('map')
  const centerPoint = new BMapGL.Point(114.196367, 22.638639)
  map.value.centerAndZoom(centerPoint, 12)
  map.value.enableScrollWheelZoom(true)
}

const initPoint = () => {
  data.forEach(({ point, name, price }) => {
    map.value.addOverlay(new BMapGL.Marker(point))
    map.value.addOverlay(
      new BMapGL.Label(`&nbsp;${price}&nbsp;${name}&nbsp;`, {
        position: point,
        offset: new BMapGL.Size(-50, 5)
      })
    )
  })
}

const initShenzhen = () => {
  // 设置掩膜区域坐标点数组
  shenzhen.forEach(pointArr => {
    var path = pointArr.map(point => {
      return new BMapGL.Point(...point.split(','))
    })
    map.value.addOverlay(new BMapGL.Polygon(path, { strokeColor: 'red', strokeWeight: 2, strokeOpacity: 0.5 }))
  })
}
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
