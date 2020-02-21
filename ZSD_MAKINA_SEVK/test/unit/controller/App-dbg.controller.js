/*global QUnit*/

sap.ui.define([
	"ZSD_MAKINA_SEVK/ZSD_MAKINA_SEVK/controller/App.controller"
], function (Controller) {
	"use strict";

	QUnit.module("App Controller");

	QUnit.test("I should test the App controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});