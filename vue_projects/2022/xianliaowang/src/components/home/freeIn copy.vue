<template>
  <div class="mall_home_certificate">
    <div class="mall_home_poster"></div>
    <p class="mall_home_certificate_title">六大优势&nbsp;&nbsp;&nbsp;&nbsp;共享共赢</p>
    <div class="mall_home_container">
      <div class="mall_home_container_left">
        <ul>
          <li v-for="(t,i) in tipList" :key="i">
            <div class="li_bg_img">{{i+1}}</div>
            <div class="li_cont">
              <p>{{t.title}}</p>
              <div>{{t.tips}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mall_home_container_right">        
      </div>
    </div>
    <div class="mall_home_certificate_form">
      <div class="mall_home_certificate_form_box">
        <img src="../../assets/freeIn3.jpg" alt="">
        <div class="mall_home_certificate_form_item">
          <div class="item_line_one">
            <div class="item_box">公司名称：<input type="text"></div>
            <span class="item_icon" style="color:red">*</span>
            <div class="item_box item_box_o">商品品牌：<input type="text"></div>
            <span class="item_icon" style="color:red">*</span>
          </div>
          <div class="item_line_one item_line_one_l" >
            <span style="font-size:15px;"><span style="color:red">* </span>类别：</span>
            <el-radio v-model="radio" label="1">原厂</el-radio>
            <el-radio v-model="radio" label="2">代理商</el-radio>
            <div v-if="radio == 2" class="item_box item_box_o item_box_l" style="margin-left:36px;">代理证书：<input type="file" style="width:144px"></div>
          </div>
          <div class="item_line_one" >
            <div class="item_box item_box_o item_box_l" style="margin-left:0">联系人：<input type="text"></div>
            <span class="item_icon" style="color:red">*</span>
            <div class="item_box item_box_o item_box_l">手机号：<input type="text"></div>
            <span class="item_icon" style="color:red">*</span>
            <div class="item_box item_box_o">邮箱：<input type="text"></div>
            <span class="item_icon" style="color:red">*</span>
          </div>
          <div class="item_line_one">
            <div class="item_box">公司网站：<input type="text"></div>
            <span class="item_icon" style="color:red">*</span>
          </div>
          <div class="item_line_one">
            <div class="item_box">通讯地址：<input type="text"></div>
            <span class="item_icon" style="color:red">*</span>
          </div>
          <div class="item_line_one item_line_one_o">
             <el-button type="primary" class="apply_btn">立即申请</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tipList:[
        {title:'庞大的精准客户',tips:'闲料网目前拥有90万+小微客户，且每月有近2万精准新客户注入，可解决品牌商的新品推介、样品派发和专题推广等难题，实现0成本品牌宣传，同时间接为原厂/代理商培养潜在大客户。'},
        {title:'更多的优秀伙伴',tips:'闲料网所有元器件均从原厂或代理商正规渠道采购，目前已取得台湾厚声、江苏长电等近百家国内知名品牌原厂授权代理、合作近千个国内外品牌，严格的渠道把控赢得了客户和市场广泛认可的“正品”口碑'},
        {title:'现金流和产业链',tips:'闲料网目前日均成交3000+订单，不做账期、只做线上现金结算，保证了长期稳定雄厚的现金流。同时，扎实的集团电子全产业链资源大大增加了客户的粘性，能一站式满足客户需求。'},
        {title:'高效的智能仓储',tips:'投入超1亿元研发ERP系统，保证了高效的仓储管理、订单管理、供应链管理等业务流程，实现极速、自动化、高准确率分拣，下单4小时内发货，给客户和供应商伙伴提供了更快更好的采销体验！'},
        {title:'大仓库辐射全国',tips:'在建的“闲料网电子互联网科技园”项目一期，有6万㎡高标准单体仓库和4万㎡厂房，将引进电子元器件原厂或电子周边配套服务提供商，形成电子生态圈上下游企业的闭环，打造“中国芯”的核心竞争力！'},
        {title:'大数据精准推荐',tips:'闲料网拥有海量元器件销售数据和物料清单可进行大数据分析，提供精准的用户画像、市场波动、品牌热度等，做到精准营销、合理备货、迅速响应市场变化，提升客户体验的同时也加快了商品周转。'},
      ],
      radio:'1'
    }
  }
}
</script>
<style lang="scss" scoped>
.mall_home_poster{
  width: 100%;
  height: 480px;
  background: url('../../assets/freeIn1.jpg') no-repeat center;
}
.mall_home_certificate_title{
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  font-weight: bold;
  margin: 50px auto 0;
  color: #333;
}
.mall_home_container{
  width: 100%;
  max-width: 1200px;
  margin: 0px auto;
  height:750px;
  display: flex;
  .mall_home_container_left{
    width: 720px;
    height: 100%;
    ul{
      width: 100%;
      height: 100%;
      li{
        width: 100%;
        min-height: 100px;
        display: flex;
        margin-bottom: 10px;
        .li_bg_img{
          height: 100px;
          width: 100px;
          border-radius: 50%;
          background:url('../../assets/freeIn4.png') no-repeat center;
          text-align: center;
          line-height: 100px;
          font-size: 20px;
          color: #269CEA;
        }
        .li_cont{
          width: 600px;
          p{
            font-size: 20px;
            font-weight: bold;
            margin-top: 15px;
          }
          div{
            font-size: 14px;
            margin-top: 10px;
            line-height: 1.75;
          }
        }
      }
    }
  }
  .mall_home_container_right{
    width: 480px;
    height: 100%;
    background: url('../../assets/freeIn2.jpg') no-repeat center;
  }
}
.mall_home_certificate_form{
  width: 100%;
  height: 400px;
  background: #F5F5F5;
  .mall_home_certificate_form_box{
    width: 100%;
    height: 100%;
    max-width: 1200px;
    display: flex;
    margin:  0 auto;
    img{
      width: 350px;
      height: 400px;
    }
    .mall_home_certificate_form_item{
      width: 850px;
      height: 400px;
      padding: 20px;
      box-sizing: border-box;
      .item_line_one{
        width: 100%;
        height: 50px;
        display: flex;
        margin-top: 10px;
        .item_box{
          width: 500px;
          height: 40px;
          line-height: 40px;
          background: #ffffff;
          border: 1px solid #DFDFDF;
          border-radius: 5px;
          padding: 0 5px;
          box-sizing: border-box;
          font-size: 15px;
          input{
            width: 410px;
            height: 100%;
            border: none;
            outline: none;
          }
        }
        .item_icon{
          color: red;
          font-size: 20px;
          line-height: 50px;
          margin: 0 5px;
        }
        .item_box_o{
          width: 250px;
          margin-left: 20px;
          input{
            width: 155px;
            height: 100%;
            border: none;
            outline: none;
          }
        }
        .item_box_l{
          width: 231px;
        }
      }
      .item_line_one_o{
        margin-top: 10px;
        .apply_btn{
          width: 150px;
          font-size: 20px;
        }
      }
      .item_line_one_l{
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

