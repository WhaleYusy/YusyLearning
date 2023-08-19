<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <TodoHeader @addTodo="addTodo"></TodoHeader> -->
      <TodoHeader ref="header"></TodoHeader>
      <TodoList :todos="todos"></TodoList>
      <todo-footer>
        <input type="checkbox" v-model="isAllCheck" slot="checkAll" />
        <span slot="count">已完成{{completeSize}}  /  全部{{todos.length}}</span>
        <button slot="delete" class="btn btn-danger" v-show="completeSize" @click="deleteCompleteTodos">清除已完成任务</button>
      </todo-footer>
    </div>
  </div>
</template>
<!--
绑定事件监听-订阅消息
触发事件-发布消息
 -->
<script>
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/TodoHead.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'
  import storageUtil from './util/storageUtil.js'

  export default{
    data(){
      return{
        //从localstorage读取todos并解析
        todos: storageUtil.readTodos()
      }
    },
    computed:{
        completeSize(){
          return this.todos.reduce((preTotal,todos) => preTotal + (todos.complete?1:0),0)
        },
        isAllCheck:{
          get(){
            return this.completeSize===this.todos.length && this.completeSize>0
          },
          set(value){// value是当前checkbox最新的值
            this.selectAllTodos(value)
          }
        }
    },
    mounted() {
      //执行异步代码
      // this.$on('addTodo',this.addTodo)  //给App绑定监听
      this.$refs.header.$on('addTodo',this.addTodo)
      //订阅消息
      PubSub.subscribe('deleteTodo',(msg,index)=>{
        this.deleteTodo(index)
      })
    },
    watch:{ //监视
      todos:{
        deep: true, //深度监视
        handler: storageUtil.saveTodos
        // handler: function(value){
        //   //将todos最新的值JSON数据保存localstorage
        //   storageUtil.saveTodos(value)
        // }
      }
    },
    methods:{
      addTodo(todo){
        this.todos.unshift(todo)
      },
      deleteTodo(index){
        this.todos.splice(index,1)
      },
      //删除所选的，只要是true删除即可，不用传参
      deleteCompleteTodos(){
        this.todos = this.todos.filter(todo => !todo.complete)
      },
      //全选或者全不选
      selectAllTodos(check){
        this.todos.forEach(todo => todo.complete = check)
      }
    },
    components:{
      TodoHeader,
      TodoList,
      TodoFooter
    }
  }
</script>

<style>
  .todo-container{
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap{
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
