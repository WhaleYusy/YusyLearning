<template>
  <div class="invoiceInformation">
    <div class="add-btn">
      <p @click="handleAdd">新增发票</p>
      <p v-if="$route.query.type == 'add'" @click="onBackPlaceOrder">返回</p>
    </div>
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column label="公司名称" prop="companyName"></el-table-column>
      <el-table-column label="税号" prop="invoiceName"></el-table-column>
      <el-table-column label="银行名称" prop="bankName"></el-table-column>
      <el-table-column label="银行账户" prop="bankNo"></el-table-column>
      <el-table-column label="注册地址">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.registerAddress"
            placement="top"
          >
            <p class="tabPAdress">{{scope.row.registerAddress}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="注册电话" prop="registerPhone"></el-table-column>
      <el-table-column label="收件人" prop="consignee"></el-table-column>
      <el-table-column label="收件人收件号码" prop="consigneePhone"></el-table-column>
      <el-table-column label="收件人地址">
        <template
          slot-scope="scope"
          v-if="scope.row.consigneeAddress"
        >{{scope.row.consigneeAddress}}</template>
      </el-table-column>
      <el-table-column label="收件人详细地址">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.consigneeAddressInfo"
            placement="top"
          >
            <p class="tabPAdress">{{scope.row.consigneeAddressInfo}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete( scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog
      title="增值税开票资料"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="min-height: 540px;max-height: 540px;overflow: auto;">
        <EditNewInvoice
          :datas="cellRowData"
          ref="editNewInvoice"
          @close="dialogVisibleClose"
          v-if="isEdit == true"
        />
        <AddNewInvoice v-else @close="dialogVisibleClose" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EditNewInvoice from "./editNewInvoice";
import AddNewInvoice from "./addNewInvoice";
export default {
  components: {
    EditNewInvoice,
    AddNewInvoice
  },
  data() {
    return {
      tableData: [],
      tableParam: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      currentPage: 0, //当前页面
      dialogVisible: false,
      cellRowData: {},
      isEdit: false
    };
  },
  mounted() {
    this.getFindInvoicePage(this.tableParam);
  },
  methods: {
    // 返回购物结束列表
    onBackPlaceOrder() {
      this.$router.push({
        path: "/cart/placeOrder",
        query: {
          transferData: this.$route.query.transferData
        }
      });
    },

    // 发票列表
    getFindInvoicePage(param) {
      this.$http.post("/pc/invoice/findInvoicePage", { ...param }).then(res => {
        // console.log(res.data.data.msg.records);
        if (res.data.data.code == 1) {
          this.tableData = res.data.data.msg.records;
          this.total = res.data.data.msg.total;
        } else {
          this.$message.error(es.data.data.msg);
        }
      });
    },

    // 新增
    handleAdd() {
      this.isEdit = false;
      this.dialogVisible = true;
    },

    // 编辑
    handleEdit(row) {
      this.isEdit = true;
      this.cellRowData = row;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editNewInvoice.getFindInvoiceInfo();
      });
    },

    // 成功关闭弹窗
    dialogVisibleClose() {
      this.dialogVisible = false;
      this.getFindInvoicePage(this.tableParam);
    },

    // 删除
    handleDelete(row) {
      this.reconfirmation(
        "永久删除当前行数据",
        `/pc/invoice/deleteInvoiceInfo/${row.id}`
      );
    },

    // 二次确认
    reconfirmation(txt, requestUrl) {
      this.$confirm(`此操作将${txt}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.post(requestUrl).then(res => {
            if (res.data.data.code == 1) {
              this.$message({
                type: "success",
                message: res.data.data.msg
              });
              this.getFindInvoicePage(this.tableParam);
            } else {
              this.$message({
                type: "error",
                message: res.data.data.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },

    // 分页
    handleSizeChange(val) {
      this.tableParam.pageSize = val;
      this.getFindInvoicePage(this.tableParam);
    },
    handleCurrentChange(val) {
      this.tableParam.pageNum = val;
      this.getFindInvoicePage(this.tableParam);
    }
  }
};
</script>

<style lang="scss" scoped>
.invoiceInformation {
  position: relative;
  margin: 20px 0;
  .dividePageBar {
    text-align: right;
    margin-top: 20px;
  }
  .add-btn {
    position: absolute;
    right: 15px;
    top: -50px;
    z-index: 2;
    display: flex;
    color: #09f;
    p {
      cursor: pointer;
    }
    p:last-of-type {
      margin-left: 15px;
    }
  }
}
.tabPAdress {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}
</style>
