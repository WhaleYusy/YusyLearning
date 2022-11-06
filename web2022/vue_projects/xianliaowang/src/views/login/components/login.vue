<template>
  <div>
    <div class="login_box_middle_box">
      <div class="middle_box_form">
        <div v-if="!isAuth">
          <!--          <div class="l-manager"  @click="onContact">-->
          <!--            <i class="el-icon-chat-dot-square"></i>让客服经理联系我-->
          <!--          </div>-->
          <ul class="title_ul">
            <li
              v-for="(t,i) in tabList"
              :key="i"
              :class="isActive == i ? 'tabActive' : ''"
              @click="changeTab(i)"
            >
              <i :class="t.icon"></i>
              {{t.name}}
            </li>
          </ul>
          <!--          &lt;!&ndash; 手机/密码登录 &ndash;&gt;-->
          <!--          <div class="middle_box_form_item" v-if="isActive == 0">-->
          <!--            <div class="middle_box_form_item_el">-->
          <!--              <span>-->
          <!--                <i class="fa fa-user"></i>-->
          <!--              </span>-->
          <!--              <input type="text" v-model="form.phone" placeholder="请输入手机号码" />-->
          <!--            </div>-->
          <!--            <div class="middle_box_form_item_el">-->
          <!--              <span>-->
          <!--                <i class="fa fa-lock"></i>-->
          <!--              </span>-->
          <!--              <input type="password" placeholder="请输入密码" v-model="form.password" @keydown.enter="doLogin"/>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          &lt;!&ndash; 手机验证码登录 &ndash;&gt;-->
          <!--          <div class="middle_box_form_item_o" v-if="isActive == 1">-->
          <!--            <div class="outline_item">-->
          <!--              <div class="middle_box_form_item_el">-->
          <!--                <span>-->
          <!--                  <i class="fa fa-mobile" style="font-size:25px;"></i>-->
          <!--                </span>-->
          <!--                <input type="text" v-model="form.userName" placeholder="请输入手机号" />-->
          <!--              </div>-->
          <!--              <button>获取验证码</button>-->
          <!--            </div>-->
          <!--            <div class="outline_item">-->
          <!--              <div class="middle_box_form_item_el">-->
          <!--                <span>-->
          <!--                  <i class="fa fa-barcode"></i>-->
          <!--                </span>-->
          <!--                <input type="text" v-model="form.code" placeholder="请输入图片验证码" />-->
          <!--              </div>-->
          <!--              <img src="../../../assets/loginImg/image.jpg" class="code_img" alt />-->
          <!--            </div>-->
          <!--            <div class="middle_box_form_item_el_l">-->
          <!--              <span style="font-size:14px;">123</span>-->
          <!--              <input type="text" v-model="form.phoneCode" placeholder="请输入手机验证码" />-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div class="middle_box_form_type">-->
          <!--            <el-checkbox v-model="checked">记住密码</el-checkbox>-->
          <!--            &lt;!&ndash; <el-checkbox v-model="checked" style="margin-left:37px;margin-top:-20px;">自动登录</el-checkbox> &ndash;&gt;-->
          <!--            &lt;!&ndash; <div style="cursor: pointer;" @click="wechatLogin">-->
          <!--                <img src="../../../assets/loginImg/wx-icon.png" alt="">-->
          <!--                <span>&nbsp;&nbsp;微信</span>-->
          <!--            </div>&ndash;&gt;-->
          <!--            <ul>-->
          <!--              <li>-->
          <!--                <router-link to="/login/backpwd">找回密码</router-link>-->
          <!--              </li>-->
          <!--              <li>-->
          <!--                <router-link to="/login/registerStepOne">快速注册</router-link>-->
          <!--              </li>-->
          <!--            </ul>-->
          <!--          </div>-->
          <button class="login_btn" @click="doLogin">登录</button>
        </div>
        <div class="hasLoginBox" v-if="isAuth">
          <p class="hasLoginBox_p">当前已登录帐号信息</p>
          <div class="hasLoginBox_info_box">
            <p class="hasLoginBox_info_name">您好! <span style="color:#007FD0">{{userInfo.username}}</span></p>
            <!-- <p class="hasLoginBox_info_name">{{userInfo.msg.phone}}</p> -->
            <button class="hasLoginBox_info_btn" @click="$router.push('/home/index')">去逛逛吧~~</button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="扫一扫登录" :visible.sync="dialogVisible" align="center" width="300px">
      <img src alt="假装是一个二维码" class="wechat_code"/>
    </el-dialog>

    <!-- 让客服经理联系我 -->
    <!--    <el-dialog title="让客服经理联系我" :visible.sync="contactVisible" width="50%">-->
    <!--      <div style="margin: auto;text-align: center;">-->
    <!--        <div class="d-title">您的支持是我们前进的动力，请留下您的联系方式及问题详情，以便客户经理及时与您联系，谢谢支持！</div>-->
    <!--        <el-form-->
    <!--          :model="ruleForm"-->
    <!--          :rules="rules"-->
    <!--          ref="ruleForm"-->
    <!--          label-width="100px"-->
    <!--          class="demo-ruleForm"-->
    <!--          style="max-width: 500px;margin: 30px auto 0;text-align: center;"-->
    <!--        >-->
    <!--          <el-form-item label="邮箱" prop="email">-->
    <!--            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="手机" prop="phone">-->
    <!--            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>-->
    <!--          </el-form-item>-->

    <!--          <el-form-item label="详细" prop="detail">-->
    <!--            <el-input type="textarea" v-model="ruleForm.detail" placeholder="请输入反馈详情" rows="5"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item>-->
    <!--            <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--      </div>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
    export default {
        data() {
            // let checkEmail = (rule, value, callback) => {
            //   if (!value) {
            //     return callback(new Error("邮箱号不能为空"));
            //   } else {
            //     const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            //     if (reg.test(value)) {
            //       callback();
            //     } else {
            //       return callback(new Error("请输入正确的邮箱"));
            //     }
            //   }
            // };
            // let checkPhone = (rule, value, callback) => {
            //   if (!value) {
            //     return callback(new Error("手机号不能为空"));
            //   } else {
            //     const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            //     if (reg.test(value)) {
            //       callback();
            //     } else {
            //       return callback(new Error("请输入正确的手机号"));
            //     }
            //   }
            // };
            return {
                tabList: [
                    {name: "用户扫码登录", icon: "fa fa-users"}
                    // {name:'动态密码登录',icon:''}
                ],
                // form: {
                //   // phone: "18877543734",
                //   // password: "a123456",
                //   phone: "18312750943",
                //   password: "admin123"
                // },
                isActive: 0,
                //checked: 0,
                //dialogVisible: false,
                //contactVisible: false,
                // ruleForm: {
                //   email: "",
                //   phone: "",
                //   detail: ""
                // },
                userInfo: {},
                isAuth: false,
                // rules: {
                //   email: [{ required: true, trigger: "blur", validator: checkEmail }],
                //   phone: [{ required: true, trigger: "blur", validator: checkPhone }],
                //   detail: [{ required: true, message: "请输入反馈详情", trigger: "blur" }]
                // }
            };
        },
        mounted() {
            // if(localStorage.getItem("form")){
            //   let form = JSON.parse(localStorage.getItem("form"));
            //   this.form.phone = form.phone;
            //   this.form.password = form.password;
            // }
            //获取微信登录的二维码
            // this.getCodeImgUrl("http://www.baidu.com")
            // this.isAuth = sessionStorage.getItem('userInfo') ? true : false
            // if (this.isAuth) {
            //     this.getFindUserInfo();
            // }
        },
        methods: {
            // 获取用户信息
            getFindUserInfo() {
                this.$http.get("pc/user/findUserInfo").then(res => {
                    this.userInfo = res.data.data.msg;
                    console.log(this.userInfo)
                });
            },
            getCodeImgUrl(redirect_uri){
              this.$http.get("/api-user/app/pc/login/qRcode",{redirect_uri:redirect_uri}).then((data)=>{
                  data=data.data
                  if(data.resp_code==0){
                      location.href=data.datas.redirectUrl
                  }
              })
            },
            // 表单提交
            // submitForm(formName) {
            //   this.$refs[formName].validate(valid => {
            //     if (valid) {
            //       this.$http
            //         .post("/pc/contact/save", { ...this.ruleForm })
            //         .then(res => {
            //           if (res.data.data.code == 1) {
            //             this.$message({
            //               message: res.data.data.msg,
            //               type: "success"
            //             });
            //           } else {
            //             this.$message({
            //               message: res.data.data.msg,
            //               type: "warning"
            //             });
            //           }
            //           this.$refs[formName].resetFields();
            //           this.contactVisible = false;
            //         });
            //     } else {
            //       return false;
            //     }
            //   });
            // },

            // 让客服经理联系我
            // onContact() {
            //   this.contactVisible = true;
            // },

            // changeTab(ind) {
            //   this.isActive = ind;
            // },
            // 微信登录,打开二维码
            wechatLogin() {
                this.dialogVisible = true;
            },
            // // 登录
            doLogin() {
                let info = {
                    campany: null,
                    cardNo: null,
                    confrimPswd: null,
                    createdTime: "2019-09-12 10:13:43",
                    createdTimeFrom: null,
                    createdTimeTo: null,
                    creator: null,
                    creatorId: null,
                    discount: null,
                    email: null,
                    id: 70,
                    inUid: null,
                    isDelete: 0,
                    lastOperator: null,
                    lastOperatorId: null,
                    password: "it's a secret",
                    phone: "18877543734",
                    point: 0,
                    qqNum: null,
                    realName: null,
                    regTime: "2019-09-12 10:13:43",
                    sex: null,
                    taxpayerNo: null,
                    updateTime: "2019-09-27 16:27:49",
                    userCode: null,
                    userLevel: 3,
                    username: null,
                    wxOpenid: null
                }
                // onBbM5u4S_8r9pEQbv4OEaFdbxnQ
                this.$http.loginHttp(`/api-uac/oauth/openId/token`,{openId:'o91emwnFItxva111Lvzpk59Pilnk'},window.btoa('webApp:webApp')).then((resp)=>{
                    let obj = {
                        tok: resp.data.datas.access_token,
                        info: info,
                        time: '20191203114816'
                    };
                    sessionStorage.setItem("userInfo", JSON.stringify(obj));
                    this.$router.push("/home/index");
                })

                return;
              if (this.form.phone == "") {
                this.$message(`请输入手机号`);
                return;
              }
              if (
                !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
                  this.form.phone
                )
              ) {
                this.$message(`手机号格式不正确`);
                return;
              }
              if (this.form.password == "" && this.isActive == 0) {
                this.$message("请输入密码");
                return;
              }
              if(this.checked){
                console.log(123)
                localStorage.setItem("form", JSON.stringify(this.form));
              }
              this.form.password = this.$md5(this.form.password);
              this.$http
                .post("/pc/user/login", this.form)
                .then(res => {
                  if (res.data.data.code == 1) {
                    console.log(res.data.data.msg.exipreTime);
                    this.requestCartNum();
                    let obj = {
                      tok: res.data.data.msg.token,
                      info: res.data.data.msg.user,
                      time: res.data.data.msg.exipreTime
                    };
                    sessionStorage.setItem("userInfo", JSON.stringify(obj));
                     //console.log("此时的缓存userInfo");
                     //console.log(localStorage.getItem("userInfo"));
                    this.$router.push("/home/index");
                    this.$message({ message: "登录成功", type: "success" });
                  } else {
                    this.$message.error(res.data.data.msg);
                    this.form.password = "";
                  }
                })
                .catch(err => {});
            }
        }
    };
</script>

<style lang="scss" scoped>
  .login_box_middle_box {
    width: 100%;
    height: 530px;
    max-width: 1000px;
    background: url("../../../assets/loginImg/bg1.jpg") no-repeat;
    margin: 0 auto;
    padding-top: 50px;
    box-sizing: border-box;
    position: relative;

    .middle_box_form {
      width: 370px;
      min-height: 345px;
      padding-bottom: 10px;
      box-sizing: border-box;
      background: #f9f9f9;
      position: absolute;
      right: 0;

      .l-manager {
        position: absolute;
        right: 35px;
        top: 15px;
        background: #ff7800;
        color: white;
        padding: 3px 5px;
        border-radius: 3px;
        cursor: pointer;
        display: flex;
        align-items: center;

        i {
          font-size: 16px;
          padding-right: 3px;
        }
      }

      .hasLoginBox {
        width: 100%;
        height: 100%;

        .hasLoginBox_p {
          width: 100%;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          padding: 0 10px;
          box-sizing: border-box;
          color: #ff7800;
          border-bottom: 2px solid #eeeeee;
        }

        .hasLoginBox_info_box {
          width: 100%;
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .hasLoginBox_info_name {
            width: 100%;
            font-size: 30px;
            text-align: center;
            padding: 0 20px;
            box-sizing: border-box;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .hasLoginBox_info_btn {
            width: 150px;
            height: 50px;
            background: #ff7800;
            border: none;
            outline: none;
            margin-top: 50px;
            color: #fff;
            font-size: 20px;
            border-radius: 10px;
          }
        }
      }

      .title_ul {
        width: 100%;
        height: 55px;
        display: flex;
        font-size: 18px;

        li {
          width: 50%;
          height: 100%;
          line-height: 55px;
          padding-left: 35px;
          box-sizing: border-box;
          cursor: pointer;
          background: #e6e6e6;
        }
      }

      .middle_box_form_item {
        width: 80%;
        min-height: 105px;
        margin: 30px auto 0px;

        .middle_box_form_item_el {
          width: 100%;
          height: 40px;
          margin-bottom: 20px;
          border: 1px solid #d8d8d8;
          display: flex;

          span {
            display: inline-block;
            width: 15%;
            height: 100%;
            background: #e6e6e6;
            text-align: center;
            line-height: 40px;
            color: #bebebe;
            font-size: 20px;
          }

          input {
            width: 85%;
            height: 100%;
            border: none;
            padding-left: 10px;
            font-size: 15px;
            box-sizing: border-box;
            color: #666666;
          }
        }
      }

      .middle_box_form_item_o {
        width: 80%;
        min-height: 105px;
        margin: 30px auto 0px;

        .outline_item {
          width: 100%;
          height: 40px;
          margin-bottom: 20px;
          display: flex;

          .middle_box_form_item_el {
            width: 77%;
            display: flex;
            align-items: center;
            height: 100%;
            border: 1px solid #d8d8d8;

            span {
              display: inline-block;
              width: 20%;
              height: 100%;
              background: #e6e6e6;
              text-align: center;
              line-height: 40px;
              color: #bebebe;
              font-size: 20px;
            }

            input {
              width: 80%;
              height: 100%;
              border: none;
              padding-left: 10px;
              font-size: 15px;
              box-sizing: border-box;
              color: #666666;
            }
          }

          button {
            width: 23%;
            height: 40px;
            border: 1px solid #ff6600;
            background: #f9f9f9;
            color: #ff6600;
            margin-left: 1%;
            border-radius: 5px;
            outline: none;
            cursor: pointer;
          }

          .code_img {
            width: 23%;
            height: 40px;
          }
        }
      }

      .middle_box_form_item_el_l {
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
        border: 1px solid #d8d8d8;
        display: flex;

        span {
          display: inline-block;
          width: 15%;
          height: 100%;
          background: #e6e6e6;
          text-align: center;
          line-height: 40px;
          color: #bebebe;
          font-size: 20px;
        }

        input {
          width: 85%;
          height: 100%;
          border: none;
          padding-left: 10px;
          font-size: 15px;
          box-sizing: border-box;
          color: #666666;
        }
      }

      .login_btn {
        width: 80%;
        height: 40px;
        text-align: center;
        color: white;
        font-size: 20px;
        line-height: 40px;
        background: #ff7800;
        border: none;
        outline: none;
        margin-left: 37px;
      }

      .middle_box_form_type {
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px auto;

        div,
        ul {
          display: flex;
          align-items: center;
          font-size: 15px;
        }

        li {
          margin-left: 20px;
          cursor: pointer;

          a {
            color: #007fd0;

            &:hover {
              text-decoration: none;
            }
          }
        }
      }
    }
  }

  .wechat_code {
    width: 200px;
    height: 200px;
  }

  .tabActive {
    color: #ff6600;
    background: #f9f9f9 !important;
  }
</style>

