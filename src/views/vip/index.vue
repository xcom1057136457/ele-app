<template>
  <div>
    <navBar title="会员中心" isLeft></navBar>
    <div class="topWrapper">
      {{ "为账户" + userInfo.username + "购买会员" }}
    </div>

    <div class="centerWrapper">
      <div>会员特权</div>
      <div>
        <div class="imageBox">
          <van-image
            fit="cover"
            lazy-load
            :src="require('../../assets/image/vip1.jpg')"
          ></van-image>
        </div>
        <div>
          <div>减免配送费</div>
          <div>每月减免30单，每日可减免3单，每单最高减4元</div>
          <div>蜂鸟专送专享</div>
        </div>
      </div>

      <div>
        <div class="imageBox">
          <van-image
            fit="cover"
            lazy-load
            :src="require('../../assets/image/vip2.jpg')"
          ></van-image>
        </div>
        <div>
          <div>减免配送费</div>
          <div>每月减免30单，每日可减免3单，每单最高减4元</div>
          <div>蜂鸟专送专享</div>
        </div>
      </div>
    </div>

    <div class="vipWrapper">
      <div>开通会员</div>
      <div>
        <div>
          <span>一个月</span>
          <span>￥20</span>
        </div>
        <div @click="payHandler">购买</div>
      </div>
    </div>

    <div class="cellWrapper">
      <van-cell
        is-link
        title="兑换会员"
        value="使用卡号卡密"
        clickable
        @click="useVip"
      ></van-cell>
    </div>

    <div class="cellWrapper">
      <van-cell
        @click="useVip"
        is-link
        title="购买记录"
        value="开发票"
        clickable
      ></van-cell>
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
  methods: {
    useVip() {
      this.$toast.fail('暂无此功能！')
    },
    payHandler() {
      this.$router.push({
        name: 'payMent'
      })
    }
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.topWrapper {
  padding: 10px;
  font-size: 14px;
}

.centerWrapper {
  background-color: #fff;
  > div {
    &:nth-child(1) {
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #f0f0f0;
    }

    &:nth-child(2),
    &:nth-child(3) {
      padding: 10px;
      display: flex;
      > div {
        &:first-child {
          width: 50px;
          width: 50px;
          .van-image {
            width: 100%;
            height: 100%;
          }
        }
        &:last-child {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > div {
            flex: 1;
            font-size: 12px;
            &:first-child {
              font-size: 14px;
              font-weight: bold;
            }

            &:nth-child(2) {
              display: flex;
              align-items: center;
            }

            &:nth-child(3) {
              display: flex;
              align-items: flex-end;
            }
          }
        }
      }
    }
  }
}

.vipWrapper {
  margin-top: 10px;
  background-color: #fff;
  > div {
    &:nth-child(1) {
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #f0f0f0;
    }
    &:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      > div {
        &:nth-child(1) {
          font-size: 16px;
          > span {
            &:nth-child(2) {
              color: red;
            }
          }
        }

        &:nth-child(2) {
          font-size: 14px;
          padding: 5px 15px;
          border: 1px solid #09438f;
          color: #09438f;
          border-radius: 4px;
        }
      }
    }
  }
}

.cellWrapper {
  margin-top: 10px;
}
</style>
