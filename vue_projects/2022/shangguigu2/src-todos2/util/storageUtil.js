const TODOS_KEY = 'todos_key'
export default{
  saveTodos(todos){
    window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  },
  readTodos(){
    return JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]')
  }
}