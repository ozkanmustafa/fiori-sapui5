sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Dialog",
	"sap/ui/model/json/JSONModel",
	"ZSD_MAKINA_SEVK/ZSD_MAKINA_SEVK/util/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (Controller, Dialog, JSONModel, formatter, Filter, FilterOperator, MessageToast, MessageBox, History) {
	"use strict";

	var dialogBusy = new sap.m.BusyDialog();
	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Controller.extend("ZSD_MAKINA_SEVK.ZSD_MAKINA_SEVK.controller.Barkodlar", {

		_oView: null,
		formatter: formatter,

		onInit: function () {
			dialogBusy.open();
			this._oView = this.getView();
			this.jsonMainModel = new JSONModel();
			this.jsonMainModel.setSizeLimit(10000);
			this._oView.setModel(this.jsonMainModel, "barkodlarView");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("barkodlar").attachMatched(this._onDetailMatched, this);
		},

		_onDetailMatched: function (oEvent) {
			var jsonModel = this.getView().getModel("barkodlarView");
			var posnr = oEvent.getParameter("arguments").posnr;
			var belgeNo = oEvent.getParameter("arguments").belgeNo;

			jsonModel.setProperty("/posnr", posnr);
			jsonModel.setProperty("/belgeNo", belgeNo);

			var oModel = this.getOwnerComponent().getModel();
			this.methodGetOkunanBarkodlar(oModel, jsonModel, belgeNo, posnr);
		},

		methodGetOkunanBarkodlar: function (oModel, jsonModel, belgeNo, posnr) {
			var f = [];
			var filter;

			if (belgeNo) {
				filter = new Filter("IvVbeln", sap.ui.model.FilterOperator.EQ, belgeNo);
				f.push(filter);
			}
			if (posnr) {
				filter = new Filter("IvPosnr", sap.ui.model.FilterOperator.EQ, posnr);
				f.push(filter);
			}

			oModel.read("/EtOkunanBarkodlarSet", {
				filters: f,
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/okunanBarkodlarList", resp.results);
					} else {
						MessageToast.show("Bir Hata Oluştu");
					}
				},
				error: function (resp) {
					dialogBusy.close();
				}
			});
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var belgeNo = this.getView().getModel("barkodlarView").getProperty("/belgeNo");

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("detail/{" + belgeNo + "}", true);
			}
		}
	});

});