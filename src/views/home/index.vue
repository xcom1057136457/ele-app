<template>
  <div>
    <navBar title="首页"></navBar>
    <div class="imageWrapper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in imageList" :key="index">
          <van-image :src="item" fit="cover"></van-image>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="gridWrapper">
      <van-swipe :loop="true" indicator-color="black">
        <van-swipe-item>
          <van-grid>
            <van-grid-item
              :text="item.title"
              v-for="(item, index) in gridList1"
              :key="index"
              @click="goCategoryHandler(item)"
            >
              <template #icon>
                <van-image
                  width="9vw"
                  height="9vw"
                  fit="contain"
                  :src="item.image_url"
                />
              </template>
            </van-grid-item>
          </van-grid>
        </van-swipe-item>
        <van-swipe-item>
          <van-grid>
            <van-grid-item
              :text="item.title"
              v-for="(item, index) in gridList2"
              :key="index"
              @click="goCategoryHandler(item)"
            >
              <template #icon>
                <van-image
                  width="9vw"
                  height="9vw"
                  fit="contain"
                  :src="item.image_url"
                />
              </template>
            </van-grid-item>
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="resWrapper">
      <div class="topWrapper">
        <div>
          <van-icon name="shop-o" />
          <span>附近商家</span>
        </div>

        <div class="classify">
          <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item
              v-model="params.order_by"
              :options="sortOption"
              @change="dropHandler"
            />
          </van-dropdown-menu>
        </div>
      </div>

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
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { getFoodList } from "@/api/index";
import { mapState } from "vuex";
import { getRestaurantList } from "@/api/index";
import axios from "axios";
import { mapActions } from 'vuex' 
export default {
  data() {
    return {
      imageList: [
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1019096323,2410908560&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1577629086,1023767695&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1339543536,3211134024&fm=26&gp=0.jpg"
      ],
      gridList1: [],
      gridList2: [],
      params: {
        order_by: 4,
        offset: 0,
        limit: 10
      },
      sortOption: [
        { text: "默认排序", value: 4 },
        { text: "起送价", value: 1 },
        { text: "配送速度", value: 2 },
        { text: "评分", value: 3 },
        { text: "距离最近", value: 5 },
        { text: "销量最高", value: 6 }
      ],
      restaurantData: [],
      test: 3,
      refreshLoading: false,
      loadLoading: false,
      loadFinish: false
    };
  },
  computed: {
    ...mapState("user", ["addressDetail", "userInfo"])
  },
  methods: {
    ...mapActions('global', ['GetLoading', 'GetRestaurantCategory']),
    async getFoodListHandler() {
      let response = await getFoodList();
      response.forEach((item) => {
        item.image_url = "https://fuss10.elemecdn.com" + item.image_url;
      });
      for (let i = 0; i <= 7; i++) {
        this.gridList1.push(response[i]);
      }
      for (let i = 8; i < response.length; i++) {
        this.gridList2.push(response[i]);
      }
    },
    async findAll(val) {
      let params = this.params;
      params.latitude = this.addressDetail.latitude;
      params.longitude = this.addressDetail.longitude;
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
    dropHandler(val) {
      this.params.offset = 0;
      this.params.order_by = val;
      this.findAll(0);
    },
    goDetail(data) {
      this.$router.push({
        path: "/restaurantDetail",
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    goCategoryHandler(data) {
      this.$router.push({
        name: 'restaurantCategory'
      })
      this.GetRestaurantCategory(data)
    }
  },
  mounted() {
    this.getFoodListHandler();
    if (this.addressDetail.id) {
      this.findAll();
    }
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  overflow: hidden;
  > .van-image {
    height: 150px;
    overflow: hidden;
    border-radius: 8px;
  }
}

.my-swipe {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.imageWrapper {
  background-color: rgba(9, 67, 143, 1);
  padding: 10px 10px;
  .van-image {
    width: 100%;
  }
}

.resWrapper {
  margin-top: 10px;
  background-color: #fff;
  > .topWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    height: 50px;
    padding: 0 20px 0 10px;
    color: #a3a3a3;
    > div {
      display: flex;
      align-items: center;
      &:first-child {
        > span {
          margin-left: 5px;
        }
      }
    }
  }
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: unset;
    height: 50px;
  }
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
</style>
