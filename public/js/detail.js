(function ($) {
    var app = angular.module('detailApp', []);
    app.controller('detailController', function($scope,$timeout,$filter,$location) {
        //$scope.detail="fsdf";
        var api="/ajax/activity/getDetail";      
         var url=window.location.pathname;
         var urlArray=url.split("/");

         //console.log(urlArray)
         var activityId=urlArray?urlArray[2]:"1";
         var params={};
         params._ = new Date().getTime();  
         params.activityId=activityId;
         getDetail();
         function getDetail(){
            

            $.ajax({
                    url:api,
                    data:params,
                    type:"GET",
                    success:function(data){
                       // console.log(data)
                       $timeout(function() {
                        $scope.detail=data.data;
                         //console.log($scope.detail)
                         if(data&&data.data&&data.data.activityDescription)
                         $("#activityDescription").html(data.data.activityDescription)
                       }, 10);
                         
                    }
                    }
                
                )
                
        }
    });


}(jQuery));

(function ($) {
    var app = angular.module('listApp', []);
    app.controller('listController', function($scope,$http) {
        //$scope.detail="fsdf";
        var api="/activity/getDetail";  
         getList();
         var memberId="1";
         var params={};
         params._ = new Date().getTime();  
         params.openid=memberId;
         $scope.lists=[{"name":1,"title":"first","status":"start","signUpStatus":"unsigned"},{"name":1},{"name":1},{"name":1},{"name":1}]
          function getList(){
             $.ajax({
                    url:api,
                    data:params,
                    type:"GET",
                    success:function(data){
                        console.log(data)
                         $scope.lists=data.data;
                    }
                    }
                
                )
        }
    });


}(jQuery));