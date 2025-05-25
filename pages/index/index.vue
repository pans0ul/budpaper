// 使用 uni-app 进行开发
<template>
  <view class="container">

	<swiper circular>
<!-- 		<swiper-item v-for="item in 5">
			<image @tap="toggleImage" :src="currentImage" mode="aspectFill" ></image>
		</swiper-item> -->
		<swiper-item v-for="item,index in listData" :key="item._id">
			<image :src="item.picurl.url" mode="aspectFill" @tap="toggleChangeMode()"></image>
			<text v-if="!wallpaperMode" class="description">{{item.description}}</text>
		</swiper-item>
	</swiper>

<!-- 	<view class="miniTime">
		<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
		</view> -->
	<view v-if="wallpaperMode" class="time">
		<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
	</view>
	<view v-if="wallpaperMode" class="date">
		<uni-dateformat :date="new Date()" format="M月dd日"></uni-dateformat>
	</view>
	<text v-if="wallpaperMode" class="dayOfWeek">{{dayOfWeek}}</text>
	<!-- camera-icon -->
	<uni-icons v-if="wallpaperMode" class="icon-camera" type="camera-filled" size="25" color="white"></uni-icons>
	<uni-icons v-if="wallpaperMode" class="plate-right" type="smallcircle-filled" size="60" color="white"></uni-icons>
	<!-- camera-icon -->
	<view v-if="wallpaperMode" class="button-goto-manage-page" @click="GotoManagePage">
		<button size="mini" type="primary" class="transparent-button">"			"</button>
	</view>
	<!-- light-icon -->
	<uni-icons v-if="wallpaperMode" class="icon-light" type="camera-filled" size="25" color="white"></uni-icons>
	<uni-icons v-if="wallpaperMode" class="plate-left" type="smallcircle-filled" size="60" color="white"></uni-icons>
	<!-- light-icon -->
  </view>
</template>

<script setup>
		
import { ref } from 'vue';  //创建响应式引用
const listData = ref([]);
const previewImg = ref(null);
const wallpaperMode = ref();

const db = uniCloud.database();
const EDayOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const curDate = new Date();
const dayOfWeek = EDayOfWeek[curDate.getDay()];
console.log(dayOfWeek); 

const toggleChangeMode = (img) => {
  wallpaperMode.value = (wallpaperMode.value === true) ? false : true;
};

const getData = async()=>{
	console.log("获取数据");
	// let {result:{data,errCode}} = await db.collection('demo-wallpaper').get();
	let {result:{data,errCode}} = await db.collection('demo-wallpaper')
	.field({
		description:true,
		picurl:true,
		createTime:true
		})
	.orderBy('createTime','desc')
	.get();
	
	//console("print data",data);
	if(errCode == 0)
	{
		listData.value = data;
	}
}

const printItemInfo = (item) => {
  console.log('当前 item 信息:', item);
}
getData();

</script>

<script>
export default {

};

const GotoManagePage = ()=>{
	uni.reLaunch({
		url: '/pages/index/managePic', // 替换为你实际要跳转的页面路径
		success: () => {
		},
		fail: (err) => {
			console.error('页面跳转失败', err);
		}
	});
}

</script>

<style lang="scss" scoped>
.previewMode {
	.preview-img {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  // background: black;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
}

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
.description
{
	position: absolute;
	color: white;
	font-size: 35rpx;
	text-shadow: 0 1rpx rgba(0, 0, 0, 0.3);
	top: 50px;
	left: 20px;
	right: 20px;
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
.button-goto-manage-page{
	position: absolute;
	display: grid;
	place-items: center;
	bottom: 15.8vh;
	left: 16.4vw;
	.transparent-button {
	    background-color: transparent;
	    border: none;
	    z-index: 9999;
	    position: relative;
	}
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

