<template>
  <div class="myCollection_box">
    <div class="myCollection_top">
      <ul>
        <li :class="type == 1 ? 'active' : ''" @click="collectLi(1)">
          <span>闲料</span>
       </li>
<!--        <li :class="type == 2 ? 'active' : ''" @click="collectLi(2)">-->
<!--          <span>求购</span>-->
<!--        </li>-->
       </ul>
      <!-- <span class="more" @click="viewMore" ref="reset">
        更多
        <i class="fa fa-chevron-down" id="transfer" aria-hidden="true"></i>
      </span> -->
    </div>

    <!-- <el-checkbox-group v-model="ids" @change="handleCheckedCitiesChange"> -->
    <ul class="myCollection_list" v-if="collectionList.length > 0">
      <li v-for="(val, key) in collectionList" :key="key">
        <input type="checkbox" @change="addCollect(val.id)" ref="checkBox" />
		<template v-if="type == 1">
<!--        <img-->
<!--          :src="val.goodMain"-->
<!--          alt-->
<!--          class="list_img"-->
<!--          @click="toInfo(val)"-->
<!--          v-if="val.goodMain != null"-->
<!--        />-->
        <img
          :src="val.image"
          alt
          class="list_img"
          @click="toInfo(val)"
          v-if="type==1"
        />
		</template>
        <div class="list_middle"  @click="toInfo(val)">
           <p class="title">
             <span class="delay" style="color:lightgray;font-weight:normal;" v-if="val.isDelete == 1">(该商品已删除)</span>
             <span class="delay" style="color:lightgray;font-weight:normal;" v-else-if="val.status == 1">(该商品已下架)</span>
             <span class="delay" style="color:lightgray;font-weight:normal;" v-else-if="val.isEnd===1">(该商品已过期)</span>
          </p>
          <div class="lm_text">
            型号:{{val.materialsName}}
          </div>
          <div class="lm_text">
            品牌:{{val.brand}}
          </div>
          <div class="lm_text">
			时间:{{val.publishTime | formatDate}}
          </div>
        </div>
        <div class="list_right_middle">
          <div>联系方式{{val.phone}}</div>
          <!-- <div v-for="(v,k) in val.children" :key="k">
            {{v.label}}：
            <span>￥{{v.value}}</span>
          </div> -->
        </div>
        <div class="list_btn_line" @click="toInfo(val)">
          <button v-if="val.isEnd==='1'">已结束</button>
          <button v-else>进行中</button>
          <!-- <button @click="addToCart(val,1)">加入购物车</button> -->
        </div>
      </li>
    </ul>
    <!-- </el-checkbox-group> -->
    <div class="no-more" v-if="collectionList.length <= 0">
      <div>
        糟糕，没有记录了！
        <span @click="$router.push('/home/outLandDemo')">去逛逛吧</span>
      </div>
    </div>
    <div class="pagenation_line" v-if="collectionList.length > 0">
      <div class="check_all">
        <el-checkbox v-model="checkedAll" @change="checkAll">全选</el-checkbox>
        <button @click="cancelAll">删除</button>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
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
      type: 1,
    };
  },
  filters: {
	 formatDate: function (value) {
	  var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	  var Y = date.getFullYear() + '-';
	  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	  // var D = date.getDate() + ' ';
	  // var h = date.getHours() + ':';
	  // var m = date.getMinutes() + ':';
	  // var s = date.getSeconds();
	  return Y+M+D+h+m+s;
	}
  },
  created() {
    this.getFalseCollectionList({
      pageSize: this.pageSize,
      pageNum: this.pageNum,
      type:this.type
    });
  },
  mounted() {
    //console.log(this.$refs.checkBox)//$refs.checkBox
  },
  methods: {
    collectLi(type){
      if(type==this.type){
        return
      }else{
        this.type = type;
          this.cancelCheck()
        this.collectionList = [];
        this.getFalseCollectionList({
          pageSize: this.pageSize,
          pageNum: 1,
          type:this.type
        });
      }

    },
    toInfo(val) {
      // let id = val.goodsId;
      // 被下架或是被删除,都不进详情
     // console.log(val.materialsId)
      console.log(this.type)
      console.log(this.type)
      // if (val.status !== 1 && val.isDelete !== 1) {
          if(val.isEnd==='0'){
              this.$router.push({
                  path: "/purchaseCommonDetail",
                  query: {
                      id: val.materialsId,
                      type: this.type
                  }
              });
          }

      // }
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
            this.form = { num: 0, box: 0 };
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
      cancelCheck(){
          let checkBoxList = this.$refs.checkBox;
          if(!checkBoxList){
              return
          }
          for (let i = 0; i < checkBoxList.length; i++) {
              this.$refs.checkBox[i].checked = false;
          }
          this.ids = [];
          this.checked=false
          this.checkedAll=false

      },
    cancelAll() {
      //取消收藏全部或是多条
      //console.log(this.ids)
      let ids = this.ids.join(",");
        if (ids.trim().length > 0) {
            this.$confirm(`您确定要删除吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(`api-user/app/user/deleteGetPhoneRecords/` + ids).then((res) => {
                    if (res.data.resp_code === 0) {
                        this.getFalseCollectionList({
                            pageSize: this.pageSize,
                            pageNum: this.pageNum,
                            type: this.type
                        });
                        this.cancelCheck()
                    }
                })
            })
        } else {
            this.$message("请选择需要取消收藏的商品");
        }
      // if (ids.trim().length > 0) {
      //   this.$http
      //     .post("/pc/collect/cancleCollect/" + ids)
      //     .then(res => {
      //       if (res.data.data.code === 1) {
      //         this.$message.success(res.data.data.msg);
      //         this.getFalseCollectionList({
      //           pageSize: this.pageSize,
      //           pageNum: this.pageNum
      //         });
      //         ids = "";
      //         this.ids = [];
      //       } else {
      //         this.$message(res.data.data.msg);
      //       }
      //     })
      //     .catch(res => {});
      // } else {
      //   this.$message("请选择需要取消收藏的商品");
      // }
    },
    addCollect(e) {
      let index = this.ids.indexOf(e);
      if (index !== -1) {
        this.ids.splice(index, 1);
        if (this.ids.length === this.collectionList.length) {
          this.checkedAll = true;
        } else {
          this.checkedAll =false ;
        }
      } else {
        this.ids.push(e);
        if (this.ids.length === this.collectionList.length) {
          this.checkedAll =true ;
        } else {
          this.checkedAll = false;
        }
      }
      //console.log(this.ids)
    },
    // 获取记录数据
    getFalseCollectionList(data) {
      this.$http
        .get("/api-user/app/user/myGetMateralsList", data)

        .then(res => {
          //console.log(res)
          // this.$http.judgeIfLogin(res, this);
          this.collectionList = res.data.data
          this.total = res.data.count
        })
        .catch(res => {});
      // if (localStorage.getItem("falseCollectionList")) {
      //   this.collectionList = JSON.parse(
      //     localStorage.getItem("falseCollectionList")
      //   );
      //    //console.log(this.collectionList)
      // }
    },

    // 取消收藏
    onCancel(data, index) {
      let ids = [];
      ids.push(data.id);
      ids = JSON.stringify(ids);
      //console.log(ids)

        this.$confirm(`您确定要删除吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http
                .post("/pc/collect/cancleCollect/" + data.id)
                .then(res => {
                    //console.log(res)
                    if (res.data.data.code === 1) {
                        //console.log(res.data.data.msg)
                        this.ids = []
                        this.getFalseCollectionList({
                            pageSize: this.pageSize,
                            pageNum: this.pageNum,
                            type: this.type
                        });
                        this.cancelCheck()
                        this.$message.success(res.data.data.msg);
                    } else {
                        this.$message(res.data.data.msg);
                    }
                })
                .catch(res => {
                });
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
      let data = { pageSize: this.pageSize, pageNum: 1,type:this.type };
      this.getFalseCollectionList(data);

      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      let data = { pageSize: this.pageSize, pageNum: this.pageNum,type:this.type };
      this.getFalseCollectionList(data);
      //console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.lm_text{
	font-size: 16px;
	// height: 34px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	margin: 10px 0;
}
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
		letter-spacing: 2px;
        text-align: center;
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
	  align-items: center;
      padding: 20px;
      box-sizing: border-box;
      transition: all 0.3s ease;
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
        // margin-top: 20px;
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
          padding-left: 30px;
          height: 100%;
          font-size: 22px;
          display: flex;
          // align-items: center;
          justify-content: space-around;
          flex-direction: column;
        }
      }
      .list_right_middle {
        flex-basis: 200px;
        margin: auto;
        display: inline-block;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 15px;
        // border: 1px solid;
        background-color: #e5e5e5;
        border-radius: 5px;
        span {
          color: #ff8110;
          font-weight: bold;
          height: 25px;
          line-height: 25px;
          font-size: 14px;
          border-radius: 5px;
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
