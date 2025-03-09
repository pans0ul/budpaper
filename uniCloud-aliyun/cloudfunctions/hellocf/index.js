// hellocf云函数index.js入口文件代码
'use strict';
exports.main = async (event, context) => {
 //event为客户端上传的参数
 let c = event.a + event.b
 return {
  sum: c
 } // 通过return返回结果给客户端
}
