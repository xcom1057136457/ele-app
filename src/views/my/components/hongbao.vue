<template>
  <div class="box">
    <div>
      <div>
        <van-notice-bar
          left-icon="volume-o"
          :text="giftText"
          color="rgba(9, 67, 143, 1)"
          background="#fff"
        />
      </div>
      <div class="detailItem">
        <div v-for="(item, index) in listData" :key="index">
          <div>
            <div>
              <span>￥</span>
              <span>{{ item.amount }}</span>
            </div>
            <div>{{ item.description_map.sum_condition }}</div>
          </div>

          <div>
            <div>{{ item.name }}</div>
            <div>{{ item.description_map.validity_periods }}</div>
            <div>{{ item.description_map.phone }}</div>
          </div>

          <div>
            {{ item.description_map.validity_delta }}
          </div>
        </div>
      </div>

      <div class="history" @click="historyHandler">
        <span>查看历史红包</span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div>
      <div @click="exchangeHandler">兑换红包</div>
      <div @click="shareHandler">推荐有奖</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getGiftDetail } from "@/api/index";
export default {
  data() {
    return {
      listData: []
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    giftText: function() {
      return `有${this.userInfo.gift_amount}个红包即将到期`;
    }
  },
  methods: {
    ...mapActions("global", ["GetLoading"]),
    // 获取红包信息
    async getGiftHandler() {
      let response = await getGiftDetail({
        user_id: this.userInfo.user_id,
        limit: 10,
        offset: 0
      });
      this.listData = response
    },
    historyHandler() {
      this.$router.push({
        name: 'disGiftDetail'
      })
    },
    exchangeHandler() {
      this.$router.push({
        name: 'giftExchange'
      })
    },
    shareHandler() {
      this.$toast.fail('请去App进行此操作！')
    }
  },
  mounted() {
    this.getGiftHandler();
  }
};
</script>

<style lang="less" scoped>
.box {
  min-height: calc(100vh - 46px - 44px);
  display: flex;
  flex-direction: column;
  > div {
    &:first-child {
      flex: 1;
      overflow: auto;
    }
    &:last-child {
      background-color: #fff;
      display: flex;
      > div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        padding: 15px 0;
      }
    }
  }
}

.detailItem {
  > div {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    background-color: #fff;
    margin-bottom: 10px;
    margin: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    &:first-child {
      margin-top: 10px;
    }
    > div {
      &:first-child {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-right: 10px;
        > div {
          &:first-child {
            > span {
              color: red;
              font-weight: bold;
              &:first-child {
                font-size: 16px;
              }
              &:last-child {
                font-size: 25px;
              }
            }
          }

          &:last-child {
            font-size: 12px;
            color: #a3a3a3;
          }
        }
      }

      &:nth-child(2) {
        font-size: 14px;
        margin-right: 10px;
        > div {
          color: #a3a3a3;
          margin-bottom: 5px;
          &:first-child {
            font-size: 16px;
            color: #333;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      &:nth-child(3) {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}

.history {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #a3a3a3;
  margin-top: 20px;
  .van-icon {
    display: flex;
    align-items: flex-end;
  }
}
</style>
