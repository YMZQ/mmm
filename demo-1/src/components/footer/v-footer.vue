<template>
  <van-tabbar route safe-area-inset-bottom :placeholder="false" :border="false">
    <van-tabbar-item @click="routerTo('/home')">
      <span :class="{'active':$route.name.includes('home')}">{{ $t('tabBar1') }}</span>
      <template #icon>
        <img v-if="$route.name.includes('home')" src="@/assets/image/tabbar/icon1@2x.png" alt="">
        <img v-else src="@/assets/image/tabbar/icon5@2x.png" alt="">
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/mint">
      <span :class="{'active':$route.path.includes('mint')}">{{ $t('tabBar2') }}</span>
      <template #icon>
        <img v-if="$route.path.includes('mint')" src="@/assets/image/tabbar/icon2@2x.png" alt="">
        <img v-else src="@/assets/image/tabbar/icon6@2x.png" alt="">
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/game">
      <span :class="{'active':$route.path.includes('game')}">{{ $t('tabBar3') }}</span>
      <template #icon>
        <img v-if="$route.path.includes('game')" src="@/assets/image/tabbar/icon3@2x.png" alt="">
        <img v-else src="@/assets/image/tabbar/icon7@2x.png" alt="">
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/my">
      <span :class="{'active':$route.name.includes('my')}">{{ $t('tabBar4') }}</span>
      <template #icon>
        <img v-if="$route.name.includes('my')" src="@/assets/image/tabbar/icon4@2x.png" alt="">
        <img v-else src="@/assets/image/tabbar/icon8@2x.png" alt="">
      </template>
    </van-tabbar-item>
    <!--    <van-tabbar-item replace to="/my">-->
    <!--      <span :class="{'active':$route.name.includes('my')}">{{ $t('tabbar5') }}</span>-->
    <!--      <template #icon>-->
    <!--        <img v-if="$route.name.includes('my')" src="@/assets/image/tabbar/icon10@2x.png" alt="">-->
    <!--        <img v-else src="@/assets/image/tabbar/icon9@2x.png" alt="">-->
    <!--      </template>-->
    <!--    </van-tabbar-item>-->
  </van-tabbar>
</template>

<script setup>
const router = useRouter()
const {proxy} = getCurrentInstance();
const routerTo = (url) => {
  router.push(url)
}
</script>

<style lang="less" scoped>

.van-tabbar-item__icon img {
  width: 24px;
  height: 24px;
}

.van-tabbar--fixed {
  width: 94% !important;
  padding: 10px;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 16px;
  bottom: 10px;
  backdrop-filter: blur(3.9000000953674316px);
}

.active {
  background: #FFF;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
