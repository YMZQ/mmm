<template>
  <div>
    <input v-model="qrCode" placeholder="二维码将会在此显示">
    <label for="file-upload" class="custom-file-upload">
      <i class="fa fa-camera"></i> 扫一扫
    </label>
    <input id="file-upload" type="file" @change="handleFileUpload" accept="image/*" style="display: none;">
  </div>
</template>

<script>
import jsQR from 'jsqr';

export default {
  data() {
    return {
      qrCode: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgDataUrl = e.target.result;
          this.decodeQRCode(imgDataUrl);
        };
        reader.readAsDataURL(file);
      }
    },
    decodeQRCode(imgDataUrl) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          this.qrCode = code.data;
        } else {
          this.qrCode = '未能识别二维码';
        }
      };
      img.src = imgDataUrl;
    }
  }
};
</script>

<style>
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #f2f2f2;
}

.custom-file-upload:hover {
  background-color: #e6e6e6;
}
</style>
