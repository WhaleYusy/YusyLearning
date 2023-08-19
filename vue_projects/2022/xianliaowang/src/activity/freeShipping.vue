<template>
  <div class="freeShipping">
    <div class="location">
      <!-- <span>首页</span>
      <span>&gt;</span>
      <span>商城公告</span>
      <span>&gt;</span>
      <span class="locationNow">会员分级包邮活动上线</span> -->
    </div>
    <div class="activityContent">
      <div class="activityTitle">
        <h2>会员分级包邮活动上线，单月最高六次包邮</h2>
        <div class="viewNum">
          <span class="grayWord">阅读量:<span class="redWord">5501</span></span>
        </div>
      </div>
      <div class="activityDesc">
        <p>上一次包邮活动刚刚下线</p>
        <p>大家都表达了不舍之情</p>
        <p>尤其是老用户说</p>
        <p>包邮送多少次都！不！够！</p>
        <p>所以新活动又来啦</p>
        <div class="bannerImg">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2158342683,2497243850&fm=27&gp=0.jpg" alt/>
        </div>
        <p class="boldWord">单月最高享6次包邮 </p>
        <p class="boldWord">会员等级越高，次数越多 </p>
        <p>注册会员+铜牌会员1次，银牌2次，金牌3次，钻石4次，<span class="boldWord">皇冠6次</span>！</p>
        <div class="activityRule">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1662414753,1562172514&fm=27&gp=0.jpg" alt />
        </div>
        <p class="redBoldWord">&gt;&gt;查看会员等级说明&lt;&lt;</p>
        <p class="redBoldWord">&gt;&gt;立即下单&lt;&lt;</p>
        <div class="activityDescText">
          <p>活动规则：</p>
          <p>1）活动于2019年5月31日10:00开始，结束时间待定（官方将于活动结束前1天发布公告通知）；</p>
          <p>2）每月根据不同会员等级提供9.9元包邮次数，包邮次数按自然月清零，不做累加，请及时使用；</p>
          <p>3）单笔订单应付总额（不含运费）满9.9元包邮；</p>
          <p>4）包邮支持顺丰经济、京东、EMS、优速、跨越速运、速尔、加运美快递，不支持顺丰标准快递，不支持港澳台及海外地区；</p>
          <p>5）法律允许范围内，本次活动未尽事宜和最终解释权归闲料网所有。</p>
        </div>
      </div>
      <div class="share">
        <div class="bar">
          <div class="barBG">
            <div class="more" @mouseover="showmoreList" @mouseout="hidemoreList" @click="showPupUpShare">
              <div class="moreList" ref="moreList"  @mouseover="showmoreList" @mouseout="hidemoreList" >
                <div class="moreListTitle">分享到</div>
                <div class="moreListContent">
                  <div class="moreListItem" v-for="(item,index) in 16"><img src="../../img/qq.png" alt 
                  @mouseover="showmoreList"
                  /><span>一键分享</span></div>
                </div>
              </div>
            </div>
            <div class="wechat"></div>
            <div class="webo"></div>
            <div class="qzone"></div>
          </div>
          <div class="time">时间：2019-05-31 10:39</div>
        </div>
      </div>
    </div>
    <!-- tanchu -->
    <div class="moreList2" ref="moreList2"  style="display:none">
      <div class="moreListTitle">分享到(xihuanni )</div>
      <div class="moreListContent">
        <div class="moreListItem" v-for="(item,index) in 16"><img src="../../img/qq.png" alt /><span>一键分享</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout, clearTimeout } from 'timers';
export default {
  data (){
    return {
      timer:null
    }
  },
  mounted(){
     //console.log(this.$refs.moreList)
  },
  methods:{
    showPupUpShare(){
       //console.log(1)
      if(this.$refs.moreList2.style.display == 'block'){
         //console.log(22)
        this.$refs.moreList2.style.display == 'none'
         //console.log(this.$refs.moreList2)
      }else if(this.$refs.moreList2.style.display == 'none'){
         //console.log(33)
        this.$refs.moreList2.style.display == 'block'
         //console.log(this.$refs.moreList2)
      }
    },
    showmoreList(){
      clearTimeout(this.timer)
       //console.log(this.timer)
      this.$refs.moreList.style.display = 'block'
       //console.log("显示")
    },
    hidemoreList(){
      var that = this
      this.timer = setTimeout(function(){
        that.$refs.moreList.style.display = 'none'
       //console.log("消失")
      },200)

    }
  }
}
</script>
<style lang="scss" scoped>
  .freeShipping{
    width:1200px;
    margin:0 auto;
    .location{
      display:flex;
      height:40px;
      align-items: center;
      font-size:14px;
      span{
        margin-right:5px;
      }
      span:hover{
        cursor: pointer;
        color:#0094e7;
      }
      .locationNow{
        color:#0094e7;
        cursor: pointer;
      }
    }
    .activityContent{
      width:100%;
      min-height:200px;
      border:1px solid lightgray;
      padding:20px;
      box-sizing: border-box;
      .activityTitle{
        height:97px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h2{
          margin-bottom:10px;
        }
        .viewNum{
          .grayWord{
            color:gray;
            .redWord{
              color:red;
              margin-left:10px;
            }
          }
        }
      }
      .activityDesc{
        padding:20px 0;
        display:flex;
        flex-direction: column;
        justify-content: center;
        line-height:30px;
        font-size:16px;
        border-top:1px solid lightgray;
        border-bottom:1px solid lightgray;
        box-sizing: border-box;
        text-align:center;
        .bannerImg{
          width:100%;
          height:344px;
          img{
            width:476px;
            height:100%;
          }
        }
        .boldWord{
          color:#494949;
          font-size:16px;
          font-weight:bold;
        }
        .activityRule{
          width:100%;
          height:400px;
          img{
            width:778px;
            height:100%;
          }
        }
        .redBoldWord{
          color:#e53333;
          font-size:24px;
          font-weight:bold;
          margin-top:10px;
          cursor: pointer;
        }
        .activityDescText{
          text-align:left;
        }
      }
      .share{
        margin-top:10px;
        margin-bottom:10px;
        height:30px;
        .bar{
          height:100%;
          display:flex;
          justify-content: space-between;
          align-items: center;
          .barBG{
            min-width:140px;
            height:25px;
            background: url('../../img/bar.png') no-repeat;
            display:flex;
            align-items: center;
            .more{
              position: relative;
              .moreList{
                position: absolute;
                top:17px;
                left:-10px;
                width:170px;
                min-height:250px;
                background:white;
                border:1px solid green;
                display:flex;
                flex-direction: column;
                box-sizing: border-box;
                display:none;
                .moreListTitle{
                  width:100%;
                  height:25px;
                  line-height:25px;
                  padding-left:10px;
                  font-size:14px;
                  font-weight:bold;
                  background:lightgray;
                  margin:0;
                  box-sizing: border-box;
                }
                .moreListContent{
                  width:100%;
                  min-height:100px;
                  margin:0;
                  display:flex;
                  flex-wrap:wrap;
                  justify-content:space-between;
                  padding:2px;
                  box-sizing: border-box;
                  .moreListItem{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    width:75px;
                    height:21px;
                    border:1px solid transparent;
                    padding:0;
                    margin:0;
                    margin-bottom:5px;
                    cursor: pointer;
                    img{
                      width:20px;
                      height:20px;
                    }
                  }
                  .moreListItem:hover{
                    background:rgb(240,240,240);
                    border:1px solid #0094e7;
                  }
                }
              }
             
            }
            // .more:hover{
            //   .moreList{
            //     display:block;
            //   }
            // }
            // background-size: 100% 100%;
            div{
              width:15px;
              height:15px;
              margin-top:2px;
              margin-left:4px;
            }
            .more,.wechat,.webo,.qzone{
              border:1px solid green;
              cursor: pointer;
            }
            .more:hover,.wechat:hover,.webo:hover,.qzone:hover{
              background:rgba(188, 211, 233, 0.5)
            }
            .wechat{
              margin-left:55px;
            }
          }
          .time{
            min-width:200px;
            height:20px;
            color:gray;
            text-align:right;
            line-height:25px;
          }
        }
      }
    }
     .moreList2{
        z-index:10000000;
        // position: fixed;
        width:170px;
        min-height:250px;
        background:white;
        border:1px solid pink;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-sizing: border-box;
        .moreListTitle{
          width:100%;
          height:25px;
          line-height:25px;
          padding-left:10px;
          font-size:14px;
          font-weight:bold;
          background:lightgray;
          margin:0;
          box-sizing: border-box;
        }
        .moreListContent{
          width:100%;
          min-height:100px;
          margin:0;
          display:flex;
          flex-wrap:wrap;
          justify-content:space-between;
          padding:2px;
          box-sizing: border-box;
          .moreListItem{
            display:flex;
            justify-content: space-between;
            align-items: center;
            width:75px;
            height:21px;
            border:1px solid transparent;
            padding:0;
            margin:0;
            margin-bottom:5px;
            img{
              width:20px;
              height:20px;
            }
          }
          .moreListItem:hover{
            background:rgb(240,240,240);
            border:1px solid #0094e7;
          }
        }
      }
  }
</style>
