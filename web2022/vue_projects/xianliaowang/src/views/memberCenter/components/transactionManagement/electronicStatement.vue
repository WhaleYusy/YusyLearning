<template>
  <div class="electronicStatement_box">
    <div class="myCoupon_top_tips">
      商品类别：<el-input v-model="form.region1" size="mini" style="width:120px;"></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;商品编号：<el-input v-model="form.region2" size="mini" style="width:120px;"></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;关键字：<el-input v-model="form.region3" size="mini" style="width:120px;"></el-input>
    <p style="margin-top:10px;">
        <span style="margin-left:24px;">时间：</span><el-date-picker size="mini"
        v-model="value6"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button size="mini" style="margin-left:10px;" type="primary" >查询</el-button>
      <el-button size="mini" style="margin-left:10px;background:#FF7800;border:none" type="primary" >导出</el-button>
    </p>
  </div>
  <el-table 
      :data="tableData"  border
      style="width: 100%;margin-top:20px;">
      <el-table-column
        prop="address" align="center" width="80"
        label="商品编号">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="商品名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="商品型号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="商品类型"
        width="150">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="品牌"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="封装规格"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="购买数量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="合计金额"
        >
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
        date: '13141681688',
        name: '王小虎',
        address: '100'
      }],
      form:{},
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
.electronicStatement_box{
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

