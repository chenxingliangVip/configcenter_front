function intToByte4 (i) {
  var targets = []
  targets[0] = (i & 0xFF)
  targets[1] = (i >> 8 & 0xFF)
  targets[2] = (i >> 16 & 0xFF)
  targets[3] = (i >> 24 & 0xFF)
  return targets
}

var servicebus = require('./servicebus.js')
var iconv  = require('iconv-lite');

export const serRequestService = function () {
  //测试用例
  var host = '192.6.77.15'
  var port = 18430
//超时时间，单位秒
  var timeout = 60
//首次发送失败，是否重发。1：重发，0不重发
  var resendFlag = 1
//发送内容数组
  var resources = ['张平', 'welcome']
//直连服务
  resources.forEach(function (res) {
      let byte = intToByte4(0)
      let str_byte = iconv.encode(res, 'GB2312')
      let code_buf = Buffer.from(byte)
      let buf_total = Buffer.concat([code_buf, str_byte], code_buf.length+str_byte.length);
      //请求数据为Buffer类型，且不能为空(undefined，null，或者request.length==0)，若为空则不发送。
      servicebus.serviceRequest(host, port, buf_total, timeout, resendFlag, function (err, response) {
        if (err < 0) {
          console.log('send failed!')
        } else {
          let resp_data = iconv.decode(response, 'gb2312').toString();
          console.log('response data:' + resp_data)
        }
      })
    }
  )
}

// //通过代理访问服务
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
