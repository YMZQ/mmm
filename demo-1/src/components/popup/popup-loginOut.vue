<template>
  <van-popup v-model:show="show" round :close-on-click-overlay="false"
             :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, 0.4)'}">
    <div class="w-[325px]">
      <div class="text-center pt-[15px] pb-[18px] text-[16px] font-bold">{{ $t('auth.wallet') }}</div>
      <div class="pt-[25px] pb-[15px] px-[15px]">
        <div class="text-center text-[#E0EEEE] text-[16px] break-words">
          {{ user.username }}
          <img @click="copy(user.username)" class="inline-block w-[16px] h-[16px] ml-[5px] relative z-[2]"
               src="@/assets/image/icon/icon-copy.png" alt="">
        </div>
        <div>
          <div class="grid grid-cols-2 gap-[20px] mt-25">
            <div @click="show=false" class="btn w-full border border-solid border-[#fff] rounded-[8px] flex items-center justify-center text-16">
               {{ $t('auth.cancel') }}
            </div>
            <van-button class="w-full btn" @click="onSubmit" >{{ $t('auth.disconnect') }}</van-button>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {appStore} from '@/stores/index'
import useClipboard from "vue-clipboard3";
import {useI18n} from "vue-i18n";
import {_loginOut} from "@/service/user";

const {toClipboard} = useClipboard()
const {t} = useI18n();
const store = appStore();
const {user} = storeToRefs(store);
const {proxy} = getCurrentInstance();

const show = ref(false);

const onSubmit = async () => {
  await _loginOut();
  store.$patch({
    address: "",
    token: "",
    user: [],
    info: [],
  });
  show.value = false;
  window.location.reload();
};
const copy = async (text) => {
  try {
    await toClipboard(text);
    proxy.$toast.success(t('复制成功'));
  } catch (error) {
    proxy.$toast.error(t('复制失败'));
  }
};
defineExpose({
  show,
});
</script>

<style lang="less" scoped>
.btn {
  height: 40px;
}
</style>
