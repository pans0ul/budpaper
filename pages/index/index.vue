// 使用 uni-app 进行开发
<template>
  <view class="container">

	<swiper circular>
<!-- 		<swiper-item v-for="item in 5">
			<image @tap="toggleImage" :src="currentImage" mode="aspectFill" ></image>
		</swiper-item> -->
		<swiper-item v-for="item,index in listData" :key="item._id">
			<image :src="item.picurl.url" mode="aspectFill" @tap="toggleChangeMode" @touchstart="onTouchStart"
			@longpress="showSaveButton(item.picurl.url)"></image>
			<text v-if="!wallpaperMode" class="description">{{item.description}}</text>
		</swiper-item>
	</swiper>

  <view
    v-if="showSave"
    class="save-float-button"
    :style="{ top: saveBtnY + 'px', left: saveBtnX + 'px' }"
    @click="download(currentImageUrl)"
  >
    长按保存
  </view>
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
const currentImageUrl = ref();
const wallpaperMode = ref();
const showSave = ref();
const saveBtnX = ref();
const saveBtnY = ref();
const db = uniCloud.database();
const EDayOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const curDate = new Date();
const dayOfWeek = EDayOfWeek[curDate.getDay()];
console.log(dayOfWeek); 

uni.loadFontFace({
  family: 'gutifangsong',
  source: 'url("https://mp-45be7326-2629-4d05-ae43-15707ed3f53a.cdn.bspapp.com/WenYue_GuTiFangSong_F.subset.otf")',
  success() {
    console.log('字体加载成功');
  },
  fail(err) {
    console.error('字体加载失败', err);
  }
});

let timeoutId = null;

const toggleChangeMode = () =>{
  wallpaperMode.value = !wallpaperMode.value;
};

const onTouchStart = (e) => {
      const touch = e.touches[0];
      saveBtnX.value = touch.clientX;
      saveBtnY.value = touch.clientY;
    }


const showSaveButton = (imgurl) => {
      currentImageUrl.value = imgurl;
      showSave.value = true;
	  
  if (timeoutId) clearTimeout(timeoutId);

      //自动隐藏
      timeoutId = setTimeout(() => {
        showSave.value = false;
		timeoutId = null;
      }, 1500);
    }

const download = async (imgurl) => {
	showSave.value = false; // 隐藏按钮
  try {
    // 权限检查
    const authRes = await uni.getSetting();
    if (!authRes.authSetting['scope.writePhotosAlbum']) {
      try {
        await uni.authorize({ scope: 'scope.writePhotosAlbum' });
      } catch (e) {
        await uni.showModal({
          title: '提示',
          content: '请前往设置开启保存图片权限',
          success: (res) => {
            if (res.confirm) uni.openSetting();
          }
        });
        return;
      }
    }

    uni.showLoading({ title: '保存中...' });

    // 下载文件
    const downloadRes = await uni.downloadFile({ url: imgurl });
    if (downloadRes.statusCode === 200 && downloadRes.tempFilePath) {
      await uni.saveImageToPhotosAlbum({
        filePath: downloadRes.tempFilePath
      });
      uni.showToast({
        title: '保存成功',
        icon: 'none'
      });
    } else {
      throw new Error('下载失败');
    }
  } catch (err) {
    console.error('保存失败:', err);
    uni.showToast({
      title: '保存失败',
      icon: 'none'
    });
  } finally {
    uni.hideLoading();
  }
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
			color: snow;
			font-size: 42rpx;
			font-family: 'gutifangsong';
			text-shadow: 0 6rpx rgba(0, 0, 0, 0.3);
			top: 120px;
			bottom: 60px;
			left: 20px;
			line-height: 1.2;
			// right: 20px;
			// padding: 0 20rpx;
			// border-radius: 10rpx;
			// border: 1rpx solid rgba(255, 255, 255, 0.3);	
			// background-color: transparent;
			writing-mode: vertical-rl;
			text-orientation: upright;
			// line-height: 40rpx;
		}
	}
}

.save-float-button {
  position: fixed;
  z-index: 999;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 16rpx 32rpx;
  border-radius: 16rpx;
  font-size: 28rpx;
}
.save-button {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 28rpx;
  padding: 20rpx 40rpx;
  border-radius: 16rpx;
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
	text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
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
		opacity: 0;
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

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 28rpx;
  opacity: 0.8;
}
</style>

