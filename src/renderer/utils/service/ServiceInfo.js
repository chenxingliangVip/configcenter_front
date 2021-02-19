

function ServiceInfo(){
    if(this.host === undefined){
        this.host = null;
    }
    if(this.port === undefined){
        this.port = 0;
    }
    if(this.serv === undefined){
        this.serv = 0;
    }
    if(this.servname === undefined){
        this.servname = null;
    }
    if(this.state === undefined){
        this.state = 0;
    }
    if(this.keep_alive === undefined){
        this.keep_alive = 0;
    }
    if(this.reserved === undefined){
        this.reserved = 0;
    }

}

/**
 *
 * @param {string}host
 */
ServiceInfo.prototype.setHost=function(host){
this.host=host;
}
/**
 *int
 * @param {number}port
 */
ServiceInfo.prototype.setPort=function(port){
    this.host=host;
}
/**
 *int
 * @param {number}serv
 */
ServiceInfo.prototype.setServ=function(serv){
    this.serv=serv;
}
/**
 *
 * @param {string}servname
 */
ServiceInfo.prototype.setServname=function(servname){
    this.servname=servname;
}
/**serviceRegister use
 *byte
 * @param {Buffer}state
 */
ServiceInfo.prototype.setState=function(state){
    this.state=state;
}
/**
 *to set key in ServiceHeader
 * @param {Buffer} keep_alive
 */
ServiceInfo.prototype.setKeep_alive=function(keep_alive){
    this.keep_alive =keep_alive;
}
/**
 *
 * @param {number}reserved
 */
ServiceInfo.prototype.setReserved=function(reserved){
    this.reserved =reserved;
}
module.exports = ServiceInfo;
