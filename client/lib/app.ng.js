    angular.module(
        "Knowledge",['angular-meteor','ngMaterial','ui.router', 'accounts.ui'])
        .config(function($mdThemingProvider) {
                $mdThemingProvider.theme('default').primaryPalette('blue').dark();
    });

function onReady() {
  angular.bootstrap(document, ['Knowledge'], {
    strictDi: true
  });
}
 
if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

/*Meteor._reload.onMigrate(function() {                                                                                                                                                     
        return [false];
});*/