/*global QUnit*/

sap.ui.define([
	"ZMM_PYP2PYPTRF/ZMM_PYP2PYPTRF/controller/Main.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main Controller");

	QUnit.test("I should test the Main controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});