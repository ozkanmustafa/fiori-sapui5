sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("ZCRM_DEALERS.ZCRM_DEALERS.Base", {

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		getOdataModel: function () {
			return this.getOwnerComponent().getModel();
		},

		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		getById: function (id) {
			return this.getView().byId(id);
		},

		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				// eslint-disable-next-line sap-no-history-manipulation
				history.go(-1);
			} else {
				this.getRouter().navTo("main", {}, true);
			}
		}

	});

});