<template>
  <div>
    <navBar title="个人信息" :isLeft="true"></navBar>
    <div class="detail">
      <van-cell-group>
        <van-cell title="头像" center size="large">
          <template #extra>
            <van-image
              round
              width="3rem"
              height="3rem"
              :src="
                userInfo.avatar
                  ? 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1641925520,3949603965&fm=26&gp=0.jpg'
                  : 'https://img.yzcdn.cn/vant/cat.jpeg'
              "
            />
          </template>
        </van-cell>

        <van-cell title="用户名" :value="userInfo.username" is-link />
        <van-cell title="收货地址" is-link @click="addressHandler" />
      </van-cell-group>

      <div class="bindWrapper">账号绑定</div>
      <van-cell-group>
        <van-cell title="手机" is-link icon="aim" @click="mobileHandler" />
      </van-cell-group>

      <div class="bindWrapper">安全设置</div>
      <van-cell-group>
        <van-cell title="登陆密码" is-link value="修改" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { getUserInfo } from "@/api/index";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    // 获取信息
    async getInfoHandler() {
      let response = await getUserInfo();
      this.userInfo = response;
    },
    // 手机绑定
    mobileHandler() {
      this.$toast.fail("请去App绑定！");
    },
    // 收货地址
    addressHandler() {
      this.$router.push({
        name: "address"
      });
    }
  },
  mounted() {
    this.getInfoHandler();
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.bindWrapper {
  padding: 20px 10px 10px 10px;
  background-color: #f9f9f9;
  font-size: 14px;
  font-weight: bold;
}
</style>
