<!-- 添加购物车弹窗 -->
  <!-- <div class="cart-dialog" v-if="cartDialogData.name !== undefined">
    <el-dialog title="添加到购物车" :visible.sync="cartDialogVisible" width="600px">
      <div
        style="padding: 15px;border-bottom: 1px solid #e8e8e8;width: 100%;box-sizing: border-box;line-height: 20px;"
      >
        <p>商品名称：{{cartDialogData.name}}</p>
        <p>原厂型号：{{cartDialogData.materiaCode}}</p>
        <p>品 牌：{{cartDialogData.brandName}}</p>
        <p>封装规格：{{cartDialogData.spec}}</p>
        <p>现货库存：{{cartDialogData.stockNum}}个</p>
        <p>最小预定量：{{cartDialogData.miniOrderQuantity}}个</p>
      </div>
      <div style="padding: 10px 0;">
        <div style="padding: 0 20px;line-height: 20px;">
          <p>含增值税</p>
          <p v-for="(v,k) in cartDialogData.children" :key="k">
            {{v.label}}
            <span style="padding-right: 10px;color: orange;">￥{{v.value}}</span>
          </p>
        </div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="购买数量：">
            <el-input
              v-model="totalNum"
              style="width: 200px;padding-right: 10px;"
              type="number"
              size="small"
              disabled
            ></el-input>X
            <span style="color: orange;">￥{{JSON.parse(cartDialogData.ledGoodsPrice)[0]}}</span>(整包装) =
            <span
              style="color: orange;"
            >￥{{form.num * JSON.parse(cartDialogData.ledGoodsPrice)[0]}}</span>
          </el-form-item>
          <el-form-item label="购买数量：">
            <el-input
              v-model="form.num"
              style="width: 200px;padding-right: 10px;"
              type="number"
              @change="onBoxChange"
              size="small"
              placeholder="请输入数量"
            ></el-input>
            {{cartDialogData.unitName}}
            <p style="color: orange;" v-if="form.num > 2">
              <i class="el-icon-warning"></i> 库存不足，加入购物车，下单后帮您订货
            </p>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="onCartDialogSubmit(cartDialogData.goodsId,form.num)"
        >加入购物车</el-button>
      </span>
    </el-dialog>
  </div>-->