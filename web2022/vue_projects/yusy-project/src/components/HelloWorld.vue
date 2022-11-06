<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <Child>
      <template v-slot><p>h3h3hh33h3h3</p><p>h3h3hh33h3h3</p><p>h3h3hh33h3h3</p></template>
      <template v-slot:h2><span>h3h3hh33h3h3</span></template>
      <template v-slot:h3><button type="button">44asda</button></template>
    </Child> -->
    <div id="main">
      <div id="container"></div>
      <span @click="changeData">111222</span>
    </div>
  </div>
</template>

<script>
// import Child from './Child'
import { Graph } from '@antv/x6'

export default {
  // components: { Child },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      graph: null,
      data1: [{
        id: 'node1',
        label: '投资经理',
        nextId: 'node2'
      }, {
        id: 'node2',
        label: '投资经理2',
        nextId: 'node3'
      }, {
        id: 'node3',
        label: '投资经理3',
        nextId: 'node4'
      }, {
        id: 'node4',
        label: '投资经理4',
        nextId: 'node5'
      }, {
        id: 'node5',
        label: '投资经理5',
        nextId: 'node6'
      }, {
        id: 'node6',
        label: '投资经理6'
      }],
      data2: [{
        id: 'node1',
        label: '投资经理',
        nextId: 'node2'
      }, {
        id: 'node2',
        label: '投资经理2',
        nextId: 'node3'
      }, {
        id: 'node3',
        label: '投资经理3',
        nextId: 'node4'
      }, {
        id: 'node4',
        label: '投资经理4',
        nextId: 'node5'
      }, {
        id: 'node5',
        label: '投资经理5',
        nextId: 'node6',
        children: [{
          id: 'node51',
          label: '投资经理51',
          nextId: 'node6'
        }, {
          id: 'node52',
          label: '投资经理52',
          nextId: 'node6'
        }, {
          id: 'node53',
          label: '投资经理53',
          nextId: 'node6'
        }]
      }, {
        id: 'node6',
        label: '投资经理6'
      }],
      graphW: 40,
      graphH: 500
    }
  },
  methods: {
    createGraph () {
      Graph.registerNode('custom-rect', {
        inherit: 'rect', // 继承自 Shape.Rect
        width: 140, // 默认宽度
        height: 30, // 默认高度
        attrs: {
          body: {
            rx: 5, // 圆角矩形
            ry: 5
          },
          label: {
            fill: 'gray',
            fontSize: 16
          }
        }
      })
      const data = this.dataToGraphData(this.data1)
      this.graphW = this.graphW + data.nodes.length * 180
      this.graph = new Graph({
        container: document.getElementById('container'),
        width: this.graphW,
        height: this.graphH,
        interacting: false
      })
      this.graph.fromJSON(data)
    },
    changeData () {
      const data = this.dataToGraphData(this.data2)
      this.graph.fromJSON(data)
    },
    dataToGraphData (data) {
      const graphData = {
        nodes: [],
        edges: []
      }; let graphX = -140; const graphY = 40
      data.forEach((item, index) => {
        if (!item.children) {
          graphX += 180
          graphData.nodes.push({
            id: item.id,
            x: graphX,
            shape: 'custom-rect',
            y: graphY,
            label: item.label
          })
        } else {
          this.graphW += 180
          this.graph.resize(this.graphW, this.graphH)
          graphX += 180
          graphData.nodes.push({
            id: item.id,
            x: graphX,
            shape: 'custom-rect',
            y: graphY,
            label: item.label
          })
          const children = item.children; let graphChildrenX = graphX; let graphChildrenY = graphY
          children.forEach(item2 => {
            if (!item2.children) {
              graphChildrenX += 180 / item.children.length
              graphChildrenY += 40
              graphData.nodes.push({
                id: item2.id,
                x: graphChildrenX,
                shape: 'custom-rect',
                y: graphChildrenY,
                label: item2.label
              })
              if (item2.nextId) {
                graphData.edges.push({
                  source: item2.id,
                  target: item2.nextId,
                  router: {
                    name: 'manhattan'
                  }
                })
              }
            }
          })
        }
        if (item.nextId) {
          graphData.edges.push({
            source: item.id,
            target: item.nextId,
            router: {
              name: 'manhattan'
            }
          })
        }
      })
      return graphData
    }
  },
  mounted () {
    this.createGraph()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#main{
  width: 100%;
  overflow: auto;
}
</style>
