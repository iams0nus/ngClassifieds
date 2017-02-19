(function(){
	'use strict';
	angular.module('ngClassifieds')
	.controller('classifiedsCtrl',['$scope', '$http', 'classifiedsFactory', '$mdSidenav', '$mdToast', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast){
		
		classifiedsFactory.getClassifieds().then(function(classifieds){
			$scope.classifieds = classifieds.data;
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

		$scope.deleteClassified = function(classified){
			var index = $scope.classified.indexOf(classified);
			$scope.classifieds.splice(classified);
		}


	}]);
})();