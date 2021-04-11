<template>
  <div>
    <navBar title="订单详情" isLeft></navBar>
    <div class="topWrapper" v-if="detailInfo._doc">
      <div class="imageBox">
        <van-image
          fit="cover"
          lazy-load
          round
          :src="
            'http://elm.cangdu.org/img/' +
              detailInfo._doc['restaurant_image_url']
          "
        />
      </div>

      <div>已支付</div>

      <div @click="goDetail">
        再来一单
      </div>
    </div>

    <div class="detailWrapper" v-if="detailInfo._doc">
      <div>
        <div>
          <van-image
            fit="cover"
            lazy-load
            :src="
              'http://elm.cangdu.org/img/' +
                detailInfo._doc['restaurant_image_url']
            "
          ></van-image>
          <span>效果演示</span>
        </div>

        <div>
          <van-icon name="arrow" />
        </div>
      </div>

      <div>
        <van-cell-group>
          <van-cell
            v-for="(item, index) in detailInfo._doc.basket.group[0]"
            :key="index"
            :title="item.name + ' x ' + item.quantity"
            :value="'￥' + item.price"
          ></van-cell>
          <van-cell
            title="配送费"
            :value="'￥' + detailInfo._doc.basket.deliver_fee['price']"
          ></van-cell>
        </van-cell-group>

        <div>
          {{ "实付" + "￥" + detailInfo._doc["total_amount"].toLocaleString() }}
        </div>
      </div>
    </div>

    <div class="logisticWrapper" v-if="detailInfo">
      <div>配送信息</div>
      <div>
        <div>
          <div>送达时间：</div>
          <div>{{ detailInfo.deliver_time }}</div>
        </div>

        <div>
          <div>送货地址：</div>
          <div>
            <div>{{ detailInfo.consignee }}</div>
            <div>{{ detailInfo.phone }}</div>
          </div>
        </div>

        <div>
          <div>配送方案：</div>
          <div>蜂鸟专送</div>
        </div>
      </div>
    </div>

    <div class="orderInfo" v-if="detailInfo._doc">
      <div>订单信息</div>
      <div>
        <div>
          <div>订单号：</div>
          <div>{{ detailInfo._doc.id }}</div>
        </div>

        <div>
          <div>支付方式：</div>
          <div>{{ detailInfo.pay_method }}</div>
        </div>

        <div>
          <div>下单时间：</div>
          <div>{{ detailInfo._doc.formatted_created_at }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getOrderDetail } from "@/api/index";
import navBar from "@/components/navBar";
export default {
  data() {
    return {
      routeInfo: {},
      detailInfo: {}
    };
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  methods: {
    async getOrderDetail() {
      let response = await getOrderDetail({
        user_id: this.userInfo.id,
        order_id: this.routeInfo.id
      });
      this.detailInfo = response;
    },
    goDetail() {
      this.$toast.fail('暂不支持！')
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.routeInfo = JSON.parse(this.$route.query.data);
    this.getOrderDetail();
  }
};
</script>

<style lang="less" scoped>
.topWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  .imageBox {
    height: 90px;
    width: 90px;
    .van-image {
      width: 100%;
      height: 100%;
    }
  }
  > div {
    &:nth-child(2) {
      margin-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }
    &:nth-child(3) {
      margin-top: 15px;
      padding: 5px 10px;
      border: 1px solid #09438f;
      color: #09438f;
      font-size: 14px;
    }
  }
}

.detailWrapper {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px;

  > div {
    &:nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        &:nth-child(1) {
          display: flex;
          align-items: center;
          .van-image {
            width: 30px;
            height: 30px;
          }
          > span {
            font-size: 16px;
            font-weight: bold;
            margin-left: 10px;
          }
        }
      }
    }
    &:nth-child(2) {
      margin-top: 10px;
      .van-cell {
        padding: 10px 0;
      }
      > div {
        &:last-child {
          display: flex;
          justify-content: flex-end;
          font-size: 14px;
          color: red;
          margin-top: 10px;
        }
      }
    }
  }
}

.logisticWrapper {
  margin-top: 10px;
  background-color: #fff;
  > div {
    &:nth-child(1) {
      font-size: 16px;
      font-weight: bold;
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
    }
    &:nth-child(2) {
      padding: 10px;
      > div {
        display: flex;
        margin-top: 15px;
        &:first-child {
          margin-top: 0;
        }
        &:nth-child(2) {
          > div {
            &:last-child {
              > div {
                &:first-child {
                  margin-bottom: 5px;
                }
              }
            }
          }
        }
        > div {
          &:first-child {
            font-size: 14px;
            font-weight: bold;
            color: #a3a3a3;
          }

          &:last-child {
            font-size: 14px;
          }
        }
      }
    }
  }
}

.orderInfo {
  margin-top: 10px;
  background-color: #fff;
  > div {
    &:nth-child(1) {
      font-size: 16px;
      font-weight: bold;
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
    }
    &:nth-child(2) {
      padding: 10px;
      > div {
        display: flex;
        margin-top: 15px;
        &:first-child {
          margin-top: 0;
        }
        &:nth-child(2) {
          > div {
            &:last-child {
              > div {
                &:first-child {
                  margin-bottom: 5px;
                }
              }
            }
          }
        }
        > div {
          &:first-child {
            font-size: 14px;
            font-weight: bold;
            color: #a3a3a3;
          }

          &:last-child {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
