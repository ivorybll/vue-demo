import axios from 'axios'
import qs from 'qs'

let instance = axios.create()
// let api = ''
// console.log(process.env.VUE_APP_BASE_API1)
// switch (type) {
//   case 1:
//     api = VUE_APP_BASE_API1
//     break;
//   case 2

// }
// instance.defaults.baseURL = 'http://www.superkid.cn/api/TeacherAppraise'
// console.log(instance.defaults.baseURL)

// instance.defaults.timeout = 5000
//请求拦截
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// 响应拦截
instance.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)
let post = (url, params, openidType = true) => {
  if (openidType) {
    Object.assign(params, {
      openid: 'oRCNd1smG_kVC3PaosSmWr4zzY-k'
    })

  }
  return new Promise((resolve, reject) => {
    instance.post(url, qs.stringify(params)).then((res) => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
let get = (url, params, openidType = true) => {
  if (openidType) {
    Object.assign(params, {
      openid: 'oRCNd1smG_kVC3PaosSmWr4zzY-k'
    })
  }
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export {
  get,
  post
}
// const api = (num = 1, openType = false) => {
//   let instance = axios.create()
//   // let api = ''
//   // console.log(process.env.VUE_APP_BASE_API1)
//   // switch (type) {
//   //   case 1:
//   //     api = VUE_APP_BASE_API1
//   //     break;
//   //   case 2

//   // }
//   instance.defaults.baseURL = process.env['VUE_APP_BASE_API' + num]
//   console.log(instance.defaults.baseURL)

//   instance.defaults.timeout = 5000
//   //请求拦截
//   instance.interceptors.request.use(
//     config => {
//       return config
//     },
//     error => {
//       console.log(error)
//       return Promise.reject(error)
//     }
//   )
//   // 响应拦截
//   instance.interceptors.response.use(
//     response => {
//       const res = response.data
//       return res
//     },
//     error => {
//       console.log('err' + error)
//       return Promise.reject(error)
//     }
//   )
//   return {

//     post: (url, params) => {
//       if (openType) {
//         Object.assign(params, { openid: 'oRCNd1smG_kVC3PaosSmWr4zzY-k' })
//       }

//       return new Promise((resolve, reject) => {
//         instance.post(url, qs.stringify(params)).then((res) => {
//           resolve(res)
//         }).catch(err => {
//           reject(err)
//         })
//       })
//     },
//     get: (url, params) => {
//       if (openType) {
//         Object.assign(params, { openid: 'oRCNd1smG_kVC3PaosSmWr4zzY-k' })

//       }

//       return new Promise((resolve, reject) => {
//         instance.get(url, { params: params }).then(res => {
//           resolve(res)
//         }).catch(err => {
//           reject(err)
//         })
//       })
//     }

//   }



// }
// export default api
