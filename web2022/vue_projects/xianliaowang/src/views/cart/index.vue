<template>
  <div class="warp">
    <div class="c-container">
      <el-alert title="购物车商品只保留3个月，请及时提交订单。" :closable="false" type="warning"></el-alert>

      <!-- 现货 -->
      <div class="c-stock">
        <div class="c-type-title">现货商品</div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          >
          <template slot="empty">
            <div class="no-more">
              <div>
                糟糕，购物是空的！
                <span @click="$router.push('/home/index')">去逛逛吧</span>
              </div>
            </div>
          </template>
          <el-table-column
            type="selection"
            width="55"
            :selectable="checkboxDisabled"
            disabled="true"
          ></el-table-column>
          <el-table-column label="商品图片" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.mdcMaterialsVo.mainImage" alt v-if="scope.row.mdcMaterialsVo.mainImage"/>
              <img src="../../../img/logo.png" alt v-else/>
            </template>
          </el-table-column>
<!--          <el-table-column label="商品品牌" width="120">-->
<!--            <template slot-scope="scope">-->
<!--              <p>{{scope.row.mdcMaterialsVo.materialsBrand}}</p>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="商品分类" width="120">-->
<!--            <template slot-scope="scope">-->
<!--              <p>{{scope.row.mdcMaterialsVo.materialsCategoryName}}</p>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--                    <el-table-column label="规格" width="120">-->
<!--                      <template slot-scope="scope">-->
<!--                        <p>{{scope.row.mdcMaterialsVo.materialsSpec}}</p>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column label="参数" width="120">-->
<!--                      <template slot-scope="scope">-->
<!--                        <p>{{scope.row.mdcMaterialsVo.materialsParam}}</p>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
          <el-table-column label="商品名称" >
            <template slot-scope="scope">
              <p>{{scope.row.mdcMaterialsVo.materialsName}}<span style="color:green;margin-left: 5px"  v-if="scope.row.mdcMaterialsVo.isFree == 0" >(免费送 {{scope.row.mdcMaterialsVo.freeNum}} 件)</span></p>
            </template>
          </el-table-column>
          <!--          <el-table-column label="商品类型" width="150">-->
          <!--            <template slot-scope="scope">-->
          <!--              <p>{{scope.row.goodsType == '0' ? '一般商品' : (scope.row.goodsType == '1' ? 'LED灯区' : '限时优惠')}}</p>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <!-- <el-table-column label="单价（含增值税）" width="120">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>单价（含增值税）</p>
                <p v-for="(val,key) in scope.row.children" :key="key">
                  {{val.label}}：
                  <span style="color: #ff7800">{{val.value}}元</span>
                </p>
                <div slot="reference" class="name-wrapper">
                  ￥{{scope.row.children[0].value}}
                  <i
                    class="el-icon-arrow-down"
                    style="color: #09F;"
                  ></i>
                </div>
              </el-popover>
            </template>
          </el-table-column>-->
          <el-table-column label="数量" width="180">
            <template slot-scope="scope">
              <!-- <el-input-number :min="1" :max="10" label="描述文字" v-model="num"></el-input-number>
              <p>
              商品库存：-->
              <el-input-number
                v-model="scope.row.quantity"
                :min="scope.row.mdcMaterialsVo.field2!=null?Number(scope.row.mdcMaterialsVo.field2):1"
                @change="numChange"
                :step="scope.row.mdcMaterialsVo.field2!=null?Number(scope.row.mdcMaterialsVo.field2):1"
                :step-strictly="true"
                :max="scope.row.mdcMaterialsVo.stock"
                size="small"
              ></el-input-number>
              <!-- </p> -->
            </template>
          </el-table-column>
          <el-table-column label="金额"  width="160">
            <template slot-scope="scope">
              <p style="color: #ff7800">￥{{scope.row.mdcMaterialsVo.price}}</p>
            </template>
          </el-table-column>
          <el-table-column label="总计"  width="160">
            <template slot-scope="scope">
              <p style="color: #ff7800">￥{{(scope.row.quantity-scope.row.mdcMaterialsVo.freeNum>0?scope.row.mdcMaterialsVo.price*(scope.row.quantity-scope.row.mdcMaterialsVo.freeNum):0).toFixed(2)}}</p>
            </template>
          </el-table-column>
          <el-table-column label="库存" width="100">
            <template slot-scope="scope">
              <p>{{scope.row.mdcMaterialsVo.stock}}</p>
            </template>
          </el-table-column>
          <el-table-column label="商品状态" width="130">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.mdcMaterialsVo.isDelete == 1 || scope.row.mdcMaterialsVo.status == 0  ? 'warning':'success'"
              >{{scope.row.mdcMaterialsVo.isDelete == 1 || scope.row.mdcMaterialsVo.status == 1 ? '已下架' :'正常' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button size="mini">移入收藏夹</el-button> -->
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="onDeleteRow(scope.row.id)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="btnGroup" v-if="false">
          <button @click="cancel" class="cancel">取消</button>
          <button @click="confirmDelete" class="delete">删除</button>
        </div>
      </div>
      <div class="pafeLine">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formInline.pageNum"
          :page-sizes="[5,10, 20, 30,50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Number(total)"
        ></el-pagination>
      </div>
      <!-- 底部操作栏 -->
      <div class="c-btn-list">
        <!-- <div class="b-left">
          <i class="el-icon-delete">删除</i>
          <i class="el-icon-star-off">移入收藏夹</i>
          <i class="el-icon-document">导出至Excel</i>
        </div>-->
        <div class="b-right">
          已选中
          <span>{{multipleSelection.length}}</span> 种商品 总价（不含运费）：
          <span class="b-margin">{{needPayCom}}</span>
          <el-button type="warning" size="small" @click="onGotoPlaceOrder">去结算</el-button>
        </div>
      </div>
      <!-- <div class="c-quick">
        <p>根据商品编号快速添加购物车</p>
        <el-form :inline="true"  class="demo-form-inline" size="small">
          <el-form-item label="商品编号：">
            <el-input v-model="formInline.no" placeholder="商品编号"></el-input>
          </el-form-item>
          <el-form-item label="数量：">
            <el-input v-model="formInline.num" placeholder="数量"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onAddCartList">添加</el-button>
          </el-form-item>
        </el-form>
      </div>-->
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                num: 1,
                tableData: [],
                formInline: {
                    no: "",
                    num: "",
                    pageSize: 5,
                    pageNum: 1
                },
                multipleSelection: [],
                needPay: "",
                totalPrices: [],
                total: 0,
                ids: [], //id集合
                goods: [], //商品集合
                nums: [], //数量集合
                prices: [], //价格集合
                types: [], //类型集合
                pageSize: 10,
                pageNum: 10,
                needPayCom:0,
            };
        },
        created() {
            // 购物车假数据模拟
            // if (localStorage.getItem("cartList")) {
            //   this.tableData = JSON.parse(localStorage.getItem("cartList"));
            // }
        },
        mounted() {
            let data = {
                pageSize: this.formInline.pageSize,
                pageNum: this.formInline.pageNum
            };
            this.getCartList(data);
        },
        computed: {
            // needPayCom() {
            //     let num = 0;
            //     if (this.totalPrices.length > 0) {
            //         for (let i = 0; i < this.totalPrices.length; i++) {
            //             num += this.totalPrices[i];
            //         }
            //     }
            //     num = num.toFixed(2);
            //     return num;
            // }
        },
        methods: {
            checkboxDisabled(row, index) {
                console.log(row)
                // 过期商品,删除商品,下架商品,只允许删除操作
                if (row.mdcMaterialsVo.isDelete == 1 || row.mdcMaterialsVo.status == 1) {
                    return 0;
                } else {
                    return 1;
                }
            },

            cancel() {
            },
            confirmDelete() {
            },
            handleSizeChange(val) {
                this.formInline.pageSize = val;
                let data = {
                    pageSize: this.formInline.pageSize,
                    pageNum: this.formInline.pageNum
                };
                this.getCartList(data);
            },
            handleCurrentChange(val) {
                this.formInline.pageNum = val;
                let data = {
                    pageSize: this.formInline.pageSize,
                    pageNum: this.formInline.pageNum
                };
                this.getCartList(data);
            },
            getCartList() {
                let data = {
                    pageNum: this.formInline.pageNum,
                    pageSize: this.formInline.pageSize
                };
                console.log(data);
                this.$http
                    .get('api-user/app/cart', data)
                    .then(res => {
                        //判断是否登录了的（没有登录则导航到登录页面）
                        //this.$http.judgeIfLogin(res, this);
                        this.tableData = res.data.data;
                        this.total = res.data.count;
                    })
                    .catch(res => {
                    });
            },
            // 删除
            onDeleteRow(id) {
                this.$confirm('此操作将删除购物车的该条商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http
                        .delete("api-user/app/cart/" + id)
                        .then(res => {
                            if(res.data.resp_code === 0){
                                this.$message({
                                    message: res.data.resp_msg,
                                    type: 'success'
                                });
                                let data = {pageNum: 100, pageSize: 1};
                                this.getCartList(data);
                                this.requestCartNum();
                            } else {
                                this.$message.success(res.data.data.msg);
                            }
                        })
                        .catch(res => {
                        });
                }).catch(() => {

                });

            },

            // 去结算
            onGotoPlaceOrder() {
                if (this.multipleSelection.length <= 0) {
                    this.$message("请选选择要购买的商品！");
                } else {
                    let ids = this.ids.join(",");
                    let goods= this.goods;
                    let nums = this.nums.join(",");
                    let prices = this.prices.join(",");
                    let types = this.types.join(",");
                    let transferData = {
                        cartIds: ids,
                        goods: goods,
                        nums: nums,
                        prices: prices,
                        types: types,
                        totalPay:this.needPayCom
                    };
                    localStorage.setItem("transferData",JSON.stringify(transferData))
                    //console.log(transferData);
                    this.$router.push({
                        path: "/cart/placeOrder"
                    });
                }
            },
            //计算总价
            computeNeedPayCom(){
                let needPayCom=0;
                if (this.multipleSelection.length > 0) {
                    this.ids = [];
                    this.goods = [];
                    this.nums = [];
                    this.prices = [];
                    this.types = [];
                    this.totalPrices = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        //先置空，然后push
                        this.ids.push(this.multipleSelection[i].id);
                        this.goods.push(this.multipleSelection[i]);
                        this.nums.push(this.multipleSelection[i].quantity);
                        this.prices.push(this.multipleSelection[i].mdcMaterialsVo.price);
                        this.types.push(this.multipleSelection[i].mdcMaterialsVo.isFree);
                        this.totalPrices.push(this.multipleSelection[i].mdcMaterialsVo.price*((this.multipleSelection[i].quantity-this.multipleSelection[i].mdcMaterialsVo.freeNum)<0?0:(this.multipleSelection[i].quantity-this.multipleSelection[i].mdcMaterialsVo.freeNum)));
                        needPayCom+=this.multipleSelection[i].mdcMaterialsVo.price*((this.multipleSelection[i].quantity-this.multipleSelection[i].mdcMaterialsVo.freeNum)<0?0:(this.multipleSelection[i].quantity-this.multipleSelection[i].mdcMaterialsVo.freeNum))
                        //打印结果看push 是否正确
                        //console.log(this.ids);
                        //console.log(this.goodsIds);
                        //console.log(this.nums);
                        //console.log(this.prices);
                        //console.log(this.types);
                        //console.log(this.totalPrices);
                    }
                }else {
                    this.ids = [];
                    this.goods = [];
                    this.nums = [];
                    this.prices = [];
                    this.types = [];
                    this.totalPrices = [];
                }
                this.needPayCom=needPayCom.toFixed(2)
            },
            numChange(){
                this.computeNeedPayCom();
            },
            // 现货全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.computeNeedPayCom();
                // this.multipleSelection = val;
                // /// 被选中的数据
                // if (this.multipleSelection.length > 0) {
                //     //console.log("此时的ids")
                //     //console.log(this.ids)
                //     this.ids = [];
                //     this.goods = [];
                //     this.nums = [];
                //     this.prices = [];
                //     this.types = [];
                //     this.totalPrices = [];
                //     for (let i = 0; i < this.multipleSelection.length; i++) {
                //         //先置空，然后push
                //         this.ids.push(this.multipleSelection[i].id);
                //         this.goods.push(this.multipleSelection[i]);
                //         this.nums.push(this.multipleSelection[i].quantity);
                //         this.prices.push(this.multipleSelection[i].mdcMaterialsVo.price);
                //         this.types.push(this.multipleSelection[i].mdcMaterialsVo.isFree);
                //         this.totalPrices.push(this.multipleSelection[i].mdcMaterialsVo.price*((this.multipleSelection[i].quantity-this.multipleSelection[i].mdcMaterialsVo.freeNum)<0?0:(this.multipleSelection[i].quantity-this.multipleSelection[i].mdcMaterialsVo.freeNum)));
                //         //打印结果看push 是否正确
                //         //console.log(this.ids);
                //         //console.log(this.goodsIds);
                //         //console.log(this.nums);
                //         //console.log(this.prices);
                //         //console.log(this.types);
                //         //console.log(this.totalPrices);
                //     }
                // } else {
                //     this.ids = [];
                //     this.goods = [];
                //     this.nums = [];
                //     this.prices = [];
                //     this.types = [];
                //     this.totalPrices = [];
                //     //console.log(this.ids);
                //     //console.log(this.goodsIds);
                //     //console.log(this.nums);
                //     //console.log(this.prices);
                //     //console.log(this.types);
                //     //console.log(this.totalPrices);
                // }
            }
        }
    };
</script>

<style lang="scss" scoped>
  .warp {
    margin-bottom: 20px;

    .c-container {
      width: 1200px;
      margin: auto;

      .c-stock {
        margin: 20px 0;

        .c-type-title {
          height: 40px;
          border-bottom: 1px solid #e8e8e8;
          border-top: 1px solid #e8e8e8;
          font-size: 16px;
          display: flex;
          align-items: center;
          padding: 0 15px;
        }

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

      .c-stock /deep/ img {
        width: 60px;
        height: 60px;
      }

      .btnGroup {
        text-align: right;
        margin-top: 10px;

        button {
          padding: 8px 15px;
          border-radius: 3px;
          margin-left: 10px;
          border: none;
          cursor: pointer;
          outline: none;
        }

        .cancel {
          color: #f56c6c;
          border: 1px solid #f56c6c;
          background: white;
        }

        .delete {
          color: white;
          background: #f56c6c;
        }
      }

      .pafeLine {
        width: 100%;
        max-width: 1200px;
        height: 50px;
        text-align: right;
      }

      .c-btn-list {
        height: 40px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        padding: 5px 15px;

        .b-left {
          flex: 1;
          font-size: 14px;

          i {
            cursor: pointer;
            padding-right: 15px;

            &:hover {
              color: rgb(255, 120, 0);
            }
          }
        }

        .b-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 14px;

          span {
            font-weight: bold;
            color: rgb(255, 120, 0);
            font-size: 16px;
          }

          .b-margin {
            margin-right: 10px;
          }
        }
      }

      .c-quick {
        margin-top: 20px;
        padding: 0 15px;

        p {
          font-size: 14px;
          color: gray;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>


