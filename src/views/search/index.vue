<template>
  <div>
    <navBar title="搜索"></navBar>
    <div class="topWrapper">
      <div>
        <input
          type="text"
          placeholder="请输入商家或者美食名称"
          v-model="keyword"
          @keyup.enter="searchHandler"
        />
      </div>
      <div>
        <div class="btn" @click="searchHandler">提交</div>
      </div>
    </div>
    <div>
      <div class="empty" v-if="searchList.length == 0">
        <van-empty image="search" description="暂无结果！" />
      </div>

      <div class="detailItem" v-else>
        <div
          v-for="(item, index) in searchList"
          :key="index"
          @click="goDetail(item)"
        >
          <div class="imageBox">
            <van-image
              fit="cover"
              lazy-load
              :src="'http://elm.cangdu.org/img/' + item.image_path"
            ></van-image>
          </div>

          <div>
            <div>{{ item.name }}</div>
            <div>{{ "月售" + item.recent_order_num + "单" }}</div>
            <div>
              <span>{{ item.float_minimum_order_amount + "元起送" }}</span>
              <span>/</span>
              <span>{{ "距离" + item.distance }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { mapState } from "vuex";
import { search } from "@/api/index";
export default {
  data() {
    return {
      keyword: "",
      searchList: []
    };
  },
  computed: {
    ...mapState("user", ["addressDetail"])
  },
  watch: {
    keyword(val) {
      if (val == "") {
        this.searchList = [];
      }
    }
  },
  methods: {
    async searchHandler() {
      if (this.keyword != "") {
        let params = {
          geohash:
            this.addressDetail.latitude + "," + this.addressDetail.longitude,
          keyword: this.keyword
        };
        let response = await search(params);
        if (response.status != 0) {
          this.searchList = response;
        }
      }
    },
    goDetail(item) {
      this.$router.push({
        path: "/restaurantDetail",
        query: {
          data: JSON.stringify(item)
        }
      });
    }
  },
  components: {
    navBar
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.topWrapper {
  padding: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  > div {
    &:first-child {
      flex: 1;
      > input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #09438f;
        padding: 5px 10px;
      }
    }

    &:last-child {
      box-sizing: border-box;
      margin-left: 10px;
      padding: 8px 15px;
      background-color: #09438f;
      color: #fff;
      font-size: 14px;
    }
  }
}

.detailItem {
  padding: 10px;
  background-color: #fff;
  > div {
    display: flex;
    margin-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 10px;
    > div {
      &:last-child {
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        > div {
          flex: 1;
          &:nth-child(1) {
            font-size: 14px;
            font-weight: bold;
          }

          &:nth-child(2) {
            font-size: 12px;
            color: #a3a3a3;
            display: flex;
            align-items: center;
          }

          &:nth-child(3) {
            display: flex;
            align-items: flex-end;
            font-size: 12px;
            color: #a3a3a3;
            > span {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .imageBox {
    width: 80px;
    height: 80px;
    .van-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
