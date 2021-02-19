function  ServiceHeader() {
  //  public int
    this.len=0;
    //public short
     this.servid=0;
   // public short
    this.seq=0;
   // public short
    this.errinfo=0;
   // public short
    this.stid=0;
  //  public short
    this.dtid=0;
   // public short
    this.key=0;
    /**
     * type {Buffer}
     */
   this.buf_ =Buffer.alloc(16);


    }



ServiceHeader.prototype.ToBuf=function() {
    var offset = 0;
    this.buf_.writeInt32BE(this.len,offset);
    offset += 4;
    this.buf_.readInt16BE(this.servid,offset);
    offset += 2;
   this.buf_.readInt16BE( this.seq,offset);
    offset += 2;
   this.buf_.readInt16BE( this.errinfo,offset);
    offset += 2;
    this.buf_.readInt16BE( this.stid,offset);
    offset += 2;
    this.buf_.readInt16BE(this.dtid ,offset);
    offset += 2;
    this.buf_.readInt16BE(this.key,offset);
    return    this.buf_;
}

ServiceHeader.prototype.bufLen=function() {
    return this.buf_.length;
}

ServiceHeader.prototype.FromBuf=function() {
    var offset = 0;
    this.len = this.buf_.readInt32BE(offset);
    offset += 4;
    this.servid=  this.buf_.readInt16BE(offset);
    offset += 2;
    this.seq =this.buf_.readInt16BE(offset);
    offset += 2;
    this.errinfo =this.buf_.readInt16BE(offset);
    offset += 2;
    this.stid =this.buf_.readInt16BE(offset);
    offset += 2;
    this.dtid = this.buf_.readInt16BE(offset);
    offset += 2;
    this.key =this.buf_.readInt16BE(offset);
}

module.exports = ServiceHeader;

