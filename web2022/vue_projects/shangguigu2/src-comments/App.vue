<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container" style="display: flex;">
      <Add :addComment="addComment"></Add>
      <List :comments="comments" :deleteComment="deleteComment"></List>
    </div>
  </div>
</template>

<script>
  import Add from './components/Add.vue'
  import List from './components/List.vue'
  export default {
    data(){
      return{
        comments:[// 数据在哪个组件，操作数据的行为就应该定义在哪个组件
          {
          name: "BOB",
          content: "vue 还不错",
          },
          {
          name: "Cat",
          content: "vue so easy",
          },
          {
          name: "bz",
          content: "vue so so",
          },
        ]
      }
    },
    methods:{
      addComment (comment){
        this.comments.unshift(comment);
      },
      deleteComment (index){
        this.comments.splice(index,1);
      }
    },
    components:{
      Add,List
    }
  }
</script>

<style>
</style>
