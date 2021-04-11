<template>
  <div>
    <navBar title="我的"></navBar>
    <div class="myWrapper" @click="loginHandler">
      <div>
        <div>
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
        </div>
        <div>
          <div>
            <div v-if="!userInfo.username">
              <span>登录</span>
              <span>/</span>
              <span>注册</span>
            </div>
            <div v-else>
              {{ userInfo.username }}
            </div>
          </div>
          <div>
            <div><van-icon name="points" /></div>
            <div>暂无绑定手机号码</div>
          </div>
        </div>
      </div>
      <div>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="infoWrapper">
      <div @click="goMyBanlance">
        <div>
          <span>{{ userInfo.balance ? userInfo.balance : "0.00" }}</span>
          <span>元</span>
        </div>
        <div>我的余额</div>
      </div>

      <div @click="goGiftDetail">
        <div>
          <span>{{ userInfo.gift_amount ? userInfo.gift_amount : "0" }}</span>
          <span>个</span>
        </div>
        <div>我的优惠</div>
      </div>

      <div @click="goIntegralDetail">
        <div>
          <span>{{ userInfo.point ? userInfo.point : "0" }}</span>
          <span>分</span>
        </div>
        <div>我的积分</div>
      </div>
    </div>

    <div class="cellWrapper">
      <van-cell-group>
        <van-cell title="我的订单" is-link icon="orders-o" @click="goOrder" />
        <van-cell title="积分商城" is-link icon="cart-o" @click="downHandler" />
        <van-cell
          title="饿了么会员卡"
          is-link
          icon="debit-pay"
          @click="goVip"
        />
      </van-cell-group>

      <van-cell-group>
        <van-cell
          title="服务中心"
          is-link
          icon="question-o"
          @click="goService"
        />
        <van-cell
          title="下载饿了么App"
          is-link
          icon="down"
          @click="downHandler"
        />
      </van-cell-group>

      <van-cell-group v-if="userInfo.id">
        <van-cell
          @click="logoutHandler"
          clickable
          title="退出登录"
          is-link
          icon="cross"
        ></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { mapState, mapActions } from "vuex";
import { logout } from "@/api/index";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  methods: {
    ...mapActions('user', ['GetUserInfo']),
    loginHandler() {
      if (!this.userInfo.username) {
        this.$router.push({
          name: "login"
        });
      } else {
        this.$router.push({
          name: "userInfo"
        });
      }
    },
    goMyBanlance() {
      if (!this.userInfo.user_id) {
        this.$toast.fail("请先登录");
      } else {
        this.$router.push({
          name: "balanceDetail"
        });
      }
    },
    goGiftDetail() {
      if (!this.userInfo.user_id) {
        this.$toast.fail("请先登录");
      } else {
        this.$router.push({
          name: "giftDetail"
        });
      }
    },
    goIntegralDetail() {
      if (!this.userInfo.user_id) {
        this.$toast.fail("请先登录");
      } else {
        this.$router.push({
          name: "integralDetail"
        });
      }
    },
    goOrder() {
      if (!this.userInfo.user_id) {
        this.$toast.fail("请先登录");
      } else {
        this.$router.push({
          name: "order"
        });
      }
    },
    goVip() {
      if (!this.userInfo.user_id) {
        this.$toast.fail("请先登录");
      } else {
        this.$router.push({
          name: "vip"
        });
      }
    },
    goService() {
      this.$router.push({
        name: "service"
      });
    },
    downHandler() {
      this.$toast.fail("暂无此功能！");
    },
    logoutHandler() {
      this.$dialog
        .confirm({
          message: "是否退出?",
          confirmButtonColor: "#09438f"
        })
        .then(async () => {
          let response = await logout();
          if (response.status == 1) {
            this.$toast.success(response.message)
            this.GetUserInfo({})
          }
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.bottomWrapper {
  min-height: calc(100vh - 46px - 50px);
}

.myWrapper {
  padding: 10px;
  background-color: rgba(9, 67, 143, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  > div {
    &:first-child {
      display: flex;
      > div {
        &:last-child {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          > div {
            flex: 1;
            &:first-child {
              font-size: 18px;
              font-weight: bold;
              > div {
                &:first-child {
                  > span {
                    margin-right: 5px;
                  }
                }
              }
            }
            &:last-child {
              font-size: 14px;
              display: flex;
              align-items: center;
              > div {
                &:first-child {
                  margin-right: 10px;
                  display: flex;
                  align-items: flex-end;
                }
              }
            }
          }
        }
      }
    }
  }
}

.infoWrapper {
  display: flex;
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    background-color: #fff;
    border-right: 1px solid #dedede;
    > div {
      &:first-child {
        > span {
          &:first-child {
            color: orangered;
            font-size: 20px;
            font-weight: bold;
          }
          &:last-child {
            font-size: 16px;
            margin-left: 5px;
          }
        }
      }
      &:last-child {
        font-size: 14px;
        margin-top: 5px;
        color: #666;
      }
    }
  }
}

.cellWrapper {
  margin-top: 10px;
  > .van-cell-group {
    &:nth-child(2) {
      margin-top: 10px;
    }
    ::v-deep &:nth-child(3) {
      margin-top: 10px;
    }
  }
}
</style>
