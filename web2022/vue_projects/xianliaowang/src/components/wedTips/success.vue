<template>
  <div class="enshrineSuccess" v-if="ifShowToast">
    <div class="enshrineSuccessToast" >
      <div class="title">
        <h3>我的收藏</h3>
        <span class="cancel" @click="ensureAndClose">x</span>
      </div>
      <div class="content">
        <div class="leftLogo">
          <i class="fa fa-check"></i>
        </div>
        <div class="rightText">
          <div class="rightTextInfo">{{tipsCont}}</div>
          <div class="checkHasEnshrine" @click="toCollection">查看我收藏的商品</div>
          <div class="ensureBtn" @click="ensureAndClose">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'successTips',
  props:['tipsCont'],
  data(){
    return {
      ifShowToast:false
    }
  },
  methods:{
    openToast(){
      console.log("???我在哪里")
      this.ifShowToast = true
    },
    toCollection(){
      this.$router.push({path:'/home/userCenter/myCollection'})
    },
    ensureAndClose(){
      this.ifShowToast = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .enshrineSuccess{
    z-index:3000;
    background:rgba(0,0,0,0.4);
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    border:none;
    .enshrineSuccessToast{
      width:490px;
      height:180px;
      border:3px solid lightgray;
      .title{
        width:100%;
        height:30px;
        font-size:16px;
        background:rgb(240,240,240);
        padding:0 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items:center;
        .cancel{
          cursor: pointer;
        }
        .cancel:hover{
          color:#0094e7;
        }
      }
      .content{
        width:100%;
        height:150px;
        display:flex;
        justify-content: space-around;
        background:white;
        .leftLogo{
          width:60px;
          height:60px;
          text-align:center;
          border-radius:50%;
          background:green;
          padding:20px;
          margin-top:20px;
          box-sizing: border-box;
          display:flex;
          justify-content: center;
          align-items: center;
          i{
            color:white;
            font-size:36px;

          }
        }
        .rightText{
          width:300px;
          text-align:left;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
          // align-items: center;
          margin-top:20px;
          margin-bottom:20px;
          .rightTextInfo{
            font-size:16px;
            color:#71c000;
          }
          .checkHasEnshrine{
            cursor: pointer;
          }
          .checkHasEnshrine:hover{
            color:#0094e7;
          }
          .ensureBtn{
            width:92px;
            height:33px;
            text-align:center;
            line-height:33px;
            color:white;
            background:#0094e7;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

