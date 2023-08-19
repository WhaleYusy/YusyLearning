<template>
  <div class="myCollection_box">
    <div class="myCollection_top">
     <ul>
        <li :class="type == 0 ? 'active' : ''" @click="collectLi(0)">
         <span>闲料</span>
       </li>
<!--        <li :class="type == 1 ? 'active' : ''" @click="collectLi(1)">-->
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
        <input type="checkbox" @change="addCollect(val.id)" ref="checkBox"/>
        <img
          :src="val.mainImage"
          alt
          class="list_img"
          @click="toInfo(val)"
          v-if="type==0"
        />
        <!--        <img-->
        <!--          :src="val.mainImage"-->
        <!--          alt-->
        <!--          class="list_img"-->
        <!--          @click="toInfo(val.goodsId)"-->
        <!--          v-else-->
        <!--        />-->
        <div class="list_middle" @click="toInfo(val)">
           <p class="title">
<!--            <span class="delay" style="color:lightgray;font-weight:normal;" v-if="val.goodsStatus == 0 || val.isDelete == 1 ">(该商品已下架)</span>-->
             <span class="delay" style="color:lightgray;font-weight:normal;" v-if="val.status == 1">(该商品已下架)</span>
             <span class="delay" style="color:lightgray;font-weight:normal;" v-else-if="!(((val.endDay > -1) && ((val.endDay * 86400000 + val.publishDate) > new Date().getTime()))||(val.endDay === -1))">(该商品已过期)</span>
          </p>
          <p>型号：{{ val.materialsName }}</p>
          <!-- <p>
            类型： {{val.brand}} /
            <span style="color:#007FD0">{{val.model}} / {{val.specs}}</span>
          </p> -->
          <p class="remarks" v-if="type==0">
            <!-- 年份：{{ val.remarks !== null ? val.remarks : "暂无备注" }} -->
            年份：{{ val.materialsYear }}
            <!-- <span style="color:#0DA401;cursor:pointer;" @click="toEdit">[编辑]</span> -->
          </p>
          <p v-if="type == 0">品牌：{{ val.materialsBrand }}</p>
          <p v-else="">品牌：{{ val.field1 }}</p>
          <p>数量：{{ val.quantity }}</p>
          <!--          <p>类别：{{ val.createdTime }}</p>-->
        </div>
        <div class="list_right_middle">
          <div>
            <span v-if="type == 0">￥{{ val.currentPrice }}&nbsp;</span>&nbsp;
            <!--            <span>价格：￥{{val.origPrice > 10000 ? (val.origPrice/10000) : val.origPrice }}</span>-->
          </div>
          <!-- <div v-for="(v,k) in val.children" :key="k">
            {{v.label}}：
            <span>￥{{v.value}}</span>
          </div> -->
        </div>
        <div class="list_btn_line">
          <button @click="onEdit(val, key)">编辑</button>
          <button @click="onCancel(val, key)">删除</button>
          <!-- <button @click="addToCart(val,1)">加入购物车</button> -->
        </div>
      </li>
    </ul>
    <div class="no-more" v-if="collectionList.length <= 0">
      <div>
        糟糕，没有发布记录！
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
                type: 0
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
                    return
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
                let id = val.id;
                // 被下架或是被删除,都不进详情
                if (val.status !== 1 && val.isDelete !== 1) {
                    if(((val.endDay > -1) && ((val.endDay * 86400000 + val.publishDate) > new Date().getTime()))||(val.endDay === -1)){
                        this.$router.push({
                            path: "/purchaseCommonDetail",
                            query: {
                                id: id,
                                type: this.type+1
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
                            this.form = {num: 0, box: 0};
                        } else {
                            this.$message(res.data.data.msg);
                            this.cartDialogVisible = false;
                        }
                    })
                    .catch(res => {
                    });
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

            },
            cancelCheck() {
                let checkBoxList = this.$refs.checkBox;
                if (!checkBoxList) {
                    return
                }
                for (let i = 0; i < checkBoxList.length; i++) {
                    this.$refs.checkBox[i].checked = false;
                }
                this.ids = [];
                this.checked = false
                this.checkedAll = false

            },
            cancelAll() {
                //取消收藏全部或是多条
                //console.log(this.ids)
                if (this.ids.length == 0) {
                    this.$message({
                        type: 'waring',
                        message: `请选择要删除的记录!`
                    });
                }
                let ids = this.ids.join(",");
                let url = '';
                if (this.type == 0) {
                    url = 'api-user/app/mdcidlematerials/'
                } else {
                    url = 'api-user/app/mdcbuyingmaterials/'
                }
                if (ids.trim().length > 0) {
                    this.$confirm(`您确定要删除吗?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.delete(url + ids).then((res) => {
                            console.log(res)
                            if (res.data.resp_code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: `操作成功!`
                                });
                                this.ids = []
                                this.cancelCheck()
                                this.getFalseCollectionList({
                                    pageSize: this.pageSize,
                                    pageNum: this.pageNum,
                                    type: this.type
                                });
                            } else {
                                this.$message({
                                    type: 'waring',
                                    message: `操作失败!`
                                });
                            }

                        })
                    }).catch(() => {
                        // on cancel
                    });
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
            // 获取发布数据
            getFalseCollectionList(data) {
                let url = "";
                if (data.type == 0) {
                    url = "api-user/app/mdcidlematerials/mypublish";
                } else {
                    url = "api-user/app/mdcbuyingmaterials/mypublish";
                }
                data.add
                this.$http
                    .get(url, data)
                    .then(res => {
                        //console.log(res)
                        this.collectionList = res.data.data
                        this.total = res.data.count
                    })
                    .catch(res => {
                    });
                // if (localStorage.getItem("falseCollectionList")) {
                //   this.collectionList = JSON.parse(
                //     localStorage.getItem("falseCollectionList")
                //   );
                //    //console.log(this.collectionList)
                // }
            },
            onEdit(data, index) {
                if (this.type == 0) {
                    this.$router.push({path: '/home/issueIdleMaterial', query: {id: data.id, 'type': 'edit'}})
                } else {
                    this.$router.push({path: '/home/issuePurchase', query: {id: data.id, 'type': 'edit'}})
                }

            },
            // 取消收藏
            onCancel(data, index) {
                let ids = [];
                ids.push(data.id);
                ids = ids.join(",");
                let url = '';
                if (this.type == 0) {
                    url = 'api-user/app/mdcidlematerials/'
                } else {
                    url = 'api-user/app/mdcbuyingmaterials/'
                }

                this.$confirm(`您确定要删除吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete(url + ids).then((res) => {
                        console.log(res)
                        if (res.data.resp_code == 0) {
                            this.$message({
                                type: 'success',
                                message: `操作成功!`
                            });
                            this.cancelCheck()
                            this.getFalseCollectionList({
                                pageSize: this.pageSize,
                                pageNum: this.pageNum,
                                type: this.type
                            });
                        } else {
                            this.$message({
                                type: 'waring',
                                message: `操作失败!`
                            });
                        }

                    })
                }).catch(() => {
                    // on cancel
                });


                //console.log(ids)
                // this.$http
                //   .post("/pc/collect/cancleCollect/" + data.id)
                //   .then(res => {
                //     //console.log(res)
                //     if (res.data.data.code === 1) {
                //       //console.log(res.data.data.msg)
                //       this.getFalseCollectionList({
                //         pageSize: this.pageSize,
                //         pageNum: this.pageNum
                //       });
                //       this.$message.success(res.data.data.msg);
                //     } else {
                //       this.$message(res.data.data.msg);
                //     }
                //   })
                //   .catch(res => {});
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
                let data = {pageSize: this.pageSize, pageNum: 1, type: this.type};
                this.getFalseCollectionList(data);

                //console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                let data = {pageSize: this.pageSize, pageNum: this.pageNum, type: this.type};
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
          flex-basis: 350px;
          margin: auto;
          display: inline-block;
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 15px;
          //border: 1px solid;
          border-radius: 5px;

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
