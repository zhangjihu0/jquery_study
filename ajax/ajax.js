(function() {
    class AjaxClass{
        //=>send ajax
        init() {
            //=>this:example
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=>{
                if(!/^[23]\d{2}$/.test(xhr.status)) return;
                if(xhr.readyState===4){
                    let result = xhr.responseText;
                    //=>DATA-TYPE
                    try {
                        switch(this.dataType.toUpperCase()){
                            case 'TEXT':
                            case "HTML":
                                break;
                            case 'JSON':
                                result = JSON.parse(result);
                            case 'XML':
                                result  = xhr.responseXML
                        }
                    } catch (error) {

                    }
                    
                    this.success(result);
                }
            }
            //=>DATA
            if(this.data != null){
                this.formatData();
                if(this.isGET){
                    this.url +=this.querySymbol()+this.data;
                    this.data = null;
                }
            }

            //=>CACHE
            this.isGET?this.cacheFn():null;
            xhr.open(this.method,this.url); 
            xhr.send();
        }
        //把对象数据格式转化为字符串数对象格式；
        formatData(){
           //=》this:example
           if(({}).toString.call(this.data) ==='[object Object]'){
               let obj = this.data,
               str = ``;
               for(let key in obj){
                   if(obj.hasOwnProperty(key)){
                        str += `${key}=${obj[key]}&`;
                   }
                   str = str.replace('/&$/g',"");
                   this.data = str;

               }
        }
    }
        cacheFn() {
            //=》this:example
            this.cache?this.url+= `${this.querySymbol()}_=${Math.random()}`:null
        }
        querySymbol(){//获取符号
            //=》this:example
            return this.url.indexOf('?')>-1?'&':'?'
        }
    };
    //=>init parameters;
    //=>或者放到constructor
    window.ajax = function ({
        url=null,
        method='get',
        type=null,
        data=null,
        dataType='json',
        cache=true,
        async=true,
        success=null
    }={}){
        let _this = new AjaxClass(),
        const Array = [
            'url',
            'method',
            'data',
            'dataType',
            'cache',
            'async',
            'success',
        ];
        Array.forEach((item)=>{
            if(item ==='method'){
                _this.method = type ===null? method:type 
                return;
            }
            if(item ==='success'){
                return _this.success = success||typeof success ==='function'?success:new Function();
            }
            _this[item] = eval(item);//eval(item)把item变成对应的变量
        })
        _this.isGET= /^(GET|DELETE|HEAD)$/i.test(example.method);
        _this.init();
        return _this;
    };

})()