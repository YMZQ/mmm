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
  <div class="overflow-hidden">
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
  </div>
</template>

<style scoped lang="less">
</style>
