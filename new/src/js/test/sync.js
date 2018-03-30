export default class sync {
    constructor() {

    }
    syncTimeout(ms, arg) { //对setTimeout的封装,返回promise
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms, arg);
        });
    }
    syncAjax(obj) { //封装zepto的ajax请求，返回promise
        return new Promise((resolve, reject) => {
            let ajaxOpt = Object.assign({
                timeout: 1000 * 60,
                preCode: true,
                hasBefore: true,
                url: '/',
                type: 'GET',
                dataType: 'json',
                jsonp: null,
                data: {}
            }, obj);
            $.ajax(Object.assign(ajaxOpt, {
                beforeSend: function(xhr) {
                    if (ajaxOpt.hasBefore) {
                        D.notify('loading', { autoRm: false, operate: false })
                    }
                },
                error: function(xhr, type) {
                    //clearTimeout(timer);
                    D.rmNotify();
                    //console.warn('json error');
                    console.log(xhr,type);
                    D.alert('发生了一些错误,status:'+xhr.status+',type:'+type);
                    return reject(xhr.status);
                    
                },
                success: function(data, status, xhr) {
                    //clearTimeout(timer);
                    D.rmNotify();
                    return resolve(data)
                },
                complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
                    if (status == 'timeout') { //超时,status还有success,error等值的情况
                        　D.alert("请求超时");　　　　 
                    }　　
                    return reject(status);
                }
            }));
        });
    }
}