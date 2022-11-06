<template>
  <div style="background:#F5F5F5">
    <div class="home_help_box">
      <div class="home_help_box_left">
        <p class="home_help_title">帮助中心</p>
        <el-collapse v-model="activeNum" accordion>
          <el-collapse-item v-for="(t,i) in navList" :key="i" :title="t.name" :name="t.id">
            <ul class="nav_cont">
              <li v-for="(te,ind) in t.children" :key="ind">
                <span
                  @click="setTitle(te.name, te.id, t.id)"
                  :class="te.id == $route.query.subId ? 'nav_active' : ''"
                >{{te.name}}</span>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="home_help_box_right">
        <p class="help_box_right_title">{{activeTitle}}</p>
        <div class="html" v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNum: this.$route.query.parentId,
      activeTitle: "",
      navList: [
        // {
        //   pTitle: "购物指南",
        //   children: [
        //     { name: "顾客必读", toUrl: "/home/help/buyersMustRead" },
        //     { name: "购物流程", toUrl: "/home/help/shoppingProcess" },
        //     { name: "商品搜索", toUrl: "/home/help/commoditySearch" },
        //     { name: "会员等级", toUrl: "/home/help/gradeMembership" },
        //     { name: "联系客服", noRouter: true }
        //   ]
        // },
        // {
        //   pTitle: "配送方式",
        //   children: [
        //     { name: "上门自提", toUrl: "/home/help/sinceQuestion" },
        //     { name: "快递运输", toUrl: "/home/help/expressTransportation" }
        //   ]
        // },
        // {
        //   pTitle: "支付方式",
        //   children: [{ name: "在线支付", toUrl: "/home/help/onlinePayment" }]
        // },
        // {
        //   pTitle: "特色服务",
        //   children: [
        //     { name: "订货服务", toUrl: "/home/help/orderingService" },
        //     { name: "进度跟踪", toUrl: "/home/help/progressTracking" },
        //     { name: "质量保证", toUrl: "/home/help/qualityGuarantee" }
        //   ]
        // },
        // {
        //   pTitle: "售后服务",
        //   children: [
        //     { name: "服务投诉", toUrl: "/home/help/serviceComplaint" },
        //     { name: "订单何时出库", toUrl: "/home/help/outboundOrderWhen" },
        //     { name: "送货验货", toUrl: "/home/help/deliveryInspection" }
        //   ]
        // },
        // {
        //   pTitle: "特别说明",
        //   children: [
        //     { name: "隐私保护政策", toUrl: "/home/help/privacyProtection" },
        //     { name: "网站使用条款", toUrl: "/home/help/siteUse" },
        //     { name: "网站免责声明", toUrl: "/home/help/sitedisclaimer" }
        //   ]
        // }
      ],
      html: ""
    };
  },
  created() {
    this.getContent(this.$route.query.title, this.$route.query.subId);
  },
  mounted() {
    this.activeTitle = this.$route.meta.activeTitle;
    this.getTreeHelpMenu();
  },
  methods: {
    // 设置标题
    setTitle(val, id, parentId) {
      this.getContent(val, id);
      this.$router.push({
        path: "/home/help",
        query: {
          title: val,
          subId: id,
          parentId: parentId,
          time: new Date().getTime()
        }
      });
    },

    // 获取详情
    getContent(val, id) {
      this.$http.get(`/pc/helpMenu/getContent/${id}`).then(res => {
        this.html = res.data.data.helpData.content;
        this.activeTitle = val;
      });
    },

    // 获取树形菜单列表(footer-nav)
    getTreeHelpMenu() {
      this.$http.get("/pc/helpMenu/getTreeHelpMenu").then(res => {
        this.navList = res.data.data.helpMenuData;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home_help_box {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  .home_help_box_left {
    width: 230px;
    height: 570px;
    background: #ffffff;
    border-radius: 5px;
    .home_help_title {
      height: 80px;
      width: 100%;
      line-height: 80px;
      font-size: 23px;
      font-weight: bold;
      padding-left: 20px;
      box-sizing: border-box;
    }
    .nav_cont {
      width: 100%;
      height: 100%;
      li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 50px;
        box-sizing: border-box;
        span {
          color: #333;
          cursor: pointer;
          &:hover {
            text-decoration: none;
            color: #0193e6;
          }
        }
        .nav_active {
          color: #0193e6 !important;
        }
      }
    }
  }
  .home_help_box_right {
    width: 1000px;
    min-height: 500px;
    background: #ffffff;
    margin-left: 20px;
    border-radius: 5px;
    padding: 20px 30px;
    box-sizing: border-box;
    .help_box_right_title {
      width: 100%;
      height: 60px;
      font-size: 30px;
      line-height: 50px;
      color: #cccccc;
      border-bottom: 1px solid #e9e9e9;
    }
  }
}

.html {
  padding: 15px 0;
  word-break: break-all;
}
.html /deep/ img {
  max-width: 100%;
}
.html /deep/ p,
.html /deep/ span {
  line-height: 30px;
}
</style>
<style>
.el-collapse-item__header {
  padding-left: 20px;
  box-sizing: border-box;
}
.el-collapse-item__content {
  padding: 0;
}
</style>
