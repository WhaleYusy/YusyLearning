<script setup>
import { onMounted, reactive } from 'vue';

import dataList from './data/index'

const dataMap = reactive({
  map: '',
  markerLayer: '',
  latitude: 22.610763,
  lngitude: 114.199497,
  address: '',
})
const TMap = window.TMap
let container

const init = () => {
  container = document.getElementById('container')
  let center = new TMap.LatLng(dataMap.latitude, dataMap.lngitude)
  dataMap.map = new TMap.Map(container, {
    center,
    zoom: 11.4,
    viewMode: '2D'
  })
  markerLayer(dataList)
  // markerLayer(dataList.filter(item => item.source.includes('3')))
}

const markerLayer = (list) => {
  dataMap.markerLayer = new TMap.MultiMarker({
    map: dataMap.map,
    styles: {
      yusyStyle: new TMap.MarkerStyle({
        width: 15,
        height: 21,
      })
    },
    geometries: list.map(item => {
      return {
        id: item.name,
        styleId: 'yusyStyle',
        position: new TMap.LatLng(...item.xy)
      }
    })
  })
  list.forEach((item) => {
    new TMap.InfoWindow({
      map: dataMap.map,
      position: new TMap.LatLng(...item.xy),
      offset: {x: 0, y: -32},
      enableCustom: true,
      content: `<div title="${item.name}" style="padding: 5px;background-color: #fff;border: 1px solid #000;">${item.type} ${item.source} ${item.price}</div>`,
    })
  })
}

// const reloadMap = (latitude = dataMap.latitude, lngitude = dataMap.lngitude, zoom = 13.4) => {
//   container.innerHTML = ''
//   dataMap.markerLayer = ''
//   let center = new TMap.LatLng(latitude, lngitude)
//   dataMap.map = new TMap.Map(container, {
//     center,
//     zoom,
//     viewMode: '2D'
//   })
//   markerLayer(dataList)
// }
onMounted(() => {
  init()
})
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container{
  width: 100%;
  height: 100%;
}
</style>
