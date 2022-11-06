<template>
  <div class="purchaseHistory_box">
    <div class="myCoupon_top_tips">
      商品类别：
      <el-select v-model="region" size="mini" style="width:100px;" placeholder="全部类别">
        <el-option label="未使用" value="shanghai"></el-option>
        <el-option label="已使用" value="beijing"></el-option>
        <el-option label="已过期" value="beijing2"></el-option>
        <el-option label="全部" value="beijing1"></el-option>
      </el-select>&nbsp;&nbsp;&nbsp;&nbsp;商品编号：
      <el-input v-model="region" size="mini" style="width:90px;"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;关键字：
      <el-input v-model="region" size="mini" style="width:90px;"></el-input>
      <span style="margin-left:20px;">时间：</span>
      <el-date-picker
        size="mini"
        v-model="value6"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button size="mini" style="margin-left:10px;" type="primary">查询</el-button>
    </div>
    <!-- <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
      <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
      <el-table-column prop="address" align="center" label="BOM名称"></el-table-column>
      <el-table-column prop="date" align="center" label="创建时间" width="200"></el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <p class="operation">
            <el-button type="text" size="small">智能配单</el-button>
            <el-button type="text" size="small">创建副本</el-button>
            <el-button type="text" icon="el-icon-delete" size="small">删除</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>-->

    <div class="o-table">
      <el-table :data="tableData" style="width: 100%" border>
        <template slot="empty">
          <div class="no-more">
            <p>
              糟糕，没有购买历史！
              <span @click="$router.push('/home/outLandDemo')">快去逛逛吧</span>
            </p>
          </div>
        </template>
        <el-table-column prop="goodTitle" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="number" label="商品编号" width="180"></el-table-column>
        <el-table-column prop="model" label="封装规格"></el-table-column>
        <el-table-column prop="specs" label="品牌"></el-table-column>
        <el-table-column prop="brand" label="型号"></el-table-column>
        <el-table-column prop="brand" label="价格">
          <template slot-scope="scope">
            <span style="color: orange;font-weight: bold;">￥{{scope.row.children[0].value}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="支付状态">
          <template slot-scope="scope">
            <span
              :style="{color: scope.row.payType == 0 ? 'red' : 'green'}"
            >{{scope.row.payType == 0 ? '未支付' : '已支付'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              :disabled="scope.row.payType != 0"
              @click="$router.push('/cart/payType')"
            >去支付</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="dividePageBar">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      region: "",
      value6: "",
      tableData: [],
      currentPage: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取模拟的假数据
    getData() {
      if (localStorage.getItem("payOrderList")) {
        this.payOrderList = JSON.parse(localStorage.getItem("payOrderList"));
        let payOrderList = this.payOrderList;
        let arr = [];
         //console.log(payOrderList)
        payOrderList.forEach(ele => {
          ele.goodsData.forEach(elem => {
            elem.uid = ele.id;
            elem.isPay = ele.isPay;
            if(elem.isPay){
              arr.push(elem)
            }
          })          
        });
        this.tableData = arr;      
      }
    },

    handleSizeChange(val) {
       //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       //console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.o-table {
  margin: 30px 0;
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
.dividePageBar {
  padding: 0 10px;
  text-align: right;
  box-sizing: border-box;
}
.purchaseHistory_box {
  margin: 20px 0;
}
.el-table /deep/ th {
  background: #f8f8f8 !important;
  color: #444444;
}
.pagination_box {
  width: 100%;
  text-align: right;
  margin-top: 20px;
}
</style>

