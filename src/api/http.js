// import axios from 'axios'
// import qs from 'qs'

// axios.defaults.timeout = 5000
// // axios.defaults.baseURL = 'http://47.93.34.26:8085/appointment/'

// axios.interceptors.request.use( // http request 拦截器
//   config => {
//     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     config.data = qs.stringify(config.data)
//     config.headers = {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     // if(token){
//     //   config.params = {'token':token}
//     // }
//     return config
//   }
//   // error => {
//   //   return Promise.reject(err)
//   // }
// )

// // http response 拦截器
// // axios.interceptors.response.use(
// //   response => {
// //     if(response.data.errCode ==2){
// //       router.push({
// //         path:"/login",
// //         querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
// //       })
// //     }
// //     return response;
// //   },
// //   error => {
// //     return Promise.reject(error)
// //   }
// // )
// /**
//  * 封装get方法
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */
// export function fetch(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, {
//         params: params
//       })
//       .then(response => {
//         resolve(response.data)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

// /**
//  * 封装post请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function post(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, data)
//       .then(response => {
//         resolve(response.data)
//       }, err => {
//         reject(err)
//       })
//   })
// }

// /**
//  * 封装patch请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */
