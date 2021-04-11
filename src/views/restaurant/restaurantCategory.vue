<template>
  <div>
    <navBar
      :title="restaurantCategory.name || restaurantCategory.title"
      isLeft
    ></navBar>
    
    <van-sticky :offset-top="46">
      <div class="dropWrapper">
        <van-dropdown-menu active-color="#09438f">
          <van-dropdown-item :title="cateTitle" ref="category">
            <van-row class="cateWrapper">
              <van-col span="12">
                <div
                  v-for="(item, index) in cateList"
                  :key="index"
                  :class="selectIndex == index ? 'checked' : ''"
                  @click="changeCategory(item, index)"
                >
                  <span>{{ item.name }}</span>
                  <span>{{ item.count }}</span>
                </div>
              </van-col>
              <van-col span="12">
                <div v-for="(item, index) in cateDetailList" :key="index">
                  <span>{{ item.name }}</span>
                  <span>{{ item.count }}</span>
                </div>
              </van-col>
            </van-row>
          </van-dropdown-item>
          <van-dropdown-item
            v-model="sortValue"
            :options="option"
            @change="dropHandler"
          />
        </van-dropdown-menu>
      </div>
    </van-sticky>

    <div class="detailWrapper">
      <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
        <van-list
          v-model="loadLoading"
          :finished="loadFinish"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="detailItem"
            v-for="(item, index) in restaurantData"
            :key="index"
            @click="goDetail(item)"
          >
            <div>
              <van-image
                lazy-load
                fit="cover"
                :src="'http://elm.cangdu.org/img/' + item.image_path"
              />
            </div>
            <div>
              <div>
                <div>
                  <span>品牌</span>
                  <span>{{ item.name }}</span>
                </div>

                <div>
                  <span
                    v-for="(tagItem, tagIndex) in item.supports"
                    :key="tagIndex"
                    :style="{ color: tagItem.icon_color }"
                  >
                    {{ tagItem.icon_name }}
                  </span>
                </div>
              </div>

              <div>
                <div>
                  <span>
                    <van-rate
                      v-model="item.rating"
                      size="12"
                      allow-half
                      void-icon="star"
                    />
                  </span>
                  <span>{{ item.rating }}</span>
                </div>
                <div>
                  <span>蜂鸟专送</span>
                  <span>准时达</span>
                </div>
              </div>

              <div>
                <span>￥{{ item.float_minimum_order_amount }}起送</span>
                <span>/</span>
                <span>{{ item.piecewise_agent_fee.tips }}</span>
              </div>

              <div>
                <span>地址：</span>
                <span>{{ item.address }}</span>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import navBar from "@/components/navBar";
import { getRetaurantCategory, getRestaurantList } from "@/api/index";
export default {
  data() {
    return {
      sortValue: 4,
      option: [
        { text: "智能排序", value: 4, icon: "star-o" },
        { text: "起送价", value: 1, icon: "balance-o" },
        { text: "配送速度", value: 2, icon: "logistics" },
        { text: "评分", value: 3, icon: "user-o" },
        { text: "距离最近", value: 5, icon: "exchange" },
        { text: "销量最高", value: 6, icon: "fire-o" }
      ],
      cateList: [],
      selectIndex: 0,
      refreshLoading: false,
      loadLoading: false,
      loadFinish: false,
      restaurantData: [],
      params: {
        order_by: 4,
        offset: 0,
        limit: 10
      }
    };
  },
  computed: {
    ...mapState("global", ["restaurantCategory"]),
    ...mapState("user", ["addressDetail"]),
    cateDetailList() {
      if (this.cateList[this.selectIndex]) {
        return this.cateList[this.selectIndex].sub_categories;
      }
    },
    cateTitle() {
      if (this.cateList[this.selectIndex]) {
        return this.cateList[this.selectIndex].name;
      }
    }
  },
  methods: {
    ...mapActions("global", ["GetLoading", "GetRestaurantCategory"]),
    async getRestaurantHandler() {
      let params = {
        latitude: this.addressDetail.latitude,
        longitude: this.addressDetail.longitude
      };
      let response = await getRetaurantCategory(params);
      this.cateList = response;
      await this.resetCateIndex();
    },
    changeCategory(item, index) {
      this.selectIndex = index;
      this.params.offset = 0;
      this.GetRestaurantCategory(item);
      this.$refs.category.toggle(false);
      this.findAll(0);
    },
    resetCateIndex() {
      return new Promise((resolve, reject) => {
        let that = this;
        this.cateList.forEach((item, index, arr) => {
          if (item.name == that.restaurantCategory.title) {
            that.selectIndex = index;
          }
        });
        resolve();
      });
    },
    async findAll(val) {
      let params = this.params;
      params.latitude = this.addressDetail.latitude;
      params.longitude = this.addressDetail.longitude;
      params.restaurant_category_id = this.restaurantCategory.id;
      let response = await getRestaurantList(params);
      if (val == 0) {
        this.restaurantData = response;
        this.refreshLoading = false;
      } else {
        this.restaurantData = this.restaurantData.concat(response);
        this.loadLoading = false;
      }
    },
    onRefresh() {
      this.params.offset = 0;
      this.findAll(0);
    },
    onLoad() {
      this.params.offset += 1;
      this.findAll(1);
    },
    goDetail(data) {
      this.$router.push({
        path: "/restaurantDetail",
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    dropHandler(val) {
      this.params.offset = 0;
      this.params.order_by = val;
      this.findAll(0);
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.getRestaurantHandler();
    this.findAll(0);
  }
};
</script>

<style lang="less" scoped>
.dropWrapper {
  .imageBox {
    width: 40px;
    height: 40px;
    .van-image {
      width: 100%;
      height: 100%;
    }
  }
}

.cateWrapper {
  > .van-col {
    &:nth-child(1) {
      border-right: 1px solid #f0f0f0;
      > div {
        padding: 10px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        span {
          &:nth-child(1) {
            font-size: 14px;
            margin-right: 10px;
          }

          &:nth-child(2) {
            font-size: 12px;
          }
        }
      }
    }

    &:nth-child(2) {
      > div {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f0f0f0;
        > span {
          &:nth-child(1) {
            font-size: 14px;
            margin-right: 10px;
          }

          &:nth-child(2) {
            font-size: 12px;
          }
        }
      }
    }
  }
}

.checked {
  background-color: #09438f;
  color: #fff;
}

.detailItem {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  .van-image {
    width: 90px;
    height: 90px;
  }
  > div {
    &:last-child {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > div {
        flex: 1;
        display: flex;
        font-size: 12px;

        &:first-child {
          justify-content: space-between;
          > div {
            &:first-child {
              > span {
                font-size: 14px;
                &:first-child {
                  display: inline-block;
                  padding: 1px 3px;
                  font-size: 12px;
                  background-color: #09438f;
                  color: #fff;
                  margin-right: 5px;
                }
                &:last-child {
                  font-weight: bold;
                }
              }
            }
            &:last-child {
              > span {
                border: 1px solid #dedede;
                display: inline-block;
                margin-right: 2px;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }

        &:nth-child(2) {
          justify-content: space-between;
          align-items: center;
          > div {
            &:first-child {
              > span {
                &:first-child {
                  display: inline-block;
                  margin-right: 5px;
                }
              }
            }
            &:last-child {
              > span {
                font-size: 10px;
                &:first-child {
                  background-color: #3190e8;
                  color: #fff;
                  padding: 1px 3px;
                  margin-right: 3px;
                }
                &:last-child {
                  border: 1px solid #dedede;
                  padding: 1px 3px;
                }
              }
            }
          }
        }

        &:nth-child(3) {
          align-items: center;
        }

        &:nth-child(4) {
          align-items: flex-end;
          display: flex;
          align-items: center;
          > span {
            &:last-child {
              flex: 1;
            }
          }
        }
      }
    }
  }
}

.detailWrapper {
  background-color: #fff;
}
</style>
