var net = require('net');
var ServiceHeader = require('./ServiceHeader.js');
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
    this.socket=new net.Socket();
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
CSocket.prototype.closeSocket = function () {
    return this.socket.end();
   }
/**
 *
 * @param {Buffer}requestBuf
 * @param callback
 */
CSocket.prototype.sendRequest = function (requestBuf, callback) {
    //console.log("CSocket.prototype.sendRequest:"+requestBuf.getBuf())
    var self = this;
    var requestbuf_encapsulated = self.encapsulatRequest(requestBuf);
    console.log("CSocket.prototype.sendRequest:"+requestBuf+".size:"+requestbuf_encapsulated.length)
    var response = Buffer.alloc(0);
    var ret = -1;
    if(this.socket.writable){
        //send request data to server

        this.socket.write(requestbuf_encapsulated);
    }
    else{
        this.socket.end();
        this.socket = net.connect(this.port, this.host);
        this.socket.on('connect', function () {
                  console.log('connect to server sucessful....:');
                //send request data to server
                self.socket.write(requestbuf_encapsulated);
            }
        );
    }
    this.socket.setTimeout(this.timeout);
    this.socket.on('data', function (data) {
         console.log('receive data from server ....:'+data.length);
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
            callback(ret);
            return ret ;
        }

        if (serviceHeader.len <= 0) {
            console.log('response data length invalid!');
            response = Buffer.alloc(0);
            callback(ret);
            return ret ;
        }
        var completeResponselen = headerEntyLen +serviceHeader.len;
        /* Wait until we have a complete response*/
        if (response.length < completeResponselen) {
            return;
        }
        var responsebody = Buffer.alloc(serviceHeader.len)
        response.copy(responsebody, 0, headerEntyLen);
        response = responsebody;
        ret = 1;
        callback(ret,response);
        response = Buffer.alloc(0);
        return ret ;

    });

    this.socket.on('end', function () {
          console.log("socketzp_end!");
        callback(ret, response);
    });
    this.socket.on('error', function (err) {
        //接着执行close
        console.log("socketzp_error:" + err.toString());
        callback(ret, response);
        self.socket.destroy();
    });
    /*  this.socket_.on('timeout', function (msg) {
          this.isClose = true;write data to server
          console.log("socketzp_timeout:" + msg);
          this.end();

      });
  */
}
module.exports = CSocket;