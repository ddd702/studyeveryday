export default class bindUse {
    constructor() {
        var a=function(){
            this.name='ddd';
            this.age=27;
        }
        var b=function(){
            this.name='unknown';
            this.age=20;
            this.sex='male';
        }
        var x={
            age:20,
            name:'ddd',
            out:function(args){
                console.log(args,this.name);
            }
        };
        var y={
            age:27,
            sex:'male',
            name:'unknown',
            out:function(args){
                 console.log(args,this.name);
            }
        };
        x.out.bind(y,'ddd')();//改变x.out函数的上下文，并传入参数'ddd';
    }
    

}