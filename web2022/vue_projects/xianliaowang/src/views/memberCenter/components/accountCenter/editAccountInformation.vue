<template>
  <div class="editAccountInformation_box">
    <div class="editAccountInformation_form_box">
      <el-form ref="form" :model="form" label-width="120px">
        <!-- <el-form-item label="客户编号：">
          <div style="display:flex;align-items: center;">
            <p class="disc_img"></p>
            <span>
              521168A
              <router-link
                to="/home/help/gradeMembership"
                style="color:#429CE7;"
              >&nbsp;&nbsp;&nbsp;&nbsp;[级别介绍]</router-link>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="成长值：">
          <p>0</p>
        </el-form-item>
        <el-form-item label="邮箱帐号：">
          <p class="item_add">
            未绑定
            <i class="fa fa-pencil-square-o" aria-hidden="true" @click="goToBindEmail"></i>
          </p>
        </el-form-item>-->
        <el-form-item label="头像：">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="handleSmallUpload"
            :before-upload="beforeAvatarUpload">
            <img v-if="image" :src="image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input size="mini" class="el_inp" v-model.trim="form.nickName" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input size="mini" class="el_inp" v-model.trim="form.realName" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="form.ssex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日：" >
<!--          <el-date-picker type="date" placeholder="生日" value-format="yyyy-MM-DD" v-model="form.birthday"-->
<!--                              size="mini"     class="el_inp"></el-date-picker>-->
          <el-date-picker
            v-model="birthday"
            type="date" size="mini" class="el_inp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所在地区：" prop="area">
          <el-cascader
            ref="areaCascader"
            :options="options"
            v-model="codePath"
            placeholder="请选择省 请选择市 请选择区"
            clearable
            @change="handleAreaChange"
            :props="props"
            style="width:200px"
            size="small"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="el_button" @click="updateUserInfo">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        props: {
            value: 'value',
            label:'title',
            children: 'children'
        },
        birthday:"",
        codePath:[],
        image:'',
        options:[],
      form: {
          nickName:'',
          realName:'',
          ssex:'',
          birthday:'',
          provinceCode:"",
          cityCode:"",
          areaCode:"",
      }
    };
  },
  mounted() {
    this.findUserInfo();
    this.getCity();
  },

  methods: {
      handleAreaChange(value){
          this.form.provinceCode=value[0]
          this.form.cityCode=value[1]
          this.form.areaCode=value[2]

      },
      getCity(){
          this.$http.get('/api-user/app/addressData/pc').then((res)=>{
              this.options = res.data.datas.rows.children
          })
      },
      handleSmallUpload(content) {
          var form = new FormData();
          console.log("++++++++++++++")
          form.append('file', content.file);
          this.$http.post('/api-file/files-anon', form).then(res => {
              if (res.status === 200) {
                  let url = res.data.url;
                  this.image=url
                  //this.fileList.push(url)
                  content.onSuccess('文件上传成功！');
              } else {
                  content.onError('文件上传失败');
              }
          }).catch(error => {
              console.log(error);
          });

      },
      beforeAvatarUpload (file) {
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG && !isPNG) {
              this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
          }
          if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 2MB!');
          }
          return (isJPG || isPNG) && isLt2M;
      },
    // 更新用户信息
    updateUserInfo() {

      if (this.image== "" || this.image== null) {
        this.$message.error("头像不能为空");
      } else if (this.form.nickName == "" || this.form.nickName == null) {
        this.$message.error("请输入昵称");
      } else if (this.form.realName == "" || this.form.realName == null) {
        this.$message.error("请输入姓名");
      } else if (this.form.ssex != 0&&(this.form.ssex == "" || this.form.ssex == null)) {
        this.$message.error("请选择性别");
      } else if(this.codePath==null||this.codePath.length<1){
        this.$message.error("请选地区");
      }  else if(this.birthday==null||this.birthday==""){
          this.$message.error("请输入生日");
      } else {
          if(this.form.birthday==this.birthday){
              delete this.form.birthday
          }else{
              this.form.birthday=this.birthday
          }
          if(this.form.provinceCode==""){
              delete this.form.provinceCode
          }
          if(this.form.cityCode==""){
              delete this.form.cityCode
          }
          if(this.form.areaCode==""){
              delete this.form.areaCode
          }
          this.form.avatar=this.image
          this.$http.put(`/api-user/app/user/updateusebaseinfo`,this.form).then((res)=>{
              if(res.data.resp_code === 0){
                  this.$message.success(res.data.resp_msg);
                  this.findUserInfo();
              }else{
                  this.$message.error(res.data.resp_msg);
              }
          }).catch((err)=>{
              this.disabled = false;
          })
      }
    },

    // 获取用户信息
    findUserInfo() {
        if(sessionStorage.getItem('token')) {
            this.$http.get('api-user/app/user/myInfo', {}).then((res) => {
                let userInfoAll=res.data.datas
                sessionStorage.setItem('userInfoAll',JSON.stringify( userInfoAll))
                let member=userInfoAll.member
                this.image=member.avatar
                this.birthday=member.birthday
                this.form.birthday=member.birthday
                this.form.nickName=member.nickName
                this.form.realName=member.realName
                this.form.ssex=member.ssex
                let codePath=[]
                codePath.push(member.provinceCode)
                codePath.push(member.cityCode)
                codePath.push(member.areaCode)
                console.log(codePath)
                this.codePath=codePath
            })
        }

      // this.$http.get("/pc/user/findUserInfo").then(res => {
      //   this.form = res.data.data.msg;
      // });
    },

    // 绑定邮箱
    goToBindEmail() {
      this.$router.push("/login/bindEmail");
    },

    // 修改绑定手机
    goToChangePhone() {
      this.$router.push({
        path: "/login/changePhone",
        query: {
          phone: this.form.phone,
          id: this.form.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.editAccountInformation_box {
  width: 958px;
  height: 600px;
  border: 1px solid #e5e5e5;
  .editAccountInformation_form_box {
    width: 52%;
    margin-top: 50px;
    margin-left: 100px;
    .el_inp {
      width: 220px;
    }
    .el_button {
      background: #666666;
      height: 32px;
      width: 100px;
      line-height: 9px;
      border: none;
    }


     /deep/ .el-upload {
      border: 1px dashed #d9d9d9 !important;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    /deep/ .el-upload:hover {
      border-color: #409EFF !important;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .disc_img {
      height: 30px;
      width: 30px;
      background: url("../../../../assets/desc_icon.png") no-repeat 0 4px;
      display: inline-block;
    }
    .item_add {
      i {
        margin-left: 30px;
        color: #ff8110;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
}
.el-form-item {
  margin-bottom: 5px !important;
}
</style>

