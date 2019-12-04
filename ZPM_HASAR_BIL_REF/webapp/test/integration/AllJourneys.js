sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "ZPM_HASAR_BIL_REF.ZPM_HASAR_BIL_REF.view.",
		autoWait: true
	});
});