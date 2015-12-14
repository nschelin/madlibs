"use stric";
var app = angular.module("MadLibsApp",[]);
app.controller("MainCtrl", ["$scope", function($scope){
	$scope.title = "Mad Libs";
}]);

// taken directly from angularjs docs page and modified read method
// https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
app.directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };

      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
      read(); // initialize

      // Write data to the model
      function read() {
      		// modify 
        	var input = element.html();
			input = input.replace(/{{\s*noun\s*}}/ig, "<div class='replace-container'><input type='text' /><span class='replace-type'>(noun)</span></div>");
			input = input.replace(/{{\s*adjective\s*}}/ig, "<div class='replace-container'><input type='text' /><span class='replace-type'>(adjective)</span></div>");
			input = input.replace(/{{\s*adverb\s*}}/ig, "<div class='replace-container'><input type='text' /><span class='replace-type'>(adverb)</span></div>");
			input = input.replace(/{{\s*person\s*}}/ig, "<div class='replace-container'><input type='text' /><span class='replace-type'>(Person&apos;s Name)</span></div>");
			input = input.replace(/{{\s*number\s*}}/ig, "<div class='replace-container'><input type='text' /><span class='replace-type'>(number)</span></div>");
			$('#madLibOutput').html(input);

        ngModel.$setViewValue(html);
      }
    }
  };
}]);