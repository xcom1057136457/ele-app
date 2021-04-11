<template>
  <div>
    <navBar title="获取具体位置"></navBar>
    <div class="guess">
      <div>定位城市</div>
      <div @click="getCurrentCity">
        <div>
          <van-icon name="aim" />
          <span>获取当前城市</span>
        </div>
      </div>
    </div>
    <div class="hot">
      <div>热门城市</div>
      <div>
        <van-row>
          <van-col
            span="6"
            v-for="(item, index) in hotCity"
            :key="index"
            @click="clickCityHandler(item)"
          >
            <div>{{ item.name }}</div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="all">
      <van-index-bar :sticky-offset-top="46">
        <van-index-anchor index="A" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.A"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="B" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.B"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="C" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.C"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="D" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.D"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="E" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.E"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="F" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.F"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="G" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.G"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="H" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.H"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="I" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.I"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="J" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.J"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="K" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.K"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="L" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.L"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="M" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.M"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="N" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.N"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="O" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.O"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="P" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.P"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="Q" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.Q"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="R" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.R"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="S" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.S"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="T" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.T"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="U" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.U"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="V" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.V"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="W" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.W"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="X" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.X"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="Y" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.Y"
          :key="index"
          @click="clickCityHandler(item)"
        />

        <van-index-anchor index="Z" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in cityList.Z"
          :key="index"
          @click="clickCityHandler(item)"
        />
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getAllAddress } from "@/api/index";
import navBar from "@/components/navBar";
export default {
  data() {
    return {
      cityList: {},
      hotCity: {}
    };
  },
  computed: {},
  methods: {
    ...mapActions("user", ["GetAddress"]),
    async getAddressHandler() {
      this.cityList = await getAllAddress({
        type: "group"
      });

      this.hotCity = await getAllAddress({
        type: "hot"
      });
    },
    async getCurrentCity() {
      let response = await getAllAddress({
        type: "guess"
      });
      this.GetAddress(response);
      this.$router.push({
        name: "home"
      });
    },
    clickCityHandler(val) {
      this.GetAddress(val);
      this.$router.push({
        name: "home"
      });
    }
  },
  components: {
    navBar
  },
  mounted() {
    this.getAddressHandler();
  }
};
</script>

<style lang="less" scoped>
.hot {
  > div {
    &:first-child {
      padding: 0 10px;
      margin: 10px 0;
    }
    &:last-child {
      background-color: #fff;
      > .van-row {
        > .van-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          border-right: 1px solid #f9f9f9;
          border-bottom: 1px solid #f9f9f9;
          > div {
            padding: 5px 10px;
          }
        }
      }
    }
  }
}

.guess {
  > div {
    &:first-child {
      padding: 10px 10px;
    }
    &:last-child {
      background-color: #fff;
      padding: 10px;
      > div {
        display: flex;
        align-items: center;
        > span {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
