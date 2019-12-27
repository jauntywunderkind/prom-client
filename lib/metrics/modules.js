'use strict';

const Gauge = require('../gauge');

const NODEJS_MODULES_LOADED = 'nodejs_modules_loaded';

module.exports = (registry, config = {}) => {
	const namePrefix = config.prefix ? config.prefix : '';

	const gauge = new Gauge({
		name: namePrefix + NODEJS_MODULES_LOADED,
		help: 'Number of modules cached.',
		registers: registry ? [registry] : undefined,
		aggregator: 'average'
	});

	return () => {
		const now = process.hrtime();
		gauge.set(Object.keys(require.cache).length, now);
	};
};

module.exports.metricNames = [NODEJS_MODULES_LOADED];
