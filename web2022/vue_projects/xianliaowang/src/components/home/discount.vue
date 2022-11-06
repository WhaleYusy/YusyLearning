<template>
  <div class="discount">
    <div class="d-warp">
      <div class="top-box">
        <div class="t-left">
          <!-- <div class="timeDown">
            <span class="time_line">倒计时</span>
            <span class="time_span">00</span>
            <span class="time_line">天</span>
            <span class="time_span">00</span>
            <span class="time_line">时</span>
            <span class="time_span">00</span>
            <span class="time_line">分</span>
            <span class="time_span">00</span>
          </div>-->
        </div>
        <div class="t-right">
          <div class="t-search">
            <el-input
              placeholder="请输入您要查找的商品名称或品牌"
              class="input-with-select"
              v-model="keyWords"
              clearable
            >
              <el-button slot="append" icon="el-icon-search" @click="onSearch" :loading="loading"></el-button>
            </el-input>
          </div>
        </div>
      </div>
      <div class="bottom-box">
        <!-- <sel-filter :get-list="filterList" @get-sel-data="getFilterSelData"></sel-filter> -->
        <!-- 表格 -->
        <div class="d-table">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#09F',color:'#fff'}"
            :row-style="{background:'#F6F5BF'}"
            v-loading="loading"
            element-loading-text="拼命搜索中"
          >
            <template slot="empty">
              <div class="no-more">
                <img src="../../falseData/img/no-goods.png" alt />
                <p>暂无即将开始的优惠活动，请耐心等待！</p>
              </div>
            </template>
            <el-table-column label="商品主图" width="110" >
              <template slot-scope="scope">
                <img :src="scope.row.goodsMain || scoped.row.brandImage || defaultImg" alt style="width: 100px;height: 100px;" />
              </template>
            </el-table-column>
            <el-table-column label="商品名称" width="210" prop="name"></el-table-column>
            <el-table-column label="品牌" width="90" prop="brandName"></el-table-column>
            <el-table-column label="说明" width="200">
              <template slot-scope="scope">
                <p>原厂料号：{{scope.row.materiaCode}}</p>
                <p>最小包装量：{{scope.row.packageDesc}}{{scope.row.unitName}}</p>
                <!-- <p>公司料号： {{scope.row.selfMateriaCode}}</p> -->
                <p>规格：{{scope.row.spec}}</p>
                <!-- <p>运费模板: {{scope.row.templateName}}</p> -->
              </template>
            </el-table-column>
            <el-table-column label="库存(pcs)" width="100" prop="stockNum"></el-table-column>
            <el-table-column label="原价" width="100" prop="goodsPrice"></el-table-column>
            <el-table-column label="促销价" width="100" prop="discountPrice"></el-table-column>
            <el-table-column label="结束时间" width="150" prop="endTime"></el-table-column>
            <el-table-column label="我要买" style="border:1px solid red;">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="onPurchase(scope.row)">加入购物车</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页 -->
        <div class="dividePageBar">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 购物车组件 -->
    <cart @fresh="requestCartNum" ref="cart" />
  </div>
</template>

<script>
import cart from "../cart/cart.vue"
import selFilter from "@/components/selFilter/selFilter";
export default {
  components: {
    selFilter,cart
  },
  data() {
    return {
      defaultImg:require('../../../img/logo.png'),
      tableData: [],
      filterList: [],
      filterSelData: [], // 过滤选中的数据
      tableParam: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      currentPage: 0,
      keyWords: "",
      loading: false,
    };
  },
  mounted() {
    this.filterList = [
      {
        title: "分类：",
        childer: [
          {
            value: "全部",
            active: true
          },
          {
            value: "漂浮素材",
            active: false
          },
          {
            value: "效果元素",
            active: false
          },
          {
            value: "卡通手绘",
            active: false
          },
          {
            value: "装饰图案",
            active: false
          },
          {
            value: "图标元素",
            active: false
          },
          {
            value: "促销标签",
            active: false
          },
          {
            value: "边框纹理",
            active: false
          },
          {
            value: "不规则图形",
            active: false
          },
          {
            value: "表情包213123",
            active: false
          },
          {
            value: "表情包2323",
            active: false
          },
          {
            value: "表情包1111",
            active: false
          },
          {
            value: "表情包3333",
            active: false
          },
          {
            value: "表情包444",
            active: false
          }
        ]
      },
      {
        title: "品牌：",
        childer: [
          {
            value: "全部",
            active: true
          },
          {
            value: "PSD",
            active: false
          },
          {
            value: "AI",
            active: false
          },
          {
            value: "EPS",
            active: false
          }
        ]
      },
      {
        title: "封装：",
        childer: [
          {
            value: "推荐",
            active: true
          },
          {
            value: "昨日热门",
            active: false
          },
          {
            value: "最新上传",
            active: false
          },
          {
            value: "热门下载",
            active: false
          },
          {
            value: "热门收藏",
            active: false
          }
        ]
      }
    ];
    this.findDiscountGoodsPage(this.tableParam);
  },
  methods: {
    // 购买点击
    onPurchase(data, ind) {
      //传参数给购物车组件
      this.$refs.cart.open(data);
    },
    // 搜索
    onSearch() {
      let param = {
        pageNum: 1,
        pageSize: 10,
        keyWords: this.keyWords
      };
      this.findDiscountGoodsPage(param);
    },
    // 获取表格数据
    findDiscountGoodsPage(param) {
      this.loading = true;
      param.goodsType = 2
      this.$http
        .post("/pc/ordinaryGoods/findOrdinaryGoodsPage", { ...param })
        .then(res => {
          //判断是否登录了的（没有登录则导航到登录页面）
          // this.$http.judgeIfLogin(res, this);
          console.log(res)
          this.loading = false;
          this.tableData = res.data.data.list;
          this.total = res.data.data.count;
        })
        .catch(err => {
          this.loading = false;
          //console.log(err);
        });
    },

    // 获取筛选组件选中的值
    getFilterSelData(data) {
      this.filterSelData = data;
    },

    // 分页
    handleSizeChange(val) {
      this.tableParam.pageSize = val;
      this.findDiscountGoodsPage(this.tableParam);
    },
    handleCurrentChange(val) {
      this.tableParam.pageNum = val;
      this.findDiscountGoodsPage(this.tableParam);
    }
  }
};
</script>

<style scoped lang="scss">
.discount {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background: url("../../falseData/img/sale-banner.jpg") repeat-y;
  background-position: center 0;
  padding: 20px 0;
  .d-warp {
    border: 1px solid white;
    width: 1200px;
    margin: auto;
    background: #681ee5;
    padding: 3px;
    margin-top: 500px;
    .top-box {
      display: flex;
      margin: 20px 0;
      padding: 0 20px;
      .t-left {
        color: white;
        display: flex;
        box-sizing: border-box;
        height: 54px;
        align-items: center;
        font-size: 20px;
        .time_line {
          padding: 0 5px;
        }
        .time_span {
          min-width: 42px;
          padding: 0 4px;
          border-radius: 5px;
          box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.175);
          background-color: #d01b4b;
          font-size: 34px;
        }
      }
      .t-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .t-search {
          height: 40px;
          display: flex;
          box-sizing: border-box;
          overflow: hidden;
          width: 420px;
          i {
            font-size: 20px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            color: #cccccc;
          }
          input {
            width: 220px;
            height: 40px;
            border: 1px solid transparent;
            outline: none;
            padding: 0 5px;
            box-sizing: border-box;
            font-size: 12px;
          }
        }
      }
    }
    .bottom-box {
      background: #f6f5bf;
      padding: 15px;
      .dividePageBar {
        padding-top: 10px;
        text-align: right;
        box-sizing: border-box;
      }
      // 购物车的样式
      ///
      .d-table /deep/ .icon {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .d-table /deep/ .color1 {
        color: #09f;
        .name-wrapper {
          display: flex;
          align-items: center;
          img {
            padding-right: 5px;
          }
        }
      }
      .d-table /deep/ .color2 {
        color: #ff7300;
      }
    }
  }
}
.bottom-box /deep/ .el-table td {
  border-bottom: 1px solid #cccccc;
}
.bottom-box /deep/ .no-more {
  padding: 100px 0;
}
.el-button--mini{
  padding: 7px 14px!important; 
}
</style>

<style>
.el-popper .title {
  display: flex;
  margin: 5px 0;
}
</style>



