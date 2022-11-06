<template>
  <div class="rechargeRecord_box">
    <div class="myCoupon_top_tips">审核状态：<el-select v-model="region" size="mini" style="width:120px;" placeholder="请选择">
      <el-option label="未审核" value="shanghai"></el-option>
      <el-option label="已审核" value="beijing"></el-option>
      <el-option label="审核不通过" value="beijing2"></el-option>
    </el-select>
    <span style="margin-left:60px;">提交时间：</span><el-date-picker size="mini"
      v-model="value6"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button size="mini" style="margin-left:10px;" type="primary" >查询</el-button>
  </div>
  <el-table
      :data="tableData" border
      style="width: 100%;margin-top:20px;">
       <el-table-column
        type="index" label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="提交时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address" align="center" width="100"
        label="充值金额">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="手续费"
        width="100">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="充值方式"
        width="100">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="需打款金额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="审核状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="转账银行"
        width="140">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="转账人卡号">
      </el-table-column>
    </el-table>
    <div class="pagination_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      region:'',
      value6:'',
      tableData: [{
        date: '2019-06-23',
        name: '王小虎',
        address: '100'
      }],
      currentPage4:1
    }
  },
  methods:{
    handleSizeChange(val) {
       //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       //console.log(`当前页: ${val}`);
    },
  }
}
</script>

<style lang="scss" scoped>
.rechargeRecord_box{
  margin: 20px 0;
}
.el-table /deep/ th{
  background: #F8F8F8!important;
  color: #444444;
}
.pagination_box{
  width: 100%;
  text-align: right;
  margin-top: 20px;
}
</style>

