import D from './util/d.uitls';
import MyFetch from './test/fetch';
import MyBind from './test/bind';
import MySync from './test/sync';
class App {
    constructor() {
        this.sync = new MySync();
        this.fetchFn();
        this.asyncXhr2();
    }
    async asyncXhr2(){
        let value=await this.sync.syncAjax({
            url: 'http://70read.com/ajax/getArticleList',
            type: 'POST',
            data: {
                "cateid": "-1",
                "pageSize": 0,
                "pageLength": 10
            }
        });
        console.log(value);
    }
    asyncXhr() {
        this.sync.syncAjax({
            url: 'http://70read.com/ajax/getArticleList',
            type: 'POST',
            data: {
                "cateid": "-1",
                "pageSize": 0,
                "pageLength": 10
            }
        }).then(value => {
            return this.sync.syncAjax({
                url: 'http://70read.com/ajax/getArticleCount',
                type: 'POST',
                data: {
                    "cateid": "-1"
                }
            });
        }).then(value => {
            console.info(value)
        }).catch(err=>{
            console.log('发生错误'+err)
        });
    }
    fetchFn() {
        let myfetch = new MyFetch();
        myfetch.getXhr({
            url: 'http://70read.com/ajax/getArticleList',
            opts: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                mode: 'cors',
                //credentials: 'include',
                body: JSON.stringify({
                    "cateid": "-1",
                    "pageSize": 0,
                    "pageLength": 10
                })
            },
            cb: (res) => {
                console.log(res);
                D.notify('返回成功');
            }
        });
    }
}
window.myapp = new App();
new MyBind();
console.log('one');
setTimeout(()=>{console.log('two');},0);
console.log('three');
