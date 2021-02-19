var CSocket = require('./CSocket.js');
/**
 * 服务总线构造函数
 */
function servicebus() {

}

/**
 *
 * @param{string} host
 * @param{number} port
 * @param{Buffer} requestBuffer
 * @param {number}timeout
 * @param{number} resendFlag
 * @param {function}callback
 */
servicebus.prototype.serviceRequest = function (host, port,requestBuffer, timeout,  resendFlag, callback) {
    // console.log('servicebus.prototype.serviceRequest-----------');
    if (requestBuffer == null || requestBuffer == undefined || requestBuffer.length === 0) {
        console.log("request data is empty error!Don't send  to server.");
        return;
    }
    callback = callback || function () {
    };

    this._ServiceSyncRequest( host, port,requestBuffer , resendFlag,
        timeout * 1000,  function (err, response) {
            if (err < 0) {
                console.log("servicebus.serviceRequest(" +host + ", " + port + ", " + requestBuffer.length + ", "
                    + resendFlag + ", " + timeout + "s, ) fail!");
            }
            callback(err, response);
        });
}
/**
 *
 * @param{string} proxyHost代理服务主机地址
 * @param{Buffer} requestBuffer请求数据
 * @param{number} timeout超时时间-秒
 * @param {number}resendFlag是否重发 1重发  0 不重发
 * @param{string} domain域名
 * @param{string} sname服务名称
 * @param {number}version版本号
 * @param{string} scene场景
 * @param {number}scene_id场景号
 * @param{string} subscene子场景
 * @param {number}sub_id子场景号
 * @param{string} manufactor供应商
 * @param callback
 */
servicebus.prototype.telserviceRequest = function (proxyHost,requestBuffer, timeout,  resendFlag, domain,sname,version,scene,scene_id,subscene,sub_id,manufactor,callback) {
    // console.log('servicebus.prototype.serviceRequest-----------');
    if (requestBuffer == null || requestBuffer == undefined || requestBuffer.length === 0) {
        console.log("request data is empty error!Don't send  to server.");
        return;
    }
    callback = callback || function () {
    };
    var teleRequestBuf=this.BuildTeleRequestBuf(domain,sname,version,scene,scene_id,subscene,sub_id,manufactor,requestBuffer);
    this._ServiceSyncRequest( proxyHost, 30009,teleRequestBuf , resendFlag,
        timeout * 1000,  function (err, response) {
            if (err < 0) {
                console.log("servicebus.telserviceRequest(" +proxyHost + ", " + 30009 + ", " + requestBuffer.length + ", "
                    + resendFlag + ", " + timeout + "s, ) fail!");
            }
            callback(err, response);
        });
}























servicebus.prototype._ServiceSyncRequest=function (host, port, requestBuffer, resendFlag, timeout,  callback) {
    var self = this;
    var cscoket = new CSocket();
    cscoket.setHost(host);
    cscoket.setPort(port);
    cscoket.setTimeout(timeout);
    cscoket.sendRequest(requestBuffer,function (ret, response) {
        if (ret<0&&(resendFlag>0)) {
            //重发
            console.log('----发送失败，重发----');
            self.retry( host, port, requestBuffer, 0, timeout,  callback);
        } else {
            callback(ret, response);
        }

    })
}

servicebus.prototype.BuildTeleRequestBuf=function (domain,sname,version,scene,scene_id,subscene,sub_id,manufactor,requestBuffer){
    var soaStr="SOA://"+domain+"/"+scene+"/"+scene_id+"/"+subscene+"/"+sub_id+"/"+sname+"/"+version+"/"+manufactor+"/1";
   console.log(soaStr);
   var soa_buf= Buffer.from(soaStr);
    /***************************************************************************************
     * 服务总线远程请求格式: 标签长度 + 角色标签 + 域信息长度 + 域信息 + 请求长度 + 请求信息
     ***************************************************************************************/
    var tmplen = 0;

    // 除掉window64后的组装
    var requestlen = 0, domainbuflen = 0, intsize = 4, bytesize =1;
    if (requestBuffer != null) {
        requestlen = requestBuffer.length;
    }
    if (soaStr != null) {
        domainbuflen = soa_buf.length;
    }
    /*******
     * 标签长度+标签数据+domain长度+domain数据+请求长度+请求数据
     */
    var telerequestlen = 32 + domainbuflen + requestlen + 3 * intsize;
    var  telerequestbuf =  Buffer.alloc(telerequestlen * bytesize);
    var telerequestbufIndex = 0;

    tmplen = 32;
    telerequestbuf.writeIntBE(tmplen,telerequestbufIndex,intsize); // 标签长度
    telerequestbufIndex += intsize;
    telerequestbuf.fill(0,telerequestbufIndex,telerequestbufIndex+32);// 标签数据
    telerequestbufIndex+=32;
    // #end标签 if

    tmplen = domainbuflen;
    telerequestbuf.writeIntBE(tmplen,telerequestbufIndex,intsize); // 域长度
    telerequestbufIndex += intsize;
    soa_buf.copy(telerequestbuf,telerequestbufIndex);// 域信息
    telerequestbufIndex += domainbuflen;

    tmplen = requestlen;
    telerequestbuf.writeIntBE(tmplen,telerequestbufIndex,intsize); // 请求长度
    telerequestbufIndex += intsize;
    requestBuffer.copy(telerequestbuf,telerequestbufIndex); // 请求信息
    return telerequestbuf;
}
    /**
     * @private
     */
    servicebus.prototype.retry = function () {
        var self = this, args = arguments;
        setTimeout(function () {
            self._ServiceSyncRequest.apply(self, args);
        }, 750);
    };
module.exports = new servicebus();

