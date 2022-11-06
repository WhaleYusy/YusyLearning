<template>
  <div class="mall_home_hotRecommon">
    <div class="mall_homr_hotRecommon_wrap"></div>
    <div class="mall_home_content_wrap">
      <div class="mall_home_content">
        <div class="mall_home_content_item" v-for="(item,index) in 4" :key="index" ref="show" >
          <div class="pro_title">商品类目:</div>
          <div class="pro_content" >
            <div class="pro_content_item">
              <span @click="toSearch" > 贴片电容(15) </span>
              <span @click="toSearch" >三极管(10)</span>
              <span @click="toSearch" > 钽电容(8)</span> 
              <span @click="toSearch" >MOS(场效应管)(8)</span> 
              <span @click="toSearch" >ST(意法半导体)(8)</span>
              <span @click="toSearch" >贴片晶体谐振器（无源）(8)</span>
              <span @click="toSearch" > 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
            </div>
            <div class="pro_content_item">
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
            </div>
            <div class="pro_content_item">
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
            </div>
            <div class="pro_content_item">
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
              <span> 贴片电容(15) </span>
              <span>三极管(10)</span>
              <span> 钽电容(8)</span> 
              <span>MOS(场效应管)(8)</span> 
              <span>ST(意法半导体)(8)</span>
              <span>贴片晶体谐振器（无源）(8)</span>
            </div>
          </div>
          <div class="btn_group">
            <span class="more" @click="showMore(index)" >更多<i style="font-size:12px;color:gray">图标</i></span>
            <span class="multiple">多选</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mall_home_search_wrap">
      <div class="mall_home_search_content">
        <div class="search_bar">
          <div class="search_bar_top">
            <div class="search_choose">
              <div class="zonghe" style="width:125px;">综合</div>
              <div class="kucun">库存</div>
              <div class="jiage">价格</div>
              <div class="xiaoliang">销量</div>
            </div>
            <div class="search_btn">
              <div class="search_page"><span style="color:#00945e">1</span>/4</div>
              <div class="left_btn">左</div>
              <div class="right_btn">右</div>
            </div>
          </div>
          <div class="search_bar_bottom">
            <div class="search_bar_bottom_left">
              <input type="text" placeholder="请输入关键字">
              <span>价格筛选（小批量）：</span>
              <input type="number" />-
              <input type="number" /> 
              <input type="button" value="在结果中搜索" class="serchBtn"/>
            </div>
            <div class="search_bar_bottom_right"><span>符合条件商品:119</span></div>
          </div>
        </div>
        <div class="search_content">
          <div class="search_content_item" v-for="(item,index) in 5" :key="index">
            <div class="search_content_item_leftImg" @click.stop="toProInfo">
              <img src="../../../img/bk_icon.png" alt class="leftTopTagImg"/>
              <img src="../../../img/proImg.jpg" alt />
              <div class="btngroup">
                <span @click.stop="toShowComparePanel(item)">对比</span>
                <span @click.stop="toEnshrine(item)">收藏</span>
              </div>
            </div>
            <div class="search_content_item_proMsg">
              <div class="search_content_item_proMsg_title">ST(意法半导体)/STM8S003F3P6TR 编带</div>
              <div class="search_content_item_data">
                <div class="search_content_item_data_item"><span>商品编号:</span>c52717</div>
                <div class="search_content_item_data_item"><span>品牌:</span>ST(意法半导体)</div>
                <div class="search_content_item_data_item"><span>封装规格:</span>TSSOP-20</div>
                <div class="search_content_item_data_item"><span>型号:</span>STM8S003F3P6TR</div>
                <div class="search_content_item_data_item"><span>描述: STM8 Series 8-bit 8 KB Flash 1 KB RAM 16 MHz Microcontroll</span>c52717</div>
              </div>
              <div class="search_content_item_other">
                <span><i style="color:gray;font-size:12px;">图标</i>数据手册</span>
                <span><i style="color:gray;font-size:12px;">图标</i>近似物料</span>
              </div>
              <div class="internationBrand">国际品牌</div>
            </div>
            <div class="search_content_item_due">
              <div class="search_content_item_due_title">含增值税</div>
              <div class="search_content_item_due_item">1+:<span class="goldWord">￥2.12</span></div>
              <div class="search_content_item_due_item">10+:<span class="goldWord">￥1.53</span></div>
              <div class="search_content_item_due_item">30+:<span class="goldWord">￥1.42</span></div>
              <div class="search_content_item_due_item">100+:<span class="goldWord">￥1.32</span></div>
              <div class="search_content_item_due_item">500+:<span class="goldWord">￥1.25</span></div>
              <div class="search_content_item_due_item">1000+:<span class="goldWord">￥1.24</span></div>
              <div class="search_content_item_due_item">2000+:<span class="goldWord quotePrice" @click="quotedPrice">报价</span></div>
            </div>
            <div class="search_content_item_stock">
              <div class="search_content_item_stock_item">1圆盘由<span class="goldWord">2500</span>片</div>
              <div class="search_content_item_stock_item">近期预售：<span class="goldWord">113圆盘多</span>片</div>
              <div class="search_content_item_stock_item">库存：<span class="goldWord">35598</span>片</div>
              <div class="buyBtn">我要买</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 对比组件 -->
    <compareBoard ref="compareBoard" />
    <div class="toCompare" ref="comparePanel" v-if="false">
      <!-- 点击对比按钮的时候弹出 -->
      <div class="toCompareTitle">
        <span>对比栏</span>
        <span class="cancel" @click="toColComparePanel">X</span>
      </div>
      <div class="toCompareContent" >
        <div class="toCompareItem" v-for="(item,index) in compareList" :key="index">
          <div class="compareLogo" >
            <img :src="item.imgUrl" alt />
          </div>
          <div class="compareDetail">
            <div class="compareDetailTop"><div class="title">{{item.title}}</div><span class='deleteCompareItem'>删除</span></div>
            <div class="compareDetailModel">{{item.model}}</div>
            <div class="compareDetailBottom">
              <select>
                <option :value="item1" v-for="(item1,index1) in item.containDueList" :key="index1" >{{item1}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="toCompareItem" v-if="compareList.length == 0">
          <div class="compareLogo">1</div>
          <div class="compareDetail">你还可以继续添加</div>
        </div>
        <div class="toCompareItem" v-if="compareList.length <=1">
          <div class="compareLogo">2</div>
          <div class="compareDetail">你还可以继续添加</div>
        </div>
        <div class="toCompareItem" v-if="compareList.length <=2">
          <div class="compareLogo">3</div>
          <div class="compareDetail">你还可以继续添加</div>
        </div>
        <div class="tooPerateArea">
          <div class="compareBtn">对比</div>
          <div class="clearCompare" @click="clearComparePanel">清空对比栏</div>
        </div>
        <!-- //imgUrl title model containDueList -->
      </div>
    </div>
    <!-- ifQuotedPrice -->
    <div class="toQPrice" ref="comparePanel" v-if="ifQuotedPrice">
      <!-- 点击报价按钮的时候弹出 -->
      <div class="toQPriceBlock">
        <div class="toQPriceTitle">
          <span>申请报价</span>
          <span class="cancel" @click="toColQuotedPanel">X</span>
        </div>
        <div class="toQPriceContent">
          <div class="line1">
            <div class="left">
              <span style="color:red">*</span>
              <span>期望价格:</span>
              <div class="expectprice">
                <span>￥</span>
                <input type="text" />
              </div>
              <span>/PCS</span>
            </div>
            <div class="right">
              <span style="color:red" >*</span>
              <span>需求数量:</span>
              <div class="needNum">
                <input type="text" />
                <select>
                  <option value="片">片</option>
                  <option value="圆盘">圆盘</option>
                </select>
              </div>
            </div>
          </div>
          <div class="line2">
            <span style="width:60px;text-align:right">行业：</span>
            <div class="chooseWhich">
              <span>{{chooseWhich}}</span><!--用来存放选择的值-->
              <span class="fa fa-caret-down" @click="toShowList"></span>
              <div class="selectList" ref="selectList" style="display:none" >
                <span v-for="(item,index) in 20" :key="index" @click="toChoose(item)" :class="{linkChoose:chooseWhich == item}" >行业分销服务</span>
              </div>
            </div>
          </div>
          <div class="line3">
            <span @click="commitQuote">提交报价</span>
          </div>
          <div class="quoteDesc">
            <h4>说明:</h4>
            <p>1.期望价格提交后，商品将自动加入购物车，报价过程中该商品不能提交订单；</p>
            <p>2.商品将于30分钟内，根据您的报价更新合适的价格，晚上8点至次日早上8点不更新报价；</p>
            <p>3.商城更新后的报价，2小时内有效，请及时提交订单！</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <success-Tips v-if="ifShowShrineToast" :tipsCont="tipsContSuccess" v-on:ensureAndClose="ensureAndClose" ></success-Tips> -->
    <!-- <fail-Tips v-if="ifShowShrineToastF" :tipsCont="tipsCont" v-on:ensureAndCloseF="ensureAndCloseF" ></fail-Tips> -->
  </div>
</template>
<script>
import compareBoard from '../compareBoard/compareBoard'
import failTips from '../wedTips/fail'
import successTips from '../wedTips/success'
export default {
  components:{failTips,successTips,compareBoard},
  data () {
    return {
      showMore0:true,
      showMore1:true,
      showMore2:true,
      showMore3:true,
      tipsCont:'该商品已存在收藏夹',
      tipsContSuccess:'成功收藏',
      isShowComparePanel:false,//是否是显示对比栏面板
      //对比栏目的数据
      compareList:[
        {
          imgUrl:'../../../img/proImg.jpg',
          title:'10uF(106) ±20% 16V 编带',
          model:'CL10A106MO8NQNC',
          containDueList:['1+:￥2.12','10+:￥1.53','30+:￥1.42','100+:￥1.32','500+:￥1.25','1000+:￥1.24']
        },
      ],
      ifShowShrineToast:false,//一开始隐藏
      ifShowShrineToastF:false,
      ifQuotedPrice:false,//报价弹出框
      chooseWhich:"请选择"
    }
  },
  methods:{
    commitQuote(){
      this.ifQuotedPrice = false
    },
    toChoose(item){
      this.chooseWhich = item;
      this.$refs.selectList.style.cssText="display:none"
    },
    toShowList(){
       //console.log(1)
       //console.log(this.$refs.selectList.style.display == 'none')
      if(this.$refs.selectList.style.display == 'flex'){
         //console.log(this.$refs.selectList)
        this.$refs.selectList.style.cssText="display:none"
      }else if(this.$refs.selectList.style.display == 'none'){
         //console.log("ppkpjp")
         //console.log(this.$refs.selectList)
        this.$refs.selectList.style.cssText = 'display:flex'
      }
    },
    toColQuotedPanel(){
      this.ifQuotedPrice = false
    },
    quotedPrice(){
      this.ifQuotedPrice = true
    },
    toProInfo(){
       //console.log(1)
      this.$router.push({path:'/ReCommonDetail'});
    },
    ensureAndClose(val){
      this.ifShowShrineToast = val;
    },
    ensureAndCloseF(val){
      this.ifShowShrineToastF = val;
    },
    toEnshrine(){
      this.ifShowShrineToast = true;
      this.$refs.successTip.openToast();//打开成功的弹窗
    },
    hideShrineToast(){
      this.ifShowShrineToast = false;
    },
    hideShrineToastF(){
      this.ifShowShrineToastF = false;
    },
    toShowComparePanel(data){
      this.$refs.compareBoard.openAndAdd(data)
      // this.isShowComparePanel = true;

    },
    toColComparePanel(){
      this.isShowComparePanel = false;
      // this.$refs.comparePanel.style.display
    },
    clearComparePanel(){
       //console.log("清除对比数据")
    },
    toSearch(){
       //console.log("去搜索")
    },
    toRecommonDetail(){
       //console.log("去推荐详情页面")
    },
    showMore(index){
       //console.log(this.$refs.show)
       //console.log(1)
      if(this.$refs.show[index].style.height == '90px'){
        this.$refs.show[index].style.cssText='height:auto;'
      }else{
        this.$refs.show[index].style.cssText = 'height:90px;overflow:hidden'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.linkChoose{
  color:white;
  background:orange;
}
.mall_home_hotRecommon{
  width:100%;
  //对比弹出栏目
  .toCompare{
    z-index:500;
    width:1000px;
    height:150px;
    border:3px solid lightgray;
    background:white;
    position: fixed;
    bottom:0;
    left:15%;
    .toCompareTitle{
      width:100%;
      height:30px;
      background:rgb(240,240,240);
      padding:10px 10px;
      border:1px solid lightgray;
      box-sizing: border-box;
      display:flex;
      justify-content: space-between;
      align-items: center;
      font-size:16px;
      font-weight:bold;
      span:first-of-type{
        padding:5px;
        border-bottom:3px solid #0094e7;
      }
      span:nth-last-of-type(1){
        cursor: pointer;
      }
    }
    .toCompareContent{
      height:120px;
      box-sizing: border-box;
      display:flex;
      justify-content: space-between;
      align-items: center;
      .toCompareItem{
        width:290px;
        height:100%;
        padding:10px 10px;
        box-sizing: border-box;
        display:flex;
        align-items: center;
        .compareLogo{
          width:82px;
          height:82px;
          background:lightgray;
          color:gray;
          font-size:55px;
          line-height:82px;
          text-align:center;
          img{
            width:100%;
            height:100%;
          }
        }
        .compareDetail{
          margin-left:10px;
          //标记
          display:flex;
          height:100%;
          width:180px;
          padding:10px 0;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          .compareDetailTop{
            display:flex;
            justify-content: space-between;
            //compareDetailModel
            //compareDetailButton
            .deleteCompareItem{
              color:#0094e7;
              cursor: pointer;
            }
          }
        }
      }
      .tooPerateArea{
        width:80px;
        height:100%;
        border-left:1px solid lightgray;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .compareBtn{
          width:45px;
          height:25px;
          text-align: center;
          line-height:25px;
          background:#0094e7;
          color:white;
          padding:2px 4px;
          border-radius:3px;
          margin-bottom:20px;
          cursor: pointer;
        }
        .clearCompare{
          cursor: pointer;
          color:#0094e7;
        }
      }
    }
  }
  .toQPrice{
    //稍后处理
    // z-index:3000;
    border:3px solid lightgray;
    background:rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    display:flex;
    justify-content: center;
    align-items:center;
    .toQPriceBlock{
      width:589px;
      height:auto;
      border:3px solid lightgray;
      .toQPriceTitle{
        width:100%;
        height:30px;
        background:rgb(240,240,240);
        padding:10px 10px;
        border-bottom:1px solid rgb(230,230,230);
        box-sizing: border-box;
        display:flex;
        justify-content: space-between;
        align-items: center;
        font-size:14px;
        font-weight:bold;
        .cancel{
          cursor: pointer;
        }
      }
      .toQPriceContent{
        width:100%;
        min-height:300px;
        background:white;
        padding:20px;
        box-sizing: border-box;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        .line1{
          display:flex;
          align-items: center;
          justify-content: space-between;
          .left{
            display:flex;
            align-items: center;
            .expectprice{
              height:20px;
              line-height:20px;
              // line
              border:1px solid lightgray;
              margin-right:2px;
            }
            input{
              border:none;
              outline: none;
            }
          }
          .right{
            display:flex;
            align-items: center;
            select{
              width:40px;
              height:19px;
              line-height:19px;
              outline: none;
              box-sizing: border-box;
            }
            input{
              height:19px;
              line-height:19px;
              border:none;
              outline: none;
              box-sizing: border-box;
            }
            .needNum{
              padding:0 0 0 10px;
              height:21px;
              line-height:21px;
              border:1px solid lightgray;
              box-sizing: border-box;
            }
          }
        }
        .line2{
          display:flex;
          .chooseWhich{
            width:489px;
            height:20px;
            line-height:20px;
            border:1px solid lightgray;
            position: relative;
            padding:0 5px;
            box-sizing: border-box;
            .fa-caret-down{
              font-size:18px;
              float:right;
              line-height:20px;
              cursor: pointer;
            }
            .selectList{
              width:487px;
              // height:20px;
              position: absolute;
              left:0;
              top:19px;
              display:flex;
              flex-wrap: wrap;
              border:1px solid lightgray;
              padding:10px;
              box-sizing: border-box;
              display:none;
              span{
                width:20%;
                text-align:center;
                margin-right:13%;
                margin-bottom:5px;
                border-radius:3px;
              }
              span:hover{
                // color:#0094e7;
                cursor: pointer;
              }
            }
          }
        }
        .line3{
          margin-top:40px;
          margin-bottom:20px;
          width:100%;
          text-align:center;
          span{
            padding:10px 20px;
            text-align:center;
            color:white;
            background:orange;
            border-radius:3px;
            cursor: pointer;
          }
        }
        .quoteDesc{
          line-height:20px;
          h4{
            color:red;
          }
        }
      }
    }
  }
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
          background:lightgoldenrodyellow;
          padding:20px;
          margin-top:20px;
          box-sizing: border-box;
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
          padding:20px;
          margin-top:20px;
          box-sizing: border-box;
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
  .mall_homr_hotRecommon_wrap{
    width:100%;
    height:442px;
    background-image:url(../../../img/hotBanner.png);
    background-repeat: no-repeat;
    background-size:100% 100%;
  }
  .mall_home_content_wrap{
    padding:20px 0;
    .mall_home_content{
      margin-top:20px;
      margin-bottom:20px;
      width:1200px;
      margin:0 auto;
      border:1px solid lightgray;
      min-height:300px;
      padding:20px;
      box-sizing: border-box;
      .mall_home_content_item{
        display:flex;
        height:90px;//预先样式就是小的
        overflow: hidden;
        margin-top:20px;
        border-bottom:1px dashed lightgray;
        padding-bottom:10px;
        box-sizing:border-box;
        // justify-content: space-between;
        .pro_title{
          width:100px;
          text-align: right;
        }
        .pro_content{
          display:flex;
          .pro_content_item{
            width:170px;
            padding:10px 10px;
            margin-right:50px;
            margin-left:20px;
            line-height:25px;
            display:flex;
            flex-direction: column;
            box-sizing: border-box;
            span:hover{
              color:#0094e7;
              cursor: pointer;
            }
          }
          // .pro_content_item:nth-last-of-type(1){
          //   color:red;
          //   border:none;
          // }
        }
        .btn_group{
          width:120px;
          display:flex;
          justify-content: space-between;
          .more{
            cursor: pointer;
          }
        }
      }
      .mall_home_content_item:nth-last-of-type(1){
        border:none;
      }
    }
  }
  .mall_home_search_wrap{
      width:100%;
    .mall_home_search_content{
      width:1200px;
      margin:0 auto;
      .search_bar{
        width:100%;
        background:rgb(240,240,240);
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:center;
        .search_bar_top{
          width:100%;
          height:45px;
          line-height:45px;
          display:flex;
          justify-content: space-between;
          .search_choose{
            display:flex;
            div{
              text-align:center;
              width:70px;
              border-right:1px solid rgb(220,220,220);
            }
            div:hover{
              background: #0094e7;
              cursor: pointer;
              color:white;
            }
          }
          .search_btn{
            height:100%;
            display:flex;
            div{
              width:50px;
              height:100%;
              text-align:center;
              border:rgb(220,220,220);
            }
            .left_btn,.right_btn{
              border-left:1px solid rgb(220,220,220);
            }
            .left_btn:hover,.right_btn:hover{
              background:#0094e7;
              cursor: pointer;
              color:white;
            }
          }
        }
        .search_bar_bottom{
          width:100%;
          height:40px;
          display:flex;
          justify-content: space-between;
          align-items:center;
          background:rgb(248,248,248);
          .search_bar_bottom_left{
            input{
              height:20px;
              margin-right:5px;
              text-align:center;
            }
            .serchBtn{
              background:gray;
              color:white;
              border:none;
              font-size:12px;
              padding:2px;
              outline: none;
              box-sizing: border-box;
            }
            .serchBtn:hover{
              background:#0094e7;
              color:white;
            }
          }
          .search_bar_bottom_right{
            color:red;
            
          }
        }
      }
      .search_content{
        background:white;
        box-sizing: border-box;
        display:flex;
        flex-direction: column;
        .search_content_item{
          width:100%;
          min-height:100px;
          padding:10px;
          border-bottom:1px solid lightgray;
          display:flex;
          justify-content: space-between;
          line-height:25px;
          margin-top:10px;
          margin-bottom:10px;
          box-sizing: border-box;
          // box-shadow: 5px 5px 5px transparent;
          .search_content_item_leftImg{
            width:96px;
            height:96px;
            position: relative;
            img{
              width:100%;
              height:100%;
            }
            .leftTopTagImg{
              width:45px;
              height:39px;
              position: absolute;
            }
            .btngroup{
              display:flex;
              justify-content: space-between;
              span{
                flex:1;
                height:20px;
                line-height:20px;
                text-align:center;
                border:1px solid lightgray;
                color:gray;
                cursor: pointer;
              }
              span:hover{
                z-index:200;
                color:orange;
                border:1px solid orange;
              }
              span:nth-last-of-type(1){
                // border-left:none;
                margin-left:-1px;
              }
            }
          }
          .search_content_item_proMsg{
            width:350px;
            flex-wrap:wrap;
            margin-right:200px;
            .search_content_item_proMsg_title{
              font-size:14px;
              color:#0094e7;
            }
            .search_content_item_data{
              display:flex;
              flex-wrap: wrap;
              justify-content: space-between;
              .search_content_item_data_item{
                width:150px;
              }
              .search_content_item_data_item:nth-last-of-type(1){
                width:100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .search_content_item_other{
              color:#0094e7;
              span{
                margin-right:15px;
              }
            }
            .internationBrand{
              width:80px;
              padding:5px;
              border:1px solid #0094e7;
              color:#0094e7;
              text-align:center;
              box-sizing:border-box;
              margin-top:10px;
            }
            .internationBrand:hover{
              color:white;
              background:#0094e7;
            }
          }
          .search_content_item_due{
            .search_content_item_due_item{
              .goldWord{
                color:orangered;
              }
              .quotePrice{
                color:#0094e7;
                cursor: pointer;
              }
            }
          }
          .search_content_item_stock{
            text-align:right;
            display:flex;
            flex-direction: column;
            align-items: flex-end;
            .search_content_item_stock_item{
              .goldWord{
                color:orangered;
              }
            }
            .buyBtn{
              width:100px;
              height:40px;
              background:orangered;
              color:white;
              text-align:center;
              font-size:14px;
              line-height:40px;
              border-radius:2px;
              margin-top:30px;
              cursor: pointer;
            }
          }
        }
        .search_content_item:hover{
           border-bottom:1px solid transparent;
          box-shadow: 0 0 3px lightgray;
        }
      }
    }
  }
}
.less{
  height:100px;
  overflow: hidden;
}
.more{
  height:auto;
}
</style>
