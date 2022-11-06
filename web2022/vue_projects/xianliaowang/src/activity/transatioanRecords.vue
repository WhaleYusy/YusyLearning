<template>
    <div class="transatioanRecords">
      <div class="title">
        <div class="titleItem">成交记录</div>
      </div>
      <div class="foreWord">
        <!-- 前言 -->
        <div class="leftLogo">
          <span class="timeTag">近一个月</span>
          <span class="littleTitle">成交记录</span>
        </div>
        <div class="rightWord">
          <h2 class="rightWordTitle">前言：</h2>
          <p class="rightWordContent">
            闲料商城（www.yworth.com.cn），致力于为客户提供一站式电子元器件线上采购服务。 我们这里全部是真实库存、现货销售。我们一直在持续扩充我们的库存和完善我们的服务，也十分感谢客户对我们的关注和监督。
          </p>
        </div>
      </div>
      <!-- 表格内容 -->
      <el-table :data="tableData" style="width: 100%;" border>
        <template slot="empty">
          <div class="no-more">
            <p v-if="isSearch == false">
              糟糕，没有订单信息！
              <span @click="$router.push('/home/outLandDemo')">快去逛逛吧</span>
            </p>
            <p v-else>糟糕，没有订单信息！</p>
          </div>
        </template>
        <el-table-column prop="userPhone" label="客户" width="150" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="订单编号" align="center" ></el-table-column>
        <el-table-column prop="createdTime" label="下单日期" align="center" ></el-table-column>
        <el-table-column prop="endPayMoney" label="金额" align="center" ></el-table-column>
        <el-table-column prop="status" label="订单状态" align="center" ></el-table-column>
      </el-table>
        <div class="dividePageBar">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[20,30]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isSearch:false,
      transationRecords:[
        {custm:"张**",orderNo:'2425235325235',orderTime:'2019-08-20 14:20:20',payCondition:['￥94.2','未付'],orderStatus:'商城处理中',postTime:'--'},
      ],
      tableData:[],
      pageSize:20,
      pageNum:1,
      total:0
    }
  },
  mounted(){
    this.getTransationRecords()
  },
  methods:{
    handleSizeChange(val){
      this.pageSize = val;
      this.getTransationRecords()
    },
    handleCurrentChange(val){
      this.pageNum = val
      this.getTransationRecords()
    },
    getTransationRecords(){
      this.$http.post('/pc/goodsOrder/getOrdersOnMonth',{pageSize:this.pageSize,pageNum:this.pageNum}).then(res=>{
        console.log(res)
        this.total = res.data.data.orders.total
        this.tableData = res.data.data.orders.records
        for(let i = 0 ;i<this.tableData.length;i++){
          this.tableData[i].userPhone = this.tableData[i].userPhone.slice(0,3)+'****'+this.tableData[i].userPhone.slice(7)
          this.tableData[i].orderNo = this.tableData[i].orderNo.slice(0,8)+'********'+this.tableData[i].orderNo.slice(16)
          this.tableData[i].status = this.tableData[i].status == 1 ? '付款成功' : ''
        }
      }).catch(res=>{console.log(res)})
    }
  }
}
</script>
<style lang="scss" scoped>
  .transatioanRecords{
    width:1200px;
    margin:0 auto;
    // padding:15px 0;
    box-sizing: border-box;
    .title{
      width:1200px;
      height:50px;
      display:flex;
      align-items: center;
      border-bottom:1px solid #0094e7;
      .titleItem{
        min-width:100px;
        text-align:center;
        height:100%;
        box-sizing: border-box;
        display:flex;
        justify-content: center;
        align-items: center;
        font-size:16px;
        border-right:1px solid lightgray;
        // border-left:1px solid lightgray;
      }
    }
    .foreWord{
      display:flex;
      justify-content: space-between;
      align-items: center;
      padding:15px;
      box-sizing: border-box;
      .leftLogo{
        width:100px;
        height:100px;
        border-radius:50%;
        border:2px dashed orange;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .timeTag{
          font-size:20px;
          font-weight:bold;
          color:orange;
        }
        .littleTitle{
          color:#666666;
          margin-top:10px;
        }
      }
      .rightWord{
        width:1000px;
        // margin-left:20px;
        line-height:20px;
        .rightWordContent{
          text-indent: 2rem;
          font-size:14px;
        }
      }
    }
    .dividePageBar{
      text-align: right;
      margin:15px 0;
    }
  }
</style>