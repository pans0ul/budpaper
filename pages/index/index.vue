// 使用 uni-app 进行开发
<!-- 先做前端页面 -->
<template>
  <view class="container">
	<swiper circular >
		<swiper-item v-for="item in 5">
			<image @tap="toggleImage" :src="currentImage" mode="aspectFill" ></image>
		</swiper-item>
	</swiper>
<!-- 	<view class="miniTime">
		<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
		</view> -->

	<view class="time">
		<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
	</view>
	<view class="date">
		<uni-dateformat :date="new Date()" format="M月dd日"></uni-dateformat>
	</view>
	<text class="dayOfWeek">{{dayOfWeek}}</text>
	<!-- camera-icon -->
	<uni-icons class="icon-camera" type="camera-filled" size="25" color="white"></uni-icons>
	<uni-icons class="plate-right" type="smallcircle-filled" size="60" color="white"></uni-icons>
	<!-- camera-icon -->
	<!-- light-icon -->
	<uni-icons class="icon-light" type="camera-filled" size="25" color="white"></uni-icons>
	<uni-icons class="plate-left" type="smallcircle-filled" size="60" color="white"></uni-icons>
	<!-- light-icon -->
  </view>
</template>

<script setup>
	import { ref } from 'vue';
	
	const EDayOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const curDate = new Date();
	const dayOfWeek = EDayOfWeek[curDate.getDay()];
	console.log(dayOfWeek); 

	
</script>

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
  swiper{
  	width: 100%;
  	height: 100%;
	image{
		width: 100%;
		height: 100%;
		}
	}
}
// .miniTime{		
// 	position: absolute;  //TODO: relative to image
// 	color: #ffffff;
// 	font-size: 30rpx;
// 	top: 22px;
// 	left: 22px;
// 	font-weight: bold;
// 	line-height: 1em;
// 	// text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
// }
.time{
	position: absolute; //TODO: relative to image
	color: #ffffff;
	display: grid;
	place-items: center;
	font-size: 160rpx;
	top:11.8vh;
	font-weight: 360;
	line-height: 1em;
	text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
}
.date{
	position: absolute; //TODO: relative to image
	color: #ffffff;
	display: grid;
	place-items: center;
	font-size: 42rpx;  
	top: 21.5vh;
	text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
	right: 46+1.8vw
}
.dayOfWeek{
	position: absolute;
	color: #ffffff;
	display: grid;
	place-items: center;
	font-size: 42rpx;
	top: 21.5vh;
	right: 28+1.8vw;	
}
.icon-camera{
	position: absolute;
	display: grid;
	place-items: center;
	bottom: 15.8vh;
	right: 14.8vw;
}
.plate-right{
	position: absolute;
	display: grid;
	place-items: center;
	opacity: 0.5;
	bottom: 13.5vh; //Viewport Height
	right: 10vw;	//Viewport Width

}
.icon-light{
	position: absolute;
	display: grid;
	place-items: center;
	bottom: 15.8vh;
	left: 16.4vw;

}
.plate-left{
	position: absolute;
	display: grid;
	place-items: center;
	opacity: 0.5;
	bottom: 13.5vh; //Viewport Height
	left: 11.8vw;	//Viewport Width

}
.text{
	position: absolute;
	color: white;
	font-size: 20rpx;
	top: 100px;
	left: 100px;
	
}
</style>

