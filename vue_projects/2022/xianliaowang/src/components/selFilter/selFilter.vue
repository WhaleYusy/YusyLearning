<template>
  <div class="filter">
    <div class="filter-warp">
      <div class="filter-flex" v-for="(v,k) in getList" :key="k">
        <span class="filter-title">{{v.title}}</span>
        <div class="filter-content">
          <div class="filter-tab" :class="isShow ? 'filter-hide' : ''">
            <span
              v-for="(val, key) in v.childer"
              :key="key"
              :class="{'filter-active': val.active}"
              @click="tabClick(val,key,k)"
            >{{val.value}}</span>
          </div>
        </div>
        <div class="filter-more" @click="onIsMore" v-if="v.childer.length >= 14">
          更多
          <i :class="!isMore ? 'el-icon-arrow-right' : 'el-icon-arrow-down'"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      isMore: false
    };
  },
  props: {
    getList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 查看更多
    onIsMore() {
      this.isMore = !this.isMore;
      this.isShow = !this.isShow;
    },

    tabClick(data, key, k) {
      // 添加 active ==> true 显示 `active样式`
      this.getList[k].childer.map(item => {
        item.active = false;
      });
      this.getList[k].childer[key].active = true;

      // 选中的数据
      let newArray = [];
      this.getList.map(data => {
        data.childer.map(item => {
          if (item.active == true) {
            newArray.push(item);
          }
        });
      });
      this.$emit("get-sel-data", newArray);
    }
  }
};
</script>

<style scoped>
.filter {
  margin-bottom: 15px;
  min-height: 140px;
  height: auto !important;
  height: 140px;
  font-size: 14px;
}

.filter-warp {
  display: flex;
  max-width: 1200px;
  margin: auto;
  height: 100%;
  flex-direction: column;
  padding: 15px 0;
}

.filter-flex {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #cccccc;
}

.filter-flex:last-of-type {
  margin-bottom: 0;
}

.filter-title {
  flex-basis: 70px;
  margin-top: 5px;
}

.filter-content {
  display: flex;
  flex: 1;
}

.filter-tab {
  flex: 1;
  margin-right: 15px;
  height: 35px;
  overflow: hidden;
}

.filter-tab span {
  display: inline-block;
  margin: 0 5px 15px 5px;
  cursor: pointer;
  padding: 5px 10px;
  color: #666;
}

.filter-more {
  margin-top: 5px;
  cursor: pointer;
}

.filter-active {
  background-color: #09f;
  color: white !important;
  border-radius: 3px;
}

.filter-tab span:hover {
  background-color: #09f;
  color: white;
  border-radius: 3px;
}

.filter-hide {
  min-height: 35px;
  height: auto !important;
}
</style>


