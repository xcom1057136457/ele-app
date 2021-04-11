<template>
  <div>
    <navBar isLeft title="兑换红包"></navBar>
    <div class="detailWrapper">
      <van-form @submit="onSubmit">
        <van-field
          v-model="params.exchange_code"
          name="exchange_code"
          label="兑换码"
          placeholder="兑换码"
          :rules="[{ required: true, message: '请填写兑换码' }]"
        />
        <van-field
          v-model.number="params.captcha_code"
          type="number"
          name="captcha_code"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #extra>
            <van-image
              @click.native="getCaptchasHandler"
              class="captchasWrapper"
              :src="captchasURL"
            />
          </template>
        </van-field>
        <div class="btnsWrapper">
          <van-button block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { getCaptchas, exchangeGift } from "@/api/index";
export default {
  data() {
    return {
      params: {},
      captchasURL: ""
    };
  },
  computed: {},
  methods: {
    async onSubmit() {
      let { status, message } = await exchangeGift(this.params);
      if (status == 1) {
        this.$toast.success(message);
        this.$router.go(-1);
      } else {
        this.$toast.fail(message);
        this.params = {};
      }
    },
    // 获取验证码
    async getCaptchasHandler() {
      let response = await getCaptchas();
      this.captchasURL = response.code;
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.getCaptchasHandler();
  }
};
</script>

<style lang="less" scoped>
.detailWrapper {
  height: calc(100vh - 46px);
}
.btnsWrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: #fff;
}
</style>
