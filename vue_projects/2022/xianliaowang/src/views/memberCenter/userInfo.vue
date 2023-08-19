<template>
  <div class="user_info_box">
    <div class="user_info_box_top">
      <span>您好！<span class="nickName" style="font-size:20px">{{userInfo.nickName}}</span></span>
      <!-- <button>完善基本信息</button> -->
    </div>
    <div class="user_info_box_middle">
      <div class="user_info_box_middle_left">
        <el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
        <div class="user_info_detail">
          <p>昵  称：{{userInfo.nickName}}
            <img class="uidImg" style="background:#30B1F8;border-radius: 10px;" v-if="userInfo.level == 3" src="../../img/admin@2x.png" alt />
            <img class="uidImg" v-else-if="userInfo.level == 2" src="../../img/vip@2x.png" alt />
            <img class="uidImg" v-else-if="userInfo.level == 1" src="../../img/baseVip@2x.png" alt />
            <button v-else class="userInfo_beVip" @click="becomeVip">注册会员</button>
          </p>
          <p>姓  名：<span>{{userInfo.realName || '未实名'}}</span></p>
<!--          <p>邮箱账号：<span>{{userInfo.email || '未绑定'}}</span></p>-->
          <p>手机号码：<span>{{userInfo.mobileNo}}</span></p>
          <p>生日：<span>{{userInfo.birthday | timeFormat('yyyy-mm-dd')}}</span></p>
          <p>性别：<span>{{userInfo.ssex==0?'男':userInfo.ssex==1?'女':'未知'}}</span></p>
          <p>积分：<span>{{point}}</span></p>
        </div>
      </div>
      <!-- <div class="user_info_box_middle_right">
        <div class="user_info_detail" style="margin-left:80px;width:330px;">
          <div>客户等级：<p class="disc_img"></p><span>注册会员（成长值：0）<router-link to="/home/help/gradeMembership" style="color:#429CE7;">[等级介绍]</router-link></span></div>
          <p>信用积分：<span>80 <router-link to="#" style="color:#429CE7;">[信用积分规则]</router-link></span></p>
          <p>上次登录时间：<span>2019-06-26 11:55:20</span></p>
          <p>现货订单付款期限为：<span>24小时</span></p>
        </div>
      </div> -->
    </div>
    <div class="user_info_box_bottom">
      <ul>
<!--        <li @click="$router.push('/cart/index')">购物车<span>{{userInfo.goodsCartCount}}</span></li>-->
<!--        <li @click="toOrderList('0')">待付款<span>{{userInfo.unPayOrderCount}}</span></li>-->
<!--        <li @click="toOrderList('5')">已收货<span>{{userInfo.finishedOrderCount}}</span></li>-->
        <li @click="$router.push('/home/userCenter/myCollection')">已收藏<span>{{userInfo.collectNum}}</span></li>
        <li v-if="$loginUtil.checkVip()" @click="$router.push('/home/userCenter/myRelease')">已发布<span>{{userInfo.publishNum}}</span></li>
        <!-- <li>未读信息<span>6</span></li> -->
        <!-- <li>投诉建议<span>8</span></li> -->
      </ul>
    </div>
    <become-vip  v-if="showBeVipLayer" @close="closeLayer"/>
  </div>

</template>

<script>
    import becomeVip from '../../components/home/bevipLayer';
export default {
    components:{
        becomeVip
    },
  data () {
    return {
        showBeVipLayer:false,
      userInfo:{},
      cartNum:'',
      waitPayNum:'',
      hasBeenNum:'',
      hasCollectNum:'',
        point:''
    }
  },
  filters:{
	birthdayF(value){
		if(value != undefined && value.length > 10){
			return value.substring(0,10);
		}
	}
  },
  mounted(){
    this.getUserInfo()
    // this.getCartNum()
  },
  methods:{
      becomeVip(){
          this.showBeVipLayer=true
      },
      closeLayer(){
          this.showBeVipLayer = false
      },
    getCartNum(){
      let data = {'pageNum':100,'pageSize':1}
      this.$http
        .post("/pc/cart/findCart2User", data)
        .then(res => {
          //判断是否登录了的（没有登录则导航到登录页面）
          this.$http.judgeIfLogin(res, this);
          if (res.data.data.code === 1) {
            this.cartNum = res.data.data.msg.total;
          } else {
            this.$message(res.data.data.msg);
          }
        })
        .catch(res => {});
    },
    getWaitPayNum(){

    },
    // 前往订单列表
    toOrderList(type){
      this.$router.push({
        path:'/home/userCenter/orderManagement',
        query:{
          type:type
        }
      })
    },
    getUserInfo(){
        if(sessionStorage.getItem('token')) {
            this.$http.get('api-user/app/user/myInfo', {}).then((res) => {
                let userInfoAll=res.data.datas
                sessionStorage.setItem('userInfoAll',JSON.stringify( userInfoAll))
                this.userInfo=userInfoAll.member
                this.point=parseInt(userInfoAll.point.point)+parseInt(userInfoAll.point.viewPoint)
            })
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.user_info_box{
  width: 100%;
  height: 300px;
  border: 1px solid #E5E5E5;
  .user_info_box_top{
    width: 95%;
    margin: 0 auto;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
    span{
      font-size: 15px;
    }
    button{
      height: 30px;
      width: 100px;
      margin-right: 20px;
      color: white;
      border: none;
      outline: none;
      background: #FF7900;
      font-size: 13px;
      border-radius: 3px;
    }
  }
  .userInfo_beVip{
    width: 80px;
    height: 20px;
    line-height: 18px;
    background: #fff;
    border: 1px solid #0094e7;
	color:#0094e7;
    border-radius: 20px;
    box-sizing: border-box;
    font-size: 14px;
	cursor: pointer;
  }
  .user_info_box_middle{
    width: 100%;
    height: 200px;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    .user_info_box_middle_left{
      width: 50%;
      height: 100%;
      // border-right: 1px solid #E5E5E5;
      display: flex;
      .bg_img{
        width: 110px;
        height: 110px;
        background: url('../../assets/icon.png') no-repeat 5px -126px;
      }
    }
    .user_info_box_middle_right{
      width: 50%;
      height: 100%;
    }
    .user_info_detail{
      margin-left: 30px;
      width: 300px;
      font-size: 15px;
      .uidImg{
         width:90px;
         height:21px;
         margin-left:10px;
      }
      p,div{
        width: 100%;
        height: 30px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        line-height: 30px;
        display: flex;
        align-items: center;
        // margin-top: 10px;
        color: #A2A2A2;
        span{
          color: #444444;
        }
        .disc_img{
          height: 30px;
          width: 30px;
          background: url('../../assets/desc_icon.png') no-repeat 0 4px;
          display: inline-block;
        }
      }
    }
  }
  .user_info_box_bottom{
    width: 100%;
    height: 48px;
    border-top: 1px solid #E5E5E5;
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      li{
        flex: 1;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        span{
          color: #FF7900;
          text-decoration: underline;
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
