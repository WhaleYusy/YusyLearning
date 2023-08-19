<template>
  <div class="unionPay">
    <div class="p-alert">
      <div class="p-title">
        <div>
          <i class="el-icon-tickets"></i> 您的订单号 :
          <span>SO1907162267</span>
        </div>
        <div>
          应付金额：
          <span>￥22.24</span>
        </div>
      </div>
      <div class="p-msg">闲料网已经为此订单预留库存，请尽快付款，超过时限订单将自动取消（具体时限请查看订单详情）</div>
    </div>
    <div class="p-box">
      <div class="left-box box">
        <div class="warp">
          <div class="title">直接支付</div>
          <div class="form">
            <div class="steps">
              <el-steps :active="active" finish-status="success">
                <el-step title="1、输入卡号" class="aa"></el-step>
                <el-step title="1、输入验证信息"></el-step>
                <el-step title="1、完成支付"></el-step>
              </el-steps>
            </div>
            <el-form
              :model="nextForm"
              label-width="80px"
              size="small"
              :rules="rules"
              ref="nextForm"
            >
              <el-form-item label="卡号：" prop="name" v-if="active == 0">
                <el-input v-model="nextForm.name" placeholder="请输入卡号"></el-input>
              </el-form-item>
              <el-form-item label="信息：" prop="info" v-if="active == 1">
                <el-input prop="info" v-model="nextForm.info" placeholder="请输入验证信息"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="pass" v-if="active == 2">
                <el-input prop="pass" v-model="nextForm.pass" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('nextForm')">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="right-box box">
        <div class="warp">
          <div class="title">登录支付</div>
          <div class="form">
            <el-form ref="form" :model="form" label-width="80px" size="small">
              <el-form-item label="用户名：">
                <el-input v-model="form.name" placeholder="请输入手机号/昵称/邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密 码：">
                <el-input v-model="form.pass" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">登录支付</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "unionPay",
  data() {
    return {
      active: 0,
      form: {
        name: "",
        pass: ""
      },
      nextForm: {
        name: "",
        info: "",
        pass: ""
      },
      rules: {
        name: [{ required: true, message: "请输入卡号", trigger: "blur" }],
        info: [{ required: true, message: "请输入验证信息", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 下一步
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.active++;
          if (this.active > 2) {
            if (localStorage.getItem("orderPay")) {
              let arr = JSON.parse(localStorage.getItem("orderPay"));
              arr.forEach((item, index) => {
                arr[index]["payType"] = 1; // 已支付
              });
              localStorage.setItem("orderPay", JSON.stringify(arr));
            }
            this.$notify({
              title: "成功",
              message: "恭喜你，订单支付成功！",
              type: "success"
            });
            this.$router.push("/home/userCenter/orderManagement");
          }
        } else {
           //console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.unionPay {
  .p-alert {
    border: 1px solid #f3d4b8;
    border-radius: 3px;
    background: #fdf2e8;
    padding: 15px;
    font-size: 14px;
    .p-title {
      display: flex;
      justify-content: space-between;
      span {
        color: orange;
        font-weight: bold;
      }
    }
    .p-msg {
      color: #666666;
      line-height: 25px;
      text-indent: 2em;
      margin-top: 10px;
    }
  }
  .p-box {
    border: 2px solid #b4cae3;
    margin: 20px 0;
    display: flex;
    height: 360px;
    padding: 15px;
    box-sizing: border-box;
    .left-box {
      flex: 1;
      height: 100%;
      border-right: 1px dashed #cccccc;
    }
    .right-box {
      flex: 1;
      height: 100%;
    }
    .box {
      display: flex;
      .warp {
        margin: auto;
        .title {
          font-size: 14px;
          font-weight: bold;
          padding-left: 10px;
        }
        .form {
          width: 400px;
          margin: 20px 0;
          .steps {
            padding: 0 10px;
          }
        }
      }
    }
  }
}
.form /deep/ .el-step__title {
  font-size: 12px;
  margin-bottom: 10px;
}
</style>


