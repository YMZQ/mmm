<template>
  <van-popup v-model:show="show" round :close-on-click-overlay="false"
             :position="'bottom'"
             :close-icon="getImageUrl('icon_tips_close-1')"
             :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, 0.4)',backdropFilter: 'blur(5px)'}">
    <div class="w-full px-15 pt-50 bg-[#fff]">
      <div class="text-center">
        <img class="w-[48px] h-[48px] mx-auto mb-14" src="@/assets/image/icon/icon-user.png" alt="">
        <div class="text-20 font-600 mb-15 text-[#000]">{{ $t('auth.welcome') }}</div>
        <div class="text-14 font-400 text-[#8C91A2]">{{ $t('auth.bindActivate') }}</div>
      </div>
      <div class="pt-[25px] pb-[62px]">
        <van-form @submit="onSubmit">
          <van-cell-group :border="false">
            <van-field v-model.trim="form.code" label-align="top"
                       :placeholder="$t('auth.enterInvitationCode')"
                       :rules="[{ required: true, message: $t('auth.enterInvitationCode') }]"/>
          </van-cell-group>
          <div class="mx-auto mt-15">
            <van-button class="w-full " native-type="submit">
              {{ $t('auth.bindActivate') }}
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
const show = ref(false);
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

:deep(.van-button--default) {
  position: relative;
  border-radius: 8px !important;
  color: #1C3B5E !important;
  border: 1px solid #000 !important;
  background: #56E8FF !important;
  box-shadow: 2px 2px 0 0 #000 !important;

  .van-button__text {
    width: 100%;
  }
}

:deep(.van-cell__value) {
  border-radius: 10px !important;
  background: rgba(0, 0, 0, 0.05) !important;

  .van-field__control {
    text-align: center;
    font-size: 14px !important;
    color: #161616 !important;
    --van-field-placeholder-text-color: #8C91A2 !important;
  }
}
</style>
