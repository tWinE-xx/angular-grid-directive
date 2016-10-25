angular.module('angular-grid-directive', []); 

angular.module('angular-grid-directive')
	.filter('range', function() {
		return function(input, start) {
			start = +start; //parse to int
			return input.slice(start);
		};
	});

angular.module('angular-grid-directive')
	.filter('startFrom', function() {
		return function(input, start) {
			start = +start; //parse to int
			return input.slice(start);
		};
	});

angular.module('angular-grid-directive')
	.filter('range', function() {
		return function(input, total) {
			total = parseInt(total);
			for (var i=0; i<total; i++)
				input.push(i);
			return input;
			};
		});

angular.module('angular-grid-directive')
	.directive('angularGridDirective',['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
            	gridTemplateUrl: '=',
        		gridTitleData: '=',
        		gridBodyData: '=',
        		gridPageSize: '=',
        		gridVisiblePagesCount: '=',
        		gridSortEnabled: '=',
        		gridSearchEnabled: '=',
    			gridPagingEnabled: '=',
    			gridColKeys: '='
            },
            controller: 'gridController',
            template: '<!-- Search + table -->'+
					'<div class="panel panel-default">'+ 
					'	<div class="panel-heading">'+
					'		<input data-ng-show="gridSearchEnabled" placeholder="Search.." type="text" data-ng-model="searchWord" placeholder="" style="width:100%;"/>'+
					'	</div>'+ 
					'	<table class="table">'+ 
					'		<thead>'+ 
					'			<tr>'+ 
					'				<th data-ng-repeat="item in colTitles" data-ng-class="item.key">'+
					'					<div data-ng-class="{ \'sorted-header\' : item.sortable, \'sort-desc\': orderByFiledName == \'-\' + item.key, \'sort-asc\': orderByFiledName == \'+\' + item.key }">'+
					'						<a href="#" data-ng-click="item.sortable && changeOrderOfFiled(item.key)">{{item.title}}</a>'+
					'					</div>'+ 
					'				</th>'+
					'			</tr>'+ 
					'		</thead>'+ 
					'		<tbody>'+ 
					'			<tr data-ng-repeat="item in data | filter:searchWord | orderBy:orderByFiledName | startFrom:currentPage*pageSize | limitTo:pageSize">'+
					'				<td data-ng-repeat="colItem in colTitles" data-custom-table-cell-render-directive="{{colItem.key}}" data-row-data="item">{{item[colItem.key]}}</td>'+ 
					'			</tr>'+ 
					'		</tbody>'+ 
					'	</table>'+ 
					'</div>'+
					'<!-- Paging -->'+
					'<div data-ng-show="gridPagingEnabled==true" style="direction: ltr;">'+	
					'	<ul class="pagination">'+ 
					'		<li class="">'+
					'			<a href="" data-ng-click="firstPage()" title="First"><<</a>'+ 
					'		</li>'+ 
					'		<li class="">'+	 
					'			<a href="" data-ng-click="prevPage()" title="Previous"><</a>'+ 
					'		</li>'+ 
					'		<li class="{{n == currentPage ? \'active\': \'\'}}" data-ng-if="totalDisplayedPages > 0" data-ng-repeat="n in [] | range:numberOfPages() | startFrom:getPageTostartFrom() | limitTo:totalDisplayedPages">'+	 
					'			<a href="#" data-ng-click="goToPage(n)">{{n+1}}</a>'+ 
					'		</li>'+ 
					'		<li class="{{n == currentPage ? \'active\': \'\'}}" data-ng-if="totalDisplayedPages == 0" data-ng-repeat="n in [] | range:numberOfPages()">'+	 
					'			<a href="#" data-ng-click="goToPage(n)">{{n+1}}</a>'+ 
					'		</li>'+ 
					'		<li class="" >'+	 
					'			<a href="" data-ng-click="nextPage()" title="Next">></a>'+ 
					'		</li>'+ 
					'		<li class="" >'+
					'			<a href="" data-ng-click="lastPage()" title="Last">>></a>'+ 
					'		</li>'+	
					'	</ul>'+
					'</div>'
        };
    }]);

angular.module('angular-grid-directive')
	.controller('gridController',[ '$scope', function ($scope) {
	
		//verify data attributes
		if (!$scope.gridBodyData){
			console.warn('hrlGridDirective - no grid-body-data attribute was provider');
			return;
		}
		if (!$scope.gridTitleData){
			console.warn('hrlGridDirective - no grid-title-data attribute was provider');
			return;
		}
		if (!$scope.gridPageSize){
			$scope.pageSize = $scope.gridBodyData.length;
		} else {
			$scope.pageSize = $scope.gridPageSize;
		}
		if ($scope.gridSortEnabled != true && $scope.gridSortEnabled != false){
			console.warn('hrlGridDirective - grid-sort-enabled attribute must be true || false');
			return;
		}
		if ($scope.gridSearchEnabled != true && $scope.gridSearchEnabled != false){
			console.warn('hrlGridDirective - grid-search-enabled attribute must be true || false');
			return;
		}
		
		$scope.totalDisplayedPages = 0;
		if (!isNaN($scope.gridVisiblePagesCount)) {
			$scope.totalDisplayedPages = $scope.gridVisiblePagesCount;
		}
		
		$scope.currentPage = 0;

		$scope.colTitles = $scope.gridTitleData;
		$scope.data = $scope.gridBodyData;
		
		$scope.numberOfPages=function(){
			return Math.ceil($scope.data.length/$scope.pageSize);                
		};
		
		$scope.goToPage = function(selectedPage){
			if ($scope.currentPage != selectedPage) {
				$scope.currentPage = selectedPage;
				$scope.$root.$broadcast('gridControllerPageChange', $scope.currentPage);
			}
		};
		
		$scope.firstPage = function(){
			if ($scope.currentPage != 0) {
				$scope.$root.$broadcast('gridControllerPageChange', $scope.currentPage);
				$scope.currentPage = 0;
			}
		};
		$scope.prevPage = function() {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
				$scope.$root.$broadcast('gridControllerPageChange', $scope.currentPage);
			}
		};
		$scope.nextPage = function() {
			if ($scope.currentPage+1 < $scope.numberOfPages()) {
				$scope.currentPage++;
				$scope.$root.$broadcast('gridControllerPageChange', $scope.currentPage);
			}
		};
		
		$scope.lastPage = function(){
			$scope.currentPage = $scope.numberOfPages()-1;
			$scope.$root.$broadcast('gridControllerPageChange', $scope.currentPage);
		};
		
		$scope.getPageTostartFrom = function() {

			if ($scope.totalDisplayedPages == 0 || $scope.numberOfPages() <= $scope.totalDisplayedPages)
				return 0;

			var totalPages = $scope.numberOfPages();
			var startFromIndex = $scope.currentPage - parseInt($scope.totalDisplayedPages / 2);
			// below - bad
			if (startFromIndex <= 0) {
				return 0;
			}
			// above - bad
			if (totalPages - startFromIndex < $scope.totalDisplayedPages) {
				return totalPages - $scope.totalDisplayedPages;
			}
			return startFromIndex;
		};
		
		$scope.changeOrderOfFiled = function(filedName){
			if ($scope.orderByFiledName == '+' + filedName)
				$scope.orderByFiledName = '-' + filedName;
			else if ($scope.orderByFiledName == '-' + filedName)
				$scope.orderByFiledName = '+' + filedName;
			else
				$scope.orderByFiledName = '+' + filedName;
			$scope.$root.$broadcast('gridControllerFieldOrderChange', $scope.orderByFiledName);
		};
		
		$scope.$root.$on('resetGridSystem', function() {
			$scope.currentPage = 0;
			$scope.orderByFiledName = '';
			$scope.$root.$broadcast('gridControllerPageChange', $scope.currentPage);
		});    
	}]);




