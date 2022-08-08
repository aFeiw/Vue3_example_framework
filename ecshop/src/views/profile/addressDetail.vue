<template>
  <div>
    <nav-bar>
      <template v-slot:default>{{ titles }}</template>
    </nav-bar>
    <div style="margin-top: 45px">
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        :show-delete="type == 'edit'"
        :show-postal="false"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { areaList } from "@vant/area-data";
import {
  addAddress,
  editAddress,
  getAddressDetail,
  deleteAddress,
} from "@/api/address.js";
export default {
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const onSave = (value) => {
      console.log(value.areaCode);
      window.sessionStorage.setItem("areaCode", value.areaCode);
      const params = {
        name: value.name,
        phone: value.tel,
        province: value.province,
        city: value.city,
        county: value.county,
        address: value.addressDetail,
        is_default: value.isDefault ? 1 : 0,
      };
      if (state.type == "edit") {
        editAddress(state.addressId, params).then((res) => {
          console.log(res);
        });
      } else if (state.type == "add") {
        addAddress(params).then((res) => {
          console.log(res);
        });
      }

      Toast("保存成功");
      setTimeout(() => {
        router.back();
      }, 800);
    };
    const onDelete = () => {
      deleteAddress(state.addressId).then((res) => {
        console.log(res);
        Toast.success("删除成功");
        router.back();
      });
    };

    const state = reactive({
      addressInfo: {},
      searchResult: [],
      type: "add",
      addressId: "",
      title: "",
    });
    onMounted(() => {
      //接收路由参数
      const { type, addressId } = route.query;
      //
      state.type = type;
      state.addressId = addressId;
      if (type == "edit") {
        getAddressDetail(addressId).then((res) => {
          const addressDetail = res;
          console.log(addressDetail);
          state.addressInfo = {
            name: addressDetail.name,
            tel: addressDetail.phone,
            province: addressDetail.province,
            city: addressDetail.city,
            county: addressDetail.county,
            areaCode: window.sessionStorage.getItem("areaCode"),
            addressDetail: addressDetail.address,
            isDefault: !!addressDetail.is_default,
          };
        });
      }
    });
    const titles = computed(() => {
      return state.type == "add" ? "新增地址" : "编辑地址";
    });
    return {
      onSave,
      onDelete,
      titles,
      areaList,
      ...toRefs(state),
    };
  },
};
</script>
