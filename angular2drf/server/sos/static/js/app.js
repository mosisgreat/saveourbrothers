var sosApp = angular.module('sosApp', ['ngRoute', 'sosControllers']);
sosApp.config(['$routeProvider',
	function ($routeProvider){
		$routeProvider.
		when('/seekers/:seekerId', {
//			templateUrl: 'http://localhost:8000/static/js/sos/partials/seeker-detail.html',
			templateUrl: 'http://localhost/seeker-detail.html',
			controller: 'seekerDetailController'
		});
	}
]);

sosApp.config([
	'$httpProvider', function($httpProvider) {
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	}
]);