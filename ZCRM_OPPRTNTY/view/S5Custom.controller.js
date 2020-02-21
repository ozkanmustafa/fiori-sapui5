jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("sap.ca.ui.utils.busydialog");
jQuery.sap.require("cus.crm.opportunity.util.schema");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("cus.crm.opportunity.util.Formatter");
jQuery.sap.require("cus.crm.opportunity.util.Util");
sap.ui.controller("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S5Custom", {

	//    s3Controller: {},
	//    oSelectedEmployee: {},
	//    oSelectedContact: {},
	//    oSelectedAccount: {},
	//    s2Controller: {},
	//    ContextPath: "",
	//    processType: "",
	//    StatusProfile: "",
	//    UserStatusCode: "",
	//    UserStatusText: "",
	//    WinStatusCode: "",
	//    LostStatusCode: "",
	//    oldcosValue: "",
	//    OldvolumeValue: "",
	//    ContactCollection: [],
	//    Currencies: [],
	//    currencymessage: "",
	//    s3Controller_contact: "",
	//    accountf4open: "",
	//    bBpDeterminationEnabled: false,
	//    bOrgDeterminationEnabled: false,
	//    determResultsProcessMap: [],
	//    bpDeterminationResults: {},
	//    orgDeterminationResults: { results: [] },
	//    iDetermResultFillLimit: 1,
	//    oPrevAccount: {},
	//    bCancelDeterm: false,
	//    bRetriggerDeterm: false,
	//    bDisMultiFoundToast: false,
	//    partnerDeterminationMap: {},
	//    oPartnerFunctionsTemplate: new sap.m.StandardListItem({
	//        title: "{json>PartnerFunctionName}",
	//        key: "{json>PartnerFunctionCategory}"
	//    }),
	//    accountListItemTemplate2: new sap.m.StandardListItem({
	//        title: "{PartnersBasedOnType>account2FullName}",
	//        description: "{PartnersBasedOnType>account2ID}"
	//    }),
	//    accountListItemTemplate: new sap.m.ObjectListItem({ title: "{json>name1}" }).addAttribute(new sap.m.ObjectAttribute({ text: "{json>accountID}" })).addCustomData(new sap.ui.core.CustomData({
	//        key: "ID",
	//        value: "{json>accountID}"
	//    })),
	//    contactListItemTemplate: new sap.m.ObjectListItem({ title: "{json>fullName}" }).addAttribute(new sap.m.ObjectAttribute({ text: "{json>contactID}" })).addCustomData(new sap.ui.core.CustomData({
	//        key: "ID",
	//        value: "{json>contactID}"
	//    })),
	//    employeeListItemTemplate: new sap.m.ObjectListItem({ title: "{json>fullName}" }).addAttribute(new sap.m.ObjectAttribute({ text: "{json>employeeID}" })).addCustomData(new sap.ui.core.CustomData({
	//        key: "ID",
	//        value: "{json>employeeID}"
	//    })),
	//    accountListItemTemplate1: new sap.m.StandardListItem({
	//        title: "{PartnersBasedOnType>fullName}",
	//        description: "{PartnersBasedOnType>accountID}"
	//    }),
	//    contactListItemTemplate1: new sap.m.StandardListItem({
	//        title: "{PartnersBasedOnType>fullName}",
	//        description: "{PartnersBasedOnType>contactID}"
	//    }),
	//    employeeListItemTemplate1: new sap.m.StandardListItem({
	//        title: "{PartnersBasedOnType>fullName}",
	//        description: "{PartnersBasedOnType>employeeID}"
	//    }),
	onInit: function() {
		sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);
		var r = sap.ui.getCore().getConfiguration().getRTL();
		var c = r ? "OpportunityRTL" : "Opportunity";
		jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath("cus.crm.opportunity.css." + c, ".css"), "sap-ui-theme-sap.crm");
		var t = this;
		this.oResourceBundle = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		this.byId("productBasket").setModel(new sap.ui.model.json.JSONModel(), "json");
		this.byId("partnerBasket").setModel(new sap.ui.model.json.JSONModel(), "json");
		this.followUp = false;
		this.oModel = this.getView().getModel();
		// Customizing oninit methodunu customize yaptigimda contactF4Fragment hata veriyordi ID sadece if ekledim. icinde ki code standard
		if (!this.contactF4Fragment) { //Customize
			this.contactF4Fragment = new sap.ui.xmlfragment(this.createId("contactF4"), "cus.crm.opportunity.view.ContactF4", this);
			this.contactF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "json");
		} // Customize
		this.oI18nModel = this.getView().getModel("i18n");
		this.contactF4Fragment.setModel(this.oI18nModel, "i18n");
		this.accountFilterName = cus.crm.opportunity.util.schema.getFilterString(this.oModel);
		this.oAppImplementation = sap.ca.scfld.md.app.Application.getImpl();
		this.oDateFormatter = sap.ca.ui.model.format.DateFormat.getDateInstance({
			style: "medium"
		});
		this.sBackendVersion = cus.crm.opportunity.util.schema._getServiceSchemaVersion(this.oModel, "Opportunity");
		this.oVersioningModel = new sap.ui.model.json.JSONModel({
			BackendSchemaVersion: this.sBackendVersion
		});
		this.oVersioningModel.updateBindings();
		this.getView().setModel(this.oVersioningModel, "versioning");
		this._versionSpecificInitializations(this.sBackendVersion);
		if (parseFloat(this.sBackendVersion) >= 6) {
			this.bBpDeterminationEnabled = true;
			this.bOrgDeterminationEnabled = true;
		}
		if (this.extHookCustomInit) {
			this.extHookCustomInit();
		}
		if (parseFloat(this.sBackendVersion) >= 4 && !this.bBpDeterminationEnabled) {
			this.oModel.read("RequestedPartners", null, ["$filter=PartnerCategory eq '0008'"], true, jQuery.proxy(function(o, a) {
				this.EmpResId = o.results[0].PartnerNo;
				this.EmployeeResponsibleNumber = o.results[0].PartnerNo;
				this.EmployeeResponsibleName = o.results[0].FullName;
				this.byId("inputEmpResponsible_S5").setValue(this.EmployeeResponsibleName);
			}, this), jQuery.proxy(function(e) {}, this));
		}
		this.byId("customer").setEditable(true);
		this.oRouter.attachRouteMatched(function(e) {
			this.fullScreen = false;
			this.followupOppt = false;
			this.fullScreenFromTask = false;
			this.fullScreenFromLead = false;
			this.fullfollowupOppt = false;
			if (e.getParameter("name") === "create" || e.getParameter("name") === "NewOpportunityFromAccount") {
				this._onChangeDisableProduct(e); // Customizing for change numune or standard product field
				// Customizing to clear cache
				var oCustomProducts = this.getView().getModel("customProducts");
				if (oCustomProducts) {
					oCustomProducts.setProperty("/istekCollection", []);
				}

				this.followupOppt = false;
				this.getView().byId("partnerBasket").getModel("json").getData().SalesTeam = [];
				this.byId("customer").setEditable(true);
				this.ContextPath = e.getParameter("arguments").contextPath;
				this.processType = e.getParameter("arguments").processType;
				this._clear_data();
				if (parseFloat(this.sBackendVersion) >= 6) {
					if (!(this.bBpDeterminationEnabled || this.bOrgDeterminationEnabled)) {
						this.getCustomizing(this.processType);
					}
				} else {
					if (!this.partnerDeterminationMap[this.processType]) {
						this.oModel.read("OpptPartnerFctTypes", null, ["TransactionType='" + this.processType + "'"], false, jQuery.proxy(function(j, G) {
							this.partnerDeterminationMap[this.processType] = G.data.results;
						}, this), jQuery.proxy(function(j) {}, this));
					}
				}
				var a = this.getView().getModel("controllers").getData().s3Controller;
				if (a === null) {
					this.callController(a, e.getParameter("arguments").processType);
				} else {
					if (!this._isStatusExistForProcessType(a.UserStatuses, this.processType)) {
						var S = this._getStatusForProcessType(this.processType);
						if (!a.UserStatuses) {
							a.UserStatuses = S;
						} else {
							a.UserStatuses = a.UserStatuses.concat(S);
						}
					}
					this.Currencies = a.Currencies;
					this.byId("currency").setModel(new sap.ui.model.json.JSONModel({
						Currencies: this.Currencies
					}), "json");
					this.ContactCollection = a.ContactCollection;
					this.s3Controller_contact = a;
					this.fill_dropDowns(a);
				}
				if (e.getParameter("name") === "create") {
					this.prepareDataAndTriggerDetermination(this.processType);
				} else if (e.getParameter("name") === "NewOpportunityFromAccount") {
					var A = this.accountId ? this.accountId : this.ContextPath.match(/\d+/)[0];
					this.prepareDataAndTriggerDetermination(this.processType, A);
					this.oHeaderFooterOptions.onBack = jQuery.proxy(this.onCancel, this);
				}
				this.oSelectedEmployee = {};
				this.byId("datePickerStartDate").setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
				// Customizing
				var oDate = new Date();
				var iMonth = oDate.getMonth() + 6;
				oDate.setMonth(iMonth);

				this.getView().byId("datePickerCloseDate").setValue(cus.crm.opportunity.util.Formatter.dateFormatter(oDate));
				this.getView().byId("laTypeInput").setVisible(false);
				this.getView().byId("TxtTypeInput").setVisible(false);
				var p = null;
				if (this.oApplicationFacade.getApplicationModel("s2Controller")) {
					var b = this.oApplicationFacade.getApplicationModel("s2Controller").getData().s2Controller;
					if (b != null || b != undefined) {
						b.getList().setSelectedItem(b.getList().getSelectedItem(), false);
						p = b.processTypeDesc;
						if (p != null || parseFloat(this.sBackendVersion) >= 3) {
							this.getView().byId("laTypeInput").setVisible(true);
							this.getView().byId("TxtTypeInput").setVisible(true);
							this.getView().byId("TxtTypeInput").setText(p);
						}
					}
				} else {
					this.newOpportunityFromAccount = true;
					var m = this.getView().getModel();
					var d = e.getParameter("arguments").contextPath;
					var t = this;
					var f = function(j) {
						t.accountId = j.accountID;
						if (j.fullName)
							t.accountName = j.fullName;
						else
							t.accountName = j.name1;
						t.getView().byId("customer").setValue(t.accountName);
					};
					var B = [];
					var P = "/" + d;
					var g = "/ProcessTypes";
					B.push(m.createBatchOperation(P, "GET"));
					B.push(m.createBatchOperation(g, "GET"));
					m.addBatchReadOperations(B);
					m.submitBatch(jQuery.proxy(function(R) {
						var j = R.__batchResponses[0].data;
						f(j);
						var G = R.__batchResponses[1].data;
						for (var i = 0; i < G.results.length; i++) {
							if (G.results[i].ProcessTypeCode === this.processType) {
								p = G.results[i].Description;
								break;
							}
						}
						if (p != null || parseFloat(this.sBackendVersion) >= 3) {
							this.getView().byId("laTypeInput").setVisible(true);
							this.getView().byId("TxtTypeInput").setVisible(true);
							this.getView().byId("TxtTypeInput").setText(p);
						}
					}, this), jQuery.proxy(function() {}, this), true);
					window.setTimeout(jQuery.proxy(t._scrollToTop, t), 10);
				}
				if (this.extHookCustomLogicForAttachRouteMatch) {
					this.extHookCustomLogicForAttachRouteMatch(e);
				}
			} else if (e.getParameter("name") === "fulScrCreateFollowup") {
				// Customizing for change numune or standard product field
				this._onChangeDisableProduct(e);
				// Customizing to clear cache
				oCustomProducts = this.getView().getModel("customProducts");
				if (oCustomProducts) {
					oCustomProducts.setProperty("/istekCollection", []);
				}
				this.byId("customer").setEditable(false);
				this.fullScreen = true;
				this.oHeaderFooterOptions.onBack = jQuery.proxy(this.onCancel, this);
				var o = this.getView().getModel("startupParameters");
				if (o && o.oData) {
					if (o.oData.parameters) {
						for (var h in o.oData.parameters) {
							if (o.oData.parameters[h].key == "processType") {
								this.processType = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "StartDate") {
								this.StartDate = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "title") {
								this.title = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "appointmentGuid") {
								this.appointmentGuid = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "Responsible") {
								this.Responsible = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "AccountId") {
								this.AccountId = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "ContactId") {
								this.contactId = o.oData.parameters[h].value;
							}
						}
					}
				}
				this.ContextPath = e.getParameter("arguments").contextPath;
				var t = this;
				var k = [];
				var m = this.getView().getModel();
				var l = "/AccountCollection('" + this.AccountId + "')";
				var n = "/ContactCollection(contactID='" + this.contactId + "',accountID='" + this.AccountId + "')";
				var q = "/EmployeeCollection('" + this.Responsible + "')";
				var u = "/ProcessTypes";
				k.push(m.createBatchOperation(l, "GET"));
				k.push(m.createBatchOperation(n, "GET"));
				k.push(m.createBatchOperation(q, "GET"));
				k.push(m.createBatchOperation(u, "GET"));
				m.addBatchReadOperations(k);
				var v = 4;
				var w = this;
				m.submitBatch(jQuery.proxy(function(R) {
					t.AccountName = R.__batchResponses[0].data.fullName;
					if (R.__batchResponses[0].data.fullName == "") {
						t.AccountName = R.__batchResponses[0].data.accountID;
					}
					t.ContactName = R.__batchResponses[1].data.fullName;
					t.ResponsibleTxt = R.__batchResponses[2].data.fullName;
					if (R.__batchResponses[3]) {
						for (var i = 0; i < R.__batchResponses[3].data.results.length; i++) {
							if (R.__batchResponses[3].data.results[i].ProcessTypeCode === w.processType) {
								w.ProcessTypeDescription = R.__batchResponses[3].data.results[i].Description;
								break;
							}
						}
					}
				}, this), jQuery.proxy(function() {}, this), false);
				t.s3Controller = this.getView().getModel("controllers").getData().s3Controller;
				if (t.s3Controller === null) {
					this.callController(t.s3Controller, e.getParameter("arguments").processType);
				}
				sap.ca.ui.utils.busydialog.requireBusyDialog();
				this.followUpView();
				this.prepareDataAndTriggerDetermination(this.processType, this.AccountId, this.ContextPath);
				sap.ca.ui.utils.busydialog.releaseBusyDialog();
			} else if (e.getParameter("name") === "fulScrOpptFollowup") {
				// Customizing for change numune or standard product field
				this._onChangeDisableProduct(e);
				// Customizing to clear cache
				oCustomProducts = this.getView().getModel("customProducts");
				if (oCustomProducts) {
					oCustomProducts.setProperty("/istekCollection", []);
				}
				this.byId("customer").setEditable(false);
				this.followupOppt = true;
				this.fullfollowupOppt = true;
				this.ContextPath = e.getParameter("arguments").contextPath;
				this.processType = e.getParameter("arguments").processType;
				var t = this;
				t.s3Controller = this.getView().getModel("controllers").getData().s3Controller;
				if (t.s3Controller === null) {
					this.callController(t.s3Controller, e.getParameter("arguments").processType);
				}
				sap.ca.ui.utils.busydialog.requireBusyDialog();
				this.bindEditView();
				this.prepareDataAndTriggerDetermination(this.processType, this.accountId, this.ContextPath);
				sap.ca.ui.utils.busydialog.releaseBusyDialog();
			} else if (e.getParameter("name") === "FollowupFromTask") {
				// Customizing for change numune or standard product field
				this._onChangeDisableProduct(e);
				// Customizing to clear cache
				oCustomProducts = this.getView().getModel("customProducts");
				if (oCustomProducts) {
					oCustomProducts.setProperty("/istekCollection", []);
				}
				this.byId("customer").setEditable(false);
				this.fullScreenFromTask = true;
				this.oHeaderFooterOptions.onBack = jQuery.proxy(this.onCancel, this);
				var o = this.getView().getModel("startupParameters");
				if (o && o.oData) {
					if (o.oData.parameters) {
						for (var h in o.oData.parameters) {
							if (o.oData.parameters[h].key == "AccountID") {
								this.AccountId = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "ContactID") {
								this.contactId = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "FUO") {
								this.FUO = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "taskGuid") {
								this.taskGuid = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "taskId") {
								this.taskId = o.oData.parameters[h].value;
							}
							if (o.oData.parameters[h].key == "title") {
								this.title = o.oData.parameters[h].value;
							}
						}
					}
				}
				this.ContextPath = e.getParameter("arguments").contextPath;
				this.processType = e.getParameter("arguments").processType;
				var t = this;
				var k = [];
				var m = this.getView().getModel();
				var x = [];
				x.push("/ProcessTypes");
				if (this.AccountId !== "")
					x.push("/AccountCollection(" + m.formatValue(this.AccountId, "Edm.String") + ")");
				if (this.contactId !== "") {
					x.push("/AccountCollection(" + m.formatValue(this.contactId, "Edm.String") + ")");
				}
				for (var i = 0; i < x.length; i++) {
					k.push(m.createBatchOperation(x[i], "GET"));
				}
				m.addBatchReadOperations(k);
				var v = 3;
				var w = this;
				m.submitBatch(jQuery.proxy(function(R) {
					for (var j = 0; j < R.__batchResponses.length; j++) {
						switch (j) {
							case 0:
								if (R.__batchResponses[0]) {
									for (var i = 0; i < R.__batchResponses[0].data.results.length; i++) {
										if (R.__batchResponses[0].data.results[i].ProcessTypeCode === w.processType) {
											w.ProcessTypeDescription = R.__batchResponses[0].data.results[i].Description;
										}
									}
								}
								break;
							default:
								if (R.__batchResponses[j].data) {
									var G = R.__batchResponses[j].data,
										H = G.fullName ? G.fullName : G.accountID;
									switch (G.accountID) {
										case this.AccountId:
											t.AccountName = H;
											break;
										case this.contactId:
											t.ContactName = H;
											break;
									}
								}
								break;
						}
					}
				}, this), jQuery.proxy(function() {}, this), false);
				t.s3Controller = this.getView().getModel("controllers").getData().s3Controller;
				if (t.s3Controller === null) {
					this.callController(t.s3Controller, e.getParameter("arguments").processType);
				}
				sap.ca.ui.utils.busydialog.requireBusyDialog();
				this.fromTaskFollowUpView();
				this.prepareDataAndTriggerDetermination(this.processType, this.AccountId, this.ContextPath);
				sap.ca.ui.utils.busydialog.releaseBusyDialog();
			} else if (e.getParameter("name") === "FollowupFromLead") {
				var F = function() {
					this.byId("customer").setEditable(false);
				};
				var y = function() {
					this.oHeaderFooterOptions.onBack = jQuery.proxy(this.onCancel, this);
				};
				var z = function() {
					this.fullScreenFromLead = true;
					var o = this.getView().getModel("startupParameters");
					if (o && o.oData) {
						if (o.oData.parameters) {
							var j = o.oData.parameters;
							for (var h in j) {
								if (j[h].key == "AccountID") {
									this.AccountId = j[h].value;
								}
								if (j[h].key == "ContactID") {
									this.contactId = j[h].value;
								}
								if (j[h].key == "FUO") {
									this.FUO = j[h].value;
								}
								if (j[h].key == "leadGuid") {
									this.leadGuid = j[h].value;
								}
								if (j[h].key == "title") {
									this.title = j[h].value;
								}
								if (j[h].key == "products") {
									this.productsFromLead = JSON.parse(j[h].value);
								}
							}
						}
					}
					this.ContextPath = e.getParameter("arguments").contextPath;
					this.processType = e.getParameter("arguments").processType;
				};
				var C = function() {
					var k = [];
					var m = this.getView().getModel();
					var x = [];
					x.push("/ProcessTypes");
					if (!!this.AccountId && this.AccountId !== "undefined") {
						x.push("/AccountCollection(" + m.formatValue(this.AccountId, "Edm.String") + ")");
					}
					if (!!this.contactId && this.contactId !== "undefined") {
						x.push("/AccountCollection(" + m.formatValue(this.contactId, "Edm.String") + ")");
					}
					for (var i = 0; i < x.length; i++) {
						k.push(m.createBatchOperation(x[i], "GET"));
					}
					m.addBatchReadOperations(k);
					m.submitBatch(D.bind(this), E.bind(this));
				};
				var D = function(R) {
					for (var i = 0; i < R.__batchResponses.length; i++) {
						switch (i) {
							case 0:
								if (R.__batchResponses[0]) {
									var I = R.__batchResponses[0].data.results;
									for (var j = 0; j < I.length; j++) {
										if (I[j].ProcessTypeCode === this.processType) {
											this.ProcessTypeDescription = I[j].Description;
										}
									}
								}
								break;
							default:
								if (R.__batchResponses[i].data) {
									var G = R.__batchResponses[i].data,
										H = G.fullName || G.accountID;
									switch (G.accountID) {
										case this.AccountId:
											this.AccountName = H;
											break;
										case this.contactId:
											this.ContactName = H;
											break;
									}
								}
								break;
						}
					}
					this.s3Controller = this.getView().getModel("controllers").getData().s3Controller;
					if (this.s3Controller === null) {
						this.callController(this.s3Controller, this.processType);
					}
					sap.ca.ui.utils.busydialog.requireBusyDialog();
					this.fromTaskFollowUpView();
					this.prepareDataAndTriggerDetermination(this.processType, this.AccountId, this.ContextPath);
					if (!!this.AccountName) {
						this.setBtnEnabled("sv", true);
					}
					sap.ca.ui.utils.busydialog.releaseBusyDialog();
				};
				var E = function(j) {
					this.handleErrors(j);
				};
				F.call(this);
				y.call(this);
				z.call(this);
				C.call(this);
			} else if (e.getParameter("name") === "createFollowup") {
				// Customizing for change numune or standard product field
				this._onChangeDisableProduct(e);
				// Customizing to clear cache
				oCustomProducts = this.getView().getModel("customProducts");
				if (oCustomProducts) {
					oCustomProducts.setProperty("/istekCollection", []);
				}
				this.byId("customer").setEditable(false);
				this.followupOppt = true;
				this.ContextPath = e.getParameter("arguments").contextPath;
				this.processType = e.getParameter("arguments").processType;
				sap.ca.ui.utils.busydialog.requireBusyDialog();
				this.bindEditView();
				this.prepareDataAndTriggerDetermination(this.processType, this.accountId, this.ContextPath);
				sap.ca.ui.utils.busydialog.releaseBusyDialog();
			}
		}, this);
		this.oAppImplementation = sap.ca.scfld.md.app.Application.getImpl();
		this.oNav = this.oAppImplementation.oAppNavigator;
		t = this;
		this.oHeaderFooterOptions = {
			onBack: sap.ui.Device.system.phone || this.fullScreen || this.fullScreenFromTask || this.fullScreenFromLead ? jQuery.proxy(this.onCancel,
				this) : null,
			oEditBtn: {
				sId: "sv",
				sI18nBtnTxt: "SAVE",
				onBtnPressed: function(e) {
					t.getController().onSave();
				},
				bDisabled: true
			},
			buttonList: [{
				sI18nBtnTxt: "CANCEL",
				onBtnPressed: function(e) {
					t.getController().onCancel();
				}
			}]
		};
		var t = this.getView();
		this.getView().byId("stagedropdown").attachChange(null, function(e) {
			if (t.byId("statusdropdown").getSelectedKey() != t.getController().WinStatusCode && t.byId("statusdropdown").getSelectedKey() != t.getController()
				.LostStatusCode) {
				var d = this.getModel("json").getData();
				var l = d.SalesStages.length;
				for (var i = 0; i < l; i++) {
					if (d.SalesStages[i].ProcessType === t.getController().processType && d.SalesStages[i].SalesStageCode === e.getParameter(
							"selectedItem").getKey()) {
						t.byId("chanceofSuccess").setValue(Number(d.SalesStages[i].ChanceOfSuccess));
					}
				}
			}
		});
		this.getView().byId("statusdropdown").attachChange(null, function(e) {
			if (t.getController().WinStatusCode === e.getParameter("selectedItem").getKey()) {
				t.byId("chanceofSuccess").setValue(100);
			}
			if (t.getController().LostStatusCode === e.getParameter("selectedItem").getKey()) {
				t.byId("chanceofSuccess").setValue(0);
			}
		});
		this.byId("datePickerCloseDate").attachBrowserEvent("keydown", jQuery.proxy(function(e) {
			this.setValueState(sap.ui.core.ValueState.None);
		}, this.byId("datePickerCloseDate")));
		this.byId("datePickerStartDate").attachBrowserEvent("keydown", jQuery.proxy(function(e) {
			this.setValueState(sap.ui.core.ValueState.None);
		}, this.byId("datePickerStartDate")));
		this.getView().byId("datePickerCloseDate").attachChange(null, function(e) {
			cus.crm.opportunity.util.Util.setDatePicker(this.getView(), "datePickerCloseDate", "datePickerStartDate", this.oDateFormatter);
		}, this);
		this.getView().byId("datePickerStartDate").attachChange(null, function(e) {
			cus.crm.opportunity.util.Util.setDatePicker(this.getView(), "datePickerStartDate", "datePickerCloseDate", this.oDateFormatter);
		}, this);
		var s = this;
		jQuery(document).keyup(function(e) {
			if (e.keyCode == 27 && s.participantsF4MultiselectFragment) {
				s.onCancelParticipantDialog(e);
			}
		});
	},

	onCheckPypTanim: function(e) {
		var oInput = sap.ui.core.Fragment.byId("createAromaFragment", "ZZPYP_TANIM");
		if (e.mParameters.value.length > 0) {
			oInput.setValueState(sap.ui.core.ValueState.None);
		} else {
			oInput.setValueState(sap.ui.core.ValueState.Error);
		}
	},

	onCheckMusteriAdi: function(e) {
		var oInput = sap.ui.core.Fragment.byId("createAromaFragment", "ZZMUSTERI_ADI");
		if (e.mParameters.value.length > 0) {
			oInput.setValueState(sap.ui.core.ValueState.None);
		} else {
			oInput.setValueState(sap.ui.core.ValueState.Error);
		}
	},

	_onChangeDisableProduct: function(e) {
		var oParam = e.getParameters();
		var sProcessType = oParam.arguments.processType;
		if (sProcessType === "Z003" || sProcessType === "Z004") {
			this.byId("opportunityContact_Label").setVisible(true);
			this.byId("inputMainContact").setVisible(true);
			this.byId("customProductBasket").setVisible(false);
			this.byId("productBasket").setVisible(true);
			this.byId("opportunityContact_Label").setRequired(true);
			this.byId("salesorganization_label").setRequired(true);
		}
		if (sProcessType === "Z007" || sProcessType === "Z008") {
			this.byId("opportunityContact_Label").setVisible(false); // numunede main contact gorunmesin
			this.byId("inputMainContact").setVisible(false);
			this.byId("customProductBasket").setVisible(true);
			this.byId("productBasket").setVisible(false);
			this.byId("salesorganization_label").setRequired(true);
			this.byId("opportunityContact_Label").setRequired(false);
		}
	},
	onChangeFinishRequest: function(e) {
		var bSelected = e.getParameters().selected;
		var oModel = this.getView().getModel("aroma");
		if (bSelected) {
			oModel.setProperty("/BtmsUrunIstk", "X");
		} else {
			oModel.setProperty("/BtmsUrunIstk", "");
		}
	},
	onSelectDeliveryDate: function(e) {
		var oDate = e.getSource().getDateValue();
		var sDeliveryDate = oDate.getFullYear() + "-" + (oDate.getMonth() + 1) + "-" + oDate.getDate() + "T00:00:00";
		this.getView().getModel("aroma").setProperty("/TeslimTarih", sDeliveryDate);
	},
	// YillikSatisMiktari ValueHelp Kontrolleri
	onVHAnnualSalesAmount: function() {
		if (!this.VH_AnnualSalesAmount) {
			this.VH_AnnualSalesAmount = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_AnnualSalesAmount", this);
			this.VH_AnnualSalesAmount.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_AnnualSalesAmount);
		}
		this.VH_AnnualSalesAmount.open();
	},
	onAnnualSalesCancel: function(e) {
		e.getSource().getBinding("items").filter([]);
	},
	onAnnualSalesSearch: function(e) {
		var sValue = e.getParameter("value");
		var oAnnual = new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.EQ, sValue);
		e.getSource().getBinding("items").filter(oAnnual);
	},
	onAnnualSalesSelect: function(e) {
		var oItem = e.getParameter("selectedItem");
		var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		var oModel = this.getView().getModel("aroma");
		oModel.setProperty("/YillikSatisMik2Value", sValue);
		oModel.setProperty("/YillikSatisMik2", sKey);
	},

	// TahminiRmcMax ValueHelp Kontrolleri
	onVHEstimatedRMCMax: function() {
		var oCombo = this.getView().getModel("ComboBox");
		oCombo.setProperty("/CurrenciesSet", this.Currencies);
		if (!this.VH_EstimatedRmcMax) {
			this.VH_EstimatedRmcMax = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_EstimatedRmcMax", this);
			this.VH_EstimatedRmcMax.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_EstimatedRmcMax);
		}
		this.VH_EstimatedRmcMax.open();
	},
	onEstimatedRMCCancel: function(e) {
		e.getSource().getBinding("items").filter([]);
	},
	onEstimatedRMCSearch: function(e) {
		var sValue = e.getParameter("value");
		var oRMC = new sap.ui.model.Filter("CurrencyKey", sap.ui.model.FilterOperator.Contains, sValue);
		e.getSource().getBinding("items").filter(oRMC);
	},
	onEstimatedRMCSelect: function(e) {
		var oItem = e.getParameter("selectedItem");
		//var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		var oModel = this.getView().getModel("aroma");
		oModel.setProperty("/TahRmBrm", sKey);
	},

	// IstnnArmMik ValueHelp Kontrolleri
	onVHDesiredAromaAmount: function() {
		if (!this.VH_DesiredAromaAmount) {
			this.VH_DesiredAromaAmount = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_DesiredAromaAmount", this);
			this.VH_DesiredAromaAmount.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_DesiredAromaAmount);
		}
		this.VH_DesiredAromaAmount.open();
	},
	onDesiredAromaAmountCancel: function(e) {
		e.getSource().getBinding("items").filter([]);
	},
	onDesiredAromaAmountSearch: function(e) {
		var sValue = e.getParameter("value");
		var oAmount = new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.EQ, sValue);
		e.getSource().getBinding("items").filter(oAmount);
	},
	onDesiredAromaAmountSelect: function(e) {
		var oItem = e.getParameter("selectedItem");
		//var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		var oModel = this.getView().getModel("aroma");
		oModel.setProperty("/IstnnArmMik2", sKey);
	},

	onDesiredAromaQuantity: function() {
		if (!this.VH_DesiredAromaQuantity) {
			this.VH_DesiredAromaQuantity = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_DesiredAromaQuantity", this);
			this.VH_DesiredAromaQuantity.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_DesiredAromaQuantity);
		}
		this.VH_DesiredAromaQuantity.open();

	},
	onDesiredAromaQuantityCancel: function(e) {
		e.getSource().getBinding("items").filter([]);
	},
	onDesiredAromaQuantitySearch: function(e) {
		var sValue = e.getParameter("value");
		var oQuantity = new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, sValue);
		e.getSource().getBinding("items").filter(oQuantity);
	},
	onDesiredAromaQuantitySelect: function(e) {
		var oItem = e.getParameter("selectedItem");
		//var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		var oModel = this.getView().getModel("aroma");
		oModel.setProperty("/IstenenAromaBirim", sKey);
	},

	// UyguAlani ValueHelp Kontrolleri
	onPracticeArea: function() {
		if (!this.VH_PracticeArea) {
			this.VH_PracticeArea = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_PracticeArea", this);
			this.VH_PracticeArea.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_PracticeArea);
		}
		this.VH_PracticeArea.open();
	},
	onPracticeAreaCancel: function(e) {
		e.getSource().getBinding("items").filter([]);
	},
	onPracticeAreaSearch: function(e) {
		var sValue = e.getParameter("value");
		var oPractice = new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, sValue);
		e.getSource().getBinding("items").filter(oPractice);
	},
	onPracticeAreaSelect: function(e) {
		var oItem = e.getParameter("selectedItem");
		var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		var oModel = this.getView().getModel("aroma");
		oModel.setProperty("/UyguAlani", sKey);
		oModel.setProperty("/TanimUyg", sValue);
		var oPracticeArea = sap.ui.core.Fragment.byId("createAromaFragment", "ZZUYGU_ALANI");
		oPracticeArea.setValueState(sap.ui.core.ValueState.None);
	},

	onAddCustomProduct: function() {
		this.getView().getModel("Update").setProperty("/EditButton", true);
		var sCustom = this.getView().byId("customer").getValue();
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		if (sCustom === "") {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			sap.m.MessageBox.error(
				oResource.getText("VALIDATE_CUSTOMER"), {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
			return;
		}
		if (!this.oCustomProductFragment) {
			this.oCustomProductFragment = sap.ui.xmlfragment("customProductFragment",
				"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.CustomProductDialog", this);
			this.oCustomProductFragment.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.oCustomProductFragment);
		}
		this.oCustomProductFragment.attachBrowserEvent("keydown", function(oEvent) {
			if (oEvent.which === 27) {
				oEvent.stopPropagation();
				oEvent.preventDefault();
			}
		});
		var oModel = this.getView().getModel("customProducts");
		if (oModel === undefined) {
			var oTreeModel = new sap.ui.model.json.JSONModel({
				istekCollection: [],
				tempIstek: {}
			});
			this.getView().setModel(oTreeModel, "customProducts");
		}
		// TO-DO
		this.oCustomProductFragment.open();
	},
	onDeleteCustomProduct: function() {
		var oModel = this.getView().getModel("customProducts");
		oModel.setProperty("/istekCollection", []);
		oModel.setProperty("/ServiceProducts", []);
	},

	onCustomProductCancel: function() {
		if (this.oCustomProductFragment) {
			this.oCustomProductFragment.close();
		}
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment", "treeID");
		oListTree.removeSelections(true);
	},
	onCustomProductKeep: function() {
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment", "treeID");
		oListTree.removeSelections(true);
		var aProducts = [];
		var oModel = this.getView().getModel("customProducts");
		var aCollection = oModel.getProperty("/istekCollection");
		var oTableTree = this.getView().byId("customProductBasket");
		var oBinding = oTableTree.getBinding();
		oBinding.refresh();
		this.oCustomProductFragment.close();
		if (aCollection) {
			for (var i = 0; i < aCollection.length; i++) {
				var row = {
					HeaderGuid: "00000000-0000-0000-0000-000000000000",
					ProcessingMode: "A",
					PypTanim: aCollection[i].PypTanim,
					NumberInt: aCollection[i].NumberInt.toString(),
					NumberParent: "",
					ProductId: aCollection[i].ProductId,
					Quantity: aCollection[i].Quantity,
					Unit: ""
				};
				aProducts.push(row);
				for (var j = 0; j < aCollection[i].Nodes.length; j++) {
					aCollection[i].Nodes[j].Unit = "";
					delete aCollection[i].Nodes[j].ParentID;
					delete aCollection[i].Nodes[j].NotesLanguageID;
					delete aCollection[i].Nodes[j].CustomNotes;
					delete aCollection[i].Nodes[j].YillikSatisMik2Value;
					delete aCollection[i].Nodes[j].TanimUyg;
					delete aCollection[i].Nodes[j].TeslimTarihiText;
					delete aCollection[i].Nodes[j].MalzemeCollection;
					delete aCollection[i].Nodes[j].ModeCollection;
					delete aCollection[i].Nodes[j].ModDesc; //ModDesc
					aProducts.push(aCollection[i].Nodes[j]);
				}
			}
		}
		oModel.setProperty("/ServiceProducts", aProducts);
	},
	onEditToProduct: function() {
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment", "treeID");
		var aSelectedItem = oListTree.getSelectedContexts();
		//var oTreeModel = this.getView().getModel("customProducts");
		//var aIstekCollection = oTreeModel.getProperty("/istekCollection");
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		if (aSelectedItem[0] === undefined) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			sap.m.MessageBox.warning(
				oResource.getText("EDITAROMA_ERROR"), {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
			return;
		} else
		if (aSelectedItem[0].sPath.indexOf("Nodes") < 0) {
			bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			sap.m.MessageBox.warning(
				oResource.getText("EDITAROMA_WARNING"), {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
			return;
		}
		var sPath = aSelectedItem[0].sPath;
		var oCustom = this.getView().getModel("customProducts");
		var oProperty = oCustom.getProperty(sPath);
		var oAroma = this.getView().getModel("aroma");
		oAroma.setData(oProperty);
		oAroma.setProperty("/YillikSatisMik2Value", "KG");
		if (!this.oCreateAromaDialog) {
			this.oCreateAromaDialog = sap.ui.xmlfragment("createAromaFragment",
				"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.CreateAromaDialog", this);
			this.oCreateAromaDialog.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.oCreateAromaDialog);
		}
		this.oCreateAromaDialog.attachBrowserEvent("keydown", function(oEvent) {
			if (oEvent.which === 27) {
				oEvent.stopPropagation();
				oEvent.preventDefault();
			}
		});
		this.oCreateAromaDialog.open();
		var sLength = oAroma.getProperty("/SalesTeam").length;
		for (var i = 0; i < sLength; i++) {
			if (oAroma.getProperty("/SalesTeam/" + i).PartnerFunctionCode === "00000015") {
				var oRelated = sap.ui.core.Fragment.byId("createAromaFragment", "relatedPersonID");
				var sText = oAroma.getProperty("/SalesTeam/" + i).PartnerFunctionText;
				oRelated.setValue(sText);
			}
			if (oAroma.getProperty("/SalesTeam/" + i).PartnerFunctionCode === "00000002") {
				var oDelivery = sap.ui.core.Fragment.byId("createAromaFragment", "deliveryPersonID");
				sText = oAroma.getProperty("/SalesTeam/" + i).PartnerFunctionText;
				oDelivery.setValue(sText);
			}
		}
		this.onCallServiceForCombo();
		var sType = this.processType;
		// if (sType === "Z008") { // Bayi numune ise double kod gormesin
		//     var oLabel = sap.ui.core.Fragment.byId("createAromaFragment","ZZDOUBLE_KOD_L");
		//     var oEl = sap.ui.core.Fragment.byId("createAromaFragment","ZZDOUBLE_KOD");
		//     var oEl_2 = sap.ui.core.Fragment.byId("createAromaFragment","ZZDOUBLE_TANIM");
		//     var oEl_3 = sap.ui.core.Fragment.byId("createAromaFragment","ZZHANGI_KOD");
		//     var oLabel_3 = sap.ui.core.Fragment.byId("createAromaFragment","ZZHANGI_KOD_L");
		//     oLabel.setVisible(false);
		//     oEl.setVisible(false);
		//     oEl_2.setVisible(false);
		//     oEl_3.setVisible(false);
		//     oLabel_3.setVisible(false);
		// }
		this.actionForEdit = true;
	},
	onNavigateToIstek: function() {
		//var oContext = e.getSource().getBindingContext();
		var oTreeModel = this.getView().getModel("customProducts");
		var oData = oTreeModel.getData();
		var iNumberOfIstek = oData.istekCollection.length + 1;
		oTreeModel.setProperty("/tempIstek/NumberInt", iNumberOfIstek * 100);
		//oData.tempIstek.Description = iNumberOfIstek + ". istek";// Bu set etmedi 
		//oTreeModel.setProperty("/tempIstek/PypTanim",iNumberOfIstek + ". istek");
		oTreeModel.setProperty("/tempIstek/Unit", "");

		var oNavCon = sap.ui.core.Fragment.byId("customProductFragment", "navCon");
		var oIstekPage = sap.ui.core.Fragment.byId("customProductFragment", "createIstekID");
		oNavCon.to(oIstekPage);
	},
	onNavigateToAroma: function() {
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment", "treeID");
		var aSelectedItem = oListTree.getSelectedContexts();
		var oTreeModel = this.getView().getModel("customProducts");
		var aIstekCollection = oTreeModel.getProperty("/istekCollection");
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		if (aIstekCollection.length === 0) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			sap.m.MessageBox.error(
				oResource.getText("CREATEAROMA_ERROR"), {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
		} else
		if (aSelectedItem.length === 0) {
			bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			sap.m.MessageBox.warning(
				oResource.getText("CREATEAROMA_WARNING"), {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
		} else
		if (aSelectedItem[0].sPath.indexOf("Nodes") > 0) {
			bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			sap.m.MessageBox.warning(
				oResource.getText("SELECTISTEK_WARNING"), {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
		} else {
			var sPath = aSelectedItem[0].sPath;
			var sSelectedIstek = sPath.split("/")[2];
			var iParentKalemNo = (parseInt(sSelectedIstek) + 1) * 100;
			//var sPropertyPath = "/istekCollection/" + sSelectedIstek + "/Nodes";
			//var sPypTanim = (oTreeModel.getProperty(sPropertyPath).length + 1) + ". Aroma";
			var oAromaModel = new sap.ui.model.json.JSONModel({
				HeaderGuid: "00000000-0000-0000-0000-000000000000",
				ProcessingMode: "A",
				ParentID: sSelectedIstek,
				NumberParent: iParentKalemNo.toString(),
				//PypTanim : sPypTanim,
				//PYPCollection : [],
				SalesTeam: [],
				ComplexNotes: [{
					"TextObjectID": "Z001",
					"Content": "",
					"TextLanguageID": ""
				}],
				YillikSatisMik2Value: "KG",
				TahRmBrm: "EUR",
				IstnnArmMik2: "G"
					//NotesLanguageID : "TR",
					//NotesLangType : "Türkçe"
			});
			this.getView().setModel(oAromaModel, "aroma");
			this.getView().getModel("aroma").setProperty("/CustomNotes", "");
			if (!this.oCreateAromaDialog) {
				this.oCreateAromaDialog = sap.ui.xmlfragment("createAromaFragment",
					"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.CreateAromaDialog", this);
				this.oCreateAromaDialog.setModel(this.getView().getModel("i18n"), "i18n");
				this.getView().addDependent(this.oCreateAromaDialog);
			}
			this.oCreateAromaDialog.attachBrowserEvent("keydown", function(oEvent) {
				if (oEvent.which === 27) {
					oEvent.stopPropagation();
					oEvent.preventDefault();
				}
			});
			var oCheckBox = sap.ui.core.Fragment.byId("createAromaFragment", "ZZBTMS_URUN_ISTK");
			oCheckBox.setSelected(false);
			this.oCreateAromaDialog.open();
			this._onAdjustPanelExpand();

			this.onCallServiceForCombo();
		}
		var sType = this.processType;
		var oUpdate = this.getView().getModel("Update");
		if (sType === "Z008") { // Bayi numune ise double kod gormesin
			oUpdate.setProperty("/BayiDurumu", false);
		} else {
			oUpdate.setProperty("/BayiDurumu", true);
		}
		this._onCallServiceForClass("", "", "ZZSINIF_1");
		this._onCallServiceForClass("", "", "ZZSINIF_2");
	},

	_onAdjustPanelExpand: function() {
		var aPanels = ["panelID_1", "panelID_2", "panelID_3", "panelID_4", "panelID_5"];
		for (var i = 0; i < 5; i++) {
			var oPanel = sap.ui.core.Fragment.byId("createAromaFragment", aPanels[i]);
			oPanel.setExpanded(false);
		}
	},
	onAdjustPanelExpand_C: function(e) {
		var aPanels = ["panelID_1", "panelID_2", "panelID_3", "panelID_4", "panelID_5"];
		var sID = e.getSource().sId.split("--")[1];
		if (e.mParameters.expand) {
			for (var i = 0; i < aPanels.length; i++) {
				if (aPanels[i] !== sID) {
					var oPanel = sap.ui.core.Fragment.byId("createAromaFragment", aPanels[i]);
					oPanel.setExpanded(false);
				}
			}
		}
	},

	addAromaNodeToIstek: function() {
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		if (this.actionForEdit) {
			this.actionForEdit = false;
			this.oCreateAromaDialog.close();
			sap.m.MessageToast.show(oResource.getText("CHANGE_AROMA"));
			return;
		}
		var oCustomProductModel = this.getView().getModel("customProducts");
		var oAromaModel = this.getView().getModel("aroma");
		oAromaModel.setProperty("/ProductId", "FLAVOUR");
		var oComboModel = this.getView().getModel("ComboBox");
		var sProjeTuru = oAromaModel.getProperty("/ProjeTuru");
		var aFields = ["PypTanim", "ProjeTuru", "MusteriAdi", "SalesTeam/0/PartnerFunctionCode", "SalesTeam/1/PartnerFunctionCode"]; //,"SalesTeam/1/PartnerFunctionCode"
		var aFields_ID = ["ZZPYP_TANIM", "ZZPROJE_TURU", "ZZMUSTERI_ADI", "deliveryPersonID", "relatedPersonID"]; //,"relatedPersonID"
		var bCheck = false;
		for (var i = 0; i < aFields.length; i++) {
			var sProperty = oAromaModel.getProperty("/" + aFields[i]);
			if (sProperty === undefined || sProperty === "") {
				if (aFields_ID[i] !== "relatedPersonID") {
					var oEl = sap.ui.core.Fragment.byId("createAromaFragment", aFields_ID[i]);
					oEl.setValueState(sap.ui.core.ValueState.Error);
					bCheck = true;
				} else {
					oEl = sap.ui.core.Fragment.byId("createAromaFragment", aFields_ID[i]);
					oEl.setValueState(sap.ui.core.ValueState.None);
				}
			}
			if (sProperty === "00000015") { //00000015
				if (sProperty === "00000015" && oAromaModel.getProperty("/SalesTeam").length === 1) {
					var oDelivery = sap.ui.core.Fragment.byId("createAromaFragment", "deliveryPersonID");
					oDelivery.setValueState(sap.ui.core.ValueState.Error);
					bCheck = true;
				}

				oEl = sap.ui.core.Fragment.byId("createAromaFragment", "relatedPersonID");
				oEl.setValueState(sap.ui.core.ValueState.None);
			}
		}
		if (sProjeTuru) {
			var aCheckField = oComboModel.getProperty("/CheckValidations");
			if (aCheckField) {
				for (var j = 0; j < aCheckField.length; j++) {
					var oField = sap.ui.core.Fragment.byId("createAromaFragment", aCheckField[j]);
					var sState = oField.getValue();
					if (sState === "" || sState === undefined) {
						sap.ui.core.Fragment.byId("createAromaFragment", aCheckField[j]).setValueState(sap.ui.core.ValueState.Error);
						bCheck = true;
					}
				}
			}
		}
		if (bCheck) {
			var sErrorMsg = oResource.getText("ERROR_VALIDATION");
			sap.m.MessageBox.error(sErrorMsg);
		} else {
			var oInput = sap.ui.core.Fragment.byId("createAromaFragment", "relatedPersonID");
			var oInput2 = sap.ui.core.Fragment.byId("createAromaFragment", "deliveryPersonID");
			oInput.setValue("");
			oInput2.setValue("");
			var sParentId = oAromaModel.getProperty("/ParentID");
			var iNumberOfNode = oCustomProductModel.getProperty("/istekCollection")[sParentId].Nodes.length;
			var iIstekKalemNo = oCustomProductModel.getProperty("/istekCollection")[sParentId].NumberInt;
			var iKalemNo = (iNumberOfNode + 1) * 10 + iIstekKalemNo;
			oAromaModel.setProperty("/NumberInt", iKalemNo.toString());
			oAromaModel.setProperty("/ProductId", "FLAVOUR");
			var sMalzemeKod = oAromaModel.getProperty("/MalzemeKod");
			if (sMalzemeKod !== undefined && sMalzemeKod.length === 0) { // Malzeme kodu yoksa silmis bos gonder
				oAromaModel.setProperty("/MalzemeKod", "");
				oAromaModel.setProperty("/Malzeme", "");
				oAromaModel.setProperty("/OrijinTanim", "");
				oAromaModel.setProperty("/DoubleKod", "");
				oAromaModel.setProperty("/DoubleTanim", "");
			}
			var oAromaData = oAromaModel.getData();
			oCustomProductModel.getProperty("/istekCollection")[sParentId].Nodes.push(oAromaData);
			var bNumber = parseInt(sParentId) + 1;
			sap.m.MessageToast.show(bNumber + "." + oResource.getText("ADDAROMATO_ISTEK"));
			this.oCreateAromaDialog.close();
			var oListTree = sap.ui.core.Fragment.byId("customProductFragment", "treeID");
			var oBinding = oListTree.getBinding();
			oBinding.refresh();
			var oPage = sap.ui.core.Fragment.byId("customProductFragment", "listIstekID");
			oPage.rerender();
		}
		this.actionForEdit = false;
	},
	onAddAromaCancel: function() {
		if (this.oCreateAromaDialog) {
			this.oCreateAromaDialog.close();
		}
		this._onResetAllFormFields(this);
		var oInput = sap.ui.core.Fragment.byId("createAromaFragment", "relatedPersonID");
		var oInput2 = sap.ui.core.Fragment.byId("createAromaFragment", "deliveryPersonID");
		oInput.setValue("");
		oInput2.setValue("");
		this.actionForEdit = false;
		this.getView().getModel("aroma").setProperty("/MalzemeKod", "");
	},
	_onResetAllFormFields: function(oThis) {
		var aTitle = ["SimpleFormProjectInfo", "SimpleFormAromaInfo", "SimpleFormSOSInfo", "SimpleFormRelPerson"];
		for (var i = 0; i < aTitle.length; i++) {
			var oForm = sap.ui.core.Fragment.byId("createAromaFragment", aTitle[i]);
			var oContent = oForm.getContent();
			jQuery.each(oContent, function(key, el) {
				var sField = el.getMetadata().getName();
				if (sField === "sap.m.Input" || sField === "sap.m.ComboBox") {
					el.setValueState("None");
				}
			});
		}
	},
	onNavBackToProduct: function() {
		var oNavCon = sap.ui.core.Fragment.byId("customProductFragment", "navCon");
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment", "treeID");
		oListTree.removeSelections(true);
		oNavCon.back();
	},
	onCustomIstekKeep: function() {
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		var oTreeModel = this.getView().getModel("customProducts");
		oTreeModel.setProperty("/tempIstek/ProductId", "REQUEST");
		var oTempIstek = oTreeModel.getProperty("/tempIstek");
		oTreeModel.setProperty("/tempIstek", {
			Nodes: []
		});
		var aIstekCollection = oTreeModel.getProperty("/istekCollection");
		if (oTempIstek.Nodes === undefined) {
			oTempIstek.Nodes = [];
		}
		aIstekCollection.push(oTempIstek);
		var oNavCon = sap.ui.core.Fragment.byId("customProductFragment", "navCon");
		var oListPage = sap.ui.core.Fragment.byId("customProductFragment", "listIstekID");
		oNavCon.to(oListPage);
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment", "treeID");
		var oBinding = oListTree.getBinding();
		oBinding.refresh();
	},
	onSelectDeliveryValueHelp: function() {
		//this.setBusy(true);
		this.onSelectRelatedValueHelp(null, true);
	},
	onSelectRelatedValueHelp: function(e, isDelivery) {
		//this.setBusy(true);
		var sIsAccount = this.getView().byId("customer").getValue();
		if (sIsAccount === "") {
			// TO-DO Hata Mesaji ver 
			//sap.m.MessageBox.error(vMessage, [mOptions]);
		} else {
			if (isDelivery) {
				this._onCallServiceForPerson(isDelivery);
			}
			if (isDelivery !== true) {
				this._onCallServiceForPerson(false);
			}
			if (!this.oSelectPersonDialog) {
				this.oSelectPersonDialog = sap.ui.xmlfragment("selectPersonFragment",
					"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.SelectPersonDialog", this);
				this.oSelectPersonDialog.setModel(this.getView().getModel("i18n"), "i18n");
				this.getView().addDependent(this.oSelectPersonDialog);
			}
			this.oSelectPersonDialog.open();
		}
	},
	onCallServiceForCombo: function() {
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		var aCombox = ["ZZPROJE_TURU", "ZZMUSTERI_BUYUK", "ZZSATISA_DONUS", "ZZLIKELIHD", "ZZGONDERME_SEKLI", "ZZKARGO_ODEMESI",
			"ZZMSTRI_F_ZIYRTI", "ZZNUMUNE_BEDELI", "ZZPROAKTIF", "ZZTESLIM_SURESI", "ZZAROMA_OZELLIK", "ZZBU_RECETE", "ZZCOZUNURLUK",
			"ZZFIZIK_DURUM", "ZZALTERNATIF", "ZZHANGI_KOD", "ZZKOD_ACIKLAMA", "ZZNUMUNE_TIPI", "ZZSINIF_ISTEGI", "ZZURUN_BAZI",
			"ZZUYGULAMA", "ZZBOYA_TIPI", "ZZKORUYUCU", "ZZNUMUNE_AMB_TIP", "ZZSOS_AMB_TIP", "ZZSOS_TIPI"
		];
		var oModel = this.getView().getModel("ComboBox");
		var oSelf = this;

		for (var i = 0; i < aCombox.length; i++) {
			oDataModel.read("/CustomizingSearchHelpSet", {
				filters: [new sap.ui.model.Filter({
					path: "FieldName",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: aCombox[i]
				})],
				success: function(resp) {
					var sPath = "/" + resp.results[0].FieldName;
					oModel.setProperty(sPath, resp.results);
				},
				error: function(err) {
					oSelf._onParseErrorMsg(err);
				}
			});
		}

	},
	_onCallServiceForPerson: function(isDelivery) {
		var oSelf = this;
		var sAccountID = this.oSelectedAccount.accountID;
		if (this.AccountId && this.AccountId.length > 0) {
			sAccountID = this.AccountId;
		}
		var oModel = this.getView().getModel("AromaDetail");
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		var aCollection = [];
		if (isDelivery) {
			// Mali Teslim Alan
			var sPath = "/AccountCollection('" + sAccountID + "')/Relationships";
			var oFilter = new sap.ui.model.Filter({
				path: "relationshipCategory",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: "CRMH02"
			});
			oDataModel.read(sPath, {
				filters: [oFilter],
				success: function(resp) {
					jQuery.each(resp.results, function(key, el) {
						//               if (el.relationshipCategory !== "CRMH02") {
						//                   return;
						//               }
						var row = {
							FullName: el.account2FullName,
							ID: el.account2ID,
							Address: el.Address
						};
						aCollection.push(row);
					});
					//var oAccount = {};
					//oAccount.FullName = oThis.accountName;
					//oAccount.ID = oThis.accountId;
					//aCollection.push(oAccount); 
					oModel.setProperty("/PersonCollection", aCollection);
					oModel.setProperty("/isDelivery", isDelivery);
					//this.setBusy(false);
				},
				error: function(err) {
					oSelf._onParseErrorMsg(err);
				}
			});
		} else { //Ilgili Kisiler
			oDataModel.read("/ContactCollection", {
				filters: [new sap.ui.model.Filter({
					path: "accountID",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: sAccountID
				})],
				success: function(resp) {
					jQuery.each(resp.results, function(key, el) {
						var row = {
							FullName: el.fullName,
							ID: el.contactID
						};
						aCollection.push(row);
					});
					oModel.setProperty("/PersonCollection", aCollection);
					oModel.setProperty("/isDelivery", isDelivery);
					// this.setBusy(false);
				},
				error: function(err) {
					oSelf._onParseErrorMsg(err);
				}
			});
		}
	},
	onHandlePersonSelect: function(e) {
		var oModel = this.getView().getModel("AromaDetail");
		var oAromaModel = this.getView().getModel("aroma");
		var bDelivery = oModel.getProperty("/isDelivery");
		var oItem = e.getParameters().selectedItem;
		var sID = oItem.getProperty("info");
		var sFullName = oItem.getProperty("title");
		if (!bDelivery) {
			var row = {
				PartnerNumber: sID,
				PartnerFunctionCode: "00000015",
				PartnerFunctionText: sFullName
			};
			var oValueHelp1 = sap.ui.core.Fragment.byId("createAromaFragment", "relatedPersonID");
			oValueHelp1.setValue(sFullName);
			var oEl1 = sap.ui.core.Fragment.byId("createAromaFragment", "relatedPersonID");
			oEl1.setValueState(sap.ui.core.ValueState.None);

		} else {
			row = {
				PartnerNumber: sID,
				PartnerFunctionCode: "00000002",
				PartnerFunctionText: sFullName
			};
			var oValueHelp2 = sap.ui.core.Fragment.byId("createAromaFragment", "deliveryPersonID");
			oValueHelp2.setValue(sFullName);
			oEl1 = sap.ui.core.Fragment.byId("createAromaFragment", "deliveryPersonID");
			oEl1.setValueState(sap.ui.core.ValueState.None);
		}
		var aSalesTeam = oAromaModel.getProperty("/SalesTeam");
		aSalesTeam.push(row);
	},

	onHandlePersonSearch: function(e) {
		var sValue = e.getParameter("value");
		var oPractice = new sap.ui.model.Filter("FullName", sap.ui.model.FilterOperator.Contains, sValue);
		e.getSource().getBinding("items").filter(oPractice);
	},

	_onCallMusteriGrubu: function(sAccountID) {
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		var oSelf = this;
		oDataModel.callFunction("/GetCustomerGroupByID", {
			method: "GET",
			urlParameters: {
				"AccountID": sAccountID
			},
			success: function(resp) {

			},
			error: function(err) {
				oSelf._onParseErrorMsg(err);
			}
		});
	},
	onCreateNotesToAroma: function() {
		if (!this.oCreateNotesDialog) {
			this.oCreateNotesDialog = sap.ui.xmlfragment("createNotesFragment", "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.CreateNotes",
				this);
			this.oCreateNotesDialog.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.oCreateNotesDialog);
		}
		var sLang = sap.ui.getCore().getConfiguration().getLanguage();
		this.getView().getModel("aroma").setProperty("/NotesLanguageID", sLang.toUpperCase());
		this.oCreateNotesDialog.open();
	},
	onAddNotesToAroma: function() {
		var oModel = this.getView().getModel("aroma");
		//var sNoteType = "Z001"; //oModel.getProperty("/NotesType");
		var sLangType = oModel.getProperty("/NotesLanguageID");
		var sCustomNotes = oModel.getProperty("/CustomNotes");
		var row = {
			TextObjectID: "Z001",
			TextLanguageID: sLangType,
			Content: sCustomNotes
		};
		oModel.getData().ComplexNotes[0] = row;
		this.oCreateNotesDialog.close();
	},
	onAddNotesCancel: function() {
		this.oCreateNotesDialog.close();
		//var oModel = this.getView().getModel("aroma");
		// TO-DO onceki yazdiklarim kalmasin 
		//oModel.getProperty("/CustomNotes");
	},

	onCheckMaterialCode: function(e) {
		var sValue = e.mParameters.value;
		this.getView().getModel("aroma").setProperty("/MalzemeKod", sValue.toUpperCase());
		if (sValue.length === 0 || sValue.length >= 8) {
			this.getView().getModel("Update").setProperty("/MaterialCodeState", "None");
			this.onMaterialCodeSubmit(sValue.toUpperCase());
		} else {
			this.getView().getModel("Update").setProperty("/MaterialCodeState", "Warning");
			this.getView().getModel("aroma").setProperty("/MalzemeKod", "");
		}
	},

	onMaterialCodeSubmit: function(sMalzeme) {
		if (this.oCreateAromaDialog) {
			this.oCreateAromaDialog.setBusy(true);
		}
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		var oAroma = this.getView().getModel("aroma");
		oAroma.setProperty("/Malzeme", "");
		oAroma.setProperty("/OrijinTanim", "");
		oAroma.setProperty("/DoubleKod", "");
		oAroma.setProperty("/DoubleTanim", ""); //ModDesc
		oAroma.setProperty("/ModDesc", "");
		oAroma.setProperty("/Mod", "");
		oAroma.setProperty("/Sinif1", "");
		oAroma.setProperty("/Sinif2", "");
		//this.getView().setBusy(true);
		var oThis = this;
		var oModel = this.getView().getModel("ComboBox");
		//"FA100000"
		var sAccountID = this.oSelectedAccount.accountID;
		var sMalzemeKodu = sMalzeme; //e.getParameter("value");
		this._onCallServiceForClass("", sMalzemeKodu, "ZZSINIF_1");
		this._onCallServiceForClass("", sMalzemeKodu, "ZZSINIF_2");
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		var sProcessType = this.processType;
		oDataModel.callFunction("/CustomizingMalzemeKodlar", {
			method: "GET",
			urlParameters: {
				"PartnerNo": sAccountID,
				"MalzemeKodu": sMalzemeKodu,
				"ProcessType": sProcessType
			},
			success: function(resp) {
				if (oThis.oCreateAromaDialog) {
					oThis.oCreateAromaDialog.setBusy(false);
				}
				if (sProcessType === "Z007") {
					if (resp.results.length === 0) {
						oAroma.setProperty("/MalzemeKod", "");
						oAroma.setProperty("/Malzeme", "");
						oAroma.setProperty("/OrijinTanim", "");
						oAroma.setProperty("/DoubleKod", "");
						oAroma.setProperty("/DoubleTanim", "");
					}
					oModel.setProperty("/MalzemeCollection", resp.results);
					if (!oThis.oAddMalzemeDialog) {
						oThis.oAddMalzemeDialog = sap.ui.xmlfragment("addMalzemeFragment",
							"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.AddAromaMalzeme", oThis);
						oThis.oAddMalzemeDialog.setModel(oThis.getView().getModel("i18n"), "i18n");
						oThis.getView().addDependent(oThis.oAddMalzemeDialog);
					}
					if (sMalzeme.length !== 0) {
						oThis.oAddMalzemeDialog.open();
					}
				}
				if (sProcessType === "Z008") {
					if (resp.results.length > 0) {
						oAroma.setProperty("/Malzeme", resp.results[0].OrjinalKod);
						oAroma.setProperty("/OrijinTanim", resp.results[0].OrijinalKodTanim);
						oAroma.setProperty("/DoubleKod", resp.results[0].DoubleKod);
						oAroma.setProperty("/DoubleTanim", resp.results[0].DoubleKodTanim);
					} else {
						sap.m.MessageToast.show(oResource.getText("MATERIAL_NOTFOUND"));
						oAroma.setProperty("/MalzemeKod", "");
						oAroma.setProperty("/Malzeme", "");
						oAroma.setProperty("/OrijinTanim", "");
						oAroma.setProperty("/DoubleKod", "");
						oAroma.setProperty("/DoubleTanim", "");
					}
				}
			},
			error: function(err) {
				if (oThis.oCreateAromaDialog) {
					oThis.oCreateAromaDialog.setBusy(false);
				}
				oThis._onParseErrorMsg(err);
			}
		});
	},
	onFoundMaterialSelect: function(e) {
		var sPath = e.getParameter("selectedContexts")[0].sPath;
		var sNumber = sPath.slice(-1);
		var sProperty = "/MalzemeCollection/" + sNumber;
		var oModel = this.getView().getModel("aroma");
		var oComboModel = this.getView().getModel("ComboBox");
		var oSelectedItem = oComboModel.getProperty(sProperty);
		oModel.setProperty("/Malzeme", oSelectedItem.OrjinalKod);
		oModel.setProperty("/OrijinTanim", oSelectedItem.OrijinalKodTanim);
		oModel.setProperty("/DoubleKod", oSelectedItem.DoubleKod);
		oModel.setProperty("/DoubleTanim", oSelectedItem.DoubleKodTanim);
		this._onCallService_Mode(oSelectedItem.OrjinalKod);
		// Eger mode secmeden ilerlemek isterse claslara ondan ekledik	    
		this._onCallServiceForClass("", oSelectedItem.OrjinalKod, "ZZSINIF_1");
		this._onCallServiceForClass("", oSelectedItem.OrjinalKod, "ZZSINIF_2");
	},
	onFoundMaterialSearch: function(e) {
		var aFilter = [];
		var sValue = e.getParameter("value");
		if (sValue && sValue.length > 0) {
			var oBilesen = new sap.ui.model.Filter("Bilesen", sap.ui.model.FilterOperator.Contains, sValue);
			aFilter.push(oBilesen);
		}
		e.getSource().getBinding("items").filter(aFilter);
	},
	onFoundMaterialCancel: function() {
		this.getView().getModel("aroma").setProperty("/MalzemeKod");
		if (this.oAddMalzemeDialog) {
			//this.oAddMalzemeDialog.close();		        
		}
	},
	_onCallService_Mode: function(sMalzeme) {
		var oModel = this.getView().getModel("ComboBox");
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		var oSelf = this;
		oDataModel.callFunction("/CustomizingProductModlar", {
			method: "GET",
			urlParameters: {
				"MalzemeKod": sMalzeme
			},
			success: function(resp) {
				oModel.setProperty("/ModeCollection", resp.results);
			},
			error: function(err) {
				oSelf._onParseErrorMsg(err);
			}
		});
	},
	onGetClassServiceByMode: function(e) {
		var oModel = this.getView().getModel("aroma");
		var sModeKey = oModel.getProperty("/Mod");
		var sMalzemeKodu = oModel.getProperty("/Malzeme");
		if (sMalzemeKodu) {
			this._onCallServiceForClass(sModeKey, sMalzemeKodu, "ZZSINIF_1");
			this._onCallServiceForClass(sModeKey, sMalzemeKodu, "ZZSINIF_2");
		} else {
			this._onCallServiceForClass(sModeKey, "", "ZZSINIF_1");
			this._onCallServiceForClass(sModeKey, "", "ZZSINIF_2");
		}
	},
	_onCallServiceForClass: function(sMode, sMalzeme, sFieldName) {
		var that = this;
		var oModel = this.getView().getModel("ComboBox");
		//var sPath = "/" + sFieldName;
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		oDataModel.callFunction("/CustomizingProductSinif", {
			method: "GET",
			urlParameters: {
				"FieldName": sFieldName,
				"MalzemeKod": sMalzeme,
				"Mod": sMode
			},
			success: function(resp) {
				//oModel.setProperty(sPath,resp.results);
				if (resp.results.length > 1) {
					oModel.setProperty("/" + resp.results[1].FieldName, resp.results);
					if (resp.results[1].FieldName === "ZZSINIF_1") {
						//that.getView().getModel("aroma").setProperty("/Sinif1",resp.results[1].Key);                			
					}
					if (resp.results[1].FieldName === "ZZSINIF_2") {
						//that.getView().getModel("aroma").setProperty("/Sinif2",resp.results[1].Key);                			
					}
				}
				if (resp.results.length === 1) {
					oModel.setProperty("/" + resp.results[0].FieldName, resp.results);
					if (resp.results[0].FieldName === "ZZSINIF_1") {
						that.getView().getModel("aroma").setProperty("/Sinif1", resp.results[0].Key);
					}
					if (resp.results[0].FieldName === "ZZSINIF_2") {
						that.getView().getModel("aroma").setProperty("/Sinif2", resp.results[0].Key);
					}
				}
			},
			error: function(err) {
				that._onParseErrorMsg(err);
			}
		});
	},
	onCallServiceForValidations: function() {
		var oThis = this;
		var oModel = this.getView().getModel("aroma");
		var oComboModel = this.getView().getModel("ComboBox");
		var sProjeTuru = oModel.getProperty("/ProjeTuru");
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		oDataModel.callFunction("/CustomizingProductFieldSpecs", {
			method: "GET",
			urlParameters: {
				"ProjeTuru": sProjeTuru
			},
			success: function(resp) {
				oThis._onChangeFormValidations(resp.results, oComboModel);
			},
			error: function(err) {
				oThis._onParseErrorMsg(err);
			}
		});

	},
	_onChangeFormValidations: function(aField, oModel) {
		var sType = this.processType;
		var aCheckVal = [];
		jQuery.each(aField, function(key, el) {
			if (sType === "Z008" && el.FieldName !== "ZZHANGI_KOD") { //
				if (el.IsMandatory === "X") {
					var oEl1 = sap.ui.core.Fragment.byId("createAromaFragment", el.FieldName);
					oEl1.setValueState(sap.ui.core.ValueState.Error);
					aCheckVal.push(el.FieldName);
					oModel.setProperty("/CheckValidations", aCheckVal);
				} else {
					oEl1 = sap.ui.core.Fragment.byId("createAromaFragment", el.FieldName);
					oEl1.setValueState(sap.ui.core.ValueState.None);
				}
				if (el.IsReadOnly === "X") {
					var oEl2 = sap.ui.core.Fragment.byId("createAromaFragment", el.FieldName);
					oEl2.setEditable(false);
				} else {
					oEl2 = sap.ui.core.Fragment.byId("createAromaFragment", el.FieldName);
					oEl2.setEditable(true);
				}
			}
			if (sType === "Z007") { //
				if (el.IsMandatory === "X") {
					oEl1 = sap.ui.core.Fragment.byId("createAromaFragment", el.FieldName);
					oEl1.setValueState(sap.ui.core.ValueState.Error);
					aCheckVal.push(el.FieldName);
					oModel.setProperty("/CheckValidations", aCheckVal);
				} else {
					oEl1 = sap.ui.core.Fragment.byId("createAromaFragment", el.FieldName);
					oEl1.setValueState(sap.ui.core.ValueState.None);
				}
				if (el.IsReadOnly === "X") {
					oEl2 = sap.ui.core.Fragment.byId("createAromaFragment", el.FieldName);
					oEl2.setEditable(false);
				} else {
					oEl2 = sap.ui.core.Fragment.byId("createAromaFragment", el.FieldName);
					oEl2.setEditable(true);
				}
			}
		});
	},
	onCheckMandatoryCombo: function(e) {
		var oSource = e.getSource();
		var sState = oSource.getValueState();
		if (sState === "Error") {
			var sKey = oSource.getSelectedKey();
			if (sKey.length > 0) {
				oSource.setValueState("None");
			} else {
				oSource.setValueState("Error");
			}
		}
	},
	onCheckMandatoryInput: function(e) {
		var oSource = e.getSource();
		var sState = oSource.getValueState();
		var sValue = e.mParameters.value;
		// var patt = new RegExp(",");
		// if (patt.test(sValue)) {
		// 	//
		// }

		if (sState === "Error") {
			if (sValue.length > 0) {
				oSource.setValueState("None");
			} else {
				oSource.setValueState("Error");
			}
		}
	},
	//    captureHeaderInformation: function () {
	//        var o = {
	//            Description: this.byId("desc").getValue(),
	//            ExpectedSalesVolume: this.byId("volume").getValue(),
	//            CurrencyCode: this.byId("currency").getValue(),
	//            ChanceOfSuccess: this.byId("chanceofSuccess").getValue(),
	//            StartDate: this.byId("datePickerStartDate").getValue(),
	//            ClosingDate: this.byId("datePickerCloseDate").getValue(),
	//            AccountName: this.byId("customer").getValue(),
	//            MainContactName: this.byId("inputMainContact").getValue(),
	//            EmployeeRespName: this.byId("inputEmpResponsible_S5").getValue(),
	//            SalesStageCode: this.byId("stagedropdown").getSelectedKey(),
	//            UserStatusCode: this.byId("statusdropdown").getSelectedKey(),
	//            PriorityCode: this.byId("priority_val").getSelectedKey(),
	//            ForecastRelevance: this.byId("Switch").getState(),
	//            SalesOrg: this.byId("salesOrganization").getValue()
	//        };
	//        var a = this.byId("productBasket").getModel("json").getData();
	//        var b = this.byId("partnerBasket").getModel("json").getData();
	//        this.jsonoldEntry = JSON.stringify(o);
	//        this.jsonoldProducts = JSON.stringify(a);
	//        this.jsonoldPartners = JSON.stringify(b);
	//    },
	//    _versionSpecificInitializations: function (b) {
	//        var a = cus.crm.opportunity.util.schema._getEntityAnnotation(this.oModel, "service-schema-version", "Account");
	//        var f = cus.crm.opportunity.util.schema.getFilterString(this.oModel);
	//        this.accountF4Template = new sap.m.StandardListItem({
	//            title: f == "fullName" ? "{parts:[{path:'fullName'}],formatter : 'cus.crm.opportunity.util.Formatter.getAccountF4Title'}" : "{parts:[{path:'name1'}],formatter : 'cus.crm.opportunity.util.Formatter.getAccountF4Title'}",
	//            description: "{parts:[{path : 'accountID'},{path : 'MainAddress/city'},{path : 'MainAddress/country'}],formatter : 'cus.crm.opportunity.util.Formatter.formatAccountF4Description'}",
	//            active: true
	//        });
	//        this.accountF4Template = new sap.m.ObjectListItem({ title: "{parts : ['fullName','name1','accountID'],formatter : 'cus.crm.opportunity.util.Formatter.formatAccountF4Title'}" }).addAttribute(new sap.m.ObjectAttribute({ text: "{parts : [{path : 'accountID'},{path : 'MainAddress/city'},{path : 'MainAddress/country'}],formatter : 'cus.crm.opportunity.util.Formatter.formatAccountF4Description'}" }));
	//        if (parseFloat(b) >= 4) {
	//            this.byId("tit1").setVisible(true);
	//        } else {
	//            this.byId("tit1").setVisible(false);
	//            this.byId("partnerBasket").setVisible(false);
	//        }
	//    },
	//    fill_dropDowns: function (s) {
	//        var i, a;
	//        var j = new sap.ui.model.json.JSONModel();
	//        var b = new sap.ui.model.json.JSONModel();
	//        var c = new sap.ui.model.json.JSONModel();
	//        a = s.UserStatuses.length;
	//        var d = {
	//            UserStatuses: [{
	//                    BusinessTransaction: "",
	//                    LanguageCode: "",
	//                    ProcessType: this.processType,
	//                    StatusProfile: "",
	//                    UserStatusCode: "",
	//                    UserStatusText: ""
	//                }]
	//        };
	//        var e = "";
	//        for (i = 0; i < a; i++) {
	//            if (s.UserStatuses[i].ProcessType === this.processType) {
	//                d.UserStatuses.push(s.UserStatuses[i]);
	//                if (parseFloat(this.sBackendVersion) >= 3) {
	//                    if (s.UserStatuses[i].InitialStatus == true)
	//                        e = s.UserStatuses[i].UserStatusCode;
	//                }
	//                if (this.UserStatusCode === "" && s.UserStatuses[i].UserStatusCode != "") {
	//                    this.UserStatusCode = s.UserStatuses[i].UserStatusCode;
	//                    this.UserStatusText = s.UserStatuses[i].UserStatusText;
	//                }
	//                if (s.UserStatuses[i].BusinessTransaction === "WINN") {
	//                    this.getView().getController().WinStatusCode = s.UserStatuses[i].UserStatusCode;
	//                }
	//                if (s.UserStatuses[i].BusinessTransaction === "LOST") {
	//                    this.getView().getController().LostStatusCode = s.UserStatuses[i].UserStatusCode;
	//                }
	//                this.StatusProfile = s.UserStatuses[i].StatusProfile;
	//            }
	//        }
	//        j.setData(d);
	//        this.byId("statusdropdown").setModel(j, "json");
	//        this.byId("statusdropdown").setSelectedKey(e);
	//        var f = {
	//            Priorities: [{
	//                    LanguageCode: "",
	//                    PriorityCode: "",
	//                    PriorityText: ""
	//                }]
	//        };
	//        a = s.Priorities.length;
	//        for (i = 0; i < a; i++) {
	//            f.Priorities.push(s.Priorities[i]);
	//        }
	//        ;
	//        b.setData(f);
	//        this.byId("priority_val").setModel(b, "json");
	//        a = s.SalesStages.length;
	//        var g = new Array();
	//        var h = new Array();
	//        var k;
	//        var l;
	//        var m;
	//        var n = {
	//            SalesStages: [{
	//                    ChanceOfSuccess: "",
	//                    LanguageCode: "",
	//                    ProcessType: this.processType,
	//                    SalesStageCode: "",
	//                    SalesStageDescription: "",
	//                    SalesStageOrder: ""
	//                }]
	//        };
	//        for (i = 0; i < a; i++) {
	//            if (s.SalesStages[i].ProcessType === this.processType) {
	//                n.SalesStages.push(s.SalesStages[i]);
	//                g.push(s.SalesStages[i].SalesStageOrder);
	//                h = g.sort();
	//                k = h[0];
	//                if (s.SalesStages[i].SalesStageOrder == k) {
	//                    l = s.SalesStages[i].SalesStageCode;
	//                    m = Number(s.SalesStages[i].ChanceOfSuccess);
	//                }
	//            }
	//        }
	//        c.setData(n);
	//        this.byId("stagedropdown").setModel(c, "json");
	//        this.byId("stagedropdown").setSelectedKey(l);
	//        this.getView().byId("chanceofSuccess").setValue(m);
	//        window.setTimeout(jQuery.proxy(function () {
	//            this.captureHeaderInformation();
	//        }, this), 50);
	//    },
	//    onAfterRendering: function () {
	//        cus.crm.opportunity.util.Formatter.resetFooterContentRightWidth(this);
	//    },
	//    onBeforeRendering: function () {
	//        this.getView().getModel("controllers").getData().s5Controller = this;
	//        this.enableSaveBtn();
	//    },
	//    getHeaderFooterOptions: function () {
	//        return this.oHeaderFooterOptions;
	//        var t = this;
	//        return {
	//            oPositiveAction: {
	//                sId: "sv",
	//                sI18nBtnTxt: "SAVE",
	//                onBtnPressed: function () {
	//                    this.onSave();
	//                }
	//            },
	//            oNegativeAction: {
	//                sI18nBtnTxt: "CANCEL",
	//                onBtnPressed: function (e) {
	//                    this.onCancel();
	//                }
	//            }
	//        };
	//    },
	//    toDetail: function () {
	//        this.onCancel();
	//    },
	//    onCancel: function () {
	//        if (this._checkDataLoss()) {
	//            var c = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("CONTINUE");
	//            var C = sap.m.MessageBox.Action.CANCEL;
	//            sap.m.MessageBox.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("DATA_LOSS"), {
	//                icon: sap.m.MessageBox.Icon.WARNING,
	//                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("WARNING"),
	//                actions: [
	//                    c,
	//                    C
	//                ],
	//                onClose: jQuery.proxy(function (a) {
	//                    if (a == c) {
	//                        var r = {};
	//                        r.isConfirmed = true;
	//                        this.datalossDismissed(r);
	//                    } else if (a == C) {
	//                    }
	//                }, this)
	//            });
	//        } else
	//            this.datalossDismissed({ isConfirmed: true });
	//    },
	datalossDismissed: function(r) {
		if (r.isConfirmed === false)
			return;
		if (!this.followupOppt)
			var c = this.ContextPath;
		else
			var c = "Opportunities(guid'" + this.ContextPath + "')";
		if (!sap.ui.Device.system.phone && !this.fullScreen && !this.fullScreenFromTask && !this.newOpportunityFromAccount && !this.fullfollowupOppt &&
			!this.fullScreenFromLead) {
			if (c == " ") {
				// Customizing
				//c = "Opportunities";
				this.oRouter.navTo("noData");
			} else { // Customizing
				this.oRouter.navTo("detail", {
					contextPath: c
				}, true);
			}
		} else if (!sap.ui.Device.system.phone && (this.fullScreen || this.newOpportunityFromAccount)) {
			window.history.back();
		} else if (!sap.ui.Device.system.phone && (this.fullScreenFromTask || this.fullfollowupOppt || this.fullScreenFromLead)) {
			window.history.go(-1);
		} else
			this._navBack();
		this._clear_data();
		this._enableMasterFooter("");
		if (this.bBpDeterminationEnabled && this.bOrgDeterminationEnabled) {
			this.resetMultiDetermFlags();
		}
	},
	//    onAddProduct: function (e) {
	//        if (!this.oAddProductsFragment) {
	//            this.oAddProductsFragment = sap.ui.xmlfragment("cus.crm.opportunity.view.ProductBasketDialog", this);
	//            this.oAddProductsFragment.setModel(new sap.ui.model.json.JSONModel(), "json");
	//            this.oAddProductsFragment.setModel(this.getView().getModel("i18n"), "i18n");
	//        }
	//        this.oAddProductsFragment.getBeginButton().setEnabled(false);
	//        this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("LOADING_TEXT"));
	//        this.oAddProductsFragment.getSubHeader().getContentLeft()[0].clear();
	//        this.oModel.read("Products", null, null, true, jQuery.proxy(function (o, r) {
	//            if (r.data.results.length === 0)
	//                this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            this.oAddProductsFragment.getModel("json").setData({ Products: r.data.results });
	//        }, this), function (E) {
	//        });
	//        this.oAddProductsFragment.open();
	//    },
	onSave: function() {
		var v = true;
		if (this.extHookOnSave) {
			v = this.extHookOnSave();
		}
		if (!v) {
			return;
		}
		if (this.validateDates() === false)
			return;
		if (this.byId("inputMainContact").getValue() !== "" && this.contactId === undefined) {
			this.showContactF4();
			return;
		}
		if (this.byId("inputMainContact").getValue() === "") {
			this.contactId = undefined;
		}
		if (this.validateSavePage() === false) {
			sap.ca.ui.message.showMessageToast(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("MANDAT_FIELD"));
			return;
		}
		if (this.validateCurrency() === true) {
			sap.m.MessageBox.show(this.currencyMessage, {
				icon: sap.m.MessageBox.Icon.WARNING,
				title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("WARNING"),
				actions: [
					sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("CONTINUE"),
					sap.m.MessageBox.Action.CANCEL
				],
				onClose: jQuery.proxy(function(a) {
					if (a === "Continue" || a === "Devam") {
						var r = {};
						r.isConfirmed = true;
						this.dataConfirm(r);
					} else if (a === "CANCEL") {
						//
					}
				}, this)

				// function (oAction) {
				// 	if (oAction === "OK") {
				//         var r = {};
				//         r.isConfirmed = true;
				//         this.dataConfirm(r);
				// 	} else {
				// 		//
				// 	}
				// }

			});
		} else
			this.dataConfirm({
				isConfirmed: true
			});
	},
	//    enableSaveBtn: function (e) {
	//        if (this.byId("desc").getValue() !== "" && this.byId("customer").getValue() !== "" && this.byId("datePickerCloseDate").getValue() !== "") {
	//            this.setBtnEnabled("sv", true);
	//        } else {
	//            this.setBtnEnabled("sv", false);
	//        }
	//        if (this.extHookEnableSaveBtn) {
	//            this.extHookEnableSaveBtn();
	//        }
	//    },
	dataConfirm: function(r) {
		// Customizing
		var bCont = true;
		var sType = this.processType;
		if (sType === "Z003" || sType === "Z004" || sType === "Z007" || sType === "Z008") { // Satis Firsati main contact sadece satista zorunlu olacak
			var sValue = this.byId("salesOrganization").getValue();
			var sValue_2 = this.byId("inputMainContact").getValue();
			if (sValue === "") {
				this.byId("salesOrganization").setValueState(sap.ui.core.ValueState.Error);
				this.byId("inputMainContact").setValueState(sap.ui.core.ValueState.None);
				bCont = false;
			}
			if (sValue_2 === "" && (sType === "Z003" || sType === "Z004")) {
				this.byId("salesOrganization").setValueState(sap.ui.core.ValueState.None);
				this.byId("inputMainContact").setValueState(sap.ui.core.ValueState.Error);
				bCont = false;
			}
			if (!bCont) {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				sap.m.MessageBox.error(
					"Lütfen zorunlu alanları doldurunuz !", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
				return;
			}
		}

		if (r.isConfirmed) {
			if (this.WinStatusCode === this.byId("statusdropdown").getSelectedKey()) {
				this.getView().byId("chanceofSuccess").setValue(100);
			}
			if (this.LostStatusCode === this.byId("statusdropdown").getSelectedKey()) {
				this.getView().byId("chanceofSuccess").setValue(0);
			}
			var u = "";
			var a = "";
			if (this.byId("statusdropdown").getSelectedKey() == "") {
				u = this.UserStatusCode;
				a = this.UserStatusText;
			} else {
				u = this.byId("statusdropdown").getSelectedKey();
				a = this.byId("statusdropdown").getSelectedItem().getText();
			}
			var s = this.byId("datePickerStartDate").getDateValue();
			var e = this.byId("datePickerCloseDate").getDateValue();
			var b = s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate() + "T00:00:00";
			var c = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() + "T00:00:00";
			var d = "00000000-0000-0000-0000-000000000000";
			var m = this.getView().getModel();
			var t = this;
			if (this.followupOppt) {
				this.PredecessorGUID = this.ContextPath;
			} else if (this.fullScreen) {
				this.PredecessorGUID = this.appointmentGuid;
				this.accountId = this.AccountId;
			} else if (this.fullScreenFromTask) {
				this.PredecessorGUID = this.taskGuid;
			} else if (this.fullScreenFromLead) {
				this.PredecessorGUID = this.leadGuid;
				this.accountId = this.AccountId;
			} else {
				this.PredecessorGUID = null;
			}
			var E = {
				Description: this.byId("desc").getValue(),
				ProcessType: this.processType,
				StartDate: b,
				ClosingDate: c,
				ExpectedSalesVolume: this.byId("volume").getValue(),
				SalesStageCode: this.byId("stagedropdown").getSelectedKey(),
				UserStatusCode: u,
				UserStatusText: a,
				PriorityCode: this.byId("priority_val").getSelectedKey(),
				PriorityText: this.byId("priority_val").getSelectedItem().getText(),
				ProspectName: this.byId("customer").getValue(),
				ProspectNumber: this.accountId,
				MainContactId: this.contactId,
				MainContactName: this.byId("inputMainContact").getValue(),
				ChanceOfSuccess: this.byId("chanceofSuccess").getValue(),
				ForecastRelevance: this.byId("Switch").getState(),
				CurrencyCode: this.byId("currency").getValue(),
				Guid: d,
				Statuses: [{
					HeaderGuid: d,
					StatusProfile: this.StatusProfile,
					UserStatusCode: u,
					UserStatusText: a,
					StatusOrderNumber: "01"
				}],
				Products: [],
				SalesTeam: []
			};
			if (parseFloat(this.sBackendVersion) >= 4) {
				E.SalesOrganization = this.acc_salesorgid;
				E.SalesOrganizationDescription = this.acc_salesorgdesc;
				E.DistributionChannel = this.acc_dischaid;
				E.DistributionChannelDescription = this.acc_dischadesc;
				E.Division = this.acc_divid;
				E.DivisionDescription = this.acc_divdesc;
			}
			if (parseFloat(this.sBackendVersion) >= 2) {
				if (this.byId("inputEmpResponsible_S5").getValue() !== "") {
					E["EmployeeResponsibleNumber"] = this.oSelectedEmployee.employeeID ? this.oSelectedEmployee.employeeID : this.EmployeeResponsibleNumber;
				} else {
					E["EmployeeResponsibleNumber"] = "";
				}
			}
			if (parseFloat(this.sBackendVersion) >= 3) {
				E["PredecessorGUID"] = this.PredecessorGUID;
			}
			// Customizing duruma gore custom ya da standard alani calistiracagiz
			if (this.processType === "Z007" || this.processType === "Z008") {
				// Customizing Products Kulanilacak
				var oModel = this.getView().getModel("customProducts");
				if (oModel) {
					var aProducts = oModel.getProperty("/ServiceProducts");
					if (aProducts && aProducts.length) {
						for (var i = 0; i < aProducts.length; i++) {
							if (aProducts[i].NumberParent !== "") {
								for (var j = 0; j < aProducts[i].SalesTeam.length; j++) {
									delete aProducts[i].SalesTeam[j].PartnerFunctionText;
									delete aProducts[i].SalesTeam[j].Address;
								}
							}
						}
						E.Products = aProducts;
					}
				}
			}
			if (this.processType === "Z003" || this.processType === "Z004") { // Cuztomizing icinde ki code standard
				var p = this.getView().byId("productBasket").getModel("json").getData().Products;
				var i = 0;
				if (p && p.length) {
					var f = p.length;
					var L;
					for (i = 0; i < f; i++) {
						L = p[i];
						var g = {
							HeaderGuid: d,
							ProcessingMode: "A",
							ProductGuid: L.ProductGuid,
							ProductId: L.ProductId,
							ProductName: L.ProductName,
							Quantity: L.Quantity,
							TotalExpectedNetValue: L.TotalExpectedNetValue,
							Unit: L.Unit
						};
						if (this.extHookExtendProductEntry) {
							this.extHookExtendProductEntry(g, L);
						}
						E.Products.push(g);
					}
				}
			}
			var h;
			if (parseFloat(this.sBackendVersion) >= 4 && this.getView().byId("partnerBasket").getModel("json").getData().SalesTeam) {
				h = this.getView().byId("partnerBasket").getModel("json").getData().SalesTeam;
				if (h.length > 0) {
					if (this.followupOppt) {
						var n = new Array();
						var o = new Array();
						if (this.oldList.oData.hasOwnProperty("Competitor")) {
							for (var i = 0; i < this.oldList.oData["Competitor"].length; i++) {
								var g = {
									partner: "Competitor",
									name: this.oldList.oData["Competitor"][i].value,
									key: this.oldList.oData["Competitor"][i].key
								};
								o.push(g);
							}
						}
						var v = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
						for (var k = 0; k < v.length; k++) {
							if (this.oldList.oData[v[k].PartnerFunctionName])
								for (var i = 0; i < this.oldList.oData[v[k].PartnerFunctionName].length; i++) {
									if (this.deletedFromMain)
										if (this.deletedFromMain.oData[v[k].PartnerFunctionName])
											for (var j = 0; j < this.deletedFromMain.oData[v[k].PartnerFunctionName].length; j++) {
												if (this.deletedFromMain.oData[v[k].PartnerFunctionName][j].key == this.oldList.oData[v[k].PartnerFunctionName][i].key) {
													var g = {
														partner: v[k].PartnerFunctionName,
														name: this.deletedFromMain.oData[v[k].PartnerFunctionName][j].value,
														key: this.deletedFromMain.oData[v[k].PartnerFunctionName][j].key
													};
													n.push(g);
												}
											}
								}
						}
						for (var l = 0; l < h.length; l++) {
							for (var q = 0; q < n.length; q++) {
								if (h[l].PartnerFunction == n[q].partner && h[l].Key == n[q].key)
									n.splice(q, 1);
							}
						}
						if (!this.participantsF4MultiselectFragment.getModel("temp")) {
							this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "temp");
						}
						for (var i = 0; i < h.length; i++) {
							if (!this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + h[i].PartnerFunction)) {
								var g = {
									partner: h[i].PartnerFunction,
									name: h[i].Name,
									key: h[i].Key
								};
								this.participantsF4MultiselectFragment.getModel("temp").setProperty("/" + h[i].PartnerFunction, [g]);
							} else {
								var g = {
									partner: h[i].PartnerFunction,
									name: h[i].Name,
									key: h[i].Key
								};
								this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + h[i].PartnerFunction).push(g);
							}
						}
						for (var i = 0; i < n.length; i++) {
							if (!this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + n[i].partner)) {
								var g = {
									partner: n[i].partner,
									name: n[i].name,
									key: n[i].key
								};
								this.participantsF4MultiselectFragment.getModel("temp").setProperty("/" + n[i].partner, [g]);
							} else {
								var g = {
									partner: n[i].partner,
									name: n[i].name,
									key: n[i].key
								};
								this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + n[i].partner).push(g);
							}
						}
						for (var i = 0; i < v.length; i++) {
							if (this.oldList.oData[v[i].PartnerFunctionName])
								for (var j = 0; j < this.oldList.oData[v[i].PartnerFunctionName].length; j++) {
									if (this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + encodeURIComponent(v[i].PartnerFunctionName))) {
										for (var k = 0; k < this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + encodeURIComponent(v[i].PartnerFunctionName))
											.length; k++) {
											if (this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + encodeURIComponent(v[i].PartnerFunctionName))[k]
												.partner == v[i].PartnerFunctionName && this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" +
													encodeURIComponent(v[i].PartnerFunctionName))[k].key == this.oldList.oData[v[i].PartnerFunctionName][j].key)
												this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + encodeURIComponent(v[i].PartnerFunctionName)).splice(
													k, 1);
										}
									}
								}
						}
						for (var i = 0; i < v.length; i++) {
							if (this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + encodeURIComponent(v[i].PartnerFunctionName)))
								for (var j = 0; j < this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + encodeURIComponent(v[i].PartnerFunctionName))
									.length; j++) {
									var g = {
										partner: this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + encodeURIComponent(v[i].PartnerFunctionName))[
											j].partner,
										name: this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + encodeURIComponent(v[i].PartnerFunctionName))[
											j].name,
										key: this.participantsF4MultiselectFragment.getModel("temp").getProperty("/" + encodeURIComponent(v[i].PartnerFunctionName))[
											j].key
									};
									o.push(g);
								}
						}
						for (var i = 0; i < o.length; i++) {
							for (var j = 0; j < h.length; j++) {
								if (o[i].partner == h[j].PartnerFunction && o[i].key == h[j].Key)
									h.splice(j, 1);
							}
						}
					}
					if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryMainDelete"))
						this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryMainDelete").destroy();
					if (this.participantsF4MultiselectFragment.getModel("temp"))
						this.participantsF4MultiselectFragment.getModel("temp").destroy();
					this.newItems = o;
					this.deletedItems = n;
				}
			} else {
				h = "";
			}
			if (h.length > 0) {
				var i = 0;
				var P = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
				if (P == undefined || P.length === 0) {
					P = this.partnerDeterminationMap[this.processType];
				}
				var w = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType");
				if (h && h.length) {
					var f = h.length;
					for (i = 0; i < f; i++) {
						var L = h[i];
						var x;
						for (var y = 0; y < P.length; y++) {
							if (P[y].PartnerFunctionName == L.PartnerFunction) {
								x = P[y].PartnerFunctionCode;
							}
						}
						var g = {
							HeaderGuid: d,
							PartnerFunctionCode: x,
							PartnerNumber: L.Key,
							PartnerName: L.Name,
							PartnerFunctionText: L.PartnerFunction
						};
						if (this.extHookExtendSalesItemEntry) {
							this.extHookExtendSalesItemEntry(g, L);
						}
						E.SalesTeam.push(g);
					}
				}
				var z = this.getView().byId("partnerBasket").getItems();
				for (var A = 0; A < z.length; A++) {
					this.getView().byId("partnerBasket").removeItem(z[A]);
					z[A].destroy();
				}
				this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions = this.partnerDeterminationMap[this.processType];
				var B = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
				for (var C = 0; C < B.length; C++) {
					if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems()[C])
						this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems()[C].setInfo(" ");
				}
				this.participantsF4MultiselectFragment.getModel("json").destroy();
				if (this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType"))
					this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType").destroy();
				this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").destroy();
				this.byId("partnerBasket").getModel("json").updateBindings();
			}
			if (this.extHookSaveOentry) {
				this.extHookSaveOentry(E);
			}
			m.refreshSecurityToken();
			this.setBtnEnabled("sv", false);
			sap.ca.ui.utils.busydialog.requireBusyDialog();
			var D = this;
			var m = this.getView().getModel();
			var F = [];
			var G = [];
			var H = this.followupOppt;
			var I = this.newItems;
			var J = this.deletedItems;
			if (!I)
				I = [];
			if (!J)
				J = [];
			var P = this.partnerDeterminationMap[this.processType];
			var t = this;
			var K = false;
			var M = this.sBackendVersion;
			var N;
			m.create("/Opportunities", E, null, function(O, Q) {
				var R = t.getView().getModel("controllers").getData().s2Controller;
				if (R) {
					R.opportunityID = O.Id;
				}
				if (H && (I.length > 0 || J.length > 0) && parseFloat(M) >= 4) {
					for (var i = 0; i < I.length; i++) {
						var S;
						for (var k = 0; k < P.length; k++) {
							if (P[k].PartnerFunctionName == I[i].partner)
								S = P[k].PartnerFunctionCode;
						}
						E = {
							HeaderGuid: O.Guid,
							PartnerNumber: I[i].key,
							PartnerFunctionCode: S
						};
						F.push(m.createBatchOperation("OpportunitySalesTeamSet", "POST", E, null));
					}
					for (var i = 0; i < J.length; i++) {
						var S;
						for (var k = 0; k < P.length; k++) {
							if (P[k].PartnerFunctionName == J[i].partner)
								S = P[k].PartnerFunctionCode;
						}
						E = {
							HeaderGuid: O.Guid,
							PartnerNumber: J[i].key,
							PartnerFunctionCode: S
						};
						var T = [
							"OpportunitySalesTeamSet(HeaderGuid=guid'",
							E.HeaderGuid,
							"',PartnerNumber='",
							E.PartnerNumber,
							"',PartnerFunctionCode='",
							E.PartnerFunctionCode,
							"')"
						].join("");
						G.push(m.createBatchOperation(T, "DELETE", null, null));
					}
					if (F.length > 0)
						m.addBatchChangeOperations(F);
					if (G.length > 0)
						m.addBatchChangeOperations(G);
					m.submitBatch(jQuery.proxy(function(X) {
						for (var j = 0; j < X.__batchResponses.length; j++) {
							switch (j) {
								case 0:
									if (X.__batchResponses[0]) {
										for (var i = 0; i < X.__batchResponses[0].__changeResponses.length; i++) {
											if (X.__batchResponses[0].__changeResponses[i].statusCode < 400) {
												K = true;
												N = X.__batchResponses[0].__changeResponses[i].statusText;
											}
										}
									}
									break;
								default:
									if (X.__batchResponses[1]) {
										for (var i = 0; i < X.__batchResponses[1].__changeResponses.length; i++) {
											if (X.__batchResponses[1].__changeResponses[i].statusCode < 400) {
												K = true;
												N = X.__batchResponses[0].__changeResponses[i].statusText;
											}
										}
									}
									break;
							}
						}
					}, t), jQuery.proxy(function(X) {
						t.handleErrors(X);
					}, t));
				}
				if (K)
					sap.m.MessageToast.show(N);
				if (!D.fullScreen && !D.fullScreenFromTask && !D.fullfollowupOppt && !D.newOpportunityFromAccount && !D.fullScreenFromLead)
					t._enableMasterFooter(Q.data.Guid);
				t.ContextPath = "Opportunities(guid'" + Q.data.Guid + "')";
				if (D.followupOppt || D.fullScreen || D.fullScreenFromTask || D.fullScreenFromLead) {
					sap.ui.getCore().getEventBus().publish("cus.crm.opportunity", "followUpOpportunityCreated", {
						contextPath: t.ContextPath
					});
					var U = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("followupsuccessful");
					sap.m.MessageToast.show(U, {
						closeOnBrowserNavigation: false
					});
				} else {
					sap.ui.getCore().getEventBus().publish("cus.crm.opportunity", "opportunityCreated");
					sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SAVE_SUCCESS"), {
						closeOnBrowserNavigation: false
					});
				}
				t._clear_data();
				if (t.bBpDeterminationEnabled && t.bOrgDeterminationEnabled) {
					t.resetMultiDetermFlags();
				}
				var V = false;
				if (t.extHookNavigateAfterCreate) {
					V = t.extHookNavigateAfterCreate(O, Q);
				}
				if (V) {
					sap.ca.ui.utils.busydialog.releaseBusyDialog();
					return;
				}
				sap.ca.ui.utils.busydialog.releaseBusyDialog();
				var W = t.ContextPath;
				if (!sap.ui.Device.system.phone && !D.fullScreen && !D.fullScreenFromTask && !D.fullScreenFromLead && !D.fullfollowupOppt && !D.newOpportunityFromAccount)
					t.oRouter.navTo("detail", {
						contextPath: W
					}, true);
				else if (!sap.ui.Device.system.phone && D.fullScreen) {
					t.oRouter.navTo("display", {
						contextPath: W
					}, true);
				} else if (!sap.ui.Device.system.phone && D.fullfollowupOppt) {
					t.oRouter.navTo("display", {
						contextPath: W
					}, true);
				} else if (!sap.ui.Device.system.phone && (D.fullScreenFromTask || D.fullScreenFromLead)) {
					t.oRouter.navTo("display", {
						contextPath: W
					}, true);
				} else if (!sap.ui.Device.system.phone && D.newOpportunityFromAccount) {
					t.oRouter.navTo("display", {
						contextPath: W
					}, true);
				} else if (sap.ui.Device.system.phone && (D.fullScreen || D.fullScreenFromTask || D.fullScreenFromLead || D.fullfollowupOppt || D.newOpportunityFromAccount)) {
					t.oRouter.navTo("display", {
						contextPath: W
					}, true);
				} else
					t._navBack();
			}, function(O) {
				t.displayResponseErrorMessage(O, sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SAVE_FAILED"));
				sap.ca.ui.utils.busydialog.releaseBusyDialog();
				t.setBtnEnabled("sv", true);
			});
		} else
			return;
	},
	//    displayResponseErrorMessage: function (m, d) {
	//        var M, D;
	//        if (m.response) {
	//            var r = jQuery.parseJSON(m.response.body).error;
	//            if (r.innererror && r.innererror.errordetails) {
	//                var e = r.innererror.errordetails;
	//                for (var i = 0; i < e.length; i++) {
	//                    if (e[i].message.length > 0) {
	//                        if (D == null)
	//                            D = e[i].message;
	//                        else
	//                            D += "\n" + e[i].message;
	//                    }
	//                }
	//            }
	//            M = r.message.value;
	//        } else
	//            M = d;
	//        sap.ca.ui.message.showMessageBox({
	//            type: sap.ca.ui.message.Type.ERROR,
	//            message: M,
	//            details: D
	//        });
	//    },
	//    _enableMasterFooter: function (g) {
	//        var s = this.getView().getModel("controllers").getData().s2Controller;
	//        s.setBtnEnabled("sort", true);
	//        s.setBtnEnabled("BTN_S2_ADD", true);
	//        s.setBtnEnabled("BTN_S2_SHOW", true);
	//        var i = false;
	//        if (g != "")
	//            i = true;
	//        var d = this.byId("desc").getValue();
	//        if (d != "") {
	//            s.desc = d;
	//            s.nGuid = g;
	//            s.bCreateOppt = true;
	//            s._modifyListAfterCreate(i);
	//        }
	//    },
	//    callController: function (s, p) {
	//        var m = this.getView().getModel();
	//        var b = [];
	//        var S = "UserStatuses";
	//        if (p && p != "") {
	//            var f = jQuery.sap.encodeURL("ProcessType eq '" + p + "'");
	//            S = S + "?$filter=" + f;
	//        }
	//        b.push(m.createBatchOperation("SalesStages", "GET"));
	//        b.push(m.createBatchOperation("Priorities", "GET"));
	//        b.push(m.createBatchOperation(S, "GET"));
	//        b.push(m.createBatchOperation("Currencies", "GET"));
	//        m.addBatchReadOperations(b);
	//        s = {
	//            SalesStages: [],
	//            Priorities: [],
	//            UserStatuses: [],
	//            Currencies: []
	//        };
	//        m.submitBatch(jQuery.proxy(function (r) {
	//            if (r.__batchResponses[0].statusCode === "200") {
	//                s.SalesStages = r.__batchResponses[0].data.results;
	//            } else
	//                this.handleErrors(r, true);
	//            if (r.__batchResponses[1].statusCode === "200") {
	//                s.Priorities = r.__batchResponses[1].data.results;
	//            } else
	//                this.handleErrors(r, true);
	//            if (r.__batchResponses[2].statusCode === "200") {
	//                s.UserStatuses = r.__batchResponses[2].data.results;
	//            } else
	//                this.handleErrors(r, true);
	//            if (r.__batchResponses[3].statusCode === "200") {
	//                this.Currencies = r.__batchResponses[3].data.results;
	//                this.byId("currency").setModel(new sap.ui.model.json.JSONModel({ Currencies: this.Currencies }), "json");
	//            } else
	//                this.handleErrors(r, true);
	//            this.fill_dropDowns(s);
	//        }, this), jQuery.proxy(this.handleErrors, this), true);
	//    },
	_clear_data: function() {
		this.byId("desc").setValue("");
		this.byId("desc").setValueState(sap.ui.core.ValueState.None);
		this.byId("volume").setValue("");
		this.byId("inputMainContact").setValue("");
		this.byId("customer").setValue("");
		this.byId("customer").setValueState(sap.ui.core.ValueState.None);
		if (this.bBpDeterminationEnabled) {
			this.byId("inputEmpResponsible_S5").setValue("");
		}
		//Customizing
		this.byId("salesOrganization").setValueState(sap.ui.core.ValueState.None);

		this.byId("currency").setValue("");
		this.byId("chanceofSuccess").setValue("");
		this.byId("datePickerStartDate").setValueState(sap.ui.core.ValueState.None);
		this.byId("datePickerCloseDate").setValueState(sap.ui.core.ValueState.None);
		this.byId("datePickerStartDate").setValue("");
		this.byId("datePickerCloseDate").setValue("");
		this.byId("statusdropdown").setSelectedKey();
		this.byId("priority_val").setSelectedKey("");
		this.byId("stagedropdown").setSelectedKey("");
		this.getView().byId("salesorganization_Text").setText("");
		this.getView().byId("salesOrganization").setValue("");
		this.getView().byId("distributionchannel_Text").setText("");
		this.getView().byId("division_Text").setText("");
		this.followUp = false;
		this.byId("Switch").setState(true);
		var d = {
			Products: []
		};
		this.byId("productBasket").getModel("json").setData(d);
		this.accountId = undefined;
		this.accountName = "";
		var i = this.getView().byId("partnerBasket").getItems();
		for (var a = 0; a < i.length; a++) {
			this.getView().byId("partnerBasket").removeItem(i[a]);
			i[a].destroy();
		}
		if (this.participantsF4MultiselectFragment) {
			var p = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems();
			if (p)
				for (var b = 0; b < p.length; b++) {
					this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems()[b].setInfo(" ");
				}
			if (this.participantsF4MultiselectFragment.getModel("json"))
				this.participantsF4MultiselectFragment.getModel("json").destroy();
			if (this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType"))
				this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType").destroy();
			if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryMainDelete"))
				this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryMainDelete").destroy();
			if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory"))
				this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").destroy();
			this.byId("partnerBasket").getModel("json").updateBindings();
		}
		if (this.bBpDeterminationEnabled) {
			this.bpDeterminationResults = {};
		}
		if (this.bOrgDeterminationEnabled) {
			this.orgDeterminationResults = {
				results: []
			};
		}
	},
	//    onSearchProduct: function (e) {
	//        this.oAddProductsFragment.getBeginButton().setEnabled(false);
	//        this.oAddProductsFragment.getContent()[0].removeSelections();
	//        this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("LOADING_TEXT"));
	//        this.oAddProductsFragment.getModel("json").setData({ Products: [] });
	//        var f = [];
	//        var q = e.getParameter("query");
	//        if (q !== "") {
	//            f.push("$filter=substringof('" + q + "',ProductDescription)");
	//        }
	//        this.oModel.read("Products", null, f, true, jQuery.proxy(function (o, r) {
	//            if (r.data.results.length === 0) {
	//                this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }
	//            this.oAddProductsFragment.getModel("json").setData({ Products: r.data.results });
	//        }, this), jQuery.proxy(function (E) {
	//            this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//        }, this));
	//    },
	//    onCancelDialog: function (e) {
	//        this.oAddProductsFragment.close();
	//        this.oAddProductsFragment.getContent()[0].removeSelections();
	//    },
	//    onAddDialog: function (e) {
	//        var p = this.oAddProductsFragment.getContent()[0];
	//        var s = p.getSelectedItems();
	//        var a = { Products: [] };
	//        var d = this.byId("productBasket").getModel("json").getData();
	//        if (d && d.hasOwnProperty("Products"))
	//            a.Products = d.Products;
	//        var i = 0;
	//        var l = s.length;
	//        var L;
	//        for (i = 0; i < l; i++) {
	//            L = s[i];
	//            var t = L.getBindingContext("json").getObject();
	//            var b = {
	//                ItemGuid: "",
	//                ProcessingMode: "",
	//                ProductGuid: t.ProductGuid,
	//                ProductId: t.ProductId,
	//                ProductName: t.ProductDescription,
	//                Quantity: "1",
	//                Unit: t.Unit
	//            };
	//            if (this.extHookExtendProductEntryOnAdd) {
	//                this.extHookExtendProductEntryOnAdd(b, t);
	//            }
	//            a.Products.push(b);
	//        }
	//        var c = new sap.ui.model.json.JSONModel(a);
	//        this.byId("productBasket").setModel(c, "json");
	//        this.byId("productBasket").getModel("json").setData(a);
	//        p.removeSelections();
	//        e.getSource().getParent().close();
	//    },
	//    deleteProduct: function (e) {
	//        var d = e.getSource().getModel("json").getData();
	//        var p = e.getSource().getBindingContext("json").getObject();
	//        var i;
	//        var l = d.Products.length;
	//        var s = this.getView().getController();
	//        for (i = 0; i < l; i++)
	//            if (p === d.Products[i]) {
	//                d.Products.splice(i, 1);
	//            }
	//        s.byId("productBasket").getModel("json").setData(d);
	//    },
	showContactF4: function(e) {
		var m = this.getView().getModel();
		this.contactF4Fragment.getContent()[0].removeSelections();
		this.contactF4Fragment.setModel(new sap.ui.model.json.JSONModel());
		this.contactF4Fragment.setModel(this.getView().getModel("i18n"), "i18n");
		this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
			"LOADING_TEXT"));
		var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
		var a = t.getContent()[0];
		t.setVisible(false);
		var s = this.byId("inputMainContact")._lastValue;
		var T = s.split("/");
		var b = T[0].replace(/\s+$/, "");
		this.contactF4Fragment.getSubHeader().getContentLeft()[0].setValue(b);
		this.contactF4Fragment.open();
		var j = new sap.ui.model.json.JSONModel();
		this.contactF4Fragment.setModel(j, "json");
		if (this.accountId !== "" && this.acountId !== null && this.accountId !== undefined && !this.bBpDeterminationEnabled) {
			//t.setVisible(true);	Customizing musteri istemedi !
			a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FILTER") + " " + this.accountName);
			m.read("/AccountCollection(accountID='" + this.accountId + "')/Contacts", null, ["$filter=substringof('" + b + "'" + ",fullName)"],
				true, jQuery.proxy(function(o, r) {
					this.contactF4Fragment.getModel("json").setData({
						ContactCollection: r.data.results
					});
					if (r.data.results.length === 0)
						this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
							"NO_CONTACTS"));
				}, this), jQuery.proxy(function(E) {
					this.contactF4Fragment.getModel("json").setData({
						ContactCollection: []
					});
					this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
						"NO_CONTACTS"));
				}, this));
		} else {
			if (this.bBpDeterminationEnabled) {
				var M = this._prepareHeaderF4Model();
				if (M.Contact.length >= 0) {
					this.contactF4Fragment.getSubHeader().getContentLeft()[0].setValue("");
					if (M.Contact.length == 0) {
						this.contactF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
					}
					this.contactF4Fragment.getModel("json").setData({
						ContactCollection: M.Contact
					});
					//t.setVisible(true);	// Customizing Musteri istemedi !
					a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("DETERM_FILTER"));
					return;
				}
			}
			t.setVisible(false);
			this.contactF4Fragment.getModel("json").setData({
				ContactCollection: []
			});
			this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
				"LOADING_TEXT"));
			m.read("ContactCollection", null, ["$filter=substringof('" + b + "'" + ",fullName)"], true, jQuery.proxy(function(o, r) {
				this.contactF4Fragment.getModel("json").setData({
					ContactCollection: r.data.results
				});
				if (r.data.results.length === 0)
					this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
						"NO_CONTACTS"));
			}, this), jQuery.proxy(function(E) {
				this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
					"NO_CONTACTS"));
			}, this));
		}
	},
	//    showAccountF4: function (e) {
	//        this.accountF4Fragment = null;
	//        this.accountF4Fragment = new sap.ui.xmlfragment(this.createId("accountF4"), "cus.crm.opportunity.view.AccountSelectDialog", this);
	//        this.accountF4Fragment.setModel(this.oI18nModel, "i18n");
	//        var j = new sap.ui.model.json.JSONModel();
	//        this.accountF4Fragment.setModel(j);
	//        this.accountF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("LOADING_TEXT"));
	//        var t = this.accountF4Fragment.getContent()[0].getInfoToolbar();
	//        var a = t.getContent()[0];
	//        t.setVisible(false);
	//        this.accountF4Fragment.open();
	//        if (this.bBpDeterminationEnabled) {
	//            t.setVisible(true);
	//            a.setText(this.oResourceBundle.getText("DETERM_FILTER"));
	//            var m = this._prepareHeaderF4Model();
	//            if (m.Account && m.Account.length > 0) {
	//                this.accountF4Fragment.getSubHeader().getContentLeft()[0].setValue("");
	//                this.accountF4Fragment.getModel().setData({ AccountCollection: m.Account });
	//            } else {
	//                this.accountF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }
	//        } else {
	//            var s = this.byId("customer").getValue();
	//            var T = s.split("/");
	//            var b = T[0].replace(/\s+$/, "");
	//            this.accountF4Fragment.getSubHeader().getContentLeft()[0].setValue(b);
	//            this._refreshAccountList(b);
	//        }
	//    },
	//    closeAccountF4: function (e) {
	//        this.accountF4Fragment.close();
	//        this.accountF4Fragment.destroy();
	//    },
	//    closeContactF4: function (e) {
	//        var j = new sap.ui.model.json.JSONModel();
	//        j.setData({ ContactCollection: [] });
	//        this.contactF4Fragment.setModel(j, "json");
	//        this.contactF4Fragment.close();
	//    },
	setAccount: function(e) {
		this.oSelectedAccount = e.getSource().getSelectedItem().getBindingContext().getObject();
		var a = this.oSelectedAccount.fullName;
		var b = this.oSelectedAccount.accountID;
		if (a && a !== "") {
			this.byId("customer").setValue(a);
			this.accountName = a;
		} else {
			this.byId("customer").setValue(b);
			this.accountName = b;
		}
		this.accountId = b;
		this.byId("customer").setValueState(sap.ui.core.ValueState.None);
		this.accountF4Fragment.getContent()[0].removeSelections();
		this._triggerDetermination();
		this.accountF4Fragment.close();
		this.accountF4Fragment.destroy();
		this.enableSaveBtn();

		// Customizing for musteri grubu servisi cagirma
		//this._onCallMusteriGrubu(b);
	},
	//    closeSalesAreaF4: function (e) {
	//        if (this.salesareaF4Fragment !== undefined) {
	//            if (parseFloat(this.sBackendVersion) >= 6) {
	//                var t = this.salesareaF4Fragment.getContent()[0].getInfoToolbar();
	//                t.getContent()[2].setVisible(false);
	//            }
	//            this.salesareaF4Fragment.close();
	//            if (this.salesareaF4Fragment.getSubHeader().getContentLeft()[0].getValue() != "")
	//                this.salesareaF4Fragment.getSubHeader().getContentLeft()[0].setValue("");
	//        }
	//    },
	setSalesArea: function(e) {
		this.oSelectedContact = e.getSource().getSelectedItem().getBindingContext("json").getObject();
		this.acc_salesorgid = this.oSelectedContact.SalesOrganizationId;
		this.acc_salesorgdesc = this.oSelectedContact.SalesOrganizationText;
		var s = cus.crm.opportunity.util.Formatter.formatSalesOrganization(this.acc_salesorgdesc, this.acc_salesorgid);
		this.getView().byId("salesOrganization").setValue(s);
		this.acc_dischaid = this.oSelectedContact.DistrubutionChannelId;
		this.acc_dischadesc = this.oSelectedContact.DistrubutionChannelText;
		var d = cus.crm.opportunity.util.Formatter.formatDistributionChannel(this.acc_dischadesc, this.acc_dischaid);
		this.getView().byId("distributionchannel_Text").setText(d);
		this.acc_divid = this.oSelectedContact.DivisionId;
		this.acc_divdesc = this.oSelectedContact.DivisionText;
		var a = cus.crm.opportunity.util.Formatter.formatDivision(this.acc_divdesc, this.acc_divid);
		this.getView().byId("division_Text").setText(a);
		this.salesareaF4Fragment.getContent()[0].removeSelections();
		this.closeSalesAreaF4(e);
		//Customizing
		this.byId("salesOrganization").setValueState(sap.ui.core.ValueState.None);
	},
	//    searchSalesArea: function (e) {
	//        var v = e.getParameter("query").toLowerCase();
	//        var s = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea").getProperty("/SalesAreaList").results;
	//        var a = new Array();
	//        for (var k = 0; k < s.length; k++) {
	//            if (s[k].SalesOrganizationText.toLowerCase().search(v) != -1 || s[k].DistrubutionChannelText.toLowerCase().search(v) != -1 || s[k].DivisionText.toLowerCase().search(v) != -1) {
	//                a.push(s[k]);
	//            }
	//        }
	//        this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//        this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: a });
	//        this.salesareaF4Fragment.getModel("json").updateBindings();
	//    },
	//    showSalesAreaF4: function (e) {
	//        if (this.bOrgDeterminationEnabled != true) {
	//            var a = this.byId("customer").getValue();
	//            if (a.length == 0) {
	//                var m = this.oResourceBundle.getText("NO_ACCOUNT");
	//                sap.m.MessageToast.show(m);
	//                return;
	//            }
	//        }
	//        if (!this.salesareaF4Fragment) {
	//            this.salesareaF4Fragment = new sap.ui.xmlfragment(this.createId("salesareaF4"), "cus.crm.opportunity.view.SalesAreaDialog", this);
	//            this.salesareaF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "json");
	//            this.salesareaF4Fragment.setModel(this.oI18nModel, "i18n");
	//        }
	//        this.salesareaF4Fragment.getContent()[0].removeSelections();
	//        this.salesareaF4Fragment.setModel(this.oI18nModel, "i18n");
	//        this.salesareaF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        var t = this.salesareaF4Fragment.getContent()[0].getInfoToolbar();
	//        var b = t.getContent()[0];
	//        if (parseFloat(this.sBackendVersion) >= 6) {
	//            t.getContent()[2].setVisible(true);
	//        }
	//        if (this.fullScreenFromTask || this.fullScreen || this.fullScreenFromLead)
	//            this.accountId = this.AccountId;
	//        if (this.bOrgDeterminationEnabled != true) {
	//            if (this.accountId !== "" && this.accountId !== null && this.accountId !== undefined) {
	//                t.setVisible(true);
	//                b.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FILTER") + " " + this.accountName);
	//                this.oModel.read("/SalesAreas", null, ["$filter=ProspectNumber eq '" + this.accountId + "'"], false, jQuery.proxy(function (o, r) {
	//                    this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//                    if (!this.salesareaF4Fragment.getModel("SalesArea")) {
	//                        this.salesareaF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "SalesArea");
	//                    }
	//                    var s = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea");
	//                    s.setProperty("/SalesAreaList", r.data);
	//                }, this), jQuery.proxy(function (E) {
	//                    this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: [] });
	//                    this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//                }, this));
	//            }
	//            if (!this.salesareaF4Fragment.getModel("SalesArea")) {
	//                this.salesareaF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "SalesArea");
	//                var s = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea");
	//                s.setProperty("/SalesAreaList", "");
	//            }
	//            var v = this.byId("salesOrganization").getValue().toLowerCase().split(" (", 1);
	//            this.salesareaF4Fragment.getSubHeader().getContentLeft()[0].setValue(v);
	//            var c = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea").getProperty("/SalesAreaList").results;
	//            var d = new Array();
	//            for (var k = 0; k < c.length; k++) {
	//                if (c[k].SalesOrganizationText.toLowerCase().search(v) != -1 || c[k].DistrubutionChannelText.toLowerCase().search(v) != -1 || c[k].DivisionText.toLowerCase().search(v) != -1) {
	//                    d.push(c[k]);
	//                }
	//            }
	//            this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: d });
	//            this.salesareaF4Fragment.getModel("json").updateBindings();
	//        } else {
	//            this.bindSalesAreaList(this.orgDeterminationResults);
	//            this.setSalesAreaSearchinput("");
	//        }
	//        this.salesareaF4Fragment.open();
	//    },
	//    closeEmployeeF4: function (e) {
	//        this.employeeF4Fragment.close();
	//    },
	//    showEmployeeF4: function (e) {
	//        if (!this.employeeF4Fragment) {
	//            this.employeeF4Fragment = new sap.ui.xmlfragment(this.createId("employeeF4"), "cus.crm.opportunity.view.EmployeeF4", this);
	//            this.employeeF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "json");
	//            this.employeeF4Fragment.setModel(this.oI18nModel, "i18n");
	//        }
	//        this.employeeF4Fragment.getContent()[0].removeSelections();
	//        this.employeeF4Fragment.setModel(this.oI18nModel, "i18n");
	//        this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        var t = this.employeeF4Fragment.getContent()[0].getInfoToolbar();
	//        var a = t.getContent()[0];
	//        t.setVisible(false);
	//        var s = this.byId("inputEmpResponsible_S5").getValue();
	//        var T = s.split("/");
	//        var b = T[0].replace(/\s+$/, "");
	//        this.employeeF4Fragment.getSubHeader().getContentLeft()[0].setValue(b);
	//        var o = this.HeaderObject;
	//        if (this.accountId !== undefined && this.accountId !== null && this.accountId !== "" && !this.bBpDeterminationEnabled) {
	//            t.setVisible(true);
	//            a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FILTER") + " " + this.accountName);
	//            this.oModel.read("/AccountCollection(accountID='" + this.accountId + "')/EmployeeResponsibles", null, ["$filter=substringof('" + this.byId("inputEmpResponsible_S5").getValue() + "'" + ",fullName)"], true, jQuery.proxy(function (c, r) {
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data] });
	//                this.employeeF4Fragment.getModel("json").updateBindings();
	//            }, this), jQuery.proxy(function (E) {
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: [] });
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this));
	//        } else {
	//            if (this.bBpDeterminationEnabled) {
	//                var m = this._prepareHeaderF4Model();
	//                if (m.Employee.length >= 0) {
	//                    this.employeeF4Fragment.getSubHeader().getContentLeft()[0].setValue("");
	//                    if (m.Employee.length == 0) {
	//                        this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//                    }
	//                    this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: m.Employee });
	//                    t.setVisible(true);
	//                    a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("DETERM_FILTER"));
	//                    this.employeeF4Fragment.open();
	//                    return;
	//                }
	//            }
	//            t.setVisible(false);
	//            this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: [] });
	//            this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//            this.oModel.read("EmployeeCollection", null, ["$filter=substringof('" + this.byId("inputEmpResponsible_S5").getValue() + "'" + ",fullName)"], true, jQuery.proxy(function (c, r) {
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data] });
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this));
	//        }
	//        this.employeeF4Fragment.open();
	//    },
	//    closeEmpToolbar: function (e) {
	//        var t = this.employeeF4Fragment.getContent()[0].getInfoToolbar();
	//        var o = this.employeeF4Fragment.getContent()[0];
	//        var s = this.employeeF4Fragment.getSubHeader().getContentLeft()[0].getValue();
	//        t.setVisible(false);
	//        o.getBinding("items").aFilters = [];
	//        o.getBinding("items").sFilterParams = "";
	//        o.getBinding("items").refresh();
	//        this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: [] });
	//        o.setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        this.oModel.read("EmployeeCollection", null, ["$filter=substringof('" + s + "',fullName)"], true, jQuery.proxy(function (a, r) {
	//            this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: r.data.results });
	//            if (r.data.results.length === 0)
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_DATA_TEXT"));
	//        }, this), jQuery.proxy(function (E) {
	//            this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_DATA_TEXT"));
	//        }, this));
	//    },
	//    searchEmployee: function (e) {
	//        var v = e.getParameter("query");
	//        this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        var t = this.employeeF4Fragment.getContent()[0].getInfoToolbar();
	//        if (t.getVisible() === false) {
	//            this.oModel.read("EmployeeCollection", null, ["$filter=substringof('" + v + "'" + ",fullName)"], true, jQuery.proxy(function (o, r) {
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data] });
	//            }, this), jQuery.proxy(function (E) {
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: [] });
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this));
	//        } else {
	//            this.oModel.read("/AccountCollection(accountID='" + this.accountId + "')/EmployeeResponsibles", null, ["$filter=substringof('" + v + "'" + ",fullName)"], true, jQuery.proxy(function (o, r) {
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data] });
	//            }, this), jQuery.proxy(function (E) {
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: [] });
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this));
	//        }
	//    },
	//    setEmployee: function (e) {
	//        this.oSelectedEmployee = e.getSource().getSelectedItem().getBindingContext("json").getObject();
	//        if (this.oSelectedEmployee.fullName !== "")
	//            this.byId("inputEmpResponsible_S5").setValue(this.oSelectedEmployee.fullName);
	//        else
	//            this.byId("inputEmpResponsible_S5").setValue(this.oSelectedEmployee.employeeID);
	//        this.employeeF4Fragment.getContent()[0].removeSelections();
	//        var j = new sap.ui.model.json.JSONModel();
	//        j.setData({ EmployeeCollection: [] });
	//        this.employeeF4Fragment.setModel(j, "json");
	//        this.employeeF4Fragment.close();
	//    },
	setContact: function(e) {
		this.oSelectedContact = e.getSource().getSelectedItem().getBindingContext("json").getObject();
		if (this.oSelectedContact.fullName !== "")
			this.byId("inputMainContact").setValue(this.oSelectedContact.fullName);
		else
			this.byId("inputMainContact").setValue(this.oSelectedContact.contactID);
		this.contactId = this.oSelectedContact.contactID;
		this.contactF4Fragment.getContent()[0].removeSelections();
		var j = new sap.ui.model.json.JSONModel();
		j.setData({
			ContactCollection: []
		});
		this.contactF4Fragment.setModel(j, "json");
		this.contactF4Fragment.close();
		//Customizing
		this.byId("inputMainContact").setValueState(sap.ui.core.ValueState.None);
	},
	//    searchAccount: function (e) {
	//        var v = e.getParameter("query");
	//        var t = this.accountF4Fragment.getContent()[0].getInfoToolbar();
	//        t.setVisible(false);
	//        this.accountF4Fragment.getModel().setData({ AccountCollection: [] });
	//        this.accountF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        this._refreshAccountList(v);
	//    },
	//    searchContact: function (e) {
	//        var v = e.getParameter("query");
	//        this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
	//        if (t.getVisible() === false) {
	//            this.getView().getModel().read("ContactCollection", null, ["$filter=substringof('" + v + "'" + ",fullName)"], true, jQuery.proxy(function (o, r) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//                if (r.data.results.length === 0)
	//                    this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this));
	//        } else {
	//            this.getView().getModel().read("/AccountCollection(accountID='" + this.accountId + "')/Contacts", null, ["$filter=substringof('" + v + "'" + ",fullName)"], true, jQuery.proxy(function (o, r) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//                if (r.data.results.length === 0)
	//                    this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this));
	//        }
	//    },
	//    closeAccountToolbar: function (e) {
	//        var t = this.accountF4Fragment.getContent()[0].getInfoToolbar();
	//        var l = this.accountF4Fragment.getContent()[0];
	//        this.accountF4Fragment.getSubHeader().getContentLeft()[0].setValue("");
	//        t.setVisible(false);
	//        this.accountF4Fragment.getModel().setData({ AccountCollection: [] });
	//        l.setNoDataText(this.oResourceBundle.getText("LOADING_TEXT"));
	//        var s = "";
	//        this._refreshAccountList(s);
	//    },
	//    closeToolbar: function (e) {
	//        var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
	//        var o = this.contactF4Fragment.getContent()[0];
	//        var s = this.contactF4Fragment.getSubHeader().getContentLeft()[0].getValue();
	//        t.setVisible(false);
	//        o.getBinding("items").aFilters = [];
	//        o.getBinding("items").sFilterParams = "";
	//        o.getBinding("items").refresh();
	//        this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	//        o.setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        this.getView().getModel().read("ContactCollection", null, ["$filter=substringof('" + s + "',fullName)"], true, jQuery.proxy(function (a, r) {
	//            this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//            if (r.data.results.length === 0)
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//        }, this), jQuery.proxy(function (E) {
	//            this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//        }, this));
	//    },
	//    showCurrencyF4: function () {
	//        var t = this.byId("currency").getValue();
	//        if (!this.oCurrencyF4Fragment) {
	//            this.oCurrencyF4Fragment = sap.ui.xmlfragment("cus.crm.opportunity.view.CurrencySelectDialog", this);
	//            this.oCurrencyF4Fragment.setModel(this.getView().getModel("i18n"), "i18n");
	//            var j = new sap.ui.model.json.JSONModel({ Currencies: this.Currencies });
	//            this.oCurrencyF4Fragment.setModel(j, "json");
	//        }
	//        var f = [];
	//        if (t === "") {
	//            this.oCurrencyF4Fragment._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
	//        } else {
	//            this.oCurrencyF4Fragment._searchField.setValue(t);
	//            f = new sap.ui.model.Filter([
	//                new sap.ui.model.Filter("CurrencyText", sap.ui.model.FilterOperator.Contains, t),
	//                new sap.ui.model.Filter("CurrencyKey", sap.ui.model.FilterOperator.Contains, t)
	//            ], false);
	//        }
	//        this.oCurrencyF4Fragment.getBinding("items").filter(f);
	//        window.setTimeout(jQuery.proxy(function () {
	//            if (t === "") {
	//                this.oCurrencyF4Fragment._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
	//            } else {
	//                this.oCurrencyF4Fragment._searchField.setValue(t);
	//            }
	//        }, this), 10);
	//        this.oCurrencyF4Fragment.open();
	//    },
	//    setCurrency: function (e) {
	//        var s = e.getParameter("selectedItem");
	//        this.byId("currency").setValue(s.data("CurrencyKey"));
	//    },
	//    searchCurrency: function (e) {
	//        var v = e.getParameter("value");
	//        if (v !== undefined) {
	//            var f = new sap.ui.model.Filter([
	//                new sap.ui.model.Filter("CurrencyText", sap.ui.model.FilterOperator.Contains, v),
	//                new sap.ui.model.Filter("CurrencyKey", sap.ui.model.FilterOperator.Contains, v)
	//            ], false);
	//            e.getParameter("itemsBinding").filter([f]);
	//        }
	//    },
	//    closeCurrencyF4: function (e) {
	//        this.byId("dialogCurrencyF4").close();
	//    },
	//    descriptionChanged: function (e) {
	//        var d = this.byId("desc");
	//        if (e.getParameter("newValue").length > 40) {
	//            d.setValueState(sap.ui.core.ValueState.Error);
	//        } else
	//            d.setValueState(sap.ui.core.ValueState.None);
	//        this.enableSaveBtn();
	//    },
	//    quantityChanged: function (e) {
	//        var d = e.getSource().getBindingContext("json").getObject();
	//        var n = e.getParameter("newValue");
	//        var p = /[^0-9.]/;
	//        if (p.test(n) === false) {
	//            if (n.split(".").length > 2) {
	//                e.getSource().setValue(d.OldValue);
	//            } else {
	//                d.OldValue = n;
	//                e.getSource().setValueState(sap.ui.core.ValueState.None);
	//            }
	//        } else {
	//            if (d.OldValue === undefined)
	//                d.OldValue = 1;
	//            e.getSource().setValue(d.OldValue);
	//        }
	//    },
	//    chanceOfSuccessChanged: function (e) {
	//        var n = e.getParameter("newValue");
	//        var p = /[^0-9.]/;
	//        if (p.test(n) === false) {
	//            if (n.split(".").length > 2) {
	//                e.getSource().setValue(this.OldcosValue);
	//            } else {
	//                this.OldcosValue = n;
	//                e.getSource().setValueState(sap.ui.core.ValueState.None);
	//            }
	//        } else {
	//            e.getSource().setValue(this.OldcosValue);
	//        }
	//    },
	//    volumeChanged: function (e) {
	//        var n = e.getParameter("newValue");
	//        var p = /[^0-9.]/;
	//        var c = n.charAt(0);
	//        if (p.test(n) === false) {
	//            if (n.split(".").length > 2) {
	//                e.getSource().setValue(this.OldvolumeValue);
	//            } else {
	//                this.OldvolumeValue = n;
	//                e.getSource().setValueState(sap.ui.core.ValueState.None);
	//            }
	//        } else if (p.test(c) === true) {
	//            e.getSource().setValue("");
	//        } else {
	//            e.getSource().setValue(this.OldvolumeValue);
	//        }
	//    },
	//    validateCurrency: function () {
	//        var c = this.Currencies.length;
	//        var r = true;
	//        var a = this.getView().byId("currency").getValue().trim();
	//        a = a.toLocaleUpperCase();
	//        this.currencyMessage = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("INVALID_CURRENCY");
	//        if (a != "") {
	//            for (var i = 0; i < c; i++) {
	//                if (this.Currencies[i].CurrencyKey === a) {
	//                    r = false;
	//                    return;
	//                }
	//            }
	//        } else
	//            this.currencyMessage = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NULL_CURRENCY");
	//        return r;
	//    },
	//    validateSavePage: function () {
	//        var c = false;
	//        if (this.byId("desc").getValue() === "") {
	//            this.byId("desc").setValueState(sap.ui.core.ValueState.Error);
	//            c = true;
	//        }
	//        if (this.byId("customer").getValue() === "") {
	//            this.byId("customer").setValueState(sap.ui.core.ValueState.Error);
	//            c = true;
	//        }
	//        if (this.accountName !== this.byId("customer").getValue()) {
	//            this.accountName = this.accountId;
	//        }
	//        if (this.byId("volume").getValue() === "") {
	//            this.byId("volume").setValue(0);
	//        }
	//        if (this.byId("desc").getValueState() === sap.ui.core.ValueState.Error)
	//            c = true;
	//        if (this.byId("datePickerStartDate").getValueState() === sap.ui.core.ValueState.Error || this.byId("datePickerCloseDate").getValueState() === sap.ui.core.ValueState.Error) {
	//            c = true;
	//        }
	//        if (this.byId("chanceofSuccess").getValueState() === sap.ui.core.ValueState.Error)
	//            c = true;
	//        if (this.byId("volume").getValueState() === sap.ui.core.ValueState.Error)
	//            c = true;
	//        var d = this.byId("datePickerCloseDate");
	//        var a = $("#" + d.getIdForLabel()).val();
	//        if (a === "") {
	//            this.byId("datePickerCloseDate").setValueState(sap.ui.core.ValueState.Error);
	//            c = true;
	//        }
	//        if (this.validateProductBasket() === false) {
	//            c = true;
	//        }
	//        if (c == true) {
	//            return false;
	//        }
	//        return true;
	//    },
	//    validateProductBasket: function () {
	//        var a = this.byId("productBasket").getItems();
	//        var i, l;
	//        l = a.length;
	//        var c = false;
	//        if (l <= 0) {
	//            return !c;
	//        }
	//        var b = null;
	//        var d = a[0].getCells();
	//        for (i = 0; i < d.length; i++) {
	//            if (d[i].data("field") === "QUANTITY") {
	//                b = i;
	//                var q = d[i].getContent()[0];
	//                var v = parseFloat(q.getValue()) + "";
	//                if (v === "NaN") {
	//                    q.setValueState(sap.ui.core.ValueState.Error);
	//                    c = true;
	//                }
	//            }
	//        }
	//        if (b) {
	//            for (i = 1; i < a.length; i++) {
	//                var q = a[i].getCells()[b].getContent()[0];
	//                var v = parseFloat(q.getValue()) + "";
	//                if (v === "NaN") {
	//                    q.setValueState(sap.ui.core.ValueState.Error);
	//                    c = true;
	//                }
	//            }
	//        }
	//        return !c;
	//    },
	//    validateDates: function () {
	//        var d = this.byId("datePickerStartDate");
	//        var a = this.byId("datePickerCloseDate");
	//        var l = $("#" + d.getIdForLabel()).val();
	//        var b = $("#" + a.getIdForLabel()).val();
	//        var i = false;
	//        if (l !== "" && d.getDateValue() === null) {
	//            i = true;
	//            d.setValueState(sap.ui.core.ValueState.Error);
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("JUNK_DATE")
	//            });
	//        }
	//        if (b !== "" && a.getDateValue() === null) {
	//            i = true;
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("JUNK_DATE")
	//            });
	//            a.setValueState(sap.ui.core.ValueState.Error);
	//        }
	//        if (i)
	//            return false;
	//        if (l !== "" && b !== "" && d.getDateValue() > a.getDateValue()) {
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("INVALID_DATE")
	//            });
	//            a.setValueState(sap.ui.core.ValueState.Error);
	//            return false;
	//        }
	//        return true;
	//    },
	//    handleErrors: function (e) {
	//        sap.ca.ui.utils.busydialog.releaseBusyDialog();
	//        jQuery.sap.log.error(JSON.stringify(e));
	//        sap.ca.ui.message.showMessageBox({
	//            type: sap.ca.ui.message.Type.ERROR,
	//            message: e.message,
	//            details: JSON.parse(e.response.body).error.message.value
	//        }, function (r) {
	//            var i = 0;
	//            i++;
	//        });
	//    },
	//    _setAccountF4Text: function (e) {
	//        this._accountSelectDialog.getAggregation("_dialog").getSubHeader().getContentMiddle()[0].setValue(this.byId("customer").getValue());
	//        this._accountSelectDialog.getModel().detachRequestCompleted(this._setAccountF4Text, this);
	//    },
	//    clearCachedPartners: function () {
	//        this.accountId = "";
	//        this.accountName = "";
	//        this.byId("customer").setValue("");
	//        this.byId("inputMainContact").setValue("");
	//        this.oSelectedContact = {};
	//        this.byId("inputEmpResponsible_S5").setValue("");
	//        this.oSelectedEmployee = {};
	//        this.byId("partnerBasket").getModel("json").setData({ SalesTeam: [] });
	//        this.bpDeterminationResults = {};
	//    },
	//    clearCachedOrgControls: function () {
	//        this.getView().byId("salesOrganization").setValue("");
	//        this.getView().byId("distributionchannel_Text").setText("");
	//        this.getView().byId("division_Text").setText("");
	//    },
	//    getUsedPartnerFunctions: function () {
	//        var t = this;
	//        var p = [];
	//        if (t.partnerDeterminationMap[t.processType] !== undefined) {
	//            t.partnerDeterminationMap[t.processType].forEach(function (e) {
	//                if (e.mainPartnerFunction == "X") {
	//                    if (e.PartnerFunctionCategory === "0006" && t.byId("customer").getValue() !== "" || e.PartnerFunctionCategory === "0007" && t.byId("inputMainContact").getValue() !== "" || e.PartnerFunctionCategory === "0008" && t.byId("inputEmpResponsible_S5").getValue() !== "") {
	//                        p.push(e.PartnerFunctionCode);
	//                    }
	//                }
	//            });
	//        }
	//        if (t.byId("partnerBasket").getModel("json") !== undefined) {
	//            if (t.byId("partnerBasket").getModel("json").getData().SalesTeam !== undefined && t.byId("partnerBasket").getModel("json").getData().SalesTeam.length > 0) {
	//                t.byId("partnerBasket").getModel("json").getData().SalesTeam.forEach(function (e) {
	//                    p.push(e.PartnerFunctionCode);
	//                });
	//            }
	//        }
	//        return t._removeDuplicateElem(p);
	//    },
	//    prepareDataAndTriggerDetermination: function (p, a, g) {
	//        if (!(this.bBpDeterminationEnabled || this.bOrgDeterminationEnabled)) {
	//            return;
	//        }
	//        if (this.bCancelDeterm)
	//            return;
	//        if (g != undefined) {
	//            this.clearCachedPartners();
	//            this.clearCachedOrgControls();
	//        }
	//        var b = [];
	//        this.determResultsProcessMap = [];
	//        var m = this.getView().getModel();
	//        if (p != undefined && (!this.partnerDeterminationMap[p] || this.partnerDeterminationMap[p].length == 0)) {
	//            b = this.appendCustomizingOperation(b, m, p);
	//        }
	//        if (this.bBpDeterminationEnabled) {
	//            b = this.appendBpDetermOperation(b, m, p, a, g);
	//        }
	//        if (this.bOrgDeterminationEnabled) {
	//            b = this.appendOrgDetermOperation(b, m, a, g);
	//        }
	//        if (b.length == 0)
	//            return;
	//        m.addBatchReadOperations(b);
	//        m.submitBatch(jQuery.proxy(function (r) {
	//            for (var j = 0; j < r.__batchResponses.length; j++) {
	//                if (r.__batchResponses[j].statusCode === "200") {
	//                    if (this.determResultsProcessMap[j] == "BpDeterm") {
	//                        this.processBpResults(r.__batchResponses[j]);
	//                    } else if (this.determResultsProcessMap[j] == "OrgDeterm") {
	//                        this.processOrgResults(r.__batchResponses[j]);
	//                    } else if (this.determResultsProcessMap[j] == "Customizing") {
	//                        this.processCustomizingResults(p, r.__batchResponses[j]);
	//                    }
	//                } else
	//                    this.handleErrors(r.__batchResponses[j], true);
	//            }
	//            if (this.bDisMultiFoundToast) {
	//                this.displayToast();
	//            }
	//            this.enableSaveBtn();
	//        }, this), jQuery.proxy(function (e) {
	//        }, this));
	//    },
	//    displayToast: function () {
	//        sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("MULTI_DETERM_ENTRIES"));
	//        this.bDisMultiFoundToast = false;
	//    },
	//    bindHeaderFields: function () {
	//        var d = this.bpDeterminationResults, t = this;
	//        Object.keys(d).forEach(function (k) {
	//            if (d[k].length == t.iDetermResultFillLimit) {
	//                var p = d[k][0];
	//                t._fillOutHeaderFiels(p);
	//            } else if (d[k].length > t.iDetermResultFillLimit || d[k].length == 0) {
	//                if (k == "Sales Prospect") {
	//                    t.byId("customer").setEditable(true);
	//                }
	//            }
	//        });
	//    },
	//    _fillOutHeaderFiels: function (p) {
	//        var t = this;
	//        if (p.mainPartner == "X") {
	//            if (p.HeaderTag == "Prospect") {
	//                t.accountId = p.PartnerNo;
	//                t.accountName = !p.FullName ? t.accountId : p.FullName;
	//                t.byId("customer").setValue(t.accountName);
	//            } else if (p.HeaderTag == "Contact") {
	//                t.contactId = p.PartnerNo;
	//                t.contactName = p.FullName;
	//                t.byId("inputMainContact").setValue(t.contactName);
	//            } else if (p.HeaderTag == "Employee") {
	//                t.oSelectedEmployee.employeeID = p.PartnerNo;
	//                t.oSelectedEmployee.fullName = p.FullName;
	//                t.byId("inputEmpResponsible_S5").setValue(t.oSelectedEmployee.fullName);
	//            }
	//        }
	//    },
	bindParticipantsTable: function(p) {
		var t = this;
		var e = this.byId("partnerBasket").getModel("json").getData();
		var s = e ? e.SalesTeam : [];
		var a = this.participantsF4MultiselectFragment ? this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").getData() : {};
		var S = a ? a : {};
		Object.keys(p).forEach(function(k) {
			// Customizing
			//if (p[k].length == t.iDetermResultFillLimit) {
			p[k].forEach(function(b) {
				if (b.HeaderTag == "") {
					var P = {
						Name: b.FullName,
						Key: b.PartnerNo,
						PartnerFunction: b.partnerFunctionName,
						PartnerFunctionCode: b.PartnerFunction
					};
					s.push(P);
					var o = {
						key: b.PartnerNo,
						value: b.FullName
					};
					if (!S.hasOwnProperty(k)) {
						S[k] = [];
						S[k].push(o);
					} else {
						S[k].push(o);
					}
				}
			});
			//}
		});
		Object.keys(S).forEach(function(k) {
			S[k] = t._removeDuplicateElem(S[k]);
		});
		this.setParticipantsList(s, S);
	},
	//    setParticipantsList: function (s, S) {
	//        s = this._removeDuplicateElem(s);
	//        this.byId("partnerBasket").getModel("json").setProperty("/SalesTeam", s);
	//        if (!this.participantsF4MultiselectFragment) {
	//            this.participantsF4MultiselectFragment = new sap.ui.xmlfragment(this.createId("participantsF4Multiselect_S5"), "cus.crm.opportunity.view.ParticipantsF4Multiselect", this);
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel({}), "json");
	//            this.participantsF4MultiselectFragment.setModel(this.oI18nModel, "i18n");
	//        }
	//        if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategory");
	//        }
	//        this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").setData(S);
	//    },
	//    followUpView: function () {
	//        this.byId("desc").setValue(this.title);
	//        this.byId("customer").setValue(this.AccountName);
	//        this.accountId = this.AccountId;
	//        this.accountName = this.AccountName;
	//        this.byId("inputMainContact").setValue(this.ContactName);
	//        this.byId("inputEmpResponsible_S5").setValue(this.ResponsibleTxt);
	//        this.byId("datePickerStartDate").setValue(cus.crm.opportunity.util.Formatter.dateFormatter2(this.StartDate));
	//        this.getView().byId("datePickerCloseDate").setValue(cus.crm.opportunity.util.Formatter.dateFormatter2(new Date()));
	//        this.byId("datePickerStartDate").setValueState(sap.ui.core.ValueState.None);
	//        this.byId("datePickerCloseDate").setValueState(sap.ui.core.ValueState.None);
	//        this.byId("datePickerStartDate").fireChange(this.byId("datePickerStartDate"));
	//        this.getView().byId("TxtTypeInput").setText(this.ProcessTypeDescription);
	//        this.byId("Switch").setState(true);
	//        this.followUp = true;
	//        this.captureHeaderInformation();
	//    },
	//    fromTaskFollowUpView: function () {
	//        this.byId("desc").setValue(this.title);
	//        this.byId("customer").setValue(this.AccountName);
	//        this.accountName = this.AccountName;
	//        this.accountId = this.AccountId;
	//        this.byId("inputMainContact").setValue(this.ContactName);
	//        this.byId("datePickerStartDate").setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
	//        this.getView().byId("datePickerCloseDate").setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
	//        this.byId("datePickerStartDate").setValueState(sap.ui.core.ValueState.None);
	//        this.byId("datePickerCloseDate").setValueState(sap.ui.core.ValueState.None);
	//        this.getView().byId("TxtTypeInput").setText(this.ProcessTypeDescription);
	//        this.byId("Switch").setState(true);
	//        if (this.productsFromLead) {
	//            var p = { Products: [] };
	//            var d = this.byId("productBasket").getModel("json").getData();
	//            if (d && d.hasOwnProperty("Products")) {
	//                p.Products = d.Products;
	//            }
	//            for (var i = 0; i < this.productsFromLead.length; i++) {
	//                var a = {
	//                    ItemGuid: "",
	//                    ProcessingMode: "",
	//                    ProductGuid: this.productsFromLead[i].ProductGuid,
	//                    ProductId: this.productsFromLead[i].ProductId,
	//                    ProductName: this.productsFromLead[i].ProductName,
	//                    Quantity: this.productsFromLead[i].Quantity,
	//                    Unit: this.productsFromLead[i].Unit
	//                };
	//                p.Products.push(a);
	//            }
	//            var b = new sap.ui.model.json.JSONModel(p);
	//            this.byId("productBasket").setModel(b, "json");
	//        }
	//        this.followUp = true;
	//        this.captureHeaderInformation();
	//    },
	//    bindEditView: function () {
	//        var s;
	//        s = this.getView().getModel("controllers").getData().s3Controller;
	//        if (!this._isStatusExistForProcessType(s.UserStatuses, this.processType)) {
	//            var S = this._getStatusForProcessType(this.processType);
	//            if (!s.UserStatuses) {
	//                s.UserStatuses = S;
	//            } else {
	//                s.UserStatuses = s.UserStatuses.concat(S);
	//            }
	//        }
	//        var a = {};
	//        this.deleteBuffer = [];
	//        this.controller = s;
	//        a.Header = s.byId("info").getModel("json").getData();
	//        this.HeaderObject = a.Header;
	//        this.headerGuid = a.Header.Guid;
	//        ;
	//        this.userStatusCode = a.Header.UserStatusCode;
	//        this.UserStatuses = a.UserStatuses;
	//        this.Currencies = s.Currencies;
	//        this.currentDescription = a.Header.Description;
	//        this.byId("desc").setValue(a.Header.Description);
	//        this.accountName = a.Header.ProspectName;
	//        this.byId("customer").setValue(a.Header.ProspectName);
	//        if (a.Header.ProspectName === "")
	//            this.byId("customer").setValue(a.Header.ProspectNumber);
	//        this.byId("inputEmpResponsible_S5").setValue(a.Header.EmployeeResponsibleName);
	//        this.byId("datePickerStartDate").setValue(cus.crm.opportunity.util.Formatter.dateFormatter2(a.Header.StartDate));
	//        this.getView().byId("datePickerCloseDate").setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
	//        this.byId("datePickerStartDate").setValueState(sap.ui.core.ValueState.None);
	//        this.byId("datePickerCloseDate").setValueState(sap.ui.core.ValueState.None);
	//        this.byId("currency").setValue(a.Header.CurrencyCode);
	//        this.byId("Switch").setState(a.Header.ForecastRelevance);
	//        this.getView().byId("salesOrganization").setValue(a.Header.SalesOrganizationDescription);
	//        this.byId("distributionchannel_Text").setText(a.Header.DistributionChannelDescription);
	//        this.byId("division_Text").setText(a.Header.DivisionDescription);
	//        var m = s.getView().getModel();
	//        this.byId("inputMainContact").setValue(a.Header.MainContactName);
	//        this.oSelectedContact.contactID = a.Header.MainContactId;
	//        this.oSelectedContact.fullName = a.Header.MainContactName;
	//        this.contactId = a.Header.MainContactId;
	//        this.accountId = a.Header.ProspectNumber;
	//        this.getView().byId("laTypeInput").setVisible(false);
	//        this.getView().byId("TxtTypeInput").setVisible(false);
	//        var p = null;
	//        if (s != null || s != undefined) {
	//            p = s.processTypeDesc;
	//            if (p != null) {
	//                this.getView().byId("laTypeInput").setVisible(true);
	//                this.getView().byId("TxtTypeInput").setVisible(true);
	//                this.getView().byId("TxtTypeInput").setText(p);
	//            }
	//        }
	//        if (parseFloat(this.oVersioningModel.getData().BackendSchemaVersion) >= 2) {
	//            this.byId("inputEmpResponsible_S5").setValue(a.Header.EmployeeResponsibleName);
	//            this.oSelectedAccount.accountID = a.Header.ProspectNumber;
	//            this.oSelectedEmployee.employeeID = a.Header.EmployeeResponsibleNumber;
	//        }
	//        this.oSelectedEmployee.fullName = a.Header.EmployeeResponsibleName;
	//        this.OldcosValue = this.byId("chanceofSuccess").getValue();
	//        this.OldvolumeValue = this.byId("volume").getValue();
	//        this.ContactCollection = s.ContactCollection;
	//        this.EmployeeCollection = s.EmployeeCollection;
	//        var i, b;
	//        var j = new sap.ui.model.json.JSONModel();
	//        var c = new sap.ui.model.json.JSONModel();
	//        var d = new sap.ui.model.json.JSONModel();
	//        var e = new sap.ui.model.json.JSONModel();
	//        b = s.UserStatuses.length;
	//        var f = {
	//            UserStatuses: [{
	//                    BusinessTransaction: "",
	//                    LanguageCode: "",
	//                    ProcessType: this.processType,
	//                    StatusProfile: "",
	//                    UserStatusCode: "",
	//                    UserStatusText: ""
	//                }]
	//        };
	//        var g = "";
	//        for (i = 0; i < b; i++) {
	//            if (s.UserStatuses[i].ProcessType === this.processType) {
	//                f.UserStatuses.push(s.UserStatuses[i]);
	//                if (parseFloat(this.sBackendVersion) >= 3) {
	//                    if (s.UserStatuses[i].InitialStatus == true)
	//                        g = s.UserStatuses[i].UserStatusCode;
	//                }
	//                if (this.UserStatusCode === "" && s.UserStatuses[i].UserStatusCode != "") {
	//                    this.UserStatusCode = s.UserStatuses[i].UserStatusCode;
	//                    this.UserStatusText = s.UserStatuses[i].UserStatusText;
	//                }
	//                if (s.UserStatuses[i].BusinessTransaction === "WINN") {
	//                    this.getView().getController().WinStatusCode = s.UserStatuses[i].UserStatusCode;
	//                }
	//                if (s.UserStatuses[i].BusinessTransaction === "LOST") {
	//                    this.getView().getController().LostStatusCode = s.UserStatuses[i].UserStatusCode;
	//                }
	//                this.StatusProfile = s.UserStatuses[i].StatusProfile;
	//            }
	//        }
	//        j.setData(f);
	//        this.byId("statusdropdown").setModel(j, "json");
	//        this.byId("statusdropdown").setSelectedKey(g);
	//        var h = {
	//            Priorities: [{
	//                    LanguageCode: "",
	//                    PriorityCode: "",
	//                    PriorityText: ""
	//                }]
	//        };
	//        b = s.Priorities.length;
	//        for (i = 0; i < b; i++) {
	//            h.Priorities.push(s.Priorities[i]);
	//        }
	//        ;
	//        c.setData(h);
	//        this.byId("priority_val").setModel(c, "json");
	//        b = s.SalesStages.length;
	//        var n = new Array();
	//        var o = new Array();
	//        var q;
	//        var r;
	//        var t;
	//        var u = {
	//            SalesStages: [{
	//                    ChanceOfSuccess: "",
	//                    LanguageCode: "",
	//                    ProcessType: this.processType,
	//                    SalesStageCode: "",
	//                    SalesStageDescription: "",
	//                    SalesStageOrder: ""
	//                }]
	//        };
	//        for (i = 0; i < b; i++) {
	//            if (s.SalesStages[i].ProcessType === this.processType) {
	//                u.SalesStages.push(s.SalesStages[i]);
	//                n.push(s.SalesStages[i].SalesStageOrder);
	//                o = n.sort();
	//                q = o[0];
	//                if (s.SalesStages[i].SalesStageOrder == q) {
	//                    r = s.SalesStages[i].SalesStageCode;
	//                    t = Number(s.SalesStages[i].ChanceOfSuccess);
	//                }
	//            }
	//        }
	//        d.setData(u);
	//        this.byId("stagedropdown").setModel(d, "json");
	//        this.byId("stagedropdown").setSelectedKey(r);
	//        this.getView().byId("chanceofSuccess").setValue(t);
	//        if (this.byId("statusdropdown").getSelectedKey() === this.WinStatusCode || this.byId("statusdropdown").getSelectedKey() === this.LostStatusCode) {
	//            this.byId("opportunityAddProd_Button").setVisible(false);
	//        } else
	//            this.byId("opportunityAddProd_Button").setVisible(true);
	//        var v = "Statuses";
	//        var w = s.byId("Product_Tab").getModel("json").getData();
	//        if (w && w.hasOwnProperty("Products")) {
	//            var x = JSON.parse(JSON.stringify(w));
	//            for (i = 0; i < x.Products.length; i++) {
	//                if (x.Products[i].ProductGuid === null)
	//                    x.Products[i].Backend = "CATEGORY";
	//                else
	//                    x.Products[i].Backend = "X";
	//                x.Products[i].OldValue = x.Products[i].Quantity;
	//                x.Products[i].NetValue = 0;
	//            }
	//            e.setData(x);
	//            this.byId("productBasket").setModel(e, "json");
	//        }
	//        if (!this.participantsF4MultiselectFragment) {
	//            this.participantsF4MultiselectFragment = new sap.ui.xmlfragment(this.createId("participantsF4Multiselect_S5"), "cus.crm.opportunity.view.ParticipantsF4Multiselect", this);
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel({}), "json");
	//            this.participantsF4MultiselectFragment.setModel(this.oI18nModel, "i18n");
	//        }
	//        var w = s.byId("Sales_Team").getModel("json").getData();
	//        if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategory");
	//        }
	//        var y = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory");
	//        this.partnerDeterminationMap[this.processType] = [];
	//        if (parseFloat(this.sBackendVersion) >= 6) {
	//            if (!(this.bBpDeterminationEnabled || this.bOrgDeterminationEnabled)) {
	//                this.getCustomizing(this.processType);
	//            }
	//        } else {
	//            if (!this.partnerDeterminationMap[this.processType]) {
	//                this.oModel.read("OpptPartnerFctTypes", null, ["TransactionType='" + this.processType + "'"], false, jQuery.proxy(function (G, H) {
	//                    this.partnerDeterminationMap[this.processType] = H.data.results;
	//                }, this), jQuery.proxy(function (G) {
	//                }, this));
	//            }
	//        }
	//        this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions = this.partnerDeterminationMap[this.processType];
	//        var P = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
	//        if (w && w.hasOwnProperty("OpportunitySalesTeamSet")) {
	//            var z = { SalesTeam: [] };
	//            this.byId("partnerBasket").getModel("json").setData(z);
	//            var f = this.byId("partnerBasket").getModel("json").getData();
	//            for (var A = 0; A < w.OpportunitySalesTeamSet.length; A++) {
	//                for (var B = 0; B < P.length; B++) {
	//                    if (w.OpportunitySalesTeamSet[A].PartnerFunctionText == P[B].PartnerFunctionName) {
	//                        if (w.OpportunitySalesTeamSet[A].PartnerName == "")
	//                            w.OpportunitySalesTeamSet[A].PartnerName = w.OpportunitySalesTeamSet[A].PartnerNumber;
	//                        var C = {
	//                            Name: w.OpportunitySalesTeamSet[A].PartnerName,
	//                            Key: w.OpportunitySalesTeamSet[A].PartnerNumber,
	//                            PartnerFunction: w.OpportunitySalesTeamSet[A].PartnerFunctionText
	//                        };
	//                        z.SalesTeam.push(C);
	//                    }
	//                }
	//            }
	//            var D = s.byId("tab_competitor").getModel("json").getData();
	//            if (D && D.hasOwnProperty("Competitors") && D.Competitors.results !== undefined) {
	//                for (var A = 0; A < D.Competitors.results.length; A++) {
	//                    for (var B = 0; B < P.length; B++) {
	//                        if ("Competitor" == P[B].PartnerFunctionName) {
	//                            if (D.Competitors.results[A].PartnerName == "")
	//                                D.Competitors.results[A].PartnerName = D.Competitors.results[A].PartnerNumber;
	//                            var C = {
	//                                Name: D.Competitors.results[A].PartnerName,
	//                                Key: D.Competitors.results[A].PartnerNumber,
	//                                PartnerFunction: "Competitor"
	//                            };
	//                            z.SalesTeam.push(C);
	//                        }
	//                    }
	//                }
	//            }
	//            this.byId("partnerBasket").getModel("json").setProperty("/SalesTeam", z.SalesTeam);
	//            for (var k = 0; k < P.length; k++) {
	//                var V = new Array();
	//                for (var l = 0; l < z.SalesTeam.length; l++) {
	//                    if (z.SalesTeam[l].PartnerFunction == P[k].PartnerFunctionName) {
	//                        if (z.SalesTeam[l].Name == "")
	//                            z.SalesTeam[l].Name = z.SalesTeam[l].Key;
	//                        var C = {
	//                            key: z.SalesTeam[l].Key,
	//                            value: z.SalesTeam[l].Name
	//                        };
	//                        V.push(C);
	//                    }
	//                }
	//                y.setProperty("/" + encodeURIComponent(P[k].PartnerFunctionName), V);
	//            }
	//        } else {
	//            if (!this.bBpDeterminationEnabled) {
	//                this.oModel.read("Opportunities(guid'" + this.headerGuid + "')", null, ["$expand=SalesTeam"], false, jQuery.proxy(function (G, H) {
	//                    var z = { SalesTeam: [] };
	//                    this.byId("partnerBasket").getModel("json").setData(z);
	//                    var f = this.byId("partnerBasket").getModel("json").getData();
	//                    for (var A = 0; A < G.SalesTeam.results.length; A++) {
	//                        for (var I = 0; I < P.length; I++) {
	//                            if (G.SalesTeam.results[A].PartnerFunctionText == P[I].PartnerFunctionName) {
	//                                if (G.SalesTeam.results[A].PartnerName == "")
	//                                    G.SalesTeam.results[A].PartnerName = G.SalesTeam.results[A].PartnerNumber;
	//                                var C = {
	//                                    Name: G.SalesTeam.results[A].PartnerName,
	//                                    Key: G.SalesTeam.results[A].PartnerNumber,
	//                                    PartnerFunction: G.SalesTeam.results[A].PartnerFunctionText
	//                                };
	//                                z.SalesTeam.push(C);
	//                            }
	//                        }
	//                    }
	//                    var D = s.byId("tab_competitor").getModel("json").getData();
	//                    if (D && D.hasOwnProperty("Competitors") && D.Competitors.results !== undefined) {
	//                        for (var A = 0; A < D.Competitors.results.length; A++) {
	//                            for (var B = 0; B < P.length; B++) {
	//                                if ("Competitor" == P[B].PartnerFunctionName) {
	//                                    if (D.Competitors.results[A].PartnerName == "")
	//                                        D.Competitors.results[A].PartnerName = D.Competitors.results[A].PartnerNumber;
	//                                    var C = {
	//                                        Name: D.Competitors.results[A].PartnerName,
	//                                        Key: D.Competitors.results[A].PartnerNumber,
	//                                        PartnerFunction: "Competitor"
	//                                    };
	//                                    z.SalesTeam.push(C);
	//                                }
	//                            }
	//                        }
	//                    }
	//                    this.byId("partnerBasket").getModel("json").setProperty("/SalesTeam", z.SalesTeam);
	//                    for (var k = 0; k < P.length; k++) {
	//                        var V = new Array();
	//                        for (var l = 0; l < z.SalesTeam.length; l++) {
	//                            if (z.SalesTeam[l].PartnerFunction == P[k].PartnerFunctionName) {
	//                                if (z.SalesTeam[l].Name == "")
	//                                    z.SalesTeam[l].Name = z.SalesTeam[l].Key;
	//                                var C = {
	//                                    key: z.SalesTeam[l].Key,
	//                                    value: z.SalesTeam[l].Name
	//                                };
	//                                V.push(C);
	//                            }
	//                        }
	//                        y.setProperty("/" + encodeURIComponent(P[k].PartnerFunctionName), V);
	//                    }
	//                }, this), jQuery.proxy(function (G) {
	//                }, this));
	//            }
	//        }
	//        var E = JSON.stringify(y.getData());
	//        var F = JSON.parse(E);
	//        this.oldList = new sap.ui.model.json.JSONModel(F, "SelectedPartnerCategory");
	//        this.followUp = true;
	//        this.captureHeaderInformation();
	//    },
	//    enableProductsAddButton: function (e) {
	//        if (this.oAddProductsFragment.getContent()[0].getSelectedItems().length > 0) {
	//            this.oAddProductsFragment.getBeginButton().setEnabled(true);
	//        } else {
	//            this.oAddProductsFragment.getBeginButton().setEnabled(false);
	//        }
	//    },
	//    onShowParticipants: function (e) {
	//        var s;
	//        if (!this.participantsF4MultiselectFragment) {
	//            this.participantsF4MultiselectFragment = new sap.ui.xmlfragment(this.createId("participantsF4Multiselect_S5"), "cus.crm.opportunity.view.ParticipantsF4Multiselect", this);
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel({}), "json");
	//            this.participantsF4MultiselectFragment.setModel(this.oI18nModel, "i18n");
	//            s = this.participantsF4MultiselectFragment.getContent()[0];
	//        }
	//        s = this.participantsF4MultiselectFragment.getContent()[0];
	//        this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions = [];
	//        if (parseFloat(this.sBackendVersion) >= 6) {
	//            this.getCustomizing(this.processType);
	//        } else {
	//            if (!this.partnerDeterminationMap[this.processType]) {
	//                this.oModel.read("OpptPartnerFctTypes", null, ["TransactionType='" + this.processType + "'"], false, jQuery.proxy(function (o, r) {
	//                    this.partnerDeterminationMap[this.processType] = r.data.results;
	//                }, this), jQuery.proxy(function (E) {
	//                }, this));
	//            }
	//        }
	//        this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions = this.partnerDeterminationMap[this.processType];
	//        this.participantsF4MultiselectFragment.getModel("json").updateBindings();
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].bindItems("json>/PartnerFunctions", this.oPartnerFunctionsTemplate, null, []);
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//            var S = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory");
	//            var p = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
	//            var t = new Array();
	//            for (var k = 0; k < p.length; k++) {
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName))) {
	//                    t.push(p[k].PartnerFunctionName);
	//                }
	//            }
	//            var i = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems();
	//            for (var k = 0; k < i.length; k++) {
	//                for (var a = 0; a < t.length; a++) {
	//                    if (i[k].getBindingContext("json").getObject().PartnerFunctionName == t[a]) {
	//                        var c = S.getProperty("/" + encodeURIComponent(t[a])).length;
	//                        if (c > 0) {
	//                            i[k].setInfo(c);
	//                        } else {
	//                            i[k].setInfo(" ");
	//                        }
	//                    }
	//                }
	//            }
	//        }
	//        this.participantsF4MultiselectFragment.open();
	//    },
	//    handleConfirm: function (e) {
	//        jQuery.sap.require("sap.m.MessageToast");
	//        if (e.getParameters().filterString) {
	//            sap.m.MessageToast.show(e.getParameters().filterString);
	//        }
	//    },
	//    onCancelParticipantDialog: function (e) {
	//        if (e.keyCode !== 27) {
	//            if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getId() == e.getSource().getParent().getParent().getId()) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getSelectedItem().setSelected(false);
	//            }
	//        }
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//            this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").destroy();
	//        }
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp")) {
	//            this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").destroy();
	//        }
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1")) {
	//            this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1").destroy();
	//        }
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2")) {
	//            this.participantsF4MultiselectFragment.getModel();
	//        }
	//        var n = this.participantsF4MultiselectFragment.getContent()[0];
	//        n.to(this.participantsF4MultiselectFragment.getContent()[0].getPages()[0]);
	//        this.participantsF4MultiselectFragment.close();
	//    },
	//    onOKParticipantDialog: function (e) {
	//        if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategory");
	//        }
	//        var p = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp")) {
	//            var a = new Array();
	//            for (var k = 0; k < p.length; k++) {
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName))) {
	//                    var b = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName));
	//                    for (var c = 0; c < b.length; c++) {
	//                        var s = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName));
	//                        if (parseFloat(this.sBackendVersion) >= 4) {
	//                            if (this.followupOppt) {
	//                                var d = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
	//                                for (var l = 0; l < d.length; l++) {
	//                                    if (this.oldList.oData[d[l].PartnerFunctionName])
	//                                        for (var i = 0; i < this.oldList.oData[d[l].PartnerFunctionName].length; i++) {
	//                                            if (b[c].getDescription() == this.oldList.oData[d[l].PartnerFunctionName][i].key) {
	//                                                var f = {
	//                                                    key: b[c].getDescription(),
	//                                                    value: b[c].getTitle(),
	//                                                    partner: d[l].PartnerFunctionName
	//                                                };
	//                                                a.push(f);
	//                                            }
	//                                        }
	//                                }
	//                            }
	//                        }
	//                        for (var g = 0; g < s.length; g++) {
	//                            if (s[g].key == b[c].getDescription())
	//                                this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName)).splice(g, 1);
	//                        }
	//                    }
	//                }
	//            }
	//        }
	//        if (parseFloat(this.sBackendVersion) >= 4) {
	//            if (this.followupOppt) {
	//                if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryMainDelete")) {
	//                    this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategoryMainDelete");
	//                }
	//                var S = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryMainDelete");
	//                for (var j = 0; j < a.length; j++) {
	//                    var h = { SalesTeam: [] };
	//                    var f = {
	//                        key: a[j].key,
	//                        value: a[j].value
	//                    };
	//                    if (!S.getProperty("/" + a[j].partner)) {
	//                        S.setProperty("/" + a[j].partner, [f]);
	//                    } else {
	//                        S.getProperty("/" + a[j].partner).push(f);
	//                    }
	//                }
	//                this.deletedFromMain = S;
	//            }
	//        }
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp") !== undefined) {
	//            this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").destroy();
	//        }
	//        var o = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory");
	//        if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getId() == e.getSource().getParent().getParent().getId()) {
	//            var m = this.participantsF4MultiselectFragment.getContent()[0]._sSelectedPartnerCategory;
	//            var E = [];
	//            if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategoryTemp");
	//            }
	//            var n = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp");
	//            var L = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0];
	//            L.getSelectedItem().setSelected(false);
	//        }
	//        var t = new Array();
	//        var n = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp");
	//        for (var k = 0; k < p.length; k++) {
	//            if (n == undefined) {
	//                this.participantsF4MultiselectFragment.close();
	//                return;
	//            }
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName))) {
	//                t.push(p[k].PartnerFunctionName);
	//                if (o.getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName))) {
	//                    for (var c = 0; c < n.getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName)).length; c++) {
	//                        o.getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName)).push(n.getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName))[c]);
	//                    }
	//                } else {
	//                    o.setProperty("/" + encodeURIComponent(p[k].PartnerFunctionName), n.getProperty("/" + encodeURIComponent(p[k].PartnerFunctionName)));
	//                }
	//            }
	//        }
	//        n.destroy();
	//        var q = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory");
	//        var r = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
	//        var h = { SalesTeam: [] };
	//        this.byId("partnerBasket").getModel("json").setData(h);
	//        var u = this.byId("partnerBasket").getModel("json").getData();
	//        if (u && u.hasOwnProperty("SalesTeam"))
	//            h.SalesTeam = u.SalesTeam;
	//        for (var k = 0; k < r.length; k++) {
	//            if (q.getProperty("/" + encodeURIComponent(r[k].PartnerFunctionName))) {
	//                for (var c = 0; c < q.getProperty("/" + encodeURIComponent(r[k].PartnerFunctionName)).length; c++) {
	//                    var f = {
	//                        Name: q.getProperty("/" + encodeURIComponent(r[k].PartnerFunctionName))[c].value,
	//                        Key: q.getProperty("/" + encodeURIComponent(r[k].PartnerFunctionName))[c].key,
	//                        PartnerFunction: r[k].PartnerFunctionName,
	//                        PartnerFunctionCode: r[k].PartnerFunctionCode
	//                    };
	//                    h.SalesTeam.push(f);
	//                }
	//            }
	//        }
	//        this.byId("partnerBasket").getModel("json").setProperty("/SalesTeam", h.SalesTeam);
	//        var N = this.participantsF4MultiselectFragment.getContent()[0];
	//        N._sSelectedPartnerCategoryAndParticipants = o;
	//        N.to(this.participantsF4MultiselectFragment.getContent()[0].getPages()[0]);
	//        this.participantsF4MultiselectFragment.close();
	//    },
	//    onNavBack: function (e) {
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getSubHeader().getContentLeft()[0].clear();
	//        var s = this.participantsF4MultiselectFragment.getContent()[0]._sSelectedPartnerCategory;
	//        var S;
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//            S = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp");
	//        }
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory"))
	//            var a = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory");
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp"))
	//            var d = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp");
	//        var c = 0;
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp"))
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + s))
	//                c = c + S.getProperty("/" + s).length;
	//        if (a)
	//            if (a.getProperty("/" + s))
	//                c = c + a.getProperty("/" + s).length;
	//        if (d)
	//            if (d.getProperty("/" + s))
	//                c = c - d.getProperty("/" + s).length;
	//        var l = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0];
	//        if (c != 0) {
	//            l.getSelectedItem().setInfo(c);
	//        } else if (l.getSelectedItem()) {
	//            l.getSelectedItem().setInfo(" ");
	//        }
	//        l.getSelectedItem().setSelected(false);
	//        var n = this.participantsF4MultiselectFragment.getContent()[0];
	//        n._sSelectedPartnerCategoryAndParticipants = S;
	//        n.to(this.participantsF4MultiselectFragment.getContent()[0].getPages()[0]);
	//    },
	//    onExit: function () {
	//        if (this._oDialog) {
	//            this._oDialog.destroy();
	//        }
	//    },
	//    searchEmployeeList: function (e) {
	//        var s = e.getParameter("query");
	//        var f = new sap.ui.model.Filter([
	//            new sap.ui.model.Filter("fullName", sap.ui.model.FilterOperator.Contains, s),
	//            new sap.ui.model.Filter("accountID", sap.ui.model.FilterOperator.Contains, s),
	//            new sap.ui.model.Filter("contactID", sap.ui.model.FilterOperator.Contains, s),
	//            new sap.ui.model.Filter("employeeID", sap.ui.model.FilterOperator.Contains, s)
	//        ], false);
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getBinding("items").filter(s !== "" ? [f] : []);
	//    },
	//    onParticipantDelete: function (e) {
	//        var I = e.getParameter("listItem");
	//        var p = e.getSource();
	//        var P = this.byId("partnerBasket").getItems();
	//        for (var i = 0; i < P.length; i++) {
	//            if (P[i] == I) {
	//                var a = i;
	//            }
	//        }
	//        e.getSource().removeItem(e.getParameter("listItem"));
	//        e.getParameter("listItem").destroy();
	//        var d = this.byId("partnerBasket").getModel("json").getData().SalesTeam[a].Name;
	//        var b = this.byId("partnerBasket").getModel("json").getData().SalesTeam[a].PartnerFunction;
	//        var c = this.byId("partnerBasket").getModel("json").getData().SalesTeam[a].Key;
	//        if (parseFloat(this.sBackendVersion) >= 4) {
	//            if (this.followupOppt) {
	//                if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryMainDelete")) {
	//                    this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategoryMainDelete");
	//                }
	//                var s = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryMainDelete");
	//                var f = { SalesTeam: [] };
	//                var g = {
	//                    key: c,
	//                    value: d
	//                };
	//                if (!s.getProperty("/" + b)) {
	//                    s.setProperty("/" + b, [g]);
	//                } else {
	//                    s.getProperty("/" + b).push(g);
	//                }
	//                this.deletedFromMain = s;
	//            }
	//        }
	//        var h = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").getProperty("/" + b);
	//        for (var i = 0; i < h.length; i++) {
	//            if (h[i].key == c) {
	//                this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").getProperty("/" + b).splice(i, 1);
	//            }
	//        }
	//        this.byId("partnerBasket").getModel("json").getData().SalesTeam.splice(a, 1);
	//        var r = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems();
	//        for (var i = 0; i < r.length; i++) {
	//            if (r[i].getBindingContext("json").getObject().PartnerFunctionName == b) {
	//                var j = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems()[i].getInfo();
	//                if (j - 1 != 0) {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems()[i].setInfo(j - 1);
	//                } else if (j - 1 == 0) {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems()[i].setInfo(" ");
	//                }
	//            }
	//        }
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems();
	//    },
	//    onPartnerFunctionChange: function (e) {
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1")) {
	//            this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1").destroy();
	//        }
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2")) {
	//            this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2").destroy();
	//        }
	//        var s = "", d;
	//        if (e.getSource().getId().substring(e.getSource().getId().length - 11) == "searchField") {
	//            var s = e.getParameter("query");
	//            if (s == "")
	//                s = " ";
	//            o = this.selectedBuffer.getBindingContext("json");
	//            d = true;
	//            if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1")) {
	//                this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategoryTemp1");
	//            }
	//            var S = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1");
	//            var l = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0], E = [];
	//            for (var i = 0; i < l.getSelectedItems().length; i++) {
	//                E.push({
	//                    key: l.getSelectedItems()[i].getDescription(),
	//                    value: l.getSelectedItems()[i].getTitle()
	//                });
	//            }
	//            S.setProperty("/" + this.PartnerName, E);
	//        }
	//        var t, o;
	//        if (e.getSource().getId().substring(e.getSource().getId().length - 7) == "XButton") {
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getSubHeader().getContentLeft()[0].clear();
	//            if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2")) {
	//                this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategoryTemp2");
	//            }
	//            var S = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2");
	//            var l = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0], E = [];
	//            for (var i = 0; i < l.getSelectedItems().length; i++) {
	//                E.push({
	//                    key: l.getSelectedItems()[i].getDescription(),
	//                    value: l.getSelectedItems()[i].getTitle()
	//                });
	//            }
	//            S.setProperty("/" + this.PartnerName, E);
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//            t = false;
	//            o = this.selectedBuffer.getBindingContext("json");
	//        } else if (d) {
	//        } else {
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getSubHeader().getContentLeft()[0].clear();
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//            var a = e.getParameter("listItem");
	//            this.selectedBuffer = a;
	//            o = a.getBindingContext("json");
	//            t = true;
	//        }
	//        var b = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory");
	//        var c = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp");
	//        var p = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions"), n = this.participantsF4MultiselectFragment.getContent()[0];
	//        if (!this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType")) {
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "PartnersBasedOnType");
	//        }
	//        if (this.accountId) {
	//        } else {
	//            t = false;
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//        }
	//        if (!this.accountName || this.accountName == "")
	//            this.accountName = this.accountId;
	//        if (p.indexOf(o.getObject()) !== -1) {
	//            var I = p.indexOf(o.getObject());
	//            this.PartnerName = p[I]["PartnerFunctionName"];
	//            var T = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar();
	//            switch (p[I]["PartnerFunctionCategory"]) {
	//            case "0005":
	//            case "0008":
	//                var f, g;
	//                f = jQuery.proxy(function (C, D, r) {
	//                    var q = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType");
	//                    q.setProperty("/" + encodeURIComponent(C), D.results);
	//                    for (var x = 0; x < D.results.length; x++) {
	//                        if (D.results[x].fullName == "")
	//                            D.results[x].fullName = " ";
	//                    }
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(C), this.employeeListItemTemplate1, null, []);
	//                }, this, p[I]["PartnerFunctionName"]);
	//                g = jQuery.proxy(function (q) {
	//                }, this);
	//                if (this.bBpDeterminationEnabled && T.getContent()[2].getId() !== e.getSource().getId() && this.bpDeterminationResults[this.PartnerName].length >= 0 && e.getSource().getId().substring(e.getSource().getId().length - 11) !== "searchField") {
	//                    this._setPartnersBasedOnTypeWithCache(this.PartnerName);
	//                } else {
	//                    if (t) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                        this.oModel.read("/AccountCollection(accountID='" + this.accountId + "')/EmployeeResponsibles", null, null, false, f, g);
	//                    } else if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible() && s) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                        this.oModel.read("/AccountCollection(accountID='" + this.accountId + "')/EmployeeResponsibles", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, f, g);
	//                    } else if (s.length > 0) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                        this.oModel.read("/EmployeeCollection", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, f, g);
	//                    } else {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                        this.oModel.read("/EmployeeCollection", null, null, false, f, g);
	//                    }
	//                }
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].destroyItems();
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.employeeListItemTemplate1, null, []);
	//                var P = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getItems();
	//                var m = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                var E;
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//                    var h = b.getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (h)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < h.length; k++) {
	//                                if (h[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k].getDescription() === P[i].getDescription()) {
	//                                    P[i].setSelected(false);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                break;
	//            case "0007":
	//                var f, g;
	//                f = jQuery.proxy(function (C, D, r) {
	//                    var q = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType");
	//                    q.setProperty("/" + encodeURIComponent(C), D.results);
	//                    for (var x = 0; x < D.results.length; x++) {
	//                        if (D.results[x].fullName == "")
	//                            D.results[x].fullName = " ";
	//                    }
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(C), this.contactListItemTemplate1, null, []);
	//                }, this, p[I]["PartnerFunctionName"]);
	//                g = jQuery.proxy(function (q) {
	//                }, this);
	//                if (this.bBpDeterminationEnabled && T.getContent()[2].getId() !== e.getSource().getId() && this.bpDeterminationResults[this.PartnerName].length >= 0 && e.getSource().getId().substring(e.getSource().getId().length - 11) !== "searchField") {
	//                    this._setPartnersBasedOnTypeWithCache(this.PartnerName);
	//                } else {
	//                    if (t) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//                        this.oModel.read("AccountCollection('" + this.accountId + "')/Contacts", null, null, false, f, g);
	//                    } else if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible() && s) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                        this.oModel.read("AccountCollection('" + this.accountId + "')/Contacts", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, f, g);
	//                    } else if (s.length > 0) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                        this.oModel.read("/ContactCollection", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, f, g);
	//                    } else {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                        this.oModel.read("/ContactCollection", null, null, false, f, g);
	//                    }
	//                }
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].destroyItems();
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.contactListItemTemplate1, null, []);
	//                var P = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getItems();
	//                var m = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                var E;
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//                    var h = b.getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (h)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < h.length; k++) {
	//                                if (h[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k].getDescription() === P[i].getDescription()) {
	//                                    P[i].setSelected(false);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                break;
	//            default:
	//                var f, g;
	//                f = jQuery.proxy(function (C, D, r) {
	//                    var q = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType");
	//                    q.setProperty("/" + encodeURIComponent(C), D.results);
	//                    for (var x = 0; x < D.results.length; x++) {
	//                        if (D.results[x].fullName == "")
	//                            D.results[x].fullName = " ";
	//                    }
	//                    if (t && parseFloat(this.sBackendVersion) >= 4) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(C), this.accountListItemTemplate2, null, []);
	//                    } else if (s.length > 0 && this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible()) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(C), this.accountListItemTemplate2, null, []);
	//                    } else if (s.length > 0) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(C), this.accountListItemTemplate1, null, []);
	//                    } else {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(C), this.accountListItemTemplate1, null, []);
	//                    }
	//                }, this, p[I]["PartnerFunctionName"]);
	//                g = jQuery.proxy(function (q) {
	//                }, this);
	//                if (this.bBpDeterminationEnabled && T.getContent()[2].getId() !== e.getSource().getId() && this.bpDeterminationResults[this.PartnerName].length >= 0 && e.getSource().getId().substring(e.getSource().getId().length - 11) !== "searchField") {
	//                    this._setPartnersBasedOnTypeWithCache(this.PartnerName);
	//                } else {
	//                    if (t && parseFloat(this.sBackendVersion) >= 4) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//                        this.oModel.read("AccountCollection('" + this.accountId + "')/Relationships?$filter=relationshipCategory eq '" + p[I].RelationshipCategory + "' ", null, null, false, f, g);
	//                    } else if (s.length > 0 && parseFloat(this.sBackendVersion) >= 4 && this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible()) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//                        this.oModel.read("AccountCollection('" + this.accountId + "')/Relationships?$filter=relationshipCategory eq '" + p[I].RelationshipCategory + "'and substringof('" + s + "',account2FullName) ", null, null, false, f, g);
	//                    } else if (s.length > 0) {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                        this.oModel.read("/AccountCollection", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, f, g);
	//                    } else {
	//                        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                        this.oModel.read("/AccountCollection", null, null, false, f, g);
	//                    }
	//                }
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].destroyItems();
	//                if (t) {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.accountListItemTemplate2, null, []);
	//                } else if (s.length > 0 && this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible()) {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.accountListItemTemplate2, null, []);
	//                } else if (s.length > 0) {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.accountListItemTemplate1, null, []);
	//                } else {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.accountListItemTemplate1, null, []);
	//                }
	//                var P = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getItems();
	//                var m = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                var E;
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//                    var h = b.getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (h)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < h.length; k++) {
	//                                if (h[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k].getDescription() === P[i].getDescription()) {
	//                                    P[i].setSelected(false);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2")) {
	//                    var j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (j)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < j.length; k++) {
	//                                if (j[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                break;
	//            }
	//        }
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].setTitle(this.oResourceBundle.getText("PARTNERS") + " " + p[I]["PartnerFunctionName"]);
	//        n._sSelectedPartnerCategory = encodeURIComponent(p[I]["PartnerFunctionName"]);
	//        n.to(this.participantsF4MultiselectFragment.getContent()[0].getPages()[1]);
	//    },
	//    onSelectParticipantMinMax: function (e) {
	//        var d = true;
	//        var c = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getSelectedItem().getBindingContext("json").getObject().PartnerFunctionCode;
	//        var a = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getSelectedItem().getBindingContext("json").getObject().PartnerFunctionName;
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp"))
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(a)))
	//                if (!e.getParameters().selected) {
	//                    var i = e.getParameters().listItem.getDescription();
	//                    var b = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(a));
	//                    if (b) {
	//                        for (var k = 0; k < b.length; k++) {
	//                            if (b[k].key == i) {
	//                                this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(a)).splice(k, 1);
	//                                d = false;
	//                            }
	//                        }
	//                    }
	//                }
	//        if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp")) {
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategoryDeletedTemp");
	//        }
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory"))
	//            if (d)
	//                if (!e.getParameters().selected) {
	//                    var i = e.getParameters().listItem.getDescription();
	//                    var b = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(a));
	//                    if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(a))) {
	//                        this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(a)).push(e.getParameters().listItem);
	//                    } else {
	//                        var l = [e.getParameters().listItem];
	//                        this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").setProperty("/" + encodeURIComponent(a), l);
	//                    }
	//                }
	//        var s = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0];
	//        var f = s.indexOfItem(s.getSelectedItem());
	//        var g = this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions[f];
	//        var P = g.PartnerFunctionCode;
	//        var C = g.CountHigh;
	//        var h = g.CountLow;
	//        var n = 0;
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(a))) {
	//                n = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(a)).length;
	//            } else {
	//                n = 0;
	//            }
	//        } else {
	//            n = 0;
	//        }
	//        var j = 0;
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").getProperty("/" + encodeURIComponent(a)))
	//                j = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory").getProperty("/" + encodeURIComponent(a)).length;
	//        } else {
	//            j = 0;
	//        }
	//        var m = 0;
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp"))
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(a)))
	//                m = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryDeletedTemp").getProperty("/" + encodeURIComponent(a)).length;
	//        if (n + j - m >= C) {
	//            if (e) {
	//                e.getParameters().listItem.setSelected(false);
	//            }
	//            if (C === 1) {
	//                sap.m.MessageToast.show(this.oResourceBundle.getText("TOO_MANY_PARTICIPANTS_1", [C]), { duration: 3500 });
	//            } else {
	//                sap.m.MessageToast.show(this.oResourceBundle.getText("TOO_MANY_PARTICIPANTS", [C]), { duration: 3500 });
	//            }
	//            return;
	//        } else {
	//            if (e.getParameters().selected) {
	//                if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                    this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategoryTemp");
	//                }
	//                var o = e.getParameters().listItem.getDescription();
	//                var p = e.getParameters().listItem.getTitle();
	//                var E = [];
	//                E.push({
	//                    key: o,
	//                    value: p
	//                });
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(a))) {
	//                    this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(a)).push(E[0]);
	//                } else {
	//                    this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").setProperty("/" + encodeURIComponent(a), E);
	//                }
	//            }
	//        }
	//    },
	//    _setAccount: function (a) {
	//        var b = this.getView().byId("customer");
	//        if (b)
	//            b.setValue(a);
	//    },
	//    onAccountSuggestItemSelected: function (e) {
	//        var i = e.getParameter("selectedItem");
	//        var a = null;
	//        a = i.data("oAccount");
	//        this.accountName = a.fullName === "" ? a.accountID : a.fullName;
	//        this.accountId = a.accountID;
	//        this.byId("customer").setValue(this.accountName);
	//        this._triggerDetermination();
	//        this.enableSaveBtn();
	//    },
	//    onAccountInputFieldChanged: function (e) {
	//        this.byId("customer").setValueState(sap.ui.core.ValueState.None);
	//        var a = e.getSource();
	//        this._setAccount(a.getValue());
	//        a.setShowSuggestion(true);
	//        a.setFilterSuggests(false);
	//        var c = function (A) {
	//            a.removeAllSuggestionItems();
	//            if (a.getValue().length > 0) {
	//                var i = 0;
	//                for (i in A) {
	//                    var o = A[i];
	//                    if (o.fullName.toUpperCase() == a.getValue().toUpperCase()) {
	//                        this._setAccount(o.fullName);
	//                    }
	//                    var C = new sap.ui.core.CustomData({
	//                        key: "oAccount",
	//                        value: o
	//                    });
	//                    var I = new sap.ui.core.Item({
	//                        text: o.fullName,
	//                        customData: C
	//                    });
	//                    a.addSuggestionItem(I);
	//                }
	//            }
	//        };
	//        this._readAccount(a.getValue(), c);
	//    },
	//    _readAccount: function (s, c) {
	//        var t = this, m = this.getView().getModel();
	//        this.oModel.read("/AccountCollection?$expand=MainAddress&$select=accountID,MainAddress/city,MainAddress/country,fullName", null, "$top=10&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", true, function (d, r) {
	//            var a = jQuery.parseJSON(JSON.stringify(d));
	//            if (c)
	//                c.call(t, a.results);
	//        }, function (e) {
	//            jQuery.sap.log.error("Read failed in S4->_readAccount:" + e.response.body);
	//        });
	//    },
	//    _setContact: function (c) {
	//        var a = this.getView().byId("inputMainContact");
	//        if (a)
	//            a.setValue(c);
	//    },
	//    onContactSuggestItemSelected: function (e) {
	//        var I = e.getParameter("selectedItem");
	//        var c = null;
	//        for (var i in I.getCustomData()) {
	//            var C = I.getCustomData()[i];
	//            if (C.getKey() == "oContact")
	//                c = C.getValue();
	//        }
	//        this.byId("inputMainContact").setValue(c.fullName);
	//        this.contactName = c.fullName;
	//        this.contactId = c.contactID;
	//        this.oSelectedContact.fullName = c.fullName;
	//        this.oSelectedContact.contactID = c.contactID;
	//    },
	//    onContactInputFieldChanged: function (e) {
	//        this.byId("inputMainContact").setValueState(sap.ui.core.ValueState.None);
	//        var c = e.getSource();
	//        this._setContact(c.getValue());
	//        c.setShowSuggestion(true);
	//        c.setFilterSuggests(false);
	//        var C = function (a) {
	//            c.removeAllSuggestionItems();
	//            if (c.getValue().length > 0) {
	//                var i = 0;
	//                for (i in a) {
	//                    var o = a[i];
	//                    if (o.fullName.toUpperCase() == c.getValue().toUpperCase()) {
	//                        this._setContact(o.fullName);
	//                    }
	//                    var b = new sap.ui.core.CustomData({
	//                        key: "oContact",
	//                        value: o
	//                    });
	//                    var I = new sap.ui.core.Item({
	//                        text: o.fullName,
	//                        customData: b
	//                    });
	//                    c.addSuggestionItem(I);
	//                }
	//            }
	//        };
	//        this._readContact(c.getValue(), C);
	//    },
	//    _readContact: function (s, c) {
	//        var t = this, m = this.getView().getModel();
	//        this.oModel.read("/ContactCollection", null, "$top=10&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", true, function (d, r) {
	//            var a = jQuery.parseJSON(JSON.stringify(d));
	//            if (c)
	//                c.call(t, a.results);
	//        }, function (e) {
	//            jQuery.sap.log.error("Read failed in S4->_readContact:" + e.response.body);
	//        });
	//    },
	//    _setEmployee: function (e) {
	//        var a = this.getView().byId("inputEmpResponsible_S5");
	//        if (a)
	//            a.setValue(e);
	//    },
	//    onEmployeeSuggestItemSelected: function (e) {
	//        var I = e.getParameter("selectedItem");
	//        var o = null;
	//        for (var i in I.getCustomData()) {
	//            var c = I.getCustomData()[i];
	//            if (c.getKey() == "oemployee")
	//                o = c.getValue();
	//        }
	//        this.byId("inputEmpResponsible_S5").setValue(o.fullName);
	//        this.employeeName = o.fullName;
	//        this.oSelectedEmployee.employeeID = o.employeeID;
	//    },
	//    onEmployeeInputFieldChanged: function (e) {
	//        this.byId("inputEmpResponsible_S5").setValueState(sap.ui.core.ValueState.None);
	//        var a = e.getSource();
	//        this._setEmployee(a.getValue());
	//        a.setShowSuggestion(true);
	//        a.setFilterSuggests(false);
	//        var c = function (E) {
	//            a.removeAllSuggestionItems();
	//            if (a.getValue().length > 0) {
	//                var i = 0;
	//                for (i in E) {
	//                    var o = E[i];
	//                    if (o.fullName.toUpperCase() == a.getValue().toUpperCase()) {
	//                        this._setEmployee(o.fullName);
	//                    }
	//                    var C = new sap.ui.core.CustomData({
	//                        key: "oemployee",
	//                        value: o
	//                    });
	//                    var I = new sap.ui.core.Item({
	//                        text: o.fullName,
	//                        customData: C
	//                    });
	//                    a.addSuggestionItem(I);
	//                }
	//            }
	//        };
	//        this._reademployee(a.getValue(), c);
	//    },
	//    _reademployee: function (s, c) {
	//        var t = this, m = this.getView().getModel();
	//        this.oModel.read("/EmployeeCollection", null, "$top=10&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", true, function (d, r) {
	//            var e = jQuery.parseJSON(JSON.stringify(d));
	//            if (c)
	//                c.call(t, e.results);
	//        }, function (e) {
	//            jQuery.sap.log.error("Read failed in S4->_reademployee:" + e.response.body);
	//        });
	//    },
	//    _setCurrency: function (c) {
	//        var a = this.getView().byId("currency");
	//        if (a)
	//            a.setValue(c);
	//    },
	//    onCurrencySuggestItemSelected: function (e) {
	//        var I = e.getParameter("selectedItem");
	//        var c = null;
	//        for (var i in I.getCustomData()) {
	//            var C = I.getCustomData()[i];
	//            if (C.getKey() == "oCurrency")
	//                c = C.getValue();
	//        }
	//        this.byId("currency").attachBrowserEvent("keydown", jQuery.proxy(function (e) {
	//            if (e.keyCode === 13) {
	//                this.byId("currency").setValue(c.CurrencyKey);
	//                this.CurrencyKey = c.CurrencyKey;
	//            }
	//        }, this));
	//    },
	//    onCurrencyInputFieldChanged: function (e) {
	//        this.byId("currency").setValueState(sap.ui.core.ValueState.None);
	//        var c = e.getSource();
	//    },
	//    liveSearchAccount: function (e) {
	//        var t = e.getParameters().newValue;
	//        var s = this.accountF4Fragment.getSubHeader().getContentLeft()[0];
	//        if (t.length === 0 || t.length > 3) {
	//            s.fireSearch({ query: t });
	//        }
	//    },
	//    liveSearchContact: function (e) {
	//        var t = e.getParameters().newValue;
	//        var s = this.contactF4Fragment.getSubHeader().getContentLeft()[0];
	//        if (t.length === 0 || t.length > 3) {
	//            s.fireSearch({ query: t });
	//        }
	//    },
	//    liveSearchEmployee: function (e) {
	//        var t = e.getParameters().newValue;
	//        var s = this.employeeF4Fragment.getSubHeader().getContentLeft()[0];
	//        if (t.length === 0 || t.length > 3) {
	//            s.fireSearch({ query: t });
	//        }
	//    },
	//    liveSearchCurrency: function (e) {
	//        var v = e.getParameter("value");
	//        if (v.length == 0 || v && v.length > 3) {
	//            var f = new sap.ui.model.Filter([new sap.ui.model.Filter("CurrencyText", sap.ui.model.FilterOperator.Contains, v)], false);
	//            e.getParameter("itemsBinding").filter([f]);
	//        }
	//    },
	//    _checkDataLoss: function () {
	//        var t = {
	//            Description: this.byId("desc").getValue(),
	//            ExpectedSalesVolume: this.byId("volume").getValue(),
	//            CurrencyCode: this.byId("currency").getValue(),
	//            ChanceOfSuccess: this.byId("chanceofSuccess").getValue(),
	//            StartDate: this.byId("datePickerStartDate").getValue(),
	//            ClosingDate: this.byId("datePickerCloseDate").getValue(),
	//            AccountName: this.byId("customer").getValue(),
	//            MainContactName: this.byId("inputMainContact").getValue(),
	//            EmployeeRespName: this.byId("inputEmpResponsible_S5").getValue(),
	//            SalesStageCode: this.byId("stagedropdown").getSelectedKey(),
	//            UserStatusCode: this.byId("statusdropdown").getSelectedKey(),
	//            PriorityCode: this.byId("priority_val").getSelectedKey(),
	//            ForecastRelevance: this.byId("Switch").getState(),
	//            SalesOrg: this.byId("salesOrganization").getValue()
	//        };
	//        var a = this.byId("productBasket").getModel("json").getData();
	//        var b = this.byId("partnerBasket").getModel("json").getData();
	//        this.jsontempEntry = JSON.stringify(t);
	//        this.jsontempProducts = JSON.stringify(a);
	//        this.jsontempPartners = JSON.stringify(b);
	//        if (this.jsonoldEntry !== this.jsontempEntry || this.jsonoldProducts !== this.jsontempProducts || this.jsonoldPartners !== this.jsontempPartners) {
	//            return true;
	//        }
	//    },
	//    parseDetermResults: function (d) {
	//        var t = this, c = this.partnerDeterminationMap[this.processType];
	//        d = this._removeDuplicateElem(d);
	//        c.forEach(function (e) {
	//            if (!t.bpDeterminationResults.hasOwnProperty(e.PartnerFunctionName)) {
	//                t.bpDeterminationResults[e.PartnerFunctionName] = [];
	//            }
	//        });
	//        for (var i = 0; i < d.length; i++) {
	//            for (var j = 0; j < c.length; j++) {
	//                if (c[j].PartnerFunctionCategory === "0006" && c[j].PartnerFunctionCode == d[i].PartnerFunction && c[j].mainPartnerFunction == "X") {
	//                    d[i]["HeaderTag"] = "Prospect";
	//                    this.bpDeterminationResults[c[j].PartnerFunctionName].push(d[i]);
	//                    break;
	//                } else if (c[j].PartnerFunctionCategory === "0007" && c[j].PartnerFunctionCode == d[i].PartnerFunction && c[j].mainPartnerFunction == "X") {
	//                    d[i]["HeaderTag"] = "Contact";
	//                    this.bpDeterminationResults[c[j].PartnerFunctionName].push(d[i]);
	//                    break;
	//                } else if (c[j].PartnerFunctionCategory === "0008" && c[j].PartnerFunctionCode == d[i].PartnerFunction && c[j].mainPartnerFunction == "X") {
	//                    d[i]["HeaderTag"] = "Employee";
	//                    this.bpDeterminationResults[c[j].PartnerFunctionName].push(d[i]);
	//                    break;
	//                } else if (c[j].PartnerFunctionCode == d[i].PartnerFunction) {
	//                    d[i]["HeaderTag"] = "";
	//                    this.bpDeterminationResults[c[j].PartnerFunctionName].push(d[i]);
	//                }
	//            }
	//            Object.keys(this.bpDeterminationResults).forEach(function (k) {
	//                t.bpDeterminationResults[k] = t._removeDuplicateElem(t.bpDeterminationResults[k]);
	//                if (t.bpDeterminationResults[k].length > t.iDetermResultFillLimit) {
	//                    t.bDisMultiFoundToast = true;
	//                }
	//            });
	//        }
	//    },
	//    _removeDuplicateElem: function (d) {
	//        var h = {}, n = [];
	//        d.forEach(function (e) {
	//            if (e != undefined) {
	//                return h[JSON.stringify(e)] = true;
	//            }
	//        });
	//        for (var i in h) {
	//            n.push(JSON.parse(i));
	//        }
	//        return n;
	//    },
	//    getCustomizing: function (t) {
	//        if (!this.partnerDeterminationMap[t] || this.partnerDeterminationMap[t].length == 0) {
	//            var b = [];
	//            var m = this.getView().getModel();
	//            var s = "TransactionType eq '" + t + "'";
	//            var p = "/PartnerFunctions?$filter=" + jQuery.sap.encodeURL(s);
	//            b.push(m.createBatchOperation(p, "GET"));
	//            m.addBatchReadOperations(b);
	//            m.submitBatch(jQuery.proxy(function (r) {
	//                if (r.__batchResponses.length > 0) {
	//                    if (r.__batchResponses[0].statusCode === "200") {
	//                        this.partnerDeterminationMap[t] = r.__batchResponses[0].data.results;
	//                    } else
	//                        this.handleErrors(r, true);
	//                    if (this.extHookParseCustomizingResults) {
	//                        this.extHookParseCustomizingResults(r);
	//                    }
	//                }
	//            }, this), jQuery.proxy(function () {
	//            }, this), false);
	//        }
	//    },
	//    onSalesAreaChange: function (e) {
	//        this.salesareaF4Fragment.getContent()[0].getInfoToolbar().setVisible(false);
	//        this.oModel.read("/SalesAreas", null, null, false, jQuery.proxy(function (o, r) {
	//            this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            if (!this.salesareaF4Fragment.getModel("SalesArea")) {
	//                this.salesareaF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "SalesArea");
	//            }
	//            var s = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea");
	//            s.setProperty("/SalesAreaList", r.data);
	//        }, this), jQuery.proxy(function (E) {
	//            this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: [] });
	//            this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//        }, this));
	//        this.setSalesAreaSearchinput("");
	//    },
	//    appendCustomizingOperation: function (b, m, p) {
	//        var s = "TransactionType eq '" + p + "'";
	//        var P = "/PartnerFunctions?$filter=" + jQuery.sap.encodeURL(s);
	//        b.push(m.createBatchOperation(P, "GET"));
	//        this.determResultsProcessMap.push("Customizing");
	//        if (this.extHookAppendConfigOperation) {
	//            b = this.extHookAppendConfigOperation(b, m);
	//        }
	//        return b;
	//    },
	//    appendBpDetermOperation: function (b, m, p, a, g, A) {
	//        var u = "", i = "", P = [];
	//        var G = "";
	//        if (this.partnerDeterminationMap[p] !== undefined) {
	//            P = this.partnerDeterminationMap[p].map(function (f) {
	//                return f.PartnerFunctionCode;
	//            });
	//        }
	//        var c = this.bRetriggerDeterm ? [] : this.getUsedPartnerFunctions();
	//        var d = P.filter(function (f) {
	//            return c.indexOf(f) < 0;
	//        });
	//        if ((a == undefined || a == null) && (g == undefined || g == null)) {
	//            u = "ProcessType eq '" + p + "'";
	//        } else if ((a != undefined || a != null) && (g == undefined || g == null)) {
	//            u = "ProcessType eq '" + p + "' and " + "paramPartnerNo eq '" + a + "'";
	//        } else if ((a != undefined || a != null) && (g != undefined || g != null)) {
	//            G = cus.crm.opportunity.util.Formatter.parseBpGuid(g);
	//            u = "ProcessType eq '" + p + "' and " + "paramPartnerNo eq '" + a + "' and " + "paramPrecedingDocumentID eq " + G;
	//        } else if ((a == undefined || a == null) && (g != undefined || g != null)) {
	//            G = cus.crm.opportunity.util.Formatter.parseBpGuid(g);
	//            u = "ProcessType eq '" + p + "' and " + "paramPrecedingDocumentID eq " + G;
	//        }
	//        if (jQuery.isPlainObject(A) && !jQuery.isEmptyObject(A) && A != undefined && A != null) {
	//            var C = "";
	//            if (Object.keys(A).length == 1) {
	//                if (u.length == 0) {
	//                    C = Object.keys(A)[0] + " eq '" + A[Object.keys(A)[0]] + "'";
	//                } else {
	//                    C = " and " + Object.keys(A)[0] + " eq '" + A[Object.keys(A)[0]] + "'";
	//                }
	//            } else if (Object.keys(A).length > 1) {
	//                C = " and (" + Object.keys(A)[0] + " eq '" + A[Object.keys(A)[0]] + "'";
	//                delete A[Object.keys(A)[0]];
	//                Object.keys(A).forEach(function (f) {
	//                    C += " or " + f + " eq '" + A[f] + "'";
	//                });
	//                C += ")";
	//            }
	//            u += C;
	//        }
	//        if (d.length == 1) {
	//            i = " and paramPartnerFunction eq '" + d[0] + "'";
	//        } else if (d.length > 1) {
	//            i = " and (paramPartnerFunction eq '" + d[0] + "'";
	//            d.shift();
	//            d.forEach(function (f) {
	//                i += " or paramPartnerFunction eq '" + f + "'";
	//            });
	//            i += ")";
	//        }
	//        u += i;
	//        var s = u;
	//        var e = "/RequestedPartners?$filter=" + jQuery.sap.encodeURL(s);
	//        b.push(m.createBatchOperation(e, "GET"));
	//        this.determResultsProcessMap.push("BpDeterm");
	//        return b;
	//    },
	//    appendOrgDetermOperation: function (b, m, a, g, A) {
	//        var s = "";
	//        var G = "";
	//        var c = this.byId("customer").getValue();
	//        if (g != undefined && g != null) {
	//            G = cus.crm.opportunity.util.Formatter.parseOrgGuid(g);
	//            s = "paramPrecedingDocumentID eq '" + G + "'";
	//        } else if (a != undefined) {
	//            s = "ProspectNumber eq '" + a + "'";
	//        } else if (c != 0) {
	//            s = "ProspectNumber eq '" + this.accountId + "'";
	//        }
	//        if (jQuery.isPlainObject(A) && !jQuery.isEmptyObject(A) && A != undefined && A != null) {
	//            var C = "";
	//            if (Object.keys(A).length == 1) {
	//                if (s.length == 0) {
	//                    C = Object.keys(A)[0] + " eq '" + A[Object.keys(A)[0]] + "'";
	//                } else {
	//                    C = " and " + Object.keys(A)[0] + " eq '" + A[Object.keys(A)[0]] + "'";
	//                }
	//            } else if (Object.keys(A).length > 1) {
	//                C = " and (" + Object.keys(A)[0] + " eq '" + A[Object.keys(A)[0]] + "'";
	//                delete A[Object.keys(A)[0]];
	//                Object.keys(A).forEach(function (e) {
	//                    C += " or " + e + " eq '" + A[e] + "'";
	//                });
	//                C += ")";
	//            }
	//            s += C;
	//        }
	//        if (s.length != 0) {
	//            this.determResultsProcessMap.push("OrgDeterm");
	//            var p = "/SalesAreas?$filter=" + jQuery.sap.encodeURL(s);
	//            b.push(m.createBatchOperation(p, "GET"));
	//        }
	//        return b;
	//    },
	//    bindOrgContrl: function (r) {
	//        if (r.results.length == 1 && !this.checkSalesAreaExitsed()) {
	//            this.bindSalesAreaFields(r.results[0]);
	//        } else if (r.results.length > 1)
	//            this.bDisMultiFoundToast = true;
	//    },
	//    bindSalesAreaList: function (d) {
	//        if (!this.salesareaF4Fragment) {
	//            this.salesareaF4Fragment = new sap.ui.xmlfragment(this.createId("salesareaF4"), "cus.crm.opportunity.view.SalesAreaDialog", this);
	//            this.salesareaF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "json");
	//            this.salesareaF4Fragment.setModel(this.oI18nModel, "i18n");
	//        }
	//        if (!this.salesareaF4Fragment.getModel("SalesArea")) {
	//            this.salesareaF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "SalesArea");
	//        }
	//        this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//        var s = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea");
	//        s.setProperty("/SalesAreaList", d);
	//        var t = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("DETERM_FILTER");
	//        this.salesareaF4Fragment.getContent()[0].getInfoToolbar().getContent()[0].setText(t);
	//        this.salesareaF4Fragment.getContent()[0].getInfoToolbar().setVisible(true);
	//    },
	//    checkSalesAreaExitsed: function () {
	//        var s = this.getView().byId("salesOrganization").getValue();
	//        if (s != "")
	//            return true;
	//    },
	//    bindSalesAreaFields: function (d) {
	//        this.acc_salesorgid = d.SalesOrganizationId;
	//        this.acc_salesorgdesc = d.SalesOrganizationText;
	//        var s = cus.crm.opportunity.util.Formatter.formatSalesOrganization(d.SalesOrganizationText, d.SalesOrganizationId);
	//        this.getView().byId("salesOrganization").setValue(s);
	//        this.acc_dischaid = d.DistrubutionChannelId;
	//        this.acc_dischadesc = d.DistrubutionChannelText;
	//        var a = cus.crm.opportunity.util.Formatter.formatDistributionChannel(d.DistrubutionChannelText, d.DistrubutionChannelId);
	//        this.getView().byId("distributionchannel_Text").setText(a);
	//        this.acc_divid = d.DivisionId;
	//        this.acc_divdesc = d.DivisionText;
	//        var b = cus.crm.opportunity.util.Formatter.formatDivision(d.DivisionText, d.DivisionId);
	//        this.getView().byId("division_Text").setText(b);
	//    },
	//    setSalesAreaSearchinput: function (v) {
	//        this.salesareaF4Fragment.getSubHeader().getContentLeft()[0].setValue(v);
	//        var s = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea").getProperty("/SalesAreaList").results;
	//        var a = new Array();
	//        for (var k = 0; k < s.length; k++) {
	//            if (s[k].SalesOrganizationText.toLowerCase().search(v) != -1 || s[k].DistrubutionChannelText.toLowerCase().search(v) != -1 || s[k].DivisionText.toLowerCase().search(v) != -1) {
	//                a.push(s[k]);
	//            }
	//        }
	//        this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//        this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: a });
	//        this.salesareaF4Fragment.getModel("json").updateBindings();
	//    },
	//    _setPartnersBasedOnTypeWithCache: function (p) {
	//        var t = this, c = {}, T = t.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar();
	//        c[p] = this.bpDeterminationResults[p].map(function (e) {
	//            return {
	//                "fullName": e.FullName,
	//                "account2FullName": e.FullName,
	//                "contactID": e.PartnerNo,
	//                "employeeID": e.PartnerNo,
	//                "account2ID": e.PartnerNo
	//            };
	//        });
	//        t.participantsF4MultiselectFragment.getModel("PartnersBasedOnType").setData(c);
	//        T.getContent()[0].setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("DETERM_FILTER"));
	//        T.setVisible(true);
	//    },
	//    _prepareHeaderF4Model: function () {
	//        var d = this.bpDeterminationResults;
	//        var m = {
	//            "Contact": [],
	//            "Employee": [],
	//            "Account": []
	//        };
	//        Object.keys(d).forEach(function (k) {
	//            d[k].forEach(function (e) {
	//                var f = !e.FullName ? e.PartnerNo : e.FullName;
	//                if (e.HeaderTag == "Contact") {
	//                    m.Contact.push({
	//                        "fullName": f,
	//                        "contactID": e.PartnerNo
	//                    });
	//                } else if (e.HeaderTag == "Employee") {
	//                    m.Employee.push({
	//                        "fullName": f,
	//                        "employeeID": e.PartnerNo
	//                    });
	//                } else if (e.HeaderTag == "Prospect") {
	//                    m.Account.push({
	//                        "fullName": f,
	//                        "accountID": e.PartnerNo
	//                    });
	//                }
	//            });
	//        });
	//        return m;
	//    },
	//    processBpResults: function (r) {
	//        this.parseDetermResults(r.data.results);
	//        if (!this.bRetriggerDeterm)
	//            this.bindHeaderFields();
	//        var w = false;
	//        if (this.extHookCustomHandlePartnerData) {
	//            w = this.extHookCustomHandlePartnerData();
	//        }
	//        if (!w && !this.bRetriggerDeterm) {
	//            this.bindParticipantsTable(this.bpDeterminationResults);
	//        }
	//    },
	//    processOrgResults: function (r) {
	//        var w = false;
	//        this.orgDeterminationResults = r.data;
	//        if (this.extHookCustomHandleOrgData) {
	//            w = this.extHookCustomHandleOrgData();
	//        }
	//        if (!w) {
	//            this.bindOrgContrl(r.data);
	//        }
	//    },
	//    processCustomizingResults: function (p, r) {
	//        this.partnerDeterminationMap[p] = r.data.results;
	//    },
	//    handleDetermination: function () {
	//        if (!jQuery.isEmptyObject(this.oPrevAccount) && this.oPrevAccount.accountId !== this.accountId) {
	//            this.bCancelDeterm = true;
	//            sap.m.MessageBox.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("DETERM_LOSS"), {
	//                icon: sap.m.MessageBox.Icon.WARNING,
	//                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("WARNING"),
	//                actions: [
	//                    sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("CONTINUE"),
	//                    sap.m.MessageBox.Action.CANCEL
	//                ],
	//                onClose: jQuery.proxy(function (a) {
	//                    if (a == "Continue") {
	//                        this.bRetriggerDeterm = true;
	//                        this.bCancelDeterm = false;
	//                        this.bpDeterminationResults = {};
	//                        this.orgDeterminationResults = { results: [] };
	//                        this.oPrevAccount["accountId"] = this.accountId;
	//                        this.oPrevAccount["accountName"] = this.accountName;
	//                        this.prepareDataAndTriggerDetermination(this.processType, this.accountId);
	//                    } else if (a == "CANCEL") {
	//                        this.accountId = this.oPrevAccount.accountId;
	//                        this.accountName = this.oPrevAccount.accountName;
	//                        this.byId("customer").setValue(this.accountName);
	//                    }
	//                }, this)
	//            });
	//        } else if (jQuery.isEmptyObject(this.oPrevAccount)) {
	//            this.oPrevAccount["accountId"] = this.accountId;
	//            this.oPrevAccount["accountName"] = this.accountName;
	//            this.prepareDataAndTriggerDetermination(this.processType, this.accountId);
	//        }
	//    },
	//    resetMultiDetermFlags: function () {
	//        this.oPrevAccount = {};
	//        this.bCancelDeterm = false;
	//        this.bRetriggerDeterm = false;
	//    },
	//    _isStatusExistForProcessType: function (s, p) {
	//        if (s && s.length > 0) {
	//            for (var i = 0, j = s.length; i < j; i++) {
	//                var S = s[i];
	//                if (S && S.ProcessType == p) {
	//                    return true;
	//                }
	//            }
	//        }
	//        return false;
	//    },
	//    _getStatusForProcessType: function (p) {
	//        var s = [];
	//        var m = this.getView().getModel();
	//        m.read("UserStatuses?$filter=ProcessType eq '" + p + "'", null, null, false, jQuery.proxy(function (d, r) {
	//            if (d && d.results) {
	//                s = d.results;
	//            }
	//        }, this), jQuery.proxy(function (e) {
	//            this.handleErrors(e);
	//        }, this));
	//        return s;
	//    },
	//    _refreshAccountList: function (s) {
	//        var f = [];
	//        if (s !== "") {
	//            f.push(new sap.ui.model.Filter(this.accountFilterName, sap.ui.model.FilterOperator.Contains, s));
	//        }
	//        if (!this.accountF4Fragment) {
	//            this.accountF4Fragment = new sap.ui.xmlfragment(this.createId("accountF4"), "cus.crm.opportunity.view.AccountSelectDialog", this);
	//            var j = new sap.ui.model.json.JSONModel();
	//            this.accountF4Fragment.setModel(j);
	//            this.accountF4Fragment.setModel(this.oI18nModel, "i18n");
	//        }
	//        var l = this.accountF4Fragment.getContent()[0];
	//        l.setModel(this.oModel);
	//        l.bindAggregation("items", {
	//            path: "/AccountCollection",
	//            parameters: {
	//                expand: "MainAddress",
	//                select: "accountID,MainAddress/city,MainAddress/country,name1,fullName"
	//            },
	//            filters: f,
	//            template: this.accountF4Template
	//        });
	//        l.getBinding("items").attachDataReceived(jQuery.proxy(this._setAccountJsonModel), this);
	//    },
	//    _setAccountJsonModel: function (e) {
	//        var r = e.getParameter("data").results;
	//        if (r.length === 0) {
	//            this.accountF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//        }
	//    },
	//    _isFollowup: function () {
	//        return this.followupOppt || this.fullScreen || this.fullScreenFromTask || this.fullScreenFromLead;
	//    },
	//    _triggerDetermination: function () {
	//        if ((this.bBpDeterminationEnabled || this.bOrgDeterminationEnabled) && !this._isFollowup()) {
	//            this.handleDetermination();
	//        }
	//    }

	_onParseErrorMsg: function(err) {
		var sMessage = "";
		var aErrorDetails = JSON.parse(err.responseText).error.innererror.errordetails;
		if (aErrorDetails.length > 0) {
			for (var i = 0; i < aErrorDetails.length; i++) {
				var oError = aErrorDetails[i];
				if (oError.severity === "error") {
					sMessage += (oError.message + "\n");
				}
			}
			if (!sMessage) {
				for (i = 0; i < aErrorDetails.length; i++) {
					oError = aErrorDetails[i];
					if (oError.severity === "info") {
						sMessage += (oError.message + "\n");
					}
				}
			}
		} else {
			sMessage = JSON.parse(err.responseText).error.message.value;
		}
		sap.m.MessageBox.error(sMessage, {
			title: this.getView().getModel("i18n").getProperty("ERROR_TITLE")
		});

	}
});