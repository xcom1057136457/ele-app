<template>
  <div>
    <navBar isLeft title="历史红包"></navBar>
    <vue-scroll
      :ops="ops"
      @refresh-before-deactivate="handleStart"
      @load-before-deactivate="loadStart"
    >
      <div>
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

            <div class="fixed">暂不可用</div>
          </div>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { getExpiredGiftDetail } from "@/api/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      listData: [],
      params: {
        limit: 10,
        offset: 0
      },
      ops: {
        vuescroll: {
          pullRefresh: {
            enable: true,
            tips: {
              deactive: "Pull to Refresh",
              active: "Release to Refresh",
              start: "Refreshing...",
              beforeDeactive: "Refresh Successfully!"
            }
          },
          pushLoad: {
            enable: true,
            tips: {
              deactive: "Push to Load",
              active: "Release to Load",
              start: "Loading...",
              beforeDeactive: "Load Successfully!"
            },
            auto: false,
            autoLoadDistance: 0
          }
        }
      }
    };
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  methods: {
    async getGiftHandler(val) {
      let params = this.params;
      params.user_id = this.userInfo.user_id;
      let response = await getExpiredGiftDetail(params);
      this.listData = [];
      this.listData = response;
    },
    async handleStart(vm, refreshDom, done) {
      this.params.offset = 0;
      let params = this.params;
      params.user_id = this.userInfo.user_id;
      let response = await getExpiredGiftDetail(params);
      this.listData = [];
      this.listData = response;
      setTimeout(() => {
        done();
      }, 300); // load finished
    },
    async loadStart(vm, loadDom, done) {
      this.params.offset += 1;
      let params = this.params;
      params.user_id = this.userInfo.user_id;
      let response = await getExpiredGiftDetail(params);
      this.listData = this.listData.concat(response);
      setTimeout(() => {
        done();
      }, 300);
    }
  },
  mounted() {
    this.getGiftHandler();
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.detailItem {
  > div {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    // background-color: #fff;
    background-color: rgb(255, 255, 255);
    opacity: 0.5;
    margin: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: relative;
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

.fixed {
  position: absolute;
  right: 0;
  top: 25px;
  color: #333 !important;
  font-weight: bold;
  transform: rotate(45deg) !important;
}
</style>
