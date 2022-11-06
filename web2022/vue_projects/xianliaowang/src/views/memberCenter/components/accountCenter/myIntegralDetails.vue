<template>
  <div class="myIntegralDetails_box">
    <div class="myCoupon_top_tips">优惠券状态：<el-select v-model="region" size="mini" style="width:120px;" placeholder="优惠券状态">
      <el-option label="未使用" value="shanghai"></el-option>
      <el-option label="已使用" value="beijing"></el-option>
      <el-option label="已过期" value="beijing2"></el-option>
      <el-option label="全部" value="beijing1"></el-option>
    </el-select>
    <span style="margin-left:60px;">时间：</span><el-date-picker size="mini"
      v-model="value6"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button size="mini" style="margin-left:10px;" type="primary" >查询</el-button>
  </div>
  <el-table
      :data="tableData"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        prop="name" align="center"
        label="时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address" align="center"
        label="积分">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="变更类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="积分数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="积分账户"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="备注"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      region:'',
      value6:'',
      tableData: [{
        date: '13141681688',
        name: '王小虎',
        address: '100'
      }],
    }
  }
}
</script>

<style lang="scss" scoped>
.myIntegralDetails_box{
  margin: 20px 0;
}
.el-table /deep/ th{
  background: #F8F8F8!important;
  color: #444444;
}
</style>

