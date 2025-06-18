<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed z-index="2">
    <van-tabbar-item
        v-for="(item, index) in tabBarData"
        :key="index"
        :to="item.to"
        :class="{ active: isActive(item) }"
    >
      <img class="w-[24px] mx-auto" :src="getImageUrl(item.defaultIcon)" alt=""/>
      <p class="mt-[2px] text-10 text-center">{{ item.title }}</p>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const route = useRoute();
const { t } = useI18n();

const getImageUrl = (name) => {
  return new URL(`/src/assets/image/tabBar/${name}.png`, import.meta.url).href;
};

const active = ref(0);

const tabBarData = computed(() => [
  {
    id: 0,
    icon: "deposit",
    defaultIcon: "defaultIcon-0",
    title: t("tabBar.deposit"),
    to: { name: "deposit" }
  },
  {
    id: 1,
    icon: "leaderboard",
    defaultIcon: "defaultIcon-1",
    title: t('tabBar.leaderboard'),
    to: { name: "leaderboard" }
  },
  {
    id: 2,
    icon: "community",
    defaultIcon: "defaultIcon-2",
    title: t("tabBar.community"),
    to: { name: "community" }
  },
  {
    id: 3,
    icon: "assets",
    defaultIcon: "defaultIcon-3",
    title: t("tabBar.assets"),
    to: { name: "assets" }
  }
]);

const isActive = (item) => {
  return route.name === item.to.name;
};
</script>

<style scoped>


.active {
  margin: 5px 6px;
  border-radius: 50px;
  background: linear-gradient(180deg, #FF8360 0%, #EA3400 100%);
}
</style>
