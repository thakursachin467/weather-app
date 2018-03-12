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

    this.city="chandigarh"


});




//controller
app.controller('homeController' , function($scope,cityService) {


        $scope.city=cityService.city;

        $scope.$watch('city',function(){

            cityService.city=$scope.city;


        });


});



app.controller('forcastController' , function($scope,$resource, $routeParams,$http,cityService) {

      $scope.city = cityService.city;
      url='http://api.openweathermap.org/data/2.5/weather?q='+$scope.city+'&appid=fe934cd6055d4be90236a3202ab6f133';
      url1=''

$http({method: 'GET',
  url:url})
    .then(function(data){
        $scope.date=data.data.dt;
        $scope.weatherdata=data.data.main;
        console.log(url);
        console.log(data.data);

      });


    $scope.convertemp= function(degk) {

          return Math.round((1.8*(degk-273))+32);

    }

    $scope.converdate= function(dt) {

            return new Date(dt*1000)
    }


});
