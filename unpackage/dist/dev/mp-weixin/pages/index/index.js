"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // originalImage: '', // 初始为空，后端获取
      // clickedImage: '/static/clicked.png', // 本地图片
      // currentImage: '' // 当前图片
    };
  },
  methods: {
    hellof() {
      common_vendor.er.callFunction({
        name: "hellocf",
        data: { a: 4, b: 2 }
      }).then((res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:28", res);
      });
    }
  }
  //  async created() {
  //    await this.fetchImage(); // 获取后端图片
  //  },
  // methods: {
  //   async fetchImage() {
  // 	try {
  // 	  const res = await uniCloud.callFunction({
  // 		name: 'getImageUrl'
  // 	  });
  // 	  if (res.result.code === 0) {
  // 		this.originalImage = res.result.imageUrl;
  // 		this.currentImage = this.originalImage;
  // 	  } else {
  // 		uni.__f__('error','at pages/index/index.vue:45','获取图片失败', res.result.msg);
  // 	  }
  // 	} catch (error) {
  // 	  uni.__f__('error','at pages/index/index.vue:48','请求云函数失败', error);
  // 	}
  //   }
  // }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.hellof && $options.hellof(...args)),
    b: _ctx.currentImage,
    c: common_vendor.o((...args) => _ctx.toggleImage && _ctx.toggleImage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
