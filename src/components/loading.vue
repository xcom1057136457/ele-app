<template>
  <van-popup v-model="show" :overlay-style="{ 'background-color': '#fff' }">
    <van-image :src="require('@/assets/image/loading.jpg')"></van-image>
  </van-popup>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      show: false
    };
  },
  watch: {
    isLoading(val) {
      this.show = val
    }
  },
  computed: {
    ...mapState('global', ['isLoading'])
  }
};
</script>

<style lang='less' scoped>
.van-image {
  width: 300px;
  height: 160px;
}
</style>
