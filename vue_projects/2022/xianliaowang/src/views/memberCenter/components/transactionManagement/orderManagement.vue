<template>
  <div class="orderManagement">
    <div class="advancedFilterBar">
      <div class="buyTime">
        <span>购买时间：</span>
        <el-date-picker
          v-model="buyTime1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          style="width: 210px;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="orderStatus">
        <span>订单号：</span>
        <el-input v-model="KeyWord" placeholder="请输入订单号" style="width:200px !important;" size="mini"></el-input>
      </div>
      <div class="payStatus">
        <span>支付状态：</span>
        <el-select v-model="payStatus" placeholder="请选择" size="mini" clearable>
          <el-option
            v-for="item in payStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div style="margin-left: 15px;">
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="onSearch"
          :loading="searchLoading"
        >搜索
        </el-button>
      </div>
    </div>

    <div class="o-table">
      <el-table :data="tableData" style="width: 100%" border>
        <template slot="empty">
          <div class="no-more">
            <p v-if="isSearch == false">
              糟糕，没有订单信息！
              <span @click="$router.push('/home/outLandDemo')">快去逛逛吧</span>
            </p>
            <p v-else>抱歉，未搜索到相关订单！</p>
          </div>
        </template>
        <el-table-column prop="orderNo" label="订单号" width="160" align="center"></el-table-column>
<!--        <el-table-column prop="payType" label="支付方式">-->
<!--          <template-->
<!--            slot-scope="scope"-->
<!--            v-if="scope.row.status != 0 && scope.row.status != 8"-->
<!--          >{{scope.row.payType | isPayType}}-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column prop="payMoney" label="付款总额" align="center">
          <template slot-scope="scope">
            {{scope.row.isBuy==1?scope.row.perPay:scope.row.totalPrice}}
          </template>
        </el-table-column>
<!--        <el-table-column prop="endPayMoney" label="实付总额"></el-table-column>-->
        <el-table-column prop="payTime" label="支付时间" align="center">
          <template slot-scope="scope">
          {{scope.row.payTime|timeFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="createdTime" label="下单时间" align="center">
          <template slot-scope="scope">
            {{scope.row.createdTime|timeFormat}}
          </template>
        </el-table-column>
        <!--        <el-table-column prop="phone" label="联系方式"></el-table-column>-->
        <el-table-column prop="status" label="支付状态" width="94" align="center">
          <template slot-scope="scope">
            <el-tag :type="isTagType(scope.row.status)">{{scope.row.status | isStatus}}</el-tag>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="brand" label="开票状态">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag-->
        <!--              :type="scope.row.invoiceStatus == 0 ? 'success' : 'warning'"-->
        <!--            >{{scope.row.invoiceStatus == 0 ? '未开票' : '已开票'}}</el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column prop="address" label="操作" width="100px" align="center">
          <template slot-scope="scope">
            <div class="btn-group">
              <el-button
                v-if="scope.row.status == 0"
                size="mini"
                type="primary"
                @click="$router.push({path: '/cart/payType', query: {orderNo: scope.row.orderNo, endPayMoney: scope.row.isBuy==1?scope.row.perPay:scope.row.totalPrice}})"
              >支付订单
              </el-button>
              <el-button size="mini" type="info" @click="onSeeOrderInfo(scope.row.id)">查看订单</el-button>
              <el-button
                v-if="scope.row.status != 0 && scope.row.status != 8"
                size="mini"
                type="success"
                @click="onSeeExpress(scope.row.id)"
              >查看物流
              </el-button>
              <el-button
                v-if="scope.row.status == 0"
                size="mini"
                type="warning"
                @click="onCancelOrder(scope.row.id)"
              >取消订单
              </el-button>
<!--              <el-button-->
<!--                size="mini"-->
<!--                v-if="scope.row.status == 2"-->
<!--                @click="onRefundMoney(scope.row.id)"-->
<!--              >申请退款-->
<!--              </el-button>-->
              <el-button
                size="mini"
                type="danger"
                v-if="scope.row.status == 2"
                @click="onConfirmReceive(scope.row)"
              >确认收货
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 查看物流 -->
    <el-dialog title="物流信息" :visible.sync="expressVisible" width="50%" class="express">
      <div
        style="min-height: 500px;max-height: 500px;overflow: auto;"
        v-loading="loading"
        element-loading-text="查询中..."
      >
<!--        <div class="expressTxt" v-if="expressTxt.code != 0">-->
<!--          <p>-->
<!--            物流单号：-->
<!--            <span>{{logisticsData.LogisticCode}}</span>-->
<!--          </p>-->
<!--          <p>-->
<!--            物流公司：-->
<!--            <span>{{expressTxt.expressName}}</span>-->
<!--          </p>-->
<!--        </div>-->
        <el-collapse @change="searchLog" :accordion="true">
          <el-collapse-item v-for="(item,index) in logs" :key="index" :title="item.courierCompanyName+item.courierNo" :name="index">
            <el-steps
              direction="vertical"
              finish-status="success"
            >
              <el-step
                :active="item.LogisticsList.length"
                :title="v.AcceptStation"
                :description="v.AcceptTime"
                v-for="(v,k) in item.LogisticsList"
                :key="k"
              >
              </el-step>
			</el-steps>
          </el-collapse-item>
        </el-collapse>

        <div style="display: flex;min-height: 400px;max-height: 400px;" v-if="logs.length == 0">
          <div class="no-more" style="margin: auto;">暂无物流信息</div>
        </div>
      </div>
    </el-dialog>
<!--    取消原因-->
    <el-dialog
      title="取消订单"
      :visible.sync="cancelOrderDialogVisible"
      width="30%"
     >
      <div  v-for="(item,index) in cancelOrderReasonData" :key="index">
         <el-radio v-model="cancelOrderReason" size="medium" :label="item.code">{{item.name}}</el-radio>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="cancelOrderDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureCancel">确 定</el-button>
  </span>
    </el-dialog>


    <!-- 查看订单 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="50%">
      <div
        style="min-height: 200px;max-height: 500px;overflow: auto;"
        v-loading="loadingGoods"
        element-loading-text="查询中..."
      >
        <div class="address">收货人：{{detailData.receivor}}</div>
        <div class="address">联系方式：{{detailData.receivorTelNo}}</div>
        <div class="address">收货地址：{{detailData.receivorAddress}}</div>
        <div class="address">
          配送费用：
          <span v-if="detailData.postagePrice != 0">￥{{detailData.postagePrice}}元</span>
          <span v-else>
            <el-tag type="success" size="small">免邮</el-tag>
          </span>
        </div>
        <div class="table" v-if="detailData.isBuy==1">
          <div class="title-box">
            <div class="t-item">型号</div>
            <div class="t-item">品牌</div>
            <div class="t-item">类别</div>
            <div class="t-item">规格</div>
            <div class="t-item">交货日期</div>
            <div class="t-item">数量</div>
            <div class="t-item">单价</div>
            <div class="t-item">预付金额</div>
            <div class="t-item">总额</div>
          </div>
          <div class="content-box" v-for="(v,k) in detailData.omcOrderGoodsVos" :key="k">
            <div class="c-item">{{v.goodsJson.materialsName}}</div>
            <div class="c-item">{{v.goodsJson.field1}}</div>
            <div class="c-item">{{v.goodsJson.materialsCategoryName}}</div>
            <div class="c-item">{{v.goodsJson.materialsSpec}}</div>
            <div class="c-item">{{v.goodsJson.deliveryTime | timeFormat('yyyy-mm-dd')}}</div>
            <div class="c-item">{{detailData.totalNum}}</div>
            <div class="c-item">￥{{v.unitPrice}}</div>
            <div class="c-item">￥{{detailData.perPay}}</div>
            <div class="c-item">￥{{detailData.totalPrice}}</div>
          </div>
        </div>
        <div class="table" v-else-if="detailData.isBuy==0">
          <div class="title-box">
            <div class="t-item">商品名称</div>
            <div class="t-item">数量</div>
            <div class="t-item">价格</div>
            <div class="t-item">总额</div>
          </div>
          <div class="content-box" v-for="(v,k) in detailData.omcOrderGoodsVos" :key="k">
            <div class="c-item">{{v.goodsJson.materialsName}}<span style="color:green;margin-left: 5px" v-if="v.goodsJson.isFree == 0">(免费送 {{v.goodsJson.freeNum}} 件)</span></div>
            <div class="c-item">{{v.num}}</div>
            <div class="c-item">￥{{v.unitPrice}}</div>
            <div class="c-item">￥{{v.goodsPrice}}</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 申请退款 -->
<!--    <el-dialog title="申请退款信息填写" :visible.sync="refundVisible" width="720px">-->
<!--      <div style="min-height: 300px;max-height: 300px;overflow: auto;display: flex;">-->
<!--        <el-form-->
<!--          :model="ruleForm"-->
<!--          :rules="rules"-->
<!--          ref="ruleForm"-->
<!--          label-width="100px"-->
<!--          class="demo-ruleForm"-->
<!--          style="margin: auto;"-->
<!--        >-->
<!--          <el-form-item label="物流公司" prop="refundExpId">-->
<!--            <el-select-->
<!--              clearable-->
<!--              filterable-->
<!--              v-model="ruleForm.refundExpId"-->
<!--              placeholder="请选择物流公司"-->
<!--              style="width: 500px;"-->
<!--            >-->
<!--              <el-option :label="v.name" :value="v.id" v-for="(v,k) in refundExpList" :key="k"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="物流单号" prop="refundExpNo">-->
<!--            <el-input-->
<!--              v-model="ruleForm.refundExpNo"-->
<!--              style="width: 500px !important;"-->
<!--              placeholder="请输入物流单号"-->
<!--            ></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button @click="resetForm('ruleForm')">取消申请</el-button>&nbsp;-->
<!--            <el-button type="primary" @click="submitForm('ruleForm')">提交申请</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </el-dialog>-->

    <!-- 分页 -->
    <div class="dividePageBar">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                logs:[],
                cancelOrderReason:null,
                tableData: [],
                KeyWord: "",
                buyTime1: "",
                cancelOrderDialogVisible:false,
                cancelOrderReasonData:[
                    {name:'我不想买了',code:1},
                    {name:'收货地址填错，重新拍',code:2},
                    {name:'卖家缺货',code:3},
                    {name:'同城见面交易',code:4},
                    {name:'其他原因',code:5},
                ],
                payStatusOptions: [
                    {value: "-1", label: "已取消"},
                    {value: "0", label: "待付款"},
                    {value: "1", label: "待发货"},
                    {value: "2", label: "待收货"},
                    {value: "3", label: "已完成"},
                    // { value: "4", label: "已发货" },
                    // { value: "5", label: "已收货" },
                    // // { value: "6", label: "拒绝退货" },
                    // // { value: "7", label: "交易" },
                    // { value: "8", label: "待审核" }
                ],
                orderStatus: "",
                payStatus: "",
                currentPage: 0, //当前页面
                payOrderList: [],
                tableParam: {
                    pageNum: 1,
                    pageSize: 10
                },
                total: 0,
                dialogVisible: false,
                goodsOrderList: {},
                searchLoading: false,
                isSearch: false,
                expressVisible: false,
                expressList: [],
                logisticsData:[],
                expressSteps: null,
                expressTxt: {},
                refundVisible: false,
                ruleFormCellRowId: "",
                ruleForm: {
                    refundExpId: "",
                    refundExpNo: ""
                },
                rules: {
                    refundExpId: [
                        {required: true, message: "请选择物流公司", trigger: "blur"}
                    ],
                    refundExpNo: [
                        {required: true, message: "请输入物流单号", trigger: "blur"},
                        {max: 25, message: "长度在 25 个字符之内", trigger: "blur"}
                    ]
                },
                cancelOrderId:0,
                detailData:{},
                refundExpList: [],
                loading: false,
                loadingGoods: false,
                addressInfo: {}
            };
        },
        mounted() {
            // this.getExpComList();
            if (this.$route.query.type && this.$route.query.type !== "normal") {
                this.payStatus = this.$route.query.type;
                this.onSearch();
            } else {
                this.findOrderPage2User(this.tableParam);
            }
        },
        methods: {
            searchLog(index){
                let item=this.logs[parseInt(index)]
                if(!item||item.length<1){
                    return
                }
                let params = {
                    courierCompanyCode:item.courierCompanyCode,
                    courierNo:item.courierNo,
                    id:item.id
                }
                let arr = JSON.parse(JSON.stringify(this.logs))
                arr[index].expand = !arr[index].expand
                this.log = arr
                //if(this.logs[index].expand){
                    this.$http.post('/api-user/app/order/orderLogistics',params).then(res=>{
                        let trace = JSON.parse(res.data.datas.logisticsInfo).Traces
                        let temArr = JSON.parse(JSON.stringify(this.log))
                        temArr[index].LogisticsList = trace
                        this.logs = temArr
                        console.log(this.logs)
                    }).catch((err)=>{

                    })
               // }
                // if(this.log[index].expand){

                // }else{
                //     console.log("不请求")
                // }
                // console.log(this.log)
            },
            sureCancel(){
                //console.log("确认取消")
                // this.$emit('close')
                this.$http.post('/api-user/app/order/orderCancel',{id:this.cancelOrderId}).then(res=>{
                    //console.log(res)
                    if(res.data.resp_code === 0){
                        this.$message({
                            message: res.data.resp_msg,
                            type: "success"
                        });
                        this.onSearch();
                    }else{
                        this.$message({
                            message: res.data.resp_msg,
                            type: "warning"
                        });
                    }
                    this.cancelOrderDialogVisible=false
                    //this.showCancelFile = false
                }).catch((err)=>{
                    this.showCancelFile = false
                })
            },
            // 物流公司
            // getExpComList() {
            //     this.$http.get("/pc/expCom/getExpComList").then(res => {
            //         this.refundExpList = res.data;
            //     });
            // },

            // 申请退款确认
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let param = {
                            id: this.ruleFormCellRowId,
                            refundExpId: this.ruleForm.refundExpId,
                            refundExpNo: this.ruleForm.refundExpNo
                        };
                        this.$http
                            .post("/pc/goodsOrder/applyRefund", {...param})
                            .then(res => {
                                this.$http.judgeIfLogin(res, this);
                                if (res.data.data.code == 1) {
                                    this.$message.success(res.data.data.msg);
                                    this.findOrderPage2User(this.tableParam);
                                    this.refundVisible = false;
                                    tthis.ruleForm.refundExpId = "";
                                    tthis.ruleForm.refundExpNo = "";
                                } else {
                                    this.$message.error(res.data.data.msg);
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },

            // 申请退款取消
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.refundVisible = false;
            },

            // 申请退款弹窗
            onRefundMoney(id) {
                this.refundVisible = true;
                this.ruleFormCellRowId = id;
            },

            // 确认收货
            onConfirmReceive(record) {
                this.$confirm("您是否确认收到货物？", "收货确认", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$http.post('/api-user/app/order/orderConfirm',{id:record.id}).then(res=>{
                            console.log(res)
                            if(res.data.resp_code == 0){
                                this.$message.success("确认收货成功");
                                if(record.isBuy==1&&record.finalPayType==0){
                                    this.$confirm("您有尾款未支付,是否前往支付？", "支付尾款提醒", {
                                        confirmButtonText: "是",
                                        cancelButtonText: "否",
                                        type: "warning"
                                    }).then(() => {
                                        sessionStorage.setItem("spellDetail", JSON.stringify(record))
                                        this.$router.push({path: '/purchasemyDetail'})
                                    }).catch(() => {
                                        this.findOrderPage2User(this.tableParam)
                                    })
                                }else {
                                    this.findOrderPage2User(this.tableParam)
                                }

                            }else{
                                this.$toast(res.data.resp_msg)
                            }
                        })
                    })
                    .catch(() => {

                    })



                // this.reconfirmation(
                //     "确认收货",
                //     `/pc/goodsOrder/confirmReceive/${orderId}`
                // );
            },

            // 查看物流信息
            onSeeExpress(orderId) {
                this.loading = true;
                this.expressVisible = true;
                this.$http.post(`/api-user/app/order/orderDetail/`+orderId).then(res=>{
                    console.log(res)
                    this.logisticsData=res.data.datas
                    // this.msg =
                    // this.addr = {receivorAddress:res.data.datas.receivorAddress}
                    this.logs = res.data.datas.omcOrderLogisticsVos
                    this.loading = false;
                }).catch((err)=>{
                    this.loading = false;
                    console.log(err)
                })
                //
                // this.$http.post(`/express/getExpressInfo/${orderId}`).then(res => {
                //     this.expressTxt = res.data.data;
                //     this.loading = false;
                //     if (res.data.data.code == 1) {
                //         this.expressList = res.data.data.Traces.reverse();
                //         if (res.data.data.State == "3") {
                //             this.expressSteps = res.data.data.Traces.length;
                //         } else {
                //             this.expressSteps = null;
                //         }
                //     }
                // });
            },

            // 取消订单
            onCancelOrder(orderId) {
                this.cancelOrderId=orderId
                this.reconfirmation("取消订单");
            },

            // 取消订单/确认收货二次确认
            reconfirmation(txt, requestUrl) {
                this.$confirm(`此操作将${txt}, 是否继续?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.cancelOrderDialogVisible=true
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消操作"
                        });
                    });
            },

            // 支付状态
            isTagType(status) {
                let color = "";
                switch (status) {
                    case -1:
                        color = "danger";
                        break;
                    case 0:
                        color = "success";
                        break;
                    case 1:
                        color = "info";
                        break;
                    case 2:
                        color = "info";
                        break;
                    case 3:
                        color = "info";
                        break;
                    // case 5:
                    //     color = "danger";
                    //     break;
                    default:
                        color = "warning";
                        break;
                }
                return color;
            },

            // 搜索
            onSearch() {
                if (
                    this.buyTime1 == null ||
                    this.buyTime1 == "" ||
                    this.buyTime1 == undefined
                ) {
                    this.buyTime1 = ["", ""];
                } else {
                    this.buyTime1 = this.buyTime1;
                }
                let param = {
                    orderNo: this.KeyWord,
                    status: this.payStatus,
                    createdTimeFrom: this.buyTime1[0],
                    createdTimeTo: this.buyTime1[1],
                    pageNum: 1,
                    pageSize: 10
                };
                this.findOrderPage2User(param);
                this.isSearch = true;
            },

            // 查看已购买商品详情（查看订单）
            onSeeOrderInfo(orderId) {
                this.loadingGoods = true;
                this.dialogVisible = true;
                this.$http.post(`/api-user/app/order/orderDetail/`+orderId).then(res=>{
                    this.loadingGoods = false;
                    //console.log(res)
                    this.detailData = res.data.datas
                    this.detailData.omcOrderGoodsVos.forEach((item)=>{
                        item.goodsJson=JSON.parse(item.goodsJson)
                    })
                }).catch((err)=>{
                    this.loadingGoods = false;
                    //console.log(err)
                })

                // this.$http
                //     .post(`/pc/goodsOrder/findGoodsOrderInfo/${orderId}`)
                //     .then(res => {
                //         this.loadingGoods = false;
                //         this.goodsOrderList = res.data.data;
                //         this.addressInfo = res.data.data.orderDetail;
                //     });
            },



            // 订单列表
            findOrderPage2User(param) {
                console.log(param);
                this.searchLoading = true;
                this.$http.post(`api-user/app/order/orderList`, {...param}).then((res) => {
                    this.tableData = res.data.data
                    this.total = res.data.count
                    this.searchLoading=false
                }).catch(()=>{
                    this.searchLoading=false
                })
                //
                // this.$http
                //   .post("/pc/goodsOrder/findOrderPage2User", { ...param })
                //   .then(res => {
                //     this.searchLoading = false;
                //     if (res.data.data.code == 0) {
                //       this.$message.error({
                //         message: res.data.data.msg,
                //         duration: 0,
                //         showClose: true
                //       });
                //     } else {
                //       this.tableData = res.data.data.msg.records;
                //       this.total = res.data.data.msg.total;
                //     }
                //   })
                //   .catch(err => {
                //     this.searchLoading = false;
                //     //console.log(err);
                //   });
            },

            // 分页
            handleSizeChange(val) {
                this.tableParam.pageSize = val;
                this.tableParam.status = this.payStatus,
                    this.tableParam.orderNo = this.KeyWord,
                    this.tableParam.createdTimeFrom = this.buyTime1[0],
                    this.tableParam.createdTimeTo = this.buyTime1[1],
                    this.findOrderPage2User(this.tableParam);
            },
            handleCurrentChange(val) {
                this.tableParam.pageNum = val;
                this.tableParam.status = this.payStatus,
                    this.tableParam.orderNo = this.KeyWord,
                    this.tableParam.createdTimeFrom = this.buyTime1[0],
                    this.tableParam.createdTimeTo = this.buyTime1[1],
                    this.findOrderPage2User(this.tableParam);
            }
        },
        filters: {
            isStatus(type) {
                let txt = "";
                switch (Number.parseInt(type)) {
                    case -1:
                        txt = "已取消"
                        break;
                    case 0:
                        txt = "待付款";
                        break;
                    // case 1:
                    //   txt = "付款成功";
                    //   break;
                    // case 2:
                    //   txt = "退货中";
                    //   break;
                    // case 3:
                    //   txt = "退货成功 ";
                    //   break;
                    case 1:
                        txt = "待发货";
                        break;
                    case 2:
                        txt = "待收货";
                        break;
                    case 3:
                        txt = "已完成";
                        break;
                    // case 7:
                    //   txt = "交易";
                    //   break;
                    // case 8:
                    //   txt = "待审核";
                    //   break;
                }
                return txt;
            },
            isPayType(type) {
                let txt = "";
                switch (Number.parseInt(type)) {
                    case 0:
                        txt = "微信";
                        break;
                    case 1:
                        txt = "支付宝";
                        break;
                    case 2:
                        txt = "银联";
                        break;
                }
                return txt;
            }
        }
    };
</script>

<style lang="scss" scoped>
  //框架样式的重置
  .orderManagement {
    display: flex;
    flex-direction: column;
    font-size: 14px;

    .advancedFilterBar {
      display: flex;
      margin-top: 20px;

      .buyTime {
        margin-right: 15px;

        .el-input {
          width: 200px;
        }
      }

      .payStatus {
        margin-left: 20px;
      }

      .exportBtn {
        width: 50px;
        height: 25 ppx;
        background: #0094e7;
        color: white;
        margin-left: 20px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
      }
    }

    .o-table {
      margin: 20px 0;

      .no-more {
        padding: 20px 15px;
        margin-top: 20px;
        text-align: center;

        span {
          color: #09f;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .address {
      padding-bottom: 20px;
    }

    .table {
      width: 100%;

      .title-box {
        display: flex;
        justify-content: space-around;
        background: #e3f1fe;

        .t-item {
          height: 40px;
          line-height: 40px;
          text-align: center;
          flex: 1;
        }
      }

      .content-box {
        display: flex;
        justify-content: space-around;

        .c-item {
          height: auto;
          flex: 1;
          border: 1px solid #e8e8e8;
          border-top: none;
          border-right: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 10px 5px;

          &:nth-of-type(5n) {
            border-right: 1px solid #e8e8e8;
          }
        }
      }
    }

    .dividePageBar {
      padding: 0 10px;
      text-align: right;
      box-sizing: border-box;
    }
  }

  .el-input {
    width: 120px !important;
    height: 30px !important;

    .el-input__inner {
      width: 120px !important;
      height: 30px !important;
      line-height: 30px !important;
    }

    .el-icon-time {
      display: none;
    }

    .el-icon-arrow-up {
      line-height: 30px !important;
    }
  }

  .el-table /deep/ th {
    background: #f8f8f8 !important;
    color: #444444;
  }

  .express /deep/ .el-step__head.is-wait {
    color: #444444;
    border-color: #444444;
  }

  .express /deep/ .el-step__title.is-wait {
    color: #444444;
  }

  .express /deep/ .el-step__description.is-wait {
    color: gray;
  }

  .express /deep/ .expressTxt p {
    line-height: 30px;
    color: gray;
  }

  .express /deep/ .expressTxt p span {
    color: #444444;
  }

  .o-table /deep/ .btn-group button {
    margin-bottom: 5px;
    margin-left: 0;
  }

  .o-table /deep/ .btn-group button:last-of-type {
    margin-bottom: 0px;
  }

  /deep/ .el-steps--vertical {
    // height: 800px !important;
  }
</style>
