<script setup>
import {appStore} from "@/stores";
import {storeToRefs} from "pinia";
import {_loginOut, doLang} from "@/service/user";
import copyToClipboard from "@/utils/clipboard";

const {proxy} = getCurrentInstance();

const store = appStore();
const {user, language, code} = storeToRefs(store);

const username = computed(() => user.value.username);
const uid = computed(() => user.value.uid);
const getFlagImageUrl = (name) => {
  return new URL(`/src/assets/image/flag/${name}.png`, import.meta.url).href
}

const visible = defineModel('show', {type: Boolean})

const actions = ref([
  {icon: getFlagImageUrl('en'), code: 'cnmsg', text: 'English'},
  {icon: getFlagImageUrl('zh'), code: 'zhmsg', text: '中文繁體'},
  {icon: getFlagImageUrl('jp'), code: 'rwmsg', text: '日本語'},          // 日语
  {icon: getFlagImageUrl('ko'), code: 'hwmsg', text: '한국어'},          //韩语
  // {icon: getFlagImageUrl('vi'), code: 'w1msg', text: 'Tiếng Việt'},        // 越南语
  // {icon: getFlagImageUrl('ms'), code: 'w2msg', text: 'Bahasa Malaysia'},   // 马来语
  // {icon: getFlagImageUrl('th'), code: 'twmsg', text: 'ไทย'},            //  泰语
  // {icon: getFlagImageUrl('fr'), code: 'w3msg', text: 'Français'},        // 法语
  // {icon: getFlagImageUrl('ru'), code: 'w4msg', text: 'Русский'},        // 俄语
  // {icon: getFlagImageUrl('ar'), code: 'w5msg', text: 'عرب'},        // 阿拉伯语
  // {icon: getFlagImageUrl('es'), code: 'w6msg', text: 'Español'},        // 西班牙语
  // {icon: getFlagImageUrl('tl'), code: 'w2', text: 'Filipino'},        // 菲律宾语
  // {icon: getFlagImageUrl('de'), code: 'w5', text: 'Deutsch'},         // 德语
  // {icon: getFlagImageUrl('in'), code: 'w6', text: 'हिन्दी'},             //  印地语（印度）
  // {icon: getFlagImageUrl('kh'), code: 'w7', text: 'ភាសាខ្មែរ'},         //（柬埔寨）
])

const switchLanguage = async (langCode) => {
  language.value = langCode;
  store.changeLang(language.value);
  proxy.$i18n.locale = language.value;
  let result = await doLang({lang: langCode});
}

const onSelect = (action) => {
  switchLanguage(action.code);
};

const onSubmit = async () => {
  await _loginOut();
  visible.value = false;
  store.$patch({
    address: "",
    token: "",
    user: [],
    info: [],
  });
  setTimeout(() => {
    window.location.reload();
  }, 500);
};
onMounted(() => {
  proxy.$i18n.locale = language.value;
  switchLanguage(language.value)
})

</script>

<template>
  <van-popup v-model:show="visible" round position="top" class="popup-info"
             :overlay-style="{ backgroundColor: 'transparent'}">
    <div class="p-15 flex max-w-[375px] mx-auto">
      <div class="w-[154px] bg-[rgba(255,255,255,0.20)] mr-10 rounded-[20px] pt-24 px-10 pb-20">
        <div class="flex items-center justify-center">
          <img class="w-[18px] h-[18px] mr-8" src="@/assets/image/icon/user.svg" alt="">
          <div class="text-12 font-500">{{ uid }}</div>
          <img v-if="username" @click="copyToClipboard(uid.toString())" class="w-[12px] h-[12px] ml-13"
               src="@/assets/image/icon/icon-copy-1.png" alt="">
        </div>
        <div
            class="bg-[#161616] py-16 px-15 rounded-[100px] mt-20 mb-18  text-12 font-500 flex items-center justify-center">
          <img class="w-[16px] h-[16px] mr-8" src="@/assets/image/icon/icon-wallet-1.png" alt="">
          <div>{{ $filters.prefix(username, 3, 3) }}</div>
          <img v-if="username" @click="copyToClipboard(username)" class="w-[12px] h-[12px] ml-13"
               src="@/assets/image/icon/icon-copy-1.png" alt="">
        </div>
        <div v-if="username" class="text-center text-14" @click="onSubmit">
          {{ $t('auth.disconnect') }}
        </div>
      </div>
      <div class="flex-1 border border-solid border-[#ffb59f] pt-10 pl-16 pr-12 rounded-[20px]">
        <img class="w-[24px] h-[24px] mx-auto mb-20" src="@/assets/image/icon/icon-lang.png" alt="">
        <div class="grid grid-cols-2 gap-[10px]">
          <div v-for="item in actions" @click="onSelect(item)"
               class="text-13 mb-10 flex items-center px-6 py-6"
               :class="{'text-[#fff] rounded-[50px] bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)]':item.code===language}"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="less">
.popup-info {
  --van-popup-background: transparent;
  fill: rgba(255, 255, 255, 0.80);
  stroke-width: 1px;
  stroke: #F0F0F2;
  backdrop-filter: blur(10px);
  top: 46px;
}

</style>
