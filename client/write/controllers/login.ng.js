 
 angular.module('Knowledge').controller('loginController', function ($scope, $meteor , $timeout,$interval,$location) {
     
     $scope.user={
       "ldap":"",
       skills:"",
        days:[]
     };
     
     $scope.onLogin= function(){
         var user = angular.copy($scope.user);
         if(user.ldap!="")
         var result = UserProfiles.update(
             {_id: user.ldap},
             {$set: {skills:"JAVA,Mongo-db"}},
             { upsert: true });
         if(result){
             sessionStorage.setItem("user",JSON.stringify($scope.user));
             $location.path("/pool/JAVA");
         }
         /*var userProfiles = $meteor.collection(UserProfiles);*/
     };
     
     $scope.sizeofLine = window.innerWidth > 800 ? 11 : 10;
     $scope.widthofLine = 1;
     $scope.boxes=[];
     $scope.getSizeoftheLandScape = function(param){
         return param == "H" ? window.innerHeight+"px" : window.innerWidth+"px";
     };
     $scope.getSpaceAround = function(){
         return 3 * ($scope.sizeofLine+(2*$scope.widthofLine)) + 19; //buffer
     };
     $scope.screenPad = $scope.getSpaceAround();
     $scope.getnofColumns = function(){
        var screenWidth = window.innerWidth - 1*$scope.screenPad; // padding left, right 100;
        var spaceAround = $scope.getSpaceAround();
        return  Math.floor(screenWidth / spaceAround); 
     };
     $scope.getnofRows = function(){
        var screenHeight = window.innerHeight - 1*$scope.screenPad; //padding top , bottonw 100;
        var spaceAround = $scope.getSpaceAround();
        return  Math.floor(screenHeight / spaceAround); 
     };
     $scope.getnewHeigtDifference = function(){
         var areaofequiTraingle = 0.4330127018922193 * Math.pow($scope.sizeofLine,2);
         var redefinedHeight = 2 *(areaofequiTraingle/$scope.sizeofLine);
         var differenceinHeight = $scope.sizeofLine - redefinedHeight;
         return differenceinHeight;
     };
     $scope.getRandomColor = function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
     };
     $scope.generateBoxes = function(){
         var rows = $scope.getnofRows();
         var cols = $scope.getnofColumns();
             for(var r=0; r<rows; r++){
                 for(var c = 0; c<cols; c++){
                        var indx = Math.floor(Math.random() * (4));
                        var anotherRandomCheck =  Math.random()*4 <= 3 && Math.random()*4 > 1.75? true : false;
                        for(var loop=0;loop<4;loop++){ 
                        if(anotherRandomCheck)
                        if(loop<=2){
                                $scope.boxes.push({
                                    tx:((c+1)*$scope.screenPad+(indx*15)),
                                    ty:((r+1)*$scope.screenPad+(indx*15)),
                                    rot:$scope.angles[indx][loop],
                                    width: $scope.sizeofLine,
                                    height: $scope.sizeofLine,
                                    opacity: Math.random(),
                                    background:"#19283f",
                                    "z-index":"1",
                                    transition:"all ease 500ms",
                                    "transition-delay": (c*250)+"ms",
                                    border: $scope.widthofLine+"px solid rgba(255, 255, 255,0)",
                                    position: "absolute",
                                    "transform-origin": $scope.origins[indx][loop],
                                    "transform": "translate("+((c+1)*$scope.screenPad+(indx*15))+"px , "+((r+1)*$scope.screenPad+(indx*15))+"px)                                                                            rotate("+$scope.angles[indx][loop]+"deg)",
                                    [$scope.borders[indx][loop]+"-color"]: $scope.getRandomColor()
                                }); 
                            }
                         else{
                              $scope.boxes.push({
                                tx:((c+1)*$scope.screenPad+(indx*15)) + $scope.adjustments[indx][0],
                                ty:((r+1)*$scope.screenPad+(indx*15))+ $scope.adjustments[indx][1],
                                rot:$scope.angles[indx][loop],
                                width: $scope.sizeofLine,
                                height: $scope.sizeofLine,
                                opacity: Math.random(),
                                border: $scope.widthofLine+"px #fff",
                                //background:"#fff",
                                transition:"all ease 500ms",
                                "transition-delay": (c*250)+"ms",
                                "z-index":"0",
                                position: "absolute",
                                "transform-origin": "bottom left",
                                "transform": "translate("+(((c+1)*$scope.screenPad+(indx*15)) + $scope.adjustments[indx][0])+"px , "+(((r+1)*$scope.screenPad+(indx*15))+ $scope.adjustments[indx][1])+"px)                                                                            rotate("+$scope.angles[indx][loop]+"deg)",
                            });  
                         }
                        }
                 }
            }
     };
     $scope.addBg = function(){
         var glowLightsCount = $scope.boxes.length / 4 ;
         $scope.boxes.forEach(function(val,indx){
             var randomCheck = (Math.random()*4 >= 3.2 && Math.random()*4 <= 3.85 ) ? true : false;
             var anotherRandomCheck =  Math.random()*4 <= 3.5  ? true : false;
             var yetanotherRandomCheck = Math.floor(Math.random()*4) == 3  ? true : false;
             var newIndex = indx+1;
             if(newIndex!=0 && newIndex%4==0 && randomCheck){
                
                 
                $scope.boxes[indx].transform = "translate("+($scope.boxes[indx].tx + 10)+"px , "+($scope.boxes[indx].ty - 10)+"px)                                                                            rotate("+($scope.boxes[indx].rot+0)+"deg)";
                 
                $scope.boxes[indx-1].transform = "translate("+($scope.boxes[indx-1].tx + 10)+"px , "+($scope.boxes[indx-1].ty - 10)+"px)                                                                            rotate("+($scope.boxes[indx-1].rot+0)+"deg)";
                 
                $scope.boxes[indx-2].transform = "translate("+($scope.boxes[indx-2].tx + 10)+"px , "+($scope.boxes[indx-2].ty - 10)+"px)                                                                            rotate("+($scope.boxes[indx-2].rot+0)+"deg)";
                 
                $scope.boxes[indx-3].transform = "translate("+($scope.boxes[indx-3].tx + 10)+"px , "+($scope.boxes[indx-3].ty - 10)+"px)                                                                            rotate("+($scope.boxes[indx-3].rot+0)+"deg)";
                $scope.boxes[indx].opacity=1;
                 
                $scope.boxes[indx-1].opacity=1;
                 
                $scope.boxes[indx-2].opacity=1;
                 
                $scope.boxes[indx-3].opacity=1;
                val.background = $scope.getRandomColor();
             }
         });
     };
     $scope.removeBg = function(){
         $scope.boxes.forEach(function(val,indx){
             var newIndex = indx+1;
             if(newIndex!=0 && newIndex%4==0){
                val.background = "transparent" ;

                 $scope.boxes[indx].transform = "translate("+($scope.boxes[indx].tx - 10)+"px , "+($scope.boxes[indx].ty + 10)+"px)                                                                            rotate("+($scope.boxes[indx].rot-0)+"deg)";
                 
                $scope.boxes[indx-1].transform = "translate("+($scope.boxes[indx-1].tx - 10)+"px , "+($scope.boxes[indx-1].ty + 10)+"px)                                                                            rotate("+($scope.boxes[indx-1].rot-0)+"deg)";
                 
                $scope.boxes[indx-2].transform = "translate("+($scope.boxes[indx-2].tx - 10)+"px , "+($scope.boxes[indx-2].ty + 10)+"px)                                                                            rotate("+($scope.boxes[indx-2].rot-0)+"deg)";
                 
                $scope.boxes[indx-3].transform = "translate("+($scope.boxes[indx-3].tx - 10)+"px , "+($scope.boxes[indx-3].ty + 10)+"px)                                                                            rotate("+($scope.boxes[indx-3].rot-0)+"deg)";
                $scope.boxes[indx].opacity=Math.random();
                 
                $scope.boxes[indx-1].opacity=Math.random();
                 
                $scope.boxes[indx-2].opacity=Math.random();
                 
                $scope.boxes[indx-3].opacity=Math.random(); 
             }
         });
     };
     $scope.adjustments=[ 
         [1,-$scope.getnewHeigtDifference()+3],
         [1, $scope.getnewHeigtDifference()],
         [$scope.getnewHeigtDifference(),0],
         [-$scope.getnewHeigtDifference(),0]
     ];
     $scope.angles = [
         [0,150,-150,-270],
         [-60,90,60,0],
         [-90,60,-60,0],
         [90,60,-60,0]
     ];
     $scope.borders = [
         ["border-bottom","border-left","border-right"],
         ["border-bottom","border-left","border-bottom"],
         ["border-top","border-right","border-right"],
         ["border-top","border-left","border-left"]
     ];
     $scope.origins = [
         ["bottom left","bottom left","bottom right"],
         ["bottom left","bottom left","bottom right"],
         ["top right","top right","bottom right"],
         ["top left","bottom left","top left"]
     ];
     $scope.getTextstyle = function(){
       // var width = window.innerWidth <= 600 ? (window.innerWidth-100) : (window.innerWidth-400);
        var left = window.innerWidth / 2 - (window.innerWidth-25)/2+"px";
        var top = window.innerHeight / 2 - ((window.innerHeight-100+18)/2)+"px";
         return {
             width:window.innerWidth-25+"px",
             height:window.innerHeight-100+"px",
             transform:"translate3d("+left+" , "+top+" , 0px)"
         }
     };
    (function(){
           $timeout(function(){
              $scope.addBg(); 
              $(".titleSection div").css({
                  color: "#eee"
              });
           },3000);
         $interval(function(){
             $scope.addBg();
             $timeout(function(){
               $scope.removeBg();  
             },11000);
         },15000);
     })();
     
 });   