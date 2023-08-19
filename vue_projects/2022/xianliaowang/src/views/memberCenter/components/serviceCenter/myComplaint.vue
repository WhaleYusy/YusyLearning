<template>
  <div class="electronicStatement_box">
    <div class="electronicStatement_table">
      <el-table 
          :data="tableData"  
          style="width: 100%">
          <el-table-column
            prop="address" align="center" width="130"
            label="投诉主题">
          </el-table-column>
          <el-table-column
            prop="date" align="center"
            label="投诉对象"
            width="140">
          </el-table-column>
          <el-table-column
            prop="date" align="center"
            label="投诉类别"
            width="140">
          </el-table-column>
          <el-table-column
            prop="date" align="center"
            label="投诉内容"
            width="140">
          </el-table-column>
          <el-table-column
            prop="date" align="center"
            label="涉及订单"
            width="140">
          </el-table-column>
          <el-table-column
            prop="date" align="center"
            label="投诉时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="date" align="center"
            label="闲料网回复"
            >
          </el-table-column>
        </el-table>
        <p class="tb_tips">已完成的投诉>></p>
      </div>
    <div class="electronicStatement_form">
      <p class="form_tips">提交我的投诉 <span style="color:#007FD0">下载品质异常模板</span><span style="color:#FF8110"> (涉及品质问题请填写品质异常报告表)</span></p>
      <el-form ref="form" :model="form" label-width="120px" style="width:700px;margin-top: 40px;">
        <el-form-item label="投诉对象：">
          <div style="display:flex;">
            <el-select v-model="form.name" clearable size="mini" style="width:100px;" placeholder="请选择">
              <el-option label="品质问题" value="shanghai"></el-option>
              <el-option label="财务问题" value="beijing"></el-option>
            </el-select>
            <div style="margin-left:199px;">
              <span style="color:#606266">投诉类别：</span><el-select clearable  v-model="form.name2" size="mini" style="width:100px;" placeholder="请选择">
              <el-option label="品质问题" value="shanghai"></el-option>
              <el-option label="财务问题" value="beijing"></el-option>
            </el-select>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="涉及订单：">          
          <div style="display:flex;">
            <el-input v-model="form.region" size="mini" readonly style="width:200px;" ></el-input><span style="color:#429CE7;cursor: pointer;" @click="showOrder">&nbsp;&nbsp;选择订单</span>
            <div style="margin-left:35px;">
              <span style="color:#606266">涉及商品：</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="投诉主题">           
           <div style="display:flex;">
            <el-input v-model="form.date" size="mini"  style="width:200px;" ></el-input>
            <div style="margin-left:100px;">
              <span style="color:#606266">联系手机：</span><el-input v-model="form.date11" size="mini"  style="width:200px;" ></el-input>
            </div>
          </div> 
        </el-form-item>
        <el-form-item label="投诉内容">
          <el-input type="textarea" v-model="form.desc" size="mini" :rows="5" ></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱：">
          <el-input  v-model="form.desc1" size="mini" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="附件：">
          <el-input  v-model="form.desc" size="mini" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" style="margin-left:199px;" >我要投诉</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="enshrineSuccess" style="display:block;" v-if="dialogFormVisible">
      <div class="enshrineSuccessToast" >
        <div class="title">
          <h3>请选择涉及的订单<span style="color:#FF8110">（只显示3个月内的订单）</span> </h3>
          <span class="cancel" @click="hideShrineToast">x</span>
        </div>
        <el-form :model="form" class="form_box" style="margin-left:10px;margin-top:15px;">
          <el-form-item label="订单编号：">
            <el-input v-model="form.name2" size="mini" style="width:220px;" placeholder="多个订单编号用逗号隔开" auto-complete="off"></el-input>
            <el-button type="primary" size="mini" style="margin-left:10px;">搜索</el-button>
          </el-form-item>          
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 95%;margin:0 auto;">
          <el-table-column align="center"
          type="selection"
          >
        </el-table-column>
          <el-table-column
            prop="name" align="center"
            label="订单编号" width="175"
            >
          </el-table-column>
          <el-table-column
            prop="address" align="center"
            label="下单日期" width="170">
          </el-table-column>
          <el-table-column
            prop="date" align="center"
            label="订单金额"
            width="170">
          </el-table-column>
        </el-table>
        <div class="pagination_box">
          <el-pagination
            small
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </div>
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
      dialogFormVisible:false,
    }
  },
  methods:{
    handleSizeChange(val) {
       //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       //console.log(`当前页: ${val}`);
    },
    showOrder(){
      this.dialogFormVisible = true;
    },
    hideShrineToast(){
      this.dialogFormVisible = false;
    }
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
.electronicStatement_table{
  padding-bottom: 30px;
  box-sizing: border-box;
  border: 1px solid #EBEEF5;
  position: relative;  
}
.tb_tips{
  position: absolute;
  right: 20px;
  bottom: 8px;
  cursor: pointer;
  &:hover{
    color: #429CE7;
  }
}
.electronicStatement_form{
  width: 958px;
  height: 550px;
  border: 1px solid #e5e5e5;
  margin-top: 20px;
  .form_tips{
    height: 40px;
    line-height: 40px;
    padding: 0 13px;
    box-sizing: border-box;
    background: #EFEEEE;
    font-size: 14px;
    font-weight: bold;    
  }
  .el-form-item{
    margin-bottom: 10px;
  }
}
.enshrineSuccess{
  z-index:1000;
  background:rgba(0,0,0,0.4);
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  border:none;
  .enshrineSuccessToast{
    width:600px;
    min-height:180px;
    background: white;
    margin: 250px auto;
    padding-bottom: 10px;
    box-sizing: border-box;
    border:3px solid lightgray;
    .title{
      width:100%;
      height:30px;
      font-size:16px;
      background:rgb(240,240,240);
      padding:0 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items:center;
      .cancel{
        cursor: pointer;
      }
      .cancel:hover{
        color:#0094e7;
      }
    }
  }
}
.pagination_box{
  width: 90%;
  text-align: right;
  margin: 20px auto 0;
}
</style>

