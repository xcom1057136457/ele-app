<template>
  <div>
    <navBar isLeft title="我的余额"></navBar>
    <div class="top">
      <div>
        <div>当前余额</div>
        <div>
          <span>{{ userInfo.balance }}</span>
          <span>元</span>
        </div>
        <div>
          <van-button type="info" block size="small">提现</van-button>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div>交易明细</div>
      <div class="detail">
        <van-empty image="error" description="暂无记录" />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  mounted() {},
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.top {
  padding: 10px;
  background-color: rgba(9, 67, 143, 1);
  > div {
    background-color: #fff;
    border-radius: 4px;
    padding: 10px;
    > div {
      &:first-child {
        font-size: 16px;
      }
      &:nth-child(2) {
        margin-top: 5px;
        > span {
          &:first-child {
            font-size: 30px;
            font-weight: bold;
            margin-right: 5px;
          }
          &:last-child {
            font-size: 16px;
          }
        }
      }
      &:nth-child(3) {
        margin-top: 10px;
      }
    }
  }
}

.bottom {
  padding: 10px;
  > div {
    &:first-child {
      font-size: 16px;
    }
  }
}
</style>
