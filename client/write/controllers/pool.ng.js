angular.module('Knowledge').controller('poolController', function ($scope, $meteor,$stateParams,$mdSidenav,$timeout,$mdToast,$interval){
    
     $scope.currentpool = $stateParams.detail;
    
     $scope.currentUser = null;
    
     $scope.userdayspref=[];
    
     $scope.curentUserprofile = null;
    
     $scope.userchanges = null;
     
     $scope.totalPoolcount = 0; 
    
    
     $scope.adddays = function(index){
         var days = [];
         var currentObject =  $scope.curentUserprofile;
         $scope.poolData[index][0].dates.forEach(function(ival,indx){
             var val = angular.copy(ival);
             delete val.$$hashkey;
             if(val.s && !val.indb){
                 val.pool=$scope.currentpool;
                 val.pos = indx;
                 val.indb = true;
                 val.week=index;
                 val.status="seeker";
                 val.id=val.pool+val.d.split(" ").join("");
                 days.push(val);
             }
         });
         currentObject.days = days.concat(currentObject.days?currentObject.days:[]);
         currentObject.save().then(function(){
             $scope.afterSave(index);
             $mdToast.show(
              $mdToast.simple()
                .content("saved successfully..")
                .position("top right")
                .hideDelay(3000)
            );
          }, function(error){
            $mdToast.show(
              $mdToast.simple()
                .content("There was an error")
                .position("top right")
                .hideDelay(3000)
            );
          });
     };
      $scope.unselections = [];
      $scope.trackUnselections = function(x,viewval){
          var val = angular.copy(viewval);
           if(!val.s){
            val.pool=$scope.currentpool;
            //val.pos = indx;
            val.week=x;
            val.s = true;
            val.status="seeker";
            delete val.$$hashKey;
            $scope.unselections.push(val);
            $scope.removedays(x);
           }/*else{
               var splicedIndex = 0;
               for(var i in $scope.unselections){
                   if(
                     $scope.unselections[i].d == val.d &&
                     $scope.unselections[i].pool == val.pool
                     )
                   splicedIndex = i;
               }
            $scope.unselections.splice(splicedIndex,1);
           }*/
      };
        $scope.removedays = function(index){
             var days = [];
             var result = UserProfiles.update(
                  { _id:$scope.currentUser},
                  { $pull: { days:     {$or: $scope.unselections}       } },
                  { multi: true }
             );
             
            if(result){
                 $scope.unselections=[];
                 $scope.afterSave(index);
                 $mdToast.show(
                  $mdToast.simple()
                    .content("Removed successfully..")
                    .position("top right")
                    .hideDelay(3000)
                );
            }
            else{
                $mdToast.show(
                  $mdToast.simple()
                    .content("There was an error")
                    .position("top right")
                    .hideDelay(3000)
                );
            }
        };
    /* $scope.$watch('userchanges', function() {
       console.log('hey, myVar has changed!');
     });*/
     $scope.dateGen =  function(){
         var seekerdates =  $meteor.object(UserProfiles, {
           "_id":  $scope.currentUser,
           "days.pool":$stateParams.detail
         },false);
         
              
         if(seekerdates.days)
         seekerdates.days.forEach(function(val,indx){
             if(val.pool == $stateParams.detail){
                 $scope.poolData[val.week][0].dates[val.pos].s = val.s;
                 $scope.poolData[val.week][0].dates[val.pos]["indb"] = val.indb;
             }
         });
     };
     $scope.afterSave = function(indx){
          $scope.totalPoolcount =  UserProfiles.find({
                "days.pool":$stateParams.detail
            }).count();
         var searchregex = ".*"+$stateParams.detail+"*."
          $scope.trainerscount = UserProfiles.find({"skills":{$regex : searchregex,$options: 'i'}}).count();
         if($scope.currentSkills.toLowerCase().indexOf($stateParams.detail.toLowerCase().trim())>-1){
            $scope.trainVisible =   $scope.totalPoolcount>0 ? true:false;
        }else{
            $scope.trainVisible = false;
        }
         
              $scope.poolData[indx][0].weekseekcount = UserProfiles.find({"days.pool":$stateParams.detail,"days.week":Number(indx)}).count();
         
              $scope.poolData[indx][0].dates.forEach(function(ival,iindx){
                 var p = $scope.totalPoolcount > 0 ? Math.round(UserProfiles.find({"days.id":$stateParams.detail+ival.d.split(" ").join("")}).count() / $scope.totalPoolcount * 100 ) : 0;
                   $scope.poolData[indx][0].weekusers[iindx].p = p;
                });
     };
     $scope.poolData=[
         [{
             dates:[{d:"Nov 30",t:"Mon",s:false},{d:"Dec 1",t:"Tue",s:false},{d:"Dec 2",t:"Wed",s:false},{d:"Dec 3",t:"Thu",s:false},{d:"Dec 4",t:"Fri",s:false}],
            weekusers:[
                  { p:0,s:false,d:"Nov30",week:0},
             { p:0,s:false,d:"Dec1",week:0},
             { p:0,s:false,d:"Dec2",week:0},
             { p:0,s:false,d:"Dec3",week:0},
             { p:0,s:false,d:"Dec4",week:0}
             ],
             selctdate:"",
             weekseekcount:0
         }],
         [{
             dates:[{d:"Dec 7",t:"Mon",s:false},{d:"Dec 8",t:"Tue",s:false},{d:"Dec 9",t:"Wed",s:false},{d:"Dec 10",t:"Thu",s:false},{d:"Dec 11",t:"Fri",s:false}],
            weekusers:[
                { p:0,s:false,d:"Dec7"},
                { p:0,s:false,d:"Dec8"},
                { p:0,s:false,d:"Dec9"},
                { p:0,s:false,d:"Dec10"},
                { p:0,s:false,d:"Dec11"}
             ],selctdate:"",
             weekseekcount:0
         }],
         [{
             dates:[{d:"Dec 14",t:"Mon",s:false},{d:"Dec 15",t:"Tue",s:false},{d:"Dec 16",t:"Wed",s:false},{d:"Dec 17",t:"Thu",s:false},{d:"Dec 18",t:"Fri",s:false}],
            weekusers:[
             { p:0,s:false,d:"Dec14"},
              { p:0,s:false,d:"Dec15"},
                { p:0,s:false,d:"Dec16"},
              { p:0,s:false,d:"Dec17"},
                { p:0,s:false,d:"Dec18"}
             ],selctdate:"",
             weekseekcount:0
         }],
         [{
             dates:[{d:"Dec 21",t:"Mon",s:false},{d:"Dec 22",t:"Tue",s:false},{d:"Dec 23",t:"Wed",s:false},{d:"Dec 24",t:"Thu",s:false},{d:"Dec 25",t:"Fri",s:false}],
            weekusers:[
             { p:0,s:false,d:"Dec21"},
              { p:0,s:false,d:"Dec22"},
                 { p:0,s:false,d:"Dec23"},
              { p:0,s:false,d:"Dec24"},
                 { p:0,s:false,d:"Dec25"}
             ],selctdate:"",
             weekseekcount:0
         }]
     ];
     
     $scope.toggleLeft = function(){
         $timeout(function() {
            $mdSidenav("left")
              .toggle();
          }, 200);
     };
     
     (function(){
        $scope.currentUser = JSON.parse(sessionStorage.getItem("user")).ldap;
        $scope.currentSkills = UserProfiles.findOne({_id:$scope.currentUser}).skills || "";
        $scope.curentUserprofile = $meteor.object(UserProfiles, $scope.currentUser,false);
         
         var timer = 0;
         var stop = $interval(function() {
             $scope.afterSave(timer);
             timer++;
             if(timer==4) $interval.cancel(stop);
         },300);
        
       
        $scope.dateGen();
     })();
});