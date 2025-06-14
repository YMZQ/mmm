<script setup>


import {useI18n} from 'vue-i18n';
import {appStore} from '@/stores';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';
import {doLang, login} from "@/service/user";
import {_getHome} from "@/service/home";


// 路由和 Store
const router = useRouter();
const store = appStore();
const {user, code} = storeToRefs(store);

// 国际化和实例代理
const {t} = useI18n();
const {proxy} = getCurrentInstance();

// 响应式数据
const codeUid = ref(router.currentRoute.value.query.code || '');
const info = ref({
  uid: 0,
  grade: 0,
  minAmount: 0,
  teamAmount: 0,
  surplusAmount: 0,
  thisAmount: 0,
})
const directList = ref([])
const switchLanguage = async (langCode) => {
  store.changeLang(langCode);
  proxy.$i18n.locale = langCode;
  let result = await doLang({lang: langCode});
}


const initLogin = async () => {
  let result = await login({uid: code.value})
  if (result.respCode === "00000") {
    await getHome()
  }
}
const getHome = async () => {
  let result = await _getHome()
  info.value.grade = result.grade;
  info.value.minAmount = result.minAmount;
  info.value.teamAmount = result.teamAmount;
  info.value.surplusAmount = result.surplusAmount;
  info.value.thisAmount = result.thisAmount;
  directList.value = result.directList;
}
// 初始化逻辑
onMounted(() => {
  if (codeUid.value) {
    switchLanguage('zhmsg')
    store.changeCode(codeUid.value)
    initLogin()
  } else if (code.value) {
    initLogin()
  }
});
const list = ref([]);
const getImageUrl = (name) => {
  return new URL(`/src/assets/image/empty-img/${name}.png`, import.meta.url).href;
}
</script>


<template>
  <div class="overflow-hidden">
    <HeaderBack ref="headerBackRef" :title="$t('home.text-0')"/>
    <div class="p-15">
      <div
          class="p-15 mb-15 rounded-md border border-solid border-[#6E6E6E] grid grid-cols-2 gap-[20px] bg-[linear-gradient(180deg,#010101_0%,#212121_100%)]">
        <div>
          <div class="text-12 text-[#909090] mb-5">{{ $t('home.text-1', {text: 'HPC'}) }}</div>
          <div class="text-14 text-[#FFF] font-bold">{{ $filters.fixNumber(info) }}</div>
        </div>
        <div>
          <div class="text-12 text-[#909090] mb-5">{{ $t('home.text-2', {text: 'HPC'}) }}</div>
          <div class="text-14 text-[#FFF] font-bold">{{ $filters.fixNumber(info) }}</div>
        </div>
        <div>
          <div class="text-12 text-[#909090] mb-5">{{ $t('home.text-3', {text: 'USDT'}) }}</div>
          <div class="text-14 text-[#FFF] font-bold">{{ $filters.fixNumber(info.surplusAmount) }}</div>
        </div>
        <div>
          <div class="text-12 text-[#909090] mb-5">{{ $t('home.text-4', {text: 'USDT'}) }}</div>
          <div class="text-14 text-[#FFF] font-bold">{{ $filters.fixNumber(info.thisAmount) }}</div>
        </div>
      </div>
      <div class="mb-15">
        <div class="flex items-center justify-between mb-10">
          <div class="text-16 font-bold">HPC</div>
          <router-link to="/assetsRecords" class="flex items-center">
            <span class="text-14 text-[#909090]">{{ $t('home.text-5') }}</span>
            <img class="w-[16px] h-[16px]" src="@/assets/image/icon/icon-right.png" alt="">
          </router-link>
        </div>
        <div class="bg-[#141414] rounded-md p-15 flex items-stretch justify-between text-center mb-32">
          <div class="flex-1">
            <div class="text-[#FAD701] text-14 font-bold mb-5">{{ $filters.fixNumber(info.teamAmount) }}</div>
            <div class="text-[#909090] text-12">{{ $t('home.text-6') }}</div>
          </div>
          <div class="w-[1px] self-stretch bg-[rgba(255,255,255,0.10)]"></div>
          <div class="flex-1">
            <div class="text-[#FAD701] text-14 font-bold mb-5">{{ $filters.fixNumber(info.minAmount) }}</div>
            <div class="text-[#909090] text-12">{{ $t('home.text-7') }}</div>
          </div>
        </div>
        <div class="relative">
          <img class="w-[100px] absolute -top-20 right-15 z-[2]" src="@/assets/image/home/image-0.png" alt="">
          <div class="custom-shape p-15 ">
            <div class="text-14 flex items-center mb-20">
              <div>{{ $t('home.text-8') }}</div>
              <div
                  class="min-w-[39px] inline-block text-center border border-[#FAD701] text-[#FAD701] rounded-sm  font-bold ml-10 py-2">
                H1
              </div>
            </div>
            <div class="grid grid-cols-2 gap-[20px]">
              <div>
                <div class="text-14 text-[#FFF] font-bold">{{ $filters.fixNumber(info.teamAmount) }}</div>
                <div class="text-12 text-[#909090] mt-5">{{ $t('home.text-9') }}</div>
              </div>
              <div class="text-center">
                <div class="text-14 text-[#FFF] font-bold">{{ $filters.fixNumber(info.minAmount) }}</div>
                <div class="text-12 text-[#909090] mt-5">{{ $t('home.text-10') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-16 font-bold mb-15">{{ $t('home.text-11') }}</div>
        <div>
          <div v-for="item in directList" class="bg-[#141414] rounded-md p-15">
            <div
                class="text-[#FAD701] font-bold text-14 pb-5 border-b border-solid border-[rgba(255,255,255,0.10)] mb-10">
              UID：{{item.uid}}
            </div>
            <div class="grid grid-cols-2 gap-[10px]">
              <div>
                <div class="text-14 text-[#FFF] ">V{{item.grade}}</div>
                <div class="text-12 text-[#909090] mt-5">{{ $t('home.text-12') }}</div>
              </div>
              <div class="pl-10">
                <div class="text-14 text-[#FFF] ">{{ $filters.fixNumber(info.thisAmount) }}U</div>
                <div class="text-12 text-[#909090] mt-5">{{ $t('home.text-13') }}</div>
              </div>
              <div>
                <div class="text-14 text-[#FFF] ">{{ $filters.fixNumber(info.teamAmount) }}</div>
                <div class="text-12 text-[#909090] mt-5">{{ $t('home.text-14') }}(USDT)</div>
              </div>
              <div class="pl-10">
                <div class="text-14 text-[#FFF] ">{{ $filters.fixNumber(info.minAmount) }}</div>
                <div class="text-12 text-[#909090] mt-5">{{ $t('home.text-15') }}(USDT)</div>
              </div>
            </div>
          </div>
          <div v-if="directList.length<=0">
            <van-empty :image="getImageUrl('img')" :description="$t('暂无数据')"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.custom-shape {
  background: linear-gradient(135deg, #321E0A 0%, #070500 100%);
  clip-path: path("M0 20C0 8.9543 8.95431 0 20 0H200.87C208.325 0 215.161 4.146 218.606 10.7568L222.394 18.0252C225.839 24.636 232.675 28.782 240.13 28.782H258.75H301.875H325C336.046 28.782 345 37.7363 345 48.782V96C345 107.046 336.046 116 325 116H20C8.9543 116 0 107.046 0 96V20Z");
}
</style>
