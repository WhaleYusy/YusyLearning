<template>
  <div class="freeIn">
    <div class="f-banner">
      <img src="../../falseData/img/banner.png" alt />
    </div>
    <div class="f-flex">
      <div class="l-item f-warp">
        <div class="l-box">
          <div class="f-img">
            <img class="img" src="../../falseData/img/rule_title.png" alt />
            <p>一、拼团规则</p>
          </div>
          <div class="f-msg">
            <p
              v-for="(v,k) in 3"
              :key="k"
            >{{k + 1}}、拼团商品数据以展示数据为准，无需进行确认，拼团商品不能使用优惠券；1、拼团商品数据以展示数据为准，无需进行确认，拼团商品不能使用优惠券；</p>
          </div>
        </div>
      </div>
      <div class="r-item f-warp">
        <div class="l-box">
          <div class="l-box">
            <div class="f-img">
              <img class="img" src="../../falseData/img/rule_title.png" alt />
              <p>二、拼团流程</p>
            </div>
            <div class="f-msg">
              <img src="../../falseData/img/follow.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="f-table">
      <div class="t-nav">
        <div
          class="t-item"
          v-for="(v,k) in navList"
          :key="k"
          :class="navActive == k ? 'nav-active' : ''"
          @click="onNavClick(k)"
        >
          <i :class="v.icon"></i>
          {{v.label}}
        </div>
      </div>
    </div>
    <div class="table-content">
      <el-table :data="tableData" style="width: 100%">
        <template slot="empty">
          <div class="no-more">
            <img src="../../falseData/img/no-goods.png" alt />
            <p>暂无即将开始的拼团，请耐心等待开团！</p>
          </div>
        </template>
        <el-table-column label="商品名称" width="210">
          <template>
            <div class="t-name">
              <div class="t-img">
                <img src="../../falseData/img/10.png" alt />
              </div>
              <div class="t-right">
                <div class="r-title">
                  <el-tooltip content="一起拼，价更低！" placement="top" effect="light">
                    <p>拼团</p>
                  </el-tooltip>
                  <span>陶瓷电容</span>
                </div>
                <div class="r-txt">CL10A475KP8NNNC</div>
                <div class="r-txt">4.7uF ±10% 10V X5R</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="品牌/封装" width="100">
          <template>
            <p>Murata(村田)0402</p>
          </template>
        </el-table-column>
        <el-table-column label="说明" width="180">
          <template>
            <p>商品编号：JZ155G7845274</p>
            <p>起订量： 60000</p>
            <p>4000/ 圆盘</p>
            <p>批次: 18+</p>
          </template>
        </el-table-column>
        <el-table-column label="库存(pcs)" width="100">
          <template>
            <p>0</p>
          </template>
        </el-table-column>
        <el-table-column label="交期(工作日)" width="100">
          <template>
            <p>1-2天</p>
          </template>
        </el-table-column>
        <el-table-column label="拼团价(含税)" width="100">
          <template>
            <div class="p-img">
              <img src="../../falseData/img/overIcon.png" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="拼团数量" width="100">
          <template>
            <p>9600000</p>
          </template>
        </el-table-column>
        <el-table-column label="距离活动结束还剩">
          <template>
            <p class="r-time">
              <span class="span">00</span>
              <span>天</span>
              <span class="span">00</span>
              <span>时</span>
              <span class="span">00</span>
              <span>分</span>
              <span class="span">00</span>
              <span>秒</span>
            </p>
            <p>已拼团成功！</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template>
            <el-button size="mini" type="info" disabled>已结束</el-button>
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
      navActive: 0,
      navList: [
        {
          label: "正进行中的拼团",
          icon: "el-icon-video-play"
        },
        {
          label: "即将开始的拼团",
          icon: "el-icon-time"
        }
      ],
      tableData: [1, 1, 1, 11, 1, 1, 1]
    };
  },
  methods: {
    // 导航点击
    onNavClick(index) {
      this.navActive = index;
      if (index == 1) {
        this.tableData = [];
      } else {
        this.tableData = [1, 1, 1, 11, 1, 1, 1];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.freeIn {
  background: linear-gradient(to bottom, #ffc282, #ffcd93, #ffe6b8);
  padding-bottom: 20px;
  .f-banner {
    height: 380px;
    width: 100%;
    img {
      height: 380px;
      width: 100%;
    }
  }
  .f-flex {
    height: 262px;
    display: flex;
    width: 1200px;
    margin: -20px auto 0;
    .l-item {
      padding-right: 10px;
    }
    .r-item {
      padding-left: 10px;
    }
    .f-warp {
      flex: 1;
      height: 262px;
      .l-box {
        height: 262px;
        background: white;
        box-sizing: border-box;
        .f-img {
          position: relative;
          .img {
            margin: 20px 0 0 -8px;
          }
          p {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-10%);
            font-size: 18px;
            font-weight: bold;
            color: white;
          }
        }
        .f-msg {
          padding: 0 20px 20px;
          height: 192px;
          overflow: auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          p {
            line-height: 20px;
            margin-bottom: 5px;
          }
          img {
            margin: auto;
          }
        }
      }
    }
  }
  .f-table {
    height: auto;
    width: 1200px;
    margin: 20px auto 0;
    .t-nav {
      display: flex;
      background-color: #e9e9e9;
      .t-item {
        flex: 1;
        text-align: center;
        height: 60px;
        font-size: 20px;
        color: #666666;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        i {
          padding-right: 5px;
          font-size: 26px;
        }
      }
      .nav-active {
        color: #ff7000;
        border-bottom: 3px solid #ff7000;
        background: white;
        position: relative;
        &::after {
          content: "";
          border-width: 10px;
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
          left: 50%;
          bottom: -20px;
          border-top-color: #ff7000;
        }
      }
    }
  }
  .table-content {
    width: 1200px;
    margin: 20px auto 0;
    background-color: #e9e9e9;
    .no-more {
      padding: 150px 0;
    }
    .t-name {
      display: flex;
      .t-img {
        width: 80px;
        height: 80px;
        display: flex;
        img {
          margin: auto;
          width: 70px;
          height: 70px;
        }
      }
      .t-right {
        flex-basis: 130px;
        box-sizing: border-box;
        .r-title {
          display: flex;
          p {
            border: 1px solid red;
            color: red;
            margin-right: 5px;
            padding: 0 5px;
          }
        }
        .r-txt {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 95%;
        }
      }
    }
    .p-img {
      img {
        width: 85px;
        height: 64px;
      }
    }
    .r-time {
      margin-bottom: 8px;
      .span {
        padding: 2px 2px 2px 2px;
        border-radius: 4px;
        color: #fff;
        display: inline-block;
        min-width: 18px;
        text-align: center;
        background-color: #999;
        margin: 0 3px;
      }
    }
  }
}
</style>

