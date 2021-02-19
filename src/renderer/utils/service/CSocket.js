var net = require('net');
var ServiceHeader = require('./ServiceHeader.js');
var CBuf = require('./CBuf.js')

function CSocket() {
    /**
     *
     * @type {number}
     */
    this.port = 8800;
    /**
     *
     * @type {string}
     */
    this.host = 'localhost';
    /**
     *
     * @type {number}
     */
    this.timeout = 500;

}

/**
 *
 * @param{string} host
 * @constructor
 * @api public
 */
CSocket.prototype.setHost = function (host) {
    this.host = host;
}
/**
 *
 * @param{number} port
 * @constructor
 * @api public
 */
CSocket.prototype.setPort = function (port) {

    this.port = port;


}
/**
 *
 * @param{number} timeout
 * @constructor
 * @api public
 */
CSocket.prototype.setTimeout = function (timeout) {

    this.timeout = timeout;

}
/**
 *组织请求,头部和body之间添加3个long
 * @param {Buffer}requestbody
 * @returns {Buffer}
 * @api private
 */
CSocket.prototype.encapsulatRequest = function (requestbody) {
    var servHeader = new ServiceHeader();
    servHeader.len = requestbody.length;
    var headerbuf = servHeader.ToBuf();
    var request = Buffer.alloc(headerbuf.length + 8 * 3 + requestbody.length);
    headerbuf.copy(request, 0);
    requestbody.copy(request, 8 * 3 + headerbuf.length);
    return request;


}

/**
 *发送请求数据发送到服务端
 * @param {Buffer}requestBuf
 * @param {CBuf}responseBuf
 * @param callback
 * @api public
 */
CSocket.prototype.sendRequest = function (requestBuf, responseBuf, callback) {
    var self = this, client = net.connect(this.port, this.host);
    var response = Buffer.alloc(0);
    var ret = -1;
    client.setTimeout(this.timeout)
    client.on('connect', function () {
           console.log('connect to server sucessful....:');
            var requestbuf_encapsulated = self.encapsulatRequest(requestBuf);
            //send request data to server
            client.write(requestbuf_encapsulated);
        }
    );

    client.on('data', function (data) {
         console.log('receive data from server ....:');
        var serviceHeader = new ServiceHeader();
        response = Buffer.concat([response, data]);
        var headerEntyLen =serviceHeader.bufLen();
        /* Wait until we have a complete responseHeader*/
        if (response.length < headerEntyLen) {
            return;
        }
        response.copy(serviceHeader.ToBuf(), 0, 0, headerEntyLen);
        serviceHeader.FromBuf();
        if (serviceHeader.dtid == -128 && serviceHeader.len == 0) {

            ret = 1;
            client.end();
            return;
        }

        if (serviceHeader.len <= 0) {
            console.log('response data length invalid!');
            response = Buffer.alloc(0);
            client.end();
            return ;
        }
        var completeResponselen = headerEntyLen +serviceHeader.len;
        /* Wait until we have a complete response*/
        if (response.length < completeResponselen) {
            return;
        }
        var responsebody = Buffer.alloc(serviceHeader.len)
        response.copy(responsebody, 0, headerEntyLen);
        responseBuf.setBuf(responsebody);
        response = responsebody;
        ret = 1;
        client.end();

    });
    /* this.socket_.on('close', function (msg) {

         this.isClose = true;
         console.log("socket_close_zp:" + msg.toString());
         callback(-1, Buffer.from('close'));

     });*/

    client.on('end', function () {
        //  console.log("socketzp_end!");
        callback(ret, response);
    });
    client.on('error', function (err) {
        //接着执行close
        console.log("socketzp_error:" + err.toString());
        callback(ret, response);
        client.destroy();
    });
//2020.3.3补充zhangp
    client.on('timeout', function () {
          console.log("socketzp_timeout！" );
        client.end();

      });

}
module.exports = CSocket;
