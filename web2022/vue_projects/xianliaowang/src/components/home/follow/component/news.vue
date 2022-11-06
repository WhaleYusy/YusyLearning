<template>
  <div class="news">
    <div class="n-left">
      <div
        class="l-nav"
        v-for="(v,k) in 5"
        :key="k"
        :class="active == k ? 'l-is-active' : ''"
        @click="active = k"
      >询价通知{{k+1}}</div>
    </div>
    <div class="n-right">
      <el-alert title="系统正在自动为您搜索合适的供应商，当商品到货后请留意您的手机短信提醒。" type="info" show-icon :closable="false"></el-alert>
      <div class="n-table">
        <div class="n-form">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item>
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="国际一流" value="shanghai"></el-option>
                <el-option label="全球一流" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formInline.user" placeholder="型号/描述"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" size="mini">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <div class="table-content">
          <el-table :data="tableData" style="width: 100%">
            <template slot="empty">
              <div class="no-more">
                <img src="https://www.jzic.com/resources/v3/img/group/no-goods.png" alt />
                <p>暂无数据</p>
              </div>
            </template>
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
            <el-table-column label="分类" width="150">
              <template>
                <p>叠层电感</p>
              </template>
            </el-table-column>
            <el-table-column label="交期">
              <template>
                <p>2019-07-15</p>
              </template>
            </el-table-column>
            <el-table-column label="采购数量" width="100">
              <template>
                <p>1976</p>
              </template>
            </el-table-column>
            <el-table-column label="目标价格" width="100">
              <template>
                <p>￥0.1976</p>
              </template>
            </el-table-column>
            <el-table-column label="添加时间">
              <template>
                <p>2018-01-01</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [1, 1, 1, 1, 1, 1, 1, 1],
      active: 0
    };
  },
  methods: {
    onSubmit() {
       //console.log("submit!");
    }
  }
};
</script>

<style scoped lang="scss">
.news {
  width: 100%;
  display: flex;
  .n-left {
    flex-basis: 130px;
    border-right: 1px solid #e8e8e8;
    .l-nav {
      height: 34px;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
      border: 1px solid #e8e8e8;
      border-bottom: 1px solid transparent;
      border-right: 1px solid transparent;
      &:last-of-type {
        border-bottom: 1px solid #e8e8e8;
      }
    }
    .l-is-active {
      background: #09f;
      color: white;
      border: 1px solid #09f;
    }
  }
  .n-right {
    margin-left: 10px;
    flex: 1;
    .n-table {
      border: 1px solid #e8e8ee;
      margin-top: 10px;
      .n-form {
        background: #f5f5f5;
        height: 50px;
        padding: 5px 15px 0;
        box-sizing: border-box;
      }
      .table-content {
        width: 100%;
        .no-more {
          padding: 150px 0;
        }
      }
    }
  }
}
</style>


