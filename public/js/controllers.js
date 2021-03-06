'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).controller('IndexCtrl', function ($scope, $http) {
        $http.get('/api/posts').
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;
            });
    }).controller('AddPostCtrl', function ($scope, $http, $location) {
        $scope.form = {};
        $scope.submitPost = function () {
            $http.post('/api/post', $scope.form).
                success(function(data) {
                    $location.path('/');
                });
        };
    }).controller('ReadPostCtrl', function ($scope, $http, $routeParams) {
        $http.get('/api/post/' + $routeParams.id).
            success(function(data) {
                $scope.post = data.post;
            });
    }).controller('EditPostCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/api/post/' + $routeParams.id).
        success(function(data) {
            $scope.form = data.post;
        });
        $scope.editPost = function () {
            $http.put('/api/post/' + $routeParams.id, $scope.form).
                success(function(data) {
                    $location.url('/readPost/' + $routeParams.id);
                });
        };
    }).controller('DeletePostCtrl', function ($scope, $http, $location, $routeParams) {
        $http.get('/api/post/' + $routeParams.id).
            success(function(data) {
                $scope.post = data.post;
            });

        $scope.deletePost = function () {
            $http.delete('/api/post/' + $routeParams.id).
                success(function(data) {
                    $location.url('/');
                });
        };

        $scope.home = function () {
            $location.url('/');
        };
    }
);