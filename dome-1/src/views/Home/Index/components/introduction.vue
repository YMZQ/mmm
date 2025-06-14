<script setup>

</script>

<template>
  <div class="pt-25">
    <h1 class="glitch" data-text="BYTE">BYTE</h1>
    <div
        class="-mt-20 pt-22  flex flex-col items-center justify-between w-full h-[375px]  bg-[url(@/assets/image/home/image-bg-0.png)] bg-cover bg-no-repeat bg-center">
      <div>
        <div class="text-14 text-[#FFFBF4] text-center">{{$t('home.introduction.text-0')}}</div>
        <div class="my-20 price-box pb-15 text-center min-w-[245px]">
          <div class="mb-14 w-full h-[1px] bg-[linear-gradient(270deg,rgba(255,255,255,0.00)_5.51%,#FFF_52.77%,rgba(255,255,255,0.00)_96.53%)]"></div>
          <div class="text-20 font-bold text-style-1 mb-5">12.2</div>
          <div>{{$t('home.introduction.text-1')}}(USDT)</div>
        </div>
      </div>
      <div class="w-full">
        <div class="flex justify-center">
          <router-link to="subscription" class="button-style-1 inline-block  pb-10  text-center text-[#0B0B0B] text-16">
            <div class="-mt-1 min-w-[135px] mb-9 w-full h-[1px] bg-[linear-gradient(270deg,rgba(255,255,255,0.00)_5.51%,#FFF_52.77%,rgba(255,255,255,0.00)_96.53%)]"></div>
            <div>{{$t('home.introduction.text-2')}}</div>
          </router-link>
        </div>
        <div class="w-full h-[35px] bg-[linear-gradient(180deg,rgba(13,8,1,0.00)_0%,#0D0801_100%)]"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">


.glitch {
  position: relative;
  color: #ffe4b8;
  text-align: center;
  font-size: 50px;
  font-family: 'RubikGlitch-Regular';
  letter-spacing: 8px;
  font-weight: 400;
  text-transform: uppercase;
  animation: glitch-skew 1s infinite linear alternate-reverse;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  color: #ffe4b8;
  clip-path: inset(0 0 0 0);
}

.glitch::before {
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
  color: #00fff7;
  z-index: -1;
}

.glitch::after {
  animation: glitch-anim-2 2s infinite linear alternate-reverse;
  color: #ff00c8;
  z-index: -2;
}

@keyframes glitch-anim-1 {
  0% {
    clip-path: inset(0 0 90% 0);
    transform: translate(-2px, -2px);
  }
  25% {
    clip-path: inset(20% 0 60% 0);
    transform: translate(2px, 2px);
  }
  50% {
    clip-path: inset(40% 0 40% 0);
    transform: translate(-1px, 1px);
  }
  75% {
    clip-path: inset(60% 0 20% 0);
    transform: translate(1px, -1px);
  }
  100% {
    clip-path: inset(90% 0 0 0);
    transform: translate(0, 0);
  }
}

@keyframes glitch-anim-2 {
  0% {
    clip-path: inset(80% 0 0 0);
    transform: translate(2px, -1px);
  }
  25% {
    clip-path: inset(60% 0 20% 0);
    transform: translate(-1px, 1px);
  }
  50% {
    clip-path: inset(40% 0 40% 0);
    transform: translate(1px, -2px);
  }
  75% {
    clip-path: inset(20% 0 60% 0);
    transform: translate(-2px, 1px);
  }
  100% {
    clip-path: inset(0 0 90% 0);
    transform: translate(0, 0);
  }
}

@keyframes glitch-skew {
  0% {
    transform: skew(0deg);
  }
  100% {
    transform: skew(1deg);
  }
}

.price-box{
  border-top: 1px solid rgba(255, 255, 255, 0.00);
  background: linear-gradient(270deg, rgba(255, 255, 255, 0.00) 5.51%, rgba(255, 255, 255, 0.10) 52.77%, rgba(255, 255, 255, 0.00) 96.53%);
  backdrop-filter: blur(2px);
}
.text-style-1{
  background: var(--Linear, linear-gradient(96deg, #FFE605 3.94%, #F90 97.26%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.button-style-1{
  border-radius: 20px;
  background: linear-gradient(96deg, #FFE605 3.94%, #F90 97.26%);
  box-shadow: 0  0  4px 0  rgba(255, 163, 5, 0.50);
}
</style>
