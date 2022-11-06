<template>
  <div>
    <div class="enshrineFail"  v-if="ifShowToastF">
      <div class="enshrineFailToast" >
        <div class="title">
          <h3>失败提示</h3>
          <span class="cancel" @click="ensureAndCloseF">x</span>
        </div>
        <div class="content">
          <div class="leftLogo">!</div>
          <div class="rightText">
            <div class="rightTextInfo">{{tipsCont}}</div>
            <div class="ensureBtn" @click="ensureAndCloseF">确定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'failTips',
  props:['tipsCont'],
  data(){
    return {
      ifShowToastF:false
    }
  },
  methods:{
    openFileToast(){
      //显示失败弹窗
      this.ifShowToastF = true
    },
    ensureAndCloseF(){
      this.ifShowToastF = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .enshrineFail{
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
    .enshrineFailToast{
      width:490px;
      height:180px;
      border:3px solid lightgray;
      box-sizing: border-box;
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
          background:orangered;
          // padding:20px;
          margin-top:20px;
          font-size:40px;
          line-height:60px;
          box-sizing: border-box;
          color:white;
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
            color:orangered;
          }
          // .checkHasEnshrine{
          //   cursor: pointer;
          // }
          // .checkHasEnshrine:hover{
          //   color:#0094e7;
          // }
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

