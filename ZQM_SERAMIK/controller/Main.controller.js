sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/Dialog","sap/ui/model/json/JSONModel","ZQM_SERAMIK/ZQM_SERAMIK/util/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,i,o,s,r){"use strict";var a=new sap.m.BusyDialog;var n=["Kontrol türü","Yaratma tarihi","Yaratma saati","Üretim yeri","Kaydedilecek miktar"];a.setText("İşlem sürüyor, lütfen bekleyiniz..");return e.extend("ZQM_SERAMIK.ZQM_SERAMIK.controller.Main",{_oView:null,formatter:o,onInit:function(){this._oView=this.getView();var e=this.getOwnerComponent().getModel();this.jsonMainModel=new i;this.jsonMainModel.setSizeLimit(1e4);this._oView.setModel(this.jsonMainModel,"mainView");this.methodQpListTest(e,this.jsonMainModel);this.methodFillColumnFilter(this.jsonMainModel)},methodQpListTest:function(e,t){a.open();e.read("/EtQpListSet",{success:function(e){t.setProperty("/qpList",e.results);a.close()},failed:function(e){a.close()}})},methodFillColumnFilter:function(e){var t=this.getView().byId("kontrolPartisiListesi");var i=t.getColumns();var o=[];for(var s in i){var r=i[s].getHeader().getText();var a={Name:r};o.push(a)}e.setProperty("/columns",o)},methodInspList:function(e){a.open();var t=this.getOwnerComponent().getModel();var i=this.getView().getModel("mainView");var o=[];var r;if(e){r=new s("IvPrueflos",sap.ui.model.FilterOperator.EQ,e);o.push(r)}a.open();var n=this;t.read("/EtInspListSet",{filters:o,success:function(t){i.setProperty("/inspList",t.results);i.setProperty("/kontrolPartiNo",e);a.close();n.openDialog("ZQM_SERAMIK.ZQM_SERAMIK.fragment.islemSecimi")},error:function(e){a.close()}})},methodInspDetail:function(e){a.open();var t=this.getOwnerComponent().getModel();var i=this.getView().getModel("mainView");var o=i.getProperty("/kontrolPartiNo");var r=[];var n;if(o){n=new s("IvPrueflos",sap.ui.model.FilterOperator.EQ,o);r.push(n)}if(e){n=new s("IvInspoper",sap.ui.model.FilterOperator.EQ,e);r.push(n)}a.open();t.read("/EtInspDetailSet",{filters:r,success:function(t){i.setProperty("/inspDetail",t.results);i.setProperty("/islemNo",e);a.close()},error:function(e){a.close()}})},methodMainTableSelected:function(e){var t=e.getSource();var i=t.getCells()[0].getText();this.methodInspList(i)},methodIslemTableSelected:function(e){var t=e.getSource();var i=t.getCells()[0].getText();this.methodInspDetail(i);this.getView().byId("iconTabBar").setSelectedKey("2");this.getView().byId("dialogTitle").setText("Test Seçiniz")},methodTestTableSelected:function(e){var t=this.getView().getModel("mainView");var i=e.getSource();var o=i.getCells()[0].getText();var s=i.getCells()[1].getText();var r=i.getCells()[2].getText();var a=t.getProperty("/kontrolPartiNo");var n=t.getProperty("/islemNo");this.closeDialog();var l=sap.ui.core.UIComponent.getRouterFor(this);l.navTo("detail",{kontrolPartiNo:a,islemNo:n,karakteristikNo:o,mstrChar:s,version:r})},onSearchKontrolPartiNo:function(e){var t=[];var i=e.getParameter("query");if(i){t.push(new s("Prueflos",r.Contains,i))}var o=this.byId("kontrolPartisiListesi");o.getBinding("items").filter(t)},selectEventIconTab:function(e){var t=e.getParameter("key");t=parseInt(t);switch(t){case 1:this.getView().byId("dialogTitle").setText("İşlem Seçiniz");break;case 2:this.getView().byId("dialogTitle").setText("Test Seçiniz");break}},onTableColumnFilter:function(e){var t=this.getView().byId("mainTableColumnFilter");var i=this.getView().byId("kontrolPartisiListesi");var o=this.getView().getModel("mainView");var s=[],r;jQuery.each(t.getSelectedContextPaths(),function(e,t){r=t.substr(9);s.push(r)});jQuery.each(i.getColumns(),function(e,t){if(s.includes(e.toString()))t.setVisible(false);else t.setVisible(true)});o.setProperty("/filterTabSelected",s);this.closeDialog()},onFilterButtonPressed:function(e){var t="ZQM_SERAMIK.ZQM_SERAMIK.fragment.mainTableColumn";var i=e.getSource();var o=this.getView().getModel("mainView").getProperty("/filterTabSelected");if(!this._oDialog){this._oDialog=sap.ui.xmlfragment(this.getView().getId(),t,this);this.getView().addDependent(this._oDialog);jQuery.sap.syncStyleClass("sapUiSizeCompact",this.getView(),this._oDialog)}this._oDialog.openBy(i);var s=this.getView().byId("mainTableColumnFilter");var r=s.getItems();jQuery.each(o,function(e,t){r[t].setSelected(true)})},onFilterClearPressed:function(e){var t=this.getView().byId("kontrolPartisiListesi");if(this._oDialog){this.closeDialog()}this.getView().getModel("mainView").setProperty("/filterTabSelected",null);jQuery.each(t.getColumns(),function(e,t){t.setVisible(true)})},openDialog:function(e){if(!this._oDialog){this._oDialog=sap.ui.xmlfragment(this.getView().getId(),e,this);this.getView().addDependent(this._oDialog);jQuery.sap.syncStyleClass("sapUiSizeCompact",this.getView(),this._oDialog)}this._oDialog.open()},onAfterRendering:function(){var e=this.getView().getModel("mainView");var t=this.getView().byId("kontrolPartisiListesi");var i=[];jQuery.each(t.getColumns(),function(t,o){if(n.includes(o.getHeader().getText())){o.setVisible(false);i.push(t);e.setProperty("/filterTabSelected",i)}})},closeDialog:function(){this._oDialog.destroy();delete this._oDialog}})});