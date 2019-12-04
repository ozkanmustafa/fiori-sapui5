sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
	"sap/m/BusyDialog",
	"sap/m/Button",
	"sap/m/Text",
	"sap/m/Dialog",
	"sap/m/List",
	"sap/m/StandardListItem",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel",
	"ZMM_PYP2PYPTRF/ZMM_PYP2PYPTRF/util/formatter"
], function (Controller, UIComponent, MessageToast, BusyDialog, Button, Text, Dialog, List, StandardListItem, BusyIndicator,
	MessageBox, Filter, JSONModel, formatter) {
	"use strict";

	var pyptrf;
	var seriNoVar;

	var dialogBusy = new sap.m.BusyDialog();
	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Controller.extend("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.controller.Main", {
		oGlobalBusyInd: null,
		oGlobalBusyDialog: null,
		_viewMainModel: null,
		_oView: null,
		formatter: formatter,
		onInit: function () {
			this._oView = this.getView();
			var jsonMainModel = new sap.ui.model.json.JSONModel();
			this._oView.setModel(jsonMainModel, "mainView");
			this.oGlobalBusyDialog = new BusyDialog(); //Ekranda beklemeyi çıkartıp kilitleyen
			this.oGlobalBusyInd = BusyIndicator;
			this.SernrVisible();
		},

		SernrVisible: function () {
			var oMainModel = this.getView().getModel("mainView");
			if (seriNoVar === "X") {
				oMainModel.setProperty("/seriNoSecVis", true);
			} else {
				oMainModel.setProperty("/seriNoSecVis", false);
			}
		},

		// Malzemem Arama  Yardımı
		onValueHelpRequestMatnr: function (oEvent) {

			pyptrf = oEvent.getSource();
			this._oDialog = sap.ui.xmlfragment("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.fragment.malzeme_arama", this);

			this.getView().addDependent(this._oDialog);

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},

		handleSearchMatnr: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Matnr", sap.ui.model.FilterOperator.Contains, sValue.toLocaleUpperCase());
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleCloseMatnr: function (oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {

				var oViewModelMatnr = this.byId('malzemeId').getModel("mainView");
				var matnr = aContexts[0].getObject().Matnr;

				oViewModelMatnr.setProperty("/malzemeVal", matnr);

				pyptrf.setValue(matnr);

				//Malzemenin seri numaralı olup olmadığını kontrol edeceğiz.
				//Malzemenin üretim yeri varsa bu kontrolü gerçekleştireceğiz.
				var werks = this.byId("werksId").getValue();
				var charg = this.byId("partiId").getValue();
				var kyn_lgort = this.byId("kyn_lgortId").getValue();
				var kyn_pyp = this.byId("kyn_pypId").getValue();
				if (werks !== "") {
					this.checkSeriNo(werks, matnr, charg, kyn_lgort, kyn_pyp);
				}
			}

			oEvent.getSource().getBinding("items").filter([]);
		},

		// Üretim Yeri Arama  Yardımı
		onValueHelpRequestWerks: function (oEvent) {

			pyptrf = oEvent.getSource();

			var jsonModelView = this.getOwnerComponent().getModel("detailModelView"); //View lar arası kullanmak için modelleme
			var oModelData = this.getOwnerComponent().getModel(); //Sap den serviste dönen verilerin modeli	

			var oMainModel = this.getView().getModel("mainView");
			var matnr = oMainModel.getProperty("/malzemeVal");
			var filterMatnr = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, matnr);
			var filters = new Array();
			if (matnr) {
				filters.push(filterMatnr);
			}
			dialogBusy.open();
			oModelData.read("/ZmmP2ptfShWerksSet", {
				filters: filters,
				success: function (resp) {
					jsonModelView.setProperty("/WerksSet", resp.results);
					dialogBusy.close();
				},
				failed: function (resp) {
					dialogBusy.close();
				}
			});

			this._oDialog = sap.ui.xmlfragment("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.fragment.werks_arama", this);

			this.getView().addDependent(this._oDialog);

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);

			this._oDialog.open();

		},

		handleSearchWerks: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Werks", sap.ui.model.FilterOperator.Contains, sValue.toLocaleUpperCase());
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleCloseWerks: function (oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {

				var oViewModelWerks = this.byId('werksId').getModel("mainView");
				var werks = aContexts[0].getObject().Werks;

				oViewModelWerks.setProperty("/werksVal", werks);

				pyptrf.setValue(werks);

				//Malzemenin seri numaralı olup olmadığını kontrol edeceğiz.
				//Malzemenin seçilmişse bu kontrolü gerçekleştireceğiz.
				var matnr = this.byId("malzemeId").getValue();
				var charg = this.byId("partiId").getValue();
				var kyn_lgort = this.byId("kyn_lgortId").getValue();
				var kyn_pyp = this.byId("kyn_pypId").getValue();
				if (matnr !== "") {
					this.checkSeriNo(werks, matnr, charg, kyn_lgort, kyn_pyp);
				}

			}

			oEvent.getSource().getBinding("items").filter([]);
		},

		//Kaynak Depo Yeri Arama  Yardımı
		onValueHelpRequestKynLgort: function (oEvent) {

			pyptrf = oEvent.getSource();

			var jsonModelView = this.getOwnerComponent().getModel("detailModelView"); //View lar arası kullanmak için modelleme
			var oModelData = this.getOwnerComponent().getModel(); //Sap den serviste dönen verilerin modeli	

			var oMainModel = this.getView().getModel("mainView");
			var filters = new Array();
			var werks = oMainModel.getProperty("/werksVal");
			var filterWerks = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, werks);
			if (werks) {
				filters.push(filterWerks);
			}

			var matnr = oMainModel.getProperty("/malzemeVal");
			var filterMatnr = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, matnr);
			if (matnr) {
				filters.push(filterMatnr);
			}

			dialogBusy.open();
			oModelData.read("/ZmmP2ptfShKynLgortSet", {
				filters: filters,
				success: function (resp) {
					jsonModelView.setProperty("/KynLgortSet", resp.results);
					dialogBusy.close();
				},
				failed: function (resp) {
					dialogBusy.close();
				}
			});

			this._oDialog = sap.ui.xmlfragment("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.fragment.kyn_lgort_arama", this);

			this.getView().addDependent(this._oDialog);

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);

			this._oDialog.open();

		},

		handleSearchKynLgort: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Lgort", sap.ui.model.FilterOperator.Contains, sValue.toLocaleUpperCase());
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleCloseKynLgort: function (oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {

				var oViewModelLgort = this.byId('kyn_lgortId').getModel("mainView");
				var lgort = aContexts[0].getObject().Lgort;

				oViewModelLgort.setProperty("/kyn_lgortVal", lgort);

				pyptrf.setValue(lgort);

				//Malzemenin seri numaralı olup olmadığını kontrol edeceğiz.
				//Malzemenin seçilmişse bu kontrolü gerçekleştireceğiz.
				var matnr = this.byId("malzemeId").getValue();
				var werks = this.byId("werksId").getValue();
				var charg = this.byId("partiId").getValue();
				var kyn_pyp = this.byId("kyn_pypId").getValue();
				if (lgort !== "") {
					this.checkSeriNo(werks, matnr, charg, lgort, kyn_pyp);
				}

			}

			oEvent.getSource().getBinding("items").filter([]);
		},

		//Hedef Depo Yeri Arama  Yardımı
		onValueHelpRequestHdfLgort: function (oEvent) {

			pyptrf = oEvent.getSource();

			var jsonModelView = this.getOwnerComponent().getModel("detailModelView"); //View lar arası kullanmak için modelleme
			var oModelData = this.getOwnerComponent().getModel(); //Sap den serviste dönen verilerin modeli	

			var oMainModel = this.getView().getModel("mainView");
			var werks = oMainModel.getProperty("/werksVal");
			var filterWerks = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, werks);
			var filters = new Array();
			if (werks) {
				filters.push(filterWerks);
			}
			dialogBusy.open();
			oModelData.read("/ZmmP2ptfShLgortSet", {
				filters: filters,
				success: function (resp) {
					jsonModelView.setProperty("/LgortSet", resp.results);
					dialogBusy.close();
				},
				failed: function (resp) {
					dialogBusy.close();
				}
			});

			this._oDialog = sap.ui.xmlfragment("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.fragment.hdf_lgort_arama", this);

			this.getView().addDependent(this._oDialog);

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);

			this._oDialog.open();

		},

		handleSearchHdfLgort: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Lgort", sap.ui.model.FilterOperator.Contains, sValue.toLocaleUpperCase());
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleCloseHdfLgort: function (oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {

				var oViewModelLgort = this.byId('hdf_lgortId').getModel("mainView");
				var lgort = aContexts[0].getObject().Lgort;

				oViewModelLgort.setProperty("/hdf_lgortVal", lgort);

				pyptrf.setValue(lgort);

			}

			oEvent.getSource().getBinding("items").filter([]);
		},

		//Parti Arama Yardımı
		onValueHelpRequestParti: function (oEvent) {

			pyptrf = oEvent.getSource();

			var jsonModelView = this.getOwnerComponent().getModel("detailModelView"); //View lar arası kullanmak için modelleme
			var oModelData = this.getOwnerComponent().getModel(); //Sap den serviste dönen verilerin modeli	

			var oMainModel = this.getView().getModel("mainView");
			var matnr = oMainModel.getProperty("/malzemeVal");
			var werks = oMainModel.getProperty("/werksVal");
			var lgort = oMainModel.getProperty("/kyn_lgortVal");
			var filterMatnr = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, matnr);
			var filterWerks = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, werks);
			var filterLgort = new sap.ui.model.Filter("Lgort", sap.ui.model.FilterOperator.EQ, lgort);
			var filters = new Array();
			if (matnr) {
				filters.push(filterMatnr);
			}
			if (werks) {
				filters.push(filterWerks);
			}
			if (lgort) {
				filters.push(filterLgort);
			}

			dialogBusy.open();
			oModelData.read("/ZmmP2ptfShChargSet", {
				filters: filters,
				success: function (resp) {
					jsonModelView.setProperty("/ChargSet", resp.results);
					dialogBusy.close();
				},
				failed: function (resp) {
					dialogBusy.close();
				}
			});

			this._oDialog = sap.ui.xmlfragment("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.fragment.parti_arama", this);

			this.getView().addDependent(this._oDialog);

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);

			this._oDialog.open();

		},

		handleSearchParti: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Charg", sap.ui.model.FilterOperator.Contains, sValue.toLocaleUpperCase());
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleCloseParti: function (oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {

				var oViewModelCharg = this.byId('partiId').getModel("mainView");
				var charg = aContexts[0].getObject().Charg;

				oViewModelCharg.setProperty("/partiVal", charg);

				pyptrf.setValue(charg);

				//Malzemenin seri numaralı olup olmadığını kontrol edeceğiz.
				//Malzemenin seçilmişse bu kontrolü gerçekleştireceğiz.
				var matnr = this.byId("malzemeId").getValue();
				var werks = this.byId("werksId").getValue();
				var kyn_lgort = this.byId("kyn_lgortId").getValue();
				var kyn_pyp = this.byId("kyn_pypId").getValue();
				if (charg !== "") {
					this.checkSeriNo(werks, matnr, charg, kyn_lgort, kyn_pyp);
				}

			}

			oEvent.getSource().getBinding("items").filter([]);
		},

		//Kaynak PYP Arama Yardımı
		onValueHelpRequestKynPyp: function (oEvent) {

			pyptrf = oEvent.getSource();

			var jsonModelView = this.getOwnerComponent().getModel("detailModelView"); //View lar arası kullanmak için modelleme
			var oModelData = this.getOwnerComponent().getModel(); //Sap den serviste dönen verilerin modeli	

			var oMainModel = this.getView().getModel("mainView");
			var filters = new Array();

			var werks = oMainModel.getProperty("/werksVal");
			var matnr = oMainModel.getProperty("/malzemeVal");
			var lgort = oMainModel.getProperty("/kyn_lgortVal");
			var charg = oMainModel.getProperty("/partiVal");
			var filterWerks = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, werks);
			if (werks) {
				filters.push(filterWerks);
			}

			var filterMatnr = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, matnr);
			if (matnr) {
				filters.push(filterMatnr);
			}

			var filterLgort = new sap.ui.model.Filter("Lgort", sap.ui.model.FilterOperator.EQ, lgort);
			if (lgort) {
				filters.push(filterLgort);
			}

			var filterCharg = new sap.ui.model.Filter("Charg", sap.ui.model.FilterOperator.EQ, charg);
			if (charg) {
				filters.push(filterCharg);
			}

			dialogBusy.open();
			oModelData.read("/ZmmP2ptfShPspnrSet", {
				filters: filters,
				success: function (resp) {
					jsonModelView.setProperty("/PspnrSet", resp.results);
					dialogBusy.close();
				},
				failed: function (resp) {
					dialogBusy.close();
				}
			});

			this._oDialog = sap.ui.xmlfragment("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.fragment.kyn_pyp_arama", this);

			this.getView().addDependent(this._oDialog);

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);

			this._oDialog.open();

		},

		handleSearchKynPyp: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Posid", sap.ui.model.FilterOperator.Contains, sValue.toLocaleUpperCase());
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleCloseKynPyp: function (oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {

				var oViewModelKynPyp = this.byId('kyn_pypId').getModel("mainView");
				var kynPyp = aContexts[0].getObject().Posid;

				oViewModelKynPyp.setProperty("/kyn_pypVal", kynPyp);

				pyptrf.setValue(kynPyp);

				//Malzemenin seri numaralı olup olmadığını kontrol edeceğiz.
				//Malzemenin seçilmişse bu kontrolü gerçekleştireceğiz.
				var matnr = this.byId("malzemeId").getValue();
				var werks = this.byId("werksId").getValue();
				var charg = this.byId("partiId").getValue();
				var lgort = this.byId("kyn_lgortId").getValue();
				if (kynPyp !== "") {
					this.checkSeriNo(werks, matnr, charg, lgort, kynPyp);
				}

			}

			oEvent.getSource().getBinding("items").filter([]);
		},

		//Hedef PYP Arama Yardımı
		onValueHelpRequestHdfPyp: function (oEvent) {

			pyptrf = oEvent.getSource();

			var jsonModelView = this.getOwnerComponent().getModel("detailModelView"); //View lar arası kullanmak için modelleme
			var oModelData = this.getOwnerComponent().getModel(); //Sap den serviste dönen verilerin modeli	

			var oMainModel = this.getView().getModel("mainView");
			var filters = new Array();

			var werks = oMainModel.getProperty("/werksVal");
			var filterWerks = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, werks);
			if (werks) {
				filters.push(filterWerks);
			}

			dialogBusy.open();
			oModelData.read("/ZmmP2ptfShHdfPspnrSet", {
				filters: filters,
				success: function (resp) {
					jsonModelView.setProperty("/HdfPspnrSet", resp.results);
					dialogBusy.close();
				},
				failed: function (resp) {
					dialogBusy.close();
				}
			});

			this._oDialog = sap.ui.xmlfragment("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.fragment.hdf_pyp_arama", this);

			this.getView().addDependent(this._oDialog);

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);

			this._oDialog.open();

		},

		handleSearchHdfPyp: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Posid", sap.ui.model.FilterOperator.Contains, sValue.toLocaleUpperCase());
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleCloseHdfPyp: function (oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {

				var oViewModelKynPyp = this.byId('hdf_pypId').getModel("mainView");
				var kynPyp = aContexts[0].getObject().Posid;

				oViewModelKynPyp.setProperty("/hdf_pypVal", kynPyp);

				pyptrf.setValue(kynPyp);

			}

			oEvent.getSource().getBinding("items").filter([]);
		},

		checkSeriNo: function (werks, matnr, charg, lgort, pyp) {
			var that = this;
			this.viewMainModel = this._oView.getModel("mainView");
			that.viewModel = this.viewMainModel;

			var oModel = this.getOwnerComponent().getModel();

			var matnr = this.byId("malzemeId").getValue();
			var werks = this.byId("werksId").getValue();
			var charg = this.byId("partiId").getValue();
			var lgort = this.byId("kyn_lgortId").getValue();
			var pyp = this.byId("kyn_pypId").getValue();

			var filters = new Array();
			var filterMatnr = new sap.ui.model.Filter("IMatnr", sap.ui.model.FilterOperator.EQ, matnr);
			if (matnr) {
				filters.push(filterMatnr);
			}

			var filterWerks = new sap.ui.model.Filter("IWerks", sap.ui.model.FilterOperator.EQ, werks);
			if (werks) {
				filters.push(filterWerks);
			}

			var filterCharg = new sap.ui.model.Filter("ICharg", sap.ui.model.FilterOperator.EQ, charg);
			if (charg) {
				filters.push(filterCharg);
			}

			var filterLgort = new sap.ui.model.Filter("IKynLgort", sap.ui.model.FilterOperator.EQ, lgort);
			if (lgort) {
				filters.push(filterLgort);
			}

			var filterPyp = new sap.ui.model.Filter("IKynPyp", sap.ui.model.FilterOperator.EQ, pyp);
			if (pyp) {
				filters.push(filterPyp);
			}

			var arry = new Array();
			//oModel.read içerisinde ki filtersı kaldırırsak bize bütün veriyi döner
			oModel.read("/P2ptfCheckSerinoSet", {
				filters: filters,
				success: function (oData) {
					if (oData !== undefined) {
						if (oData.results.length !== 0) {
							seriNoVar = oData.results[0].EVar;
							// seriNoVar = 'X';
							if (seriNoVar == "X") {
								arry = [];
								that.viewModel.setProperty("/SerialNumber", arry);
								that.viewModel.setProperty("/SerialNumber", oData.results);
								that.SernrVisible();
							} else {
								return;
							}
						} else {
							arry = [];
							that.viewModel.setProperty("/SerialNumber", arry);
							MessageBox.error("Onayda bekleyen kayıt var, seri numaraları kullanılamaz", {});
							return;
						}
					}
					//bekletmeyi hide ediyoruz.
				},
				failed: function (oError) {
					//console.log(oError);
				}
			});

			// var sPath = "P2ptfCheckSerinoSet(IMatnr='" + matnr + "',IWerks='" + werks + "')";
			// var sPath2 = "/" + encodeURIComponent(sPath);
			// var oModel = this.getOwnerComponent().getModel();
			// oModel.read(sPath2, {
			// 	success: function (oData) {
			// 		if (oData !== undefined) {
			// 			seriNoVar = oData.Evar;
			// 		}
			// 	},
			// 	failed: function (oError) {
			// 		//console.log(oError);
			// 	}
			// });
		},

		//Seri numarası combobox
		handleSelectionChangeSerial: function (oEvent) {
			var changedItem = oEvent.getParameter("changedItem");
			var isSelected = oEvent.getParameter("selected");

			var state = "Selected";
			if (!isSelected) {
				state = "Deselected";
			}

			// MessageToast.show("Event 'selectionChange': " + state + " '" + changedItem.getText() + "'", {
			// 	width: "auto"
			// });
		},

		handleSelectionFinish: function (oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			var messageText = "Event 'selectionFinished': [";

			for (var i = 0; i < selectedItems.length; i++) {
				messageText += "'" + selectedItems[i].getText() + "'";
				if (i != selectedItems.length - 1) {
					messageText += ",";
				}
			}

			messageText += "]";

			// MessageToast.show(messageText, {
			// 	width: "auto"
			// });
		},

		OnayaGonder: function () {
			dialogBusy.open();
			var oMainModel = this.getView().getModel("mainView");
			var oModel = this.getOwnerComponent().getModel();

			var oInput = {};

			//Kontroller
			var matnr = oMainModel.getProperty("/malzemeVal");
			if (matnr === undefined) {
				var message = "Malzeme Numarasını Boş Geçemezsiniz";
				MessageBox.error(message, {});
				dialogBusy.close();
				return;
			}

			var werks = oMainModel.getProperty("/werksVal");
			if (werks === undefined) {
				message = "Üretim Yerini Boş Geçemezsiniz";
				MessageBox.error(message, {});
				dialogBusy.close();
				return;
			}

			var kyn_lgort = oMainModel.getProperty("/kyn_lgortVal");
			if (kyn_lgort === undefined) {
				message = "Kaynak Depo Yerini Boş Geçemezsiniz";
				MessageBox.error(message, {});
				dialogBusy.close();
				return;
			}

			var hdf_lgort = oMainModel.getProperty("/hdf_lgortVal");
			if (hdf_lgort === undefined) {
				message = "Hedef Depo Yerini Boş Geçemezsiniz";
				MessageBox.error(message, {});
				dialogBusy.close();
				return;
			}

			var kyn_pyp = oMainModel.getProperty("/kyn_pypVal");
			if (kyn_pyp === undefined) {
				message = "Kaynak Pyp yi Boş Geçemezsiniz";
				MessageBox.error(message, {});
				dialogBusy.close();
				return;
			}

			var hdf_pyp = oMainModel.getProperty("/hdf_pypVal");
			if (hdf_pyp === undefined) {
				message = "Hedef Pyp yi Boş Geçemezsiniz";
				MessageBox.error(message, {});
				dialogBusy.close();
				return;
			}

			//Seri Numaralı malzeme ise kontrol miktarı kontrol edelim.
			if (seriNoVar === "X") {
				var menge = this.byId("miktarId").getValue();

				var oView = this.getView();
				var oTable = oView.byId("sernrId");
				var oItems = oTable.getSelectedItems();
				var a = 0;
				//Seçili olan satırların adedi ile miktar karşılaştıracağız
				for (var oItem in oItems) {
					a = a + 1;
				}
				if (a !== menge) {
					message = "Seri Numarası sayısı ile miktar farklı olamaz";
					MessageBox.error(message, {});
					dialogBusy.close();
					return;
				}else if(a == 0){
					message = "Seri Numaralı malzemeyi seri numarası olmadan kaydedemezsiniz";
					MessageBox.error(message, {});
					dialogBusy.close();
					return;
				}
			}

			//Veriyi Gönderelim
			var date = oMainModel.getProperty("/belgeTrhVal");
			oInput.IBldat = this.formatter.convertDate(date);
			oInput.IHdfLgort = oMainModel.getProperty("/hdf_lgortVal");
			oInput.IHdfPyp = oMainModel.getProperty("/hdf_pypVal");
			oInput.IKynLgort = oMainModel.getProperty("/kyn_lgortVal");
			oInput.IKynPyp = oMainModel.getProperty("/kyn_pypVal");
			oInput.IMatnr = oMainModel.getProperty("/malzemeVal");
			oInput.ICharg = oMainModel.getProperty("/partiVal");
			menge = this.byId("miktarId").getValue();
			var menge2 = new sap.ui.model.odata.type.Decimal().parseValue(menge, "float");
			//oInput.IMenge = this.byId("miktarId").getValue();
			oInput.IMenge = menge2;
			oInput.IWerks = oMainModel.getProperty("/werksVal");
			var that = this;
			oModel.create("/P2PTF_SETSet", oInput, {
				async: false,
				success: function (oData, response) {
					//Eğer kayıt başarılı ise seri numaralarını atacağız.
					if (seriNoVar === "X" & oData.EHata !== "X") {
						that.SernrSet(oData.EP2ptfId);
					} else if (oData.EHata !== "X") {
						MessageToast.show(oData.EMessage, {
							duration: 45000,
							onClose: null
						});
					} else {
						MessageBox.error(oData.EMessage, {});
					}

					dialogBusy.close();
				},
				error: function (oError) {
					dialogBusy.close();
					var error = JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(error, {
						duration: 3000,
						onClose: null
					});
				}
			});
		},

		SernrSet: function (EP2ptfId) {

			var oModel = this.getOwnerComponent().getModel();
			var oView = this.getView();
			var h = {
				"P2PTF_ID": EP2ptfId
			};

			var oTable = oView.byId("sernrId");
			var oItems = oTable.getSelectedItems();

			h.HeaderSernrItemNav = [];
			for (var oItem in oItems) {
				var inputData = {
					"P2PTF_ID": EP2ptfId,
					"SERNR": oItems[oItem].getProperty("key")
				};
				h.HeaderSernrItemNav.push(inputData);
			}

			oModel.create("/HeaderSernrSet", h, {
				//async: false,
				success: function (oResp) {

					sap.m.MessageToast.show("Talep Gönderildi", {
						duration: 3000,
						onClose: null
					});
					//	that.oDataModel.refresh(true);
					/*	if (oResp.EHata === "X") {
							sap.m.MessageToast.show(oResp.EHatam);
						} else {
							sap.m.MessageToast.show(oResp.EHatam);
						}
						t.dialog.close();*/
				},
				error: function (oResp) {
					var msg = JSON.parse(oResp.responseText).error.message.value;
					var dialog = new sap.m.Dialog({
						title: 'Hata',
						type: 'Message',
						state: 'Error',
						content: new sap.m.Text({
							text: msg
						}),
						beginButton: new sap.m.Button({
							text: 'Tamam',
							press: function () {
								dialog.close();
							}
						}),
						afterClose: function () {
							dialog.destroy();
						}
					});
					dialog.open();
					/*	t.dialog.close();*/

				}
			});
		}
	});
});