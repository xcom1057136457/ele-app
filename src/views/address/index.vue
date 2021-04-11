<template>
  <div>
    <navBar :isLeft="true" title="收货地址"></navBar>
    <div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      >
        <template #item-bottom="record">
          <div class="tag">
            <van-tag type="primary">{{ record.tag }}</van-tag>
          </div>
        </template>
      </van-address-list>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import { mapState } from "vuex";
import { getAddress, deleteAddress } from "@/api/index";
export default {
  data() {
    return {
      chosenAddressId: null,
      list: []
    };
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  methods: {
    async getAddressHandler() {
      let response = await getAddress(this.userInfo.user_id);
      response.forEach((item) => {
        let params = {
          id: item.id,
          name: item.name,
          tel: item.phone,
          address: item.address + item.address_detail,
          tag: item.tag
        };
        this.list.push(params);
      });
    },
    onAdd() {
      this.$router.push({
        name: "addressAdd"
      });
    },
    onEdit(val) {
      this.$dialog
        .confirm({
          message: `是否删除${val.address}`
        })
        .then(async () => {
          // on confirm
          let params = {
            user_id: this.userInfo.user_id,
            address_id: val.id
          };
          let { status, success } = await deleteAddress(params);
          if (status == 1) {
            this.$toast.success(success);
            this.list = [];
            this.getAddressHandler();
          }
        })
        .catch(() => {
          // on cancel
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
.tag {
  margin-left: 28px;
  margin-top: 10px;
}
</style>
