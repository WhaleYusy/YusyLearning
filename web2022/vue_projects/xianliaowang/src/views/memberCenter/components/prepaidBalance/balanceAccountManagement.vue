<template>
  <div class="balanceAccountManagement">
    <div class="top">
      <div class="left">
        <h1>预付余额</h1>
        <div class="num">￥0.00</div>
        <span class="setLiveBtn">激活</span>
      </div>
      <div class='right'>
        <p><span class="grayWord">账户状态：</span>启用</p>
        <p><span class="grayWord">充值提醒：</span><span class="goldWord">设置充值提醒</span><i class="	fa fa-bell"></i></p>
        <p><span class="grayWord">余额转出账户：</span><span class="grayWord">请完善转出账户信息</span><i class="goldWord fa fa-edit	"></i></p>
        <p><span class="grayWord">补单自动付款：</span><input type="text" disabled />
          <i class="wenhao goldWord 	fa fa-question-circle-o"></i><i class="edit goldWord fa fa-edit	"></i>
        </p>
      </div>
    </div>
    <div class="bottom">
      <h1>交易记录</h1>
      <div class="searchBar">
        <span>类型：</span>
        <select class="type">
          <option value="充值">充值</option>
          <option value="订单结算">订单结算</option>
          <option value="退款">退款</option>
        </select>
        <span>操作时间</span>
        <div class="opTime">
          <el-date-picker
            v-model="opTime1"
            type="datetime">
          </el-date-picker>
          <span style="margin:0 5px;">至</span>
          <el-date-picker
            v-model="opTime2"
            type="datetime">
          </el-date-picker>
        </div>
        <span class="search">查询</span>
      </div>
      <!-- 渲染数据 -->
      <table>
        <tr>
          <th style="width:250px;">交易时间</th>
          <th>类型</th>
          <th>金额</th>
          <th>账户余额</th>
          <th>备注</th>
        </tr>
      </table>
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      opTime1:'',
      opTime2:'',
      currentPage:1,
    }
  },
  methods:{
     handleCurrentChange(){
      
    },
    handleSizeChange(){

    },
  }
}
</script>

<style lang="scss">
  .balanceAccountManagement{
    width:100%;
    min-height:100px;
    border:1px solid lightgray;
    display:flex;
    flex-direction:column;
    padding:20px;
    box-sizing: border-box;
    .top{
      display:flex;
      justify-content: space-between;
      .left{
        line-height:50px;
        .num{
          font-size:36px;
          font-weight:bold;
          color:orange;
        }
        .setLiveBtn{
          padding:10px 30px;
          color:white;
          font-size:16px;
          cursor: pointer;
          background:orange;
        }
      }
      .right{
        width:400px;
        line-height:25px;
        padding:20px;
        box-sizing: border-box;
        box-shadow:  0 0 10px rgb(240,240,240);
        margin-right:100px;
        border-radius:5px;
        .grayWord{
          color:gray;
        }
        .goldWord{
          color:orange;
        }
        .fa-bell{
          font-size:16px;
          color:orange;
          margin-left:5px;
        }
        .edit{
          font-size:16px;
          margin-left:5px;
        }
        .fa-edit,.fa-question-circle-o,.fa-bell{
          font-size:16px;
          margin-left:5px;
          cursor: pointer;
        }
      }
    }
    .bottom{
      margin-top:20px;
    }
    .searchBar{
      display:flex;
      align-items: center;
      height:50px;
      line-height:50px;
      select{
        height:30px;
        margin-right:20px;
      }
      .search{
        padding:0 20px;
        height:30px;
        line-height:30px;
        font-size:14px;
        color:white;
        background:#0094e7;
        margin-left:10px;
        cursor: pointer;
      }
    }
    table{
      width:100%;
      margin-top:20px;
      margin-right:20px;
      tr{
        padding-bottom:5px;
        border-bottom:1px solid rgb(240,240,240);
        th{
          padding:5px;
          box-sizing: border-box;
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
