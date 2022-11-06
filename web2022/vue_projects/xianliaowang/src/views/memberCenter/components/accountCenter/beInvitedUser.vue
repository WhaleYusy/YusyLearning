<template>
  <div class="beInvitedUser">
    <div class="numList" v-if="beInvitedUserNumberList.length>0">
      <div class="numItem" v-for="(item,index) in beInvitedUserNumberList" :key="index">{{item.phone}}</div>
      <!-- <div class="numItem" v-for="(item,index) in 10" :key="index">18902345678</div> -->
    </div>
    <div class="showNoMore" v-else>暂时没有用户受邀哦~</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      beInvitedUserNumberList:[]
    }
  },
  mounted(){
    this.getNumList()
  },
  methods:{
    getNumList(){
      this.$http.get('/pc/user/GetInvitedUsersInfo').then(res=>{
        console.log(res.data.data.user)
        this.beInvitedUserNumberList = res.data.data.user
      }).catch(res=>{ console.log(res) })
    }
  }
}
</script>
<style lang="scss" scoped>
  .beInvitedUser{
    margin-top:10px;
    .numList{
      width:100%;
      border:1px solid lightgray;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .numItem{
        width:100%;
        height:30px;
        display:flex;
        align-items: center;
        justify-content: center;
        border-bottom:1px solid lightgray;
      }
      .numItem:last-of-type{
        border-bottom:none;
      }
      .numItem:hover{
        color:orange;
      }
    }
    .showNoMore{
      margin-top:150px;
      margin-bottom:150px;
      text-align:center;
      font-size:15px;
    }
  }
</style>>