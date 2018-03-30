export default class myFetch {
    constructor() {
        if (window.fetch) {
            console.log('原生支持fetch')
        } else {
            console.log('不支持fetch')
        }
        //  this.getXhr();
    }
    getXhr(obj) {
        let { url, opts, cb } = obj;
        D.notify('开始请求....')
        fetch(url, opts).then((res) => {
            console.log(res);
            return res.json()
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            D.alert(err.message)
            D.notify('请求结束....')
        })
    }

}