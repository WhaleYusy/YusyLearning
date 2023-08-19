<template>
  <div class="n-right">
    <div class="n-table">
      <div class="n-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
          <el-form-item>
            <el-select v-model="formInline.years" placeholder="所有分类">
              <el-option label="2019年" value="shanghai"></el-option>
              <el-option label="2018年" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.month" placeholder="所有品牌">
              <el-option label="1月" value="shanghai"></el-option>
              <el-option label="2月" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.day" placeholder="型号/描述"></el-input>
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
          <el-table-column label="商品名称">
            <template>
              <p>LBR2012T101K</p>
            </template>
          </el-table-column>
          <el-table-column label="共享编号">
            <template>
              <p>Taiyo Yuden(太阳诱电)</p>
            </template>
          </el-table-column>
          <el-table-column label="品牌">
            <template>
              <p>叠层电感</p>
            </template>
          </el-table-column>
          <el-table-column label="说明">
            <template>
              <p>暗杀收到就</p>
            </template>
          </el-table-column>
          <el-table-column label="库存">
            <template>
              <p>2019</p>
            </template>
          </el-table-column>
          <el-table-column label="阶梯价">
            <template>
              <p>￥20195</p>
            </template>
          </el-table-column>
          <el-table-column label="内地(含13%)">
            <template>
              <p>2005</p>
            </template>
          </el-table-column>
          <el-table-column label="香港">
            <template>
              <p>07-15</p>
            </template>
          </el-table-column>
          <el-table-column label="交期(工作日)">
            <template>
              <p>2019-07-15</p>
            </template>
          </el-table-column>
          <el-table-column label="价格走势">
            <template>
              <p>低￥2019</p>
            </template>
          </el-table-column>
          <el-table-column label="我要买">
            <template>
              <el-button size="mini">购买</el-button>
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
      tableData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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

