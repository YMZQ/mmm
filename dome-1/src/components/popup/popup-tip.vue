<template>
  <van-popup v-model:show="show" round :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, 0.4)'}">
    <div class="w-[300px] bg-[#232323] rounded-[12px] ">
      {{propsType}}
      <div v-if="tip" class="text-center pt-[15px] pb-[18px] text-[18px] font-bold">{{ tip }}</div>
      <div class="px-[15px] pt-[40px] pb-[15px]">
        <img v-if="propsType===1" class="w-[126px] h-[105px] mx-auto" src="@/assets/image/icon/icon-success.png"
             alt="">
        <img v-if="propsType===2" class="w-[126px] h-[105px] mx-auto" src="@/assets/image/icon/icon-warn.png"
             alt="">
        <div v-if="msg" class="mt-[20px] text-center text-[16px]"> {{ msg }}</div>
        <div v-if="subMsg" class="text-[#F8FC50] text-[14px] mt-[10px]"> {{ subMsg }}</div>
        <div v-if="confirmButton && cancelButton"
             class="mt-[35px] flex items-center justify-between">
          <div v-if="cancelButton===false" class="cancelButton" @click="onClose">
            {{ cancelButtonText }}
          </div>
          <div v-else class="cancelButton" @click="cancelFun">{{ cancelButtonText }}</div>
          <div class="confirmButton" @click="confirmFun">{{ confirmButtonText }}</div>
        </div>
        <div v-else-if="confirmButton" class="mt-[35px] flex items-center justify-center">
          <div class="confirmButton" @click="confirmFun">{{ confirmButtonText }}</div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const emits = defineEmits(['cancelButtonFun', 'confirmButtonFun']);
const props = defineProps({
  tip: String,
  msg: String,
  subMsg: String,
  btnMsg: String,
  propsType: Number,
  confirmButton: {
    type: Boolean,
    default: false
  },
  cancelButton: {
    type: Boolean,
    default: false
  },
  cancelButtonText: String,
  confirmButtonText: String,
  cancelButtonFun: Function,
  confirmButtonFun: Function,
  auto: {
    type: Boolean,
    default: true
  },
});

const cancelButtonText = props.cancelButtonText || t('popup.tip.cancelButtonText');
const confirmButtonText = props.confirmButtonText || t('popup.tip.confirmButtonText');

const show = ref(false);

const onClose = async () => {
  show.value = false
};

watch(() => show.value, () => {
  if (props.auto && show.value === true) {
    autoClose();
  }
})

const autoClose = () => {
  if (props.auto) {
    setTimeout(() => {
      show.value = false;
    }, 2000);
  }
};

const confirmFun = () => {
  emits('confirmButtonFun');
  show.value = false;
}

const cancelFun = () => {
  emits('cancelButtonFun')
  show.value = false;
}

const getImageUrl = (name) => {
  return new URL(`/src/assets/image/icon/${name}.png`, import.meta.url).href
}

onMounted(autoClose);

defineExpose({show});
</script>

<style lang="less" scoped>
.cancelButton {
  width: 125px;
  height: 40px;
  line-height: 40px;
  color: #8A8A8A;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  position: relative;
  border-radius: 34px;
  background: #2E2E2E;
}

.confirmButton {
  width: 125px;
  height: 40px;
  line-height: 40px;
  color: #1B1C1D;
  font-size: 14px;
  text-align: center;
  position: relative;


  border-radius: 34px;
  background: linear-gradient(135deg, #FFF88E 0%, #FF9D0A 100%);
}
</style>
