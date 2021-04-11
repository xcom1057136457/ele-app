<template>
  <div>
    <navBar title="服务中心" isLeft></navBar>
    <div class="topWrapper">
      <div @click="testHandler">
        <div>
          <van-icon name="friends" />
        </div>
        <div>在线客服</div>
      </div>

      <div @click="testHandler">
        <div>
          <van-icon name="phone" />
        </div>
        <div>在线客服</div>
      </div>
    </div>

    <div class="bottomWrapper">
      <div>热门活动</div>
      <div>
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item :title="serviceList.activityCaption" name="1">
            {{ serviceList.activityContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.anonymousBuyCaption" name="2">
            {{ serviceList.anonymousBuyContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.balanceCaption" name="4">
            {{ serviceList.balanceContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.businessCaption" name="5">
            {{ serviceList.businessContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.couponCaption" name="6">
            {{ serviceList.couponContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.disclaimerCaption" name="7">
            {{ serviceList.disclaimerContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.discountCaption" name="8">
            {{ serviceList.discountContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.forgotCaption" name="9">
            {{ serviceList.forgotContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.freshmanCaption" name="10">
            {{ serviceList.freshmanContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.hongbaoCaption" name="11">
            {{ serviceList.hongbaoContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.memberCaption" name="12">
            {{ serviceList.memberContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.memberFullCutCaption" name="13">
            {{ serviceList.memberFullCutContent }}
          </van-collapse-item>

          <van-collapse-item :title="serviceList.memberPartCutCaption" name="14">
            {{ serviceList.memberPartCutContent }}
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { service } from "@/api/index";
export default {
  data() {
    return {
      activeNames: "",
      serviceList: {}
    };
  },
  methods: {
    async serviceHandler() {
      let response = await service();
      this.serviceList = response;
    },
    testHandler() {
      this.$toast.fail('暂无此功能！')
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.serviceHandler();
  }
};
</script>

<style lang="less" scoped>
.topWrapper {
  background-color: #fff;
  height: 100px;
  display: flex;
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:nth-child(1) {
      > div {
        &:nth-child(1) {
          color: orange;
          font-size: 30px;
        }
        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }

    &:nth-child(2) {
      > div {
        &:nth-child(1) {
          color: green;
          font-size: 30px;
        }
        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }
  }
}

.bottomWrapper {
  margin-top: 10px;
  background-color: #fff;
  > div {
    &:nth-child(1) {
      font-size: 18px;
      font-weight: bold;
      padding: 10px 20px;
    }
  }
}
</style>
