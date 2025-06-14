<template>
  <div class="homeApp">
    <router-view v-slot="{ Component }">
        <component :is="Component"/>
    </router-view>
    <main-footer></main-footer>
  </div>
</template>

<script setup>
import MainFooter from '@/components/footer/v-footer.vue'
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
