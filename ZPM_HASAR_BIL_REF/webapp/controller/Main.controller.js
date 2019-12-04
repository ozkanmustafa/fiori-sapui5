jQuery.sap.require("ZPM_HASAR_BIL_REF.ZPM_HASAR_BIL_REF.util.formatter");

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
	"sap/m/BusyDialog",
	"sap/m/Button",
	"sap/m/Text",
	"ZPM_HASAR_BIL_REF/util/formatter",
	"sap/m/Dialog",
	"sap/m/List",
	"sap/m/StandardListItem",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel"
], function(Controller, UIComponent, MessageToast, BusyDialog, Button, Text, formatter, Dialog, List, StandardListItem, BusyIndicator,
	MessageBox, Filter, JSONModel) {
	"use strict";
	
///////////////////////////////////
//		 Global Değişkenler	     //
///////////////////////////////////


	var dialogBusy = new sap.m.BusyDialog();
	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");
///////////////////////////////////
//  Global Değişkenler - SoN	 //
///////////////////////////////////

	return Controller.extend("ZPM_HASAR_BIL_REF.ZPM_HASAR_BIL_REF.controller.Main", {
		
		oGlobalBusyInd: null,
		oGlobalBusyDialog: null,
		_viewMainModel: null,
		_oView: null,
		formatter: formatter,
		
		onInit: function () {

			this._oView = this.getView();
			this.oModelData = this.getOwnerComponent().getModel();
			this.oModelData.setSizeLimit(10000);
			this.jsonMainModel = new JSONModel();
			this.jsonMainModel.setSizeLimit(10000);
			this._oView.setModel(this.jsonMainModel, "mainView");
			this.initControl();
			
		// Başlangıçta Comboboxları Doldur	
		 this.methodHasarTurList(this.oModelData, this.jsonMainModel);	



		},
		
		
		
		
		initControl: function() {
	 	
		//ekran begda sı ve endda sı sy-datum olacak.
			var a = new Date();
			// value format yyyy-MM-dd
			var date = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
			
			this.jsonMainModel.setProperty("/Begda", date);
			this.jsonMainModel.setProperty("/Endda", date);


		},
		
		
		

///////////////////////////	
//		Comboboxlar		 //
///////////////////////////		
		
		// 1-) Hasar Türü 
		methodHasarTurList: function(oModelData, jsonModelView) {


			dialogBusy.open();
			oModelData.read("/GetHasarTurSet", {
				success: function(resp) {
					jsonModelView.setProperty("/HasarTurList", resp.results);
				dialogBusy.close();
				},
				failed: function(resp) {
				dialogBusy.close();
				}
			});
		},

		handleHasarTurList: function(data) {
			var value;
			var jsonModelSelectData = this.getOwnerComponent().getModel("mainView");
			var oSelectedItem = this.byId("id_cb_hasartur").getSelectedItem();

			value = oSelectedItem.getKey();
			jsonModelSelectData.setProperty("/Hasartur", value);

		},	
		
		
		
		
	
		

///////////////////////////	
// Comboboxlar - SoN	 //
///////////////////////////			
		
		
	
	
	
	
	
///////////////////////////	
//		Methodlar		 //
///////////////////////////		
	


		GetHasarBilTable: function() {
			
			var oModel = this.getOwnerComponent().getModel();
			var jsm  =  this.getView().getModel("mainView");
		
	
			
			var hasartur = jsm.getProperty("/Hasartur");



			var f = [];
			var filter;

		

			if (hasartur) {
				filter = new Filter("IHasartur", sap.ui.model.FilterOperator.EQ, hasartur);
				f.push(filter);
			}






			var begda = this.byId("id_begda").getValue(); //t.jsonModel.getProperty("/begda"); // + "T00:00:00";



			var a = begda.split("-");
			var b = a[1].length;
			var c = a[2].length;
			if (b === 1 && c === 1) {
				begda = a[0] + "-0" + a[1] + "-0" + a[2];
			} else if (c === 1) {
				begda = a[0] + "-" + a[1] + "-0" + a[2];
			} else if (b === 1) {
				begda = a[0] + "-0" + a[1] + "-" + a[2];
			}
			if (begda) {
				filter = new Filter("IBegda", sap.ui.model.FilterOperator.EQ, begda);
				f.push(filter);
			}
		

		
			var endda = this.byId("id_endda").getValue(); //t.jsonModel.getProperty("/endda"); // + "T00:00:00";

			a = endda.split("-");
			b = a[1].length;
			c = a[2].length;
			if (b === 1 && c === 1) {
				endda = a[0] + "-0" + a[1] + "-0" + a[2];
			} else if (c === 1) {
				endda = a[0] + "-" + a[1] + "-0" + a[2];
			} else if (b === 1) {
				endda = a[0] + "-0" + a[1] + "-" + a[2];
			}
			if (endda) {
				filter = new Filter("IEndda", sap.ui.model.FilterOperator.EQ, endda);
				f.push(filter);
			}
			
			
			

			dialogBusy.open();
			
		
			
			oModel.read("/GetHasarBilTableSet", {
			filters: f,
			success: function(oData, resp) {
			jsm.setProperty("/GetHasarBilTable", oData.results);  

					dialogBusy.close();
				},
				failed: function(resp) { 
					dialogBusy.close();
				}
			});
			
		},
	
///////////////////////////	
//	Methodlar - SoN		 //
///////////////////////////	
	
	
	
	
///////////////////////////	
//		Navigation		 //
///////////////////////////	


		navToDetail: function(t) {

			var that = this;
			var router = UIComponent.getRouterFor(that);
			var a = t.getSource();
			var mode = "D";
			
		
		debugger;	
	
			// if (a.getId().split("--")[2] === "New_Button") {
			// 	mode = "N";
			// } else if (a.getId().split("--")[2] === "Change_Button") {
			// 	mode = "C";
			// } else if (a.getId().split("--")[2] === "Display_Button") {
			// 	mode = "D";
			// } else if (a.getId().split("--")[2] === "Puanlar_Button") {
			// 	mode = "P";	
		
			// } 
			
				
			if ( a.getId() === "__xmlview0--New_Button") {
				mode = "N";
			} else if (a.getId() === "__xmlview0--Display_Button") {
				mode = "D";
			} 
			

				
							
		

			// YENİ HASAR BİLDİRİMİ
			if (mode === "N") {
			
				var hasarno = "00";
				router.navTo("post", {	Hasarno: hasarno, Mode: mode  });
				
			}
			
			
			// HASAR BİLDİRİMİ GÖRÜNTÜLEME
			else {
				var table = this.getView().byId("id_tbl1");
				var item = table.getSelectedItem();
				if (item === null) { //satır seçmeden devam edemesin
					MessageToast.show("Görüntüleme yapmak istediğiniz hasar bildirimini seçiniz !", {});
					return;
				} else {

				hasarno = item.getCells()[0].getText();
				
				router.navTo("post", {	Hasarno: hasarno, Mode: mode  });


				}
			}
			
			


		}
		
		
		

///////////////////////////	
// Navigation - SoN		 //
///////////////////////////	
	
	
	

		
		
		


	});
});