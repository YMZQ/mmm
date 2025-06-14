<script setup>
import {useI18n} from 'vue-i18n';
import {appStore} from '@/stores';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';

import Introduction from './components/introduction.vue'
import Market from './components/market.vue'
import MyMiners from './components/myMiners.vue'
import MyTeam from './components/myTeam.vue'
import MyReferrals from './components/myReferrals.vue'


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
  <div class="pt-[46px] overflow-hidden">
    <Header ref="header"></Header>
    <section id="introduction">
      <Introduction/>
    </section>
    <section id="introduction">
      <Market/>
    </section>
    <section id="myMiners">
      <MyMiners/>
    </section>
    <section id="myTeam">
      <MyTeam/>
    </section>
    <section id="myReferrals">
      <MyReferrals/>
    </section>
  </div>
</template>

<style scoped lang="less">
</style>
