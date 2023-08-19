<template>
  <div class="SMSAndEmailSubscription_box">
    <div class="SMSAndEmailSubscription_title">
      你当前绑定的邮箱为 【lc363537@szlcsc.com】，<span style="color:#429CE7">点这里修改为常用邮箱</span>
    </div>
    <ul>
      <li v-for="(t,i) in listData" :key="i" >
        <p><el-checkbox v-model="t.isSelect">{{t.tips1}}</el-checkbox></p>
        <span>{{t.tips2}}</span>
      </li>
    </ul>
    <el-button type="primary" size="mini" style="margin-top:20px;">保存设置</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      listData:[
        {isSelect:false,tips1:'优惠券过期提醒',tips2:'优惠券过期之前，系统将发送短信给您'},
        {isSelect:false,tips1:'订单发货提醒',tips2:'订单发货后，系统将发送短信给您'},
        {isSelect:false,tips1:'增值税专用发票开票提醒',tips2:'增值税专用发票开出发票后，系统将发送短信给您'},
        {isSelect:false,tips1:'退货记录审核提醒',tips2:'退货记录审核之后，系统将发送短信给您'},
        {isSelect:false,tips1:'退款记录审核提醒',tips2:'退款记录审核之后，系统将发送短信给您'},
        {isSelect:false,tips1:'选型昨日收益',tips2:'如您的选型型号昨日产生收益，系统将发送短信给您'},
        {isSelect:false,tips1:'闲料网快报',tips2:'闲料网电子版杂志，每次发行时系统将发送到您的绑定邮箱'},
        {isSelect:false,tips1:'提现审核通知',tips2:'您的提现申请审核通过后，系统会发送短信给您'},
        {isSelect:false,tips1:'钱包余额变化提醒',tips2:'您的钱包余额有变动时，系统会发送短信给您'},
        {isSelect:false,tips1:'关注商品到货通知',tips2:'您关注的商品到货后，系统会发送短信给您'},
        {isSelect:false,tips1:'订货单审核通过提醒',tips2:'订货商品采购人员报价允许完成后，系统会发送短信给您'},
        {isSelect:false,tips1:'线下对公充值审核成功提醒',tips2:'您的钱包线下对公充值审核通过后，系统会发送短信给您'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.SMSAndEmailSubscription_box{
  width: 958px;
  margin-top: 20px;
  ul{
    width: 100%;
    li{
      width: 100%;
      height: 39px;
      border: 1px solid #E5E5E5;
      border-top: none;
      line-height: 40px;
      padding-left: 20px;
      box-sizing: border-box;
      display: flex;
      p{
        width: 350px;
      }
    }
  }
}
.SMSAndEmailSubscription_title{
  width: 100%;
  height: 39px;
  line-height: 40px;
  background: #F8F8F8;
  border: 1px solid #E5E5E5;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 14px;
}

</style>

