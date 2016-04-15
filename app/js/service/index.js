'use strict';

var app = require('angular').module('SunRayApp');

app.service('ImprintService', require('./imprint'));
app.service('TodoService', require('./todos'));
