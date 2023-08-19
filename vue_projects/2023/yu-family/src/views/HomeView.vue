<script setup lang="ts">
import TreeChart from "vue-tree-chart-3";
import { reactive, ref } from "vue";
import ChildView from "./ChildView.vue";

const treeData = reactive({
  name: "余其彩",
  image_url: "",
  mate: [
    {
      name: "杨永秀",
      image_url: "",
    },
  ],
  children: [
    {
      name: "余昌贵",
      mate: [
        {
          name: "周海芳",
        },
      ],
      children: [
        {
          name: "余盛江",
          mate: [
            {
              name: "陈配妃",
            },
          ],
          children: [
            {
              name: "余俊毅",
            },
            {
              name: "余紫慧",
            },
          ],
        },
        {
          name: "余冬梅",
          mate: [
            {
              name: "",
            },
          ],
        },
      ],
    },
    {
      name: "余昌东",
      mate: [
        {
          name: "刘坤容",
        },
      ],
      children: [
        {
          name: "余盛宇",
          mate: [
            {
              name: "黄御瑕",
            },
          ],
          children: [
            {
              name: "余筱菁",
            },
          ],
        },
        {
          name: "余佩珊",
        },
      ],
    },
    {
      name: "余贤芳",
      mate: [
        {
          name: "翁敬仪",
        },
      ],
      children: [
        {
          name: "翁菲宏",
        },
      ],
    },
    {
      name: "余美芳",
      mate: [
        {
          name: "黄伦坚",
        },
      ],
      children: [
        {
          name: "黄晓岚",
        },
        {
          name: "黄晓曦",
        },
      ],
    },
  ],
});
const isTrue = ref(true);
const textData = reactive({ age: 1, title: "yusy" });
</script>

<template>
  <main>
    <TreeChart :json="treeData" />
    <span v-show="isTrue">哟哟哟</span>
    <button @click="isTrue = !isTrue">显示、隐藏</button>
  </main>
  <ChildView :text="textData" />
</template>
<style scoped>
span {
  display: inline !important;
}
</style>
