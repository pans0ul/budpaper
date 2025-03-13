// 使用 uni-app 进行开发
<!-- 先做前端页面 -->
<template>
  <view class="container">
    <image :src="currentImage" class="image" @tap="toggleImage"
	    mode="scaleToFill"
	    style="width: 100%; height: 100%;"	></image>
	<view class="time">
		<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
	</view>
		<view class="text">信息a1232131232</view>
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

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
}
.image {
  width: 80%;
  height: auto;
  max-width: 500px;
}
.time{			
	font-size: 140rpx;
	top:calc(10vh + 80rpx);		
	font-weight: 100;
	line-height: 1em;
	text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
}
.text{
	color: white;
	font-size: 20rpx
}
</style>
