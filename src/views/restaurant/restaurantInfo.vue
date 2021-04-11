<template>
  <div>
    <navBar title="商家详情" isLeft></navBar>
    <div class="topWrapper">
      <div>活动与属性</div>
      <div>
        <div v-for="(item, index) in detailInfo.supports" :key="index">
          <span :style="{ 'background-color': '#' + item.icon_color }">{{
            item.icon_name
          }}</span>
          <span>{{ item.description }}</span>
        </div>
      </div>
    </div>

    <div class="centerWrapper">
      <div>食品监督安全公示</div>
      <div>
        <div>
          <van-icon name="smile" />
        </div>

        <div>
          <div>
            <span>监督情况：</span>
            <span>良好</span>
          </div>
          <div>
            <span>检查日期：</span>
            <span>{{ new Date().toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bottomWrapper" v-if="detailInfo">
      <div>商家信息</div>
      <div>
        <div>{{ detailInfo.name }}</div>
        <div>
          <span>地址：</span>
          <span>{{ detailInfo.address }}</span>
        </div>
        <div v-if="detailInfo.opening_hours">
          <span>商家营业时间：</span>
          <span>{{ detailInfo.opening_hours[0] }}</span>
        </div>
        <van-cell-group>
          <van-cell
            title="商家营业信息"
            is-link
            clickable
            @click="previewHandler(1)"
          />
          <van-cell
            title="餐饮服务证许可证"
            is-link
            clickable
            @click="previewHandler(2)"
          />
        </van-cell-group>
      </div>
    </div>

    <van-image-preview v-model="show" :images="images" />
  </div>
</template>

<script>
import navBar from "@/components/navBar";
export default {
  data() {
    return {
      detailInfo: {},
      images: [],
      show: false
    };
  },
  methods: {
    previewHandler(index) {
      if (index == 1) {
        this.images = [
          "http://elm.cangdu.org/img/" +
            this.detailInfo.license.business_license_image
        ];
      } else {
        this.images = [
          "http://elm.cangdu.org/img/" +
            this.detailInfo.license.catering_service_license_image
        ];
      }
      this.show = true;
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.detailInfo = JSON.parse(this.$route.query.data);
  }
};
</script>

<style lang="less" scoped>
.topWrapper {
  background-color: #fff;
  > div {
    &:nth-child(1) {
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #f0f0f0;
    }

    &:nth-child(2) {
      padding: 10px;
      > div {
        margin-bottom: 10px;
        > span {
          &:nth-child(1) {
            font-size: 12px;
            color: #fff;
            padding: 2px;
          }
          &:nth-child(2) {
            font-size: 14px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}

.centerWrapper {
  margin-top: 10px;
  background-color: #fff;
  > div {
    &:first-child {
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 16px;
      font-weight: bold;
    }

    &:last-child {
      padding: 10px;
      display: flex;
      > div {
        &:nth-child(1) {
          font-size: 50px;
          color: rgb(126, 211, 33);
        }

        &:nth-child(2) {
          flex: 1;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          > div {
            flex: 1;
            font-size: 14px;
            &:nth-child(1) {
              > span {
                &:last-child {
                  color: rgb(126, 211, 33);
                }
              }
            }
          }
        }
      }
    }
  }
}

.bottomWrapper {
  margin-top: 10px;
  background-color: #fff;
  > div {
    &:first-child {
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 16px;
      font-weight: bold;
    }

    &:last-child {
      padding: 10px 10px 0 10px;
      > div {
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 10px;
        font-size: 14px;
        &:not(:first-child) {
          padding: 10px 0;
        }
        &:nth-child(3) {
          border-bottom: none;
        }
        &:nth-child(4) {
          padding: 0;
          border-bottom: none;
          .van-cell {
            padding: 10px 0;
          }
        }
      }
    }
  }
}
</style>
