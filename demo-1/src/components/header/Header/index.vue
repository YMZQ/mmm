<template>
  <van-nav-bar fixed safe-area-inset-top :border="false" :clickable="false" :z-index="2001"
               :class="{ 'van-nav-bar-background-red': scroll > 15}">
    <template #left>

    </template>
    <template #right>
      <div class="connect-main flex">
        <img class="lang" @click="userPanel=!userPanel" src="@/assets/image/icon/icon-lang.png" alt="">
      </div>
    </template>
  </van-nav-bar>
  <PopupUserPanel v-model:show="userPanel" ref="loginOut"></PopupUserPanel>
</template>

<script setup>
import PopupUserPanel from '@/components/popup/popup-userPanel.vue'
import {storeToRefs} from 'pinia';
import {appStore} from '@/stores/index'
import {useI18n} from 'vue-i18n'

const {t} = useI18n();
const router = useRouter()
const store = appStore();
const {user, code} = storeToRefs(store);
const {proxy} = getCurrentInstance();

const userPanel = ref(false)

const scroll = ref(0)
// 实时滚动条高度
const scrollTop = () => {
  scroll.value = document.documentElement.scrollTop || document.body.scrollTop;
}

onMounted(() => {
  window.addEventListener('scroll', scrollTop, true)
})

</script>

<style lang="less" scoped>


.logo {
  height: 32px;
}

.lang {
  margin-top: 2px;
  width: 30px;
  height: 30px;
}

.menu {
  margin-top: 2px;
  width: 30px;
  height: 30px;
}

.van-nav-bar-background-red {
  //border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  //background: #0B0501;
  //box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.10);

}

.connect-main {
  width: 100%;

  .connect-content {
    padding: 0 10px;
    min-width: 97px;
    line-height: 32px;
    text-align: center;
    height: 32px;
    margin-left: 20px;

    font-size: 14px;
    border-radius: 24px;
    border: 1px solid #1C3B5E;
    box-shadow: 1px 1px 0 0 #000;
    background: #FFF;
    box-sizing: border-box;
    //
    //border-radius: 24px;
    //background: #25062D;
    //box-shadow: 0  0  12px 0  rgba(255, 29, 236, 0.50) inset;
    //position: relative;
    //--border-width: 1px;
    //--border-radius: 24px;
    //--border-color: linear-gradient(113deg, #BC1F95 5.91%, #4D37EF 52.46%, #EF37E0 96.27%);
    //&::after {
    //  content: "";
    //  z-index: 1;
    //  position: absolute;
    //  left: 0;
    //  top: 0;
    //  width: 100%;
    //  height: 100%;
    //  padding: var(--border-width);
    //  border-radius: var(--border-radius);
    //  background: var(--border-color);
    //  /* 随便定义一个颜色 */
    //  --mask-bg: linear-gradient(#000, #000);
    //  /* 类似background-clip */
    //  --mask-clip: content-box, padding-box;
    //  /* mask允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域 */
    //  /* mask-image类似background-image 设置了用作元素蒙版层的图像，默认值为none，值为透明图片，或透明渐变 */
    //  -webkit-mask-image: var(--mask-bg), var(--mask-bg);
    //  /* 默认值为border-box，可选值与background-origin相同 */
    //  -webkit-mask-clip: var(--mask-clip);
    //  /* exclude排除，只显示不重合的地方,Firefox支持4个属性 */
    //  mask-composite: exclude;
    //  /* 只显示下方遮罩，重合的地方不显示 */
    //  -webkit-mask-composite: destination-out;
    //}


    div {
      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  img {
    margin-left: 10px;
  }
}


</style>
