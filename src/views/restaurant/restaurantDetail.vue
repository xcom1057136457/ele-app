<template>
  <div>
    <navBar title="餐馆详情" isLeft></navBar>
    <div class="topWrapper" v-if="detailList.id" @click="restaurantDetailHandler">
      <div class="imageBox">
        <van-image
          fit="cover"
          :src="'http://elm.cangdu.org/img/' + detailList.image_path"
          lazy-load
        ></van-image>
      </div>

      <div>
        <div>{{ detailList.name }}</div>
        <div>
          <span>{{ detailList.delivery_mode.text }}</span>
          <span>/</span>
          <span>分钟送达</span>
          <span>/</span>
          <span>{{ detailList.piecewise_agent_fee.tips }}</span>
        </div>
        <div>
          <span>公告：</span>
          <span>{{ detailList.promotion_info }}</span>
        </div>
      </div>

      <div>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="topTabWrapper">
      <van-tabs
        v-model="tabType"
        animated
        swipeable
        color="#09438f"
        title-active-color="#09438f"
      >
        <van-tab title="商品" name="goods">
          <div class="bottomWrapper">
            <goods></goods>
          </div>
        </van-tab>
        <van-tab title="评价" name="comment">
          <div class="bottomWrapper">
            <comment></comment>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { getRestaurantDetail } from "@/api/index";
import goods from './components/goods'
import comment from './components/comment'
import { mapActions } from 'vuex' 
export default {
  data() {
    return {
      detailList: {},
      tabType: "goods"
    };
  },
  methods: {
    ...mapActions('global', ['GetLoading']),
    async getDetailHandler() {
      let shopId = JSON.parse(this.$route.query.data).id;
      let response = await getRestaurantDetail(shopId);
      this.detailList = response;
    },
    restaurantDetailHandler() {
      this.$router.push({
        path: '/restaurantInfo',
        query: {
          data: JSON.stringify(this.detailList)
        }
      })
    }
  },
  components: {
    navBar,
    goods,
    comment
  },
  mounted() {
    this.getDetailHandler();
  }
};
</script>

<style lang="less" scoped>
.topWrapper {
  display: flex;
  padding: 10px;
  background-color: #09438f;
  color: #fff;
  > div {
    &:nth-child(1) {
      width: 80px;
      height: 80px;
      .van-image {
        width: 100%;
        height: 100%;
      }
    }

    &:nth-child(2) {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      > div {
        flex: 1;
        &:nth-child(1) {
          font-size: 16px;
          font-weight: bold;
        }

        &:nth-child(2) {
          font-size: 14px;
        }

        &:nth-child(3) {
          font-size: 12px;
          display: flex;
          align-items: flex-end;
          > span {
            &:last-child {
              flex: 1;
            }
          }
        }
      }
    }

    &:nth-child(3) {
      display: flex;
      align-items: center;
    }
  }
}

.bottomWrapper {
  height: calc(100vh - 46px - 100px - 44px);
}
</style>
