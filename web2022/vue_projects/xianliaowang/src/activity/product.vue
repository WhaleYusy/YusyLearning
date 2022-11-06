<template>
  <div class="product">
    <div class="p-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品对比</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="p-table">
      <div class="p-title">基本信息</div>
      <div class="p-box">
        <div class="b-title ">
          <div v-for="(v,k) in titleList" :key="k">{{v}}</div>
        </div>
        <div class="b-content">
          <div class="b-item" v-for="(v,k) in tableData" :key="k">
            <div class="img">
              <img :src="v.goodsMain || v.brandImage || defaultImg" alt />
            </div>
            <div>{{v.name || '暂无'}}</div>
            <div>{{v.brandName || '暂无'}}</div>
            <div>{{v.materiaCode || '暂无'}}</div>
            <div>{{v.spec || '暂无'}}</div>
            <div class="describe">{{v.remarks || '暂无'}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-table">
      <div class="p-title">定价与库存</div>
      <div class="p-box inven">
        <div class="b-title b_t2">
          <div v-for="(v,k) in titleList2" :key="k">{{v}}</div>
        </div>
        <div class="b-content ">
          <div class="b-item" v-for="(val,key) in tableData" :key="key">
            <div class="children">
              <div class="c-box c_bt2">
                <!-- <span>
                  <p v-for="(v, k) in val.children" :key="k">
                    {{v.label}}
                    <span>￥{{v.value}}</span>
                  </p>
                </span> -->
                {{val.goodsPrice || val.ledGoodsPrice}}
              </div>
            </div>
            <div>{{val.stockNum}}{{val.unitName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-table">
      <div class="p-title">其他</div>
      <div class="p-box">
        <div class="c-title">
          <div v-for="(v,k) in titleList3" :key="k">{{v}}</div>
        </div>
        <div class="c-content" >
          <div class="c-item" v-for="(val,key) in tableData" :key="key">
            <div class="color" @click="showDataBook" >
              <i class="el-icon-s-marketing"></i> 数据手册
            </div>
            <div>
              <el-button type="warning" size="small" @click="addToCart(val)">我要买</el-button>
            </div>
          </div>
          
        </div>
      </div>
      <!-- 提示框 -->
      <failTips :tipsCont="tipsContent" ref="failTip" />
      <!-- 购物车 -->
      <cart @fresh="requestCartNum" ref="cart" />
    </div>
  </div>
</template>

<script>
import failTips from '../components/wedTips/fail'
import cart from '../components/cart/cart'
export default {
  name: "product",
  components:{
    cart,failTips
  },
  data() {
    return {
      tipsContent:'',//提示内容
      tableData: [],
      titleList: [
        "商品图片",
        "商品名称",
        "品牌",
        "厂家型号",
        "封装规格",
        "商品介绍"
      ],
      titleList2: ["销售单价（含增值税）", "库存数量"],
      titleList3: ["数据手册", "操作"],
      defaultImg:require('../../img/logo.png'),
      stock:'',//库存
    };
  },
  created() {
    if (localStorage.getItem("productList")) {
      this.tableData = JSON.parse(localStorage.getItem("productList"));
       console.log(this.tableData);
    }
  },
  mounted(){
    
  },
  methods:{
    addToCart(data){
      //加购
      this.$refs.cart.open(data);
    },
    showDataBook(){
      this.tipsContent = '数据手册暂无资料'
      this.$refs.failTip.openFileToast();//显示失败弹窗提示 
      // this.ifShowShrineToastF = true
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  width: 1200px;
  margin: 15px auto;
  .p-breadcrumb {
    margin-bottom: 15px;
  }
  .p-table {
    .p-title {
      height: 40px;
      line-height: 40px;
      border: 1px solid #e8e8e8;
      border-bottom: none;
      font-size: 16px;
      padding: 0 15px;
      color: #666666;
    }
    .p-box {
      display: flex;
      border: 1px solid #e8e8e8;
      border-bottom: none;
      height: auto;
      font-size: 14px;
      color: #666666;
      .c-title {
        flex-basis: 180px;
        display: flex;
        flex-direction: column;
        div {
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-bottom: 1px solid #e8e8e8;
          border-right: 1px solid #e8e8e8;
          background: #f5f5f5;
        }
      }
      .b-title {
        flex-basis: 180px;
        display: flex;
        flex-direction: column;
        div {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-bottom: 1px solid #e8e8e8;
          border-right: 1px solid #e8e8e8;
          background: #f5f5f5;
          &:first-of-type {
            height: 340px;
            line-height: 340px;
          }
          &:last-of-type {
            border-bottom: none;
          }
        }
      }
      .b_t2{
        height:82px !important;
        div{
          &:first-of-type {
            height: 40px;
            line-height: 40px;
          }
        }
      }
      .c-content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        div {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-bottom: 1px solid #e8e8e8;
        }
        .c-item {
          flex: 1;
          border-right: 1px solid #e8e8e8;
          .color {
            cursor: pointer;
            color: #09f;
          }
          &:last-of-type {
            border-right: none;
          }
        }
      }
      .b-content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .b-item {
          flex: 1;
          border-right: 1px solid #e8e8e8;
          .img {
            width: 100%;
            box-sizing: border-box;
            padding: 20px 0 10px;
            overflow: hidden;
            height: 295px;
            img {
              box-sizing: border-box;
              width: 70%;
              height: 295px;
            }
          }
          .describe {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          div {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid #e8e8e8;
            &:first-of-type {
              height: 340px;
              line-height: 340px;
            }
            &:last-of-type {
              border-bottom: none;
            }
          }
          &:last-of-type {
            border-right: 1px solid transparent;
          }
          .children {
            line-height: 30px !important;
            div {
              line-height: 30px !important;
            }
            .c-box {
              display: flex;
              align-items: center;
              flex-direction: column;
              justify-content: space-around;
              p {
                span {
                  color: orange;
                  font-weight: bold;
                }
              }
            }

          }
        }
      }
    }
    .inven{
      height:83px;
      .children{
        height:40px !important;
      }
    }
  }
  // 提示框样式
}

.c_bt2:first-of-type{
  height:40px !important;
}

</style>


