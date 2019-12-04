jQuery.sap.require("ZPM_HASAR_BIL_REF.ZPM_HASAR_BIL_REF.util.formatter");

sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/HTML",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text",
	"sap/ui/commons/Link",
	"ZPM_HASAR_BIL_REF/util/formatter",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"sap/m/BusyDialog",
	"sap/ui/unified/FileUploaderParameter",
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog",
	"sap/m/MessageBox",
	"sap/ndc/BarcodeScanner"
], function (jQuery, Controller, UIComponent, History, JSONModel, HTML, Dialog, Button, Text, Link, formatter, Filter, MessageToast,
	BusyDialog, FileUploaderParameter, ValueHelpDialog, MessageBox, BarcodeScanner) {
	"use strict";

	///////////////////////////////////
	//		 Global Değişkenler	     //
	///////////////////////////////////

	var hasarno;
	var mode;

	var lokasyon_global;

	///////////////////////////////////
	//  Global Değişkenler - SoN	 //
	///////////////////////////////////	

	var dialogBusy = new sap.m.BusyDialog();
	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Controller.extend("ZPM_HASAR_BIL_REF.ZPM_HASAR_BIL_REF.controller.Detail", {

		//oGlobalBusyInd: null,
		//oGlobalBusyDialog: null,
		//_viewMainModel: null,
		//_oView: null,

		onExit: function () {

		},

		onInit: function () {

			this._oView = this.getView();

			var jsonModelView = this.getOwnerComponent().getModel("detailModelView"); //View lar arası kullanmak için modelleme
			var oModelData = this.getOwnerComponent().getModel(); //Sap den serviste dönen verilerin modeli
			this.getView().setModel(oModelData);

			//Birinci sayfadan yollanan değerler
			this.getOwnerComponent().getRouter().getRoute("post").attachPatternMatched(this._onObjectMatched, this);

			// Başlangıçta Comboboxları Doldur	
			this.methodHasarTurList(oModelData, jsonModelView);
		},

		// Main Ekranından Detail Ekranına GÖnderilen Veriler //
		_onObjectMatched: function (oEvent) {
			// var that = this;
			var jsonModelView = this.getOwnerComponent().getModel("detailModelView");
			var oModelData = this.getOwnerComponent().getModel(); //Sap den serviste dönen verilerin modeli
			var title;
			var sObjectHasarno = oEvent.getParameter("arguments").Hasarno;
			var sObjectMode = oEvent.getParameter("arguments").Mode;

			hasarno = sObjectHasarno;
			mode = sObjectMode;

			//++++++++++++//
			// Yeni Kayıt //
			//++++++++++++//
			if (mode === "N") {

				// Yeni Kayıt Açılırken Ekranı Temizle			
				jsonModelView.setProperty("/Mode", "N");
				jsonModelView.setProperty("/Hasarno", "");
				jsonModelView.setProperty("/Tarih", "");
				jsonModelView.setProperty("/Hasartur", "");
				jsonModelView.setProperty("/Lokasyon", "");
				jsonModelView.setProperty("/Lokasyontxt", "");
				jsonModelView.setProperty("/Aciklama", "");

				// Ekran Olayları
				title = "Yeni Hasar Bildir";
				jsonModelView.setProperty("/PageTitle", title);
				jsonModelView.setProperty("/KaydetButtonText", "Hasar Bildir");
				jsonModelView.setProperty("/KapatButtonText", "Kapat");

				// Edite Açık Gelsin
				jsonModelView.setProperty("/EditDetail", true);

				jsonModelView.setProperty("/VisibleKaydetButton", true);
				jsonModelView.setProperty("/VisibleKapatButton", true);

			} else {

				//Öneri Verisini Oku 

				this.ReadHasarBilSet(hasarno);

				if (mode === "C") {

					//++++++++++++++++//
					// Kayıt Görüntüle//
					//+++++++++++++++//
				} else if (mode === "D") {

					title = "Hasar Bilgilerini Görüntüleme";

					jsonModelView.setProperty("/PageTitle", title);
					jsonModelView.setProperty("/KaydetButtonText", "Görüntüle");
					jsonModelView.setProperty("/KapatButtonText", "Kapat");
					jsonModelView.setProperty("/EditOneriBilgileri", false);

					jsonModelView.setProperty("/VisibleKaydetButton", false);
					jsonModelView.setProperty("/VisibleKapatButton", true);

				}

			}

		},

		///////////////////////////	
		//		Comboboxlar		 //
		///////////////////////////		

		// 1-) Hasar Türü 
		methodHasarTurList: function (oModelData, jsonModelView) {

			dialogBusy.open();
			oModelData.read("/GetHasarTurSet", {
				success: function (resp) {
					jsonModelView.setProperty("/HasarTurList", resp.results);
					dialogBusy.close();
				},
				failed: function (resp) {
					dialogBusy.close();
				}
			});
		},

		handleHasarTurList: function (data) {
			var value;
			var jsonModelSelectData = this.getOwnerComponent().getModel("detailModelView");
			var oSelectedItem = this.byId("id_cb_hasartur").getSelectedItem();

			value = oSelectedItem.getKey();
			jsonModelSelectData.setProperty("/Hasartur", value);

		},

		///////////////////////////	
		// Comboboxlar - SoN	 //
		///////////////////////////		

		/////////////////	
		// Lokasyon SH //
		/////////////////	

		onValueHelpRequestLokasyon: function (oEvent) {

			lokasyon_global = oEvent.getSource();
			this._oDialog = sap.ui.xmlfragment("ZPM_HASAR_BIL_REF.ZPM_HASAR_BIL_REF.fragments.lokasyon", this);

			this.getView().addDependent(this._oDialog);

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},

		handleSearchLokasyon: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Lokasyontxt", sap.ui.model.FilterOperator.Contains, sValue.toLocaleUpperCase());
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleCloseLokasyon: function (oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {

				var LokasyontxtView = this.byId('id_lokasyon').getModel("detailModelView");
				var jsonModelSelectData = this.getOwnerComponent().getModel("detailModelView");

				var lokasyon = aContexts[0].getObject().Lokasyon;
				var lokasyontxt = aContexts[0].getObject().Lokasyontxt;

				// Kullanıcıya Fiori Ekranında Text Gösterilsin
				LokasyontxtView.setProperty("/Lokasyontxt", lokasyontxt);

				// Seçilen Key Arka Tarafta Kullanılmak Üzere Modele Atılsın
				jsonModelSelectData.setProperty("/Lokasyon", lokasyon);

			}

			oEvent.getSource().getBinding("items").filter([]);
		},

		////////////////////////	
		// Lokasyon SH  - SoN //
		////////////////////////

		///////////////////////////	
		//		Navigation		 //
		///////////////////////////	

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);

			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", {}, true);
			}

		},

		///////////////////////////	
		// Navigation - SoN		 //
		///////////////////////////	

		///////////////////////////	
		//		 Methodlar		 //
		///////////////////////////	

		handleLiveChangeAciklama: function (oEvent) {

			var sValue = oEvent.getParameter("value");
			// var sValue = oEvent.mParameters.newValue;

			var oViewModelAciklama = this.byId('id_ta_oneri_aciklama').getModel("detailModelView");
			oViewModelAciklama.setProperty("/Aciklama", sValue);
			var jsonModelView = this.getOwnerComponent().getModel("detailModelView");
			jsonModelView.setProperty("/Aciklama", sValue);

		},

		ReadHasarBilSet: function (hasarno) {
			var that = this;
			var jsonModelView = this.getOwnerComponent().getModel("detailModelView");
			var oModel = that.getOwnerComponent().getModel(); //sapden servısle donen verılerın modelı

			dialogBusy.open();
			oModel.read("/ReadHasarBilSet(IHasarno='" + hasarno + "')", {
				async: false,
				success: function (oData, response) {
					dialogBusy.close();

					// Ekrana Basılacak Reponse Verileri
					jsonModelView.setProperty("/Hasarno", oData.Hasarno);
					jsonModelView.setProperty("/Tarih", oData.Tarih);
					jsonModelView.setProperty("/Hasartur", oData.Hasartur);
					jsonModelView.setProperty("/Lokasyon", oData.Lokasyon);
					jsonModelView.setProperty("/Lokasyontxt", oData.Lokasyontxt);
					jsonModelView.setProperty("/Aciklama", oData.Aciklama);

					// Ekran Olayları
					jsonModelView.setProperty("/EditDetail", false);
					jsonModelView.setProperty("/EditDetail", false);

					// Eğer görüntülemeyi yapan öneri sahibi değil ise
					// Dokümanlar tabını gizle

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

		convertDate: function (date) {
			var str1 = date.split(".");
			var str3 = str1[2] + "-" + str1[1] + "-" + str1[0] + "T00:00";
			return str3;
		},

		//--------> Kaydet
		onPressSave: function (oEvent) {

			var that = this;
			var tarih;

			var jsonModelView = this.getOwnerComponent().getModel("detailModelView");
			var oModel = that.getOwnerComponent().getModel(); //Sap Verisi

			tarih = this.convertDate(this.getView().byId("id_tarih").getValue());

			var oInput = {};

			oInput.Tarih = tarih; //ADD
			oInput.Hasartur = jsonModelView.getProperty("/Hasartur"); //ADD
			oInput.Lokasyon = jsonModelView.getProperty("/Lokasyon"); //ADD
			oInput.Aciklama = this.getView().byId("id_ta_aciklama").getValue(); //ADD

			// Ekrandan Girilern Verinin Ön KOntrolleri

			//KONTROL-1
			if (oInput.Tarih === "" || oInput.Tarih === undefined || oInput.Tarih === null) {

				MessageToast.show("Tarih giriniz !", {
					duration: 3000,
					onClose: null
				});
				return false;
			}

			//KONTROL-2
			if (oInput.Hasartur === "" || oInput.Hasartur === undefined || oInput.Hasartur === null) {

				MessageToast.show("Hasar Tür Seçiniz !", {
					duration: 3000,
					onClose: null
				});
				return false;
			}

			// Ekrandan Girilern Verinin Ön KOntrolleri - SoN

			// Yeni Hasar Bildirimini  SAP'ye Gönder

			dialogBusy.open();
			oModel.create("/CreateHasarBilSet", oInput, {
				async: false,
				success: function (oData, response) {
					dialogBusy.close();
					if (oData.EHata === "X") {
						MessageBox.error(oData.EDurumTxt, {});
					} else {
						MessageToast.show(oData.EDurumTxt, {
							duration: 45000,
							onClose: null
						});

						// Ekrana Basılacak Reponse Verileri
						hasarno = oData.EHasarno;
						jsonModelView.setProperty("/Hasarno", oData.EHasarno);

						// Ekran Olayları
						jsonModelView.setProperty("/EditDetail", false);
						jsonModelView.setProperty("/VisibleKaydetButton", false);

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

		//--------> Kaydet - SoN

		///////////////////////////	
		//  Methodlar-SoN		 //
		///////////////////////////	

	});

});