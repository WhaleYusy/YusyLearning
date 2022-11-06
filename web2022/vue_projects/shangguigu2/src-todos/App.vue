<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"></TodoHeader>
      <TodoList :todos="todos" :deleteTodo="deleteTodo"></TodoList>
      <todo-footer :todos="todos" :deleteCompleteTodos="deleteCompleteTodos"
      :selectAllTodos="selectAllTodos"></todo-footer>
    </div>
  </div>
</template>

<script>
  import TodoHeader from './components/TodoHead.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'
  export default{
    data(){
      return{
        //从localstorage读取todos并解析
        todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
      }
    },
    watch:{ //监视
      todos:{
        deep: true, //深度监视
        handler: function(value){
          //将todos最新的值JSON数据保存localstorage
          window.localStorage.setItem('todos_key', JSON.stringify(value))
        }
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
