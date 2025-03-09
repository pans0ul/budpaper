<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onLoad() {
			console.log('App Onload')
		  // this.fetchImage(); // 页面加载时自动获取图片
		  this.hellof();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
