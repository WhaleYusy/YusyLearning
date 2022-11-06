<template>
  <div class="issuePurchase-box" >
    <img src="../../../img/index_adv1.png" alt class="issuePurchase-box-left" />
    <div class="issuePurchase-box-right" >
      <p class="box-right-title" >基础信息填写</p>
      <div class="form-box" >
        <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="型号" prop="materialsName">
            <el-input v-model="ruleForm.materialsName"></el-input>
          </el-form-item>
          <el-form-item label="品牌" prop="field1">
            <el-input v-model="ruleForm.field1"></el-input>
          </el-form-item>
          <!-- <el-form-item label="年份"  prop="date1">
            <el-date-picker type="date" placeholder="年份" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item> -->
          <el-form-item label="数量" prop="quantity">
            <el-input v-model="ruleForm.quantity" type="number" ></el-input>
          </el-form-item>
          <!-- <el-form-item label="原采购价" prop="name4">
            <el-input v-model="ruleForm.name4" type="number" ></el-input>
          </el-form-item>
          <el-form-item label="现处理价" prop="name5">
            <el-input v-model="ruleForm.name5" type="number" ></el-input>
          </el-form-item> -->
          <el-form-item label="联系方式" prop="telephone">
            <el-input v-model="ruleForm.telephone" type="text" ></el-input>
          </el-form-item>
          <!-- <el-form-item label="交货地点" prop="deliveryAddress">
            <el-input v-model="ruleForm.deliveryAddress"></el-input>
          </el-form-item> -->
          <el-form-item label="截止时间" prop="endDay">
              <el-radio-group v-model="ruleForm.endDay">
                <el-radio :label="3">3</el-radio>
                <el-radio :label="6">7</el-radio>
                <el-radio :label="10">10</el-radio>
                <el-radio :label="-1">长期</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="是否有货" prop="name9">
              <el-radio-group v-model="ruleForm.name9">
                <el-radio :label="3">有货</el-radio>
                <el-radio :label="6">无货</el-radio>
              </el-radio-group>
          </el-form-item> -->
<!--          <el-form-item label="闲料描述" prop="description">-->
<!--            <el-input type="textarea" v-model="ruleForm.description"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="图片">-->
<!--            <div class="imageSmallBox">-->
<!--              <div class="imageSmallBox_img" v-if="fileList.length > 0">-->
<!--              <span class="imageSmallBox_span" v-for="(item,index) in fileList" :key="index">-->
<!--                <i class="fa fa-times imageSmallBox_icon" aria-hidden="true" @click="deleteImg(index)"></i>-->
<!--                <img    @click="viewLargerVersion(item)" :src="item" class="avatar">-->
<!--              </span>-->
<!--              </div>-->
<!--              <div class="imageSmallBox_cont">-->
<!--                <el-upload-->
<!--                  :http-request="handleSmallUpload"-->
<!--                  :limit="5"-->
<!--                  :show-file-list="false"-->
<!--                  :action="uploadAction"-->
<!--                >-->
<!--                  <i class="el-icon-plus"></i>-->
<!--                </el-upload>-->
<!--              </div>-->
<!--              <el-dialog :visible.sync="dialogVisible">-->
<!--                <img width="100%" :src="dialogImageUrl" alt="">-->
<!--              </el-dialog>-->
<!--            </div>-->

<!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" round  style="width:80%" >确定发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bgGray" v-if="bgGrayShow"></div>
  </div>
</template>

<script>
export default {
data() {
      return {
          bgGrayShow:false,
          dialogVisible: false,
          fileList: [],
        ruleForm: {
          materialsName: '',
          field1: '',
          quantity: '',
          telephone: '',
          // deliveryAddress: '',
          endDay: 3,
          description: '',

        },
        rules: {
          materialsName: [
            { required: true, message: '请输入型号', trigger: 'blur' }
          ],
          field1: [
            { required: true, message: '请输入品牌', trigger: 'blur' }
          ],
          quantity: [
            { required: true, message: '请输入数量', trigger: 'blur' }
          ],
          // name4: [
          //   { required: true, message: '请输入原采购价', trigger: 'blur' }
          // ],
          // name5: [
          //   { required: true, message: '请输入现处理价', trigger: 'blur' }
          // ],
          telephone: [
            { required: true, message: '请输入手机号码或QQ号', trigger: 'blur' }
          ],
          // deliveryAddress: [
          //   { required: true, message: '请输入交货地点', trigger: 'blur' }
          // ],
          endDay: [
            { type: 'date', required: true, message: '请选择年份', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请填写闲料描述', trigger: 'blur' }
          ]
        },
        dialogImageUrl: '',
      };
    },
    mounted(){
      if(this.isVip()){
        if(this.$route.query.type=='edit'){
            this.getGoodsInfo();
        }
      }
    },
    methods: {
        isVip(){
          if (!this.$loginUtil.checkVip()) {
            this.bgGrayShow = true;
            this.$message({
                message: '会员才可以进行发布，请先升级为会员',
                type: 'warning'
            });
            var that = this;
            setTimeout(function(){
              that.$router.push({path:'/mine'})
              that.bgGrayShow = false;
              return false;
            }, 2000)
          }else if(this.$loginUtil.checkAdmin()){
            this.bgGrayShow = true;
            this.$message({
                message: '管理员不可以发布需求',
                type: 'warning'
            });
            var that = this;
            setTimeout(function(){
              that.$router.push({path:'/mine'})
              that.bgGrayShow = false;
              return false;
            }, 2000)
          }
          return true;
        },
        getGoodsInfo() {
            this.$http.get(`api-user/app/mdcbuyingmaterials/getDetailInfo/` + this.$route.query.id).then((res) => {
                console.log(res)
                this.ruleForm=res.data.datas
                // let detailImages = res.data.datas.detailImages.split(',');
                // detailImages.forEach((el) => {
                //     this.fileList.push(el)
                // })
            })
        },
        deleteImg(ind) {
            this.fileList.splice(ind, 1);
        },
        handleSmallUpload(content) {
            var form = new FormData();
            console.log("++++++++++++++")
            form.append('file', content.file);
            this.$http.post('/api-file/files-anon', form).then(res => {
                if (res.status === 200) {
                    let url = res.data.url;
                    this.fileList.push(url)
                    content.onSuccess('文件上传成功！');
                } else {
                    content.onError('文件上传失败');
                }
            }).catch(error => {
                console.log(error);
            });

        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // if(this.fileList.length<1){
                    //     this.$message({
                    //         message: '必须上传1张图片',
                    //         type: 'warning'
                    //     });
                    //     return
                    // }
                    // this.ruleForm.mainImage=this.fileList[0]
                    // this.ruleForm.detailImages = this.fileList.join(',')
                    if (this.$route.query.type=='edit'){
                        this.$http.put('/api-user/app/mdcbuyingmaterials', this.ruleForm).then((res) => {
                            //this.isDisable = false;
                            if (res.data.resp_code === 0) {
                                this.$router.go(-1)
                                this.$message({
                                    message: '修改拼单成功',
                                    type: 'success'
                                });
                            } else {
                                this.isDisable = false;
                                this.$message({
                                    message: '修改拼单失败',
                                    type: 'warning'
                                });
                            }
                        }).catch((err) => {
                            this.isDisable = false;
                        })
                    }else {
                        this.$http.post('/api-user/app/mdcbuyingmaterials', this.ruleForm).then((res) => {
                            //this.isDisable = false;
                            if (res.data.resp_code === 0) {
                                this.$router.go(-1)
                                this.$message({
                                    message: '增加拼单成功',
                                    type: 'success'
                                });
                            } else {
                                this.isDisable = false;
                                this.$message({
                                    message: '增加拼单失败',
                                    type: 'warning'
                                });
                            }
                        }).catch((err) => {
                            this.isDisable = false;
                        })
                    }




                }
            });
        },
        viewLargerVersion(url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}
</script>

<style lang="scss" scoped>
.bgGray{
 width: 100vw;
 height: 100vh;
 position: fixed;
 top:0;
 bottom: 0;
 left: 0;
 right: 0;
 background: rgba(0,0,0,0.3);
 z-index: 1000;
}
.issuePurchase-box{
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  .issuePurchase-box-left{
    width: 280px;
    height: 400px;
  }
  .imageSmallBox{
    width: 100%;
    display:flex;
  }
  .imageSmallBox_img{
    display:flex;
  }
  .imageSmallBox_img img{
    width: 148px;
    height: 148px;
    margin-right:10px;
    display:flex;
    overflow:hidden;
    border: 1px solid #E2E2E2;
    border-radius: 5px;
  }
  .imageSmallBox_span{
    position:relative;
  }
  .imageSmallBox_icon{
    position: absolute;
    right:10px;
    font-size:20px;
  }
  .imageSmallBox_cont{
    width: 148px;
    height: 148px;
    border: 1px dashed #E2E2E2;
    border-radius: 5px;
    text-align: center;
    line-height: 148px;
    font-size: 27px;
  }
  .imageBox {
    width: 330px;
    display: flex;
  }
  .bannerImageBox{
    width: 330px;
    display: flex;
  }
  .issuePurchase-box-right{
    width: calc(100% - 300px);
    margin-left: 20px;
    .box-right-title{
      width: 100%;
      height: 30px;
      line-height: 30px;
      border-left: 5px solid #0094e7;
      padding-left: 20px;
      box-sizing: border-box;
      font-size: 17px;
      color: #0094e7;
    }
    .form-box{
      width: calc(100% - 100px);
      margin-top: 20px;
    }
  }
}
</style>
