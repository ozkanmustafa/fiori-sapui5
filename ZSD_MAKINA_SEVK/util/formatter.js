jQuery.sap.declare("ZQM_DENETIM_YONZQM_DENETIM_YON.util.formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define(function () {
	"use strict";
	var r = {
		formatIsEnabled: function (r) {
			if (r === undefined || r === "" || r === null) return false;
			else return true;
		},
		formatIsEnabled2: function (r) {
			if (r) return true;
			else return false;
		},
		formatColor: function (r) {
			if (r === "K") return "#FF0000";
			else if (r === "S") return "#FFFF00";
			else if (r === "Y") return "#00FF00";
			else return "#0000FF";
		},
		formatvisible1: function (r) {
			if (r === "01") return true;
			else return false;
		},
		formatvisible2: function (r) {
			if (r === "02") return true;
			else return false;
		},
		formatEnabled: function (r) {
			if (r === "X") return false;
			else return true;
		},
		formattrueorfalse: function (r) {
			if (r === "X") return true;
			else return false;
		},
		formatInt: function (r, e) {
			// if (r.includes(','))
			// 	return r;
			// else
			// 	return parseInt(r);
			var str = r.replace(".", ",");
			var n = str.search(",");
			if (n !== -1) {
				var newStr = str.substr(n + 1);
				var newN = parseInt(newStr);
				if (newN > 0) {
					return str;
				} else {
					return parseInt(r);
				}
			} else {
				return parseInt(r);
			}
		},
		formatInt2: function (r, e, t) {
			var n = 0;
			// if (r.includes(',')) {
			// 	n = r - e;
			// 	return n;
			// } else {
			// 	n = parseInt(r) - parseInt(e);
			// 	return n;
			// }

			r = parseFloat(r, 3);
			e = parseFloat(e, 3);

			r = r - e;

			var str = r.toString().replace(".", ",");
			var k = str.search(",");
			if (k !== -1) {
				var newStr = str.substr(k + 1);
				var newN = parseInt(newStr);
				if (newN > 0) {
					return n;
				} else {
					return parseInt(r);
				}
			} else {
				return parseInt(r);
			}
		},
		formatnonzero: function (r) {
			if (r !== "") r = r.replace(/\b0+[1-9]\d*/g, "");
			else return r;
			return r;
		},
		formatdate: function (r) {
			if (typeof r === "string") {
				return r;
			}
			try {
				var e = sap.ui.core.format.DateFormat.getInstance({
					pattern: "dd.MM.yyyy"
				});
				return e.format(r);
			} catch (r) {
				return "None";
			}
		},
		formatparse: function (r) {
			if (r !== "") {
				return parseInt(r);
			} else {
				return r;
			}
		},
		formatparse2: function (r) {
			if (r !== "") {
				r = r.replace(",", ".");
				return parseFloat(r);
			} else {
				return r;
			}
		},
		formatTime: function (r) {
			if (typeof r === "string") {
				return r;
			}
			if (r) {
				var e = r.ms;
				var t = sap.ui.core.format.DateFormat.getTimeInstance({
					pattern: "kk:mm:ss"
				});
				var n = new Date(0).getTimezoneOffset() * 60 * 1e3;
				var a = t.format(new Date(e + n));
				if (a.substr(0, 2) === "24") {
					var u = "00:" + a.substr(3, 5);
					return u;
				} else {
					return t.format(new Date(e + n));
				}
			}
			return null;
		},
		formatDateStr: function (r) {
			var e = r.split(".");
			var t = e[2] + "-" + e[1] + "-" + e[0] + "T00:00:00";
			return e;
		},
		formatAvailableToIcon: function (r) {
			return r ? "sap-icon://accept" : "sap-icon://decline";
		},
		formatUcretizin: function (r) {
			if (r === "U") {
				return true;
			} else {
				return false;
			}
		},
		formatUcretizinEn: function (r) {
			if (r === "X") {
				return false;
			} else {
				return true;
			}
		}
	};
	return r;
}, true);