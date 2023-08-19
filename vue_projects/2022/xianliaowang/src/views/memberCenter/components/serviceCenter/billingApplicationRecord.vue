<template>
  <div class="billingApplicationRecord_box">
    <div class="myCoupon_top_tips">发票号：<el-input v-model="region" size="mini" style="width:220px;"></el-input>
    <span style="margin-left:60px;">时间：<el-select v-model="value4" size="mini" clearable style="width:200px;" placeholder="请选择">
      <el-option label="未使用" value="shanghai"></el-option>
      <el-option label="已使用" value="beijing"></el-option>
      <el-option label="已过期" value="beijing2"></el-option>
      <el-option label="全部" value="beijing1"></el-option>
    </el-select>  </span>
    <el-button size="mini" style="margin-left:20px;" type="primary" >查询</el-button>
  </div>
  <el-table 
      :data="tableData"  border
      style="width: 100%;margin-top:20px;">
      <el-table-column
        prop="address" align="center" width="120"
        label="发票号">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="是否已重开"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="快递方式"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="快递号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="申请时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="原因备注">
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
      value4:'',
      tableData: [{
        date: '13141681688',
        name: '王小虎',
        address: '100'
      }],
      currentPage4:1,
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
.billingApplicationRecord_box{
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


