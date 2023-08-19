<template>
  <div class="hello">
    <draggable :list="cardList">
      <div v-for="card in cardList" :key="card.id" :style="`background: ${card.color};height: 200px;width: ${card.wrap ? '100' : '50'}%;`">
        <div>
          <h1>{{ card.color }}</h1>
          <input v-model="card.text" />
          <select v-model="card.data">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
    </draggable>  
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: 'HelloWorld',
  components: {
    draggable
  },
  props: {
    msg: String
  },
  watch: {
    cardList(newVal, oldVal){
      console.log(newVal, oldVal);
    }
  },
  data(){
    return{
      cardList: [{
        id: 1,
        color: 'red',
        text: '',
        data: '',
      },{
        id: 2,
        color: 'yellow',
        text: '',
        data: '',
      },{
        id: 3,
        color: 'blue',
        wrap: true,
        text: '',
        data: '',
      },{
        id: 4,
        color: 'green',
        text: '',
        data: '',
      },{
        id: 5,
        color: 'purple',
        text: '',
        data: '',
      },{
        id: 6,
        color: 'orange',
        wrap: true,
        text: '',
        data: '',
      },{
        id: 7,
        color: 'black',
        text: '',
        data: '',
      },]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-flow: wrap;
}
li {
  width: 50%; 
  height: 200px;
}
</style>
