<template>
  <div class="goodsBox">
    <div class="emptyWrapper" v-if="tabList.length == 0">
      <van-empty image="search" description="暂无物品" />
    </div>

    <div class="sideWrapper" v-if="tabList.length > 0">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="(item, index) in tabList"
          :key="index"
          :title="item.name"
        />
      </van-sidebar>
    </div>

    <div class="detailWrapper" v-if="tabList.length > 0">
      <div class="topWrapper">{{ topTitle }}</div>
      <div class="goodsDetail">
        <div v-for="(item, index) in goodsList" :key="index">
          <div class="bottomImage">
            <van-image
              fit="cover"
              :src="'http://elm.cangdu.org/img/' + item.image_path"
              lazy-load
            ></van-image>
          </div>
          <div>
            <div>{{ item.name }}</div>

            <div>{{ item.description }}</div>

            <div>
              <span>月售{{ item.month_sales }}份</span>
              <span>好评率{{ item.satisfy_rate }}%</span>
            </div>

            <div v-if="item.activity">
              <span>{{ item.activity.image_text }}</span>
            </div>

            <div class="goodsBottom">
              <div>￥{{ item.specfoods[0].price }}</div>
              <div>
                <van-stepper
                  v-model="item.quantity"
                  min="0"
                  default-value="0"
                  theme="round"
                  button-size="15"
                  disable-input
                  @plus="plusHandler(item)"
                  @minus="minusHandler(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <van-submit-bar
        id="submitBar"
        button-type="info"
        :price="price"
        :button-text="submitText"
        :disabled="
          countPrice < restaurantDetail.float_minimum_order_amount
            ? true
            : false
        "
        @submit="onSubmit"
      >
        <template #default>
          <div class="shopCardIcon">
            <van-button
              icon="cart-o"
              type="info"
              round
              :disabled="countPrice > 0 ? false : true"
              @click="popShow = !popShow"
            />
          </div>
        </template>
      </van-submit-bar>
    </div>

    <van-popup v-model="popShow" get-container="#submitBar" position="bottom">
      <div class="popWrapper">
        <div
          v-for="(item, index) in selectData"
          :key="index"
          v-show="item.quantity > 0"
        >
          <div class="popImage">
            <van-image
              fit="cover"
              :src="'http://elm.cangdu.org/img/' + item.image_path"
              lazy-load
            ></van-image>
          </div>
          <div>
            <div>{{ item.name }}</div>
            <div>总数：{{ item.quantity }}</div>
            <div>单价：￥20</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getMenuList, checkout } from "@/api/index.js";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      tabList: [],
      activeKey: "0",
      goodsList: [],
      topTitle: "",
      countPrice: 0,
      restaurantDetail: {},
      selectData: [],
      popShow: false
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    submitText() {
      let price = this.restaurantDetail.float_minimum_order_amount;
      let countPrice = price - this.countPrice;
      if (countPrice <= 0) {
        return "提交订单";
      } else {
        return `还差￥${countPrice}起送`;
      }
    },
    price() {
      return this.countPrice * 100;
    }
  },
  methods: {
    ...mapActions("global", ["GetLoading"]),
    async getMenuList() {
      let shopId = JSON.parse(this.$route.query.data).id;
      let response = await getMenuList({
        restaurant_id: shopId
      });
      if (response.length > 0) {
        this.tabList = response;
        this.topTitle = response[0].name;
        this.goodsList = response[0].foods;
      }
    },
    onChange(val) {
      let dom = document.querySelector(".detailWrapper");
      dom.scrollTop = 0;
      this.goodsList = this.tabList[val].foods;
      this.topTitle = this.tabList[val].name;
      this.goodsList.slice();
    },
    plusHandler(val) {
      let isSave = this.selectData.some((item) => {
        return item.item_id == val.item_id;
      });

      if (isSave) {
        this.selectData.forEach((item, index, arr) => {
          if (item.item_id == val.item_id) {
            item = val;
          }
        });
        this.selectData.slice();
      } else {
        this.selectData.push(val);
      }

      let count = 0;

      setTimeout(() => {
        this.selectData.forEach((item) => {
          let price = Number(item.quantity) * Number(item.specfoods[0].price);
          count += price;
        });

        this.$set(this, "countPrice", count);
      }, 10);
    },
    minusHandler(val) {
      this.plusHandler(val);
    },
    async onSubmit() {
      if (this.userInfo.id) {
        let that = this;
        let entities = [];
        this.selectData.forEach((item) => {
          let params = {};
          if (item.quantity > 0) {
            params = {
              attrs: [],
              extra: {},
              id: item.specfoods[0].food_id,
              name: item.specfoods[0].name,
              packing_fee: item.specfoods[0].packing_fee,
              price: item.specfoods[0].price,
              quantity: item.quantity,
              sku_id: item.specfoods[0].sku_id,
              specs: [""],
              stock: item.specfoods[0].stock
            };
          }
          entities.push(params);
        });

        let params = {
          come_from: "web",
          restaurant_id: this.restaurantDetail.id,
          geohash:
            this.restaurantDetail.latitude +
            "," +
            this.restaurantDetail.longitude,
          entities: [entities]
        };

        let response = await checkout(params);
        this.$router.push({
          path: '/orderComfirm',
          query: {
            data: JSON.stringify(response)
          }
        })
      } else {
        this.$dialog
          .confirm({
            message: "请进行登录，再继续购买!",
            confirmButtonColor: "#09438f"
          })
          .then(() => {
            this.$router.push({
              name: "login"
            });
          })
          .catch(() => {})
      }
    }
  },
  mounted() {
    this.getMenuList();
    this.restaurantDetail = JSON.parse(this.$route.query.data);
  }
};
</script>

<style lang="less" scoped>
.goodsBox {
  height: 100%;
  overflow: auto;
  border-top: 1px solid #f0f0f0;
  display: flex;
  > .detailWrapper {
    flex: 1;
    overflow: auto;
    height: 100%;
    .topWrapper {
      padding: 10px;
    }
  }
  > .sideWrapper {
    height: 100%;
    overflow: auto;
  }
}

.van-sidebar {
  > a {
    &:last-child {
      margin-bottom: 50px;
    }
  }
}

.goodsDetail {
  .bottomImage {
    width: 90px;
    height: 90px;
    > .van-image {
      width: 100%;
      height: 100%;
    }
  }
  > div {
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px;
    display: flex;
    &:last-child {
      margin-bottom: 50px;
    }
    > div {
      &:last-child {
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .goodsBottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 12px;
        }
        > div {
          flex: 1;
          &:nth-child(1) {
            font-size: 14px;
            font-weight: bold;
          }
          &:nth-child(2) {
            font-size: 12px;
            display: flex;
            align-items: center;
          }

          &:nth-child(3) {
            font-size: 12px;
            display: flex;
            align-items: center;
          }

          &:nth-child(4) {
            font-size: 12px;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}

.emptyWrapper {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.van-sidebar-item--select::before {
  background-color: #09438f;
}

.van-button--round {
  border-radius: 4px;
}

.van-submit-bar__button {
  width: unset;
}

.popImage {
  width: 70px;
  height: 70px;
  .van-image {
    width: 100%;
    height: 100%;
  }
}

.popWrapper {
  // padding: 20px;
  > div {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px;
    > div {
      &:last-child {
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        > div {
          flex: 1;
          &:first-child {
            font-size: 16px;
            font-weight: bold;
          }

          &:nth-child(2) {
            font-size: 14px;
            color: #a3a3a3;
          }

          &:last-child {
            font-size: 14px;
            color: #a3a3a3;
            display: flex;
            align-items: flex-end;
          }
        }
      }
    }
  }
}
</style>
