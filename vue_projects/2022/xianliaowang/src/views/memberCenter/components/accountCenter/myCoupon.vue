<template>
  <div class="myCoupon_box">
    <div class="myCoupon_top_tips">优惠券状态：<el-select v-model="region" size="mini" style="width:120px;" placeholder="优惠券状态">
      <el-option label="未使用" value="shanghai"></el-option>
      <el-option label="已使用" value="beijing"></el-option>
      <el-option label="已过期" value="beijing2"></el-option>
      <el-option label="全部" value="beijing1"></el-option>
    </el-select>
    <el-button size="mini" style="margin-left:10px;">查询</el-button>
    </div>
    <div class="myCoupon_top_list">
      <ul>
        <li class="list_item" v-for="(t,i) in listData" :key="i">
          <p>{{t.name1}}</p>
          <p>{{t.name2}}</p>
          <p>有效期：{{t.name3}}</p>
          <p>{{t.name4}}</p>
          <p>{{t.name5}}</p>
          <button class="shop_btn">立即选购</button>
        </li>
      </ul>
    </div>
    <div class="pagination_box">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      region:'',
      currentPage4: 4,
      listData:[
        {name1:'15',name2:'15元博穆精密品牌优惠券',name3:'2019-06-01 - 2019-06-30',name4:'19年6月份品牌优惠券',name5:'使用金额不限'},
        {name1:'15',name2:'15元博穆精密品牌优惠券',name3:'2019-06-01 - 2019-06-30',name4:'19年6月份品牌优惠券',name5:'使用金额不限'},
        {name1:'15',name2:'15元博穆精密品牌优惠券',name3:'2019-06-01 - 2019-06-30',name4:'19年6月份品牌优惠券',name5:'使用金额不限'},
        {name1:'15',name2:'15元博穆精密品牌优惠券',name3:'2019-06-01 - 2019-06-30',name4:'19年6月份品牌优惠券',name5:'使用金额不限'},
        {name1:'15',name2:'15元博穆精密品牌优惠券',name3:'2019-06-01 - 2019-06-30',name4:'19年6月份品牌优惠券',name5:'使用金额不限'},
        {name1:'15',name2:'15元博穆精密品牌优惠券',name3:'2019-06-01 - 2019-06-30',name4:'19年6月份品牌优惠券',name5:'使用金额不限'},
        {name1:'15',name2:'15元博穆精密品牌优惠券',name3:'2019-06-01 - 2019-06-30',name4:'19年6月份品牌优惠券',name5:'使用金额不限'}
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
       //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       //console.log(`当前页: ${val}`);
    }
  },
}
</script>

<style lang="scss" scoped>
.myCoupon_box{
  width: 100%;
  .myCoupon_top_tips{
    margin-top: 10px;
  }
  .myCoupon_top_list{
    width: 100%;
    margin-top: 30px;
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .list_item{
        width: 230px;
        height: 331px;
        margin-right: 10px;
        margin-bottom: 20px;
        background: url('../../../../assets/quan.gif') repeat-x;
        text-align: center;
        p:nth-of-type(1){
          font-size: 70px;
          color: white;
          margin-top: 30px;
          font-weight: bold;
        }
        p:nth-of-type(2){
          font-size: 15px;
          color: white;
        }
        p:nth-of-type(3){
          font-size: 13px;
          margin-top: 50px;
          color: #666666;
        }
        p:nth-of-type(4){
          font-size: 13px;
          margin-top: 25px;
          color: #666666;
        }
        p:nth-of-type(5){
          font-size: 13px;
          margin-top: 10px;
          color: #666666;
        }
        .shop_btn{
          width: 100px;
          height: 30px;
          margin-top: 25px;
          border-radius: 30px;
          outline: none;
          background: none;
          border: 1px solid #70C2F1;
          color: #70C2F1;
        }
      }
    }
  }
  .pagination_box{
    width: 100%;
    text-align: center;
  }
}
</style>

