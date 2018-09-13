var sosControllers = angular.module('sosControllers', []);

sosControllers.controller('seekerDetailController', ['$scope', '$routeParams', '$http',
	function ($scope, $routeParams, $http) {

		$http.get('http://127.0.0.1:8000/api/seekers/' + $routeParams.seekerId + '/?formar=json')
			.success(function(data){
				console.log(data);
				$scope.seeker = data;
			});
	}
]);
// SeekerDetailController