<template>
  <div class="mall-code">
    <div class="banner">
      <img src="https://www.jzic.com/resources/v3/img/ious/iousBg1.jpg" alt class="img" />
      <div class="apply-box">
        <div class="a-item">
          <img src="https://www.jzic.com/resources/v3/icon/banner-phone.png" alt />
          <span>电话：</span>
          <span class="a-num">400-081-2823</span>
        </div>
        <div class="a-item">
          <img src="https://www.jzic.com/resources/v3/icon/banner-QQ.png" alt />
          <span>QQ：</span>
          <span class="a-num">4000812823</span>
        </div>
        <div class="a-btn">
          <el-button type="primary" size="small">立即申请</el-button>
        </div>
      </div>
    </div>
    <div class="c-msg">
      <h1>什么是共享库存？</h1>
      <p>深圳市九州电子之家有限公司打造的中国领先的标准电子元器件交易平台--电子之家（www.jzic.com)，融合九洲集团</p>
      <p>多年的供应链管理经验，将元器件传统交易与互联网深度结合，为广大客户提供标准元器件的采购、销售服务，并围绕元器件</p>
      <p>交易服务建立供应链金融、大数据、仓储、行业交流等周边的生态服务，“电子之家”平台致力于打造产业互联网生态，助力产业升级。</p>
    </div>
    <div class="c-cooperation">
      <div class="c-title">
        <p>合作流程</p>
      </div>
      <div class="c-img">
        <img src="https://www.jzic.com/resources/v3/img/gxkc/gxkc_liucheng.png" alt />
      </div>
    </div>
    <div class="c-cooperation advantage">
      <div class="c-title">
        <p>合作优势</p>
      </div>
      <div class="c-img">
        <img src="https://www.jzic.com/resources/v3/img/gxkc/gxkc_youshi.png" alt />
      </div>
    </div>
    <div class="c-carousel">
      <div class="c-flex">
        <div class="c-item">
          <p>最新询价</p>
          <div class="box left-box">
            <div class="c-box">
              <div class="c-title">
                <div class="t-item w-item1">时间</div>
                <div class="t-item w-item2">客户</div>
                <div class="t-item w-item3">型号</div>
                <div class="t-item w-item4">数量 (pcs)</div>
              </div>
              <div class="c-content">
                <vue-seamless
                  :data="listData"
                  class="seamless-warp"
                  :class-option="optionSingleHeight"
                >
                  <ul>
                    <li v-for="(item,key) in listData" :key="key">
                      <div class="c-warp">
                        <div class="w-item1 w-item">{{item.time}}</div>
                        <div class="w-item2 w-item">{{item.tel}}</div>
                        <div class="w-item3 w-item">{{item.type}}</div>
                        <div class="w-item4 w-item">{{key}}</div>
                      </div>
                    </li>
                  </ul>
                </vue-seamless>
              </div>
            </div>
          </div>
        </div>
        <div class="c-item">
          <p>最新交易记录</p>
          <div class="box right-box">
            <div class="c-box">
              <div class="c-title">
                <div class="t-item w-item1">时间</div>
                <div class="t-item w-item2">客户</div>
                <div class="t-item w-item3">型号</div>
                <div class="t-item w-item4">数量 (pcs)</div>
                <div class="t-item w-item5">金额</div>
              </div>
              <div class="c-content">
                <vue-seamless
                  :data="listData"
                  class="seamless-warp"
                  :class-option="optionSingleHeight"
                >
                  <ul>
                    <li v-for="(item,key) in listData" :key="key">
                      <div class="c-warp">
                        <div class="w-item1 w-item">{{item.time}}</div>
                        <div class="w-item2 w-item">{{item.tel}}</div>
                        <div class="w-item3 w-item">{{item.type}}</div>
                        <div class="w-item4 w-item">{{item.num}}</div>
                        <div class="w-item5 w-item">{{item.money + key}}</div>
                      </div>
                    </li>
                  </ul>
                </vue-seamless>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="c-cooperation advantage">
      <div class="c-title">
        <p>品牌传播</p>
      </div>
      <div class="c-img">
        <img src="https://www.jzic.com/resources/v3/img/gxkc/gxkc_brand.png" alt />
      </div>
    </div>
    <div class="c-cooperation">
      <div class="c-title">
        <p>合作知名品牌</p>
      </div>
      <div class="c-img">
        <img src="https://www.jzic.com/resources/v3/img/gxkc/gxkc_brand_all.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import vueSeamless from "vue-seamless-scroll";
export default {
  components: {
    vueSeamless
  },
  data() {
    return {
      listData: [
        {
          time: "2019-07-13",
          tel: "137*****733",
          type: "GRM1885C1H241JA01D",
          num: 0,
          money: 100
        }
      ]
    };
  },
  created() {
    for (let i = 0; i < 50; i++) {
      this.listData.push({
        time: "2019-07-13",
        tel: "137*****733",
        type: "GRM1885C1H241JA01D",
        num: 0,
        money: 100
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mall-code {
  .banner {
    height: 300px;
    position: relative;
    box-sizing: border-box;
    .img {
      width: 100%;
      height: 300px;
    }
    .apply-box {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 130px;
      width: 200px;
      height: 140px;
      background-color: #fff;
      padding: 20px;
      z-index: 0;
      .a-item {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 16px;
        img {
          margin-right: 5px;
        }
        .a-num {
          color: red;
        }
      }
      .a-btn {
        width: 100%;
        button {
          width: 100%;
          margin-top: 15px;
        }
      }
    }
  }
  .c-msg {
    background: white;
    padding: 50px;
    text-align: center;
    h1 {
      font-size: 30px;
      padding-bottom: 50px;
      color: #09f;
    }
    p {
      font-size: 16px;
      line-height: 30px;
    }
  }
  .c-cooperation {
    background: #f5f5f5;
    border: 1px solid transparent;
    height: auto;
    padding-bottom: 60px;
    .c-title {
      font-size: 30px;
      padding: 50px 0;
      text-align: center;
      color: #09f;
      position: relative;
      font-weight: bold;
      &::before {
        content: "";
        position: absolute;
        width: 300px;
        height: 2px;
        background: #cccccc;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 1;
      }
      p {
        display: inline;
        padding: 0 15px;
        background: #f5f5f5;
        z-index: 2;
        position: relative;
      }
    }
    .c-img {
      width: 1200px;
      margin: auto;
      display: flex;
      img {
        margin: auto;
      }
    }
  }
  .advantage {
    background: white;
    .c-title {
      p {
        background: white;
      }
    }
  }
  .c-carousel {
    background: #f5f5f5;
    .c-flex {
      display: flex;
      width: 1200px;
      margin: auto;
      .c-item {
        flex: 1;
        padding: 60px 0;
        p {
          text-align: center;
          font-size: 20px;
          color: #09f;
          font-weight: bold;
          padding-bottom: 30px;
        }
        .box {
          flex: 1;
          height: 360px;
          .c-box {
            height: 360px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 12px 0 rgab(0, 0, 0, 0.2);
            .c-title {
              flex-basis: 40px;
              background: #e3f1fe;
              display: flex;
              font-size: 14px;
              font-weight: bold;
              .t-item {
                height: 40px;
                text-align: center;
                line-height: 40px;
              }
              .w-item1 {
                flex-basis: 15%;
              }
              .w-item2 {
                flex-basis: 15%;
              }
              .w-item3 {
                flex: 1;
              }
              .w-item4 {
                flex-basis: 15%;
              }
              .w-item5 {
                flex-basis: 15%;
              }
            }
            .c-content {
              flex: 1;
              overflow: hidden;
              background: white;
              .c-warp {
                display: flex;
                .w-item {
                  height: 40px;
                  text-align: center;
                  line-height: 40px;
                  cursor: pointer;
                }
                .w-item1 {
                  flex-basis: 15%;
                }
                .w-item2 {
                  flex-basis: 15%;
                }
                .w-item3 {
                  flex: 1;
                }
                .w-item4 {
                  flex-basis: 15%;
                }
                .w-item5 {
                  flex-basis: 15%;
                }
              }
            }
          }
        }
        .left-box {
          padding-right: 10px;
        }
        .right-box {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
