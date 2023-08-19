<template>
  <div class="product-content">
    <div class="main-warp">
      <div class="main-box">
        <div class="box" v-for="(val,key) in list" :key="key">
          <div class="pic">
            <div class="title">{{key+1}}、{{val.title}}</div>
            <div class="children">
              <div class="link" v-for="(v,k) in val.children" :key="k">
                <div class="a-link" @click="$router.push('/home/outLandDemo')">{{v.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setCatalogData } from "@/falseData/json";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    setCatalogData(res => {
      this.list = res;
    });
  }
};
</script>
<style lang="scss" scoped>
.product-content {
  width: 100%;
  background: #f5f5f5;
  padding: 20px 0;
  box-sizing: border-box;
  .main-warp {
    width: 1200px;
    height: auto;
    overflow: hidden;
    margin: auto;
    background: white;
    padding: 15px;
    box-sizing: border-box;
    .main-box {
      width: 100%;
      margin: 10px auto;
      column-count: 4;
      column-gap: 10px;
      .box {
        height: 100%;
        width: 100%;
        .pic {
          .title {
            margin-bottom: 10px;
            color: #09f;
            font-size: 14px;
          }
          .children {
            width: 100%;
            line-height: 30px;
            margin-bottom: 30px;
            .link {
              color: #444444;
              display: flex;
              .a-link {
                cursor: pointer;
                display: inline-block;
                &:hover {
                  color: #0094e7 !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
