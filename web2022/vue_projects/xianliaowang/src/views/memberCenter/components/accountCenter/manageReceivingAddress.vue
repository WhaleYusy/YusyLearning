<template>
  <div class="manageReceivingAddress_box">
    <div class="router_title">
      <span class="router_title_name">{{$route.meta.activeName}}</span>
      <p>
        <!-- <span @click="deleteAddr"><i class="fa fa-trash" aria-hidden="true"></i> 删除所选</span> -->
        <span @click="showAdd">
          <i class="fa fa-plus"></i> 新增
        </span>
      </p>
    </div>
    <el-table :data="addrList" border style="width: 100%" >
      <el-table-column align="center" type="index" width="55"></el-table-column>
      <el-table-column prop="consignee" align="center" label="收件人" width="180"></el-table-column>
      <el-table-column prop="area" align="center" label="收货地址">
        <template slot-scope="scope">
          <span>
            {{scope.row.area}}{{scope.row.detailArea}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="telephone" align="center" label="联系手机" width="180"></el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <p class="operation">
             <span v-if="scope.row.defaultAddressStatus === 1">
              <i class="fa fa-map-marker" style="font-size:13px"></i> 默认地址
            </span>
            <span v-else  @click="setDefault(scope.row,scope.$index)">设为默认</span>

            <span @click="editRow(scope.row,scope.$index)">修改</span>
            <span v-if="!scope.row.isDefault" @click="deleteRow(scope.row.id)">删除</span>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/修改收货地址 -->
    <div class="enshrineSuccess" style="display:block;" v-if="dialogFormVisible">
      <div class="enshrineSuccessToast">
        <div class="title">
          <h3>新增/修改收货地址</h3>
          <span class="cancel" @click="hideShrineToast">x</span>
        </div>
        <el-form
          :model="form"
          ref="addressForm"
          :rules="rules"
          class="form_box"
          :label-width="formLabelWidth"
        >
          <el-form-item label="收货人：" prop="consignee" >
            <el-input
              v-model="form.consignee"
              size="small"
              class="el_inp"
              placeholder="姓名"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机：" prop="telephone">
            <el-input
              v-model="form.telephone"
              size="small"
              class="el_inp"
              placeholder="填写正确的手机号"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在地区：" prop="area">
            <el-cascader
              ref="areaCascader"
              :options="options"
              v-model="form.codePath"
              placeholder="请选择省 请选择市 请选择区"
              clearable
              @change="handleAreaChange"
              :props="props"
              style="width:200px"
              size="small"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址：" prop="detailArea">
            <el-input
              v-model="form.detailArea"
              style="width:280px;"
              placeholder="街道、小区、楼牌号等，无需重复填写省市区"
              size="small"
              class="el_inp"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label>
            <el-button type="primary" size="mini" @click="saveAddress">保 存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <fail-Tips  :tipsCont="tipsCont" ref="failTip"></fail-Tips>
  </div>
</template>

<script>
import failTips from "../../../../components/wedTips/fail";
export default {
  components: { failTips },
  data() {
    return {
      // tableData: [],
      tipsCont: "请选择要删除的地址",
      selectedOptions: [],
      options:[],
      props: {
        value: 'value',
        label:'title',
        children: 'children'
      },
      dialogFormVisible: false,
      form: {
        // provinceId:'',     // 省id
        // cityId:'',          // 市id
        // districtId:'',     // 区/县id
        // addressInfo:'',     // 地址详情
        // mobile:'',          // 手机号码
        // zip:'',           // 邮政编码
        // receiver:'',           // 收货人
        // isDefault:''           // 是否默认
      },
      formLabelWidth: "120px",
      showFail: false,
      rules: {
          consignee: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          telephone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: "手机号码格式有误！",
            trigger: "blur"
          }
        ],
          area: [{ required: true, message: "请选择地区", trigger: "change" }],
          detailArea: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      isAdd: true,
      index: null,
      addrList:[],//地址列表

    };
  },
  mounted() {
    // this.tableData = JSON.parse(sessionStorage.getItem("addressList")) || [];
    this.getCity();
    this.getList()

  },
  methods: {
      handleAreaChange(value){
          if(value[2]){
              this.form.code=value[2]
              console.log(this.form.code)
          }
          this.form.area=this.$refs.areaCascader.getCheckedNodes()[0].pathLabels.join("")

      },

    chooseAddr(){
      console.log('i')
    },
    test(){
       //console.log(this.form)
        //this.form.code=
    },
    getList(){
      let that = this
        this.$http.get('/api-user/app/mdcShippingAddr/getOwnerShipAddr',{pageNum:1,
            pageSize:100}).then((res)=>{
            this.addrList = res.data.data
        })
      // this.$http.get(`/pc/address/findAddressList2User?${new Date().getTime()}`).then(res=>{
      //   //console.log(res)
      //   console.log(that.addrList);
      //   console.log('------')
      //   console.log(res.data.data.msg)
      //   that.addrList = res.data.data.msg
      //   for(let i = 0 ;i<that.addrList.length;i++){
      //     that.addrList[i].fullPath = that.addrList[i].proviceName + that.addrList[i].cityName + that.addrList[i].districtName + this.addrList[i].addressInfo
      //   }
      //    console.log(that.addrList);
      // }).catch(res=>{
      //    //console.log(res)
      // })
    },
    // 获取城市列表
    getCity(){
        this.$http.get('/api-user/app/addressData/pc').then((res)=>{
            this.options = res.data.datas.rows.children
        })
    },
    // 新增
    showAdd() {
      this.dialogFormVisible = true;
      this.isAdd = true;
      this.form = {};
      document.body.style.overflow = 'hidden';
    },
    // 修改
    editRow(row, ind) {
      this.dialogFormVisible = true;
      document.body.style.overflow = 'hidden';
        let  path=row.codePath.split(',')
      this.form = JSON.parse(JSON.stringify(row));
        this.form.codePath=path
      //this.form.testCity = [row.provinceId,row.cityId,row.districtId]
      this.index = ind;
      this.isAdd = false;
    },
    // 设为默认地址
    setDefault(row,index) {
       //console.log(id)
        let rowTemp={}
        rowTemp.id=row.id
        rowTemp.defaultAddressStatus=1
      this.$http.post('/api-user/app/mdcShippingAddr/updateShipAddr',rowTemp).then(res=>{
         //console.log(res)
        if(res.data.resp_code === 0){
          if(this.$route.query.type =='choose'){
            this.$router.push({path:'/cart/placeOrder'})
          }
          this.$message.success('操作成功')
          this.getList()
          if(this.$route.query.type === 'chooseAddr'){
            this.$router.push({path:'/cart/placeOrder'})
          }
        }else{
          this.$message(res.data.data.msg)
        }
      }).catch(res=>{
         //console.log(res)
      })
      this.addrList.forEach(item => {
        item.isDefault = false;
      });
      this.addrList[index].isDefault = 1;
      sessionStorage.setItem("addressList", JSON.stringify(this.addrList));
    },


    // 删除
    deleteRow(id) {
        let that=this
        this.$confirm("确认删除这条地址信息？", "删除地址", {
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            this.$http.delete('/api-user/app/mdcShippingAddr/delShipAddrs/'+id).then((res)=>{
                if(res.data.resp_code === 0){
                    that.$message.success(res.data.resp_msg)
                    this.getList();
                }else {
                    that.$message({
                        message: "删除失败",
                        type: "warning"
                    })
                }
            })
        }).catch(() => {});
    },
    // 隐藏弹窗
    hideShrineToast() {
      this.dialogFormVisible = false;
      document.body.style.overflow = 'auto';
    },
    //删除收货地址
    deleteAddr() {
      this.showFail = true;
      //在此处用到了失败弹窗
      this.$refs.failTip.openAndAdd();
    },
    // 添加/编辑收货地址
    saveAddress() {
      let actions = ()=>{
        if(this.form.code !== undefined&&this.form.code !== ""){
          // this.form.provinceId = this.form.testCity[0]
          // this.form.cityId = this.form.testCity[1]
          // this.form.districtId = this.form.testCity[2]
            let url
            if(this.addrList.length<1){
                this.form.defaultAddressStatus=1
            }
            this.form.codePath=""
            if(this.isAdd){
                url = '/api-user/app/mdcShippingAddr/addShipAddr'
            }else{
                url = '/api-user/app/mdcShippingAddr/updateShipAddr'
            }
          //console.log(this.form)
          this.$http.post(url,this.form).then(res=>{
            // console.log(res)
            if(res.data.resp_code === 0){
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              if(this.$route.query.type =='choose'){
                this.$router.push({path:'/cart/placeOrder',query:{addrData:this.form}})
              }
              this.dialogFormVisible = false;
              document.body.style.overflow = 'auto';
              this.getList()
            }else{
              this.$message({
                message: '操作失败',
                  type: 'warning'
              });
              this.dialogFormVisible = false
              document.body.style.overflow = 'auto';
            }
          }).catch(res=>{})
        }
      }
      this.$refs['addressForm'].validate((valid) => {
        if (valid) {
          actions();
        } else {
          this.$message('请输入完整的信息')
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.manageReceivingAddress_box {
  width: 100%;
  .router_title {
    width: 100%;
    height: 46px;
    background: #efeeee;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    justify-content: space-between;
    margin-bottom: 20px;
    .router_title_name {
      font-size: 15px;
      font-weight: bold;
    }
    p {
      span {
        color: #6a6c75;
        margin-left: 20px;
        cursor: pointer;
        i {
          color: #f7ab63;
          font-size: 14px;
        }
      }
    }
  }
}
.el-table /deep/ th {
  background: #f8f8f8 !important;
  color: #444444;
}
.operation {
  span {
    font-size: 12px;
    cursor: pointer;
    &:nth-of-type(2) {
      margin: 0 10px;
    }
    &:hover {
      color: #0093e6;
    }
  }
}
.form_box {
  width: 80%;
  margin: 20px 0;
}
.el-form-item {
  margin-bottom: 15px !important;
}
.el_inp {
  width: 200px;
}
.enshrineSuccess {
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  .enshrineSuccessToast {
    width: 490px;
    min-height: 180px;
    background: white;
    margin: 300px auto;
    border: 3px solid lightgray;
    .title {
      width: 100%;
      height: 30px;
      font-size: 16px;
      background: rgb(240, 240, 240);
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cancel {
        cursor: pointer;
      }
      .cancel:hover {
        color: #0094e7;
      }
    }
  }
}
</style>
