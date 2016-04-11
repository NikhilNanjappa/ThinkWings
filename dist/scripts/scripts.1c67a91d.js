"use strict";angular.module("flightTwApp",["ngRoute","ngSanitize","ui.slider"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("flightTwApp").controller("MainCtrl",["$scope","$http",function(a,b){b.get("/scripts/controllers/flights.json").then(function(b){a.flight_details=b.data.flight_data,console.log(a.flight_details)}),a.lower_price_bound=0,a.upper_price_bound=39e3,a.dummy_dates=["1st Jan 2012","20th Jan 2012","13th Feb 2013"],a.priceRange=function(b){return parseInt(b.cost)>=a.lower_price_bound&&parseInt(b.cost)<=a.upper_price_bound}}]),angular.module("flightTwApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("flightTwApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<script type="text/javascript">$(\'#myTabs a\').click(function (e) {\n    e.preventDefault()\n    $(this).tab(\'show\')\n  })</script> <div class="row"> <div class="col-md-4"></div> <div class="col-md-4 text-center"> <input type="text" placeholder="Which Airline would you prefer" class="form-control" ng-model="search.airline"> </div> <div class="col-md-4"></div> </div> <br> <div class="row price-filter"> <div class="col-md-2"> <p>Filter by price </p> </div> <div class="col-md-8"> <slider floor="0" ceiling="39000" ng-model-low="lower_price_bound" ng-model-high="upper_price_bound"></slider> </div> <div class="col-md-2"></div> </div> <div class="row"> <div class="col-md-4"> <!-- Nav tabs --> <ul id="myTabs" class="nav nav-tabs" role="tablist"> <li role="presentation" class="active"><a href="#oneway" aria-controls="oneway" role="tab" data-toggle="tab" ng-click="originCityReturn.from = \'\'; destCityReturn.to = \'\'">One way</a></li> <li role="presentation"><a href="#return" aria-controls="return" role="tab" data-toggle="tab" ng-click="originCityOneWay.from = \'\'; destCityOneWay.to = \'\'">Return</a></li> </ul> <!-- Tab panes --> <div class="tab-content"> <div role="tabpanel" class="tab-pane active" id="oneway"> <br><input type="text" placeholder="Origin City - filter applied" class="form-control" ng-model="originCityOneWay.from"><br> <input type="text" placeholder="Destination City - filter applied" class="form-control" ng-model="destCityOneWay.to"><br> <select class="form-control input-sm" ng-model="deptDateOneWay" ng-options="o as o for o in dummy_dates"> <option value="">Departure Date - no filter applied</option> </select><br> <select class="form-control input-sm"> <option>Passengers</option> <option>1</option> <option>2</option> <option>3</option> <option>4</option> </select><br> </div> <div role="tabpanel" class="tab-pane" id="return"> <br><input type="text" placeholder="Origin City - filter applied" class="form-control" ng-model="originCityReturn.from"><br> <input type="text" placeholder="Destination City - filter applied" class="form-control" ng-model="destCityReturn.to"><br> <select class="form-control input-sm" ng-model="deptDateReturn" ng-options="o as o for o in dummy_dates"> <option value="">Departure Date - no filter applied</option> </select><br> <select class="form-control input-sm" ng-model="retDateReturn" ng-options="o as o for o in dummy_dates"> <option value="">Return Date - no filter applied</option> </select><br> <select class="form-control input-sm"> <option>Passengers</option> <option>1</option> <option>2</option> <option>3</option> <option>4</option> </select><br> </div> </div> </div> <div class="col-md-8"> <div class="jumbotron" ng-repeat="f in flight_details | filter:search | filter:priceRange | filter:originCityOneWay | filter:originCityReturn | filter:destCityOneWay | filter:destCityReturn"> <div class="row flight-details"> <div class="col-md-12 text-center"> <h4>&#8377; {{ f.cost }}</h4> </div> <div class="col-md-6 text-left"> <div>{{ f.airline }} :: {{ f.flight_number }}</div> </div> <div class="col-md-6 text-right"> <div>{{ f.from }} > {{ f.to }}</div><br> </div> <div class="col-md-6 text-left"> <div>Depart: {{ f.departure }}</div> </div> <div class="col-md-6 text-right"> <div>Arrival: {{ f.arrival }}</div> </div> </div> </div> </div> </div>')}]);