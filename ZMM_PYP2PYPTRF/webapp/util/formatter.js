jQuery.sap.declare("ZMM_PYP2PYPTRF.ZMM_PYP2PYPTRF.webapp.util.formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define(function () {
	"use strict";

	var formatter = {

//Sap formatını sapui5 e çevirir.
		formatdate: function (fValue) {
			try {
				var oFormat = sap.ui.core.format.DateFormat.getInstance({
					pattern: "dd.MM.yyyy"
				});
				return oFormat.format(fValue);
			} catch (err) {
				return "None";
			}
		},
		
//Sapui5 datepicker formatını sap formatına çevirir.
		convertDate: function(date) {
			var str1 = date.split(".");
			var str3 = str1[2] + "-" + str1[1] + "-" + str1[0] + "T00:00";
			return str3;
		}
	};

	return formatter;

}, true);