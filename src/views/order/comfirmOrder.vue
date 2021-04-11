<template>
  <div class="box">
    <navBar title="确认订单" isLeft></navBar>
    <div>
      <div
        class="topAddress"
        v-if="selectAddress.id"
        @click="selectAddressHandler"
      >
        <div>
          <van-icon name="location-o" />
        </div>

        <div>
          <div>
            <span>{{ selectAddress.name }}</span>
            <span>{{ selectAddress.sex == 1 ? "先生" : "女士" }}</span>
            <span>{{ selectAddress.phone }}</span>
          </div>

          <div>
            <span>
              <van-tag type="primary">{{ selectAddress.tag }}</van-tag>
            </span>
            <span>{{
              selectAddress.address + " " + selectAddress.address_detail
            }}</span>
          </div>
        </div>

        <div>
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="arriveTime">
        <div>送达时间</div>
        <div>
          <div>
            <span>尽快送达</span>
            <span>|</span>
            <span>预计 16:18</span>
          </div>

          <div>
            <van-tag color="#09438f">蜂鸟专送</van-tag>
          </div>
        </div>
      </div>

      <div class="centerCell">
        <van-cell-group>
          <van-cell
            is-link
            title="支付方式"
            :value="payType == 1 ? '货到付款' : '在线支付'"
            @click="payShow = !payShow"
          ></van-cell>
          <van-cell title="红包" value="暂时只在饿了么App中支持"></van-cell>
        </van-cell-group>
      </div>

      <div class="goodsWrapper" v-if="routeInfo.cart">
        <div class="shopWrapper">
          <div>
            <van-image
              fit="cover"
              :src="
                'http://elm.cangdu.org/img/' +
                  routeInfo.cart.restaurant_info.image_path
              "
              lazy-load
            ></van-image>
          </div>

          <div>{{ routeInfo.cart.restaurant_info.name }}</div>
        </div>

        <div class="goodsDetail">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in routeInfo.cart.groups[0]"
              :key="index"
              :title="item.name + ' x ' + item.quantity"
              :value="'￥' + item.price"
            ></van-cell>
            <van-cell title="餐盒" value="￥1"></van-cell>
            <van-cell
              title="配送费"
              :value="'￥' + routeInfo.cart.deliver_amount"
            ></van-cell>
            <van-cell
              title="订单"
              :value="'待支付' + '￥' + routeInfo.cart.original_total"
            ></van-cell>
          </van-cell-group>
        </div>
      </div>

      <div class="orderWrapper">
        <van-cell-group>
          <van-cell
            title="订单备注"
            is-link
            value="口味、偏好等"
            clickable
            @click="writeMarkHandler"
          ></van-cell>
          <van-cell title="发票抬头" is-link value="不需要开发票"></van-cell>
        </van-cell-group>
      </div>
    </div>

    <div class="comfirBar" v-if="routeInfo.cart">
      <div>待支付 ￥{{ routeInfo.cart.original_total }}</div>
      <div class="btn" @click="submitHandler">
        确认下单
      </div>
    </div>

    <!-- 支付方式弹窗 -->
    <van-popup v-model="payShow" position="bottom" :style="{ height: '30%' }">
      <div class="payPop">
        <div>支付方式</div>
        <div v-if="routeInfo.cart">
          <van-radio-group v-model="payType">
            <van-cell-group>
              <van-cell
                :title="
                  routeInfo.cart.is_ontime_available == 0
                    ? '货到付款(商家不支持货到付款)'
                    : '货到付款'
                "
                clickable
                @click="payType = '1'"
                :class="
                  routeInfo.cart.is_ontime_available == 0 ? 'disableCell' : ''
                "
              >
                <template #right-icon>
                  <van-radio
                    name="1"
                    :disabled="
                      routeInfo.cart.is_ontime_available == 0 ? true : false
                    "
                  />
                </template>
              </van-cell>
              <van-cell
                :title="
                  routeInfo.cart.is_online_paid == 0
                    ? '在线支付(商家不支持货到付款)'
                    : '在线支付'
                "
                clickable
                @click="payType = '2'"
                :class="routeInfo.cart.is_online_paid == 0 ? 'disableCell' : ''"
              >
                <template #right-icon>
                  <van-radio
                    name="2"
                    :disabled="
                      routeInfo.cart.is_online_paid == 0 ? true : false
                    "
                  />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAddress } from "@/api/index";
import { mapState, mapGetters, mapActions } from "vuex";
import navBar from "@/components/navBar";
import { placeOrder } from "@/api/index"
export default {
  data() {
    return {
      routeInfo: {},
      payShow: false,
      payType: "2"
    };
  },
  computed: {
    ...mapState("user", ["userInfo", "addressDetail"]),
    ...mapState('global', ['mark']),
    ...mapGetters("global", ["selectAddress"])
  },
  methods: {
    ...mapActions('global', ['GetAddress']),
    writeMarkHandler() {
      this.$router.push({
        path: "/writeMark",
        query: {
          data: this.routeInfo.cart.id
        }
      });
    },
    selectAddressHandler() {
      this.$router.push({
        name: "selectAddress"
      });
    },
    async submitHandler() {
      let params = {
        user_id: this.userInfo.id,
        cart_id: this.routeInfo.cart.id,
        address_id: this.selectAddress.id,
        restaurant_id: this.routeInfo.cart.restaurant_id,
        geohash: this.addressDetail.latitude + ',' + this.addressDetail.longitude,
        description: this.mark,
        entities: this.routeInfo.cart.groups
      }
      let response = await placeOrder(params)
      if (response.status == 1) {
        this.$router.push({
          name: 'payMent',
        })
      }  
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.GetAddress()
    this.routeInfo = JSON.parse(this.$route.query.data);
  }
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  box-sizing: border-box;
  > div {
    &:nth-child(2) {
      flex: 1;
    }
  }
}

.topAddress {
  background-color: #fff;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  > div {
    &:nth-child(1) {
      color: #09438f;
      font-size: 20px;
      font-weight: bold;
    }
    &:nth-child(2) {
      flex: 1;
      padding-left: 10px;
      > div {
        &:first-child {
          margin-bottom: 5px;
          > span {
            &:nth-child(1) {
              font-size: 18px;
              font-weight: bold;
            }
            &:nth-child(2) {
              font-size: 14px;
              margin-left: 5px;
            }
            &:nth-child(3) {
              font-size: 14px;
              color: #a3a3a3;
              margin-left: 5px;
            }
          }
        }

        &:last-child {
          display: flex;
          align-items: flex-end;
          font-size: 14px;
          > span {
            display: inline-block;
            margin-right: 5px;
            &:last-child {
              color: #a3a3a3;
            }
          }
        }
      }
    }
  }
}

.arriveTime {
  padding: 15px 10px;
  background-color: #fff;
  margin-top: 10px;
  border-left: 2px solid #09438f;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    &:nth-child(1) {
      font-size: 16px;
      font-weight: bold;
    }

    &:nth-child(2) {
      > div {
        &:first-child {
          margin-bottom: 8px;
          > span {
            margin-right: 5px;
            color: #09438f;
            &:last-child {
              margin-right: 0;
            }
          }
        }

        &:last-child {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}

.centerCell {
  margin-top: 10px;
}

.goodsWrapper {
  margin-top: 10px;
  background-color: #fff;
  padding: 15px 10px 0 10px;
  .shopWrapper {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 15px;
    > div {
      &:first-child {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        .van-image {
          width: 100%;
          height: 100%;
        }
      }

      &:last-child {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  .goodsDetail {
    .van-cell {
      padding: 10px 0;
    }
  }
}

.orderWrapper {
  margin-top: 10px;
}

.comfirBar {
  padding-left: 10px;
  height: 50px;
  background-color: #3c3c3c;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .btn {
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #56d176;
  }
}

.payPop {
  > div {
    &:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      background-color: #fafafa;
    }
    &:nth-child(2) {
      margin-top: 10px;
    }
  }
}

.disableCell {
  background-color: #f9f9f9;
  pointer-events: none;
}
</style>
