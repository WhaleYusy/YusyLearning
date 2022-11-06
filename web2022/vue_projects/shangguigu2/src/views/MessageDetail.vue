<template>
  <div>
    <p>ID: {{$route.params.id}}</p>
    <ul>
      <li>id: {{messageDetail.id}}</li>
      <li>title: {{messageDetail.title}}</li>
      <li>content: {{messageDetail.content}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        messageDetail:{}
      }
    },
    mounted() {
      setTimeout(()=>{
        const allMessageDetails = [{
          title: 'message001',
          id: 1,
          content: 'message001 content....'
        },{
          title: 'message002',
          id: 2,
          content: 'message002 content....'
        },{
          title: 'message004',
          id: 4,
          content: 'message004 content....'
        }]
        this.allMessageDetails = allMessageDetails
        const id = this.$route.params.id * 1
        this.messageDetail = allMessageDetails.find(detail => detail.id===id)
      },1000)
    },
    watch:{
      $route: function(value){
        console.log(value)
        if(value.path.indexOf("/home/message/detail/")<0){
          return;
        }
        const id = value.params.id * 1
        this.messageDetail = this.allMessageDetails.find(detail => detail.id===id)
      }
    }
  }
</script>

<style>
</style>
