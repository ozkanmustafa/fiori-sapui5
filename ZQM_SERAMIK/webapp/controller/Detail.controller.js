sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"ZQM_SERAMIK/ZQM_SERAMIK/util/formatter",
	"sap/m/Dialog",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function (Controller, formatter, Dialog, JSONModel, Filter, FilterOperator, History, MessageToast) {
	"use strict";

	var checkChanged = [];
	var dialogBusy = new sap.m.BusyDialog();
	var aGizle = ["Karakteristik no", "Ana kontrol karakteristiği", "Versiyon", "Karakteristik tipi"];

	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Controller.extend("ZQM_SERAMIK.ZQM_SERAMIK.controller.Detail", {

		_oView: null,
		formatter: formatter,

		onInit: function () {
			this._oView = this.getView();
			this.jsonDetailModel = new JSONModel();
			this.jsonDetailModel.setSizeLimit(10000);

			this._oView.setModel(this.jsonDetailModel, "detailView");

			var oModelData = this.getOwnerComponent().getModel();
			this.getView().setModel(oModelData);

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("detail").attachMatched(this._onDetailMatched, this);
			this.methodFillColumnFilter(this.jsonDetailModel);

		},

		_onDetailMatched: function (oEvent) {
			var jsm = this.getView().getModel("detailView");
			var kontrolPartiNo = oEvent.getParameter("arguments").kontrolPartiNo;
			var islemNo = oEvent.getParameter("arguments").islemNo;
			var karakteristikNo = oEvent.getParameter("arguments").karakteristikNo;

			jsm.setProperty("/kontrolPartiNo", kontrolPartiNo);
			jsm.setProperty("/islemNo", islemNo);
			jsm.setProperty("/karakteristikNo", karakteristikNo);

			var oModelData = this.getOwnerComponent().getModel();
			this.methodInspInput(oModelData);
		},

		methodInspInput: function (oModelData) {
			var jsm = this.getView().getModel("detailView");
			var kontrolPartiNo = jsm.getProperty("/kontrolPartiNo");
			var islemNo = jsm.getProperty("/islemNo");
			var karakteristikNo = jsm.getProperty("/karakteristikNo");
			var oTable = this.getView().byId("detayTable");

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
			if (karakteristikNo) {
				filter = new Filter("IvInspchar", sap.ui.model.FilterOperator.EQ, karakteristikNo);
				f.push(filter);
			}

			dialogBusy.open();
			oModelData.read("/EtInspInputSet", {
				filters: f,
				urlParameters: {
					"$expand": "ValuesSet"
				},
				success: function (resp) {
					checkChanged = [];
					jsm.setProperty("/inspInput", resp.results);
					oTable.getModel().refresh(true);
					resp.results.forEach(function (x, id) {
						if (x.CharType === "01")
							if (x.Result !== "")
								oTable.getItems()[id].getCells()[6].getItems()[0].setValue(parseFloat(x.Result));
							else
								oTable.getItems()[id].getCells()[6].getItems()[0].setValue(parseFloat(0));
						else
							oTable.getItems()[id].getCells()[6].getItems()[1].setValue(x.Result);
						if (x.Evaluated === 'X') {
							oTable.getItems()[id].getCells()[7].setEnabled(false);
							oTable.getItems()[id].getCells()[6].getItems()[0].setEnabled(false);
							oTable.getItems()[id].getCells()[6].getItems()[1].setEnabled(false);
						} else {
							oTable.getItems()[id].getCells()[7].setEnabled(true);
						}
						if (x.Closed === 'X') {
							oTable.getItems()[id].getCells()[8].setEnabled(false);
							oTable.getItems()[id].getCells()[6].getItems()[0].setEnabled(false);
							oTable.getItems()[id].getCells()[6].getItems()[1].setEnabled(false);
						} else {
							oTable.getItems()[id].getCells()[8].setEnabled(true);
						}
						if (x.Closed !== 'X' && x.Evaluated !== 'X') {
							oTable.getItems()[id].getCells()[7].setEnabled(true);
							oTable.getItems()[id].getCells()[8].setEnabled(true);
							oTable.getItems()[id].getCells()[6].getItems()[0].setEnabled(true);
							oTable.getItems()[id].getCells()[6].getItems()[1].setEnabled(true);
						}

						var data = {
							Result: x.Result,
							Evaluated: x.Evaluated,
							Closed: x.Closed,
							CharType: x.CharType
						};
						checkChanged.push(data);
					});

					try {
						jsm.setProperty("/valuesSet", resp.results[0].ValuesSet.results);
						dialogBusy.close();
					} catch (err) {
						dialogBusy.close();
					}
				},
				error: function (resp) {
					dialogBusy.close();
				}
			});
		},

		methodFillColumnFilter: function (jsonModelView) {
			var oTable = this.getView().byId("detayTable");
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

		saveChanges: function (eEvent) {
			var oModel = this.getView().getModel();
			var oTable = this.getView().byId("detayTable");
			var jsm = this.getView().getModel("detailView");
			var jsmInspInputValues = jsm.getProperty("/valuesSet");
			var jsmInspInput = this.getView().getModel("detailView").getProperty("/inspInput");

			var IvPrueflos = jsm.getProperty("/kontrolPartiNo");
			var IvInspoper = jsm.getProperty("/islemNo");
			var IvInspchar = jsm.getProperty("/karakteristikNo");

			var h = {
				"Sernr2": "1",
				"IvPrueflos": IvPrueflos,
				"IvInspoper": IvInspoper,
				"IvInspchar": IvInspchar
			};
			h.EtInspInputSaveSet = [];
			h.EtInspInputReturnSaveSet = [];

			for (var dataIndex in jsmInspInput) {
				var returnData = {
					"Sernr2": "1",
					"Sernr": "",
					"Message": ""
				};

				var data = jsmInspInput[dataIndex];

				debugger;
				if (data.Result !== checkChanged[dataIndex].Result || data.Evaluated !== checkChanged[dataIndex].Evaluated || data.Closed !==
					checkChanged[dataIndex].Closed) {
					if ((data.Result !== "" && data.CharType === "02") || (parseInt(data.Result) !== 0 && data.CharType === "01")) {
						delete data["ValuesSet"];
						delete data["__metadata"];
						data.EtInspInputSaveToValuesSet = [];
						for (var dataIndex2 in jsmInspInputValues) {
							var data2 = jsmInspInputValues[dataIndex2];
							data2.Sernr2 = "1";
							delete data2["__metadata"];
							data.EtInspInputSaveToValuesSet.push(data2);
						}
						h.EtInspInputSaveSet.push(data);
						h.EtInspInputReturnSaveSet.push(returnData);
					}
				}
			}
			if (h.EtInspInputSaveSet.length !== 0) {
				dialogBusy.open();
				var that = this;
				oModel.create("/EtInspInputHeadSaveSet", h, {
					async: true,
					success: function (resp) {
						dialogBusy.close();
						jQuery.each(resp.EtInspInputReturnSaveSet.results, function (id, item) {
							if (item.Message !== "OK") {
								jQuery.each(oTable.getItems(), function (id2, item2) {
									if ((parseInt(item.Sernr) === parseInt(item2.getCells()[0].getText())) || (item.Sernr === (item2.getCells()[0].getText()))) {
										jsmInspInput[id2].Result = checkChanged[id2].Result;
										jsmInspInput[id2].Evaluated = checkChanged[id2].Evaluated;
										if (checkChanged[id2].Evaluated === 'X' || checkChanged[id2].Closed === 'X') {
											item2.getCells()[6].getItems()[0].setEnabled(false);
											item2.getCells()[6].getItems()[1].setEnabled(false);
										} else {
											item2.getCells()[6].getItems()[0].setEnabled(true);
											item2.getCells()[6].getItems()[1].setEnabled(true);
										}
										if (checkChanged[id2].Evaluated === 'X') {
											item2.getCells()[7].setSelected(true);
											item2.getCells()[7].setEnabled(false);
										} else {
											item2.getCells()[7].setSelected(false);
											item2.getCells()[7].setEnabled(true);
										}
										jsmInspInput[id2].Closed = checkChanged[id2].Closed;
										if (checkChanged[id2].Closed === 'X') {
											item2.getCells()[8].setSelected(true);
											item2.getCells()[8].setEnabled(false);
											item2.getCells()[7].setSelected(true);
											item2.getCells()[7].setEnabled(false);
										} else {
											item2.getCells()[8].setSelected(false);
											item2.getCells()[8].setEnabled(true);
										}
									}
								});
							} else {
								jQuery.each(oTable.getItems(), function (id2, item2) {
									if ((parseInt(item.Sernr) === parseInt(item2.getCells()[0].getText())) || (item.Sernr === (item2.getCells()[0].getText()))) {
										checkChanged[id2].Result = jsmInspInput[id2].Result;
										checkChanged[id2].Evaluated = jsmInspInput[id2].Evaluated;
										checkChanged[id2].Closed = jsmInspInput[id2].Closed;
										checkChanged[id2].CharType = jsmInspInput[id2].CharType;
										if (jsmInspInput[id2].Evaluated === 'X') {
											item2.getCells()[7].setEnabled(false);
											item2.getCells()[6].getItems()[0].setEnabled(false);
											item2.getCells()[6].getItems()[1].setEnabled(false);
										} else
											item2.getCells()[7].setEnabled(true);
										if (jsmInspInput[id2].Closed === 'X') {
											item2.getCells()[8].setEnabled(false);
											item2.getCells()[7].setEnabled(false);
											item2.getCells()[6].getItems()[0].setEnabled(false);
											item2.getCells()[6].getItems()[1].setEnabled(false);
										} else
											item2.getCells()[8].setEnabled(true);
									}
								});
							}
						});
						jsm.setProperty("/inspInputReturn", resp.EtInspInputReturnSaveSet.results);
						that.openDialog("ZQM_SERAMIK.ZQM_SERAMIK.fragment.islemSonucMesajlari");
						that.getView().byId("detayTable").getModel().refresh();
					},
					error: function (resp) {
						dialogBusy.close();
					}
				});
			} else {
				MessageToast.show("Hiçbir satırda değişiklik yapılmadı.");
			}
		},

		onValueHelpRequestSonuc: function (oEvent) {
			//Üzerine tıklanan elementin index bilgisi oEventin altında id içerisindeki textte yer almakta
			//Split ile bir arraya atıyoruz.
			//Index array in son indisinde tutuluyor. Bu yüzden son indisi okuyoruz.
			var res = oEvent.getParameter("id").split("-");
			var index = res[res.length - 1];
			var jsm = this.getView().getModel("detailView");
			jsm.setProperty("/selectedTabIndex", index);
			this.openDialog("ZQM_SERAMIK.ZQM_SERAMIK.fragment.sonucSecimi");
		},

		methodSonucTableSelected: function (oEvent) {
			var oItem = oEvent.getSource();
			var jsm = this.getView().getModel("detailView");
			var jsmInspInput = this.getView().getModel("detailView").getProperty("/inspInput");
			var index = jsm.getProperty("/selectedTabIndex");
			var data = jsmInspInput[index];
			data.Result = oItem.getCells()[1].getText();
			jsm.setProperty("/inspInput[" + index + "]", data);
			this.closeDialog();
		},

		onSelectDeger: function (oEvent) {
			var res = oEvent.getParameter("id").split("-");
			var index = res[res.length - 1];
			var jsmInspInput = this.getView().getModel("detailView").getProperty("/inspInput");

			if (oEvent.getParameter('selected'))
				jsmInspInput[index].Evaluated = "X";
			else
				jsmInspInput[index].Evaluated = "";
		},

		onSelectKapat: function (oEvent) {
			var res = oEvent.getParameter("id").split("-");
			var index = res[res.length - 1];
			var jsmInspInput = this.getView().getModel("detailView").getProperty("/inspInput");

			if (oEvent.getParameter('selected'))
				jsmInspInput[index].Closed = "X";
			else
				jsmInspInput[index].Closed = "";
		},

		onSearchKontrolPartiNo: function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Sernr", FilterOperator.Contains, sQuery));
			}

			var oTable = this.byId("detayTable");
			//Table içeriğini alıyoruz.
			oTable.getBinding("items").filter(aFilter);
		},

		onItemClose: function (oEvent) {
			var oItem = oEvent.getSource(),
				oList = oItem.getParent();

			oList.removeItem(oItem);
		},

		onTableColumnFilter: function (oEvent) {
			var oTable = this.getView().byId("detailTableColumnFilter");
			var oDetailTable = this.getView().byId("detayTable");
			var jsm = this.getView().getModel("detailView");
			var items = [],
				index;

			jQuery.each(oTable.getSelectedContextPaths(), function (id, value) {
				index = value.substr(9);
				items.push(index);
			});

			jQuery.each(oDetailTable.getColumns(), function (id, item) {
				if (items.includes(id.toString()))
					item.setVisible(false);
				else
					item.setVisible(true);
			});

			jsm.setProperty("/filterTabSelected", items);
			this.closeDialog();
		},

		onFilterButtonPressed: function (oEvent) {
			var path = "ZQM_SERAMIK.ZQM_SERAMIK.fragment.detailTableColumn";
			var oButton = oEvent.getSource();

			var jsm = this.getView().getModel("detailView").getProperty("/filterTabSelected");

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(), path, this);
				this.getView().addDependent(this._oDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			}
			this._oDialog.openBy(oButton);

			var oTable = this.getView().byId("detailTableColumnFilter");
			var tabItems = oTable.getItems();

			jQuery.each(jsm, function (id, value) {
				tabItems[value].setSelected(true);
			});
		},

		onFilterClearPressed: function (oEvent) {
			if (this._oDialog) {
				this.closeDialog();
			}
			var oDetailTable = this.getView().byId("detayTable");
			this.getView().getModel("detailView").setProperty("/filterTabSelected", null);

			jQuery.each(oDetailTable.getColumns(), function (id, item) {
				item.setVisible(true);
			});
		},

		onAfterRendering: function () {
			var jsm = this.getView().getModel("detailView");
			var oDetailTable = this.getView().byId("detayTable");
			var items = [];

			jQuery.each(oDetailTable.getColumns(), function (id, item) {
				if (aGizle.includes(item.getHeader().getText())) {
					item.setVisible(false);
					items.push(id);
					jsm.setProperty("/filterTabSelected", items);
				}
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

		closeDialog: function () {
			this._oDialog.destroy();
			delete this._oDialog;
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("main", true);
			}
		}
	});

});