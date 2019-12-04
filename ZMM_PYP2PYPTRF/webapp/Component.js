sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ZMM_PYP2PYPTRF/ZMM_PYP2PYPTRF/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			var jsonMainModel = new sap.ui.model.json.JSONModel();
			this.setModel(jsonMainModel, "mainView");
			
			var jsonModelDetailView = new sap.ui.model.json.JSONModel();
			this.setModel(jsonModelDetailView, "detailModelView");

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});