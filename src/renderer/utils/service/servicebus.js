var CBuf = require('./CBuf.js');
var CBusClient = require('./CBusClient.js');
/**
 * 服务总线构造函数
 */
function servicebus() {
    this.busclient_ = new CBusClient();
}

/**
 *
 * @param{ServiceInfo} serviceinfo
 * @param {Buffer}requestBuffer
 *  @param {CBuf}responseBuf
 * @param {number}timeout  单位-秒
 * @param {Handle}requesthandle
 * @param {number}resendFlag
 * return {*}
 * @api public
 */
servicebus.prototype.serviceRequest = function (serviceinfo, requestBuffer, responseBuf, timeout, requesthandle, resendFlag, callback) {
    // console.log('servicebus.prototype.serviceRequest-----------');
    if (requestBuffer == null || requestBuffer == undefined || requestBuffer.length === 0) {
        console.log("request data is empty error!Don't send  to server.");
        return;
    }
    callback = callback || function () {
    };
    this.busclient_.ServiceRequest(requesthandle, serviceinfo.host,
        serviceinfo.port, requestBuffer, responseBuf, resendFlag,
        timeout * 1000, serviceinfo.keep_alive, null, function (err, response) {
            if (err < 0) {
                console.log("servicebus.serviceRequest(" + requesthandle.getValue() + ", " + serviceinfo.host + ", " + serviceinfo.port + ", " + requestBuffer.length + ", "
                    + resendFlag + ", " + timeout + "s, "
                    + serviceinfo.keep_alive + ") fail!");
            }
            callback(err, response);
        });
}


module.exports = new servicebus();

