angular.module('starter')

    .directive('footer', function(){
        return {
            restrict: 'E',
            templateUrl: 'templates/components/footer.html'
        }
    })

    .directive('fileModel', ['$parse', function($parse){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    })
                })
            }
        }
    }]);