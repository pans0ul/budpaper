<template>
  <view class="container">
    <button @click="getImage">获取图片</button>
    <image :src="imageUrl" v-if="imageUrl" mode="aspectFit"></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  methods: {
    async getImage() {
      try {
        // 替换为你实际的文件 ID
        const fileID = '4b77cb91-e20c-4491-9db9-49530b603ac6'; 
        const res = await uniCloud.callFunction({
          name: 'getImageUrl',
          data: {
            fileID
          }
        });

        if (res.result.code === 0) {
          this.imageUrl = res.result.imageUrl;
        } else {
          console.error('获取图片失败', res.result.msg);
        }
      } catch (error) {
        console.error('请求云函数失败', error);
      }
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>