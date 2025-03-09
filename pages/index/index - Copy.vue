// 使用 uni-app 进行开发
<template>
  <view class="container">
    <image :src="currentImage" class="image" @tap="toggleImage"
	    mode="scaleToFill"
	    style="width: 100%; height: 100%;"	></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      originalImage: '/static/original.jpg', // 第一张图片
      clickedImage: '/static/clicked.jpg', // 第二张图片
      currentImage: '/static/original.jpg' // 初始图片
    };
  },
  methods: {
    toggleImage() {
      this.currentImage = this.currentImage === this.originalImage ? this.clickedImage : this.originalImage;
    }
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
}
.image {
  width: 90%;
  height: auto;
  max-width: 500px;
}
</style>
