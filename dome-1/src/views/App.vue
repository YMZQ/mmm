<template>
  <div class="homeApp">
    <router-view v-slot="{ Component }">
        <component :is="Component"/>
    </router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script setup>
import TabBar from '@/components/TabBar/index.vue'
</script>

<style lang="less">

.router-fade-enter-active,
.router-fade-leave-active {
  transition: all 0.2s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 1;
}
</style>
