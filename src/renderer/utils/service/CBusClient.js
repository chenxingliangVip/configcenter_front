var CSocket = require('./CSocket.js');
function CBusClient() {

}

/**
 *
 * @param handle
 * @param hostName
 * @param port
 * @param {Buffer}requestBuffer
 * @param {CBuf}responseBuf
 * @param resendFlag
 * @param timeout
 * @param keep_alive
 * @param pSecStruct
 * @param callback
 * @constructor
 * @api public
 */
CBusClient.prototype.ServiceRequest = function (handle, hostName, port, requestBuffer, responseBuf, resendFlag, timeout, keep_alive, pSecStruct, callback) {
    var self = this;
    //console.log('CBusClient.prototype.ServiceRequest-----------');
    this._ServiceSyncRequest(handle, hostName, port, requestBuffer, responseBuf, 0, timeout, keep_alive, pSecStruct, function (ret, response) {
        var isSendRequest = true;
        if (ret <0) {
            if (resendFlag > 0) {
                isSendRequest = true;
            } else {
                isSendRequest = false;
            }
        }else if (ret > 0) {
            isSendRequest = false;
        } else {

            console.log("_ServiceSyncRequest return unknow value: ret=" + ret);
            isSendRequest = false;
        }
        if (isSendRequest) {
            //重发
            console.log('----发送失败，重发----');
            self.retry(handle, hostName, port, requestBuffer, responseBuf, resendFlag, timeout, keep_alive, pSecStruct, callback);
        } else {
            callback(ret, response);
        }

    });
}

//
/**
 *
 * @param {Handle}handle
 * @param {string}hostName
 * @param {number}port
 * @param {number}requestBuffer
 * @param {CBuf}responseBuf
 * @param {number}monitor
 * @param {number}timeout
 * @param {number}keep_alive
 * @param pSecStruct
 * @returns {number|*}
 * @private
 */
CBusClient.prototype._ServiceSyncRequest = function (handle, hostName, port, requestBuffer, responseBuf,
                                                     monitor, timeout, keep_alive, pSecStruct, callback) {
    // console.log(' CBusClient.prototype._ServiceSyncRequest--------------------');
    var tcpClient = new CSocket();
    if (hostName != undefined && hostName != null) {
        tcpClient.setHost(hostName);
    }
    if (port != undefined && port != null) {
        tcpClient.setPort(port);
    }
    if (timeout != undefined && timeout != null) {
        tcpClient.setTimeout(timeout);
    }
    tcpClient.sendRequest(requestBuffer, responseBuf, callback);
}
/**
 * @private
 */
CBusClient.prototype.retry = function () {
    var self = this, args = arguments;
    setTimeout(function () {
        self._ServiceSyncRequest.apply(self, args);
    }, 750);
};

module.exports = CBusClient;