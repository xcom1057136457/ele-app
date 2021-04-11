<template>
  <div>
    <navBar title="登录页" :isLeft="true"></navBar>
    <div class="loginWrapper wrapper">
      <van-form @submit="onSubmit">
        <van-field
          v-model="params.username"
          name="username"
          label="用户名："
          placeholder="请填写用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="params.password"
          type="password"
          name="password"
          label="密码："
          placeholder="请填写密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="btn">
          <van-button block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import navBar from "@/components/navBar";
export default {
  data() {
    return {
      params: {},
    };
  },
  computed: {},
  methods: {
    ...mapActions("user", ["GetUserInfo"]),
    async onSubmit(val) {
      let params = {
        avatar: "default.jpg",
        balance: 0,
        brand_member_new: 0,
        city: "上海",
        current_address_id: 0,
        current_invoice_id: 0,
        delivery_card_expire_days: 0,
        email: "",
        gift_amount: 3,
        id: 55702,
        is_active: 1,
        is_email_valid: false,
        is_mobile_valid: true,
        mobile: "",
        point: 0,
        registe_time: "2020-10-13 15:16",
        user_id: 55702,
        username: this.params.username
      };
      this.GetUserInfo(params);
      this.$router.go(-1);
      this.$toast.success("登陆成功！");
    }
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  height: calc(100vh - 46px);
  background-color: #fff;
  .van-form {
    height: 100%;
    padding-top: 10px;
  }
  .btn {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
  }
}
</style>
