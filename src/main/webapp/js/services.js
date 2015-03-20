angular.module('starter')

    /**
     * Service in charge of file upload POST request
     */
    .service('fileUpload', ['$http', '$state', function ($http,$state) {
        this.uploadFileToUrl = function(file, uploadUrl, callback){
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function(data){
                $state.go('result', {_filename: data.filename});
            }).error(function(){
                callback(-1);
            });
        }
    }]);