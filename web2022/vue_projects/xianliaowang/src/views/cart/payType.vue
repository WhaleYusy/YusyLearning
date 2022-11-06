<template>
  <div class="pay-type">
    <div id="pay"></div>
    <div class="p-alert">
      <div class="p-title">
        <div>
          <i class="el-icon-tickets"></i> 您的订单号 :
          <span>{{$route.query.orderNo}}</span>
        </div>
        <div>
          应付金额：
          <span>￥{{$route.query.endPayMoney}}</span>
        </div>
      </div>
      <div class="p-msg">闲料网已经为此订单预留库存，请尽快付款，超过时限订单将自动取消（具体时限请查看订单详情）</div>
    </div>
    <div class="p-box">
      <div class="title-box">
        <p class="t-left">
          请选择支付方式
          <span>（点击下方图标进行选择）</span>
        </p>
      </div>
      <div class="p-container">
        <div class="p-item" @click="onPayIconClick('微信支付', 0)">
          <div class="p-img">
            <img src="../../falseData/img/8.jpg" alt />
          </div>
          <div class="p-type">微信支付</div>
        </div>
<!--        <div class="p-item" @click="onPayIconClick('支付宝支付', 1)">-->
<!--          <div class="p-img">-->
<!--            <img src="../../falseData/img/9.jpg" alt />-->
<!--          </div>-->
<!--          <div class="p-type">支付宝支付</div>-->
<!--        </div>-->
<!--        <div class="p-item" @click="onPayIconClick('银联支付', 2)">-->
<!--          <div class="p-img">-->
<!--            <img src="../../falseData/img/10.jpg" alt />-->
<!--          </div>-->
<!--          <div class="p-type">银联支付</div>-->
<!--        </div>-->
      </div>
      <!-- <div class="tips">
        <span>注:使用 "银联支付" 的用户支付完成后请点击右边的 "确认" 按钮,便于平台进行确认订单信息及其发货,谢谢您的合作</span>
        <button @click="comfirmUnionPay">确认</button>
      </div> -->
      <div class="layer" v-if="ifShowLayer">
        <div class="confirmBlock">
          <h2>支付确认</h2>
          <p>请确认您的支付状态,便于平台进行确认订单信息及其发货</p>
          <div class="btnGroup">
            <button class="confirm" @click="payConfirm" >支付完成</button>
            <button class="noconfirm" @click="payConfirm" >未支付</button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="dialogText"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div
        class="p-code"
        v-loading="codeLoading"
        element-loading-background="rgba(255, 255, 255, 1)"
        element-loading-text="生成中..."
      >
        <div id="createBox" v-if="payTypes == 0">
          <div class="c-title" v-if="maxtime > 0">
            二维码将在
            <span style="color: orange;">{{msgTxt}}</span> 后失效，请及时付款！
          </div>
          <div class="c-title" v-else>
            二维码
            <span style="color: orange;">已失效</span>，请点击弹窗右上角按钮关闭页面重新请求(或点击页面空白部分关闭当前窗口)！
          </div>
          <!--二维码生成处 -->
        </div>
        <div v-if="payTypes == 1">即将离开本页面，跳转到支付宝支付界面，是否继续？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel" size="small">取消支付</el-button>
        <el-button
          type="primary"
          @click="onPaySuccess(payTypes)"
          size="small"
          v-if="payTypes == 0"
        >完 成</el-button>
        <el-button
          type="primary"
          @click="onPaySuccess(payTypes)"
          size="small"
          v-if="payTypes == 1"
        >去支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "payType",
  data() {
    return {
      dialogVisible: false,
      dialogText: "请选择支付",
      payTypes: "",
      codeLoading: false,
      msgTxt: "",
      maxtime: "",
      timer: null,
      ifShowLayer:false,
    };
  },
  methods: {
    payConfirm(){
      // this.$http.post('api-user/app/pc/wxPay/pcPay?orderNo='+this.$route.query.orderNo).then(res=>{
      //   this.ifShowLayer = false
      //         this.$message({
      //             type: "info",
      //             message: res.data.data.msg
      //         })
      // }).catch((res)=>{ console.log(res) })
    },
    comfirmUnionPay(){
      // 银联支付后的确认按钮
      console.log(1)
      this.$confirm("确认你已使用 '银联支付' 支付成功?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.post('/pay/agrpay/orderConfirmPay?orderNo='+this.$route.query.orderNo).then(res=>{
            this.$message({
            type: "info",
            message: res.data.data.msg
          });
          }).catch((res)=>{ console.log(res) })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 倒计时
    countDown() {
      let minutes, seconds;
      this.maxtime = 2 * 60;
      this.timer = setInterval(() => {
        if (this.maxtime >= 0) {
          minutes = Math.floor(this.maxtime / 60);
          seconds = Math.floor(this.maxtime % 60);
          this.msgTxt = ` ${minutes} 分 ${seconds} 秒`;
          --this.maxtime;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },

    // 图标点击
    onPayIconClick(msg, type) {
      this.payTypes = type;
      this.dialogText = msg;
      if (type == 0) {
        this.dialogVisible = true;
        this.wxQrcode();
      } else if (type == 1) {
        this.alipay();
      } else {
        // 银联支付时开启提示
        this.ifShowLayer = true
        // this.$router.push("/cart/unionPay");
        this.bankCardPayment();
      }
    },



    // 微信二维码
    wxQrcode() {
      this.countDown();
      this.codeLoading = true;
      this.$http
        .post("api-user/app/pc/wxPay/pcPay", { orderNo: this.$route.query.orderNo,amount:this.$route.query.endPayMoney })
        .then(res => {
          if (res.data.data.code == 0) {
            this.$message.error(res.data.data.msg);
          } else {
            this.$nextTick(() => {
              setTimeout(() => {
                let ele = document.querySelector("#createBox");
                let div = document.createElement("div");
                div.setAttribute("id", "qrcode");
                ele.appendChild(div);
                let qrcode = new QRCode("qrcode");
                console.log(res)
                qrcode.makeCode(res.data.data.codeUrl);
                setTimeout(() => {
                  this.codeLoading = false;
                }, 300);
              }, 500);
            });
          }
        });
    },

    // 支付宝支付
    alipay() {
      this.$http
        .post("/pay/alipay/prepay", {
          orderNo: this.$route.query.orderNo
        })
        .then(res => {
          if (res.data.data.code == 0) {
            this.$message.error(res.data.data.msg);
          } else {
            const div = document.createElement("div");
            div.innerHTML = res.data.data.alipayData;
            document.body.appendChild(div);
            document.forms[0].submit();
          }
        });
    },

    // 银行卡支付
    bankCardPayment() {
      this.$http
        .post("/pay/agrpay/orderPayAgricultural", {
          orderNo: this.$route.query.orderNo
        })
        .then(res => {
          //console.log(res);
          if (res.data.data.code == 0) {
            this.$message.error(res.data.data.msg);
          } else {
            // window.location.href = res.data.data.PaymentURL;
            window.open(res.data.data.PaymentURL);
          }
        });
    },

    // 确认支付
    onPaySuccess(type) {
      this.dialogVisible = false;
      if(this.$route.query.type){
          let spellDetail=JSON.parse(sessionStorage.getItem("spellDetail"))
          spellDetail.finalPayType=1
          sessionStorage.setItem("spellDetail",JSON.stringify(spellDetail))
          this.$router.push("/purchasemyDetail")
      }else {
          this.$router.push("/home/userCenter/orderManagement")
      }

    },

    // 取消支付
    onCancel() {
      this.dialogVisible = false;
      this.removeEle();
      this.$confirm("此操作将放弃订单支付, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push("/home/userCenter/orderManagement");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },

    // 关闭弹窗回调
    handleClose() {
      this.dialogVisible = false;
      this.removeEle();
      this.maxtime = 2 * 60;
      clearInterval(this.timer);
    },

    // 移除
    removeEle() {
      // if (document.querySelector("#qrcode")) {
      //   document.querySelector("#qrcode").remove();
      // }
      let parent = document.getElementById('createBox');
      var lastChild = parent.lastElementChild ? parent.lastElementChild : parent.lastChild;
      console.log(lastChild.id)
      console.log(lastChild.className)
      if(lastChild.id == 'qrcode'){
        parent.removeChild(lastChild)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pay-type {
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
    border: 1px solid #e8e8e8;
    margin: 20px 0;
    .title-box {
      height: 40px;
      background: #f2f2f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .t-left {
        font-weight: bold;
        font-size: 14px;
        span {
          font-weight: normal;
          color: red;
        }
      }
    }
    .p-container {
      background: white;
      padding: 15px;
      display: flex;
      .p-item {
        border: 1px solid #e8e8e8;
        width: 200px;
        height: 200px;
        padding: 15px;
        margin-right: 15px;
        cursor: pointer;
        border-radius: 3px;
        transition: all 1s ease;
        .p-img {
          display: flex;
          padding-top: 30px;
          img {
            width: 100px;
            height: 100px;
            margin: auto;
          }
        }
        .p-type {
          text-align: center;
          font-size: 16px;
          padding: 30px 0 0;
        }
        &:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          transition: all 1s ease;
        }
      }
    }
  }
  .p-code {
    display: flex;
    flex-direction: column;
    min-height: 300px;
    max-height: 300px;
    img {
      width: 50%;
      margin: auto;
    }
    p {
      text-align: center;
      padding: 15px 0;
    }
    #createBox {
      display: flex;
      flex-direction: column;
      .c-title {
        margin: auto;
        padding-bottom: 30px;
      }
    }
  }
}
</style>
<style>
#qrcode img {
  margin: auto;
}
.tips{
  padding:10px 20px;
  color:red;
  display:flex;
  align-items: center;
  font-size:16px;
}
.tips button{
  width:80px;
  height:30px;
  margin-left:20px;
  font-size:16px;
  color:white;
  border:none;
  background:#0094e7;
  border-radius:5px;
  outline:none;
  cursor: pointer;
}
.tips button:hover{

}
.layer{
  position:fixed;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background:rgba(0,0,0,0.5);
  display:flex;
  justify-content: center;
  align-items: center;
  z-index:9999;
}
.confirmBlock{
  width:300px;
  height:180px;
  background:white;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding:20px;
  box-sizing: border-box;
}
.confirmBlock p{
  width: 100%;
  text-indent: 2em;
  line-height:20px;
}
.confirmBlock .btnGroup{
  width:100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.btnGroup button{
  width:100px;
  height:30px;
  font-size:12px;
  border-radius:5px;
  cursor: pointer;
  outline:none;
}
.confirm{
  color:white;
  border:1px solid #0094e7;
  background:#0094e7;
}
.noconfirm{
  border:1px solid #0094e7;
  background:none;
  color:#0094e7;
}

</style>



