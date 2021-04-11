<template>
  <div>
    <navBar title="选择地址" isLeft></navBar>
    <div class="topWrapper">
      <van-radio-group v-model="radioIndex">
        <div
          v-for="(item, index) in addressInfo"
          :key="index"
          class="selectItem"
          @click="selectAddressHandler(index)"
        >
          <div>
            <van-radio :name="index"></van-radio>
          </div>
          <div>
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.sex == 1 ? "先生" : "女士" }}</span>
              <span>{{ item.phone }}</span>
            </div>

            <div>
              <span>
                <van-tag type="primary">{{ item.tag }}</van-tag>
              </span>
              <span>{{ item.address + " " + item.address_detail }}</span>
            </div>
          </div>
        </div>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import navBar from "@/components/navBar";
export default {
  data() {
    return {
      radioIndex: null
    };
  },
  computed: {
    ...mapState("global", ["addressInfo", "addressIndex"])
  },
  methods: {
    ...mapActions("global", ["GetAddressIndex", "GetAddress"]),
    selectAddressHandler(index) {
      this.radioIndex = index
      this.GetAddressIndex(index)
      this.$router.go(-1)
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.GetAddress();
    this.radioIndex = this.addressIndex
  }
};
</script>

<style lang="less" scoped>
.selectItem {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  > div {
    &:nth-child(1) {
      margin-right: 20px;
    }

    &:nth-child(2) {
      flex: 1;
      > div {
        &:nth-child(1) {
          margin-bottom: 5px;
          > span {
            &:nth-child(1) {
              font-weight: bold;
              margin-right: 5px;
              font-size: 16px;
            }

            &:nth-child(2) {
              font-size: 14px;
              margin-right: 5px;
            }

            &:nth-child(3) {
              font-size: 14px;
            }
          }
        }
        &:nth-child(2) {
          display: flex;
          align-items: flex-end;
          > span {
            &:nth-child(1) {
              margin-right: 10px;
            }

            &:nth-child(2) {
              display: flex;
              align-items: flex-end;
              font-size: 14px;
              color: #a3a3a3;
            }
          }
        }
      }
    }
  }
}
</style>
