import originJSONP from 'jsonp';

// 对外暴露封装后的方法 jsonp

export default function jsonp(url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    originJSONP(url, options, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

// 拼接url
function param(data) {
  let url = '';
  for (var k in data) {
    let value = data[k] !== void 0 ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';
}

/* 过滤参数 */
// function query(params) {
//   const param = params;
//   for (var i in param) {
//     if (!param[i] && param[i] == 0) {
//       delete param[i];
//     }
//   }
//   return param;
// }

// function unique(array) {
//   return Array.from(new Set(array));
// }
