<script setup>
import {useI18n} from 'vue-i18n';
import {appStore} from '@/stores';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';

import Introduction from './components/introduction.vue'
import Vision from './components/vision.vue'
import Tokenomics from './components/tokenomics.vue'
import BusinessModel from './components/businessModel.vue'
import Architecture from './components/architecture.vue'
import Highlights from './components/highlights.vue'


// 路由和 Store
const router = useRouter();
const store = appStore();
const {user} = storeToRefs(store);

// 国际化和实例代理
const {t} = useI18n();
const {proxy} = getCurrentInstance();

// 响应式数据
const code = ref(router.currentRoute.value.query.code || '');


const updateCodeIfNeeded = () => {
  if (code.value) store.changeCode(code.value);
};

// 初始化
onMounted(updateCodeIfNeeded);

// 用户变化时更新
watch(() => user.value.username, updateCodeIfNeeded);
</script>

<template>
  <div class="overflow-hidden relative">
    <Header ref="header"></Header>
    <section id="introduction">
      <Introduction/>
    </section>
    <section id="vision">
      <Vision/>
    </section>
    <section id="tokenomics">
      <Tokenomics/>
    </section>
    <section id="businessModel">
      <BusinessModel/>
    </section>
    <section id="architecture">
      <Architecture/>
    </section>
    <section id="highlights">
      <Highlights/>
    </section>
    <div class="fixed w-full left-0 bottom-20 px-16">
      <router-link to="/deposit"
                   class=" py-13 rounded-[50px] text-center  text-16 font-bold block bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)]">
        {{ $t('home.highlights.text-11') }}
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
