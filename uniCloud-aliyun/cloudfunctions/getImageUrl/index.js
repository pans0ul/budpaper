'use strict';
// const uniCloud = require('uni-cloud');

exports.main = async (event, context) => {
  console.log("云函数 getImageUrl 被调用");

  // 从 event 中获取文件 ID
  const fileID = event.fileID;
  if (!fileID) {
    return { code: 1, msg: "缺少文件 ID" };
  }

  console.log("文件 ID:", fileID);

  try {
    const res = await uniCloud.getTempFileURL({ fileList: [fileID] });
    console.log("获取到的图片 URL:", res);

    if (res.fileList.length > 0 && res.fileList[0].tempFileURL) {
      return {
        code: 0,
        msg: "获取成功",
        imageUrl: res.fileList[0].tempFileURL
      };
    } else {
      return { code: 1, msg: "未找到图片" };
    }
  } catch (error) {
    console.error("云函数执行失败", error);
    return { code: 500, msg: "云函数执行失败", error };
  }
};