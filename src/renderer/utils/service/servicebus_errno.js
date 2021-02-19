    var servicebus_errno = {
        SUCCESS: {
            errno_: 1000,
            errname_: 'SUCCESS',
            errdescribe_: 'SUCCESS'
        },
        MEMORYERROR: {
            errno_: -1002,
            errname_: 'MEMORYERROR',
            errdescribe_: 'Memory error'
        },
        SOCKETTIMEOUT: {
            errno_: -1003,
            errname_: 'SOCKETTIMEOUT',
            errdescribe_: 'Socket time out'
        },
        SOCKETWRITEERROR: {
            errno_: -1004,
            errname_: 'SOCKETWRITEERROR',
            errdescribe_: 'Socket write error'
        },
        SOCKETREADERROR: {
            errno_: -1005,
            errname_: 'SOCKETREADERROR',
            errdescribe_: 'Socket read error'
        },
        HANDLEINVALID: {
            errno_: -1008,
            errname_: 'HANDLEINVALID',
            errdescribe_: 'Handle invalid'
        },
        WRITEHEADERROR: {
            errno_: -1019,
            errname_: 'WRITEHEADERROR',
            errdescribe_: 'Write requestHeader error'
        },
        WRITEBUFERROR: {
            errno_: -1020,
            errname_: 'WRITEBUFERROR',
            errdescribe_: 'Write buf error'
        },
        READBUFERROR: {
            errno_: -1022,
            errname_: 'SOCKETREADERROR',
            errdescribe_: 'Socket read error'
        },
        SERVICEERROR: {
            errno_: -1023,
            errname_: 'SERVICEERROR',
            errdescribe_: 'Service error'
        },
        SOCKETOTHERERROR: {
            errno_: -1024,
            errname_: 'SOCKETOTHERERROR',
            errdescribe_: 'Socket other error'
        },
        NOWAITFORRESPONSE: {
            errno_: -1026,
            errname_: 'NOWAITFORRESPONSE',
            errdescribe_: 'No request wait for response'
        },
        INVALIDBUFLEN: {
            errno_: -1027,
            errname_: 'INVALIDBUFLEN',
            errdescribe_: 'Invalid buf len'
        },
        THEADINTERRUPT: {
            errno_: -1050,
            errname_: 'THEADINTERRUPT',
            errdescribe_: 'thread interrupt'
        },
        OTHERERROR: {

            errname_: 'UNKNOWERROR',
            errdescribe_: 'Unknow error'
        }
    }
    module.exports = servicebus_errno;

/*

SUCCESS(1000), MEMORYERROR(-1002), SOCKETTIMEOUT(-1003), SOCKETWRITEERROR(
    -1004), SOCKETREADERROR(-1005), HANDLEINVALID(-1008), WRITEHEADERROR(
    -1019), WRITEBUFERROR(-1020), READBUFERROR(-1022), SERVICEERROR(
    -1023), SOCKETOTHERERROR(-1024), NOWAITFORRESPONSE(-1026), INVALIDBUFLEN(
    -1027), THEADINTERRUPT(-1050);*/
