<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
      type="index" align="center" label="序号"
      width="50">
    </el-table-column>
      <el-table-column
        prop="name" align="center"
        label="邀请方"
        width="170">
      </el-table-column>
      <el-table-column
        prop="address" align="center" width="150"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="订单金额"
        width="170">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="订单状态"
        width="170">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="代付时间"
        width="170">
      </el-table-column>
      <el-table-column align="center" label="操作" width="79">
         <template slot-scope="scope">
            <p class="operation">
              <el-button type="text" icon="el-icon-delete" size="small">删除</el-button>
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
      tableData: [{
        address: 'CHR01-2025-S',
        date: '2019-06-23',
        name: '王小虎'
      }],
      form:{},
      currentPage4:1,
      dialogFormVisible:false
    }
  },
  methods:{
    upLoadFile(){
      document.getElementById('uploadEl').click();
    },
    handleSizeChange(val) {
       //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       //console.log(`当前页: ${val}`);
    },
    // 修改
    showEdit(){
      this.dialogFormVisible = true;
    },
    // 隐藏弹窗
    hideShrineToast(){
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table{
  margin-top: 20px;
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

