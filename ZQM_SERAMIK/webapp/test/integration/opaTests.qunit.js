/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZQM_SERAMIK/ZQM_SERAMIK/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});