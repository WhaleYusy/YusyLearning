<template>
  <div>
    <div class="myMaterialCode_top">
      <div class="upload_box">
        <div @click="upLoadFile">
          <input type="text" readonly /><button>浏览...</button>
        </div>
        <input type="file" style="display:none" id="uploadEl">
        <button style="background:#FF7900 ;">导入物料编码</button>
        <button style="background:#0093E6 ;">下载导入模板</button>
        
      </div>
      <p>说明：此功能可以导入您的物料编号，以便建立与商城商品编号之间的对应关系。</p>
      <p>举个例子：商品编号C10001，与贵司对应的物料编码是WL005，那么，您购买了C10001这个商品后，我们会在订单界面、送货单上显示贵司的物料编号WL005，方便您核对物料。</p>
    </div>
    <div class="myMaterialCode_tips">商品编号（精确）：<el-input size="mini" style="width:220px" v-model="form.aaawww"></el-input>
      <span style="margin-left:60px;">贵司物料编号：</span><el-input size="mini" style="width:220px" v-model="form.aaa"></el-input>
      <el-button size="mini" style="margin-left:10px;" type="primary" >查询</el-button>
    </div>
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
        label="商城商品编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address" align="center"
        label="厂家型号/封装">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date" align="center"
        label="贵司物料编码"
        width="180">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
         <template slot-scope="scope">
            <p class="operation">
              <el-button type="text" icon="el-icon-edit" size="small" @click="showEdit">修改</el-button>
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
        <div class="enshrineSuccess" style="display:block;" v-if="dialogFormVisible">
      <div class="enshrineSuccessToast" >
        <div class="title">
          <h3>物料编码</h3>
          <span class="cancel" @click="hideShrineToast">x</span>
        </div>
        <div class="content">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" align="center" label="商品编号" width="100"> </el-table-column>
            <el-table-column prop="address" align="center" label="厂家型号/封装" > </el-table-column>
            <el-table-column prop="date" align="center" label="商品名称" > </el-table-column>
            <el-table-column align="center" label="贵司物料编码" width="120">
              <template slot-scope="scope">
                  <el-input v-model="scope.row.aaa" size="mini"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="confirm_btn">确 定</div>
          <p class="enshrineSuccess_tips"><span style="color:red;">说明：</span>此功能用以建立商城商品编号与贵司物料编码之间的对应关系。我们会在订单界面、送货单上显示贵司的物料编码，方便您核对物料。</p>
          <p class="enshrineSuccess_tips">您也可以：批量导入物料编码。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData: [{
        address: 'CHR01-2025-S/Through Hole',
        date: '工业湿敏电阻',
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
.myMaterialCode_top{
  width: 100%;
  height: 180px;
  border-bottom: 1px solid #E5E5E5;
  padding: 30px 100px;
  box-sizing: border-box;
  .upload_box{
    width: 100%;
    margin: 0 auto;
    height: 35px;
    display: flex;
    div{
      width: 300px;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      button{
        width: 80px;
        height: 33px;    
        margin-left: 10px;   
        cursor: pointer; 
      }
      input{
        width: 205px;
        outline: none;
        height: 30px;
        cursor: pointer;
      }
    }
    button{
      width: 150px;
      margin-left: 20px;
      font-size: 16px;
      color: white;
      border: none;
      outline: none;      
    }
  }
  p:nth-of-type(1){
    color: red;
    margin-top: 15px;
  }
  p:nth-of-type(2){
    color: #444444;
    margin-top: 15px;
    line-height: 1.25;
  }
}
.el-table /deep/ th{
  background: #F8F8F8!important;
  color: #444444;
}
.myMaterialCode_tips{
  margin: 20px 0;
}
.pagination_box{
  width: 100%;
  text-align: right;
  margin-top: 20px;
}
.enshrineSuccess{
  z-index:100;
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
    width:585px;
    min-height:160px;
    background: white;
    margin: 300px auto;
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
    .content{
      width: 90%;
      margin: 20px auto;
    }
  }
}
.confirm_btn{
  width: 80px;
  height: 30px;
  line-height: 30px;
  background: #0094e7;
  color: white;
  margin: 20px auto;
  text-align: center;
}
.enshrineSuccess_tips{
  font-size: 12px;
  line-height: 1.55;
}
</style>
