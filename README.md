# angular-grid-directive
<p align="center">
    <a href="https://travis-ci.org/badges/shields">
        <img src="https://travis-ci.org/tWinE-xx/angular-grid-directive.svg?branch=master" alt="build status">
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
			data-grid-title-data="titleData"
			data-grid-body-data="bodyData"
			data-grid-page-size="10"	
			data-grid-visible-pages-count="5" 
			data-grid-sort-enabled="true"
			data-grid-search-enabled="true"
			data-grid-paging-enabled="true">
	</div>
	<button data-ng-click="save()">Save</button>

	<!-- Angular -->
	<script src="../node_modules/angular/angular.js"></script>
	<!-- load grid files -->
	<script src="../src/angular-grid-directive.js"></script>
	
<script>

angular.module('sample', ['angular-grid-directive'])
	.controller('sampleController', function($scope){

		$scope.save = function(){
			//here you can use $scope.titleData which includes all changed data
			debugger;
		}

		/*
			title    : the columns title
			key      : the key to get data/configuration from
			sortable : is true sorting of column enabled
			type     : the type of element, can be : label , link, checkbox, input
		*/
		$scope.titleData = [
			{ title:'ID',key:'id', sortable: true, type: 'label' },
			{ title:'GENGER',key:'gender', sortable: true, type: 'label' },
			{ title:'FIRST NAME',key:'first_name', sortable: true, type: 'label' },
			{ title:'LAST NAME',key:'last_name', sortable: true, type: 'label' },
			{ title:'EMAIL',key:'email', sortable: true, type: 'label' },
			{ title:'CITY',key:'city', sortable: true, type: 'label' },
			{ title:'GOTO',key:'goto', sortable: true, type: 'link' },
			{ title:'REMARKS',key:'remarks', sortable: true, type: 'input' },
			{ title:'TERMS',key:'acceptTerms', sortable: true, type: 'checkbox' }
		]

		$scope.bodyData = loadList();
		
		function loadList() {
			var list = [];
			for (var i=0;i<100;i++)
				list.push({
					/*
					-> label type configuration
					label : text that will appear
					*/
					"id": {
						label: i
					},
					"gender": {
						label: i%2 == 0 ? "Female" : "Male"
					},
					"first_name": {
						label: "FisrtName"+i
					},
					"last_name":{
						label:  "LastName"+i
					},
					"email": {
						label: "email"+i+"@so-net.ne.jp"
					},
					"city": {
						label: "city"+i
					},
					/*
					-> link type configuration
					label : text that will appear
					cb    : a callback funtion that is activated after click
					*/
					"goto": {
						label: 'link'+i,
						cb: function(row){
							console.log('link clicked', row)
						}
					},
					/*
					remarks type configuration
					placeholder : text that will appear
					data        : a callback funtion that is activated after click
					*/
					"remarks": {
						label : '',
						placeholder: 'placeholder..'+i,
						data: ''
					},
					/*
					checkbox type configuration
					checked : is checked 
					label   : text that will appear
					*/
					"acceptTerms": {
						label: "label"+i,
						checked: false
					}
				});
			return list;
		}	
	});

</script>

</body>
</html>
```