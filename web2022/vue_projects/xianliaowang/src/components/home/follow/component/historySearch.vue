<template>
  <div class="n-right">
    <div class="n-table">
      <div class="n-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
          <el-form-item label="选择您查看的日期">
            <el-select v-model="formInline.years" placeholder="请选择年份">
              <el-option label="2019年" value="shanghai"></el-option>
              <el-option label="2018年" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.month" placeholder="请选择月份">
              <el-option label="1月" value="shanghai"></el-option>
              <el-option label="2月" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.day" placeholder="请选择天数">
              <el-option label="20" value="shanghai"></el-option>
              <el-option label="21" value="beijing"></el-option>
            </el-select>
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
          <el-table-column label="搜索日期">
            <template>
              <p>LBR2012T101K</p>
            </template>
          </el-table-column>
          <el-table-column label="您搜索了">
            <template>
              <p>Taiyo Yuden(太阳诱电)</p>
            </template>
          </el-table-column>
          <el-table-column label="搜索的数量">
            <template>
              <p>叠层电感</p>
            </template>
          </el-table-column>
          <el-table-column label="匹配结果">
            <template>
              <p>2019-07-15</p>
            </template>
          </el-table-column>
          <el-table-column label="去浏览">
            <template>
              <el-button size="mini" type="primary">浏览</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        years: "",
        month: "",
        day: ""
      },
      tableData: []
    };
  },
  methods: {
    // 搜索提交
    onSubmit() {
       //console.log("submit!");
    }
  }
};
</script>

<style scoped lang="scss">
.history {
  width: 100%;
  .n-right {
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

