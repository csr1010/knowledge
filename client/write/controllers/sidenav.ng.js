angular.module('Knowledge').controller('sidenavController', function ($scope, $meteor,$state) {
    
     $scope.currentHeight = window.innerHeight+"px";
     
     $scope.listItems = $meteor.collection(Topics);
     
     $scope.navto = function(poolid){
         $state.go("pool.detail", {detail:poolid},{inherit:false});
     };
});