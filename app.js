var app= angular.module('myApp',['ngRoute','ngResource','googlechart']);







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
    this.days=7;



});




//controller
app.controller('homeController' , function($scope,cityService) {


        $scope.city=cityService.city;
        $scope.days=cityService.days;

        $scope.$watch('city',function(){

            cityService.city=$scope.city;


        });
        $scope.$watch('days',function(){


            cityService.days=$scope.days;


        });


});


//forecast homeController

app.controller('forcastController' , function($scope,$resource, $routeParams,$http,cityService) {

      $scope.city = cityService.city;
      $scope.days=cityService.days;

      url='http://api.openweathermap.org/data/2.5/weather?q='+$scope.city+'&appid=fe934cd6055d4be90236a3202ab6f133';
      url1='http://api.worldweatheronline.com/premium/v1/weather.ashx?key=cac8c2b2e80b484b8d554459181203&q='+$scope.city+'&format=json&num_of_days=7' ;


$https({method: 'GET',
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

            $scope.dayone = [
       {v: $scope.weatherdata1[0].date },
       {v: $scope.weatherdata1[0].maxtempF},
   ];
   $scope.daytwo = [
{v: $scope.weatherdata1[1].date},
{v: $scope.weatherdata1[1].maxtempF},
];

$scope.daythree = [
{v: $scope.weatherdata1[2].date},
{v: $scope.weatherdata1[2].maxtempF},
];

$scope.dayfour = [
{v: $scope.weatherdata1[3].date},
{v: $scope.weatherdata1[3].maxtempF},
];

$scope.dayfive = [
{v: $scope.weatherdata1[4].date},
{v: $scope.weatherdata1[4].maxtempF},
];

$scope.daysix = [
{v: $scope.weatherdata1[5].date},
{v: $scope.weatherdata1[5].maxtempF},
];

$scope.dayseven = [
{v: $scope.weatherdata1[6].date},
{v: $scope.weatherdata1[6].maxtempF},
];

$scope.dayone1 = [
{v: $scope.weatherdata1[0].date},
{v: $scope.weatherdata1[0].mintempF},
];
$scope.daytwo1 = [
{v: $scope.weatherdata1[1].date},
{v: $scope.weatherdata1[1].mintempF},
];

$scope.daythree1 = [
{v: $scope.weatherdata1[2].date},
{v: $scope.weatherdata1[2].mintempF},
];

$scope.dayfour1 = [
{v: $scope.weatherdata1[3].date},
{v: $scope.weatherdata1[3].mintempF},
];

$scope.dayfive1 = [
{v: $scope.weatherdata1[4].date},
{v: $scope.weatherdata1[4].mintempF},
];

$scope.daysix1 = [
{v: $scope.weatherdata1[5].date},
{v: $scope.weatherdata1[5].mintempF},
];

$scope.dayseven1 = [
{v: $scope.weatherdata1[6].date},
{v: $scope.weatherdata1[6].mintempF},
];







});






    $scope.convertemp= function(degk) {

          return Math.round((1.8*(degk-273))+32);

    }

    $scope.converdate= function(dt) {

            return new Date(dt*1000)
    }




$scope.function1 =function(dayone,daytwo,daythree,dayfour,dayfive,daysix,dayseven) {
    $scope.myChartObject = {};

    $scope.myChartObject.type = "ColumnChart";



    $scope.myChartObject.data = {"cols": [
        {id: "t", label: "Date", type: "string"},
        {id: "s", label: "Temp", type: "number"}
    ], "rows": [
        {c: dayone},
        {c: daytwo},
        {c: daythree},
        {c: dayfour},
        {c: dayfive},
        {c: daysix},
        {c: dayseven}
    ]};

    $scope.myChartObject.options = {
        'title': 'Max Temp Of Next Seven Days in fahrenheit'
    };
  }

  $scope.function2 =function(dayone,daytwo,daythree,dayfour,dayfive,daysix,dayseven) {
      $scope.myChartObject1 = {};

      $scope.myChartObject1.type = "ColumnChart";



      $scope.myChartObject1.data = {"cols": [
          {id: "t", label: "Date", type: "string"},
          {id: "s", label: "Temp", type: "number"}
      ], "rows": [
          {c: dayone},
          {c: daytwo},
          {c: daythree},
          {c: dayfour},
          {c: dayfive},
          {c: daysix},
          {c: dayseven}
      ]};

      $scope.myChartObject1.options = {
          'title': 'Min Temp Of Next Seven Days in fahrenheit'
      };
    }







});
