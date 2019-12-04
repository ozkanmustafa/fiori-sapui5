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
			this.setModel(jsonModel, "mainView");
			this.getCustomers();

			oBaglantiTemplate = this.getById("baglantiColumnList");
			oSistemTemplate = this.getById("sistemBilgiColumnList");
			oUserTemplate = this.getById("userColumnList");
			this._showFormFragment("readOnlyHeader");
		},

		///////////////////////////////////////////////////////////////////////////////
		/*							PRIVATE METHODS 								 */
		///////////////////////////////////////////////////////////////////////////////

		_rebindTable: function (tableName, oTemplate, path, sKeyboardMode) {

			var oTable;

			if (tableName === "Baglanti")
				oTable = this.getById("baglantiTable");
			else if (tableName === "Sistem")
				oTable = this.getById("sistemBilgiTable");
			else if (tableName === "User")
				oTable = this.getById("userTable");

			if (oTable.getMode() === "Delete")
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

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "ZCZM_CID.ZCZM_CID.fragment." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},

		_showFormFragment: function (sFragmentName) {
			var box = this.getById("headerBox");

			box.removeAllContent();
			box.insertContent(this._getFormFragment(sFragmentName));
		},

		_toggleButtonsAndView: function (bEdit) {

			// Show the appropriate action buttons
			this.getById("editButtonHeader").setVisible(!bEdit);
			this.getById("saveButtonHeader").setVisible(bEdit);
			this.getById("cancelButtonHeader").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "editHeader" : "readOnlyHeader");
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

			this.getHeader();
			this.getBaglanti();
			this.getSistemBilgi();
			this.getUserBilgi();
			this.getComments();
		},

		getHeader: function () {
			jsonModel = this.getModel("mainView");

			oModel.read("/EtGetHeaderSet(IvCustno='" + customerNo + "')", {
				success: function (resp) {
					dialogBusy.close();
					if (resp.EvHeader !== undefined) {
						jsonModel.setProperty("/header", resp.EvHeader);
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

			filter = new Filter("IvCustno", FilterOperator.EQ, customerNo.toString());
			f.push(filter);

			oModel.read("/EtGetBaglantiSet", {
				filters: f,
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/baglantiList", resp.results);
					} else {
						MessageToast.show("Baglanti Bilgileri Yüklenemedi!");
					}
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Baglanti Bilgileri Yüklenemedi!");
				}
			});
		},

		getSistemBilgi: function () {
			jsonModel = this.getModel("mainView");
			var f = new Array();
			var filter;

			filter = new Filter("IvCustno", FilterOperator.EQ, customerNo.toString());
			f.push(filter);

			oModel.read("/EtGetSistemBilgiSet", {
				filters: f,
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/sistemBilgiList", resp.results);
					} else {
						MessageToast.show("Sistem Bilgileri Yüklenemedi!");
					}
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Sistem Bilgileri Yüklenemedi!");
				}
			});
		},

		getUserBilgi: function () {
			jsonModel = this.getModel("mainView");
			var f = new Array();
			var filter;

			filter = new Filter("IvCustno", FilterOperator.EQ, customerNo.toString());
			f.push(filter);

			oModel.read("/EtGetUserBilgiSet", {
				filters: f,
				success: function (resp) {
					dialogBusy.close();
					if (resp.results !== undefined) {
						jsonModel.setProperty("/userBilgiList", resp.results);
					} else {
						MessageToast.show("Kullanıcı Bilgileri Yüklenemedi!");
					}
				},
				error: function (resp) {
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
			var id = oEvent.getParameters().id;
			var tableName, modelName;

			if (id.includes("Baglanti")) {
				tableName = "Baglanti";
				modelName = "mainView>/baglantiList";
			} else if (id.includes("Sistem")) {
				tableName = "Sistem";
				modelName = "mainView>/sistemBilgiList";
			} else if (id.includes("User")) {
				tableName = "User";
				modelName = "mainView>/userBilgiLists";
			}

			this.byId("editButton" + tableName).setVisible(true);
			this.byId("addButton" + tableName).setVisible(false);
			this.byId("saveButton" + tableName).setVisible(false);
			this.byId("cancelButton" + tableName).setVisible(false);

			this._rebindTable(tableName, oBaglantiTemplate, modelName, "Navigation");
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

			this.byId("editButton" + tableName).setVisible(false);
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
								}),
								new sap.m.Input({
									value: "{mainView>Baglantitip}",
									placeholder: "Bağlanti Tipi"
								})
							]
						}),
						new sap.m.VBox({
							items: [
								new sap.m.Input({
									value: "{mainView>Vpnuser}",
									placeholder: "Kullanıcı"
								}),
								new sap.m.Input({
									value: "{mainView>Vpnpass}",
									placeholder: "Şifre"
								})
							]
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

			this._rebindTable(tableName, oEditableTemplate, modelName, "Edit");
		},

		onEditPress: function () {
			this._oSupplier = jQuery.extend({}, this.getView().getModel().getData().SupplierCollection[0]);
			this._toggleButtonsAndView(true);
		},

		onCancelPress: function () {
			var oModel = this.getView().getModel();
			var oData = oModel.getData();

			oData.SupplierCollection[0] = this._oSupplier;

			oModel.setData(oData);
			this._toggleButtonsAndView(false);
		},

		onSavePress: function () {
			this._toggleButtonsAndView(false);
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
			value = value.replace(/\?/g, "%3F");
			value = value.replace(/\&/g, "%25");
			value = value.replace(/\#/g, "%26");
			return value;
		}
	});

});