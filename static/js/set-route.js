var app = angular.module("myApp",["ngRoute"]);
app.service('ajaxGetData',function(){
	//设置post请求
	this.httpPost=function(http,myurl,data,callBack){
	    http({  
		   method:'post',
		   url:myurl,  
		   data:data,
		   headers:{'Content-Type':'application/x-www-form-urlencoded'},  
		   transformRequest: function(obj) {  
		     var str = [];  
		     for(var p in obj){
		       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		     }  
		     return str.join("&");  
		   }  
		}).success(function(req){  
		    callBack(req); 
		});
	};
});
app.service('gologin',function(){
	this.judgeLogin = function(url){
		var id = localStorage.getItem('user_id');
		if(id){
			window.location = url;
		}else{
			window.location = 'load.html';
		}
	};
});
//自定义指令repeatFinish
app.directive('repeatFinish',function(){
    return {
        link: function(scope,element,attr){
            console.log(scope.$index)
            if(scope.$last == true){
                console.log('ng-repeat执行完毕')
                scope.$eval( attr.repeatFinish )
            }
        }
    }
})
//  配置路由信息
app.config(function($routeProvider){
	  $routeProvider.when("/",{
	        templateUrl:"bespoke.html"
	    }).when("/userinfo",{
	        templateUrl:"userinfo.html"
	    }).when("/colection",{
	        templateUrl:"colection.html"
	    }).otherwise({
	        redirectTo:"/"
	    });

});




