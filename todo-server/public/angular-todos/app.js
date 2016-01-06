angular.module('angularTodoApp', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('/', {
				url: '/',
				templateUrl: 'templates/common.html',
				controller: 'CommonController'
			})
			.state('/active', {
				url: '/active',
				templateUrl: 'templates/common.html',
				controller: 'CommonController'
			})
			.state('/completed', {
				url: '/completed',
				templateUrl: 'templates/common.html',
				controller: 'CommonController'
			});

		$urlRouterProvider.otherwise('/');
	})
	.constant("basicUrl", "/api/todo/");
