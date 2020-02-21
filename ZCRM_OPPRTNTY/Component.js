jQuery.sap.declare("cus.crm.opportunity.CRM_OPPRTNTYExtension.Component");
// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "cus.crm.opportunity",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on SAPUI5 ABAP Repository
	url: "/sap/bc/ui5_ui5/sap/CRM_OPPRTNTY" // we use a URL relative to our own component
		// extension application is deployed with customer namespace
		// Custom_Version 13.0
});
this.cus.crm.opportunity.Component.extend("cus.crm.opportunity.CRM_OPPRTNTYExtension.Component", {
	init: function() {
		this.setModel(new sap.ui.model.json.JSONModel(), "ProductList");
		this.setModel(new sap.ui.model.json.JSONModel(), "AromaDetail");
		this.setModel(new sap.ui.model.json.JSONModel(), "Update");
		this.setModel(new sap.ui.model.json.JSONModel(), "ComboBox");
	},
	metadata: {
		version: "1.0",
		config: {
			"sap.ca.serviceConfigs": [{
				"name": "CRM_ODATA",
				"serviceUrl": "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/",
				"isDefault": true,
				"mockedDataSource": "./localService/metadata.xml"
			}],
			"sap.ca.i18Nconfigs": {
				"bundleName": "cus.crm.opportunity.CRM_OPPRTNTYExtension.i18n.i18n"
			}
		},
		customizing: {
			"sap.ui.viewReplacements": {
				"cus.crm.opportunity.view.S3": {
					"viewName": "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S3Custom",
					"type": "XML"
				},
				"cus.crm.opportunity.view.S4": {
					"viewName": "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S4Custom",
					"type": "XML"
				},
				"cus.crm.opportunity.view.S5": {
					"viewName": "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S5Custom",
					"type": "XML"
				},
				"cus.crm.opportunity.view.S2": {
					"viewName": "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S2Custom",
					"type": "XML"
				}
			},
			"sap.ui.controllerExtensions": {
				"cus.crm.opportunity.view.S3": {
					"controllerName": "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S3Custom"
				},
				"cus.crm.opportunity.view.S4": {
					"controllerName": "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S4Custom"
				},
				"cus.crm.opportunity.view.S5": {
					"controllerName": "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S5Custom"
				},
				"cus.crm.opportunity.view.S2": {
					"controllerName": "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S2Custom"
				}
			},
			"sap.ui.viewExtensions" : {
			    "cus.crm.opportunity.view.SortingDialog" : {
			        "className" : "sap.ui.core.Fragment",
			        "fragmentName" : "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.SortingDialog",
			        "type" : "XML"
			    }
			}
		}
	}
});