(function(){
	'use strict';
	angular.module('ngClassifieds')
	.controller('classifiedsCtrl',['$scope', '$http', 'classifiedsFactory', '$mdSidenav', '$mdToast', '$mdDialog', 
		function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){

			classifiedsFactory.getClassifieds().then(function(classifieds){
				$scope.classifieds = classifieds.data;
				$scope.categories=getCategories($scope.classifieds);
			});

			$scope.openSidebar = function(){
				$mdSidenav('left').open();
			};
			$scope.closeSidebar = function(){
				$mdSidenav('left').close();
			};

			var contact = {
				name:'Sonu Sharma',
				phone:"(842) 035-0246",
				email:"sharmasonu.edu@gmail.com"
			};

			$scope.saveClassified = function(classified){
				if(classified){
					classified.contact = contact;
					$scope.classifieds.push(classified);
					$scope.classified = {};
					$scope.closeSidebar();
					showToast("Classified Saved!!");
				}	
			};

			$scope.editClassified = function(classified){
				$scope.editing = true;
				$scope.openSidebar();
				$scope.classified = classified;
			};

			$scope.saveEdit = function(){
				$scope.editing = false;
				$scope.classified = {};
				$scope.closeSidebar();
				showToast("Classified Edited!!");
			};

			function showToast(message){
				$mdToast.show(
					$mdToast.simple()
					.content(message)
					.position('top, right')
					.hideDelay(3000)
				);
			};

			$scope.deleteClassified = function(event, classified){
				$mdDialog.show(
					$mdDialog.confirm()
					.title('Are you sure you want to delete ' + classified.title + '?')
					.ok('Delete')
					.cancel('Go Back')
					.targetEvent(event)
				)
				.then(function(){
					var index = $scope.classifieds.indexOf(classified);
					$scope.classifieds.splice(index ,1);
					showToast("Classified Deleted!!")
				},function(){});
				
			};

			

			function getCategories(classifieds){
				var categories =[];
				angular.forEach(classifieds, function(item){
					angular.forEach(item.categories, function(category){
						categories.push(category);
					});
				});
				return _.uniq(categories);
			};

		}]);
})();