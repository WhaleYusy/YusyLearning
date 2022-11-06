<template>
  <div class="outland-buy">
    <div class="o-title-box">
      <div class="t-left">2019年07月13日{{titleTxt}}</div>
      <div class="t-right">
        <el-button size="small">
          往期回顾
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>
    </div>
    <div class="o-carousel">
      <div class="c-left" @click="onMainViewClick">
        <div class="c-l-title">大盘指数</div>
        <div class="c-l-content">
          <div class="c-warp">
            <div class="l-num">1006.25</div>
            <div class="l-num-box">
              <span>-0.03</span>
              <span>0%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="c-right">
        <el-carousel indicator-position="none" height="200px" :autoplay="false">
          <el-carousel-item v-for="item in 4" :key="item">
            <div class="c-flex">
              <div
                class="c-item"
                v-for="(val,key) in 4"
                :key="val"
                @click="onCarousel(key)"
                :class="isActive == key ? 'isActive' : ''"
              >
                <div class="i-title">电容指数{{key}}</div>
                <div class="c-warp">
                  <div class="l-num">1006.25</div>
                  <div class="l-num-box">
                    <span>-0.03</span>
                    <span>0%</span>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="o-chart">
      <div class="c-left c-warp">
        <div class="l-title">
          <p>自选关注</p>
        </div>
        <div class="l-content">
          <div class="warp">
            <div class="l-flex">
              <div class="l-item">型号</div>
              <div class="l-item">品牌</div>
              <div class="l-item">价格指数</div>
            </div>
            <div class="l-con">
              <el-button type="primary" size="small">增加关注型号</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="c-right c-warp">
        <div class="c-nav">
          <div
            :class="activeName == k ? 'b-active' : ''"
            class="r-btn"
            v-for="(v,k) in 4"
            :key="k"
            @click="onNavClick(k)"
          >走势图{{k+1}}</div>
          <div class="r-box">
            <p class="first">最近30天指数报表</p>
            <p>更新时间：2019/07/12 22:11</p>
          </div>
        </div>
        <div class="r-content">
          <div class="msg">电感/磁珠/变压器指数周走势分析图</div>
          <ve-candle :data="chartData" class="charts" height="520px"></ve-candle>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table-content">
      <div class="table-flex">
        <p class="title">电感/磁珠/变压器主要型号价格行情</p>
        <p>更新时间：2019/07/12 22:11</p>
      </div>
      <el-table :data="tableData" style="width: 100%" border>
        <template slot="empty">
          <div class="no-more">
            <img src="../../falseData/img/no-goods.png" alt />
            <p>暂无即将开始的拼团，请耐心等待开团！</p>
          </div>
        </template>
        <el-table-column label="分类" width="150">
          <template>
            <p>叠层电感</p>
          </template>
        </el-table-column>
        <el-table-column label="型号" width="200">
          <template>
            <p>LBR2012T101K</p>
          </template>
        </el-table-column>
        <el-table-column label="品牌" width="200">
          <template>
            <p>Taiyo Yuden(太阳诱电)</p>
          </template>
        </el-table-column>
        <el-table-column label="封装" width="100">
          <template>
            <p>0805</p>
          </template>
        </el-table-column>
        <el-table-column label="价格指数" width="100">
          <template>
            <p>0.1976</p>
          </template>
        </el-table-column>
        <el-table-column label="最高价" width="100">
          <template>
            <p style="color: red;">￥0.1976</p>
          </template>
        </el-table-column>
        <el-table-column label="最低价" width="100">
          <template>
            <p style="color: #09F;">￥0.1976</p>
          </template>
        </el-table-column>
        <el-table-column label="月价格走势">
          <template slot-scope="scope">
            <div class="price">
              <el-tooltip content="当前商品月价格趋势" placement="left" effect="light">
                <el-tag size="medium">平</el-tag>
              </el-tooltip>
              <el-popover trigger="hover" placement="left">
                <div style="text-align: center;padding: 30px 0;">当前商品月价格趋势图</div>
                <ve-candle :data="chartData" width="520px"></ve-candle>
                <div slot="reference" class="name-wrapper">
                  <i class="el-icon-data-line" @mouseenter="onMainViewClick"></i>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="我要买" width="100">
          <template>
            <el-button size="mini" type="primary">购买</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 0,
      chartData: {
        columns: ["日期", "open", "close", "lowest", "highest", "vol"],
        rows: []
      },
      isActive: null,
      tableData: [1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1],
      titleTxt: "电阻行情指数"
    };
  },
  created() {
    this.getChartsData();
  },
  methods: {
    // 获取数据
    getChartsData() {
      this.chartData.rows = [
        {
          日期: "2004-01-05",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-06",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-07",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-08",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-09",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-12",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-13",
          oopen: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-14",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-15",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-16",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-20",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-21",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-22",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-23",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-26",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-27",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-28",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-29",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-01-30",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-02",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-03",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-04",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-05",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-06",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-09",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-10",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-11",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-12",
          open: 10735.18,
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-13",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-17",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-18",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-19",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-20",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-23",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-24",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-25",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-26",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        },
        {
          日期: "2004-02-27",
          open: Math.random() * 100000,
          close: Math.random() * 100000,
          lowest: Math.random() * 100000,
          highest: Math.random() * 100000,
          vol: Math.random() * 10000000000000
        }
      ];
    },

    // 导航点击
    onNavClick(index) {
      this.activeName = index;
      this.getChartsData();
    },

    // 轮播图点击
    onCarousel(index) {
      this.titleTxt = `电容指数${index}数据`;
      this.isActive = index;
      this.getChartsData();
    },

    // 主视图点击
    onMainViewClick() {
      this.getChartsData();
    }
  }
};
</script>
<style lang="scss" scoped>
.outland-buy {
  .o-title-box {
    display: flex;
    width: 1200px;
    margin: auto;
    padding: 15px 0;
  }
  .t-left {
    flex: 1;
    display: flex;
    font-size: 23px;
    align-items: center;
    font-weight: bold;
  }
  .o-carousel {
    display: flex;
    width: 1200px;
    height: 200px;
    margin: 0 auto 20px;
    .c-left {
      flex-basis: 300px;
      border: 1px solid #eeeeee;
      display: flex;
      .c-l-title {
        flex-basis: 70px;
        background: #e3f1fe;
        font-size: 23px;
        display: flex;
        align-items: center;
        padding: 0 15px 0 20px;
        box-sizing: border-box;
      }
      .c-l-content {
        flex: 1;
        display: flex;
        .c-warp {
          margin: auto;
          color: #009900;
          font-weight: bold;
          .l-num {
            font-size: 40px;
          }
          .l-num-box {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            font-size: 16px;
          }
        }
      }
      &:hover {
        border: 1px solid #09f;
        cursor: pointer;
      }
    }
    .c-right {
      flex: 1;
      margin-left: 10px;
      height: 200px;
      box-sizing: border-box;
    }
  }
  .o-chart {
    width: 1200px;
    margin: 0 auto 20px;
    height: 570px;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    .c-warp {
      height: 570px;
      box-sizing: border-box;
    }
    .c-left {
      flex-basis: 300px;
      display: flex;
      flex-direction: column;
      .l-title {
        color: white;
        border-bottom: 2px solid #09f;
        font-size: 14px;
        height: 41px;
        p {
          display: inline-block;
          background: #09f;
          line-height: 41px;
          padding: 0 20px;
          font-size: 14px;
        }
      }
      .l-content {
        flex: 1;
        border: 1px solid #eeeeee;
        overflow: hidden;
        width: 100%;
        .warp {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          .l-flex {
            width: 100%;
            flex-basis: 40px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            background: #e3f1fe;
            font-size: 14px;
          }
          .l-con {
            flex: 1;
            overflow: auto;
            height: 100%;
            display: flex;
            button {
              margin: auto;
            }
          }
        }
      }
    }
    .c-right {
      flex: 1;
      margin-left: 10px;
      display: flex;
      width: 100%;
      flex-direction: column;
      .c-nav {
        border-bottom: 2px solid #09f;
        flex-basis: 40px;
        display: flex;
        position: relative;
        .r-btn {
          border: 1px solid #eeeeee;
          border-right: 1px solid transparent;
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          font-size: 14px;
          cursor: pointer;
          &:nth-of-type(4) {
            border-right: 1px solid #eeeeee;
          }
        }
        .b-active {
          background: #09f;
          color: white;
          border: 1px solid #09f;
        }
        .r-box {
          position: absolute;
          right: 0;
          top: 2px;
          display: flex;
          height: 40px;
          line-height: 40px;
          p {
            background: #e3f1fe;
            margin-left: 15px;
            padding: 0 15px;
          }
          .first {
            cursor: pointer;
            &:hover {
              color: #09f;
            }
          }
        }
      }
      .r-content {
        flex: 1;
        width: 100%;
        height: 100px;
        border: 1px solid #eeeeee;
        border-top: none;
        box-sizing: border-box;
        .msg {
          padding: 30px 0;
          font-size: 16px;
          text-align: center;
        }
        .charts {
          box-sizing: border-box;
        }
      }
    }
  }
  .table-content {
    width: 1200px;
    margin: 20px auto;
    .no-more {
      padding: 150px 0;
    }
    .table-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      background: #eeeeee;
      padding: 0 10px;
      .title {
        color: #09f;
      }
    }
  }
}

// element ui 轮播及表格内容样式
.c-right /deep/ .c-flex {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.c-right /deep/ .c-item {
  height: 200px;
  width: 25%;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
}
.c-right /deep/ .isActive {
  border: 1px solid #09f;
}
.c-right /deep/ .c-item:last-of-type {
  margin-right: 0;
}
.c-right /deep/ .c-item:hover {
  border: 1px solid #09f;
  cursor: pointer;
}
.c-right /deep/ .i-title {
  flex-basis: 50px;
  background: #e3f1fe;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px 0 20px;
  box-sizing: border-box;
  font-weight: bold;
}
.c-right /deep/ .c-warp {
  margin: auto;
  color: #666666;
}
.c-right /deep/ .c-warp .l-num {
  font-size: 20px;
  font-weight: bold;
}
.c-right /deep/ .c-warp .l-num-box {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 16px;
}
.table-content /deep/ .price {
  display: flex;
}
.table-content /deep/ .price i {
  font-size: 30px;
  padding-left: 10px;
  color: gray;
  cursor: pointer;
}
</style>
