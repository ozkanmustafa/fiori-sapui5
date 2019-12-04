sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Dialog",
	"sap/ui/model/json/JSONModel",
	"ZSD_MAKINA_SEVK/ZSD_MAKINA_SEVK/util/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, Dialog, JSONModel, formatter, Filter, FilterOperator, MessageToast, MessageBox) {
	"use strict";

	var dialogBusy = new sap.m.BusyDialog();
	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Controller.extend("ZSD_MAKINA_SEVK.ZSD_MAKINA_SEVK.controller.Main", {

		_oView: null,
		formatter: formatter,

		onInit: function () {
			var that = this;
			dialogBusy.open();
			this._oView = this.getView();
			var oModelData = this.getOwnerComponent().getModel();
			this.jsonMainModel = new JSONModel();
			this.jsonMainModel.setSizeLimit(10000);
			this._oView.setModel(this.jsonMainModel, "mainView");
			this._oView.addEventDelegate({
				onAfterShow: function (oEvent) {
					that.methodClearTableSelection(that.jsonMainModel);
				}
			}, that._oView);
			this.methodGetBelgeNoShListSet(oModelData, this.jsonMainModel);
		},

		methodClearTableSelection: function (jsonModel) {
			this.getView().byId("mainTable").setMode(sap.m.ListMode.Delete);
			this.getView().byId("mainTable").setMode(sap.m.ListMode.SingleSelectLeft);
			this.getView().byId("Display_Button").setEnabled(false);
			jsonModel.setProperty("/tableSelectedVbeln", null);
		},

		methodGetBelgeNoShListSet: function (oModel, jsonModel) {
			var that = this;
			oModel.read("/EtBelgeNoShSet", {
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/belgeNoShList", resp.results);
						that.methodGetTesAlanShListSet(oModel, jsonModel);
					} else {
						MessageToast.show("Bir Hata Oluştu");
					}
				},
				error: function (resp) {
					dialogBusy.close();
				}
			});
		},

		methodGetTesAlanShListSet: function (oModel, jsonModel) {
			oModel.read("/EtTeslimAlanShSet", {
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/teslimAlanShList", resp.results);
					} else {
						MessageToast.show("Bir Hata Oluştu");
					}
				},
				error: function (resp) {
					dialogBusy.close();
				}
			});
		},

		methodGetTeslimatListSet: function () {
			var that = this;
			dialogBusy.open();
			var oModel = this.getView().getModel();
			var jsonModel = this.getView().getModel("mainView");

			var belgeNo = jsonModel.getProperty("/belgeNo");
			var malCikisTarihiLow = jsonModel.getProperty("/malCikisTarihiLow");
			var malCikisTarihiHigh = jsonModel.getProperty("/malCikisTarihiHigh");
			var teslimAlanLow = jsonModel.getProperty("/IvKunnrLow");
			var teslimAlanHigh = jsonModel.getProperty("/IvKunnrHigh");

			var f = [];
			var filter;

			if (belgeNo) {
				filter = new Filter("IvVbeln", sap.ui.model.FilterOperator.EQ, belgeNo);
				f.push(filter);
			} else {
				if (malCikisTarihiLow) {
					filter = new Filter("IvWadatBegda", sap.ui.model.FilterOperator.EQ, malCikisTarihiLow);
					f.push(filter);
				}
				if (malCikisTarihiHigh) {
					filter = new Filter("IvWadatEndda", sap.ui.model.FilterOperator.EQ, malCikisTarihiHigh);
					f.push(filter);
				}
				if (teslimAlanLow) {
					filter = new Filter("IvKunnrLow", sap.ui.model.FilterOperator.EQ, teslimAlanLow);
					f.push(filter);
				}
				if (teslimAlanHigh) {
					filter = new Filter("IvKunnrHigh", sap.ui.model.FilterOperator.EQ, teslimAlanHigh);
					f.push(filter);
				}
				if ((!malCikisTarihiLow && !malCikisTarihiHigh)) {
					dialogBusy.close();
					MessageBox.show("Gerekli Alanları Doldurun");
					return;
				}
			}

			oModel.read("/EtTeslimatListSet", {
				filters: f,
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/teslimatList", resp.results);
						that.methodClearTableSelection();
					} else {
						MessageToast.show("Bir Hata Oluştu");
					}
				},
				error: function (resp) {
					dialogBusy.close();
				}
			});
		},

		methodMainTableSelected: function (oEvent) {
			var jsonModel = this.getView().getModel("mainView");
			var oTable = this.getView().byId("mainTable");
			var items = oTable.getSelectedItems();

			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var belgeNo = item.getCells()[1].getProperty("text");
				jsonModel.setProperty("/tableSelectedVbeln", belgeNo);
			}
		},

		methodTesAlanSelected: function (oEvent) {
			var jsonModel = this.getView().getModel("mainView");
			var oItem = oEvent.getSource();
			var teslimAlan = oItem.getCells()[0].getText();
			if (jsonModel.getProperty("/buttonPress") === "low")
				jsonModel.setProperty("/IvKunnrLow", teslimAlan);
			else if (jsonModel.getProperty("/buttonPress") === "high")
				jsonModel.setProperty("/IvKunnrHigh", teslimAlan);
			this.closeDialog();
		},

		methodNavToDetail: function (oEvent) {
			var jsonModel = this.getView().getModel("mainView");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter.navTo("detail", {
				belgeNo: jsonModel.getProperty("/tableSelectedVbeln")
			});
		},

		onValueHelpRequestTesAlanLow: function (oEvent) {
			this.getView().getModel("mainView").setProperty("/buttonPress", "low");
			this.openDialog("ZSD_MAKINA_SEVK.ZSD_MAKINA_SEVK.fragment.teslimAlan");
		},

		onValueHelpRequestTesAlanHigh: function (oEvent) {
			this.getView().getModel("mainView").setProperty("/buttonPress", "high");
			this.openDialog("ZSD_MAKINA_SEVK.ZSD_MAKINA_SEVK.fragment.teslimAlan");
		},

		onValueChangeMalCikisTarihiLow: function (oEvent) {
			var datePickerLow = this.getView().byId("id_mal_cikis_low");
			var jsonModel = this.getView().getModel("mainView");
			var dateLow = oEvent.getParameter("value");
			var dateLowOld = jsonModel.getProperty("/malCikisTarihiLow");
			var dateHigh = jsonModel.getProperty("/malCikisTarihiHigh");

			if (dateHigh === undefined || dateLow <= dateHigh)
				jsonModel.setProperty("/malCikisTarihiLow", dateLow);
			else {
				if (dateLowOld !== undefined)
					datePickerLow.setDateValue(new Date(dateLowOld));
				else
					datePickerLow.setValue(null);
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.warning(
					"Girilen değer üst sınırdan büyük olamaz.", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			}
		},

		onValueChangeMalCikisTarihiHigh: function (oEvent) {
			var datePickerHigh = this.getView().byId("id_mal_cikis_high");
			var jsonModel = this.getView().getModel("mainView");
			var dateHigh = oEvent.getParameter("value");
			var dateHighOld = jsonModel.getProperty("/malCikisTarihiHigh");
			var dateLow = jsonModel.getProperty("/malCikisTarihiLow");

			if (dateLow === undefined || dateHigh >= dateLow)
				jsonModel.setProperty("/malCikisTarihiHigh", dateHigh);
			else {
				if (dateHighOld !== undefined)
					datePickerHigh.setDateValue(new Date(dateHighOld));
				else
					datePickerHigh.setValue(null);
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.warning(
					"Girilen değer alt sınırdan küçük olamaz.", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			}
		},

		onValueChangeVbeln: function (oEvent) {
			var belgeNo = oEvent.getParameter("value");
			this.getView().getModel("mainView").setProperty("/belgeNo", belgeNo);
		},

		onSuggestBelgeNo: function (oEvent) {
			var belgeNoInput = this.getView().byId("id_belgeno_sh");
			var value = oEvent.getParameter("suggestValue");
			var aFilter = [];

			if (value) {
				aFilter.push(new Filter("Vbeln", FilterOperator.Contains, value));
			}

			this.getView().getModel("mainView").setProperty("/belgeNo", value);

			belgeNoInput.getBinding("suggestionItems").filter(aFilter);
			belgeNoInput.suggest();
		},

		onSHBelgeNo: function (oEvent) {
			var belgeNo = oEvent.getParameter("query");
			this.getView().getModel("mainView").setProperty("/belgeNo", belgeNo);
		},

		onSearchBelgeNo: function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Wadat", FilterOperator.StartsWith, sQuery));
			}

			var oTable = this.byId("mainTable");
			oTable.getBinding("items").filter(aFilter);
		},

		methodCikis: function () {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.show(
				"Çıkmak İstediğinize Emin Misiniz?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					icon: MessageBox.Icon.QUESTION,
					title: "Uyarı",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.YES) {
							sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
								target: {
									shellHash: "#"
								}
							});
						} else {

						}
					}
				}
			);
		},

		openDialog: function (fragmentPath) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(), fragmentPath, this);
				this.getView().addDependent(this._oDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			}
			this._oDialog.open();
		},

		closeDialog: function () {
			this._oDialog.destroy();
			delete this._oDialog;
		}

	});
});