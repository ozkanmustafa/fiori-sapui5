/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"ZCRM_DEALERS/ZCRM_DEALERS/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"ZCRM_DEALERS/ZCRM_DEALERS/test/integration/pages/App",
	"ZCRM_DEALERS/ZCRM_DEALERS/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ZCRM_DEALERS.ZCRM_DEALERS.view.",
		autoWait: true
	});
});