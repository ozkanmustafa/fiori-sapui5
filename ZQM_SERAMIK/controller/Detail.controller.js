sap.ui.define(["sap/ui/core/mvc/Controller", "ZQM_SERAMIK/ZQM_SERAMIK/util/formatter", "sap/m/Dialog", "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/core/routing/History", "sap/m/MessageToast"
], function (e, t, s, l, a, r, i, o) {
	"use strict";
	var n = [];
	var g = new sap.m.BusyDialog;
	var u = ["Karakteristik no", "Ana kontrol karakteristiği", "Versiyon", "Karakteristik tipi"];
	g.setText("İşlem sürüyor, lütfen bekleyiniz..");
	return e.extend("ZQM_SERAMIK.ZQM_SERAMIK.controller.Detail", {
		_oView: null,
		formatter: t,
		onInit: function () {
			this._oView = this.getView();
			this.jsonDetailModel = new l;
			this.jsonDetailModel.setSizeLimit(1e4);
			this._oView.setModel(this.jsonDetailModel, "detailView");
			var e = this.getOwnerComponent().getModel();
			this.getView().setModel(e);
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("detail").attachMatched(this._onDetailMatched, this);
		},
		_onDetailMatched: function (e) {
			var t = this.getView().getModel("detailView");
			var s = e.getParameter("arguments").kontrolPartiNo;
			var l = e.getParameter("arguments").islemNo;
			var a = e.getParameter("arguments").karakteristikNo;
			var r = e.getParameter("arguments").mstrChar;
			var i = e.getParameter("arguments").version;
			t.setProperty("/kontrolPartiNo", s);
			t.setProperty("/islemNo", l);
			t.setProperty("/karakteristikNo", a);
			t.setProperty("/mstrChar", r);
			t.setProperty("/version", i);
			var o = this.getOwnerComponent().getModel();
			this.methodInspInput(o);
		},
		methodInspInput: function (e) {
			var t = this;
			var s = this.getView().getModel("detailView");
			var l = s.getProperty("/kontrolPartiNo");
			var r = s.getProperty("/islemNo");
			var i = s.getProperty("/karakteristikNo");
			var o = this.getView().byId("detayTable");
			var u = [];
			var d;
			if (l) {
				d = new a("IvPrueflos", sap.ui.model.FilterOperator.EQ, l);
				u.push(d);
			}
			if (r) {
				d = new a("IvInspoper", sap.ui.model.FilterOperator.EQ, r);
				u.push(d);
			}
			if (i) {
				d = new a("IvInspchar", sap.ui.model.FilterOperator.EQ, i);
				u.push(d);
			}
			g.open();
			e.read("/EtInspInputSet", {
				filters: u,
				urlParameters: {
					$expand: "ValuesSet"
				},
				success: function (e) {
					n = [];
					s.setProperty("/inspInput", e.results);
					o.getModel().refresh(true);
					t.methodFillColumnFilter(s);
					e.results.forEach(function (e, t) {
						if (e.CharType === "01")
							if (e.Result !== "") o.getItems()[t].getCells()[7].getItems()[0].setValue(parseFloat(e.Result));
							else o.getItems()[t].getCells()[7].getItems()[0].setValue(parseFloat(0));
						else o.getItems()[t].getCells()[7].getItems()[1].setValue(e.Result);
						if (e.Evaluated === "X") {
							o.getItems()[t].getCells()[8].setEnabled(false);
							o.getItems()[t].getCells()[7].getItems()[0].setEnabled(false);
							o.getItems()[t].getCells()[7].getItems()[1].setEnabled(false);
						} else {
							o.getItems()[t].getCells()[9].setEnabled(true);
							o.getItems()[t].getCells()[6].setEnabled(true);
						}
						if (e.Closed === "X") {
							o.getItems()[t].getCells()[9].setEnabled(false);
							o.getItems()[t].getCells()[6].setEnabled(false);
							o.getItems()[t].getCells()[7].getItems()[0].setEnabled(false);
							o.getItems()[t].getCells()[7].getItems()[1].setEnabled(false);
						} else {
							o.getItems()[t].getCells()[9].setEnabled(true);
							o.getItems()[t].getCells()[6].setEnabled(true);
						}
						if (e.Closed !== "X" && e.Evaluated !== "X") {
							o.getItems()[t].getCells()[8].setEnabled(true);
							o.getItems()[t].getCells()[9].setEnabled(true);
							o.getItems()[t].getCells()[6].setEnabled(true);
							o.getItems()[t].getCells()[7].getItems()[0].setEnabled(true);
							o.getItems()[t].getCells()[7].getItems()[1].setEnabled(true);
						}
						var s = {
							Result: e.Result,
							Evaluated: e.Evaluated,
							Closed: e.Closed,
							CharType: e.CharType
						};
						n.push(s);
					});
					try {
						s.setProperty("/valuesSet", e.results[0].ValuesSet.results);
						g.close();
					} catch (e) {
						g.close();
					}
				},
				error: function (e) {
					g.close();
				}
			});
		},
		methodFillColumnFilter: function (e) {
			var t = this.getView().byId("detayTable");
			var s = t.getColumns();
			var l = [];
			var a = this.getView().getModel("detailView").getProperty("/inspInput/0");
			var r = [];
			var i = this.getView().getModel("detailView");
			i.setProperty("/filterTabSelected", null);
			jQuery.each(t.getColumns(), function (e, t) {
				t.setVisible(true);
			});
			jQuery.each(t.getColumns(), function (e, t) {
				if (u.includes(t.getHeader().getText())) {
					t.setVisible(false);
					r.push(e);
					i.setProperty("/filterTabSelected", r);
				}
			});
			for (var o in s) {
				var n = s[o].getHeader().getText();
				if (a.CharacteristicName !== "FORMUL") {
					jQuery.each(t.getColumns(), function (e, t) {
						if (t.getHeader().getText() === "Hesapla") {
							t.setVisible(false);
							r.push(e);
							i.setProperty("/filterTabSelected", r);
						}
					});
				}
				if (a.CharType === "01") {
					if (n === "Seçim kümesi") {
						jQuery.each(t.getColumns(), function (e, t) {
							if (t.getHeader().getText() === "Seçim kümesi") {
								t.setVisible(false);
								r.push(e);
								i.setProperty("/filterTabSelected", r);
							}
						});
					}
				} else if (a.CharType === "02") {
					if (n === "Birim" || n === "Üst limit" || n === "Alt limit") {
						jQuery.each(t.getColumns(), function (e, t) {
							if (t.getHeader().getText() === "Birim" || t.getHeader().getText() === "Üst limit" || t.getHeader().getText() === "Alt limit") {
								t.setVisible(false);
								r.push(e);
								i.setProperty("/filterTabSelected", r);
							}
						});
					}
				}
				var g = {
					Name: n
				};
				l.push(g);
			}
			e.setProperty("/columns", l);
		},
		saveChanges: function (e) {
			var t = this.getView().getModel();
			var s = this.getView().byId("detayTable");
			var l = this.getView().getModel("detailView");
			var a = l.getProperty("/valuesSet");
			var r = this.getView().getModel("detailView").getProperty("/inspInput");
			var i = l.getProperty("/kontrolPartiNo");
			var u = l.getProperty("/islemNo");
			var d = l.getProperty("/karakteristikNo");
			var p = {
				Sernr2: "1",
				IvPrueflos: i,
				IvInspoper: u,
				IvInspchar: d
			};
			p.EtInspInputSaveSet = [];
			p.EtInspInputReturnSaveSet = [];
			for (var m in r) {
				var h = {
					Sernr2: "1",
					Sernr: "",
					Message: ""
				};
				var v = r[m];
				debugger;
				if (v.Result !== n[m].Result || v.Evaluated !== n[m].Evaluated || v.Closed !== n[m].Closed) {
					if (v.Result !== "" && v.CharType === "02" || parseInt(v.Result) !== 0 && v.CharType === "01") {
						delete v["ValuesSet"];
						delete v["__metadata"];
						v.EtInspInputSaveToValuesSet = [];
						for (var f in a) {
							var c = a[f];
							c.Sernr2 = "1";
							delete c["__metadata"];
							v.EtInspInputSaveToValuesSet.push(c);
						}
						p.EtInspInputSaveSet.push(v);
						p.EtInspInputReturnSaveSet.push(h);
					}
				}
			}
			if (p.EtInspInputSaveSet.length !== 0) {
				g.open();
				var I = this;
				t.create("/EtInspInputHeadSaveSet", p, {
					async: true,
					success: function (e) {
						g.close();
						jQuery.each(e.EtInspInputReturnSaveSet.results, function (e, t) {
							if (t.Message !== "OK") {
								jQuery.each(s.getItems(), function (e, s) {
									if (parseInt(t.Sernr) === parseInt(s.getCells()[0].getText()) || t.Sernr === s.getCells()[0].getText()) {
										r[e].Result = n[e].Result;
										r[e].Evaluated = n[e].Evaluated;
										if (n[e].Evaluated === "X" || n[e].Closed === "X") {
											s.getCells()[7].getItems()[0].setEnabled(false);
											s.getCells()[7].getItems()[1].setEnabled(false);
										} else {
											s.getCells()[7].getItems()[0].setEnabled(true);
											s.getCells()[7].getItems()[1].setEnabled(true);
										}
										if (n[e].Evaluated === "X") {
											s.getCells()[8].setSelected(true);
											s.getCells()[8].setEnabled(false);
										} else {
											s.getCells()[8].setSelected(false);
											s.getCells()[8].setEnabled(true);
										}
										r[e].Closed = n[e].Closed;
										if (n[e].Closed === "X") {
											s.getCells()[9].setSelected(true);
											s.getCells()[9].setEnabled(false);
											s.getCells()[6].setEnabled(false);
											s.getCells()[8].setSelected(true);
											s.getCells()[8].setEnabled(false);
										} else {
											s.getCells()[9].setSelected(false);
											s.getCells()[9].setEnabled(true);
											s.getCells()[6].setEnabled(true);
										}
									}
								});
							} else {
								jQuery.each(s.getItems(), function (e, s) {
									if (parseInt(t.Sernr) === parseInt(s.getCells()[0].getText()) || t.Sernr === s.getCells()[0].getText()) {
										n[e].Result = r[e].Result;
										n[e].Evaluated = r[e].Evaluated;
										n[e].Closed = r[e].Closed;
										n[e].CharType = r[e].CharType;
										if (r[e].Evaluated === "X") {
											s.getCells()[8].setEnabled(false);
											s.getCells()[7].getItems()[0].setEnabled(false);
											s.getCells()[7].getItems()[1].setEnabled(false);
										} else s.getCells()[8].setEnabled(true);
										if (r[e].Closed === "X") {
											s.getCells()[9].setEnabled(false);
											s.getCells()[6].setEnabled(false);
											s.getCells()[8].setEnabled(false);
											s.getCells()[7].getItems()[0].setEnabled(false);
											s.getCells()[7].getItems()[1].setEnabled(false);
										} else {
											s.getCells()[9].setEnabled(true);
											s.getCells()[6].setEnabled(true);
										}
									}
								});
							}
						});
						l.setProperty("/inspInputReturn", e.EtInspInputReturnSaveSet.results);
						I.openDialog("ZQM_SERAMIK.ZQM_SERAMIK.fragment.islemSonucMesajlari");
						I.getView().byId("detayTable").getModel().refresh();
					},
					error: function (e) {
						g.close();
					}
				});
			} else {
				o.show("Hiçbir satırda değişiklik yapılmadı.");
			}
		},
		onValueHelpRequestSonuc: function (e) {
			var t = e.getParameter("id").split("-");
			var s = t[t.length - 1];
			var l = this.getView().getModel("detailView");
			l.setProperty("/selectedTabIndex", s);
			this.openDialog("ZQM_SERAMIK.ZQM_SERAMIK.fragment.sonucSecimi");
		},
		methodSonucTableSelected: function (e) {
			var t = e.getSource();
			var s = this.getView().getModel("detailView");
			var l = this.getView().getModel("detailView").getProperty("/inspInput");
			var a = s.getProperty("/selectedTabIndex");
			var r = l[a];
			r.Result = t.getCells()[1].getText();
			s.setProperty("/inspInput[" + a + "]", r);
			this.closeDialog();
		},
		onSelectDeger: function (e) {
			var t = e.getParameter("id").split("-");
			var s = t[t.length - 1];
			var l = this.getView().getModel("detailView").getProperty("/inspInput");
			if (e.getParameter("selected")) l[s].Evaluated = "X";
			else l[s].Evaluated = "";
		},
		onPressDegerleAll: function () {
			var oTable = this.getView().byId("detayTable");

			jQuery.each(oTable.getItems(), function (id, item) {
				if (oTable.getItems()[id].getCells()[8].getEnabled() === true) {
					item.getCells()[8].setSelected(!item.getCells()[8].getSelected());
				}
			});
		},

		onPressKapatAll: function () {
			var oTable = this.getView().byId("detayTable");

			jQuery.each(oTable.getItems(), function (id, item) {
				if (oTable.getItems()[id].getCells()[9].getEnabled() === true) {
					item.getCells()[9].setSelected(!item.getCells()[9].getSelected());
				}
			});
		},
		onPressButtonHesapla: function (e) {
			g.open();
			var t = e.getParameter("id").split("-");
			var s = t[t.length - 1];
			var l = this.getView().getModel("detailView");
			var a = this.getView().getModel("detailView").getProperty("/inspInput");
			var r = this.getView().byId("detayTable");
			var i = a[s].Sernr;
			var o = l.getProperty("/kontrolPartiNo");
			var n = l.getProperty("/islemNo");
			var u = l.getProperty("/mstrChar");
			var d = l.getProperty("/version");
			var p = this.getOwnerComponent().getModel();
			g.open();
			p.read("/EtSonucHesaplaSet(IvInsplot='" + o + "',IvInspoper='" + n + "',IvMkmnr='" + u + "',IvUserc1='" + i + "',IvVersion='" + d +
				"')", {
					success: function (e) {
						r.getItems()[s].getCells()[7].getItems()[0].setValue(parseFloat(e.EvVal));
						g.close();
					},
					error: function (e) {
						g.close();
					}
				})
		},
		onSelectKapat: function (e) {
			var t = e.getParameter("id").split("-");
			var s = t[t.length - 1];
			var l = this.getView().getModel("detailView").getProperty("/inspInput");
			if (e.getParameter("selected")) l[s].Closed = "X";
			else l[s].Closed = "";
		},
		onSearchKontrolPartiNo: function (e) {
			var t = [];
			var s = e.getParameter("query");
			if (s) {
				t.push(new a("Sernr", r.Contains, s));
			}
			var l = this.byId("detayTable");
			l.getBinding("items").filter(t);
		},
		onItemClose: function (e) {
			var t = e.getSource(),
				s = t.getParent();
			s.removeItem(t);
		},
		onTableColumnFilter: function (e) {
			var t = this.getView().byId("detailTableColumnFilter");
			var s = this.getView().byId("detayTable");
			var l = this.getView().getModel("detailView");
			var a = [],
				r;
			jQuery.each(t.getSelectedContextPaths(), function (e, t) {
				r = t.substr(9);
				a.push(r);
			});
			jQuery.each(s.getColumns(), function (e, t) {
				if (a.includes(e.toString())) t.setVisible(false);
				else t.setVisible(true);
			});
			l.setProperty("/filterTabSelected", a);
			this.closeDialog();
		},
		onFilterButtonPressed: function (e) {
			var t = "ZQM_SERAMIK.ZQM_SERAMIK.fragment.detailTableColumn";
			var s = e.getSource();
			var l = this.getView().getModel("detailView").getProperty("/filterTabSelected");
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(), t, this);
				this.getView().addDependent(this._oDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			}
			this._oDialog.openBy(s);
			var a = this.getView().byId("detailTableColumnFilter");
			var r = a.getItems();
			jQuery.each(l, function (e, t) {
				r[t].setSelected(true);
			});
		},
		onFilterClearPressed: function (e) {
			if (this._oDialog) {
				this.closeDialog();
			}
			var t = this.getView().byId("detayTable");
			this.getView().getModel("detailView").setProperty("/filterTabSelected", null);
			jQuery.each(t.getColumns(), function (e, t) {
				t.setVisible(true);
			});
		},
		openDialog: function (e) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(), e, this);
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
			var e = i.getInstance();
			var t = e.getPreviousHash();
			var s = this.getView().getModel("detailView");
			s.setProperty("kontrolPartiNo", null);
			s.setProperty("islemNo", null);
			s.setProperty("karakteristikNo", null);
			s.setProperty("inspInput", null);
			s.setProperty("valuesSet", null);
			s.setProperty("inspInputReturn", null);
			s.setProperty("kontrolPartiNo", null);
			s.setProperty("filterTabSelected", null);
			s.refresh();
			if (t !== undefined) {
				window.history.go(-1);
			} else {
				var l = sap.ui.core.UIComponent.getRouterFor(this);
				l.navTo("main", true);
			}
		}
	});
});