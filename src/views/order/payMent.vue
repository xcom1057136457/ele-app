<template>
  <div class="box">
    <navBar title="在线支付"></navBar>
    <div class="topWrapper">
      <div>支付剩余时间</div>
      <div>
        <van-count-down :time="1500000" />
      </div>
    </div>

    <div class="payWrapper">
      <div>选择支付方式</div>
      <div>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="支付宝" clickable @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="微信" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </div>

    <div class="btn">
      <van-button block type="info" @click="payHandler">确认支付</van-button>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { mapActions } from "vuex"
export default {
  data() {
    return {
      radio: "1"
    };
  },
  methods: {
    ...mapActions("global", ["GetMark"]),
    payHandler() {
      this.$router.push({
        name: 'order'
      })
      this.$toast.success('支付成功！')
      this.GetMark("")
    }
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.topWrapper {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 130px;
  > div {
    &:nth-child(1) {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    &:nth-child(2) {
      > div {
        font-size: 30px;
        color: #09438f;
      }
    }
  }
}

.payWrapper {
  > div {
    &:nth-child(1) {
      padding: 10px;
    }
  }
}

.btn {
  padding: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}

.box {
  height: 100%;
}
</style>
