/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZPM_HASAR_BIL_REF/ZPM_HASAR_BIL_REF/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});