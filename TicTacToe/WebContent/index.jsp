<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="app">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
<script type="text/javascript" src="angular/script.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body  ng-controller="ctrl">
<h1></h1>
<div class="table">

</div>
<div class="div">
<br>
<button class="button" ng-click="showNewGame()">New Game</button>
</div>
</body>
</html>