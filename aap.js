var app= angular.module('myApp',['ngRoute','ngResource']);


//route



app.config(function($routeProvider,$qProvider,$sceProvider){
  $qProvider.errorOnUnhandledRejections(false);
   $sceProvider.enabled(false);

  $routeProvider
  .when('/', {

      templateUrl : 'pages/home.html',
      controller:'homeController'



  })


  .when('/forecast', {

      templateUrl : 'pages/forecast.html',
      controller:'forcastController'



  })




});

//services


app.service('cityService',function(){

    this.city="chandigarh";
    this.days=2;



});




//controller
app.controller('homeController' , function($scope,cityService) {


        $scope.city=cityService.city;
        $scope.days=cityService.days;

        $scope.$watch('city','days',function(){

            cityService.city=$scope.city;
            cityService.days=$scope.days;


        });
        $scope.$watch('days',function(){


            cityService.days=$scope.days;


        });


});



app.controller('forcastController' , function($scope,$resource, $routeParams,$http,cityService) {

      $scope.city = cityService.city;
      $scope.days=cityService.days;
      url='http://api.openweathermap.org/data/2.5/weather?q='+$scope.city+'&appid=fe934cd6055d4be90236a3202ab6f133';
      url1='http://api.worldweatheronline.com/premium/v1/weather.ashx?key=cac8c2b2e80b484b8d554459181203&q='+$scope.city+'&format=json&num_of_days=' + $scope.days ;


$http({method: 'GET',
  url:url})
    .then(function(data){
        $scope.date=data.data.dt;
        $scope.weatherdata=data.data.main;
        $scope.description=data.data.weather[0].description;


      });


      $http({method: 'GET',
        url:url1})
          .then(function(data){
            $scope.weatherdata1=data.data.data.weather;


            });


    $scope.convertemp= function(degk) {

          return Math.round((1.8*(degk-273))+32);

    }

    $scope.converdate= function(dt) {

            return new Date(dt*1000)
    }


});
