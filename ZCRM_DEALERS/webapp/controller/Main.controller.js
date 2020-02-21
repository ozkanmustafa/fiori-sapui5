sap.ui.define([
	"./Base.controller",
	"sap/ui/model/json/JSONModel",
	"ZCRM_DEALERS/ZCRM_DEALERS/util/formatter",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function (Base, JSONModel, formatter, MessageToast, Filter, FilterOperator, Export, exportCSV) {
	"use strict";

	var dialogBusy = new sap.m.BusyDialog();

	var oModel,
		jsonModel;

	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Base.extend("ZCRM_DEALERS.ZCRM_DEALERS.controller.Main", {

		formatter: formatter,

		onInit: function () {
			dialogBusy.open();
			oModel = this.getOdataModel();
			jsonModel = new JSONModel();
			jsonModel.setSizeLimit(10000);
			jsonModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.setModel(jsonModel, "mainView");

			this.getKunnr();
			this.getStatus();
		},

		getData: function () {

			dialogBusy.open();

			var f = [];
			var filter;

			var kunnr = jsonModel.getProperty("/kunnr");
			var tarihF = jsonModel.getProperty("/tarihF");
			var tarihL = jsonModel.getProperty("/tarihL");
			var status = this.getById("statusCB").getSelectedKey();

			if (kunnr !== null && kunnr !== undefined) {
				filter = new Filter("ImKunnr", sap.ui.model.FilterOperator.EQ, kunnr);
				f.push(filter);
			}
			if (tarihF !== null && tarihF !== undefined) {
				filter = new Filter("ImTarihf", sap.ui.model.FilterOperator.EQ, tarihF);
				f.push(filter);
			}
			if (tarihL !== null && tarihL !== undefined) {
				filter = new Filter("ImTarihl", sap.ui.model.FilterOperator.EQ, tarihL);
				f.push(filter);
			}
			if (status === "") {
				filter = new Filter("ImStatus", sap.ui.model.FilterOperator.EQ, "-1");
				f.push(filter);
			}
			if (status !== "") {
				filter = new Filter("ImStatus", sap.ui.model.FilterOperator.EQ, status);
				f.push(filter);
			}

			oModel.read("/EtDealersSet", {
				filters: f,
				success: function (resp) {
					dialogBusy.close();
					jsonModel.setProperty("/dealersData", resp.results);
					jsonModel.refresh();
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Satıcı Verileri Çekilemedi!");
				}
			});
		},

		getKunnr: function () {
			oModel.read("/EtKunnrSet", {
				success: function (resp) {
					dialogBusy.close();
					jsonModel.setProperty("/kunnrData", resp.results);
					jsonModel.refresh();
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Satıcı Verileri Çekilemedi!");
				}
			});
		},

		getStatus: function () {
			var that = this;
			oModel.read("/EtStatusSet", {
				success: function (resp) {
					dialogBusy.close();
					jsonModel.setProperty("/statusData", resp.results);
					jsonModel.refresh();
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Statü Verileri Çekilemedi!");
				}
			});
			this.getById("statusCB").setSelectedKey("-1");
		},

		onChangeDate: function (oEvent) {
			jsonModel.setProperty("/tarihF", this._parseDate(oEvent.getParameter("from")));
			jsonModel.setProperty("/tarihL", this._parseDate(oEvent.getParameter("to")));
		},

		onValueHelpKunnr: function () {
			this.openDialog("ZCRM_DEALERS.ZCRM_DEALERS.view.fragments.KunnrSh");
		},

		onSearchKunnr: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Partner", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		onConfirmKunnr: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem"),
				oInput = this.byId("id_kunnr");

			if (oSelectedItem) {
				this.byId("id_kunnr").setValue(oSelectedItem.getTitle());
			}

			if (!oSelectedItem) {
				oInput.resetProperty("value");
			}
		},

		onExport: function () {
			// var aCols, oSettings;
			// var exceldata = jsonModel.getProperty("/dealersData");

			// aCols = this._createColums();

			// oSettings = {
			// 	workbook: {
			// 		columns: aCols
			// 	},
			// 	dataSource: exceldata, // view model den ekrandaki verileri data olarak göndermiş oluyoruz.
			// 	worker: false,
			// 	fileName: "export.xlsx"
			// };

			// new Spreadsheet(oSettings).build();

			// getting model into oModel variable.
			var aCols = this._createColums();

			var oExport = new Export({
				exportType: new exportCSV({
					// for xls....
					// fileExtension: "xls",
					// separatorChar: "\t",
					// charset: "utf-8",
					// mimeType: "application/vnd.ms-excel"

					// for CSV....
					// charset: "utf-8",
					// fileExtension: "csv",
					// separatorChar: ",",
					// mimeType: "application/csv"

					separatorChar: ";"
				}),
				models: jsonModel,

				rows: {
					path: "/dealersData"
				},
				columns: aCols
			});

			oExport.saveFile().catch(function (oError) {
				sap.m.MessageToast.show("Generate is not possible beause no model was set");
			}).then(function () {
				oExport.destroy();
			});
		},

		onSearch: function () {
			this.getData();
		},

		onReset: function () {
			jsonModel.setProperty("/kunnr", null);
			jsonModel.setProperty("/tarihF", null);
			jsonModel.setProperty("/tarihL", null);
			this.getById("statusCB").setSelectedKey("-1");
			this.getById("id_daterange").setDateValue(null);
		},

		_parseDate: function (oDate) {
			try {
				var oFormat = sap.ui.core.format.DateFormat.getInstance({
					pattern: "yyyy-MM-dd"
				});

				return oFormat.format(oDate);
				//var a = fValue.substring(6,19); 

				//var a = new Date(parseFloat(fValue.split("(")[1].split(")")[0]));
				//return oFormat.format(new Date(Number(a)));

			} catch (err) {
				MessageToast.show("Yanlış Tarih Tipi!");
				return null;
			}
		},

		_colsPush: function (aCols, property, label, typeS) {
			if (typeS === null)
				aCols.push({
					name: label,
					template: {
						content: property
					}
				});
			else
				aCols.push({
					name: label,
					template: {
						content: property
					}
				});
		},

		_createColums: function () {
			var aCols = [];
			this._colsPush(aCols, "{Must}", "Müşteri");
			this._colsPush(aCols, "{MustName1ZzprojePyp}", "Müşteri Adı");
			this._colsPush(aCols, "{ZzprojePyp}", "Proje PYP Numarası");
			this._colsPush(aCols, "{ObjectId}", "İşlem numarası");
			this._colsPush(aCols, "{Seviye}", "Proje seviyesi");
			this._colsPush(aCols, "{Description}", "Tanım");
			this._colsPush(aCols, "{Sorumlu}", "Sorumlu");
			this._colsPush(aCols, "{SorName1}", "Sorumlu Adı");
			this._colsPush(aCols, "{Status}", "Durum Kodu");
			this._colsPush(aCols, "{Txt30}", "Durum Tanım");
			this._colsPush(aCols, "{CurrPhase}", "Satış evresi");
			this._colsPush(aCols, "{Probability}", "Bşr.şansı (%)", "Number");
			this._colsPush(aCols, "{Importance}", "Öncelik");
			this._colsPush(aCols, "{Startdate}", "Başlangıç trh.", "date");
			this._colsPush(aCols, "{ExpectEnd}", "Kapanış tarihi", "date");
			this._colsPush(aCols, "{ExpRevenue}", "Beklenen stş.hslt.");
			this._colsPush(aCols, "{ExpWeightedRevenue}", "Ağrklndrlmş.bkln.SH");
			this._colsPush(aCols, "{BudgetBp}", "Btç.-olası mştr");
			this._colsPush(aCols, "{Currency}", "Para birimi");
			this._colsPush(aCols, "{Tdline}", "Metin satırı");
			this._colsPush(aCols, "{NumberInt}", "Kalem");
			this._colsPush(aCols, "{IstekPyp}", "İstek Proje PYP Numarası");
			this._colsPush(aCols, "{IstekSeviye}", "İstek Proje seviyesi");
			this._colsPush(aCols, "{IstekTanim}", "İstek PYP Tanım");
			this._colsPush(aCols, "{IstekStatus}", "Durum Kodu");
			this._colsPush(aCols, "{IstekTxt30}", "Durum Tanım");
			this._colsPush(aCols, "{AromaPyp}", "Aroma Proje Pyp Numarası");
			this._colsPush(aCols, "{AromaSeviye}", "Aroma Proje Seviyesi");
			this._colsPush(aCols, "{AromaTanim}", "Aroma Pyp Tanım");
			this._colsPush(aCols, "{AromaStatus}", "Durum Kodu");
			this._colsPush(aCols, "{AromaTxt30}", "Durum Tanım");
			this._colsPush(aCols, "{ZzsonrakiAdim}", "Sonraki Adım");
			this._colsPush(aCols, "{ZzprojeTuru}", "Proje Türü");
			this._colsPush(aCols, "{ZzmusteriAdi}", "Müşteri  Proje Adı");
			this._colsPush(aCols, "{ZzmusteriBuyuk}", "Müşteri Büyüklüğü");
			this._colsPush(aCols, "{ZzsatisaDonus}", "Satışa Dönüştürme");
			this._colsPush(aCols, "{Zzlikelihd}", "Satışa Dnş. Olaslk.", "Number");
			this._colsPush(aCols, "{ZzgonderKisi}", "Gönderilen Kişi");
			this._colsPush(aCols, "{ZzgondermeSekli}", "Gönderme Şekli");
			this._colsPush(aCols, "{ZzkargoOdemesi}", "Kargo Gönderisi");
			this._colsPush(aCols, "{ZzmstriFZiyrti}", "Müşteri Fab Ziyareti");
			this._colsPush(aCols, "{ZznumuneBedeli}", "Numune Bedeli");
			this._colsPush(aCols, "{Zzproaktif}", "Proaktif");
			this._colsPush(aCols, "{Zztnyillik}", "Yıllık satış miktarı");
			this._colsPush(aCols, "{Zzfld000056}", "Yıllık sat (Miktar)", "Currency");
			this._colsPush(aCols, "{ZztahRmcBrm}", "Tahmini Rmc Para Bir");
			this._colsPush(aCols, "{Zzfld00000a}", "Tahmini Rm (Pr.birim", "Currency");
			this._colsPush(aCols, "{ZzteslimSuresi}", "Teslim Süresi");
			this._colsPush(aCols, "{Zzdatum}", "Teslim Tarihi", "date");
			this._colsPush(aCols, "{ZzargeOncelik}", "ARGE Öncelik");
			this._colsPush(aCols, "{ZzaromaOzellik}", "Aroma özelliği");
			this._colsPush(aCols, "{ZzbitmisUrun}", "Bitmiş Ürün Kodu");
			this._colsPush(aCols, "{ZzbtmsUrunIstk}", "Bitmiş Ürün İsteği");
			this._colsPush(aCols, "{ZzbtmsUrunAdet}", "Bitmiş ürün adet");
			this._colsPush(aCols, "{ZzbuRecete}", "B.Ü. Reçete");
			this._colsPush(aCols, "{Zzcozunurluk}", "Çözünürlük");
			this._colsPush(aCols, "{ZzmalzKodu}", "Malzeme Kodu");
			this._colsPush(aCols, "{ZzfizikDurum}", "Fiziksel Durum");
			this._colsPush(aCols, "{Zzalternatif}", "Alternatif");
			this._colsPush(aCols, "{ZzistnnArmMik}", "İstenen Aroma Miktar");
			this._colsPush(aCols, "{Zzfld00000p}", "İstenen Ar (Miktar)");
			this._colsPush(aCols, "{AromaAdet}", "NUM");
			this._colsPush(aCols, "{ZzkodAciklama}", "Girilen Kod Açıklama");
			this._colsPush(aCols, "{Zzmod}", "Mod");
			this._colsPush(aCols, "{ZznumuneTipi}", "İstenen Numune Tipi");
			this._colsPush(aCols, "{ZzsinifIstegi}", "Sınıf İsteği");
			this._colsPush(aCols, "{Zzsinif1}", "Sınıf 1");
			this._colsPush(aCols, "{Zzsinif2}", "Sınıf 2");
			this._colsPush(aCols, "{ZzurunBazi}", "Ürün Bazı");
			this._colsPush(aCols, "{ZzurunOz}", "Ur.Oz(tuz, briks)");
			this._colsPush(aCols, "{Zzuygulama}", "Uygulama");
			this._colsPush(aCols, "{ZzuyguAlani}", "Uygulama Alanı");
			this._colsPush(aCols, "{Zztanimuyg}", "Uygulama alanı tanım");
			this._colsPush(aCols, "{Kdgrp}", "Müşteri grubu");
			this._colsPush(aCols, "{ZzalkolYuzde}", "Alkol %", "Number");
			this._colsPush(aCols, "{ZzaromasizBaz}", "Aromasız baz ismi");
			this._colsPush(aCols, "{ZzasitAralik}", "Asit Aralığı");
			this._colsPush(aCols, "{ZzasitTipi}", "Asit Tipi");
			this._colsPush(aCols, "{ZzboyaTipi}", "Boya Tipi");
			this._colsPush(aCols, "{ZzbrixAralik}", "Brix aralığı");
			this._colsPush(aCols, "{ZzbtmsAmbTip}", "Bitmiş Ürün Amb. Tip");
			this._colsPush(aCols, "{ZzbuSureSicak}", "BÜ pişirme süre-sıck");
			this._colsPush(aCols, "{ZzbuSutDoz}", "BÜ süt dozajı");
			this._colsPush(aCols, "{Zzkoruyucu}", "Koruyucu");
			this._colsPush(aCols, "{ZzmeyveYuzde}", "Meyve %", "Number");
			this._colsPush(aCols, "{ZznumuneAmbTip}", "Numune ambalaj tipi");
			this._colsPush(aCols, "{Zzpastorizasyon}", "Pastörizasyon");
			this._colsPush(aCols, "{ZzphAralik}", "PH aralığı");
			this._colsPush(aCols, "{ZzpulpYuzde}", "Pulp %", "Number");
			this._colsPush(aCols, "{ZzsosAmbTip}", "SOS Ambalaj Tipi");
			this._colsPush(aCols, "{ZzsosOzellik}", "SOS Özelliği");
			this._colsPush(aCols, "{ZzsosTipi}", "SOS Tipi");
			this._colsPush(aCols, "{ZzsosUygZmn}", "SOS uygulama zamanı");
			this._colsPush(aCols, "{ZzsuAktivitesi}", "Su Aktivitesi");
			this._colsPush(aCols, "{ZztatlanCesit}", "Tatlandırıcı çeşidi");
			this._colsPush(aCols, "{Zzvizkozite}", "Viskozite ve Ölçüm");

			return aCols;
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