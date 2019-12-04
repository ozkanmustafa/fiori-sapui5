sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Dialog",
	"sap/ui/model/json/JSONModel",
	"ZQM_SERAMIK/ZQM_SERAMIK/util/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Dialog, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	var dialogBusy = new sap.m.BusyDialog();
	var aGizle = ["Kontrol türü", "Yaratma tarihi", "Yaratma saati", "Üretim yeri", "Kaydedilecek miktar"];

	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Controller.extend("ZQM_SERAMIK.ZQM_SERAMIK.controller.Main", {

		_oView: null,
		formatter: formatter,

		onInit: function () {
			this._oView = this.getView();
			var oModelData = this.getOwnerComponent().getModel();
			this.jsonMainModel = new JSONModel();
			this.jsonMainModel.setSizeLimit(10000);
			this._oView.setModel(this.jsonMainModel, "mainView");
			this.methodQpListTest(oModelData, this.jsonMainModel);
			this.methodFillColumnFilter(this.jsonMainModel);
		},

		methodQpListTest: function (oModelData, jsonModelView) {
			dialogBusy.open();
			oModelData.read("/EtQpListSet", {
				success: function (resp) {
					jsonModelView.setProperty("/qpList", resp.results);
					dialogBusy.close();
				},
				failed: function (resp) {
					dialogBusy.close();
				}
			});
		},

		methodFillColumnFilter: function (jsonModelView) {
			var oTable = this.getView().byId("kontrolPartisiListesi");
			var oCols = oTable.getColumns();
			var oData = [];
			for (var index in oCols) {
				var name = oCols[index].getHeader().getText();
				var data = {
					Name: name
				};
				oData.push(data);
			}

			jsonModelView.setProperty("/columns", oData);
		},

		methodInspList: function (kontrolPartiNo) {

			dialogBusy.open();

			var oModel = this.getOwnerComponent().getModel();
			var jsm = this.getView().getModel("mainView");

			var f = [];
			var filter;

			if (kontrolPartiNo) {
				filter = new Filter("IvPrueflos", sap.ui.model.FilterOperator.EQ, kontrolPartiNo);
				f.push(filter);
			}
			dialogBusy.open();

			var that = this;
			oModel.read("/EtInspListSet", {
				filters: f,
				success: function (resp) {
					jsm.setProperty("/inspList", resp.results);
					jsm.setProperty("/kontrolPartiNo", kontrolPartiNo);
					dialogBusy.close();
					that.openDialog("ZQM_SERAMIK.ZQM_SERAMIK.fragment.islemSecimi");
				},
				error: function (oResp) {
					dialogBusy.close();
				}
			});
		},

		methodInspDetail: function (islemNo) {

			dialogBusy.open();

			var oModel = this.getOwnerComponent().getModel();
			var jsm = this.getView().getModel("mainView");
			var kontrolPartiNo = jsm.getProperty("/kontrolPartiNo");

			var f = [];
			var filter;

			if (kontrolPartiNo) {
				filter = new Filter("IvPrueflos", sap.ui.model.FilterOperator.EQ, kontrolPartiNo);
				f.push(filter);
			}
			if (islemNo) {
				filter = new Filter("IvInspoper", sap.ui.model.FilterOperator.EQ, islemNo);
				f.push(filter);
			}
			dialogBusy.open();
			oModel.read("/EtInspDetailSet", {
				filters: f,
				success: function (resp) {
					jsm.setProperty("/inspDetail", resp.results);
					jsm.setProperty("/islemNo", islemNo);
					dialogBusy.close();
				},
				error: function (oResp) {
					dialogBusy.close();
				}
			});
		},

		methodMainTableSelected: function (oEvent) {
			var oItem = oEvent.getSource();
			var kontrolPartiNo = oItem.getCells()[0].getText();
			this.methodInspList(kontrolPartiNo);
		},

		methodIslemTableSelected: function (oEvent) {
			var oItem = oEvent.getSource();
			var islemNo = oItem.getCells()[0].getText();
			this.methodInspDetail(islemNo);

			this.getView().byId("iconTabBar").setSelectedKey("2");
			this.getView().byId("dialogTitle").setText("Test Seçiniz");
		},

		methodTestTableSelected: function (oEvent) {
			var jsm = this.getView().getModel("mainView");
			var oItem = oEvent.getSource();
			var karakteristikNo = oItem.getCells()[0].getText();
			var kontrolPartiNo = jsm.getProperty("/kontrolPartiNo");
			var islemNo = jsm.getProperty("/islemNo");
			this.closeDialog();

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				kontrolPartiNo: kontrolPartiNo,
				islemNo: islemNo,
				karakteristikNo: karakteristikNo
			});
		},

		onSearchKontrolPartiNo: function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Prueflos", FilterOperator.Contains, sQuery));
			}

			var oTable = this.byId("kontrolPartisiListesi");
			//listenin içeriğini alıyoruz.
			oTable.getBinding("items").filter(aFilter);
		},

		selectEventIconTab: function (oEvent) {
			var selectedTab = oEvent.getParameter("key");
			selectedTab = parseInt(selectedTab);

			switch (selectedTab) {
			case 1:
				this.getView().byId("dialogTitle").setText("İşlem Seçiniz");
				break;
			case 2:
				this.getView().byId("dialogTitle").setText("Test Seçiniz");
				break;
			}
		},

		onTableColumnFilter: function (oEvent) {
			var oTable = this.getView().byId("mainTableColumnFilter");
			var oMainTable = this.getView().byId("kontrolPartisiListesi");
			var jsm = this.getView().getModel("mainView");
			var items = [],
				index;

			jQuery.each(oTable.getSelectedContextPaths(), function (id, value) {
				index = value.substr(9);
				items.push(index);
			});

			jQuery.each(oMainTable.getColumns(), function (id, item) {
				if (items.includes(id.toString()))
					item.setVisible(false);
				else
					item.setVisible(true);
			});

			jsm.setProperty("/filterTabSelected", items);
			this.closeDialog();
		},

		onFilterButtonPressed: function (oEvent) {
			var path = "ZQM_SERAMIK.ZQM_SERAMIK.fragment.mainTableColumn";
			var oButton = oEvent.getSource();

			var jsm = this.getView().getModel("mainView").getProperty("/filterTabSelected");

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(), path, this);
				this.getView().addDependent(this._oDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			}
			this._oDialog.openBy(oButton);

			var oTable = this.getView().byId("mainTableColumnFilter");
			var tabItems = oTable.getItems();

			jQuery.each(jsm, function (id, value) {
				tabItems[value].setSelected(true);
			});
		},

		onFilterClearPressed: function (oEvent) {
			var oMainTable = this.getView().byId("kontrolPartisiListesi");
			if (this._oDialog) {
				this.closeDialog();
			}
			this.getView().getModel("mainView").setProperty("/filterTabSelected", null);
			jQuery.each(oMainTable.getColumns(), function (id, item) {
				item.setVisible(true);
			});
		},

		openDialog: function (fragmentPath) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(), fragmentPath, this);
				this.getView().addDependent(this._oDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			}
			this._oDialog.open();
		},

		onAfterRendering: function () {
			var jsm = this.getView().getModel("mainView");
			var oMainTable = this.getView().byId("kontrolPartisiListesi");
			var items = [];

			jQuery.each(oMainTable.getColumns(), function (id, item) {
				if (aGizle.includes(item.getHeader().getText())) {
					item.setVisible(false);
					items.push(id);
					jsm.setProperty("/filterTabSelected", items);
				}
			});
		},

		closeDialog: function () {
			this._oDialog.destroy();
			delete this._oDialog;
		}
	});

});