jQuery.sap.declare("ZQM_DENETIM_YONZQM_DENETIM_YON.util.formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.define(function () {
	"use strict";

	var formatter = {

		formatvisible1: function (fValue) {
			if (fValue === '01')
				return true;
			else
				return false;
		},

		formatMessage: function (fValue) {
			if (fValue === 'OK')
				return 'Başarılı';
			else
				return (fValue);
		},

		hesaplaButton: function (fValue) {
			if (fValue === 'FORMUL') {
				return true;
			} else {
				return false;
			}
		},

		formatvisible2: function (fValue) {
			if (fValue === '02')
				return true;
			else
				return false;
		},

		formatEnabled: function (fValue) {
			if (fValue === 'X')
				return false;
			else
				return true;
		},

		formattrueorfalse: function (fValue) {
			if (fValue === 'X')
				return true;
			else
				return false;
		},

		formatnonzero: function (fValue) {
			if (fValue !== "")
				fValue = fValue.replace(/\b0+[1-9]\d*/g, "");
			else
				return fValue;
			return fValue;
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
		},

		formatparse: function (fValue) {
			if (fValue !== "") {
				return parseInt(fValue);
			} else {
				return fValue;
			}
		},

		formatparse2: function (fValue) {
			if (fValue !== "") {
				fValue = fValue.replace(",", ".");
				return parseFloat(fValue);
			} else {
				return fValue;
			}
		},

		formatTime: function (fValue) {
			if (typeof fValue === "string") {
				return fValue;
			}
			if (fValue) {
				var timeinmiliseconds = fValue.ms;

				var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
					pattern: "kk:mm:ss"
				});
				var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
				var time = timeFormat.format(new Date(timeinmiliseconds + TZOffsetMs));
				if (time.substr(0, 2) === "24") {
					var b = "00:" + time.substr(3, 5);
					return b;
				} else {
					return timeFormat.format(new Date(timeinmiliseconds + TZOffsetMs));
				}
			}
			return null;
		},

		formatDateStr: function (fValue) {
			var a = fValue.split(".");
			var b = a[2] + "-" + a[1] + "-" + a[0] + "T00:00:00";
			return a;
		},

		formatAvailableToIcon: function (bAvailable) {
			return bAvailable ? "sap-icon://accept" : "sap-icon://decline";
		},

		formatUcretizin: function (fvalue) {
			if (fvalue === "U") {
				return true;
			} else {
				return false;
			}
		},

		formatUcretizinEn: function (fValue) {
			if (fValue === "X") {
				return false;
			} else {
				return true;
			}
		}
	};

	return formatter;

}, /* bExport= */ true);