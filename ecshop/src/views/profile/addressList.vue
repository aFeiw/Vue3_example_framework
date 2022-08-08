<template>
  <div>
    <nav-bar>
      <template v-slot:default>地址列表</template>
    </nav-bar>
    <div style="margin-top: 45px">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        :switchable="false"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { onMounted, ref } from "vue";

import { useRouter } from "vue-router";
import { getAddress } from "@/api/address.js";
export default {
  components: {
    NavBar,
  },
  setup() {
    const chosenAddressId = ref("1");
    const router = useRouter();
    const list = ref([]);
    onMounted(() => {
      getAddress().then((res) => {
        list.value = res.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
            isDefault: !!item.is_default,
          };
        });
      });
    });
    const onAdd = () => {
      router.push({
        name: "AddressDetail",
        query: {
          type: "add",
        },
      });
    };
    const onEdit = (item, value) => {
      console.log(item, value);
      router.push({
        name: "AddressDetail",
        query: {
          type: "edit",
          addressId: item.id,
        },
      });
    };

    return {
      list,
      onAdd,
      onEdit,
      chosenAddressId,
    };
  },
};
</script>

<style lang="scss" scoped>
.van-address-list__bottom.van-safe-area-bottom {
  margin-bottom: 52px;
}

::v-deep .van-address-list__bottom {
  position: fixed;
  bottom: 52px !important;
  left: 0;
}
</style>
>
