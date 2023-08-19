<template>
  <div class="manageReceivingAddress_box">
    <div class="manageReceivingAddress_btn_line">
      <div>
        <el-button icon="fa fa-envelope-o" size="mini"> 未读消息</el-button>
        <el-button icon="fa fa-envelope-open-o" size="mini"> 已读消息</el-button>
        <el-button icon="fa fa-envelope-o" size="mini"> 全部消息</el-button>
      </div>
      <el-button size="mini">标记为已读</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column align="center"
      type="selection"
      width="200">
    </el-table-column>
      <el-table-column
        prop="name" align="center"
        label="信息标题"
        >
      </el-table-column>
      <el-table-column
        prop="address" align="center"
        label="状态" width="200">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="发送时间"
        width="180">
      </el-table-column>
    </el-table>
    <div class="pagination_box">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <fail-Tips  :tipsCont="tipsCont" ref="failTip" ></fail-Tips>
  </div>
</template>

<script>
import failTips from '../../../../components/wedTips/fail'
export default {
  components:{failTips},
  data() {
    return {      
      tableData:[
        {name:'张三',address:'广东省深圳市',date:'18818881888'}
      ],
      currentPage4: 4,
      tipsCont:'请选择要删除的地址',
      selectedOptions:[],
      dialogFormVisible:false,
      form:{},
      formLabelWidth: '120px',
      showFail:false
    }
  },
  methods:{
    // 隐藏弹窗   
    // this.$refs.failTip.openAndAdd(); 用到时发送这句就可以，前提是组件要用 ref进行标记
    handleSizeChange(val) {
       //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       //console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.manageReceivingAddress_box{
  width: 100%;  
}
.el-table /deep/ th{
  background: #F8F8F8!important;
  color: #444444;
}
.operation{
  span{
    font-size: 12px;
    cursor: pointer;
    &:nth-of-type(2){
      margin: 0 10px;      
    }
    &:hover{
      color: #0093e6;    
    }
  }
}
.form_box{
  width: 80%;
  margin: 20px 0;
}
.el-form-item{
  margin-bottom: 5px!important;
}
.el_inp{
  width: 200px;
}
.manageReceivingAddress_btn_line{
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.pagination_box{
  width: 100%;
  text-align: right;
  margin-top: 20px;
}
</style>
