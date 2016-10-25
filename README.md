# angular-grid-directive
<p align="center">
    <a href="https://travis-ci.org/badges/shields">
        <img src="https://travis-ci.org/tWinE-xx/angular-grid-directive.svg?branch=master"
             alt="build status">
    </a>
</p>
An angular.js directive for creating grid using only configurations and data. the directive includes sort, search and pagination

## Install
```
npm install angular-grid-directive
```

## Usage
```js
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>angular-grid-directive sample</title>

	<!-- Styles -->
	<link href="bootstrap.min.css" rel="stylesheet" type="text/css" /> 

</head>
<body data-ng-app="sample" data-ng-controller="sampleController">

	<div data-angular-grid-directive		 
			data-grid-title-data="[{title:'ID',key:'id', sortable: true },{ title:'GENGER',key:'gender', sortable: true },{ title:'FIRST NAME',key:'first_name', sortable: true },{ title:'LAST NAME',key:'last_name', sortable: true },{ title:'EMAIL',key:'email', sortable: true },{ title:'CITY',key:'city', sortable: true }]"
			data-grid-body-data="bodyData"
			data-grid-page-size="10"	data-grid-visible-pages-count="5" 
			data-grid-sort-enabled="true"
			data-grid-search-enabled="true" 
			data-grid-col-keys="6" 
			data-grid-paging-enabled="true">
	</div>

	<!-- Angular -->
	<script src="../node_modules/angular/angular.js"></script>
	<!-- load grid files -->
	<script src="../src/angular-grid-directive.js"></script>
	
<script>

angular.module('sample', ['angular-grid-directive'])
	.controller('sampleController', function($scope){

		$scope.bodyData = loadList();
		
		function loadList() {
			var list = [];
			for (var i=0;i<100;i++)
				list.push({
					"id": i,
					"gender": i%2 == 0 ? "Female" : "Male",
					"first_name": "FisrtName"+i,
					"last_name": "LastName"+i,
					"email": "email"+i+"@so-net.ne.jp",
					"city": "City"+i
				});
			return list;
		}	
	});

</script>

</body>
</html>
```