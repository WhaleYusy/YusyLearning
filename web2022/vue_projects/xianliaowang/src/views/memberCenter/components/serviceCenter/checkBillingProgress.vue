<template>
  <div class="checkBillingProgress">
    <div class="dueDesc">
      <div class="tbTitle">
        <div class="dueTypes">类型</div>
        <div class="project">项目</div>
        <div class="bigBlock">未开增值税专用发票</div>
      </div>
      <div class="tbContent">
        <div class="totalTitle">累积总贷款</div>
        <div class="totalNum">0.00</div>
      </div>
      <div class="dueRuleDesc">
        <div class="ph1">
          <h3>重要事项</h3>
          <p>一、根据国税规定，从2016年1月16日起，闲料网发票开具将作相应调整。</p>
        </div>
        <div class="ph2">
          <div>二、闲料网可以开两种类型的增值税发票：</div>
          <div><span class="h3">1、增值税专用发票</span>，可以抵扣，不能随订单发出：</div>
          <div>具体说明：</div>
          <div>1)<span class="h3">开票时间：</span>1、每月8日至25日统一开出</div>
          <div>2)<span class="h3">开票规则：</span>开票时间内开具开票日期之前所有已发货的订单累计总金额对应的发票（累计超过200元才会开具发票），每月每个客户统一开具一次发票，当月已开票后产生的已发货订单货款金额顺延累计到下个月统一开票。（当月仅有在8-25号发货需开票的订单，顺延至下月开出）</div>
          <div><span style="color:red">注意：</span>闲料网将在每月开票时间内统一开具发票并单独寄出（即发票不能长时间无限制积累再开票）</div>
          <div>3)<span class="h3">发票运费：</span>单独寄出，运费我司付</div>
          <div>4)<span class="h3">其余事项：</span>开票累计总货款金额在200元以下的，本月暂不开出（自动累计到次月超200元再开出，建议您预计长时间发票累计不超过200元时，在下单选择普通发票随货发类型，另需提前开出可联系我司工作人员QQ：4000800709，运费需到付，有特殊情况开票需求的，统一安排在每月25日-27日开出）</div>
          <div><span class="h3">2、增值税普通发票</span>不能抵扣，随订单发出：</div>
          <div>具体说明：普通发票会随您的订单一起发货，绑定一起发货的订单发票统一开在一起，如果有特殊的开票方式（分开开票），请务必在订单中备注。</div>
        </div>
        <div class="ph3">
          <p>三、需要增值税专用发票的客户，除了原有的增值税开票资料外，还需要上传相应的证明文件：加盖公章的 ①一般纳税人资格证书或认定文件复印件 ②税务登记证副本复印件【三证合一的公司请提供营业执照复印件，正副本均可】</p>
        </div>
      </div>
    </div>

    <h3 class="blockTitle">增票订单</h3>
    <div class="searchBar">
      <select>
        <option value="all">显示全部的订单</option>
        <option value="hasDeal">已处理</option>
        <option value="noDeal">未处理</option>
      </select>
      <select>
        <option value="all">显示全部的订单</option>
        <option value="all">增值税专用发票</option>
      </select>
      <span>订单号：</span><input type="number"/>
      <span class="searchBtn">查询</span>
      <span class="billAgain" @click="showBillF">重新开票</span>
      <span class="exportBill" @click="showBillF">导出开票明细</span>
    </div>
    <div class="buyTime">
      <span>开票时间：</span>
      <el-date-picker
        v-model="BillTime1"
        type="datetime">
      </el-date-picker>
      <span style="margin:0 5px;">至</span>
      <el-date-picker
        v-model="BillTime2"
        type="datetime">
      </el-date-picker>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="orderNo" align="center"
        label="订单编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="payTime" align="center"
        label="下单时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="mount" align="center"
        label="开票金额"
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="type" align="center"
        label="开票类型"
        width="100"
       >
      </el-table-column>
      <el-table-column
        prop="isBill" align="center"
        label="是否已开票"
        width="100"
       >
      </el-table-column>
      <el-table-column
        prop="Billtime" align="center"
        label="开票时间"
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="postType" align="center"
        label="快递方式/快递单号"
        >
      </el-table-column>
    </el-table>
    <div class="dividePageBar">
       <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20,50,100]"
        :page-size="100"
        layout="sizes, prev, pager, next, jumper"
        :total="0">
      </el-pagination>
    </div>
    <!-- 弹出 -->
    <div class="enshrineFail" v-if="ifShowBillF" >
      <div class="enshrineFailToast" >
        <div class="title">
          <h3>失败提示</h3>
          <span class="cancel" @click="hideShowBillF">x</span>
        </div>
        <div class="content">
          <div class="leftLogo">图标</div>
          <div class="rightText">
            <div class="rightTextInfo">请先选择</div>
            <div class="ensureBtn" @click="ensureBillF">确定</div>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      ifShowBillF:false,
      BillTime1:'',
      BillTime2:'',
      tableData2:[],
      tableData:[
        { orderNo:'1111',  payTime:'2019-02-22', mount:'￥1233',type:'差旅',isBill:'是',Billtime:'2019-02-23', postType:'顺丰'}
      ],
      currentPage:1,
    }
  },
  methods:{
    handleCurrentChange(){
      
    },
    handleSizeChange(){

    },
    showBillF(){
      this.ifShowBillF = true
    },
    hideShowBillF(){
      this.ifShowBillF = false
    },
    ensureBillF(){
      this.ifShowBillF = false
    },
  }
}
</script>

<style lang="scss">
.checkBillingProgress{
  .dueDesc{
    width:100%;
    display:flex;
    flex-direction: column;
    border:1px solid rgb(240,240,240);
    box-sizing: border-box;
    margin-bottom:20px;
    margin-top:20px;
    .tbTitle{
      width:100%;
      height:80px;
      display:flex;
      align-items:center;
      font-size:14px;
      font-weight:bold;
      border:1px solid rgb(235,235,235);
      box-sizing: border-box;
      background:rgb(240,240,240);
      .dueTypes{
        width:20%;
        line-height:80px;
        text-align: center;
      }
      .project{
        width:20%;
        text-align: center;
        line-height:80px;
      }
      .bigBlock{
        width:60%;
        line-height:80px;
        text-align: center;
        border-left:1px solid rgb(220,220,220);
      }
    }
    .tbContent{
      display:flex;
      height:40px;
      font-size:14px;
      border-bottom:1px solid rgb(220,220,220);
      
      .totalTitle{
        width:40%;
        line-height:40px;
        text-align:center;
      }
      .totalNum{
        width:60%;
        line-height:40px;
        text-align:center;
        border-left:1px solid rgb(220,220,220);
        box-sizing: border-box;
      }
    }
    .dueRuleDesc{
      padding:20px;
      box-sizing: border-box;
      line-height:20px;
      .ph1{
        margin-bottom:22px;
        p{
          display:flex;
        }
      }
      .ph2{
        margin-bottom:20px;
        
        div{
        }
        .h3{
          font-weight:bold;
        }
      }
    }
  }
  .blockTitle{
    padding:0 20px;
    height:50px;
    line-height:50px;
    border:1px solid rgb(235,235,235);
    box-sizing: border-box;
    background:rgb(240,240,240);
  }
  .searchBar{
    width:100%;
    height:50px;
    line-height:50px;
    select{
      margin-right:20px;
      height:25px;
    }
    input{
      width:80px;
      height:25px;
      margin-right:20px;
      border:1px solid rgb(230,230,230);
    }
    .searchBtn,.billAgain,.exportBill{
      padding:5px 10px;
      background:#0094e7;
      color:white;
      margin-right:20px;
      border-radius:2px;
      cursor: pointer;
    }
  }
  .buyTime{
    margin-bottom:20px;
  }
  .enshrineFail{
    z-index:3000;
    background:rgba(0,0,0,0.4);
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    border:none;
    .enshrineFailToast{
      width:490px;
      height:180px;
      border:3px solid lightgray;
      .title{
        width:100%;
        height:30px;
        font-size:16px;
        background:rgb(240,240,240);
        padding:0 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items:center;
        .cancel{
          cursor: pointer;
        }
        .cancel:hover{
          color:#0094e7;
        }
      }
      .content{
        width:100%;
        height:150px;
        display:flex;
        justify-content: space-around;
        background:white;
        .leftLogo{
          width:60px;
          height:60px;
          text-align:center;
          border-radius:50%;
          background:orangered;
          padding:20px;
          margin-top:20px;
          box-sizing: border-box;
        }
        .rightText{
          width:300px;
          text-align:left;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
          // align-items: center;
          margin-top:20px;
          margin-bottom:20px;
          .rightTextInfo{
            font-size:16px;
            color:orangered;
          }
          // .checkHasEnshrine{
          //   cursor: pointer;
          // }
          // .checkHasEnshrine:hover{
          //   color:#0094e7;
          // }
          .ensureBtn{
            width:92px;
            height:33px;
            text-align:center;
            line-height:33px;
            color:white;
            background:#0094e7;
            cursor: pointer;
          }
        }
      }
    }
  }
 .dividePageBar{
   margin-top:20px;
    padding:0 10px;
    text-align:right;
    box-sizing: border-box;
  }
}
</style>
