(function ($) {
    var app = angular.module('detailApp', []);
    app.controller('detailController', function($scope,$http) {
        //$scope.detail="fsdf";
        var api="a.json";      
         getDetail();
         var activityId="1";
         var params={};
         params._ = new Date().getTime();  
         params.activityId=activityId;
        function getDetail(){
            $http.get(api, {params: params})
                .success(function(data){
                    $scope.detail=data.data;
                })
        }
    });


}(jQuery));

(function ($) {
    var app = angular.module('listApp', []);
    app.controller('listController', function($scope,$http) {
        //$scope.detail="fsdf";
        var api="a.json";  
         getList();
         var memberId="1";
         var params={};
         params._ = new Date().getTime();  
         params.memberId=memberId;
         $scope.lists=[{"name":1,"title":"first","status":"start","signUpStatus":"unsigned"},{"name":1},{"name":1},{"name":1},{"name":1}]
          function getList(){
            $http.get(api, {params:params})
                .success(function(data){
                    $scope.lists=data.data;
                })
        }
    });


}(jQuery));