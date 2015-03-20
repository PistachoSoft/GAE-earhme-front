/**
 * API_URL base server location
 * @type {string}
 */
var API_URL = "http://earthme-back.appspot.com";

angular.module('starter')

    /**
     * Main Controller
     * In charge of:
     *  - form consistance
     *  - file uploading request
     *  - spinner handling
     */
    .controller('MainCtrl', [ '$scope', '$http', 'fileUpload', function($scope, $http, fileUpload) {
        $scope.hiddenSpinner = true;
        $scope.hiddenErrorMessage = true;

        $scope.hideErrorMessage = function () {
            $scope.hiddenErrorMessage = true;
        }
        
        var uploadUrl;
        
        /**
         * File upload request
         */
        $scope.uploadFile = function () {
            $scope.hiddenSpinner = false;
            $scope.hiddenErrorMessage = true;

            $http.get(API_URL+"/")
                .success(function(data){
                    console.log(data.uploadUri);
                    uploadUrl = data.uploadUri;

                    var file = $scope.myFile;
                    console.log('file is ' + JSON.stringify(file));
                    //var uploadUrl = API_URL + "/api/upload";
                    fileUpload.uploadFileToUrl(file, uploadUrl, function (data) {
                        $scope.hiddenSpinner = true;
                        if (data === -1) {
                            $scope.hiddenErrorMessage = false;
                        }
                    });
                })
                .error(function(data){
                    console.log("error");
                    $scope.hiddenSpinner = true;
                    $scope.hiddenErrorMessage = false;
                });
        };

        /**
         * File input scripts
         */
        $(document).on('change', '.btn-file :file', function () {
            var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);

        });

        $(document).ready(function () {
            $('.btn-file :file').on('fileselect', function (event, numFiles, label) {

                var input = $(this).parents('.input-group').find(':text'),
                    log = numFiles > 1 ? numFiles + ' files selected' : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log) alert(log);
                }

            });
        });
    }])

    /**
     * Result Controller
     */
    .controller('ResultCtrl', [ '$scope', '$stateParams', function($scope,$stateParams){
        $scope.filename = $stateParams._filename;
        $scope.file = API_URL+"/api/uploads/"+$stateParams._filename;
    }])

    .controller('AboutCtrl', [ '$scope', '$anchorScroll', '$location', function($scope,$anchorScroll,$location){
        $scope.goToAnchor = function(id){
            var newHash = 'anchor' + id;
            if ($location.hash() !== newHash) {
                $location.hash('anchor' + id);
            } else {
                $anchorScroll();
            }
        };

        $scope.backToTop = function(){
            $location.hash('top');
            $anchorScroll();
        }
    }]);