function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZPM_HASAR_BIL_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}