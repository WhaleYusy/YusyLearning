<template>
  <div class="follow">
    <div class="f-filter">
      <div class="f-row" v-for="(val,key) in 3" :key="key">
        <div class="f-left">关注的分类{{key+1}}:</div>
        <div class="f-right">
          <div class="r-flex" v-for="(v,k) in 10" :key="k">
            <span>开发板{{k}}</span>
          </div>
          <div class="btn-group">
            <el-button icon="el-icon-plus" size="mini"></el-button>
            <el-button icon="el-icon-minus" size="mini"></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="n-right">
      <div class="n-table">
        <div class="n-form">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.user" placeholder="型号/描述" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" size="mini">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="formInline.type">
                <el-checkbox label="购买过的商品" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <div class="table-content">
          <el-table :data="tableData" style="width: 100%">
            <template slot="empty">
              <div class="no-more">
                <img src="https://www.jzic.com/resources/v3/img/group/no-goods.png" alt />
                <p>没有找到您想要的型号</p>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        type: ""
      },
      tableData: [1, 1, 1, 1, 1, 1, 1, 1]
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
.follow {
  width: 100%;
  .f-filter {
    border: 1px solid #e8e8e8;
    .f-row {
      border-bottom: 1px solid #e8e8e8;
      min-height: 54px;
      display: flex;
      align-items: center;
      background: #f5f5f5;
      .f-left {
        height: 100%;
        padding: 0 15px;
      }
      .f-right {
        flex: 1;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        padding: 15px 50px 15px 15px;
        box-sizing: border-box;
        background: white;
        position: relative;
        .r-flex {
          padding: 8px;
          span {
            border: 1px solid #09f;
            padding: 3px 8px;
            cursor: pointer;
            color: gray;
            &:hover {
              color: #09f;
            }
          }
        }
        .btn-group {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 15px;
        }
      }
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
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

