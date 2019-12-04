/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZMM_PYP2PYPTRF/ZMM_PYP2PYPTRF/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});