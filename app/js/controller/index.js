'use strict';

require('angular').module('SunRayApp')
	.controller('EditTodoCtrl', require('./edit_todo'))
	.controller('FooterCtrl', require('./footer'))
	.controller('TodoCtrl', require('./todo'))
	.controller('TodoListCtrl', require('./todo_list'))
	.controller('NavCtrl', require('./nav'))

	.controller('AboutCtrl', require('./about'))
	.controller('TestimonialsCtrl', require('./testimonials'))
	.controller('FaqsCtrl', require('./faqs'))
	.controller('ServicesCtrl', require('./services'))
	.controller('FinancingCtrl', require('./financing'))
	.controller('ContactCtrl', require('./contact'))
	.controller('SwimmingPoolsCtrl', require('./swimming_pools'))
	.controller('SpecialFeaturesCtrl', require('./special_features'))
	// .controller('SwimSpasCtrl', require('./spim_spas'))
	.controller('PoolCoversCtrl', require('./pool_covers'))
	.controller('PentairCtrl', require('./pentair'))
	.controller('OutdoorLivingCtrl', require('./outdoor_living'))
	.controller('RenovationCtrl', require('./renovation'))
	.controller('PoolPlasterCtrl', require('./pool_plaster'))
	.controller('PoolTilesCtrl', require('./pool_tiles'))
	.controller('SunDeepHeatCtrl', require('./sun_deep_heat'))
	.controller('ReportRequestCtrl', require('./report_request'));
