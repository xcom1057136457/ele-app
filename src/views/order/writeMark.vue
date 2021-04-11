<template>
  <div>
    <navBar title="订单备注" isLeft></navBar>
    <div class="topWrapper">
      <div class="text">快速备注</div>
      <div>
        <van-row>
          <van-col
            :class="
              selectMark.some((selectItem) => {
                return selectItem == item;
              })
                ? 'checked'
                : ''
            "
            span="6"
            v-for="(item, index) in markList"
            :key="index"
            @click="selectHandler(item)"
            >{{ item }}</van-col
          >
        </van-row>
      </div>
    </div>

    <div class="bottomWrapper">
      <div class="text">其他备注</div>
      <div>
        <van-field
          v-model="otherMark"
          rows="5"
          autosize
          label="备注"
          type="textarea"
          placeholder="请输入其他备注"
        />
      </div>
      <div>
        <van-button type="info" block @click="remarkHandler">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import _ from "lodash";
import { getMark } from "@/api/index";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      cartId: "",
      markList: [],
      selectMark: [],
      otherMark: ""
    };
  },
  methods: {
    ...mapActions("global", ["GetMark"]),
    // 获取备注信息
    async getMarkHandler() {
      let response = await getMark(this.cartId);
      this.markList = _.flattenDeep(response.remarks);
    },
    selectHandler(index) {
      let boolean = this.selectMark.some((item) => {
        return item == index;
      });
      let selectItem = index;
      if (boolean) {
        this.selectMark.forEach((item, index, arr) => {
          if (item == selectItem) {
            arr.splice(index, 1);
          }
        });
      } else {
        this.selectMark.push(index);
      }
    },
    remarkHandler() {
      this.GetMark(this.selectMark.join(",") + "," + this.otherMark);
      this.$router.go(-1);
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.cartId = this.$route.query.data;
    this.getMarkHandler();
  }
};
</script>

<style lang="less" scoped>
.topWrapper {
  padding: 10px;
  background-color: #fff;
  > div {
    &:nth-child(1) {
      font-size: 16px;
      font-weight: bold;
    }
    &:nth-child(2) {
      margin-top: 10px;
      > .van-row {
        > .van-col {
          padding: 8px 10px;
          border: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a3a3a3;
          font-size: 14px;
        }
      }
    }
  }
}

.bottomWrapper {
  margin-top: 20px;
  padding: 10px 10px 20px 10px;
  background-color: #fff;
  .van-field {
    padding: 15px 0;
  }
  > div {
    &:nth-child(1) {
      font-size: 16px;
      font-weight: bold;
    }
  }
}

.checked {
  background-color: #09438f;
  color: #fff !important;
  border: 1px solid #09438f;
}
</style>
