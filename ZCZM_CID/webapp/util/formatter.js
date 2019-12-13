jQuery.sap.declare("ZQM_DENETIM_YONZQM_DENETIM_YON.util.formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.define(function (DateFormatter) {
	"use strict";

	var formatter = {

		formatVisible: function (fValue) {
			if (fValue)
				return false;
			else
				return true;
		},

		headerVisible: function (oValue) {
			if (oValue)
				return false;
			else
				return true;
		},

		formatDateTimeStamp: function (value) {
			if (value) {
				var fIndex = value.indexOf("(");
				var lIndex = value.indexOf(")");

				var date = new Date(parseInt(value.substring((fIndex + 1), lIndex))).toLocaleDateString("tr-TR");
				return date;
			} else {
				return value;
			}
		},

		formatdate: function (fValue) {
			if (typeof fValue === "string") {
				return fValue;
			}
			try {
				var oFormat = sap.ui.core.format.DateFormat.getInstance({
					pattern: "dd.MM.yyyy"
				});
				return oFormat.format(fValue);
				//var a = fValue.substring(6,19); 

				//var a = new Date(parseFloat(fValue.split("(")[1].split(")")[0]));
				//return oFormat.format(new Date(Number(a)));

			} catch (err) {
				return "None";
			}
		}

	};

	return formatter;

}, /* bExport= */ true);