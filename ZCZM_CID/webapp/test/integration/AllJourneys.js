/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"ZCZM_CID/ZCZM_CID/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"ZCZM_CID/ZCZM_CID/test/integration/pages/App",
	"ZCZM_CID/ZCZM_CID/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ZCZM_CID.ZCZM_CID.view.",
		autoWait: true
	});
});