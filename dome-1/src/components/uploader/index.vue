<template>
  <van-uploader
      v-model="fileList"
      reupload
      multiple
      :deletable="true"
      :max-count="3"
      :after-read="onFileSelected"
      class="custom-uploader"
      :disabled="disabled"
  ></van-uploader>
</template>
<script setup>
import axios from 'axios';
import {getUploadConfig} from "@/service/user";

const {uploadedImageUrl,disabled} = defineProps(['uploadedImageUrl','disabled']);
const emit = defineEmits(['callback','callBackData']);
const fileList = ref([]);
const list = ref([]);
const VideoFormat = (type)=>{
  return type === 'mp4' || type === 'MP4' || type === 'mov' || type === 'MOV';
}
const onFileSelected = async (file) => {
  let result = await getUploadConfig();
  let type = file.file.name.split('.')
  type = type[type.length - 1]
  if (VideoFormat(type)) {
    emit('callback', 'video');
  }else{
    emit('callback', 'img');
  }

  let fileName = file.file.name;
  let date = new Date().getTime();
  let fileNames = `${date}_${fileName}`;

  try {
    const formData = new FormData();
    formData.append("name", fileNames);
    formData.append("key", result.respMap.dir + '/' + fileNames);
    formData.append("policy", result.respMap.policy);
    formData.append("OSSAccessKeyId", result.respMap.OSSAccessKeyId);
    formData.append("signature", result.respMap.Signature);
    formData.append("file", file.file);
    formData.append('success_action_status', '200')
    const response = await axios.post(result.respMap.host, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    if (response.status === 200) {
      const imageUrl = result.respMap.host + '/' + result.respMap.dir + '/' + fileNames;
      emit('update:uploadedImageUrl', imageUrl);
      emit('update:uploadedImageUrl', imageUrl);
      emit('callback', 'success');
    } else {
      console.error("error", response);
    }
  } catch (error) {
    const imageUrl = result.respMap.host + '/' + result.respMap.dir + '/' + fileNames;
    list.value.push(imageUrl)
    emit('update:uploadedImageUrl', imageUrl);
    emit('update:uploadedImageUrl', imageUrl);
    emit('callback', 'success');
    emit('callBackData', list.value);
  }
};


</script>
<style scoped lang="less">
/* 自定义组件样式 */
.custom-uploader {
  //width: 102px;
  //height: 102px;
  //border-radius: 4px;
  //border: 1px solid rgba(255, 255, 255, 0.20);
}

/* 已上传图片样式 */
.uploaded-image {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.uploaded-image img {
  width: 102px;
  height: 102px;
}
:deep(.van-image__img){
  width: 100px;
  height: 100px;
}
:deep(.van-uploader__wrapper){
  //width: 100px;
  //height: 100px;
  .van-uploader__preview{
    width: 100px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.20);
    .van-image{
      width: 100px;
      height: 100px;
      border-radius: 4px;
    }
  }
}
:deep(.van-uploader__upload){
  width: 100px;
  height: 100px;
  margin: 0;
  border-radius: 4px;
  background-color: #120a01!important;
  border: 1px solid rgba(255, 255, 255, 0.20);
}
</style>
