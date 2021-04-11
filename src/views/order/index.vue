<template>
  <div>
    <navBar title="订单列表"></navBar>
    <div class="emptyWrapper" v-if="listData.length == 0">
      <van-empty description="暂无订单" />
    </div>
    <div class="detailWrapper" v-else>
      <div
        v-for="(item, index) in listData"
        :key="index"
        @click="doDetail(item)"
      >
        <div class="imageBox">
          <van-image
            fit="cover"
            :src="'http://elm.cangdu.org/img/' + item.restaurant_image_url"
          ></van-image>
        </div>
        <div>
          <div>
            <div>
              <span>{{ item.restaurant_name }}</span>
              <span>
                <van-icon name="arrow" />
              </span>
            </div>
            <div>已支付</div>
          </div>

          <div>{{ item.formatted_created_at }}</div>

          <div>
            <span>
              {{
                item.basket.group[0][0].name +
                  "等" +
                  item.basket.group[0].length +
                  "件商品"
              }}
            </span>
            <span>{{ "￥" + item.total_amount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { getOrder } from "@/api/index";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      params: {
        limit: 100,
        offset: 0
      },
      listData: []
    };
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  methods: {
    ...mapActions("global", ["GetLoading"]),
    async getOrderHandler(val) {
      this.params.user_id = this.userInfo.user_id;
      let response = await getOrder(this.params);
      if (val == 0) {
        this.listData = response;
      } else {
        this.listData = this.listData.concat(response);
      }
    },
    doDetail(data) {
      this.$router.push({
        path: "/orderDetail",
        query: {
          data: JSON.stringify(data)
        }
      });
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.getOrderHandler(0);
  }
};
</script>

<style lang="less" scoped>
.detailWrapper {
  .imageBox {
    width: 90px;
    height: 90px;
    .van-image {
      width: 100%;
      height: 100%;
    }
  }
  > div {
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    > div {
      &:last-child {
        flex: 1;
        margin-left: 10px;
        > div {
          &:nth-child(1) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            > div {
              &:nth-child(1) {
                display: flex;
                align-items: center;
                > span {
                  margin-right: 5px;
                }
              }

              &:nth-child(2) {
                font-size: 14px;
                color: #a3a3a3;
              }
            }
          }

          &:nth-child(2) {
            font-size: 14px;
            color: #a3a3a3;
            margin-top: 5px;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 5px;
          }

          &:nth-child(3) {
            font-size: 14px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            > span {
              &:last-child {
                color: red;
              }
            }
          }
        }
      }
    }
  }
}
</style>
