sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"ZSD_MAKINA_SEVK/ZSD_MAKINA_SEVK/util/formatter",
	"sap/m/Dialog",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/format/DateFormat"
], function (Controller, formatter, Dialog, JSONModel, Filter, FilterOperator, History, MessageToast, MessageBox, DateFormat) {
	"use strict";

	var barkodlar = [];
	var seriKontrol = false;
	var tarih;
	var globalBMiktar;
	var dialogBusy = new sap.m.BusyDialog();
	dialogBusy.setText("İşlem sürüyor, lütfen bekleyiniz..");

	return Controller.extend("ZSD_MAKINA_SEVK.ZSD_MAKINA_SEVK.controller.Detail", {

		_oView: null,
		formatter: formatter,

		onInit: function () {
			var that = this;
			dialogBusy.open();
			this._oView = this.getView();
			this.jsonMainModel = new JSONModel();
			this.jsonMainModel.setSizeLimit(10000);
			this._oView.setModel(this.jsonMainModel, "detailView");
			this._oView.addEventDelegate({
				onAfterShow: function (oEvent) {
					that.jsonMainModel.refresh();
				}
			}, that._oView);
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("detail").attachMatched(this._onDetailMatched, this);
		},

		_onDetailMatched: function (oEvent) {
			var jsonModel = this.getView().getModel("detailView");
			var belgeNo = oEvent.getParameter("arguments").belgeNo;

			jsonModel.setProperty("/belgeNo", belgeNo);

			var oModel = this.getOwnerComponent().getModel();
			this.methodGetTeslimatListItemsSet(oModel, belgeNo);
		},

		methodGetTeslimatListItemsSet: function (oModel, belgeNo) {
			dialogBusy.open();
			var jsonModel = this.getView().getModel("detailView");
			var malCikisCheck = true;
			var f = [];
			var filter;

			if (belgeNo) {
				filter = new Filter("IvVbeln", sap.ui.model.FilterOperator.EQ, belgeNo);
				f.push(filter);
			}

			oModel.read("/EtTeslimatListItemsSet", {
				filters: f,
				success: function (resp) {
					dialogBusy.close();
					if (resp.results.length > 0) {
						jsonModel.setProperty("/teslimatListItems", resp.results);
						jQuery.each(resp.results, function (id, item) {
							if (parseFloat(item.Lfimg) > parseFloat(item.Lfimg2)) {
								malCikisCheck = false;
								jsonModel.setProperty("/mal_cikisi", null);
								return false;
							}
						});
						if (malCikisCheck) {
							jsonModel.setProperty("/mal_cikisi", true);
						}
						jsonModel.refresh();
					} else {
						MessageToast.show("Bir Hata Oluştu");
					}
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Bir Hata Oluştu");
				}
			});
		},

		methodBarkodRead: function (oEvent) {
			var value = oEvent.getParameter("value");
			if (value === "" || value === undefined || value === null)
				return false;
			dialogBusy.open();
			var jsonModel = this.getView().getModel("detailView");
			var oModel = this.getOwnerComponent().getModel();

			var barkod = jsonModel.getProperty("/barkod");

			var f = [];
			var filter;

			if (barkod) {
				filter = new Filter("IvBarkod", sap.ui.model.FilterOperator.EQ, barkod);
				f.push(filter);
			} else {
				MessageToast.show("Barkod No Boş");
				return false;
			}

			var that = this;
			globalBMiktar = "";
			oModel.read("/EtBarkodReadSet(IvBarkod='" + barkod + "')", {
				success: function (resp) {
					if (resp.EvReturn === 'OK') {
						jsonModel.setProperty("/okunanBarkod", resp);
						jsonModel.setProperty("/malzeme", resp.Matnr);
						jsonModel.setProperty("/parti", resp.Charg);
						jsonModel.setProperty("/seriNo", resp.Sernr);
						jsonModel.setProperty("/Mengeedt", resp.Menge);
						//09012020 barkod tablosundan dönen miktardan fazla giremez kontrolü
						globalBMiktar = resp.Menge;
						that.methodListeyeEkle(jsonModel);
						jQuery.sap.delayedCall(500, that, function () {
							that.getView().byId("id_teslimat_yukle").focus();
						});

					} else {
						MessageToast.show(resp.EvReturn);
						that.methodClearFormInputs();
						dialogBusy.close();
					}
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Bir Hata Oluştu");
				}
			});
		},

		methodTeslimatIndirConfirm: function () {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.show(
				"İndirmek İstediğinize Emin Misiniz?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					icon: MessageBox.Icon.QUESTION,
					title: "Uyarı",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.YES) {
							that.methodTeslimatIndir();

						} else {
							that.methodClearFormInputs();
						}
					}
				}
			);
		},

		methodTeslimatIndir: function () {

			dialogBusy.open();
			var oModel = this.getOwnerComponent().getModel();
			var jsonModel = this.getView().getModel("detailView");
			var okunanBarkod = jsonModel.getProperty("/okunanBarkod");
			var belgeNo = jsonModel.getProperty("/belgeNo");
			var liste = jsonModel.getProperty("/teslimatListItems");
			var bFlag = false;
			var that = this;

			var miktar = 0.000;
			var miktar_txt = that.byId("id_miktar_edt").getValue();
			miktar = parseFloat(miktar_txt);

			jQuery.each(liste, function (id, item) {
				if (item.Posid === okunanBarkod.Posid && item.Matnr === okunanBarkod.Matnr && item.Lfimg2 > 0) {

					if (parseFloat(item.Lfimg) < miktar) {
						MessageToast.show("Silenen Miktar Teslimat Miktarından Fazla!");
						dialogBusy.close();
						this.methodClearFormInputs();
						return false;
					} else {
						bFlag = true;
						return false;
					}

				}
			});

			if (bFlag) {
				oModel.read(
					"/EtTesIndirSet(IvCharg='" + okunanBarkod.Charg + "',IvMatnr='" + okunanBarkod.Matnr + "',IvVbeln='" + belgeNo +
					"',IvBarcd='" + okunanBarkod.Barcd + "',IvSernr='" + okunanBarkod.Sernr + "',IvRfmng=" + miktar + "m)", {
						success: function (resp) {
							if (resp.EvReturn === 'OK') {
								MessageToast.show("Teslimat İndirildi");
								jsonModel.setProperty("/okunanItem", null);
								jQuery.each(liste, function (id, item) {
									if (item.Posnr === resp.EvPosnr) {
										jsonModel.setProperty("/mal_cikisi", null);
										//item.Lfimg2 = parseFloat(item.Lfimg2) - parseFloat(1);
										item.Lfimg2 = parseFloat(item.Lfimg2) - miktar;
										jsonModel.refresh();
										return false;
									}
								});
							} else {
								MessageToast.show(resp.EvReturn);
							}
							dialogBusy.close();
						},
						error: function (resp) {
							that.methodClearFormInputs();
							dialogBusy.close();
							var error = String(JSON.parse(resp.responseText).error.message.value);
							MessageToast.show(error, {});
							// MessageToast.show("Bir Hata Oluştu");
						}
					});
			} else {
				MessageToast.show("Bu Barkod Daha Önce Yüklenmemiş");
				dialogBusy.close();
			}
			this.methodClearFormInputs();

		},

		methodClearFormInputs: function (oEvent) {
			var jsonModel = this.getView().getModel("detailView");

			jsonModel.setProperty("/okunanItem", null);
			jsonModel.setProperty("/barkod", null);
			jsonModel.setProperty("/malzeme", null);
			jsonModel.setProperty("/parti", null);
			jsonModel.setProperty("/seriNo", null);
			jsonModel.setProperty("/teslimat_yuklenme", null);
			jsonModel.setProperty("/Mengeedt", null);

			jsonModel.refresh();
		},

		methodTeslimatYukle: function () {
			dialogBusy.open();
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			var jsonModel = this.getView().getModel("detailView");
			var okunanItem = jsonModel.getProperty("/okunanItem");
			var okunanBarkod = jsonModel.getProperty("/okunanBarkod");
			var liste = jsonModel.getProperty("/teslimatListItems");
			var bItemKontrol = true;

			var miktar = 0.000;
			var miktar_txt = that.byId("id_miktar_edt").getValue();
			var miktar = parseFloat(miktar_txt);

			if (isNaN(miktar) === true) {
				miktar = 0;
			}

			if (miktar > parseFloat(globalBMiktar)) {
				MessageToast.show("Barkod içersindeki miktar aşılmıştır!");
				dialogBusy.close();
				return false;
			}

			// var 

			jQuery.each(liste, function (id, item) {
				if (item.Posid === okunanBarkod.Posid && item.Matnr === okunanBarkod.Matnr && parseFloat(item.Lfimg) > item.Lfimg2) {

					if (parseFloat(item.Lfimg) - parseFloat(item.Lfimg2) < miktar) {
						MessageToast.show("Yüklenen miktar teslimat açık miktarından fazla!");
						dialogBusy.close();
						this.methodClearFormInputs();
						return false;
					} else {
						bItemKontrol = false;
						return false;
					}
				}
			});

			if (bItemKontrol) {
				MessageToast.show("Daha Fazla Yükleme Yapılamaz");
				dialogBusy.close();
				this.methodClearFormInputs();
			} else {
				dialogBusy.open();
				oModel.read(
					"/EtTesYukleSet(Barcd='" + okunanItem.Barcd + "',Charg='" + okunanItem.Charg + "',Lfimg='" + okunanItem.Lfimg +
					"',Lfimg2='" +
					okunanItem.Lfimg2 + "',Matnr='" + okunanItem.Matnr + "',Posid='" + okunanItem.Posid + "',Posnr='" + okunanItem.Posnr +
					"',Sernr='" + okunanItem.Sernr + "',Uecha='" + okunanItem.Uecha + "',Vbeln='" +
					okunanItem
					.Vbeln + "',Vrkme='" + okunanItem.Vrkme.toString() + "',Menge=" + miktar + ")", {
						success: function (resp) {
							if (resp.EvReturn === 'OK') {
								jQuery.sap.delayedCall(500, this, function () {
									that.methodTeslimatCek(oModel, jsonModel, okunanItem, liste);
								});
							} else {
								MessageToast.show(resp.EvReturn);
							}
							dialogBusy.close();
						},
						error: function (resp) {
							dialogBusy.close();
							MessageToast.show("Bir Hata Oluştu");
						}
					});
			}
		},

		methodTeslimatCek: function (oModel, jsonModel, okunanItem, liste) {
			var that = this;

			dialogBusy.open();
			var malCikisCheck;

			var belgeNo = jsonModel.getProperty("/belgeNo");

			var miktar = 0.000;
			var miktar_txt = this.byId("id_miktar_edt").getValue();
			var miktar = parseFloat(miktar_txt);

			if (isNaN(miktar) === true) {
				miktar = 0;
			}

			oModel.read(
				"/EtTesCekSet(Barcd='" + okunanItem.Barcd + "',Charg='" + okunanItem.Charg + "',Lfimg='" + okunanItem.Lfimg +
				"',Lfimg2='" +
				okunanItem.Lfimg2 + "',Matnr='" + okunanItem.Matnr + "',Posid='" + okunanItem.Posid + "',Posnr='" + okunanItem.Posnr +
				"',Sernr='" + okunanItem.Sernr + "',Uecha='" + okunanItem.Uecha + "',Vbeln='" +
				okunanItem
				.Vbeln + "',Vrkme='" + okunanItem.Vrkme.toString() + "',Menge=" + miktar + ")", {
					success: function (resp) {
						if (resp.EvReturn === 'OK') {
							jQuery.each(liste, function (id, item) {
								if (item.Posid === okunanItem.Posid && item.Matnr === okunanItem.Matnr && item.Lfimg > item.Lfimg2) {
									//08012020 tarihinde miktar alanı eklendi. Artık açılan alanda ki miktar ile güncellenecek.
									//item.Lfimg2 = parseFloat(item.Lfimg2) + parseFloat(1);
									item.Lfimg2 = parseFloat(item.Lfimg2) + miktar;
									return false;
								}
							});
							jQuery.each(liste, function (id, item) {
								if (parseFloat(item.Lfimg) > parseFloat(item.Lfimg2)) {
									malCikisCheck = false;
									jsonModel.setProperty("/mal_cikisi", null);
									return false;
								}
							});
							if (malCikisCheck == true) {
								jsonModel.setProperty("/mal_cikisi", true);
							}
							dialogBusy.close();
							
							jQuery.sap.delayedCall(500, that, function () {
								that.methodGetTeslimatListItemsSet(oModel, belgeNo);
							});
							jsonModel.refresh();
							MessageToast.show("Teslimat Yüklendi");
						} else {
							dialogBusy.close();
							MessageToast.show(resp.EvReturn);
						}
						dialogBusy.close();
						jsonModel.refresh();
					},
					error: function (resp) {
						dialogBusy.close();
						MessageToast.show("Bir Hata Oluştu");
					}
				});
			this.methodClearFormInputs();
		},

		methodSeriKontrolConfirm: function () {
			var that = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.show(
				"Yüklemek İstediğinize Emin Misiniz?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					icon: MessageBox.Icon.QUESTION,
					title: "Uyarı",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (sAnswer) {
						if (sAnswer === MessageBox.Action.YES) {
							that.methodSeriKontrol();
						} else {
							that.methodClearFormInputs();
						}
					}
				}
			);
		},

		methodSeriKontrol: function () {

			var oModel = this.getOwnerComponent().getModel();
			var jsonModel = this.getView().getModel("detailView");
			var barkod = jsonModel.getProperty("/okunanBarkod");
			var that = this;
			if (barkod.Sernr === null || barkod.Sernr === "") {
				that.methodTeslimatYukle();
			} else {
				oModel.read("/EtSeriNoKontrolSet(IvMatnr='" + barkod.Matnr + "',IvSernr='" + barkod.Sernr + "')", {
					success: function (resp) {
						if (resp.EvReturn === 'OK') {
							seriKontrol = true;
							that.methodTeslimatYukle();
						} else {
							seriKontrol = false;
							MessageToast.show(resp.EvReturn);
							that.methodClearFormInputs();
							dialogBusy.close();
						}
					},
					error: function (resp) {
						that.methodClearFormInputs();
						dialogBusy.close();
						MessageToast.show("Bir Hata Oluştu");
					}
				});
			}
		},

		methodListeyeEkle: function (jsonModel) {
			var that = this;
			var barkod = jsonModel.getProperty("/okunanBarkod");
			var liste = jsonModel.getProperty("/teslimatListItems");
			var bFlag1 = false;
			var bFlag2 = false;

			jQuery.each(liste, function (id, item) {
				if (item.Posid === barkod.Posid && item.Matnr === barkod.Matnr) {
					bFlag1 = true;
					return false;
				}
			});
			if (bFlag1) {
				jQuery.each(liste, function (id, listItem) {
					//09012020 okutulan barkod ile posid ve matnr eşitse işlem yapacağız
					//Yukarıda eşit olan satırı bulunmuş. Bu satır veya satırlara veri atamıyorsa 
					//hata vereceğiz.
					if (listItem.Posid === barkod.Posid && listItem.Matnr === barkod.Matnr) {
						if ((parseFloat(listItem.Lfimg) - listItem.Lfimg2) > 0) {
							var temp = {
								Arktx: listItem.Arktx,
								Barcd: barkod.Barcd,
								Charg: barkod.Charg,
								IvVbeln: listItem.Vbeln,
								Lfimg: (parseFloat(listItem.Lfimg) - parseFloat(listItem.Lfimg2)).toString(),
								Lfimg2: (parseFloat(listItem.Lfimg2) + parseFloat(1)).toString(),
								Matnr: listItem.Matnr,
								Posid: listItem.Posid,
								Posnr: listItem.Posnr,
								Posnr2: listItem.Posnr2,
								PsPspPnr: listItem.PsPspPnr,
								Sernr: barkod.Sernr,
								Uecha: listItem.Uecha,
								Vbeln: listItem.Vbeln,
								Vrkme: listItem.Vrkme
							};
							jsonModel.setProperty("/okunanItem", temp);
							MessageToast.show("Barkod Okutma Başarılı");

							jsonModel.setProperty("/teslimat_yuklenme", true);
							bFlag2 = true;
							return false;
						}
					}
				});
				if (!bFlag2) {
					jsonModel.setProperty("/teslimat_yuklenme", true);
					MessageToast.show("Barkod Okutma Başarılı");
				}
			} else {
				MessageToast.show("Okutulan Barkod Bu Siparişle İlişkili Değil");
				that.methodClearFormInputs();
			}
			dialogBusy.close();
		},

		methodMalCikisiConfirm: function () {
			var that = this;
			var today = new Date();
			tarih = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			var oDate = new sap.m.DatePicker({
				value: tarih,
				valueFormat: "yyyy-MM-dd",
				displayFormat: "short"
			});
			oDate.attachChange(this.onValueChangeMalCikisTarihi);
			var box = new sap.m.VBox({
				items: [
					oDate
				]
			});

			var rb = sap.ui.getCore().getLibraryResourceBundle("sap.m");
			rb.aPropertyFiles[0].mProperties["MSGBOX_YES"] = "Onayla";
			rb.aPropertyFiles[0].mProperties["MSGBOX_NO"] = "İptal";

			sap.m.MessageBox.show(
				box, {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Fiili Mal Çıkış Tarihi",
					valueFormat: "dd.MM.yyyy",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							that.methodMalCikisi();
						} else {
							that.methodClearFormInputs();
						}
					}
				}
			);
		},

		methodMalCikisi: function () {
			dialogBusy.open();
			var oModel = this.getOwnerComponent().getModel();
			var jsonModel = this.getView().getModel("detailView");
			var belgeNo = jsonModel.getProperty("/belgeNo");
			var tempDate = new Date(tarih);

			var f = [];
			var filter;

			if (belgeNo) {
				filter = new Filter("IvVbeln", sap.ui.model.FilterOperator.EQ, belgeNo);
				f.push(filter);
			}
			if (tempDate) {
				filter = new Filter("IvDate", sap.ui.model.FilterOperator.EQ, tempDate);
				f.push(filter);
			}
			oModel.read("/EtMalCikisSet", {
				filters: f,
				success: function (resp) {
					if (resp.results[0].Message === 'OK') {
						MessageToast.show("Mal Çıkışı Yapıldı");
						jsonModel.setProperty("/mal_cikisi", null);
						dialogBusy.close();
					} else {
						MessageToast.show(resp.results[0].Message);
						dialogBusy.close();
					}
					jsonModel.refresh();
				},
				error: function (resp) {
					dialogBusy.close();
					MessageToast.show("Hata Oluştu");
				}
			});

		},

		methodNavToBarkodlar: function (oEvent) {
			var jsonModel = this.getView().getModel("detailView");
			var sID = oEvent.getSource().getBindingContextPath();

			var selectedItem = jsonModel.getProperty(sID);
			var belgeNo = jsonModel.getProperty("/belgeNo");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("barkodlar", {
				posnr: selectedItem.Posnr,
				belgeNo: belgeNo
			});
		},

		onValueChangeMalCikisTarihi: function (oEvent) {
			tarih = oEvent.getParameter("value");
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