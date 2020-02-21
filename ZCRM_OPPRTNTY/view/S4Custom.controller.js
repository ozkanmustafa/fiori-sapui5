jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ca.ui.utils.busydialog");
jQuery.sap.require("sap.ca.ui.DatePicker");
jQuery.sap.require("sap.m.SelectDialog");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("cus.crm.opportunity.util.Formatter");
jQuery.sap.require("cus.crm.opportunity.util.schema");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("cus.crm.opportunity.util.Util");
sap.ui.controller("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S4Custom", {
	//    deleteBuffer: [],
	//    headerGuid: 0,
	//    userStatusCode: 0,
	//    UserStatuses: [],
	//    HeaderObject: {},
	//    accountObject: {},
	//    oSelectedAccount: {},
	//    oSelectedContact: { contactID: "" },
	//    oSelectedEmployee: { employeeID: "" },
	//    oMainPartner: { PartnerNumber: "" },
	//    currentDescription: "",
	//    currentQuantity: "",
	//    BackendProducts: {},
	//    requestNumber: 0,
	//    changeSetMapping: {
	//        HEADER: "",
	//        STATUS: "",
	//        CONTACT: "",
	//        EMPLOYEE: "",
	//        BASKET: ""
	//    },
	//    bBasketUpdate: false,
	//    Currencies: [],
	//    bNavOnUpdate: false,
	//    contactF4Fragment: {},
	//    WinStatusCode: "",
	//    LostStatusCode: "",
	//    controller: "",
	//    OldvolumeValue: "",
	//    FormatvolumeValue: "",
	//    OldcosValue: "",
	//    ContactCollection: [],
	//    EmployeeCollection: [],
	//    s3Controller_contact: "",
	//    currencyMessage: "",
	//    bCancel: false,
	    onInit: function () {
	        // Customizing
	        this._onGetTransactionType();
	        sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);
	        var r = sap.ui.getCore().getConfiguration().getRTL();
	        var c = r ? "OpportunityRTL" : "Opportunity";
	        jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath("cus.crm.opportunity.css." + c, ".css"), "sap-ui-theme-sap.crm");
	        this.oResourceBundle = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
	        this.oI18nModel = sap.ca.scfld.md.app.Application.getImpl().AppI18nModel;
	        this.oModel = this.getView().getModel();
	        this.getView().setModel(new sap.ui.model.json.JSONModel(), "json");
	        this.oAppImplementation = sap.ca.scfld.md.app.Application.getImpl();
	        this.oDateFormatter = sap.ca.ui.model.format.DateFormat.getDateInstance({ style: "medium" });
	        // Customizing
	        if (!this.contactF4Fragment) {
	            this.contactF4Fragment = new sap.ui.xmlfragment(this.createId("contactF4"), "cus.crm.opportunity.view.ContactF4", this);   
	        }
	        this.contactF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "json");
	        this.contactF4Fragment.setModel(this.oI18nModel, "i18n");
	        this.oRouter.attachRouteMatched(jQuery.proxy(function (e) {
	            if (e.getParameter("name") === "subDetail") {
	                // Customizing
	                this._onGetTransactionType();
	                // var sProcessType =  this.HeaderObject.ProcessType;
	                // if (sProcessType === "Z007" || sProcessType === "Z008") {
	                //     this.byId("productBasketEdit").setVisible(false);
	                // } else {
	                //     this.byId("productBasketEdit").setVisible(true);
	                // }
	                sap.ca.ui.utils.busydialog.requireBusyDialog();
	                this.sPath = e.getParameter("arguments").contextPath;
	                this.bindEditView(false);
	                sap.ca.ui.utils.busydialog.releaseBusyDialog();
	            } else if (e.getParameter("name") === "edit") {
	                // Customizing
	                this._onGetTransactionType();
	                // sProcessType =  this.HeaderObject.ProcessType;
	                // if (sProcessType === "Z007" || sProcessType === "Z008") {
	                //     this.byId("productBasketEdit").setVisible(false);
	                // } else {
	                //     this.byId("productBasketEdit").setVisible(true);
	                // }
	                this.fullScreenMode = true;
	                this.sPath = e.getParameter("arguments").contextPath;
	                sap.ca.ui.utils.busydialog.requireBusyDialog();
	                this.bindEditView(false);
	                sap.ca.ui.utils.busydialog.releaseBusyDialog();
	            }
	        }, this));
	        this.byId("datePickerEndDate").attachBrowserEvent("keydown", jQuery.proxy(function (e) {
	            this.setValueState(sap.ui.core.ValueState.None);
	        }, this.byId("datePickerEndDate")));
	        this.byId("datePickerStartDate").attachBrowserEvent("keydown", jQuery.proxy(function (e) {
	            this.setValueState(sap.ui.core.ValueState.None);
	        }, this.byId("datePickerStartDate")));
	        this.byId("datePickerEndDate").attachChange(null, function (e) {
	            cus.crm.opportunity.util.Util.setDatePicker(this.getView(), "datePickerEndDate", "datePickerStartDate", this.oDateFormatter);
	        }, this);
	        this.byId("datePickerStartDate").attachChange(null, function (e) {
	            cus.crm.opportunity.util.Util.setDatePicker(this.getView(), "datePickerStartDate", "datePickerEndDate", this.oDateFormatter);
	        }, this);
	        this.byId("productBasketEdit").setModel(new sap.ui.model.json.JSONModel());
	        this.byId("currency").setModel(new sap.ui.model.json.JSONModel());
	        var t = this.getView();
	        this.getView().byId("stages").attachChange(null, function (e) {
	            if (t.byId("userStatus").getSelectedKey() != t.getController().WinStatusCode && t.byId("userStatus").getSelectedKey() != t.getController().LostStatusCode) {
	                var d = this.getModel("json").getData();
	                var n = e.getParameter("newValue");
	                var l = d.SalesStages.length;
	                for (var i = 0; i < l; i++) {
	                    if (d.SalesStages[i].SalesStageCode === e.getParameter("selectedItem").getKey()) {
	                        t.byId("chanceOfSuccess").setValue(Number(d.SalesStages[i].ChanceOfSuccess));
	                        t.byId("wtVol").setText(cus.crm.opportunity.util.Formatter.weightedvolume(t.byId("expectedSalesVolume").getValue(), t.byId("chanceOfSuccess").getValue(), t.byId("currency").getValue()));
	                        break;
	                    }
	                }
	            }
	        });
	        this.getView().byId("userStatus").attachChange(null, function (e) {
	            var n = e.getParameter("newValue");
	            if (t.getController().WinStatusCode === e.getParameter("selectedItem").getKey()) {
	                t.byId("chanceOfSuccess").setValue(100);
	                t.byId("wtVol").setText(cus.crm.opportunity.util.Formatter.weightedvolume(t.byId("expectedSalesVolume").getValue(), t.byId("chanceOfSuccess").getValue(), t.byId("currency").getValue()));
	            }
	            if (t.getController().LostStatusCode === e.getParameter("selectedItem").getKey()) {
	                t.byId("chanceOfSuccess").setValue(0);
	                t.byId("wtVol").setText(cus.crm.opportunity.util.Formatter.weightedvolume(t.byId("expectedSalesVolume").getValue(), t.byId("chanceOfSuccess").getValue(), t.byId("currency").getValue()));
	            }
	        });
	        this.sBackendVersion = cus.crm.opportunity.util.schema._getServiceSchemaVersion(this.oModel, "Opportunity");
	        this.oVersioningModel = new sap.ui.model.json.JSONModel({ BackendSchemaVersion: this.sBackendVersion });
	        this.oVersioningModel.updateBindings();
	        this.getView().setModel(this.oVersioningModel, "versioning");
	    },
	    _onGetTransactionType : function () {
	        var oThis = this;
	        var oModel = this.getView().getModel();
	        var sHash = window.location.hash;
	        var sPath = sHash.substr(sHash.lastIndexOf("/"));
	        oModel.read(sPath,{
	            success : function (resp) {
	                var sProcessType = resp.ProcessType;
	                if (sProcessType === "Z007" || sProcessType === "Z008") {
	                    oThis.byId("productBasketEdit").setVisible(false);
	                    oThis.byId("mainContactLabel_S4").setVisible(false);
	                    oThis.byId("inputMainContact").setVisible(false);
	                } else {
	                    oThis.byId("productBasketEdit").setVisible(true);
	                    oThis.byId("mainContactLabel_S4").setVisible(true);
	                    oThis.byId("inputMainContact").setVisible(true);
	                }
	            },
	            error : function (err) {
	                // TODO: Error mesaji basilacak
	                oThis._onGetTransactionType();
	            }
	        });
	    },
	//    onBeforeRendering: function () {
	//        this.getView().getModel("controllers").getData().s4Controller = this;
	//        this.s3Controller = this.getView().getModel("controllers").getData().s3Controller;
	//        if (this.s3Controller) {
	//            this.s3Controller.s4Controller = this;
	//            this.s3Controller_contact = this.s3Controller;
	//        }
	//        var s = this.getView().getModel("controllers").getData().s2Controller;
	//        if (s) {
	//            s.s4Controller = this;
	//            this.s2Controller = s;
	//        }
	//    },
	//    bindBatchResponses: function (r) {
	//    },
	//    _cloneProducts: function (p) {
	//        var P;
	//        if (p.Products) {
	//            P = JSON.parse(JSON.stringify(p));
	//            for (var i = 0; i < P.Products.length; i++) {
	//                if (P.Products[i].ProductGuid === null)
	//                    P.Products[i].Backend = "CATEGORY";
	//                else
	//                    P.Products[i].Backend = "X";
	//                P.Products[i].OldValue = P.Products[i].Quantity;
	//                this.BackendProducts[P.Products[i].ItemGuid] = JSON.parse(JSON.stringify(P.Products[i]));
	//            }
	//        } else {
	//            P = { Products: [] };
	//        }
	//        return P;
	//    },
	//    bindHeaderFormsAndProducts: function (d) {
	//        this.HeaderObject = d;
	//        this.headerGuid = d.Guid;
	//        ;
	//        this.userStatusCode = d.UserStatusCode;
	//        this.HeaderObject = d;
	//        this.headerGuid = d.Guid;
	//        ;
	//        this.userStatusCode = d.UserStatusCode;
	//        this.UserStatuses = d.UserStatuses;
	//        this.byId("description").setValue(d.Description);
	//        this.byId("account").setText(d.ProspectName);
	//        if (d.ProspectName === "")
	//            this.byId("account").setText(d.ProspectNumber);
	//        this.byId("inputEmpResponsible").setValue(d.EmployeeResponsibleName);
	//        this.byId("expectedSalesVolume").setValue(cus.crm.opportunity.util.Formatter.volumeFormatter(d.ExpectedSalesVolume, d.CurrencyCode));
	//        this.FormatvolumeValue = d.ExpectedSalesVolume.toString();
	//        this.byId("opportunityTotalNetValue_Text_S4").setText(cus.crm.opportunity.util.Formatter.totalexpectednetValue(d.TotalExpectedNetValue, d.CurrencyCode));
	//        this.byId("id").setText(d.Id);
	//        this.byId("opportunityType").setText(d.ProcessTypeDescriptionLong);
	//        this.byId("chanceOfSuccess").setValue(cus.crm.opportunity.util.Formatter.texttonumber(d.ChanceOfSuccess));
	//        this.byId("datePickerStartDate").setValue(this.formatDate(d.StartDate));
	//        this.byId("datePickerEndDate").setValue(this.formatDate(d.ClosingDate));
	//        this.byId("datePickerStartDate").setValueState(sap.ui.core.ValueState.None);
	//        this.byId("datePickerEndDate").setValueState(sap.ui.core.ValueState.None);
	//        this.byId("datePickerStartDate").fireChange(this.byId("datePickerStartDate"));
	//        this.byId("datePickerEndDate").fireChange(this.byId("datePickerEndDate"));
	//        this.byId("currency").setValue(d.CurrencyCode);
	//        this.byId("switch").setState(d.ForecastRelevance);
	//        this.byId("wtVol").setText(cus.crm.opportunity.util.Formatter.weightedvolume(d.ExpectedSalesVolume, Number(d.ChanceOfSuccess), d.CurrencyCode));
	//        this.byId("inputMainContact").setValue(d.MainContactName);
	//        this.oSelectedContact.contactID = d.MainContactId;
	//        this.oSelectedContact.fullName = d.MainContactName;
	//        if (parseFloat(this.oVersioningModel.getData().BackendSchemaVersion) >= 2) {
	//            this.byId("inputEmpResponsible").setValue(d.EmployeeResponsibleName);
	//            this.oSelectedAccount.accountID = d.ProspectNumber;
	//            this.oSelectedEmployee.employeeID = d.EmployeeResponsibleNumber;
	//        }
	//        this.oSelectedEmployee.fullName = d.EmployeeResponsibleName;
	//        this.OldcosValue = this.byId("chanceOfSuccess").getValue();
	//        this.OldvolumeValue = this.byId("expectedSalesVolume").getValue();
	//        var j = this.getView().getModel("json");
	//        j.oData.UserStatuses = d.UserStatuses;
	//        j.oData.Priorities = d.Priorities;
	//        j.oData.SalesStages = d.SalesStages;
	//        j.oData.Products = d.Products;
	//        j.updateBindings();
	//        this.byId("userStatus").setSelectedKey(d.UserStatusCode);
	//        this.byId("priority").setSelectedKey(d.PriorityCode);
	//        this.byId("stages").setSelectedKey(d.SalesStageCode);
	//        if (this.byId("userStatus").getSelectedKey() === this.WinStatusCode || this.byId("userStatus").getSelectedKey() === this.LostStatusCode) {
	//            this.byId("ProductButton").setVisible(false);
	//        } else
	//            this.byId("ProductButton").setVisible(true);
	//    },
	//    _filterDropDownsByProcessType: function (d, p) {
	//        var s = d.UserStatuses;
	//        var a = d.UserStatuses.length;
	//        for (var i = 0; i < a; i++) {
	//            this.StatusProfile = d.UserStatuses[i].StatusProfile;
	//            if (d.UserStatuses[i].BusinessTransaction === "WINN") {
	//                this.WinStatusCode = d.UserStatuses[i].UserStatusCode;
	//            }
	//            if (d.UserStatuses[i].BusinessTransaction === "LOST") {
	//                this.LostStatusCode = d.UserStatuses[i].UserStatusCode;
	//            }
	//        }
	//        var e = {
	//            LanguageCode: "",
	//            PriorityCode: "",
	//            PriorityText: ""
	//        };
	//        d.Priorities.splice(0, 0, e);
	//        var S = [];
	//        var l = d.SalesStages.length;
	//        for (var i = 0; i < l; i++) {
	//            if (d.SalesStages[i].ProcessType === p) {
	//                S.push(d.SalesStages[i]);
	//            }
	//        }
	//        var E = {
	//            ChanceOfSuccess: "",
	//            LanguageCode: "",
	//            ProcessType: p,
	//            SalesStageCode: "",
	//            SalesStageDescription: "",
	//            SalesStageOrder: ""
	//        };
	//        S.splice(0, 0, E);
	//        d.UserStatuses = s;
	//        d.SalesStages = S;
	//    },
	//    handleBatchRead: function (r) {
	//        var d = {};
	//        var D = {};
	//        var f = false;
	//        var e;
	//        var a;
	//        this.bAppLaunched = false;
	//        if (r.__batchResponses[0].statusCode === "200") {
	//            D.SalesStages = r.__batchResponses[0].data.results;
	//        } else {
	//            f = true;
	//            e = r.__batchResponses[0].statusText;
	//            a = JSON.parse(r.__batchResponses[0].response.body).error.message.value + "\n";
	//        }
	//        if (r.__batchResponses[1].statusCode === "200") {
	//            D.Priorities = r.__batchResponses[1].data.results;
	//        } else {
	//            f = true;
	//            e = r.__batchResponses[1].statusText;
	//            a = JSON.parse(r.__batchResponses[1].response.body).error.message.value + "\n";
	//        }
	//        if (r.__batchResponses[2].statusCode === "200") {
	//            D.UserStatuses = r.__batchResponses[2].data.results;
	//        } else {
	//            f = true;
	//            e = r.__batchResponses[2].statusText;
	//            a = JSON.parse(r.__batchResponses[2].response.body).error.message.value + "\n";
	//        }
	//        if (r.__batchResponses[3].statusCode === "200") {
	//            this.Currencies = r.__batchResponses[3].data.results;
	//            this.byId("currency").setModel(new sap.ui.model.json.JSONModel({ Currencies: this.Currencies }), "json");
	//        } else {
	//            f = true;
	//            e = r.__batchResponses[3].statusText;
	//            a = JSON.parse(r.__batchResponses[3].response.body).error.message.value + "\n";
	//        }
	//        if (r.__batchResponses[4].hasOwnProperty("data")) {
	//            d = r.__batchResponses[4].data;
	//            var p = d.Products;
	//            delete d.Products;
	//            d.Products = this._cloneProducts({ Products: p.results }).Products;
	//        } else {
	//            f = true;
	//            e = r.__batchResponses[4].statusText;
	//            a = JSON.parse(r.__batchResponses[4].response.body).error.message.value + "\n";
	//        }
	//        if (f) {
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: e,
	//                details: a
	//            }, function (R) {
	//            });
	//            return;
	//        }
	//        this.oModel.read(this.sPath, null, ["$expand=Statuses"], true, jQuery.proxy(function (o, b) {
	//            D.UserStatuses = o.Statuses.results;
	//            this._filterDropDownsByProcessType(D, d.ProcessType);
	//            d.UserStatuses = D.UserStatuses;
	//            d.Priorities = D.Priorities;
	//            d.SalesStages = D.SalesStages;
	//            this.bindHeaderFormsAndProducts(d);
	//        }, this), jQuery.proxy(function (E) {
	//            this.handleErrors(E);
	//        }, this));
	//    },
	//    bindEditView: function (r) {
	//        var s;
	//        s = this.getView().getModel("controllers").getData().s3Controller;
	//        if (s === null || r) {
	//            this.deleteBuffer = [];
	//            this.BackendProducts = {};
	//            if (s === null && parseFloat(this.sBackendVersion) >= 4 && !r) {
	//                cus.crm.opportunity.util.Util.refreshHeaderETag(this.sPath, this);
	//            }
	//            this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("SalesStages", "GET")]);
	//            this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("Priorities", "GET")]);
	//            this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("UserStatuses", "GET")]);
	//            this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("Currencies", "GET")]);
	//            if (parseFloat(this.sBackendVersion) < 4) {
	//                this.byId("opportunityTotalNetValue_Label_S4").setVisible(false);
	//                this.byId("opportunityTotalNetValue_Text_S4").setVisible(false);
	//            }
	//            this.oModel.addBatchReadOperations([this.oModel.createBatchOperation(this.sPath + "?$expand=Products,ChangeDocs,Competitors", "GET")]);
	//            this.oModel.submitBatch(jQuery.proxy(this.handleBatchRead, this), function (e) {
	//            }, true);
	//            return;
	//        }
	//        this.deleteBuffer = [];
	//        this.BackendProducts = {};
	//        this._saveETag(s.sETag);
	//        this.controller = s;
	//        var d = s.byId("info").getModel("json").getData();
	//        var D = {
	//            Priorities: JSON.parse(JSON.stringify(s.Priorities)),
	//            SalesStages: JSON.parse(JSON.stringify(s.SalesStages))
	//        };
	//        var p = s.byId("Product_Tab").getModel("json").getData();
	//        if (p && p.hasOwnProperty("Products")) {
	//            var P;
	//            if (p.Products) {
	//                P = JSON.parse(JSON.stringify(p));
	//                for (var i = 0; i < P.Products.length; i++) {
	//                    if (P.Products[i].ProductGuid === null)
	//                        P.Products[i].Backend = "CATEGORY";
	//                    else
	//                        P.Products[i].Backend = "X";
	//                    P.Products[i].OldValue = P.Products[i].Quantity;
	//                    this.BackendProducts[P.Products[i].ItemGuid] = JSON.parse(JSON.stringify(P.Products[i]));
	//                }
	//            } else {
	//                P = { Products: [] };
	//            }
	//            d.Products = P.Products;
	//        }
	//        cus.crm.opportunity.util.Util.refreshHeaderETag(this.sPath, this);
	//        this.oModel.read(this.sPath, null, ["$expand=Statuses"], true, jQuery.proxy(function (o, b) {
	//            D.UserStatuses = o.Statuses.results;
	//            this._filterDropDownsByProcessType(D, d.ProcessType);
	//            d.UserStatuses = D.UserStatuses;
	//            d.Priorities = D.Priorities;
	//            d.SalesStages = D.SalesStages;
	//            this.bindHeaderFormsAndProducts(d);
	//            this.byId("currency").setModel(new sap.ui.model.json.JSONModel({ Currencies: this.Currencies }), "json");
	//            this.Currencies = s.Currencies;
	//            this.ContactCollection = s.ContactCollection;
	//            this.EmployeeCollection = s.EmployeeCollection;
	//        }, this), jQuery.proxy(function (e) {
	//            this.handleErrors(e);
	//        }, this));
	//        var a = this.getDetailController();
	//        if (this.extHookBindAdditionalFields) {
	//            this.extHookBindAdditionalFields(a);
	//        }
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
	//        this.oModel.clearBatch();
	//    },
	//    datalossDismissed: function (r) {
	//        if (r.isConfirmed) {
	//            this.deleteBuffer = [];
	//            this.bCancel = true;
	//            var c = "Opportunities(guid'" + this.headerGuid + "')";
	//            this._navToDetailPage(c);
	//        }
	//    },
	//    chanceOfSuccessChanged: function (e) {
	//        var n = e.getParameter("newValue");
	//        var p = /[^0-9.]/;
	//        if (p.test(n) === false) {
	//            if (n.split(".").length > 2 || n > 100) {
	//                e.getSource().setValue(this.OldcosValue);
	//            } else {
	//                this.OldcosValue = n;
	//                e.getSource().setValueState(sap.ui.core.ValueState.None);
	//            }
	//        } else {
	//            e.getSource().setValue(this.OldcosValue);
	//        }
	//    },
	    volumeChanged: function (e) {
	        var n = e.getParameter("newValue");
	        // Customizing
	        if (n === "") {
	        	n = "0";
	        }
	        var p = /[^0-9.,]/;
	        var c = n.charAt(0);
	        if (p.test(n) === false) {
	            this.OldvolumeValue = n;
	            var N = sap.ui.core.format.NumberFormat.getFloatInstance({
	                maxFractionDigints: 2,
	                groupingEnabled: false
	            });
	            this.FormatvolumeValue = N.parse(n);
	        } else if (p.test(c) === true) {
	            e.getSource().setValue("");
	        } else {
	            e.getSource().setValue(this.OldvolumeValue);
	        }
	    },
	//    descriptionChanged: function (e) {
	//        var d = this.byId("description");
	//        if (e.getParameter("newValue").length > 40) {
	//            d.setValueState(sap.ui.core.ValueState.Error);
	//        } else
	//            d.setValueState(sap.ui.core.ValueState.None);
	//    },
	//    pageNeedsUpdate: function () {
	//        this.oModel.clearBatch();
	//        var n = parseFloat(this.sBackendVersion);
	//        var e = null;
	//        if (n >= 4) {
	//            e = { sETag: null };
	//        }
	//        if (this.WinStatusCode === this.byId("userStatus").getSelectedKey()) {
	//            this.getView().byId("chanceOfSuccess").setValue(100);
	//        }
	//        if (this.LostStatusCode === this.byId("userStatus").getSelectedKey()) {
	//            this.getView().byId("chanceOfSuccess").setValue(0);
	//        }
	//        this.requestNumber = 0;
	//        this.bBasketUpdate = false;
	//        this.changeSetMapping = {
	//            HEADER: "",
	//            CONTACT: "",
	//            EMPLOYEE: "",
	//            STATUS: "",
	//            BASKET: ""
	//        };
	//        var c = [];
	//        var h = this.headerGuid;
	//        var b = this.byId("productBasketEdit").getModel("json").getData();
	//        var m = this.oModel;
	//        var t = this;
	//        c = [];
	//        this.changeSetMapping.CUSTOM_UPDATE_REQUEST = "";
	//        this.requestNumber = 0;
	//        if (this.extHookCheckDeltaAndFrameRequests) {
	//            this.extHookCheckDeltaAndFrameRequests(c);
	//        }
	//        var a = {
	//            Guid: h,
	//            Description: this.byId("description").getValue(),
	//            ExpectedSalesVolume: this.FormatvolumeValue.toString(),
	//            CurrencyCode: this.byId("currency").getValue(),
	//            ChanceOfSuccess: this.byId("chanceOfSuccess").getValue(),
	//            StartDate: this.getDateTimeStampFromDatePicker(this.byId("datePickerStartDate")),
	//            ClosingDate: this.getDateTimeStampFromDatePicker(this.byId("datePickerEndDate")),
	//            SalesStageCode: this.byId("stages").getSelectedKey(),
	//            UserStatusCode: this.byId("userStatus").getSelectedKey(),
	//            PriorityCode: this.byId("priority").getSelectedKey(),
	//            ForecastRelevance: this.byId("switch").getState()
	//        };
	//        var d = {};
	//        var k;
	//        var f = false;
	//        for (k in a) {
	//            switch (k) {
	//            case "Guid":
	//                d[k] = a[k];
	//                break;
	//            case "StartDate":
	//            case "ClosingDate":
	//                if (!this._areDatesSame(this.HeaderObject[k], a[k])) {
	//                    d[k] = a[k];
	//                    f = true;
	//                }
	//                break;
	//            case "ChanceOfSuccess":
	//                if (Number(this.HeaderObject[k]) !== Number(a[k])) {
	//                    d[k] = a[k];
	//                    f = true;
	//                }
	//                break;
	//            case "ExpectedSalesVolume":
	//                if (this.HeaderObject[k] !== a[k]) {
	//                    d[k] = a[k];
	//                    if (!d.hasOwnProperty("CurrencyCode")) {
	//                        d["CurrencyCode"] = a["CurrencyCode"];
	//                    }
	//                    f = true;
	//                }
	//                break;
	//            default:
	//                if (this.HeaderObject[k] !== a[k]) {
	//                    d[k] = a[k];
	//                    f = true;
	//                }
	//            }
	//        }
	//        if (this._hasUserStatusChanged() || this._hasMainContactChanged() || this._hasEmployeeChanged()) {
	//            f = true;
	//        }
	//        if (this.extHookAddCustomHeaderFields) {
	//            var g = this.extHookAddCustomHeaderFields(d);
	//            f = f || g;
	//        }
	//        if (f === true) {
	//            this.changeSetMapping.HEADER = this.requestNumber;
	//            this.requestNumber++;
	//            c.push(m.createBatchOperation("Opportunities(guid'" + h + "')", "MERGE", d, e));
	//        } else
	//            this.changeSetMapping.HEADER = "";
	//        if (this._hasUserStatusChanged()) {
	//            this.changeSetMapping.STATUS = this.requestNumber;
	//            this.requestNumber++;
	//            var d;
	//            var s;
	//            var j, l;
	//            s = this.StatusProfile;
	//            d = {
	//                HeaderGuid: h,
	//                StatusProfile: s,
	//                UserStatusCode: this.byId("userStatus").getSelectedKey()
	//            };
	//            c.push(m.createBatchOperation("OpportunityStatuses(StatusProfile='" + s + "',UserStatusCode='" + this.byId("userStatus").getSelectedKey() + "',HeaderGuid=guid'" + h + "')", "MERGE", d, e));
	//        } else
	//            this.changeSetMapping.STATUS = "";
	//        if (!this._isContactFilledProperly()) {
	//            return;
	//        }
	//        if (this._hasMainContactChanged()) {
	//            var u = "";
	//            var p = {};
	//            if (this.byId("inputMainContact").getValue() === "") {
	//                u = "OpportunitySalesTeamSet(PartnerNumber='" + "" + "',PartnerFunctionCode='00000015',HeaderGuid=guid'" + this.headerGuid + "')";
	//                p = {
	//                    HeaderGuid: this.headerGuid,
	//                    PartnerFunctionCode: "00000015",
	//                    PartnerNumber: "",
	//                    MainPartner: true
	//                };
	//            } else {
	//                u = "OpportunitySalesTeamSet(PartnerNumber='" + this.oSelectedContact.contactID + "',PartnerFunctionCode='00000015',HeaderGuid=guid'" + this.headerGuid + "')";
	//                p = {
	//                    HeaderGuid: this.headerGuid,
	//                    PartnerFunctionCode: "00000015",
	//                    PartnerNumber: this.oSelectedContact.contactID,
	//                    MainPartner: true
	//                };
	//            }
	//            this.changeSetMapping.CONTACT = this.requestNumber;
	//            this.requestNumber++;
	//            c.push(m.createBatchOperation(u, "MERGE", p, e));
	//        } else
	//            this.changeSetMapping.CONTACT = "";
	//        if (parseFloat(this.sBackendVersion) >= 2) {
	//            if (this._hasEmployeeChanged()) {
	//                var u;
	//                var p = {};
	//                if (this.byId("inputEmpResponsible").getValue() === "") {
	//                    u = "OpportunitySalesTeamSet(PartnerNumber='" + "',PartnerFunctionCode='00000014',HeaderGuid=guid'" + this.headerGuid + "')";
	//                    p = {
	//                        HeaderGuid: this.headerGuid,
	//                        PartnerFunctionCode: "00000014",
	//                        PartnerNumber: "",
	//                        MainPartner: true
	//                    };
	//                } else {
	//                    u = "OpportunitySalesTeamSet(PartnerNumber='" + this.oSelectedEmployee.employeeID + "',PartnerFunctionCode='00000014',HeaderGuid=guid'" + this.headerGuid + "')";
	//                    p = {
	//                        HeaderGuid: this.headerGuid,
	//                        PartnerFunctionCode: "00000014",
	//                        PartnerNumber: this.oSelectedEmployee.employeeID,
	//                        MainPartner: true
	//                    };
	//                }
	//                this.changeSetMapping.EMPLOYEE = this.requestNumber;
	//                this.requestNumber++;
	//                c.push(m.createBatchOperation(u, "MERGE", p, e));
	//            } else
	//                this.changeSetMapping.EMPLOYEE = "";
	//        }
	//        var i;
	//        for (i = 0; i < this.deleteBuffer.length; i++) {
	//            e = null;
	//            if (parseFloat(this.sBackendVersion) >= 4) {
	//                e = { sETag: this.deleteBuffer[i].__metadata.etag };
	//            }
	//            this.bBasketUpdate = true;
	//            var d = {
	//                HeaderGuid: this.deleteBuffer[i].HeaderGuid,
	//                ItemGuid: this.deleteBuffer[i].ItemGuid,
	//                ProductGuid: this.deleteBuffer[i].ProductGuid,
	//                ProductId: this.deleteBuffer[i].ProductId,
	//                ProcessingMode: "D"
	//            };
	//            if (this.extHookAddCustomColumnsForProductDelete) {
	//                this.extHookAddCustomColumnsForProductDelete(d, this.deleteBuffer[i]);
	//            }
	//            c.push(m.createBatchOperation("OpportunityProducts(HeaderGuid=guid'" + this.deleteBuffer[i].HeaderGuid + "',ItemGuid=guid'" + this.deleteBuffer[i].ItemGuid + "')", "MERGE", d, e));
	//        }
	//        var b = this.byId("productBasketEdit").getModel("json").getData();
	//        var o = this.byId("productBasketEdit").getItems();
	//        var i, q = 0, j;
	//        if (b.Products)
	//            q = b.Products.length;
	//        for (i = 0; i < q; i++) {
	//            if (b.Products[i].Backend === "X") {
	//                var O = this.BackendProducts[b.Products[i].ItemGuid];
	//                var N = b.Products[i];
	//                var v = false;
	//                var e = null;
	//                if (parseFloat(this.sBackendVersion) >= 4) {
	//                    e = { sETag: b.Products[i].__metadata.etag };
	//                }
	//                if (this.extHookCheckDeltaOnProductEntry) {
	//                    v = this.extHookCheckDeltaOnProductEntry(O, N);
	//                }
	//                var d = {
	//                    HeaderGuid: b.Products[i].HeaderGuid,
	//                    ItemGuid: b.Products[i].ItemGuid,
	//                    ProductGuid: b.Products[i].ProductGuid,
	//                    ProcessingMode: "B"
	//                };
	//                if (O.Quantity !== N.Quantity) {
	//                    this.bBasketUpdate = true;
	//                    v = true;
	//                    d["Quantity"] = N.Quantity;
	//                }
	//                if (O.TotalExpectedNetValue !== N.TotalExpectedNetValue) {
	//                    this.bBasketUpdate = true;
	//                    v = true;
	//                    d["TotalExpectedNetValue"] = N.TotalExpectedNetValue;
	//                }
	//                if (this.extHookAddCustomColumnsForProductModify) {
	//                    this.extHookAddCustomColumnsForProductModify(d, N);
	//                }
	//                if (v == true) {
	//                    c.push(m.createBatchOperation("OpportunityProducts(HeaderGuid=guid'" + b.Products[i].HeaderGuid + "',ItemGuid=guid'" + b.Products[i].ItemGuid + "')", "MERGE", d, e));
	//                }
	//            } else if (b.Products[i].Backend === "") {
	//                this.bBasketUpdate = true;
	//                var d = {
	//                    HeaderGuid: b.Products[i].HeaderGuid,
	//                    ItemGuid: "00000000-0000-0000-0000-000000000001",
	//                    ProductGuid: b.Products[i].ProductGuid,
	//                    ProductId: b.Products[i].ProductId,
	//                    Quantity: b.Products[i].Quantity === "" ? "0" : b.Products[i].Quantity,
	//                    TotalExpectedNetValue: b.Products[i].TotalExpectedNetValue === "" ? "0" : b.Products[i].TotalExpectedNetValue,
	//                    Unit: b.Products[i].Unit,
	//                    ProcessingMode: "A"
	//                };
	//                if (this.extHookAddCustomColumnsForProductCreate) {
	//                    this.extHookAddCustomColumnsForProductCreate(d, b.Products[i]);
	//                }
	//                c.push(m.createBatchOperation("OpportunityProducts", "POST", d, null));
	//            }
	//        }
	//        if (this.bBasketUpdate === true) {
	//            this.changeSetMapping.BASKET = this.requestNumber;
	//            this.requestNumber++;
	//        } else
	//            this.changeSetMapping.BASKET = "";
	//        if (c.length > 0) {
	//            m.addBatchChangeOperations(c);
	//            return true;
	//        }
	//        return false;
	//    },
	    onEditSave: function () {
	        var m = this.oModel;
	        m.setRefreshAfterChange(false);
	        if (!this.oApplicationFacade.getApplicationModel("Back")) {
	            cus.crm.opportunity.util.Util.initBackModel(this);
	        }
	        if (this.validateDates() === false)
	            return;
	        if (this.validateEditPage() === false) {
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
	                onClose: jQuery.proxy(function (a) {
	                    if (a == "Continue" || a === "Devam") {
	                        var r = {};
	                        r.isConfirmed = true;
	                        this.dataConfirm(r);
	                    } else if (a == "CANCEL") {
	                    }
	                }, this)
	            });
	        } else
	            this.dataConfirm({ isConfirmed: true });
	    },
	//    dataConfirm: function (r) {
	//        if (r.isConfirmed) {
	//            var m = this.oModel;
	//            if (this._checkDataLoss()) {
	//                var t = this;
	//                this.pageNeedsUpdate();
	//                if (this.requestNumber > 0) {
	//                    this.setBtnEnabled("saveButton", false);
	//                    sap.ca.ui.utils.busydialog.requireBusyDialog();
	//                    var x = m.submitBatch(function (R) {
	//                        t.handleBatchResponses(R);
	//                    }, function (e) {
	//                        sap.ca.ui.utils.busydialog.releaseBusyDialog();
	//                        t.setBtnEnabled("saveButton", true);
	//                        sap.ca.ui.message.showMessageBox({
	//                            type: sap.ca.ui.message.Type.ERROR,
	//                            message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SAVE_FAILED")
	//                        });
	//                    }, true);
	//                }
	//            } else {
	//                this.datalossDismissed({ isConfirmed: true });
	//                this.oModel.clearBatch();
	//            }
	//        }
	//    },
	//    handleBatchResponses: function (r) {
	//        var s = [];
	//        var a;
	//        var h = false;
	//        var S = false;
	//        var p = false;
	//        var f = false;
	//        var b = false;
	//        var e = "";
	//        this.bEmployeeUpdateSuccess = false;
	//        var l = r.__batchResponses.length;
	//        sap.ca.ui.utils.busydialog.releaseBusyDialog();
	//        if (r.__batchResponses[0].hasOwnProperty("__changeResponses")) {
	//            if (this.extHookHandleResponsesForCustomUpdates) {
	//                this.extHookHandleResponsesForCustomUpdates(r);
	//            }
	//            if (this.changeSetMapping.HEADER !== "") {
	//                a = r.__batchResponses[0].__changeResponses[this.changeSetMapping.HEADER];
	//                if (parseInt(a.statusCode) >= 400) {
	//                    s.push(a.statusText);
	//                    f = true;
	//                    e += JSON.parse(a.response.body).error.message.value + "\n";
	//                    if (parseInt(a.statusCode) === 412) {
	//                        b = true;
	//                    }
	//                } else {
	//                    this.HeaderObject.Description = this.byId("description").getValue();
	//                    this.HeaderObject.StartDate = this.byId("datePickerStartDate").getDateValue();
	//                    this.HeaderObject.ClosingDate = this.byId("datePickerEndDate").getDateValue();
	//                    this.HeaderObject.SalesStageDescription = this.byId("stages").getSelectedItem().getText();
	//                    this.HeaderObject.SalesStageCode = this.byId("stages").getSelectedKey();
	//                    this.HeaderObject.PriorityText = this.byId("priority").getSelectedItem().getText();
	//                    this.HeaderObject.PriorityCode = this.byId("priority").getSelectedKey();
	//                    this.HeaderObject.ExpectedSalesVolume = this.byId("expectedSalesVolume").getValue();
	//                    this.HeaderObject.ChanceOfSuccess = this.byId("chanceOfSuccess").getValue();
	//                    this.HeaderObject.CurrencyCode = this.byId("currency").getValue();
	//                    this.HeaderObject.ForecastRelevance = this.byId("switch").getState();
	//                    h = true;
	//                    p = true;
	//                }
	//            }
	//            if (this.changeSetMapping.STATUS !== "") {
	//                a = r.__batchResponses[0].__changeResponses[this.changeSetMapping.STATUS];
	//                if (parseInt(a.statusCode) < 400) {
	//                    this.HeaderObject.UserStatusCode = this.byId("userStatus").getSelectedKey();
	//                    this.HeaderObject.UserStatusText = this.byId("userStatus").getSelectedItem().getText();
	//                    S = true;
	//                    p = true;
	//                } else {
	//                    s.push(a.statusText);
	//                    f = true;
	//                    e += JSON.parse(a.response.body).error.message.value + "\n";
	//                    if (parseInt(a.statusCode) === 412) {
	//                        b = true;
	//                    }
	//                }
	//            }
	//            if (this.changeSetMapping.CONTACT !== "") {
	//                a = r.__batchResponses[0].__changeResponses[this.changeSetMapping.CONTACT];
	//                if (parseInt(a.statusCode) >= 400) {
	//                    s.push(a.statusText);
	//                    f = true;
	//                    e += JSON.parse(a.response.body).error.message.value + "\n";
	//                    if (parseInt(a.statusCode) === 412) {
	//                        b = true;
	//                    }
	//                } else {
	//                    p = true;
	//                    this.HeaderObject.MainContactId = this.oSelectedContact.contactID;
	//                    this.HeaderObject.MainContactName = this.oSelectedContact.fullName;
	//                }
	//            }
	//            if (parseFloat(this.oVersioningModel.getData().BackendSchemaVersion) >= 2) {
	//                if (this.changeSetMapping.EMPLOYEE !== "") {
	//                    a = r.__batchResponses[0].__changeResponses[this.changeSetMapping.EMPLOYEE];
	//                    if (parseInt(a.statusCode) >= 400) {
	//                        s.push(a.statusText);
	//                        f = true;
	//                        e += JSON.parse(a.response.body).error.message.value + "\n";
	//                        this.oSelectedEmployee.employeeID = this.HeaderObject.EmployeeResponsibleNumber;
	//                        this.oSelectedEmployee.fullName = this.HeaderObject.EmployeeResponsibleName;
	//                        if (parseInt(a.statusCode) === 412) {
	//                            b = true;
	//                        }
	//                    } else {
	//                        p = true;
	//                        this.HeaderObject.EmployeeResponsibleNumber = this.oSelectedEmployee.employeeID;
	//                        this.HeaderObject.EmployeeResponsibleName = this.oSelectedEmployee.fullName;
	//                        this.byId("inputMainContact").setValue(this.HeaderObject.EmployeeResponsibleName);
	//                        this.bEmployeeUpdateSuccess = true;
	//                    }
	//                }
	//            }
	//            if (this.changeSetMapping.BASKET !== "") {
	//                var i;
	//                var l = r.__batchResponses[0].__changeResponses.length;
	//                for (i = this.changeSetMapping.BASKET; i < l; i++) {
	//                    a = r.__batchResponses[0].__changeResponses[i];
	//                    if (parseInt(a.statusCode) >= 400) {
	//                        s.push(a.statusText);
	//                        f = true;
	//                        e += JSON.parse(a.response.body).error.message.value + "\n";
	//                        if (parseInt(a.statusCode) === 412) {
	//                            b = true;
	//                        }
	//                    } else
	//                        p = true;
	//                }
	//            }
	//            if (b === true) {
	//                sap.ca.ui.message.showMessageBox({
	//                    type: sap.ca.ui.message.Type.ERROR,
	//                    message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("MSG_CONFLICTING_DATA")
	//                }, jQuery.proxy(function () {
	//                    this._refreshOpportunity();
	//                }, this));
	//                return;
	//            }
	//            if (p && f) {
	//                sap.ca.ui.message.showMessageBox({
	//                    type: sap.ca.ui.message.Type.ERROR,
	//                    message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("PARTIAL_SAVE"),
	//                    details: e
	//                }, function () {
	//                });
	//                return;
	//            }
	//            if (!p && f) {
	//                sap.ca.ui.message.showMessageBox({
	//                    type: sap.ca.ui.message.Type.ERROR,
	//                    message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SAVE_FAILED"),
	//                    details: e
	//                }, function () {
	//                });
	//                return;
	//            }
	//        } else {
	//            if (this._is412Error(r)) {
	//                sap.ca.ui.message.showMessageBox({
	//                    type: sap.ca.ui.message.Type.ERROR,
	//                    message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("MSG_CONFLICTING_DATA")
	//                }, jQuery.proxy(function () {
	//                    this._refreshOpportunity();
	//                }, this));
	//                return;
	//            }
	//            p = true;
	//            f = true;
	//            var d;
	//            var c = JSON.parse(r.__batchResponses[0].response.body).error;
	//            if (c.innererror && c.innererror.errordetails) {
	//                var g = c.innererror.errordetails;
	//                for (var i = 0; i < g.length; i++) {
	//                    if (g[i].message.length > 0) {
	//                        if (d == null)
	//                            d = g[i].message;
	//                        else
	//                            d += "\n" + g[i].message;
	//                    }
	//                }
	//            }
	//            if (d == null) {
	//                d = c.message.value;
	//            }
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: this.oI18nModel.getResourceBundle().getText("SAVE_FAILED"),
	//                details: d
	//            }, function () {
	//            });
	//            this.setBtnEnabled("saveButton", true);
	//            return;
	//        }
	//        if (h || S)
	//            this.refreshHeaderList();
	//        if (f) {
	//            this.bSuccessSave = false;
	//            {
	//                sap.ca.ui.message.showMessageBox({
	//                    type: sap.ca.ui.message.Type.ERROR,
	//                    message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SAVE_FAILED"),
	//                    details: e
	//                }, function () {
	//                });
	//            }
	//        } else {
	//            this.bSuccessSave = true;
	//            var j = "Opportunities(guid'" + this.headerGuid + "')";
	//            sap.ui.getCore().getEventBus().publish("cus.crm.opportunity", "opportunityChanged", { contextPath: j });
	//            sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("OPP_SAVED"), { closeOnBrowserNavigation: false });
	//            this.bNavOnUpdate = true;
	//            this._navToDetailPage(j);
	//        }
	//        cus.crm.opportunity.util.Util.refreshHeaderETag(this.sPath, this);
	//    },
	//    refreshHeaderList: function () {
	//        var p = "/" + "Opportunities(guid'" + this.headerGuid + "')";
	//        var i = this.getItemFromSPath(p);
	//        if (!i) {
	//            this.oModel.refresh();
	//            return;
	//        }
	//        if (!this.s2Controller) {
	//            return;
	//        }
	//        if (this.s2Controller.opportunityID || this.s2Controller.nGuid) {
	//            this.s2Controller.desc = this.HeaderObject["Description"];
	//            this.s2Controller.byId("labelInfo").setText(this.s2Controller.desc);
	//        }
	//        var k;
	//        var d = i.getBindingContext().getObject();
	//        for (k in this.HeaderObject) {
	//            d[k] = this.HeaderObject[k];
	//        }
	//        this.s2Controller.getList().updateItems();
	//    },
	//    getItemFromSPath: function (p) {
	//        if (!this.s2Controller) {
	//            return null;
	//        }
	//        var a = this.s2Controller.getList().getItems();
	//        var i;
	//        var o = this.oModel.getContext(p).getObject();
	//        for (i = 0; i < a.length; i++) {
	//            if (o === a[i].getBindingContext().getObject()) {
	//                return a[i];
	//            }
	//        }
	//        return null;
	//    },
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
	//    validateEditPage: function () {
	//        var c = false;
	//        if (this.byId("description").getValue() === "") {
	//            this.byId("description").setValueState(sap.ui.core.ValueState.Error);
	//            c = true;
	//        }
	//        if (this.byId("expectedSalesVolume").getValue() === "") {
	//            this.byId("expectedSalesVolume").setValue(0);
	//        }
	//        if (this.byId("description").getValueState() === sap.ui.core.ValueState.Error)
	//            c = true;
	//        if (this.byId("datePickerStartDate").getValueState() === sap.ui.core.ValueState.Error || this.byId("datePickerEndDate").getValueState() === sap.ui.core.ValueState.Error) {
	//            c = true;
	//        }
	//        if (this.byId("chanceOfSuccess").getValueState() === sap.ui.core.ValueState.Error)
	//            c = true;
	//        if (this.byId("expectedSalesVolume").getValueState() === sap.ui.core.ValueState.Error)
	//            c = true;
	//        if (this.byId("datePickerEndDate").getValue() === "") {
	//            this.byId("datePickerEndDate").setValueState(sap.ui.core.ValueState.Error);
	//            c = true;
	//        }
	//        if (this.validateProductBasket() === false) {
	//            c = true;
	//        }
	//        if (this.extHookValidateAdditionalFields) {
	//            var v = this.extHookValidateAdditionalFields();
	//            if (!v) {
	//                c = true;
	//            }
	//        }
	//        if (c == true) {
	//            return false;
	//        }
	//        return true;
	//    },
	//    validateProductBasket: function () {
	//        var a = this.byId("productBasketEdit").getItems();
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
	//    validateDates: function () {
	//        var d = this.byId("datePickerStartDate");
	//        var a = this.byId("datePickerEndDate");
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
	//    quantityChanged: function (e) {
	//        var d = e.getSource().getBindingContext("json").getObject();
	//        var n = e.getParameter("newValue");
	//        var p = /[^0-9.]/;
	//        var l = e.getSource().getParent().getParent();
	//        if (p.test(n) === false) {
	//            if (n.split(".").length > 2) {
	//                d.Quantity = d.OldValue;
	//                e.getSource().setValue(d.Quantity);
	//            } else {
	//                d.OldValue = n;
	//                d.Quantity = n;
	//                e.getSource().setValueState(sap.ui.core.ValueState.None);
	//                var t = n;
	//                if (n === "")
	//                    t = "0";
	//                var u = null;
	//                var a = null;
	//                var c = l.getCells();
	//                for (var i = 0; i < c.length; i++) {
	//                    if (c[i].data("field") === "NETVALUE") {
	//                        u = c[i];
	//                    }
	//                    if (c[i].data("field") === "TOTALNETVALUE") {
	//                        a = c[i];
	//                    }
	//                }
	//                if (u && a) {
	//                    var b = u.getNumber();
	//                    if (b === "") {
	//                        var s = "0";
	//                    } else
	//                        a.setNumber("" + parseFloat(t) * parseFloat(b));
	//                }
	//            }
	//        } else {
	//            d.Quantity = d.OldValue;
	//            e.getSource().setValue(d.Quantity);
	//        }
	//    },
	//    onCancelDialog: function (e) {
	//        this.oAddProductsFragment.close();
	//        this.oAddProductsFragment.getContent()[0].removeSelections();
	//    },
	//    enableProductsAddButton: function (e) {
	//        if (this.oAddProductsFragment.getContent()[0].getSelectedItems().length > 0) {
	//            this.oAddProductsFragment.getBeginButton().setEnabled(true);
	//        } else {
	//            this.oAddProductsFragment.getBeginButton().setEnabled(false);
	//        }
	//    },
	//    onAddDialog: function (e) {
	//        var p = this.oAddProductsFragment.getContent()[0];
	//        var s = p.getSelectedItems();
	//        var h = this.headerGuid;
	//        var a = { Products: [] };
	//        var d = this.byId("productBasketEdit").getModel("json").getData();
	//        if (d && d.hasOwnProperty("Products"))
	//            a.Products = d.Products;
	//        var i = 0;
	//        var l = s.length;
	//        var L;
	//        for (i = 0; i < l; i++) {
	//            L = s[i];
	//            var t = L.getBindingContext("json").getObject();
	//            var b = {
	//                HeaderGuid: h,
	//                ItemGuid: "",
	//                ProcessingMode: "",
	//                ProductGuid: t.ProductGuid,
	//                ProductId: t.ProductId,
	//                ProductName: t.ProductDescription,
	//                Quantity: "1",
	//                Unit: t.Unit,
	//                Backend: "",
	//                OldValue: "1",
	//                TotalExpectedNetValue: ""
	//            };
	//            if (this.extHookExtendProductEntry) {
	//                this.extHookExtendProductEntry(b, t);
	//            }
	//            a.Products.push(b);
	//        }
	//        this.byId("productBasketEdit").getModel("json").updateBindings();
	//        p.removeSelections();
	//        e.getSource().getParent().close();
	//    },
	//    deleteProduct: function (e) {
	//        var d = e.getSource().getModel("json").getData();
	//        var p = e.getSource().getBindingContext("json").getObject();
	//        var i;
	//        var l = d.Products.length;
	//        for (i = 0; i < l; i++)
	//            if (p == d.Products[i]) {
	//                d.Products.splice(i, 1);
	//                if (p.Backend === "X")
	//                    this.deleteBuffer.push(p);
	//                break;
	//            }
	//        this.byId("productBasketEdit").getModel("json").updateBindings();
	//    },
	//    formatDate: function (i) {
	//        if (i === "" || i === null || i === undefined)
	//            return "";
	//        var f = sap.ca.ui.model.format.DateFormat.getDateInstance({ style: "medium" });
	//        return f.format(i, true);
	//    },
	    showContactF4: function (e) {
	        this.contactF4Fragment.getContent()[0].removeSelections();
	        this.contactF4Fragment.setModel(new sap.ui.model.json.JSONModel());
	        this.contactF4Fragment.setModel(this.getView().getModel("i18n"), "i18n");
	        this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	        var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
	        var a = t.getContent()[0];
	        t.setVisible(false);
	        var s = this.byId("inputMainContact").getValue("_lastValue");
	        var T = s.split("/");
	        var b = T[0].replace(/\s+$/, "");
	        this.contactF4Fragment.getSubHeader().getContentLeft()[0].setValue(b);
	        var o = this.HeaderObject;
	        this.contactF4Fragment.open();
	        var j = new sap.ui.model.json.JSONModel();
	        this.contactF4Fragment.setModel(j, "json");
	        if (o.ProspectNumber !== "") {
	            //t.setVisible(true); // Customizing
	            if (o.ProspectName !== "") {
	                a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FILTER") + " " + o.ProspectName);
	            } else {
	                a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FILTER") + " " + o.ProspectNumber);
	            }
	            this.oModel.read("/AccountCollection(accountID='" + o.ProspectNumber + "')/Contacts", null, ["$filter=substringof('" + this.byId("inputMainContact").getValue() + "'" + ",fullName)"], true, jQuery.proxy(function (c, r) {
	                this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	                if (r.data.results.length === 0)
	                    this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	            }, this), jQuery.proxy(function (E) {
	                this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	            }, this));
	        } else {
	            t.setVisible(false);
	            this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	            this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	            this.oModel.read("ContactCollection", null, null, true, jQuery.proxy(function (c, r) {
	                this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	                if (r.data.results.length === 0)
	                    this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	            }, this), jQuery.proxy(function (E) {
	                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	            }, this));
	        }
	    },
	//    showEmployeeF4: function (e) {
	//        if (!this.employeeF4Fragment) {
	//            this.employeeF4Fragment = new sap.ui.xmlfragment(this.createId("employeeF4"), "cus.crm.opportunity.view.EmployeeF4", this);
	//            this.employeeF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "json");
	//            this.employeeF4Fragment.setModel(this.oI18nModel, "i18n");
	//        }
	//        this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        var t = this.employeeF4Fragment.getContent()[0].getInfoToolbar();
	//        var a = t.getContent()[0];
	//        t.setVisible(false);
	//        var s = this.byId("inputEmpResponsible").getValue("_lastValue");
	//        var T = s.split("/");
	//        var b = T[0].replace(/\s+$/, "");
	//        this.employeeF4Fragment.getSubHeader().getContentLeft()[0].setValue(b);
	//        var o = this.HeaderObject;
	//        this.employeeF4Fragment.open();
	//        var j = new sap.ui.model.json.JSONModel();
	//        this.employeeF4Fragment.setModel(j, "json");
	//        if (o.ProspectNumber !== "") {
	//            t.setVisible(true);
	//            if (o.ProspectName !== "") {
	//                a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FILTER") + " " + o.ProspectName);
	//            } else {
	//                a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FILTER") + " " + o.ProspectNumber);
	//            }
	//            this.oModel.read("/AccountCollection(accountID='" + o.ProspectNumber + "')/EmployeeResponsibles", null, ["$filter=substringof('" + this.byId("inputEmpResponsible").getValue() + "'" + ",fullName)"], true, jQuery.proxy(function (c, r) {
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data] });
	//            }, this), jQuery.proxy(function (E) {
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: [] });
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this));
	//        } else {
	//            t.setVisible(false);
	//            this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: [] });
	//            this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//            this.oModel.read("EmployeeCollection", null, ["$filter=substringof('" + this.byId("inputEmpResponsible").getValue() + "'" + ",fullName)"], true, jQuery.proxy(function (c, r) {
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data] });
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this));
	//        }
	//    },
	//    closeContactF4: function (e) {
	//        var j = new sap.ui.model.json.JSONModel();
	//        j.setData({ ContactCollection: [] });
	//        this.contactF4Fragment.setModel(j, "json");
	//        this.contactF4Fragment.close();
	//    },
	//    closeEmployeeF4: function (e) {
	//        var j = new sap.ui.model.json.JSONModel();
	//        j.setData({ EmployeeCollection: [] });
	//        this.employeeF4Fragment.setModel(j, "json");
	//        this.employeeF4Fragment.close();
	//    },
	//    setContact: function (e) {
	//        this.oSelectedContact = e.getSource().getSelectedItem().getBindingContext("json").getObject();
	//        if (this.oSelectedContact.fullName !== "")
	//            this.byId("inputMainContact").setValue(this.oSelectedContact.fullName);
	//        else
	//            this.byId("inputMainContact").setValue(this.oSelectedContact.contactID);
	//        this.contactF4Fragment.getContent()[0].removeSelections();
	//        var j = new sap.ui.model.json.JSONModel();
	//        j.setData({ ContactCollection: [] });
	//        this.contactF4Fragment.setModel(j, "json");
	//        this.contactF4Fragment.close();
	//    },
	//    setEmployee: function (e) {
	//        this.oSelectedEmployee = e.getSource().getSelectedItem().getBindingContext("json").getObject();
	//        if (this.oSelectedEmployee.fullName !== "")
	//            this.byId("inputEmpResponsible").setValue(this.oSelectedEmployee.fullName);
	//        else
	//            this.byId("inputEmpResponsible").setValue(this.oSelectedEmployee.employeeID);
	//        this.employeeF4Fragment.getContent()[0].removeSelections();
	//        var j = new sap.ui.model.json.JSONModel();
	//        j.setData({ EmployeeCollection: [] });
	//        this.employeeF4Fragment.setModel(j, "json");
	//        this.employeeF4Fragment.close();
	//    },
	//    searchContact: function (e) {
	//        var v = e.getParameter("query");
	//        this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
	//        if (t.getVisible() === false) {
	//            this.oModel.read("ContactCollection", null, ["$filter=substringof('" + v + "'" + ",fullName)"], true, jQuery.proxy(function (o, r) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//                if (r.data.results.length === 0)
	//                    this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this));
	//        } else {
	//            this.oModel.read("/AccountCollection(accountID='" + this.HeaderObject.ProspectNumber + "')/Contacts", null, ["$filter=substringof('" + v + "'" + ",fullName)"], true, jQuery.proxy(function (o, r) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//                if (r.data.results.length === 0)
	//                    this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this));
	//        }
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
	//            this.oModel.read("/AccountCollection(accountID='" + this.HeaderObject.ProspectNumber + "')/EmployeeResponsibles", null, ["$filter=substringof('" + v + "'" + ",fullName)"], true, jQuery.proxy(function (o, r) {
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data] });
	//            }, this), jQuery.proxy(function (E) {
	//                this.employeeF4Fragment.getModel("json").setData({ EmployeeCollection: [] });
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this));
	//        }
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
	//        this.oModel.read("ContactCollection", null, ["$filter=substringof('" + s + "',fullName)"], true, jQuery.proxy(function (a, r) {
	//            this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//            if (r.data.results.length === 0)
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//        }, this), jQuery.proxy(function (E) {
	//            this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//        }, this));
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
	//                this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_EMPLOYEE"));
	//        }, this), jQuery.proxy(function (E) {
	//            this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_EMPLOYEE"));
	//        }, this));
	//    },
	//    showCurrencyF4: function () {
	//        this.oActionSheet = sap.ui.xmlfragment("cus.crm.opportunity.view.CurrencySelectDialog", this);
	//        this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
	//        var m = this.oModel;
	//        var j = new sap.ui.model.json.JSONModel();
	//        var d;
	//        m.read("Currencies", null, null, false, function (D, r) {
	//            d = { Currencies: r.data.results };
	//        });
	//        j.setData(d);
	//        this.oActionSheet.setModel(j, "json");
	//        this.oActionSheet.open();
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
	//            if (r.data.results.length === 0)
	//                this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            this.oAddProductsFragment.getModel("json").setData({ Products: r.data.results });
	//        }, this), jQuery.proxy(function (E) {
	//            this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//        }, this));
	//    },
	//    getDateTimeStampFromDatePicker: function (d) {
	//        var l = $("#" + d.getIdForLabel()).val();
	//        if (l === "") {
	//            return null;
	//        }
	//        var c = this.oDateFormatter.parse(l);
	//        var y = c.getFullYear();
	//        var m = c.getMonth();
	//        var a = c.getDate();
	//        return new Date(Date.UTC(y, m, a));
	//    },
	//    getDetailController: function () {
	//        return this.getView().getModel("controllers").getData().s3Controller;
	//    },
	//    onBack: function () {
	//        this.onCancel();
	//    },
	//    dataLossOnBack: function (r) {
	//        if (r.isconfirmed) {
	//            this.oRouter._navBack();
	//        }
	//    },
	//    getHeaderFooterOptions: function () {
	//        var b;
	//        var s = this.getDetailController();
	//        if (sap.ui.Device.system.phone || this.fullScreenMode) {
	//            b = jQuery.proxy(this.onBack, this);
	//        } else {
	//            b = null;
	//        }
	//        return {
	//            onBack: b,
	//            sI18NDetailTitle: this.oResourceBundle.getText("EDIT_TITLE"),
	//            buttonList: [
	//                {
	//                    sI18nBtnTxt: "SAVE",
	//                    sId: "saveButton",
	//                    onBtnPressed: jQuery.proxy(this.onEditSave, this)
	//                },
	//                {
	//                    sI18nBtnTxt: "CANCEL",
	//                    onBtnPressed: jQuery.proxy(this.onCancel, this)
	//                }
	//            ],
	//            bSuppressBookmarkButton: true
	//        };
	//    },
	//    isMainScreen: function () {
	//        return false;
	//    },
	//    handleErrors: function (e) {
	//        jQuery.sap.log.error(JSON.stringify(e));
	//        sap.ca.ui.message.showMessageBox({
	//            type: sap.ca.ui.message.Type.ERROR,
	//            message: e.message,
	//            details: JSON.parse(e.response.body).error.message.value
	//        }, function (r) {
	//        });
	//    },
	//    _areDatesSame: function (d, D) {
	//        if (d === null && D === null) {
	//            return true;
	//        }
	//        if (!(d instanceof Date && D instanceof Date)) {
	//            return false;
	//        }
	//        if (d.getDate() !== D.getDate()) {
	//            return false;
	//        }
	//        if (d.getMonth() !== D.getMonth()) {
	//            return false;
	//        }
	//        if (d.getFullYear() !== D.getFullYear()) {
	//            return false;
	//        }
	//        return true;
	//    },
	//    _checkDataLoss: function () {
	//        var h = this.headerGuid;
	//        var t = {
	//            Guid: h,
	//            Description: this.byId("description").getValue(),
	//            ExpectedSalesVolume: this.FormatvolumeValue.toString(),
	//            CurrencyCode: this.byId("currency").getValue(),
	//            ChanceOfSuccess: this.byId("chanceOfSuccess").getValue(),
	//            StartDate: this.getDateTimeStampFromDatePicker(this.byId("datePickerStartDate")),
	//            ClosingDate: this.getDateTimeStampFromDatePicker(this.byId("datePickerEndDate")),
	//            SalesStageCode: this.byId("stages").getSelectedKey(),
	//            UserStatusCode: this.byId("userStatus").getSelectedKey(),
	//            PriorityCode: this.byId("priority").getSelectedKey(),
	//            ForecastRelevance: this.byId("switch").getState()
	//        };
	//        var k;
	//        var e = {};
	//        for (k in t) {
	//            switch (k) {
	//            case "StartDate":
	//            case "ClosingDate":
	//                if (!this._areDatesSame(this.HeaderObject[k], t[k])) {
	//                    return true;
	//                }
	//                break;
	//            case "ChanceOfSuccess":
	//                if (Number(this.HeaderObject[k]) !== Number(t[k])) {
	//                    return true;
	//                }
	//                break;
	//            case "ExpectedSalesVolume":
	//                if (this.HeaderObject[k] !== t[k]) {
	//                    return true;
	//                }
	//            default:
	//                if (this.HeaderObject[k] !== t[k]) {
	//                    return true;
	//                }
	//            }
	//        }
	//        if (this.extHookAddCustomHeaderFields) {
	//            var v = this.extHookAddCustomHeaderFields(e);
	//            if (v) {
	//                return true;
	//            }
	//        }
	//        if (this.userStatusCode !== this.byId("userStatus").getSelectedKey()) {
	//            return true;
	//        }
	//        if (this.HeaderObject.MainContactId !== this.oSelectedContact.contactID || this.HeaderObject.MainContactName !== this.byId("inputMainContact").getValue()) {
	//            return true;
	//        }
	//        if (parseFloat(this.sBackendVersion) >= 2) {
	//            if (this.HeaderObject.EmployeeResponsibleNumber !== this.oSelectedEmployee.employeeID || this.HeaderObject.EmployeeResponsibleName !== this.byId("inputEmpResponsible").getValue()) {
	//                return true;
	//            }
	//        }
	//        if (this.deleteBuffer.length > 0) {
	//            return true;
	//        }
	//        var b = this.byId("productBasketEdit").getModel("json").getData();
	//        var l = 0;
	//        if (b.Products) {
	//            l = b.Products.length;
	//        }
	//        for (var i = 0; i < l; i++) {
	//            if (b.Products[i].Backend === "X") {
	//                var o = this.BackendProducts[b.Products[i].ItemGuid];
	//                var n = b.Products[i];
	//                var v = false;
	//                if (o.Quantity !== n.Quantity) {
	//                    return true;
	//                }
	//                if (o.TotalExpectedNetValue !== n.TotalExpectedNetValue) {
	//                    return true;
	//                }
	//                if (this.extHookCheckDeltaOnProductEntry) {
	//                    v = this.extHookCheckDeltaOnProductEntry(o, n);
	//                    if (v) {
	//                        return true;
	//                    }
	//                }
	//            } else {
	//                return true;
	//            }
	//        }
	//        return false;
	//    },
	//    _updateDeleteBuffer: function () {
	//        var p = this.byId("productBasketEdit").getModel("json").getData().Products;
	//        for (var i = 0; i < this.deleteBuffer.length; i++) {
	//            var f = false;
	//            for (var j = 0; j < p.length; j++) {
	//                if (this.deleteBuffer[i].ItemGuid === p[i].ItemGuid) {
	//                    f = true;
	//                    break;
	//                }
	//            }
	//            if (!f) {
	//                this.deleteBuffer.splice(i, 1);
	//                i--;
	//            }
	//        }
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
	//        var a = this.getView().byId("inputEmpResponsible");
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
	//        this.byId("inputEmpResponsible").setValue(o.fullName);
	//        this.employeeName = o.fullName;
	//        this.oSelectedEmployee.employeeID = o.employeeID;
	//    },
	//    onEmployeeInputFieldChanged: function (e) {
	//        this.byId("inputEmpResponsible").setValueState(sap.ui.core.ValueState.None);
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
	//    _saveETag: function (e) {
	//        this.sETag = e;
	//    },
	//    _refreshOpportunity: function () {
	//        this.bindEditView(true);
	//        cus.crm.opportunity.util.Util.refreshHeaderETag(this.sPath, this);
	//    },
	//    _is412Error: function (r) {
	//        for (var i = 0; i < r.__batchResponses.length; i++) {
	//            if (r.__batchResponses[i].response.statusCode === "412") {
	//                return true;
	//            }
	//        }
	//        return false;
	//    },
	//    _hasUserStatusChanged: function () {
	//        return this.userStatusCode !== this.byId("userStatus").getSelectedKey();
	//    },
	//    _isContactFilledProperly: function () {
	//        if (this.byId("inputMainContact").getValue() != this.oSelectedContact.fullName) {
	//            if (this.byId("inputMainContact").getValue() != "") {
	//                this.showContactF4();
	//                this.requestNumber = 0;
	//                this.oModel.clearBatch();
	//                return false;
	//            }
	//        }
	//        return true;
	//    },
	//    _hasMainContactChanged: function () {
	//        return this.HeaderObject.MainContactId !== this.oSelectedContact.contactID || this.HeaderObject.MainContactName !== this.byId("inputMainContact").getValue();
	//    },
	//    _hasEmployeeChanged: function () {
	//        return this.HeaderObject.EmployeeResponsibleNumber !== this.oSelectedEmployee.employeeID || this.HeaderObject.EmployeeResponsibleName !== this.byId("inputEmpResponsible").getValue();
	//    },
	//    _navToDetailPage: function (c) {
	//        var s = this.getDetailController();
	//        if (s === null) {
	//            window.history.go(-1);
	//            return;
	//        }
	//        if (!sap.ui.Device.system.phone) {
	//            if (!this.fullScreenMode) {
	//                this.oRouter.navTo("detail", { contextPath: c || "Opportunities(guid'" + this.headerGuid + "')" }, true);
	//            } else {
	//                window.history.go(-1);
	//            }
	//        } else {
	//            this._navBack();
	//        }
	//    }
});