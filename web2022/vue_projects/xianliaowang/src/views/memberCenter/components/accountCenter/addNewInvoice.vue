<template>
  <div class="VATInvoiceInformation_box">
    <div class="VATInvoiceInformation_top_form">
      <el-form
        :label-position="labelPosition"
        label-width="150px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
        size="mini"
      >
        <el-form-item label="公司名称：" prop="companyName">
          <el-input class="el_inp" v-model="formLabelAlign.companyName"></el-input>
        </el-form-item>
        <el-form-item label="税号：" prop="invoiceName">
          <el-input class="el_inp" v-model="formLabelAlign.invoiceName"></el-input>
        </el-form-item>
        <el-form-item label="银行名称：" prop="bankName">
          <el-input class="el_inp" v-model="formLabelAlign.bankName"></el-input>
        </el-form-item>
        <el-form-item label="银行账户：" prop="bankNo">
          <el-input class="el_inp" v-model="formLabelAlign.bankNo"></el-input>
        </el-form-item>
        <el-form-item label="注册地址：" prop="registerAddress">
          <el-input class="el_inp" v-model="formLabelAlign.registerAddress"></el-input>
        </el-form-item>
        <el-form-item label="注册电话：" prop="registerPhone">
          <el-input class="el_inp" v-model="formLabelAlign.registerPhone"></el-input>
        </el-form-item>
        <el-form-item label="收件人：" prop="consignee">
          <el-input class="el_inp" v-model="formLabelAlign.consignee"></el-input>
        </el-form-item>
        <el-form-item label="发票收件人手机：" prop="consigneePhone">
          <el-input class="el_inp" v-model="formLabelAlign.consigneePhone"></el-input>
        </el-form-item>
        <el-form-item label="收件人地址：" prop="consigneeAddress">
          <el-cascader
            v-model="formLabelAlign.consigneeAddress"
            :options="areaList"
            :props="{ expandTrigger: 'hover', value: 'name', label: 'name' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="收件人详细地址：" prop="consigneeAddressInfo">
          <el-input
            placeholder="街道、小区、楼牌号等，无需重复填写省市区"
            v-model="formLabelAlign.consigneeAddressInfo"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" size="small" @click="submitForm('formLabelAlign')">提交保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    var registerPhones = (rule, value, callback) => {
      if (
        !/(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)/.test(
          this.formLabelAlign.registerPhone
        )
      ) {
        callback(new Error("请输入正确的座机号，格式为：0000-0000000"));
      } else {
        callback();
      }
    };
    var consigneePhones = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(this.formLabelAlign.consigneePhone)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      formLabelAlign: {
        companyName: "", //公司名称
        invoiceName: "", //税号
        bankName: "", //银行名称
        bankNo: "", //银行账户
        registerAddress: "", //注册地址
        registerPhone: "", //注册电话
        consignee: "", // 收件人
        consigneePhone: "", // 收件人收件号码
        consigneeAddress: "", // 收件人地址
        consigneeAddressInfo: "" // 收件人详细地址
      },
      rules: {
        companyName: [
          { required: true, message: "请输入开票公司名称", trigger: "blur" }
        ],
        invoiceName: [
          { required: true, message: "请输入税号", trigger: "blur" }
        ],
        bankName: [{ required: true, message: "请输入银行", trigger: "blur" }],
        bankNo: [{ required: true, message: "请输入账号", trigger: "blur" }],
        registerAddress: [
          { required: true, message: "请输入地址", trigger: "blur" }
        ],
        registerPhone: [
          { validator: registerPhones, required: true, trigger: "blur" }
        ],
        consignee: [
          { required: true, message: "请输入发票收件人", trigger: "blur" }
        ],
        consigneePhone: [
          { validator: consigneePhones, required: true, trigger: "blur" }
        ],
        consigneeAddress: [
          { required: true, message: "请选择收件人地址", trigger: "change" }
        ],
        consigneeAddressInfo: [
          { required: true, message: "请输入收件人详细地址", trigger: "blur" }
        ]
      },
      areaList: []
    };
  },
  created() {
    this.getFindAreaList();
  },
  methods: {
    // 专用发票(增值税) --获取城市下拉列表
    getFindAreaList() {
      this.$http.get("/pc/address/findAreaList").then(res => {
        this.areaList = res.data.data;
      });
    },

    // 提交申请
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let address = this.formLabelAlign.consigneeAddress;
          this.formLabelAlign.consigneeAddress = `${address[0]},${address[1]},${
            address[2]
          }`;
          this.$http
            .post("/pc/invoice/saveInvoiceInfo", { ...this.formLabelAlign })
            .then(res => {
              if (res.data.data.code === 1) {
                this.$message.success(res.data.data.msg);
                this.$refs[formName].resetFields();
              } else {
                this.$message(res.data.data.msg);
              }
              this.$emit("close");
            })
            .catch(res => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.VATInvoiceInformation_box {
  box-sizing: border-box;
  .VATInvoiceInformation_top_form {
    width: 100%;
    .el_inp {
      width: 250px;
    }
  }
  .VATInvoiceInformation_top_for {
    width: 400px;
  }
}
</style>
