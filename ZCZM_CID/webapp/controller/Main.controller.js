sap.ui.define([
	"./Base.controller",
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	"sap/ui/model/json/JSONModel",
	"ZCZM_CID/ZCZM_CID/util/formatter",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox"
], function (Base, Controller, Fragment, JSONModel, formatter, MessageToast, Filter, FilterOperator, MessageBox) {
	"use strict";

	///////////////////////////////////////////////////////////////////////////////
	/*							GLOBAL VALUES									 */
	///////////////////////////////////////////////////////////////////////////////

	var dialogBusy = new sap.m.BusyDialog();

	var oModel,
		jsonModel;

	var customerNo,
		customerName;

	var oBaglantiTemplate,
		oSistemTemplate,
		oUserTemplate;

	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Base.extend("ZCZM_CID.ZCZM_CID.controller.Main", {

		formatter: formatter,
		_formFragments: {},

		///////////////////////////////////////////////////////////////////////////////
		/*							INITIALIZE METHOD 								 */
		///////////////////////////////////////////////////////////////////////////////

		onInit: function () {
			dialogBusy.open();
			oModel = this.getOdataModel();
			jsonModel = new JSONModel();
			//Detay sayfası başlangıçta gizleniyor.
			jsonModel.setProperty("/detailPageVisible", false);
			jsonModel.setSizeLimit(10000);
			jsonModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.setModel(jsonModel, "mainView");

			jsonModel.setProperty("/isAdmin", false);
			this.getCustomers();

			oBaglantiTemplate = this.getById("baglantiColumnList");
			oSistemTemplate = this.getById("sistemBilgiColumnList");
			oUserTemplate = this.getById("userColumnList");
		},

		onBeforeRendering: function () {
			var that = this;
			jsonModel = this.getModel("mainView");

			oModel.read("/EtIsAdminSet(IvUsername='" + customerName + "')", {
				success: function (resp) {
					if (resp.EvReturn === 'OK') {
						jsonModel.setProperty("/isAdmin", true);
						jsonModel.refresh();
					}
				},
				error: function (resp) {}
			});
		},

		///////////////////////////////////////////////////////////////////////////////
		/*							PRIVATE METHODS 								 */
		///////////////////////////////////////////////////////////////////////////////

		_rebindTable: function (tableName, oTemplate, path, sKeyboardMode) {
			var oTable;

			if (tableName === "Baglanti") {
				oTable = this.getById("baglantiTable");
				this.getBaglanti();
			} else if (tableName === "Sistem") {
				oTable = this.getById("sistemBilgiTable");
				this.getSistemBilgi();
			} else if (tableName === "User") {
				oTable = this.getById("userTable");
				this.getUserBilgi();
			}

			if (sKeyboardMode === "Navigation")
				oTable.setMode("None");
			else
				oTable.setMode("Delete");

			oTable.bindItems({
				path: path,
				template: oTemplate
			}).setKeyboardMode(sKeyboardMode);
		},

		_deleteComment: function (custNo, messageNo) {
			this.getModel("mainView").setProperty("/commentListBusy", true);
			var that = this;

			oModel.read("/EtDelCommentSet(IvCustno='" + custNo + "',IvMessageno='" + messageNo + "')", {
				success: function (resp) {
					if (resp.EvReturn === 'OK') {
						MessageToast.show("Yorum Silindi");
						that.getComments();
					} else {
						that.getModel("mainView").setProperty("/commentListBusy", false);
						MessageToast.show(resp.EvReturn);
					}
				},
				error: function (resp) {
					that.getModel("mainView").setProperty("/commentListBusy", false);
					MessageToast.show("Yorum Silinirken Bir Hata Oluştu");
				}
			});
		},

		_deleteCustomer: function (custNo) {
			var that = this;
			jsonModel = this.getModel("mainView");

			oModel.read("/EtDelCustomerSet(IvCustno='" + custNo + "')", {
				success: function (resp) {
					dialogBusy.close();
					if (resp.EvReturn === 'OK') {

						MessageToast.show("Müşteri Silindi");
						jsonModel.setProperty("/customerListBusy", true);
						that.getSplitAppObj().to(that.createId("messagePage"));
						that.getCustomers();
					} else {
						MessageToast.show("Müşteri Silinirken Bir Hata Oluştu");
					}
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Müşteri Silinirken Bir Hata Oluştu");
				}
			});
		},

		///////////////////////////////////////////////////////////////////////////////
		/*							GET METHODS 								     */
		///////////////////////////////////////////////////////////////////////////////

		getCustomers: function () {
			var that = this;
			oModel.read("/EtGetCustomersSet", {
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/customerList", resp.results);
						jsonModel.refresh();
						that.getModel("mainView").setProperty("/customerListBusy", false);
					} else {
						MessageToast.show("Müşteri Bilgileri Yüklenemedi!");
					}
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Müşteri Bilgileri Yüklenemedi!");
				}
			});
		},

		getCustomerDetails: function () {
			dialogBusy.open();
			jsonModel = this.getModel("mainView");
			//Sayfa başlığı ekleniyor.
			jsonModel.setProperty("/pageTitle", customerName);
			//Detay sayfası görünüme açılıyor.
			jsonModel.setProperty("/detailPageVisible", true);

			// this.getById("rteId").setValue("");
			// this.getById("htmlId").setContent("");
			jsonModel.setProperty("/header", "");

			this.getHeader();
			this.getBaglanti();
			this.getSistemBilgi();
			this.getUserBilgi();
			this.getComments();
			if (jsonModel.getProperty("/isAdmin"))
				this.getDefaultView();
			else {
				this.changeHeaderEdit(false);
			}
		},

		getHeader: function () {
			var that = this;
			jsonModel = this.getModel("mainView");

			oModel.read("/EtGetHeaderSet(IvCustno='" + customerNo + "')", {
				success: function (resp) {
					dialogBusy.close();
					if (resp.EvHeader !== undefined) {
						jsonModel.setProperty("/header", resp.EvHeader);
						jsonModel.refresh();
						var html = new sap.ui.core.HTML({
							content: resp.EvHeader
						});

						that.getById("htmlContentId").removeAllItems();
						that.getById("htmlContentId").addItem(html);

						that.getById("idStatusSwitch").setState(resp.EvStatu === 'X' ? true : false);
					} else {
						MessageToast.show("Başlık Bilgileri Yüklenemedi!");
					}
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Başlık Bilgileri Yüklenemedi!");
				}
			});
		},

		getBaglanti: function () {
			jsonModel = this.getModel("mainView");
			var f = new Array();
			var filter;

			jsonModel.setProperty("/baglantiTableBusy", true);

			filter = new Filter("IvCustno", FilterOperator.EQ, customerNo.toString());
			f.push(filter);

			oModel.read("/EtGetBaglantiSet", {
				filters: f,
				success: function (resp) {
					jsonModel.setProperty("/baglantiTableBusy", false);
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/baglantiList", resp.results);
						jsonModel.refresh();
					} else {
						MessageToast.show("Baglanti Bilgileri Yüklenemedi!");
					}
				},
				error: function (resp) {
					jsonModel.setProperty("/baglantiTableBusy", false);
					dialogBusy.close();
					MessageToast.show("Baglanti Bilgileri Yüklenemedi!");
				}
			});
		},

		getSistemBilgi: function () {
			jsonModel = this.getModel("mainView");
			var f = new Array();
			var filter;

			jsonModel.setProperty("/sistemTableBusy", true);

			filter = new Filter("IvCustno", FilterOperator.EQ, customerNo.toString());
			f.push(filter);

			oModel.read("/EtGetSistemBilgiSet", {
				filters: f,
				success: function (resp) {
					jsonModel.setProperty("/sistemTableBusy", false);
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/sistemBilgiList", resp.results);
						jsonModel.refresh();
					} else {
						MessageToast.show("Sistem Bilgileri Yüklenemedi!");
					}
				},
				error: function (resp) {
					jsonModel.setProperty("/sistemTableBusy", false);
					dialogBusy.close();
					MessageToast.show("Sistem Bilgileri Yüklenemedi!");
				}
			});
		},

		getUserBilgi: function () {
			jsonModel = this.getModel("mainView");
			var f = new Array();
			var filter;

			jsonModel.setProperty("/userTableBusy", true);

			filter = new Filter("IvCustno", FilterOperator.EQ, customerNo.toString());
			f.push(filter);

			oModel.read("/EtGetUserBilgiSet", {
				filters: f,
				success: function (resp) {
					jsonModel.setProperty("/userTableBusy", false);
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/userBilgiList", resp.results);
						jsonModel.refresh();
					} else {
						MessageToast.show("Kullanıcı Bilgileri Yüklenemedi!");
					}
				},
				error: function (resp) {
					jsonModel.setProperty("/userTableBusy", false);
					dialogBusy.close();
					MessageToast.show("Kullanıcı Bilgileri Yüklenemedi!");
				}
			});
		},

		getComments: function () {
			jsonModel = this.getModel("mainView");
			var f = new Array();
			var filter;

			filter = new Filter("IvCustno", FilterOperator.EQ, customerNo.toString());
			f.push(filter);

			oModel.read("/EtGetCommentsSet", {
				filters: f,
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/commentList", resp.results);
						jsonModel.setProperty("/commentListBusy", false);
					} else {
						MessageToast.show("Yorumlar Yüklenemedi!");
					}
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Yorumlar Yüklenemedi!");
				}
			});
		},

		getDefaultView: function () {

			var that = this;

			jsonModel = this.getModel("mainView");

			var tabArray = [{
				tableName: "Header",
				modelName: "mainView>/header"
			}, {
				tableName: "Baglanti",
				modelName: "mainView>/baglantiList"
			}, {
				tableName: "Sistem",
				modelName: "mainView>/sistemBilgiList"
			}, {
				tableName: "User",
				modelName: "mainView>/userBilgiList"
			}];

			jQuery.each(tabArray, function (id, item) {
				if (item.tableName !== "Header") {
					if (item.tableName === "Baglanti")
						that._rebindTable(item.tableName, oBaglantiTemplate, item.modelName, "Navigation");
					if (item.tableName === "Sistem")
						that._rebindTable(item.tableName, oSistemTemplate, item.modelName, "Navigation");
					if (item.tableName === "User")
						that._rebindTable(item.tableName, oUserTemplate, item.modelName, "Navigation");
					that.getById("addButton" + item.tableName).setVisible(false);

				}

				that.getById("editButton" + item.tableName).setVisible(true);
				that.getById("saveButton" + item.tableName).setVisible(false);
				that.getById("cancelButton" + item.tableName).setVisible(false);
				if (item.tableName === "Header")
					that.changeHeaderEdit(false);
			});

		},

		getSplitAppObj: function () {
			var result = this.byId("SplitAppDemo");
			if (!result) {}
			return result;
		},

		///////////////////////////////////////////////////////////////////////////////
		/*							CREATE METHODS 								     */
		///////////////////////////////////////////////////////////////////////////////

		createNewCustomer: function () {
			var that = this;
			var newCustomerName = this.getById("id_musteri_ad");
			jsonModel = this.getModel("mainView");

			if (newCustomerName.getValue() === null || newCustomerName.getValue() === "") {
				newCustomerName.setValueState(sap.ui.core.ValueState.Error);
				newCustomerName.setValueStateText("Müşteri adı boş bırakılamaz!");
			} else {
				jsonModel.setProperty("/customerListBusy", true);

				var cName = jsonModel.getProperty("/newCustomerName");
				cName = this.replaceOdataInput(cName);

				var cLisans = this.getById("id_lisans");
				if (cLisans.getSelected())
					cLisans = true;
				else
					cLisans = false;

				var cDestek = this.getById("id_destek");
				if (cDestek.getSelected())
					cDestek = true;
				else
					cDestek = false;

				var cMuhattap = jsonModel.getProperty("/newCustomerMuhattap");
				cMuhattap = cMuhattap.substring(1);
				cMuhattap = cMuhattap.replace(/\(/g, "");
				cMuhattap = cMuhattap.replace(/\)/g, "");
				cMuhattap = cMuhattap.replace(/\-/g, "");

				var cMail = jsonModel.getProperty("/newCustomerMail");

				this.closeDialog();
				oModel.read("/EtCreateCustomerSet(IvBp='" + cMuhattap + "',IvCustname='" + cName + "',IvDestek=" + cDestek +
					",IvDestekMail='" + cMail + "',IvLisans=" + cLisans + ")", {
						success: function (resp) {
							dialogBusy.close();
							if (resp.EvReturn === 'OK') {
								MessageToast.show("Müşteri Oluşturuldu");
								that.clearInputs();
								that.getCustomers();
								that.closeDialog();
							} else {
								jsonModel.setProperty("/customerListBusy", false);
								MessageToast.show("Müşteri Eklenemedi!");
							}
						},
						error: function (resp) {
							dialogBusy.close();
							jsonModel.setProperty("/customerListBusy", false);
							MessageToast.show("Müşteri Eklenemedi!");
						}
					});
			}
		},

		createExit: function () {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.show(
				"İptal Etmek İstediğinize Emin Misiniz?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					icon: MessageBox.Icon.QUESTION,
					title: "Uyarı",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.YES) {
							that.closeDialog();
						} else {

						}
					}
				}
			);
		},

		///////////////////////////////////////////////////////////////////////////////
		/*							CHANGE METHODS 								     */
		///////////////////////////////////////////////////////////////////////////////

		changeInputValue: function (oEvent) {
			jsonModel = this.getModel("mainView");

			var cName = this.getById("id_musteri_ad").getValue();
			var cMuhattap = this.getById("id_musteri_muhattap").getValue();
			var cMail = this.getById("id_musteri_mail").getValue();

			jsonModel.setProperty("/newCustomerName", cName);
			jsonModel.setProperty("/newCustomerMuhattap", cMuhattap);
			jsonModel.setProperty("/newCustomerMail", cMail);
		},

		changeUserInputValue: function (oEvent) {
			jsonModel = this.getModel("mainView");

			var oldPass = this.getById("id_old_password").getValue();
			var newPass = this.getById("id_new_password").getValue();
			var newPassAgain = this.getById("id_new_password2").getValue();

			jsonModel.setProperty("/oldPassword", oldPass);
			jsonModel.setProperty("/newPassword", newPass);
			jsonModel.setProperty("/newPasswordAgain", newPassAgain);
		},

		changeHeaderEdit: function (oValue) {
			this.getById("rteId").setVisible(oValue);
			// this.getById("htmlId").setVisible(!oValue);
			this.getById("htmlContentId").setVisible(!oValue);
		},

		changeShowAll: function (oEvent) {
			var that = this;
			var bState = oEvent.getParameter("state");
			var value;

			var f = new Array();
			var filter;

			jsonModel = this.getModel("mainView");

			value = bState === true ? 'X' : '';

			this.getById("SplitAppDemo").setBusy(true);

			filter = new Filter("IvCustno", FilterOperator.EQ, customerNo.toString());
			f.push(filter);

			if (value === 'X') {
				filter = new Filter("IvStatu", FilterOperator.EQ, value.toString());
				f.push(filter);
			}

			oModel.read("/EtUpdateCustShowAllSet", {
				filters: f,
				success: function (resp) {
					that.getById("SplitAppDemo").setBusy(false);
					if (resp.results !== undefined) {
						jsonModel.setProperty("/customerList", resp.results);
						jsonModel.refresh();
					} else {
						MessageToast.show("Beklenmeyen bir hata oluştu!");
						that.getById("idStatusSwitch").setState(!bState);
					}
				},
				error: function (resp) {
					that.getById("SplitAppDemo").setBusy(false);
					MessageToast.show("Beklenmeyen bir hata oluştu!");
					that.getById("idStatusSwitch").setState(!bState);
				}
			});

		},

		///////////////////////////////////////////////////////////////////////////////
		/*							EVENTS METHODS 								     */
		///////////////////////////////////////////////////////////////////////////////

		onSearchCustomers: function (oEvent) {

			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("CustomerName", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("customerList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},

		onDeleteComment: function (oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var messageNo = oEvent.getParameter("listItem").getProperty("info");

			MessageBox.show(
				"Silmek İstediğinize Emin Misiniz?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					icon: MessageBox.Icon.QUESTION,
					title: "Uyarı",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.YES) {
							that._deleteComment(customerNo, messageNo);
						}
					}
				}
			);
		},

		onPressCreateCustomer: function () {
			this.openDialog("ZCZM_CID.ZCZM_CID.fragment.createCustomer");
			this.clearInputs();
		},

		onPressEditUserInfo: function () {
			this.openDialog("ZCZM_CID.ZCZM_CID.fragment.editUserInfo");
		},

		onPostDeleteCustomer: function () {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			MessageBox.show(
				"Silmek İstediğinize Emin Misiniz?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					icon: MessageBox.Icon.QUESTION,
					title: "Uyarı",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.YES) {
							dialogBusy.open();
							that._deleteCustomer(customerNo);
						}
					}
				}
			);
		},

		onPostComment: function (oEvent) {
			this.getModel("mainView").setProperty("/commentListBusy", true);
			var that = this;
			var value = oEvent.getParameter("value");
			value = this.replaceOdataInput(value);

			oModel.read("/EtAddCommentSet(IvComment='" + value + "',IvCustno='" + customerNo + "')", {
				success: function (resp) {
					if (resp.EvReturn === 'OK') {
						MessageToast.show("Yorum Eklendi");
						that.getComments();
					} else {
						that.getModel("mainView").setProperty("/commentListBusy", false);
						MessageToast.show(resp.EvReturn);
					}
				},
				error: function (resp) {
					that.getModel("mainView").setProperty("/commentListBusy", false);
					MessageToast.show("Yorum Eklenirken Hata Oluştu!");
				}
			});
		},

		onPressGoToDetail: function (oEvent) {
			dialogBusy.open();
			this.getSplitAppObj().to(this.createId("detail"));
			customerNo = oEvent.getParameter('listItem').getProperty("description");
			customerName = oEvent.getParameter('listItem').getProperty("title");
			this.getCustomerDetails();
		},

		onPressDetailBack: function () {
			this.getSplitAppObj().backDetail();
		},

		onCancelEdit: function (oEvent) {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var id = oEvent.getParameters().id;
			var tableName, modelName;

			MessageBox.show(
				"İptal Etmek İstediğinize Emin Misiniz?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					icon: MessageBox.Icon.QUESTION,
					title: "Uyarı",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.NO) {
							return;
						} else {
							if (id.includes("Baglanti")) {
								tableName = "Baglanti";
								modelName = "mainView>/baglantiList";
							} else if (id.includes("Sistem")) {
								tableName = "Sistem";
								modelName = "mainView>/sistemBilgiList";
							} else if (id.includes("User")) {
								tableName = "User";
								modelName = "mainView>/userBilgiList";
							} else if (id.includes("Header")) {
								tableName = "Header";
								modelName = "mainView>/header";
							}

							that.byId("editButton" + tableName).setVisible(true);
							if (tableName !== "Header")
								that.byId("addButton" + tableName).setVisible(false);
							that.byId("saveButton" + tableName).setVisible(false);
							that.byId("cancelButton" + tableName).setVisible(false);

							if (tableName !== "Header") {
								if (tableName === "Baglanti")
									that._rebindTable(tableName, oBaglantiTemplate, modelName, "Navigation");
								if (tableName === "Sistem")
									that._rebindTable(tableName, oSistemTemplate, modelName, "Navigation");
								if (tableName === "User")
									that._rebindTable(tableName, oUserTemplate, modelName, "Navigation");
							} else {
								that.changeHeaderEdit(false);
							}
						}
					}
				}
			);
		},

		onSaveEdit: function (oEvent) {
			dialogBusy.open();
			var that = this;
			var id = oEvent.getParameters().id;
			var updateNo, tableName, modelName;

			if (id.includes("Baglanti")) {
				updateNo = "1";
				tableName = "Baglanti";
				modelName = "mainView>/baglantiList";
			} else if (id.includes("Sistem")) {
				updateNo = "2";
				tableName = "Sistem";
				modelName = "mainView>/sistemBilgiList";
			} else if (id.includes("User")) {
				updateNo = "3";
				tableName = "User";
				modelName = "mainView>/userBilgiList";
			} else if (id.includes("Header")) {
				updateNo = "4";
				tableName = "Header";
				modelName = "mainView>/header";
			}

			jsonModel = this.getModel("mainView");
			var header = jsonModel.getProperty("/header");

			var h = {
				"IvUpdateno": updateNo,
				"IvCustno": customerNo,
				"IvHeader": header
			};

			h.EtUpdateBaglantiSet = [];
			h.EtUpdateSistemBilgiSet = [];
			h.EtUpdateUserBilgiSet = [];

			if (updateNo === "1") {
				jQuery.each(jsonModel.getProperty("/baglantiList"), function (id, item) {
					var baglanti = {
						"Custno": customerNo,
						"Vpnuser": item.Vpnuser,
						"Vpnpass": item.Vpnpass,
						"Vpnip": item.Vpnip,
						"Baglanti": item.Baglanti,
						"Vpndosyasi": item.Vpndosyasi,
						"Vpnlink": item.Vpnlink,
						"Chdate": item.Chdate
					};

					h.EtUpdateBaglantiSet.push(baglanti);
				});
			} else if (updateNo === "2") {
				jQuery.each(jsonModel.getProperty("/sistemBilgiList"), function (id, item) {
					var sistem = {
						"Custno": customerNo,
						"Sysid": item.Sysid,
						"Sysname": item.Sysname,
						"Sysip": item.Sysip,
						"Sysno": item.Sysno,
						"Sysrouter": item.Sysrouter,
						"Chdate": item.Chdate
					};

					h.EtUpdateSistemBilgiSet.push(sistem);
				});
			} else if (updateNo === "3") {
				jQuery.each(jsonModel.getProperty("/userBilgiList"), function (id, item) {
					var user = {
						"Custno": customerNo,
						"Sysname": item.Sysname,
						"Uname": item.Uname,
						"Clnt": item.Clnt,
						"Rol": item.Rol,
						"Passwrd": item.Passwrd,
						"Chdate": item.Chdate
					};

					h.EtUpdateUserBilgiSet.push(user);
				});
			}

			oModel.create("/EtUpdateHeaderSet", h, {
				//async: false,
				success: function (oResp) {
					dialogBusy.close();
					MessageToast.show("Değişiklikler Kaydedildi");

					if (updateNo === "1") {
						that.getBaglanti();
					} else if (updateNo === "2") {
						that.getSistemBilgi();
					} else if (updateNo === "3") {
						that.getUserBilgi();
					} else if (updateNo === "4") {
						that.getHeader();
					}
				},
				error: function (oResp) {
					dialogBusy.close();
					MessageToast.show("Değişiklikler Kaydedilemedi!");
				}
			});

			this.byId("editButton" + tableName).setVisible(true);
			if (tableName !== "Header")
				this.byId("addButton" + tableName).setVisible(false);
			this.byId("saveButton" + tableName).setVisible(false);
			this.byId("cancelButton" + tableName).setVisible(false);

			if (tableName !== "Header") {
				if (tableName === "Baglanti")
					this._rebindTable(tableName, oBaglantiTemplate, modelName, "Navigation");
				else if (tableName === "Sistem")
					this._rebindTable(tableName, oSistemTemplate, modelName, "Navigation");
				else if (tableName === "User")
					this._rebindTable(tableName, oUserTemplate, modelName, "Navigation");
			} else
				this.changeHeaderEdit(false);
		},

		onAddEdit: function (oEvent) {
			var id = oEvent.getParameters().id;
			var tableName;

			jsonModel = this.getModel('mainView');

			if (id.includes("Baglanti")) {
				tableName = "Baglanti";
				jsonModel.getProperty('/baglantiList').push({});
			} else if (id.includes("Sistem")) {
				tableName = "Sistem";
				jsonModel.getProperty('/sistemBilgiList').push({});
			} else if (id.includes("User")) {
				tableName = "User";
				jsonModel.getProperty('/userBilgiList').push({});
			}

			jsonModel.refresh();
		},

		onDeleteEdit: function (oEvent) {
			var id = oEvent.getParameters().id;
			var tableName, table;

			var res = oEvent.getParameter("listItem").sId.split("-");
			var index = res[res.length - 1];

			jsonModel = this.getModel('mainView');

			if (id.includes("baglanti")) {
				tableName = "Baglanti";
				jsonModel.getProperty("/baglantiList").splice(index, 1);
			} else if (id.includes("sistem")) {
				tableName = "Sistem";
				jsonModel.getProperty("/sistemBilgiList").splice(index, 1);
			} else if (id.includes("user")) {
				tableName = "User";
				jsonModel.getProperty("/userBilgiList").splice(index, 1);
			}

			jsonModel.refresh();
		},

		onEdit: function (oEvent) {
			var id = oEvent.getParameters().id;
			var tableName, modelName;
			var oEditableTemplate;

			if (id.includes("Baglanti"))
				tableName = "Baglanti";
			else if (id.includes("Sistem"))
				tableName = "Sistem";
			else if (id.includes("User"))
				tableName = "User";
			else if (id.includes("Header"))
				tableName = "Header";

			this.byId("editButton" + tableName).setVisible(false);
			if (tableName !== "Header")
				this.byId("addButton" + tableName).setVisible(true);
			this.byId("saveButton" + tableName).setVisible(true);
			this.byId("cancelButton" + tableName).setVisible(true);

			if (tableName === "Baglanti") {
				modelName = "mainView>/baglantiList";

				oEditableTemplate = new sap.m.ColumnListItem({
					cells: [
						new sap.m.VBox({
							items: [
								new sap.m.Input({
									value: "{mainView>Baglanti}",
									placeholder: "Bağlanti"
								})
							]
						}),
						new sap.m.Input({
							value: "{mainView>Vpnuser}",
							placeholder: "Kullanıcı"
						}),
						new sap.m.Input({
							value: "{mainView>Vpnpass}",
							placeholder: "Şifre"
						}),
						new sap.m.Input({
							value: "{mainView>Vpnip}",
							placeholder: "Ip"
						}),
						new sap.m.VBox({
							items: [
								new sap.m.Input({
									value: "{mainView>Vpndosyasi}",
									placeholder: "Text"
								}),
								new sap.m.Input({
									value: "{mainView>Vpnlink}",
									placeholder: "Link"
								})
							]
						}), new sap.m.Text({
							text: "{path:'mainView>Chdate', type: 'sap.ui.model.type.Date'}",
							editable: false
						})
					]
				});

			} else if (tableName === "Sistem") {
				modelName = "mainView>/sistemBilgiList";

				oEditableTemplate = new sap.m.ColumnListItem({
					cells: [
						new sap.m.Input({
							value: "{mainView>Sysname}"
						}),
						new sap.m.VBox({
							items: [
								new sap.m.Input({
									value: "{mainView>Sysid}"
								}),
								new sap.m.Input({
									value: "{mainView>Sysno}"
								})
							]
						}),
						new sap.m.Input({
							value: "{mainView>Sysip}"
						}),
						new sap.m.Input({
							value: "{mainView>Sysrouter}"
						}),
						new sap.m.Text({
							text: "{path:'mainView>Chdate', type: 'sap.ui.model.type.Date'}",
							editable: false
						})
					]
				});
			} else if (tableName === "User") {
				modelName = "mainView>/userBilgiList";

				oEditableTemplate = new sap.m.ColumnListItem({
					cells: [
						new sap.m.Input({
							value: "{mainView>Sysname}"
						}),
						new sap.m.Input({
							value: "{mainView>Clnt}"
						}),
						new sap.m.Input({
							value: "{mainView>Rol}"
						}),
						new sap.m.VBox({
							items: [
								new sap.m.Input({
									value: "{mainView>Uname}"
								}),
								new sap.m.Input({
									value: "{mainView>Passwrd}"
								})
							]
						}),
						new sap.m.Text({
							text: "{path:'mainView>Chdate', type: 'sap.ui.model.type.Date'}",
							editable: false
						})
					]
				});
			}

			if (tableName !== "Header")
				this._rebindTable(tableName, oEditableTemplate, modelName, "Edit");
			else
				this.changeHeaderEdit(true);
		},

		openDialog: function (fragmentPath) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(), fragmentPath, this);
				this.getView().addDependent(this._oDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			}
			this._oDialog.open();
		},

		clearInputs: function () {
			jsonModel = this.getModel("mainView");

			jsonModel.setProperty("/newCustomerName", null);
			jsonModel.setProperty("/newCustomerMuhattap", null);
			jsonModel.setProperty("/newCustomerMail", null);
		},

		closeDialog: function () {
			this._oDialog.destroy();
			delete this._oDialog;
		},

		///////////////////////////////////////////////////////////////////////////////
		/*							PROCESS METHODS 							     */
		///////////////////////////////////////////////////////////////////////////////

		replaceOdataInput: function (value) {
			value = value.replace(/\%/g, "%25");
			value = value.replace(/\ /g, "%20");
			value = value.replace(/\+/g, "%2B");
			value = value.replace(/\//g, "%2F");
			value = value.replace(/\n/g, "%0a");
			value = value.replace(/\?/g, "%3F");
			value = value.replace(/\&/g, "%25");
			value = value.replace(/\#/g, "%26");
			value = value.replace(/\'/g, "%27");
			value = value.replace(/\:/g, "%3A");

			value = value.replace(/\Ç/g, "%C3%87");
			value = value.replace(/\ç/g, "%C3%A7");

			value = value.replace(/\Ğ/g, "%C4%9E");
			value = value.replace(/\ğ/g, "%C4%9F");

			value = value.replace(/\İ/g, "%C4%B0");
			value = value.replace(/\ı/g, "%C4%B1");

			value = value.replace(/\Ö/g, "%C3%96");
			value = value.replace(/\ö/g, "%C3%B6");

			value = value.replace(/\Ş/g, "%C5%9E");
			value = value.replace(/\ş/g, "%C5%9F");

			value = value.replace(/\Ü/g, "%C3%9C");
			value = value.replace(/\ü/g, "%C3%BC");
			return value;
		}
	});

});