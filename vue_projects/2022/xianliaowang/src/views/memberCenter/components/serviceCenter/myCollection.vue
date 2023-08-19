<template>
  <div class="myCollection_box">
    <div class="myCollection_top">
      <ul>
        <li :class="type == 1 ? 'active' : ''" @click="collectLi(1)">
          <span>闲料</span>
        </li>
        <li :class="type == 2 ? 'active' : ''" @click="collectLi(2)">
          <span>拼单</span>
        </li>
        <li :class="type == 3 ? 'active' : ''" @click="collectLi(3)">
          <span>免费送</span>
        </li>
        <li :class="type == 4 ? 'active' : ''" @click="collectLi(4)">
          <span>爆品商品</span>
        </li>
      </ul>
    </div>
    <!-- <el-checkbox-group v-model="ids" @change="handleCheckedCitiesChange"> -->
    <ul class="myCollection_list" v-if="collectionList.length > 0">
      <li v-for="(val, key) in collectionList" :key="key">
        <input type="checkbox" @change="addCollect(val.id)" ref="checkBox" />
		<template v-if="type != 2">
<!--        <img :src="val.goodMain" alt class="list_img" @click="toInfo(val)" v-if="val.goodMain != null" />-->
        <img :src="val.mdcGoodsCommonVo.mainImage" alt class="list_img" @click="toInfo(val)"  />
		</template>
        <div class="list_middle" @click="toInfo(val)">
          <p class="title">
<!--            {{ val.materiaCode }}-->
            <span class="delay" style="color:lightgray;font-weight:normal;" v-if="val.mdcGoodsCommonVo.isDelete == 1">(该商品已删除)</span>
            <span class="delay" style="color:lightgray;font-weight:normal;" v-else-if="val.mdcGoodsCommonVo.status == 1">(该商品已下架)</span>
            <span class="delay" style="color:lightgray;font-weight:normal;" v-else-if="(type==1||type==2)&&!(((val.mdcGoodsCommonVo.endDay > -1) && ((val.mdcGoodsCommonVo.endDay * 86400000 + val.mdcGoodsCommonVo.publishDate) > new Date().getTime()))||(val.mdcGoodsCommonVo.endDay === -1))">(该商品已过期)</span>
          </p>
          <p>型号：{{ val.mdcGoodsCommonVo.materialsName }}</p>
          <p v-if="type!==1">品牌：{{ val.mdcGoodsCommonVo.brand }}</p>
          <p>数量：{{ val.mdcGoodsCommonVo.quantity }}</p>
          <!-- <p>
            类型： {{val.brand}} /
            <span style="color:#007FD0">{{val.model}} / {{val.specs}}</span>
          </p> -->
<!--          <p class="remarks">-->
<!--            备注信息：{{ val.remarks !== null ? val.remarks : "暂无备注" }}-->
            <!-- <span style="color:#0DA401;cursor:pointer;" @click="toEdit">[编辑]</span> -->
<!--          </p>-->
          <p>{{ val.collectNum }}人收藏</p>
        </div>
        <div class="list_right_middle">
<!--          <div v-for="(v, k) in val.children" :key="k">-->
<!--            {{ v.label }}：-->
          <span v-if="type==1">￥{{ val.mdcGoodsCommonVo.currentPrice }}</span>
          <span v-else-if="type==3">￥{{ val.mdcGoodsCommonVo.price }}</span>
          <span v-else-if="type==4">￥{{ val.mdcGoodsCommonVo.price }}</span>
<!--          </div>-->
        </div>
        <div class="list_btn_line">
          <button @click.stop="onCancel(val, key)">取消收藏</button>
          <!-- <button @click="addToCart(val,1)">加入购物车</button> -->
        </div>
      </li>
    </ul>
    <!-- </el-checkbox-group> -->
    <div class="no-more" v-if="collectionList.length <= 0">
      <div>
        糟糕，没有收藏记录了！
        <span @click="$router.push('/home/outLandDemo')">去逛逛吧</span>
      </div>
    </div>
    <div class="pagenation_line" v-if="collectionList.length > 0">
      <div class="check_all">
        <el-checkbox v-model="checkedAll" @change="checkAll">全选</el-checkbox>
        <button @click="cancelAll">取消收藏</button>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage4: 1,
        checked: false,
        checkedAll: false,
        /**
         * 收藏假数据模拟(2019.07.17)
         */
        collectionList: [],
        ids: [],
        idsName: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        type: 1
      };
    },
    created() {
      this.getFalseCollectionList({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        type: this.type
      });
    },
    mounted() {
      //console.log(this.$refs.checkBox)//$refs.checkBox
    },
    methods: {
      collectLi(type) {
        if (type == this.type) {
          return;
        } else {
            this.cancelCheck()
          this.type = type;
          this.collectionList = [];
          this.getFalseCollectionList({
            pageSize: this.pageSize,
            pageNum: 1,
            type: this.type
          });
        }
      },
      toInfo(val) {
        let id = val.goodsId;
        // 被下架或是被删除,或过期的,都不进详情
        if (val.mdcGoodsCommonVo.status !== 1 && val.mdcGoodsCommonVo.isDelete !== 1) {
          if(val.type == 1 || val.type == 2){
              if(((val.mdcGoodsCommonVo.endDay > -1) && ((val.mdcGoodsCommonVo.endDay * 86400000 + val.mdcGoodsCommonVo.publishDate) > new Date().getTime()))||(val.mdcGoodsCommonVo.endDay === -1)){
                  if(val.type == 1){
                      this.$router.push({
                          path: "/purchaseCommonDetail",
                          query: {
                              id: val.goodsId,
                              type: val.type
                          }
                      });
                  }else if(val.type == 2){
                      this.$router.push({
                          path: "/purchaseDetail",
                          query: {
                              id: val.goodsId,
                              type: val.type
                          }
                      });
                  }

              }
          } else if (val.type == 3 || val.type == 4){
            this.$router.push({
              path: "/xianliaoDetail",
              query: {
                id: val.goodsId,
                type: val.type
              }
            });
          }
        }
      },
      addToCart(data, num) {
        //console.log(data.goodsId,num)
        this.$http
          .post("/pc/cart/addGoods2Cart", {
            goodsId: data.goodsId,
            goodsNum: num
          })
          .then(res => {
            //console.log(res.data.data.code)
            if (res.data.data.code === 1) {
              this.$message.success(res.data.data.msg);
              this.cartDialogVisible = false;
              this.form = {
                num: 0,
                box: 0
              };
            } else {
              this.$message(res.data.data.msg);
              this.cartDialogVisible = false;
            }
          })
          .catch(res => {});
      },
      toEdit() {
        //console.log("toEdit")
      },
      handleCheckedCitiesChange(e) {
        //console.log(e)
      },
        cancelCheck(){
            let checkBoxList = this.$refs.checkBox;
            if(!checkBoxList){
                return
            }
            for (let i = 0; i < checkBoxList.length; i++) {
                this.$refs.checkBox[i].checked = false;
            }
            this.checked=false
            this.checkedAll=false
            this.ids = [];
        },
      checkAll() {
        let checkBoxList = this.$refs.checkBox;
        if (this.ids.length >= this.collectionList.length) {
          this.ids = [];
          for (let i = 0; i < checkBoxList.length; i++) {
            this.$refs.checkBox[i].checked = false;
          }
        } else {
          for (let i = 0; i < this.collectionList.length; i++) {
            this.ids.push(this.collectionList[i].id);
            this.$refs.checkBox[i].checked = true;
          }
        }
        //console.log(this.ids)
      },
      cancelAll() {
        //取消收藏全部或是多条
        //console.log(this.ids)


              let ids = this.ids.join(",");
              if (ids.trim().length > 0) {
                  this.$confirm(`您确定要取消吗?`, '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
                  this.$http
                      .delete("api-user/app/collection/" + ids)
                      .then(res => {
                          if (res.data.resp_code === 0) {
                              this.$message.success("取消收藏成功");
                              this.getFalseCollectionList({
                                  pageSize: this.pageSize,
                                  pageNum: this.pageNum,
                                  type: this.type
                              });
                              ids = "";
                              this.ids = [];
                              this.cancelCheck()
                          } else {
                              this.$message(res.data.data.msg);
                          }
                      })
                      .catch(res => {});
                  })
              } else {
                  this.$message("请选择需要取消收藏的商品");
              }


      },
      addCollect(e) {
        let index = this.ids.indexOf(e);
        if (index !== -1) {
          this.ids.splice(index, 1);
          if (this.ids.length === this.collectionList.length) {
            this.checkedAll = true;
          } else {
            this.checkedAll = false;
          }
        } else {
          this.ids.push(e);
          if (this.ids.length === this.collectionList.length) {
            this.checkedAll = true;
          } else {
            this.checkedAll = false;
          }
        }
        //console.log(this.ids)
      },
      // 获取收藏数据
      getFalseCollectionList(data) {
        this.$http
          .get("/api-user/app/collection", data)
          .then(res => {
            //console.log(res)
            // this.$http.judgeIfLogin(res, this);
            if (res.data.data != null) {
              this.collectionList = res.data.data;
            } else {
              this.collectionList = [];
            }
            this.total = res.data.count;
          })
          .catch(res => {});
        // if (localStorage.getItem("falseCollectionList")) {
        //   this.collectionList = JSON.parse(
        //     localStorage.getItem("falseCollectionList")
        //   );
        //    //console.log(this.collectionList)
        // }
      },

      //取消一条收藏
      onCancel(data, index) {
          this.$confirm(`您确定要取消吗?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              let id = data.id;
              this.$http
                  .delete("api-user/app/collection/" + id)
                  .then(res => {
                      if (res.data.resp_code === 0) {
                          this.$message.success("取消收藏成功");
                          this.getFalseCollectionList({
                              pageSize: this.pageSize,
                              pageNum: this.pageNum,
                              type: this.type
                          });
                          this.cancelCheck()
                      } else {
                          this.$message("取消失败");
                      }
                  })
                  .catch(res => {});
          })

        // this.collectionList.splice(index, 1);
        // localStorage.setItem(
        //   "falseCollectionList",
        //   JSON.stringify(this.collectionList)
        // );
        // this.$notify({
        //   title: "成功",
        //   message: `成功取消对 “${data.goodTitle}” 的收藏`,
        //   type: "success"
        // });
      },

      viewMore() {
        let sty = document.getElementById("transfer").style.transform;
        if (sty === "rotate(180deg)") {
          document.getElementById("transfer").style.transform = "rotate(0deg)";
        } else {
          document.getElementById("transfer").style.transform = "rotate(180deg)";
        }
      },
      handleSizeChange(val) {
        this.pageSize = val;
        let data = {
          pageSize: this.pageSize,
          pageNum: 1,
            type: this.type
        };
        this.getFalseCollectionList(data);

        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        let data = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          type: this.type
        };
        this.getFalseCollectionList(data);
        //console.log(`当前页: ${val}`);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .myCollection_box {
    .myCollection_top {
      width: 960px;
      height: 49px;
      border: 1px solid #e5e5e5;
      border-top: none;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      position: relative;

      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        li {
          width: 25%;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          text-align: center;
		  letter-spacing: 2px;
          span {
            cursor: pointer;
          }

          span:hover {
            color: #70c2f1;
          }
        }

        .active {
          color: #0093e6 !important;
          background: #e1f4ff;
        }
      }
    }

    .more {
      position: absolute;
      right: 20px;
      cursor: pointer;
    }

    .myCollection_list {
      width: 100%;

      li {
        width: 100%;
        height: 160px;
        margin-top: 20px;
        border: 1px solid #e5e5e5;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        transition: all 0.3s ease;
		align-items: center;
        input[type="checkbox"] {
          width: 14px;
          height: 14px;
          background-color: #fff;
          -webkit-appearance: none;
          border: 1px solid #c9c9c9;
          border-radius: 2px;
          outline: none;
        }

        input[type="checkbox"]:checked {
          background: url("../../../../../img/CheckedBg.png");
          border: none;
        }

        input[type="checkbox"]:hover {
          border-color: #409eff;
        }

        .list_img {
          height: 100px;
          width: 100px;
          margin-left: 10px;
        }

        .list_middle {
          flex: 1;
          padding: 0 20px;
          height: auto;
          overflow: hidden;

          .remarks {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          .title {
            color: #09f;
            font-size: 14px;
            font-weight: bold;
          }

          p {
            font-size: 15px;
            padding-top: 5px;
            line-height: 25px;
          }
        }

        .list_right_middle {
          flex-basis: 160px;

          span {
            color: #ff8110;
            font-weight: bold;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
          }
        }

        .list_btn_line {
          flex-basis: 150px;
          display: flex;
          padding: 0 15px;
          box-sizing: border-box;
          justify-content: space-between;

          button {
            margin: auto;
            width: 80px;
            height: 30px;
            border: 1px solid #e8e8e8;
            background: white;
            color: #afacac;
            border-radius: 3px;
            cursor: pointer;
            outline: none;

            &:hover {
              border: 1px solid #afacac;
              background: #afacac;
              color: white;
            }

            &:last-of-type {
              border: 1px solid #ff8110;
              margin-left: 15px;
              color: #ff8110;

              &:hover {
                border: 1px solid #ff8110;
                background: #ff8110;
                color: white;
              }
            }
          }
        }

        &:hover {
          box-shadow: 0 0 3px lightgray;
          transition: all 0.3s ease;
        }
      }
    }

    .pagenation_line {
      width: 958px;
      height: 80px;
      border: 1px solid #e5e5e5;
      margin-top: 20px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .check_all {
        button {
          width: 80px;
          height: 30px;
          border: 1px solid #ff8110;
          background: white;
          color: #ff8110;
          border-radius: 5px;
          margin-left: 20px;
        }
      }
    }

    .no-more {
      border: 1px solid #e8e8e8;
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
</style>
