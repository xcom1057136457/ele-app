<template>
  <van-nav-bar
    :title="title"
    fixed
    placeholder
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #left v-if="isLeft">
      <van-icon name="arrow-left" />
    </template>

    <template #right v-if="isRight">
      <slot name="right" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return "标题";
      }
    },
    isLeft: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    isRight: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  methods: {
    onClickLeft() {
      if (this.isLeft) {
        this.$router.go(-1);
      }
    },
    onClickRight() {
      if (this.isRight) {
        this.$emit("rightClickHandler");
      }
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep .van-nav-bar {
  height: 46px;
  background-color: rgba(9, 67, 143, 1);
  .van-nav-bar__title,
  .van-nav-bar__left,
  .van-nav-bar__right {
    > i {
      color: #fff;
    }
    color: #fff;
  }
}
</style>
