 angular.module("Knowledge")
   .config(function(
            $stateProvider, 
            $urlRouterProvider,
            $locationProvider
            )
    {
         $locationProvider.html5Mode(true);
         $stateProvider.state('login', {
             url: "/login",
             templateUrl: 'client/write/views/login.ng.html',
             controller: 'loginController'                
           }).state('pool', {
             url: "/pool",
             templateUrl: 'client/write/views/sidenav.ng.html',
             controller: 'sidenavController'                
           }).state('pool.detail', {
             url: "/:detail",
             templateUrl: 'client/write/views/pool.ng.html',
             controller: 'poolController'                
           });    
         $urlRouterProvider.otherwise("/login");
    });