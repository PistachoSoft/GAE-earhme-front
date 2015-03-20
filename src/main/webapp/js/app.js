angular.module('starter', ['ui.router'])

        .config(function($stateProvider, $urlRouterProvider){
            $stateProvider

                .state('starter', {
                    url: "/",
                    templateUrl: "index.html"
                })

                .state('home', {
                    url: "/home",
                    templateUrl: "templates/main/home.html",
                    controller: "MainCtrl"
                })

                .state('result', {
                    url: "/result/:_filename",
                    templateUrl: "templates/main/result.html",
                    controller: "ResultCtrl"
                })

                .state('about', {
                    url: "/about",
                    templateUrl: "templates/main/about.html",
                    controller: "AboutCtrl"
                });

            $urlRouterProvider.otherwise('home');
        })

        .run(['$anchorScroll', function($anchorScroll) {
            $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
        }]);