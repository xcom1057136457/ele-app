<template>
  <div>
    <navBar isLeft title="我的优惠"></navBar>
    <van-tabs
      v-model="activeName"
      animated
      swipeable
      color="rgba(9, 67, 143, 1)"
      title-active-color="rgba(9, 67, 143, 1)"
    >
      <van-tab
        v-for="(item, index) in tabOption"
        :title="item.label"
        :name="item.name"
        :key="index"
      >
        <div class="tabWrapper">
          <component :is="item.name"></component>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import hongbao from "./components/hongbao";
import daijin from "./components/daijin";
export default {
  data() {
    return {
      activeName: "hongbao",
      tabOption: [
        {
          label: "红包",
          name: "hongbao"
        },
        {
          label: "商家代价券",
          name: "daijin"
        }
      ]
    };
  },
  methods: {},
  components: {
    navBar,
    hongbao,
    daijin
  },
  mounted() {}
};
</script>

<style lang="less" scoped></style>
