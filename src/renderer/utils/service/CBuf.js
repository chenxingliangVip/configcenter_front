function CBuf() {
    /**
     *
     * @type {Buffer}
     * @private
     */
    this.buf_ = null;
}


CBuf.prototype.getBuf = function () {
    return this.buf_;
}

CBuf.prototype.getBufString = function () {
    if (this.buf_ === null) {
        return null;
    } else {
        return this.buf_.toString();
    }
}

CBuf.prototype.getLen = function () {
    if (this.buf_ === null||this.buf_==undefined) {
        return 0;
    } else {
        return this.buf_.byteLength;
    }
}
/**
 *
 * @param {Buffer}buf
 */
CBuf.prototype.setBuf = function (buf) {
    var buflen = buf.length;
    this.buf_ = Buffer.alloc(buflen);
    if (buflen > 0) {
        buf.copy(this.buf_, 0);
    }
}

/**
 *
 * @param{Buffer} buf
 * @param{number} len
 * @constructor
 */
CBuf.prototype.CopyFrom = function (buf, len) {
    if (buf === null || buf === undefined) {
        this.buf_ = Buffer.alloc(0);
    } else {
        if (len === undefined || len == null) {
            len = buf.getLen();
        }
        this.buf_ = Buffer.alloc(len);
        this.buf_.write(this.getBufString(), 0, len, 'utf-8')

    }
}

module.exports = CBuf;