<template>
  <div class="register_Step_One_box">
    <p class="title">
      <span>
        修改手机号
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </span>
    </p>
    <!-- 步骤条 -->
    <el-steps :active="step" finish-status="success" simple style="margin-top: 30px">
      <el-step style="width:80%;" title="1. 验证并填写原手机号及验证码" icon="el-icon-edit"></el-step>
      <el-step title="2. 设置新手机号" icon="el-icon-upload"></el-step>
    </el-steps>
    <!-- 第一步 -->
    <div class="register_Step_One_form" v-if="step == 1">
      <el-form label-position="right" label-width="180px" :model="formLabelAlign">
        <!-- <el-form-item label="客户编号：">
          <p class="custmer_num">521168A</p>
        </el-form-item>-->
        <el-form-item label="原手机号：">
          <el-radio v-model="radio" label="1">{{$route.query.phone}}</el-radio>
        </el-form-item>
        <el-form-item label="输入图片校验码：">
          <div class="item_flex">
            <el-input v-model.trim="formLabelAlign.imgCode" class="el_inp" placeholder="请输入验证码"></el-input>
            <img :src="`data:image/jpeg;base64,${codeImg}`" class="code_img" @click="getCodeImg" />
          </div>
        </el-form-item>
        <el-form-item label="输入手机验证码">
          <div class="item_flex">
            <el-input v-model.trim="formLabelAlign.phoneCode" class="el_inp" placeholder="请输入手机验证码"></el-input>
            <el-button
              style="border:1px solid #EA8A01;color:#EA8A01"
              @click="countDown"
              v-if="num == 0 || num == 60"
            >发送验证码</el-button>
            <el-button style="border:1px solid #EA8A01;color:#EA8A01" v-else disabled>倒计时 {{num}} s</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="next_btn" @click="nextStep">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 第二步 -->
    <div class="register_Step_One_form" v-if="step == 2">
      <el-form label-position="right" label-width="180px" :model="formLabelAlign">
        <el-form-item label="输入新手机号：">
          <el-input v-model="formLabelAlign.phone" class="el_inp"></el-input>
        </el-form-item>
        <el-form-item label="输入图片校验码：">
          <div class="item_flex">
            <el-input v-model.trim="formLabelAlign.imgCode" class="el_inp" placeholder="请输入图片验证码"></el-input>
            <img :src="`data:image/jpeg;base64,${codeImg}`" class="code_img" @click="getCodeImg" />
          </div>
        </el-form-item>
        <el-form-item label="输入手机验证码">
          <div class="item_flex">
            <el-input v-model.trim="formLabelAlign.phoneCode" class="el_inp" placeholder="请输入手机验证码"></el-input>
            <el-button
              style="border:1px solid #EA8A01;color:#EA8A01"
              @click="countDown"
              v-if="num == 0 || num == 60"
            >发送验证码</el-button>
            <el-button style="border:1px solid #EA8A01;color:#EA8A01" v-else disabled>倒计时 {{num}} s</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="next_btn" @click="onSubmit">完&nbsp;&nbsp;&nbsp;&nbsp;成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { clearInterval } from 'timers';
export default {
  data() {
    return {
      checked: 1,
      formLabelAlign: {
        phone: "",
        imgCode: "",
        phoneCode: ""
      },
      step: 1,
      radio: "1",
      codeImg: "",
      num: 60,
      timer: null
    };
  },
  mounted() {
    this.formLabelAlign.phone = this.$route.query.phone
    this.getCodeImg();
  },
  methods: {
    // 获取验证码+倒计时
    countDown() {
      if (this.$route.query.phone == "") {
        this.$message("数据异常，请稍后重试");
        return;
      }
      this.$http
        .post('/pc/sms/sendSms/'+this.formLabelAlign.phone.trim())
        .then(res => {
          if (res.data.data.code == 1) {
            this.$message({ message: res.data.data.msg, type: "success" });
            this.num = 60;
            this.timer = setInterval(() => {
              if (this.num > 0) {
                this.num -= 1;
              } else {
                window.clearInterval(this.timer);
              }
            }, 1000);
          } else {
            this.$message.error(res.data.data.msg);
          }
        })
        .catch(err => {
           //console.log(err);
        });
    },

    // 图片校验码
    getCodeImg() {
      this.$http.get(`/pc/sms/getCodeImg?${new Date().getTime()}`).then(res => {
        this.codeImg = res.data.data.base64;
      });
    },

    // 上下一步
    nextStep() {
      if (this.formLabelAlign.imgCode == "") {
        this.$message.error("请输入图片校验码");
      } else if (this.formLabelAlign.phoneCode == "") {
        this.$message.error("请输入手机验证码");
      } else {
        this.setRequest("/pc/sms/checkImgCodeAndPhoneCode", 0);
      }
    },

    // 完成提交
    onSubmit() {
      if (
        !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
          this.formLabelAlign.phone
        )
      ) {
        this.$message.error("手机号码格式不正确");
      } else if (this.formLabelAlign.imgCode == "") {
        this.$message.error("请输入图片校验码");
      } else if (this.formLabelAlign.phoneCode == "") {
        this.$message.error("请输入手机验证码");
      } else {
        this.setRequest("/pc/sms/reSetPhone2User", 1);
      }
    },

    // 下一步与完成请求
    setRequest(url, type) {
      this.$http
        .post(url, {
          uid: this.$route.query.id,
          phone:
            type == 0 ? this.$route.query.phone : this.formLabelAlign.phone,
          imgCode: this.formLabelAlign.imgCode,
          phoneCode: this.formLabelAlign.phoneCode
        })
        .then(res => {
          if (res.data.data.code == 1) {
            if (type == 0) {
              this.$message.success(res.data.data.msg);
              //做一个置空的 操作，刷新图形验证码，清空倒计时
              window.clearInterval(this.timer)
              this.formLabelAlign.imgCode = ''
              this.formLabelAlign.phoneCode = ''
              this.formLabelAlign.phone = ''
              this.num = 60;
              this.getCodeImg()
              this.step += 1;
            } else {
              this.$message("请使用新的手机号码进行登录")
              sessionStorage.removeItem("userInfo");
              this.$router.push("/home/userCenter/editAccountInformation");
            }
          } else {
            this.$message.error(res.data.data.msg);
            this.getCodeImg();
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.register_Step_One_box {
  width: 100%;
  min-height: 530px;
  max-width: 1000px;
  margin: 20px auto;
  border-radius: 5px;
  background: #f8f8f8;
  .title {
    width: 100%;
    height: 80px;
    display: flex;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid #efefef;
    color: #6f6f6f;
    span:nth-of-type(2) {
      font-size: 15px;
      font-weight: bold;
      a {
        color: #6f6f6f;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
  .register_Step_One_form {
    width: 60%;
    margin: 50px auto 30px;
    .el_inp {
      width: 300px;
      margin-right: 5px;
    }
    .register_Step_first {
      display: flex;
      ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        li {
          p {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
    .service {
      margin-left: -30px;
      &:hover {
        text-decoration: none;
      }
    }
    .next_btn {
      width: 200px;
      background: #fc6e06;
      color: #ffffff;
    }
    .next_btn1 {
      margin-left: 200px;
      margin-top: 50px;
    }
    .custmer_num {
      font-size: 18px;
      font-weight: bold;
      color: #007fd0;
    }
  }
}
.item_flex {
  display: flex;
  .code_img {
    width: 63px;
    height: 40px;
  }
}
/deep/ .el-steps--simple{
  //ie10样式乱掉
  width:84% !important;
  height: 30px;
}
</style>


