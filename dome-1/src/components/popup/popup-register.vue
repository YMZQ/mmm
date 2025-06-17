<template>
  <van-popup v-model:show="show" round :close-on-click-overlay="false"
             :position="'bottom'"
             :close-icon="getImageUrl('icon_tips_close-1')"
             :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, 0.4)',backdropFilter: 'blur(5px)'}">
    <div class="w-full px-15 pt-50 bg-[#161616] ">
      <div class="text-center">
        <img class="w-[48px] h-[48px] mx-auto mb-14" src="@/assets/image/icon/icon-user.png" alt="">
        <div class="text-20 font-600 mb-15 text-[#fff]">{{ $t('auth.welcome') }}</div>
        <div class="text-14 font-400 text-[#8C91A2]">{{ $t('auth.referralBindPrompt') }}</div>
      </div>
      <div class="pt-[25px] pb-[62px]">
        <van-form @submit="onSubmit">
          <van-cell-group :border="false">
            <van-field v-model.trim="form.code" label-align="top"
                       :placeholder="$t('auth.referralInputCode')"
                       :rules="[{ required: true, message: $t('auth.referralInputCode') }]"/>
          </van-cell-group>
          <div class="mx-auto mt-15">
            <van-button class="w-full " native-type="submit">
              {{ $t('auth.referralConfirm') }}
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import {appStore} from '@/stores/index'
import {ref, reactive, getCurrentInstance} from 'vue'
import {_register} from '@/service/user'

const {proxy} = getCurrentInstance();
const store = appStore();
const emit = defineEmits(['nextStep']);
const show = ref(true);
const form = reactive({
  signature: '', //
  username: '', //
  message: '', //
  code: '', //
})
const getImageUrl = (name) => {
  return new URL(`/src/assets/image/icon/${name}.png`, import.meta.url).href
}
const onSubmit = async () => {
  proxy.$toast.loading();
  let result = await _register(form);
  proxy.$toast.close();
  show.value = false;
  result.aMap.address = result.aMap.username;
  store.$patch({
    user: result.aMap,
    token: result.T
  });
};
// 抛出方法，只有抛出方法，父组件的ref才能获取得到
defineExpose({show, form});
</script>

<style lang="less" scoped>
:deep(.van-popup) {
  background: #fff !important;

}
.van-popup--round{
  border-radius: 20px !important;

}
:deep(.van-button--default) {
  position: relative;
  border-radius: 20px !important;
  color: #fff !important;
  background: linear-gradient(180deg, #FFB59F 0%, #EA3400 100%) !important;

  .van-button__text {
    width: 100%;
  }
}

:deep(.van-cell__value) {
  border-radius: 20px !important;
  background: rgba(255, 255, 255, 0.05) !important;

  .van-field__body {
    height: 48px !important;
  }

  .van-field__control {
    text-align: center;
    font-size: 14px !important;
    color: #fff !important;
    --van-field-placeholder-text-color: #8C91A2 !important;
  }

  .van-field__error-message {
    text-align: center;
    padding: 2px 0;
  }
}
</style>
