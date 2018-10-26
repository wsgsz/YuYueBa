/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgUrl: 图片存放地址
 * 
 */
let baseUrl = '';
let routerMode = 'history';
let imgUrl;

if (process.env.NODE_ENV == 'development') {
	// baseUrl = 'http://192.168.0.135:8080/baiduyuyue/';
 // // baseUrl = 'https://www.baiduyuyue.com/appointment/';
 //  imgUrl = 'http://images.baiduyuyue.com/';
  baseUrl = 'https://www.baiduyuyue.com/appointment/';
   imgUrl = 'http://images.baiduyuyue.com/';
} else {
   baseUrl = 'https://www.baiduyuyue.com/appointment/';
   imgUrl = 'http://images.baiduyuyue.com/';
}

export {
  baseUrl,
  routerMode,
  imgUrl
}
