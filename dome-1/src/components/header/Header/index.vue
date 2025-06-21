<template>
  <van-nav-bar fixed safe-area-inset-top :border="false" :clickable="false" :z-index="2001"
               :class="{ 'van-nav-bar-background-red': scroll > 15}">
    <template #left>
      <router-link to="/" >
        <img class="h-[40px]" src="@/assets/image/logo/logo.png" alt="logo">
      </router-link>
    </template>
    <template #right>
      <div class="connect-main flex items-center">
        <img class="w-[24px] h-[24px]" @click="userPanel=!userPanel" src="@/assets/image/icon/icon-lang.png" alt="">
        <div class="connect-content flex items-center justify-center">
          <div class="flex items-center z-[2]" v-if="!username" @click="web3Log">{{ $t('common.walletConnect') }}</div>
          <div class="flex items-center z-[2]" v-else @click="userPanel=!userPanel">
            {{ $filters.prefix(username, 3, 3) }}
            <img src="@/assets/image/icon/loginOut.png" alt="">
          </div>
        </div>
        <!--        <van-popover v-model="showPopover" trigger="click" :actions="actions" @select="onSelect"-->
        <!--                     placement="bottom-end">-->
        <!--          <template #reference>-->
        <!--          </template>-->
        <!--        </van-popover>-->
      </div>
    </template>
  </van-nav-bar>
  <PopupRegister ref="register"></PopupRegister>
  <PopupUserPanel v-model:show="userPanel" ref="loginOut"></PopupUserPanel>
</template>

<script setup>
import PopupUserPanel from '@/components/popup/popup-userPanel.vue'
const PopupRegister = defineAsyncComponent(() => import('@/components/popup/popup-register.vue'))


import {storeToRefs} from 'pinia';
import {appStore} from '@/stores/index'
import {login, _register, _loginOut} from '@/service/user'
import Web3 from '@/utils/web3js/bnbWeb3'
import {useI18n} from 'vue-i18n'

const {t} = useI18n();
const router = useRouter()
const store = appStore();
const {user, code} = storeToRefs(store);
const {proxy} = getCurrentInstance();
const username = computed(() => user.value.username);

const loginOut = ref(null)
const btnStatus = ref(false)
const userPanel = ref(false)
const register = ref(null);
const menu = ref(null);
const message = ref('DAPP');
const signature = ref(null);

const registerFun = async (signature, account, message) => {
  let params = {
    signature,
    username: account,
    message,
    code: router.currentRoute.value.query.code || code.value || '',
  }
  let result = await _register(params);
  btnStatus.value = false
  store.$patch({
    user: result.aMap,
    token: result.T,
  });
}

const web3Log = async () => {
  if (btnStatus.value) {
    return; // 如果函数正在执行，不执行重复操作
  }
  await _loginOut();
  store.$patch({
    address: "",
    token: "",
    user: [],
    info: [],
  });
  btnStatus.value = true
  proxy.$toast.loading(t('common.contractRequesting'));
  Web3.getAccountAndSignMessage().then(async ({account, signature}) => {
    store.changeAddress(account);
    proxy.$toast.loading(t('common.loggingIn'));
    let results;
    results = await login({
      message: message.value,
      signature: signature,
      username: account,
    });
    proxy.$toast.close();
    if (results.exist === false) {
      btnStatus.value = false
      register.value.show = true
      register.value.form.signature = signature;
      register.value.form.username = account;
      register.value.form.message = message.value;
      register.value.form.code = router.currentRoute.value.query.code;
      // await registerFun(signature, account, message.value)
    } else {
      btnStatus.value = false
      store.$patch({
        user: results.aMap,
        token: results.T
      });
    }
  }).catch(error => {
    btnStatus.value = false
    console.error("External error:", error);
    proxy.$toast.error(error);
  });
}

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




.menu {
  margin-top: 2px;
  width: 30px;
  height: 30px;
}

.van-nav-bar-background-red {
  //border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  //box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.10);
  background: rgba(0, 0, 0, 0.40);
  backdrop-filter: blur(10px);
}

.connect-main {
  width: 100%;

  .connect-content {
    padding: 0 10px;
    min-width: 97px;
    line-height: 30px;
    text-align: center;
    height: 32px;
    margin-left: 10px;

    font-size: 14px;
    box-sizing: border-box;
    border-radius: 24px;
    border: 1px solid  #fff;
    //background: #010206;
    //box-shadow: 0  0  12px 0  rgba(255, 178, 29, 0.50) inset;

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
