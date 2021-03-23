import urlMap from './UrlMap'

var servicebus = require('./servicebus.js')
var iconv  = require('iconv-lite');
//测试用例
var host = '192.6.77.15'
// var port = 18530
var port = 18532
//超时时间，单位秒
var timeout = 60
//首次发送失败，是否重发。1：重发，0不重发
var resendFlag = 1

export const serRequestService = function (url,params) {
  return new Promise(function (resolve, reject) {
    let code = urlMap[url];
    console.log("code:",code);
    if(!code){
      console.error("没有找到url!")
      return;
    }
    console.log("params:"+params)
    let byte = [0,0,0,code]
    let str_byte = iconv.encode(params, 'GB2312')
    let code_buf = Buffer.from(byte)
    let buf_total = Buffer.concat([code_buf, str_byte], code_buf.length+str_byte.length);
    console.log(buf_total)
    //请求数据为Buffer类型，且不能为空(undefined，null，或者request.length==0)，若为空则不发送。
    servicebus.serviceRequest(host, port, buf_total, timeout, resendFlag, function (err, response) {
      let resp_data = "";
      if (err < 0) {
        return null;
      } else {
        resp_data = iconv.decode(response, 'gb2312').toString();
      }
      let last_str = resp_data.substring(resp_data.length-1);
      if(last_str == "\0"){
        resp_data = resp_data.substring(0,resp_data.length-1);
      }
      resolve(resp_data);
    })
  })
}



// // //通过代理访问服务
// var proxyHost = '172.28.202.132'//代理地址
// //  var proxyHost="127.0.0.1";//代理地址
// var domain = 'JKXT1'
// var sname = 'test_proxy_server'
// var version = 0
// var scene = 'realtime'
// var scene_id = 1
// var subscene = 'public'
// var sub_id = 1
// var manufactor = 'nari'
//
// resources.forEach(function (res) {
//     //请求数据为Buffer类型，且不能为空(undefined，null，或者request.length==0)，若为空则不发送。
//     servicebus.telserviceRequest(proxyHost, Buffer.from(res), timeout, resendFlag, domain, sname, version, scene, scene_id, subscene, sub_id, manufactor, function (err, response) {
//       if (err < 0) {
//         console.log('tel proxy send failed!')
//       } else {
//         console.log('tel proxy response data:' + response)
//       }
//     })
//   }
// )
