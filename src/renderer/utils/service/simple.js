var ServiceInfo = require('./ServiceInfo.js')
var Handle = require('./Handle.js')
var CBuf = require('./CBuf.js')
var servicebus = require('./servicebus.js')
var iconv  = require('iconv-lite');

function intToByte4 (i) {
  var targets = []
  targets[0] = (i & 0xFF)
  targets[1] = (i >> 8 & 0xFF)
  targets[2] = (i >> 16 & 0xFF)
  targets[3] = (i >> 24 & 0xFF)
  return targets
}

export const serRequestService = function () {
  //测试用例
//服务端信息
  var servinfo = new ServiceInfo()
//服务端地址
  servinfo.host = '192.6.77.15'
//服务端口
  servinfo.port = 18430
  var requesthandle = new Handle()
  var responseBuf = new CBuf()
//超时时间，单位秒
  var timeout = 1
//首次发送失败，是否重发。1：重发，0不重发
  var resendFlag = 1
//发送内容数组
  var resources = ['陈兴亮','hello'];
  resources.forEach(function (res) {
    let byte = intToByte4(0)
    let str_byte = iconv.encode(res,'GB2312');
    let code_buf = Buffer.from(byte)
    let buf_total = Buffer.concat([code_buf, str_byte], code_buf.length+str_byte.length);
    //请求数据为Buffer类型，且不能为空(undefined，null，或者request.length==0)，若为空则不发送。
    servicebus.serviceRequest(servinfo,buf_total, responseBuf, timeout, requesthandle, resendFlag, function (err, response) {
      if (err < 0) {
        console.log('send failed!')
      } else {
        let resp_data = iconv.decode(response, 'gb2312').toString();
        console.log("respones data :"+resp_data);
      }
    })
  })
}
