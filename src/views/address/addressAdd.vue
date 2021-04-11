<template>
  <div>
    <navBar isLeft title="新增收货地址"></navBar>
    <van-form @submit="onSubmit" class="formWrapper">
      <van-field
        v-model="params.name"
        name="name"
        label="收货人姓名"
        placeholder="收货人姓名"
        :rules="[{ required: true, message: '请填写收货人姓名' }]"
      />
      <van-field
        v-model="params.phone"
        type="number"
        name="phone"
        label="电话号码"
        placeholder="电话号码"
        :rules="[{ required: true, message: '请填写电话号码' }]"
      />
      <van-field
        v-model="params.phone_bk"
        type="number"
        name="phone_bk"
        label="备注电话"
        placeholder="备注电话"
        :rules="[{ required: true, message: '请填写备注电话' }]"
      />
      <van-field
        v-model="sexLabel"
        name="sex"
        label="性别"
        right-icon="arrow"
        placeholder="性别"
        readonly
        @click="sexShow = !sexShow"
        :rules="[{ required: true, message: '请选择性别' }]"
      />
      <!-- 性别弹框 -->
      <van-popup v-model="sexShow" position="bottom">
        <van-picker
          title="请选择性别"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>

      <van-field
        v-model="params.address"
        name="address"
        label="地址"
        right-icon="arrow"
        placeholder="地址"
        readonly
        @click="addressShow = !addressShow"
        :rules="[{ required: true, message: '请选择地址' }]"
      />
      <!-- 地址弹框 -->
      <van-popup v-model="addressShow" position="bottom">
        <van-area
          title="请选择地址"
          :area-list="areaList"
          @cancel="addressShow = !addressShow"
          @confirm="addressHandler"
        />
      </van-popup>

      <van-field
        v-model="params.address_detail"
        name="address_detail "
        label="地址详情"
        placeholder="地址详情"
        :rules="[{ required: true, message: '请填写地址详情' }]"
      />

      <div class="formItem">
        <label>标签类型</label>
        <div class="tagWrapper">
          <span
            v-for="(item, index) in tagOption"
            :key="index"
            @click="clicktagHandler(item)"
            :class="params.tag_type == item.value ? 'chcked' : ''"
            >{{ item.label }}</span
          >
        </div>
      </div>
      <div style="padding: 16px;" class="btns">
        <van-button block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import navBar from "@/components/navBar";
import areaList from "@/assets/json/area.js";
import { addAddress } from "@/api/index";
export default {
  data() {
    return {
      params: {},
      sexShow: false,
      addressShow: false,
      columns: ["男", "女"],
      sexLabel: "",
      areaList,
      tagOption: [
        {
          label: "家",
          value: "2"
        },
        {
          label: "学校",
          value: "3"
        },
        {
          label: "公司",
          value: "4"
        }
      ]
    };
  },
  computed: {
    ...mapState("user", ["userInfo", "addressDetail"])
  },
  methods: {
    async onSubmit() {
      this.params.user_id = this.userInfo.user_id;
      this.params.poi_type = 0;
      this.params.geohash =
        this.addressDetail.latitude + "," + this.addressDetail.longitude;
      let response = await addAddress(this.params);
      if (response.status == 1) {
        this.$router.go(-1);
      }
    },
    onConfirm(value) {
      this.sexLabel = value;
      this.params.sex = value == "男" ? 1 : 2;
      this.sexShow = false;
    },
    onCancel() {
      this.sexShow = false;
    },
    addressHandler(val) {
      let address = val.map((item) => item.name).join(" ");
      this.params.address = address;
      this.addressShow = false;
    },
    clicktagHandler(val) {
      this.$set(this.params, "tag_type", val.value);
      this.params.tag = val.label;
    }
  },
  mounted() {},
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.formWrapper {
  min-height: calc(100vh - 46px);
  background-color: #fff;
}

.formItem {
  display: flex;
  padding: 10px 16px;
  background-color: #fff;
  font-size: 14px;
  border-bottom: 1px solid #f9f9f9;
  line-height: 6.4vw;
  > label {
    margin-right: 16px;
    flex: 0 0 86.84px;
  }
}

.tagWrapper {
  > span {
    border: 1px solid rgba(9, 67, 143, 1);
    padding: 2px 10px;
    margin-right: 10px;
    font-size: 12px;
    color: rgba(9, 67, 143, 1);
  }
  .chcked {
    background-color: rgba(9, 67, 143, 1);
    color: #fff;
  }
}

.btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
