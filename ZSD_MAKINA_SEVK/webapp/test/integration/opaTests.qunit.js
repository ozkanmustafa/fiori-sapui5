/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZSD_MAKINA_SEVK/ZSD_MAKINA_SEVK/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});