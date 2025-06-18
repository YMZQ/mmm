<script setup>
import PersonalHoldingRank from './components/personalHoldingRank.vue'
import LpHoldingRank from './components/lpHoldingRank.vue'
import TeamHoldingRank from './components/teamHoldingRank.vue'

const tabBar = ref([
  {id: 0, text: 'leaderboard.tab.text-0'},
  {id: 1, text: 'leaderboard.tab.text-1'},
  {id: 2, text: 'leaderboard.tab.text-2'},
])
const active = ref(0);
</script>

<template>
  <div>
    <Header ref="header"></Header>
    <img src="@/assets/image/leaderboard/image-0.png" alt="">
    <div class="rounded-[20px_20px_0_0] -mt-47 bg-[#141115]">
      <div class="flex items-center justify-center  text-[#8C91A2] text-14">
        <div v-for="(item,index) in tabBar" class="py-10" :class="{'mx-20 ':index===1,'active':active===item.id}"
             @click="active=item.id">{{ $t(item.text) }}
        </div>
      </div>
      <PersonalHoldingRank v-if="active===0"/>
      <LpHoldingRank v-if="active===1"/>
      <TeamHoldingRank v-if="active===2"/>
    </div>
  </div>
</template>

<style scoped lang="less">
.active {
  color: #fff;
  font-weight: 600;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 16px;
    height: 3px;
    background: linear-gradient(180deg, #FFB59F 0%, #EA3400 100%);
    left: 50%;
    transform: translateX(-50%);
    bottom: 0
  }
}
</style>
