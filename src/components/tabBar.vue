<template>
  <van-tabbar
    v-model="active"
    @change="onChange"
    :fixed="false"
    active-color="rgba(9, 67, 143, 1)"
    inactive-color="rgba(0, 0, 0, .3)"
  >
    <van-tabbar-item name="home" icon="wap-home">外卖</van-tabbar-item>
    <van-tabbar-item name="search" icon="audio">搜索</van-tabbar-item>
    <van-tabbar-item name="order" icon="bag" v-if="userInfo.id"
      >订单</van-tabbar-item
    >
    <van-tabbar-item name="my" icon="friends">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: this.$route.name
    };
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  methods: {
    onChange(index) {
      this.$router.push({
        name: index
      });
    }
  },
  watch: {
    $route(val, oldVal) {
      this.active = val.name;
    }
  }
};
</script>
