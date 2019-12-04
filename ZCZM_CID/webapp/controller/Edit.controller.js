sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"ZCZM_CID/ZCZM_CID/util/formatter",
	"sap/m/MessageToast"
], function (Base, Controller, JSONModel, formatter, MessageToast) {
	"use strict";

	var dialogBusy = new sap.m.BusyDialog();
	var oModel, jsonModel;
	var customerNo, customerName;

	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Base.extend("ZCZM_CID.ZCZM_CID.controller.Edit", {
		formatter: formatter,

		onInit: function () {

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Edit").attachMatched(this._onDetailMatched, this);
		},

		_onDetailMatched: function (oEvent) {
			var jsm = this.getModel("editView");
			customerNo = oEvent.getParameter("arguments").customerNo;

			if (customerNo !== "-1")
				this.getCustomer();
		},

		getCustomer: function () {
			oModel.read("/EtGetCustomersSet(IvCustno='" + customerNo + "')", {
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/customer", resp.results);
					} else {
						MessageToast.show("Müşteri Bilgileri Yüklenemedi!");
					}
				},
				error: function (resp) {
					dialogBusy.close();
				}
			});
		}

	});

});