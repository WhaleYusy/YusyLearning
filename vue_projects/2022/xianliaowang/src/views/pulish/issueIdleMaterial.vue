<template>
  <div class="issueIdleMaterial-box">
    <img src="../../../img/index_adv1.png" alt class="issueIdleMaterial-box-left"/>
    <div class="issueIdleMaterial-box-right">
      <p class="box-right-title">基础信息填写</p>
      <div class="form-box">
        <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="型号" prop="materialsName">
            <el-input v-model="ruleForm.materialsName"></el-input>
          </el-form-item>
          <el-form-item label="品牌" prop="materialsBrand">
            <el-input v-model="ruleForm.materialsBrand"></el-input>
          </el-form-item>
          <el-form-item label="年份" prop="materialsYear">
            <el-date-picker type="date" placeholder="年份" value-format="yyyy-MM-dd HH:mm:ss" v-model="ruleForm.materialsYear"
                            style="width: 100%;" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
          <el-form-item label="数量" prop="quantity">
            <el-input v-model="ruleForm.quantity" type="number"></el-input>
          </el-form-item>
          <el-form-item label=" QQ" prop="origPrice">
            <el-input v-model="ruleForm.field3" type="field3"></el-input>
          </el-form-item>
          <el-form-item label="现处理价" prop="currentPrice">
            <el-input v-model="ruleForm.currentPrice" type="number"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="telephone">
            <el-input v-model="ruleForm.telephone"></el-input>
          </el-form-item>
          <!-- <el-form-item label="交货地点" prop="deliveryAddress">
            <el-input v-model="ruleForm.deliveryAddress"></el-input>
          </el-form-item> -->
          <el-form-item label="截止时间" prop="name8">
            <el-radio-group v-model="ruleForm.endDay">
              <el-radio :label="3">3</el-radio>
              <el-radio :label="6">7</el-radio>
              <el-radio :label="10">10</el-radio>
              <el-radio :label="-1">长期</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否有货" prop="name9">
            <el-radio-group v-model="ruleForm.inStock">
              <el-radio :label="0">有货</el-radio>
              <el-radio :label="1">无货</el-radio>
            </el-radio-group>
          </el-form-item>
<!--          <el-form-item label="闲料描述" prop="description">-->
<!--            <el-input type="textarea" v-model="ruleForm.description"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="图片">
            <div class="imageSmallBox">
              <div class="imageSmallBox_img" v-if="fileList.length > 0">
              <span class="imageSmallBox_span" v-for="(item,index) in fileList" :key="index">
                <i class="fa fa-times imageSmallBox_icon" aria-hidden="true" @click="deleteImg(index)"></i>
                <img    @click="viewLargerVersion(item)" :src="item" class="avatar">
              </span>
              </div>
              <div class="imageSmallBox_cont" v-if="fileList.length < 5">
                <el-upload
                  :http-request="handleSmallUpload"
                  :limit="5"
                  :show-file-list="false"
                  :action="uploadAction"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" round style="width:80%">确定发布</el-button>
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
				pickerOptions: {
				  disabledDate(time) {
					return time.getTime() > Date.now();
				  }
				},
                dialogVisible: false,
                fileList: [],
                uploadAction: "/api-file/files-anon",
                ruleForm: {
                    materialsName: '',
                    materialsBrand: '',
                    quantity: '',
                    origPrice: '',
                    currentPrice: '',
                    telephone: '',
                    // deliveryAddress: '',
                    inStock: '',
                    materialsYear: '',
                    description: '',
                    endDay:3
                },
                rules: {
                    materialsName: [
                        {required: true, message: '请输入型号', trigger: 'blur'}
                    ],
                    materialsBrand: [
                        {required: true, message: '请输入品牌', trigger: 'blur'}
                    ],
                    quantity: [
                        {required: true, message: '请输入数量', trigger: 'blur'}
                    ],
                    field3: [
                        {required: true, message: '请输入QQ', trigger: 'blur'}
                    ],
                    currentPrice: [
                        {required: true, message: '请输入现处理价', trigger: 'blur'},
                        {
                          validator(rule, value, callback) {
                            var reg = /((^[1-9]\d*)|^0)(\.\d{0,3}){0,1}$/
                            if (reg.test(value)) {
                              callback()
                            } else {
                              callback(new Error('价格只能是正数(最多可保留三位小数)'))
                            }
                          },
                          trigger: 'blur',
                        }
                    ],
                    telephone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'}
                    ],
                    // deliveryAddress: [
                    //     {required: true, message: '请输入交货地点', trigger: 'blur'}
                    // ],
                    // materialsYear: [
                    //     {type: 'date', required: true, message: '请选择年份', trigger: 'change'}
                    // ],
                    inStock: [
                        { required: true, message: '请选择是否有货', trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: '请填写闲料描述', trigger: 'blur'}
                    ]
                },
                dialogImageUrl: ''
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
                this.$http.get(`api-user/app/mdcidlematerials/getDetailInfo/` + this.$route.query.id).then((res) => {
                    console.log(res)
                    this.ruleForm=res.data.datas
                    let detailImages = res.data.datas.detailImages.split(',');
                    detailImages.forEach((el) => {
                        this.fileList.push(el)
                    })
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
                        if(this.fileList.length<1){
                            this.$message({
                                message: '必须上传1张图片',
                                type: 'warning'
                            });
                            return
                        }
                        this.ruleForm.mainImage=this.fileList[0]
                        this.ruleForm.detailImages = this.fileList.join(',')
                        if (this.$route.query.type=='edit'){
                            this.$http.put('/api-user/app/mdcidlematerials', this.ruleForm).then((res) => {
                                //this.isDisable = false;
                                if (res.data.resp_code === 0) {
                                    this.$router.go(-1)
                                    this.$message({
                                        message: '修改闲料成功',
                                        type: 'success'
                                    });
                                } else {
                                    this.isDisable = false;
                                    this.$message({
                                        message: '修改闲料失败',
                                        type: 'warning'
                                    });
                                }
                            }).catch((err) => {
                                this.isDisable = false;
                            })
                        }else {
                            this.$http.post('/api-user/app/mdcidlematerials', this.ruleForm).then((res) => {
                                //this.isDisable = false;
                                if (res.data.resp_code === 0) {
                                    this.$router.go(-1)
                                    this.$message({
                                        message: '增加闲料成功',
                                        type: 'success'
                                    });
                                } else {
                                    this.isDisable = false;
                                    this.$message({
                                        message: '增加闲料失败',
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

            // handlePictureCardPreview(file) {
            //     // this.dialogImageUrl.push(file.url);
            //     //this.dialogVisible = true;
            // }
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
  .issueIdleMaterial-box {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    padding: 20px;
    box-sizing: border-box;

    .issueIdleMaterial-box-left {
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
      width: 120px;
      height: 120px;
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
      width: 120px;
      height: 120px;
      border: 1px dashed #E2E2E2;
      border-radius: 5px;
      text-align: center;
      line-height: 120px;
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


    .issueIdleMaterial-box-right {
      width: calc(100% - 300px);
      margin-left: 20px;

      .box-right-title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-left: 5px solid #0094e7;
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 17px;
        color: #0094e7;
      }

      .form-box {
        width: calc(100% - 100px);
        margin-top: 20px;
      }
    }
  }
</style>
