'use strict';

require('es5-shim');
require('es5-sham');

require('jquery');
var angular = require('angular');
require('angular-route');

var app = angular.module('SunRayApp', [ 'ngRoute' ]);


app.constant('VERSION', require('../../package.json').version);

require('./service');
require('./controller');
require('./directive');



app.config(function($routeProvider, $locationProvider) {
$routeProvider
  .when('/todos', {
    templateUrl: 'views/todos.html',
    controller: 'TodoCtrl',
  })
  .when('/imprint', {
    templateUrl: 'views/imprint.html',
    controller: 'ImprintCtrl',
  })


  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',

  })

  .when('/testimonials', {
    templateUrl: 'views/testimonials.html',
    controller: 'TestimonialsCtrl',

  })
  .when('/faqs', {
    templateUrl: 'views/faqs.html',
    controller: 'FaqsCtrl',

  })
  .when('/services', {
    templateUrl: 'views/services.html',
    controller: 'ServicesCtrl',

  })
  .when('/financing', {
    templateUrl: 'views/financing.html',
    controller: 'FinancingCtrl',

  })
  .when('/contact', {
    templateUrl: 'views/contact.html',
    controller: 'ContactCtrl',

  })

  .when('/swimming-pools', {
    templateUrl: 'views/swimming-pools.html',
    controller: 'SwimmingPoolsCtrl',

  })
  .when('/special-features', {
    templateUrl: 'views/special-features.html',
    controller: 'SpecialFeaturesCtrl',

  })
  // .when('/swim-spas', {
  //   templateUrl: 'views/swim-spas.html',
  //   controller: 'SwimSpasCtrl',

  // })
  .when('/pool-covers', {
    templateUrl: 'views/pool-covers.html',
    controller: 'PoolCoversCtrl',

  })
  .when('/pentair', {
    templateUrl: 'views/pentair.html',
    controller: 'PentairCtrl',

  })
  .when('/outdoor-living', {
    templateUrl: 'views/outdoor-living.html',
    controller: 'OutdoorLivingCtrl',

  })
  .when('/renovation', {
    templateUrl: 'views/renovation.html',
    controller: 'RenovationCtrl',

  })
  .when('/pool-plaster', {
    templateUrl: 'views/pool-plaster.html',
    controller: 'PoolPlasterCtrl',

  })
  .when('/pool-tiles', {
    templateUrl: 'views/pool-tiles.html',
    controller: 'PoolTilesCtrl',

  })
  .when('/sun-deep-heat', {
    templateUrl: 'views/sun-deep-heat.html',
    controller: 'SunDeepHeatCtrl',

  })
  .when('/10-steps-report-request', {
    templateUrl: 'views/report-request.html',
    controller: 'ReportRequestCtrl',
  })



  .otherwise({
    redirectTo: '/todos',
  });

// hashbangs removed below
// doesn't work yet b/c rest of app is configured w/ hashbangs, so fix closer to production
  //  $locationProvider.html5Mode({enabled: true, requireBase:false});

});

