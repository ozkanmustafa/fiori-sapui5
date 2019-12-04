sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ZPM_HASAR_BIL_REF/ZPM_HASAR_BIL_REF/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ZPM_HASAR_BIL_REF.ZPM_HASAR_BIL_REF.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
	//Uygulamadan Çıkıp Launchpad İçinde Başka Bir Uygulama Sonrası
//Uygulamaya Geri Döndüğünde Detail Sayfasına Navigate Olmuyordu
//BU Sebepten Dolayı Destroy Yazıldı.
		destroy: function() {

			if (this.oRouteHandler) {
				this.oRouteHandler.destroy();
			}

			sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);

			var det3 = this._routeHandler.destroy();
			det3.destroy();
			//delete det3;
			/*if (this.getRouter()) {
				this.getRouter().destroy();
			}*/

			//UIComponent.prototype.destroy.apply(this, arguments);

		},	 
		 
		 
		 
		 
		init: function () {
			jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
			jQuery.sap.require("sap.ui.core.routing.HashChanger");

			sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
			this._router = this.getRouter();
			this._routeHandler = new sap.m.routing.RouteMatchedHandler(this._router);

			this._router.initialize();

			// call the base component's init function
			/*UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			this.getRouter().initialize(); //routing özelliğini açar
*/
			var jsonModelDetailView = new sap.ui.model.json.JSONModel();
			this.setModel(jsonModelDetailView, "detailModelView");

			var jsonModelDetailData = new sap.ui.model.json.JSONModel();
			this.setModel(jsonModelDetailData, "detailModelData");
			
			
			

			
			
			
		}
	});
});