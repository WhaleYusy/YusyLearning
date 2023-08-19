<template>
  <div class="BOMmanagement_box">
    <div class="myCoupon_top_tips">BOM：<el-input v-model="region" size="mini" style="width:220px;"></el-input>
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
      :data="tableData"  border
      style="width: 100%;margin-top:20px;">
      <el-table-column
          type="index" align="center" label="序号"
          width="50">
      </el-table-column>
      <el-table-column
        prop="address" align="center"
        label="BOM名称">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
         <template slot-scope="scope">
            <p class="operation">
              <el-button type="text"  size="small">智能配单</el-button>
              <el-button type="text"  size="small">创建副本</el-button>
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
      region:'',
      value6:'',
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
.BOMmanagement_box{
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

