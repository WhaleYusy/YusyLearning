<template>
  <!-- 对比的面板 -->
  <div class="toCompare" ref="comparePanel" v-if="isShowComparePanel">
    <!-- 点击对比按钮的时候弹出 -->
    <div class="toCompareTitle">
      <span>对比栏</span>
      <span class="cancel" @click="toColComparePanel">X</span>
    </div>
    <div class="toCompareContent">
      <div class="toCompareItem" v-for="(item,index) in selCompareArr" :key="index">
        <div class="compareLogo">
          <img
            :src="item.goodsMain || item.brandImage || defaultImg"
            alt
            @click.stop="toProInfo(item)"
          />
        </div>
        <div class="compareDetail">
          <div class="compareDetailTop">
            <div class="title proname" @click.stop="toProInfo(item)">{{item.name}}</div>
            <div class="title">{{item.remarks || '暂无描述'}}</div>
            <div
              class="containDuePrice"
            >￥{{item.goodsPrice || item.ledGoodsPrice}}/{{item.unitName}}</div>
            <span class="deleteCompareItem" @click="delSelCompareArr(index)">删除</span>
          </div>
        </div>
      </div>
      <div class="toCompareItem" v-if="selCompareArr.length == 0">
        <div class="compareLogo">1</div>
        <div class="compa">你还可以继续添加</div>
      </div>
      <div class="toCompareItem" v-if="selCompareArr.length <=1">
        <div class="compareLogo">2</div>
        <div class="compa">你还可以继续添加</div>
      </div>
      <div class="toCompareItem" v-if="selCompareArr.length <=2">
        <div class="compareLogo">3</div>
        <div class="compa">你还可以继续添加</div>
      </div>
      <div class="tooPerateArea">
        <div class="compareBtn" @click="addContrast(selCompareArr)">对比</div>
        <div class="clearCompare" @click="clearComparePanel">清空对比栏</div>
      </div>
      <!-- 失败提示组件 -->
      <failTips :tipsCont="tipsContent" ref="failTip" />
    </div>
  </div>
</template>
<script>
// 失败提示的组件
import failTips from "../wedTips/fail";
export default {
  name: "compareBoard",
  components: {
    failTips
  },
  data() {
    return {
      isShowComparePanel: false, //是否显示对比框，
      selCompareArr: [], //对比的数据
      selDataArr: [], //对比的数据
      ids: [], //存放对比数据id，以判断是否添加数据
      defaultImg: require("../../../img/logo.png"),
      tipsContent: "" //提示语句
    };
  },
  methods: {
    openAndAdd(data) {
      this.isShowComparePanel = true;
      if (this.selCompareArr.length > 2) {
        this.tipsContent = "对比栏已满";
        this.$refs.failTip.openFileToast(); //显示失败弹窗提示
      } else {
        //用一个ids来存储
        let index = this.ids.indexOf(data.goodsId);
        if (index == -1) {
          this.selDataArr.push(data);
          this.ids.push(data.goodsId);
        } else {
          // 这个是另外一个即将封装的提示组件
          // this.ifShowShrineToastF = true;
          this.tipsContent = "该商品已存在于对比栏";
          this.$refs.failTip.openFileToast(); //显示失败弹窗提示
        }
        this.selCompareArr = [...new Set(this.selDataArr)];
      }
    },
    toColComparePanel() {
      this.isShowComparePanel = false;
    },
    //渠道商品详情
    toProInfo(item) {
      if (this.$route.query.type == "normal") {
        this.$router.push({
          path: "/ReCommonDetail",
          query: { item: item.goodsId, type: "normal" }
        });
      } else {
        this.$router.push({
          path: "/ReCommonDetail",
          query: { item: item.goodsId }
        });
      }
    },
    // 单个清除对比数据
    delSelCompareArr(index) {
      this.ids.splice(index, 1);
      this.selCompareArr.splice(index, 1);
      this.selDataArr.splice(index, 1);
    },
    //进行对比
    addContrast() {
      if (this.selCompareArr.length <= 0) {
        this.tipsContent = "请先选择对比商品";
        this.$refs.failTip.openFileToast(); //显示失败弹窗提示
      } else if (this.selCompareArr.length == 1) {
        this.tipsContent = "至少选择两种商品进行对比";
        this.$refs.failTip.openFileToast(); //显示失败弹窗提示
      } else {
        localStorage.setItem("productList", JSON.stringify(this.selCompareArr));
        if (this.$route.query.type == "normal") {
          this.$router.push({
            path: "/home/product",
            query: { type: "normal" }
          });
        } else {
          this.$router.push("/home/product");
        }
      }
    },
    // 清除对比数据
    clearComparePanel() {
      this.ids = [];
      this.selDataArr = [];
      this.selCompareArr = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.toCompare {
  z-index: 1000;
  width: 1000px;
  height: 150px;
  border: 3px solid lightgray;
  background: white;
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -465px;
  .toCompareTitle {
    width: 100%;
    height: 30px;
    background: rgb(240, 240, 240);
    padding: 10px 10px;
    border: 1px solid lightgray;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    span:first-of-type {
      padding: 5px;
      border-bottom: 3px solid #0094e7;
    }
    span:nth-last-of-type(1) {
      cursor: pointer;
    }
  }
  .toCompareContent {
    height: 120px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .toCompareItem {
      width: 290px;
      height: 100%;
      padding: 10px 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .compareLogo {
        width: 82px;
        height: 82px;
        background: #f5f5f5;
        color: #cccccc;
        font-size: 55px;
        line-height: 82px;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .compa {
        margin-left: 10px;
        display: flex;
        height: 100%;
        width: 180px;
        padding: 10px 0;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        color: #cccccc;
      }
      .compareDetail {
        margin-left: 10px;
        display: flex;
        height: 100%;
        width: 180px;
        padding: 10px 0;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        .compareDetailTop {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          position: relative;
          .proname:hover {
            color: #0094e7;
            cursor: pointer;
          }
          .title {
            margin-right: 15px;
            width: 84%;
            margin-bottom: 15px;
          }
          .deleteCompareItem {
            color: #0094e7;
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
          }
        }
      }
    }
    .tooPerateArea {
      width: 80px;
      height: 100%;
      border-left: 1px solid lightgray;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .compareBtn {
        width: 45px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        background: #0094e7;
        color: white;
        padding: 2px 4px;
        border-radius: 3px;
        margin-bottom: 20px;
        cursor: pointer;
      }
      .clearCompare {
        cursor: pointer;
        color: #0094e7;
      }
    }
  }
}
</style>