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
                    this.success(result);
                }
            }
            xhr.open(this.method,this.url); 
            xhr.send();
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
        let example = new AjaxClass();
        example.urla = url;
        example.method = type ===null?method:type;
        example.data = data;
        example.dataType = dataType;
        example.cache = cache;
        example.async = async;
        example.success = success||typeof success ==='function'?success:new Function();
        example.init();
    };

})()