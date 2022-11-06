<template>
  <div class="afterAalesService_box">
    <div class="myCoupon_top_tips"><el-input v-model="region" placeholder="输入订单编号进行查询" size="mini" style="width:160px;"></el-input>
    <el-button size="mini" style="margin-left:20px;" type="primary" >查询</el-button>
  </div>
  <el-table 
      :data="tableData"  border
      style="width: 100%;margin-top:20px;">
       <el-table-column
        type="index" label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="address" align="center" width="120"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="退款类型"
        width="140">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="申请时间"
        width="140">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="退款方式"
        width="140">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="退款金额"
        width="140">
      </el-table-column>
      <el-table-column
        prop="date" align="center" width="140"
        label="退款状态">
      </el-table-column>
      <el-table-column align="center" label="操作" >
         <template slot-scope="scope">
            <p class="operation">
              <el-button type="text" icon="el-icon-edit" size="small" >修改</el-button>
            </p>
          </template>
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
.afterAalesService_box{
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


