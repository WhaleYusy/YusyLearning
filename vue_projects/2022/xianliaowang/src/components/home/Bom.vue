<template>
  <div class="mall_home_certificate">
    <div class="mall_home_bom_bg">
      <div class="mall_home_bom_cont">
        <div class="mall_home_bom_cont_left">
          <h2 class="bom_cont_left_title">BOM智能配单，给您最优的选择，一键下单</h2>
          <p>
            <img src="../../assets/bom2.png" alt="">
            <span>海量现货库存，一站式配单</span>
          </p>
          <p>
            <img src="../../assets/bom3.png" alt="">
            <span>智能推荐，优先保证现货与低价，省时省力</span>
          </p>
          <p>
            <img src="../../assets/bom4.png" alt="">
            <span>随意切换搜索条件，快速同步匹配结果</span>
          </p>
          <el-button type="primary" class="op_btn">管理BOM列表</el-button>
        </div>
        <div class="mall_home_bom_cont_right">
          <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <el-button class="load_btn" style="background:#FC7600;border:none;color:#fff;" >上传BOM文件</el-button>
            <el-button class="load_btn" type="primary"> 下载模板 </el-button>
            <div class="el-upload__text" style="color:white">拖拽BOM文件至此框 或 点击按钮上传文件</div>
          </el-upload>
          <div class="warm_prompt"> 
            <p>要求：</p>
            <p>- 文件必须是xls、xlsx、csv格式</p>
            <p>- 文件大小必须小于4MB</p>
            <p>- 支持闲料网商品编号精确搜索</p>
            <p>- 为了获得更好的BOM搜索体验，您可以参考模板修改</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.mall_home_bom_bg{
  width: 100%;
  height: 440px;
  background: url('../../assets/bom1.jpg') no-repeat center;
  .mall_home_bom_cont{
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin:0 auto;
    display: flex;
    .mall_home_bom_cont_left{
      width:50%;
      height: 100%;
      .bom_cont_left_title{
        font-size: 28px;
        margin: 100px 0 30px;
        color: white;
      }
      p{
        margin-top: 20px;
        display: flex;
        align-items: center;
        color: #CCCCCC;
        span{
          margin-left: 10px;
          font-size: 16px;
        }
      }
      .op_btn{
        height: 40px;
        margin-top: 30px;
      }
    }
    .mall_home_bom_cont_right{
      width:50%;
      height: 100%;
      padding-left: 120px;
      box-sizing: border-box;
      .load_btn{
        width: 127px;
        margin-top: 50px;
        margin-bottom: 30px;
      }
      .warm_prompt{
        margin-top: 20px;
        line-height: 25px;
        color: #CCCCCC;
      }
      
    }
  }
}
</style>

<style>
.el-upload /deep/ .el-upload-dragger{
  background-color: #202236!important;  
  width: 450px;
  height: 172px;
  margin-top: 100px;
}
</style>


