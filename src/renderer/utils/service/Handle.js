
/**
 * @ClassName: Handle
 * @Description: service handle
 */
function  Handle() {
if(this.value===undefined){
    this.value=-1;
}
}


Handle.prototype.init=function() {
    this.value = -1;
}

Handle.prototype.getValue=function() {
    return this.value;
}

Handle.prototype.setValue=function( value) {
    this.value= value;
}
/**
 *
 * @returns {boolean}
 */
Handle.prototype.isNewHandle=function() {
    if ( this.value < 0) {
        return true;
    }
    return false;
}
/**
 *
 * @param {Handle}handle
 * @returns {boolean}
 */
Handle.prototype.isEqual=function( handle) {
    if(this.value == handle.getValue()) {
        return true;
    }
    return false;
}

module.exports = Handle;