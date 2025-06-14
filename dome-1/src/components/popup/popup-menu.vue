<template>
  <van-popup v-model:show="show" position="right"
             :style="{ width: '64%', height: '100%',background:'#351152'}"
             :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, 0.4)', }" :z-index="2001">
    <img src="@/assets/image/logo/max-logo.png" alt="">
    <div
        class="flex items-center justify-start px-[15px] py-[20px] border-[rgba(255,255,255,0.10)] border-b border-solid"
        v-for="item in menuList" @click="routerTo(item.path)">
      <img class="w-[22px] h-[22px] mr-[10px]" :src="getImageUrl(item.image)" alt="">
      <p class="text-[16px] font-[400]">{{ $t(item.text) }}</p>
    </div>
  </van-popup>
  <PopupTip ref="popupTip" :msg="popupTipTitleText" :auto="true" :propsType="popupTipType"></PopupTip>
</template>

<script setup>
import {useI18n} from 'vue-i18n';
import {useRouter} from 'vue-router';
import {appStore} from '@/stores/index';
import {storeToRefs} from 'pinia';
import useClipboard from "vue-clipboard3";


const PopupTip = defineAsyncComponent(() => import('@/components/popup/popup-tip.vue'));
const {t} = useI18n();
const router = useRouter()
const store = appStore();
const {user, globalConfig, language} = storeToRefs(store);
const {toClipboard} = useClipboard()
const {proxy} = getCurrentInstance();

const show = ref(false);
const menuList = ref([
  {image: 'menu-0', text: 'menu-0', path: '/', id: 0},
  // {image: 'menu-1', text: 'menu-1', path: 'airdrop', id: 1},
  // {image: 'menu-2', text: 'menu-2', path: 'privateSale', id: 2},
  // {image: 'menu-3', text: 'menu-3', path: 'burnMining', id: 3},
  // {image: 'menu-4', text: 'menu-4', path: 'lpMint', id: 4},
  // {image: 'menu-5', text: 'menu-5', path: 'tokenStaking', id: 5},
  // {image: 'menu-6', text: 'menu-6', path: 'myInvites', id: 6},
  // {image: 'menu-7', text: 'menu-7', path: 'nfts', id: 7},
  // {image: 'menu-8', text: 'menu-8', path: 'earnings', id: 8},
  // {image: 'menu-9', text: 'menu-9', path: 'oilTankPool', id: 9},
  // {image: 'menu-10', text: 'menu-10', path: 'oilTankPool', id: 10},
]);

const popupTip = ref(null);
const popupTipType = ref(null);
const popupTipTitleText = ref(null);
const copy = async (text) => {
  try {
    await toClipboard(text);
    proxy.$toast.success(t('复制成功'));
  } catch (error) {
    proxy.$toast.error(t('复制失败'));
  }
};

const moreFun = () => {
  popupTipTitleText.value = t('暂未开放');
  popupTipType.value = 2;
  popupTip.value.show = true;
};
const routerTo = (path) => {
  show.value = false;
  // if (path === 'swap') {
  //   moreFun()
  // } else {
  router.push(path)
  // }
}
const getImageUrl = (name) => {
  return new URL(`/src/assets/image/menu/${name}.png`, import.meta.url).href
}


defineExpose({
  show
});
</script>

<style lang="less" scoped>

</style>
