jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");
jQuery.sap.require("sap.ca.ui.quickoverview.CompanyLaunch");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ca.ui.model.type.FileSize");
jQuery.sap.require("cus.crm.opportunity.util.schema");
jQuery.sap.require("cus.crm.opportunity.util.Formatter");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("cus.crm.opportunity.util.Util");
jQuery.sap.require("sap/ui/core/util/Export");
jQuery.sap.require("sap/ui/core/util/ExportTypeCSV");
jQuery.sap.require("cus.crm.opportunity.util.Constants");
jQuery.sap.require("cus.crm.opportunity.CRM_OPPRTNTYExtension.util.customFormatter");
sap.ui.controller("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S3Custom", {
	customFormatter: cus.crm.opportunity.CRM_OPPRTNTYExtension.util.customFormatter,
	//    SalesStages: [],
	//    Priorities: [],
	//    UserStatuses: [],
	//    Currencies: [],
	//    ContactCollection: [],
	//    EmployeeCollection: [],
	//    prospect_number: "",
	//    response: [],
	//    opportunity_number: "",
	//    bAppLaunched: true,
	//    guid: undefined,
	//    partnerFunctionMap: {},
	//    mPartnerImgSrc: {},
	//    partnerDeterminationMap: {},
	//    noteTypeMap: undefined,
	//    noteLanguageList: [],
	//    aAviliableCrossApps: [],
	//    allOrgSetsFlag: false,
	//    _note_type: {
	//        log: "P",
	//        non_log: "",
	//        display: "C"
	//    },
	//    isOffline: new cus.crm.opportunity.util.AppOfflineInterface().isOffline(),
	//    oConstantsFactory: cus.crm.opportunity.util.ConstantsFactory,
	//    oConstants: cus.crm.opportunity.util.ConstantsFactory.getInstance(),
	//    oFormatter: cus.crm.opportunity.util.Formatter,
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
	//    onInit: function () {
	//        this.fullScreenMode = false;
	//        this.oOfflineModel = new sap.ui.model.json.JSONModel({ bOffline: this.isOffline });
	//        this.oOfflineModel.updateBindings();
	//        this.getView().setModel(this.oOfflineModel, "onlineOfflineMode");
	//        if (this.isOffline) {
	//            var f = this.byId("fileupload");
	//            var u = f._getFileUploader();
	//            u.setVisible(false);
	//        }
	//        sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);
	//        this.oModel = this.getView().getModel();
	//        this.oI18nModel = sap.ca.scfld.md.app.Application.getImpl().AppI18nModel;
	//        this.oResourceBundle = this.oI18nModel.getResourceBundle();
	//        if (this.isOffline) {
	//            var c = [
	//                {
	//                    "semanticObject": "Account",
	//                    "action": "MyAccounts"
	//                },
	//                {
	//                    "semanticObject": "ContactPerson",
	//                    "action": "MyContacts"
	//                },
	//                {
	//                    "semanticObject": "Opportunity",
	//                    "action": "manageOpportunity"
	//                },
	//                {
	//                    "semanticObject": "Appointment",
	//                    "action": "myAppointments"
	//                },
	//                {
	//                    "semanticObject": "Task",
	//                    "action": "manageTasks"
	//                },
	//                {
	//                    "semanticObject": "Lead",
	//                    "action": "manageLead"
	//                }
	//            ];
	//            this.checkCorssAppsAvialbleInOffline(c);
	//        }
	//        this.sProspectNumber = "";
	//        this.sProspectImageSrc = "";
	//        jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath("cus.crm.opportunity.css.Opportunity", ".css"), "sap-ui-theme-sap.crm");
	//        this.contactF4Fragment = new sap.ui.xmlfragment(this.createId("contact_F4_S3"), "cus.crm.opportunity.view.ContactF4", this);
	//        this.changeLogFragment = new sap.ui.xmlfragment(this.createId("change_Log_S3"), "cus.crm.opportunity.view.ChangeLog", this);
	//        this.changeLogFragment.setModel(new sap.ui.model.json.JSONModel());
	//        this.changeLogFragment.data("controller", this);
	//        this.changeLogFragment.setModel(this.oI18nModel, "i18n");
	//        this.showErrorMsgFragment = new sap.ui.xmlfragment(this.createId("show_Error_Msg_Fragment"), "cus.crm.opportunity.view.ShowErrorMsg", this);
	//        this.showErrorMsgFragment.setModel(new sap.ui.model.json.JSONModel());
	//        this.showErrorMsgFragment.setModel(this.oI18nModel, "i18n");
	//        this.showErrorMsgFragment.getContent()[0].setModel(new sap.ui.model.json.JSONModel(), "json");
	//        this.byId("Sales_Team").addCustomData(new sap.ui.core.CustomData({
	//            key: "controller",
	//            value: this
	//        }));
	//        this.getView().setModel(new sap.ui.model.json.JSONModel(), "json");
	//        this.oRouter.attachRouteMatched(this.detailRouteMatched, this);
	//        var t = this;
	//        this.oHeaderFooterOptions = {};
	//        this.oHeaderFooterOptions3UI = {
	//            oEditBtn: {
	//                sI18nBtnTxt: "EDIT",
	//                onBtnPressed: function (e) {
	//                    t.onEdit();
	//                },
	//                bEnabled: true
	//            },
	//            buttonList: [],
	//            oJamOptions: {
	//                oShareSettings: {
	//                    object: {
	//                        id: "",
	//                        share: ""
	//                    }
	//                },
	//                fGetShareSettings: function () {
	//                    var d = t.byId("info").getModel("json").getData().Description;
	//                    var a = document.URL;
	//                    return {
	//                        object: {
	//                            id: a,
	//                            share: "Opportunity:" + d,
	//                            display: t._getShareDisplay()
	//                        },
	//                        externalObject: {
	//                            appContext: "CRM",
	//                            odataServicePath: "/sap/opu/odata/sap/CRM_OPPORTUNITY",
	//                            collection: "Opportunities",
	//                            key: "ObjectID='0090FA0D-8D72-1EE3-8181-43805E2B9FDA',ObjectType='BUS2000111'",
	//                            name: "Testing new jam integration"
	//                        }
	//                    };
	//                },
	//                oDiscussSettings: {
	//                    object: {
	//                        id: "",
	//                        share: ""
	//                    }
	//                },
	//                fGetDiscussSettings: function () {
	//                    var o = t.byId("info").getModel("json").getData().Id;
	//                    var a = document.URL;
	//                    return {
	//                        oDataServiceUrl: "/sap/opu/odata/sap/SM_INTEGRATION_SRV/",
	//                        feedType: "object",
	//                        object: {
	//                            id: t._getDiscussID(),
	//                            type: t._getDiscussType(),
	//                            name: "OpportunityID:" + o,
	//                            ui_url: a
	//                        }
	//                    };
	//                }
	//            }
	//        };
	//        this.oHeaderFooterOptions4UI = {
	//            oEditBtn: this.isOffline ? null : {
	//                sI18nBtnTxt: "EDIT",
	//                onBtnPressed: function (e) {
	//                    t.onEdit();
	//                },
	//                bEnabled: true
	//            },
	//            buttonList: this.isOffline ? [] : [{
	//                    sI18nBtnTxt: "FOLLOW_UP",
	//                    visible: false,
	//                    onBtnPressed: function (e) {
	//                        t.handleOpen(e);
	//                    }
	//                }],
	//            oJamOptions: this.isOffline ? null : {
	//                oShareSettings: {
	//                    object: {
	//                        id: "",
	//                        share: ""
	//                    }
	//                },
	//                fGetShareSettings: function () {
	//                    var d = t.byId("info").getModel("json").getData().Description;
	//                    var a = document.URL;
	//                    return {
	//                        object: {
	//                            id: a,
	//                            share: "Opportunity:" + d,
	//                            display: t._getShareDisplay()
	//                        }
	//                    };
	//                },
	//                oDiscussSettings: {
	//                    object: {
	//                        id: "",
	//                        share: ""
	//                    }
	//                },
	//                fGetDiscussSettings: function () {
	//                    var o = t.byId("info").getModel("json").getData().Id;
	//                    var a = document.URL;
	//                    return {
	//                        oDataServiceUrl: "/sap/opu/odata/sap/SM_INTEGRATION_SRV/",
	//                        feedType: "object",
	//                        object: {
	//                            id: t._getDiscussID(),
	//                            type: t._getDiscussType(),
	//                            name: "OpportunityID:" + o,
	//                            ui_url: a
	//                        }
	//                    };
	//                }
	//            }
	//        };
	//        this.sBackendVersion = cus.crm.opportunity.util.schema._getServiceSchemaVersion(this.oModel, "Opportunity");
	//        if (parseFloat(this.sBackendVersion) >= 4) {
	//            var b = true;
	//            if (this.extHookErrMsgLazyLoad) {
	//                b = !this.extHookErrMsgLazyLoad();
	//            }
	//            this.oHeaderFooterOptions4UI.buttonList.push({
	//                sI18nBtnTxt: "ERROR_MESSAGE",
	//                sId: "errorMsg",
	//                onBtnPressed: jQuery.proxy(this.onErrorMsg, this),
	//                bDisabled: b
	//            });
	//        }
	//        this.oVersioningModel = new sap.ui.model.json.JSONModel({});
	//        if (parseFloat(this.sBackendVersion) < 4) {
	//            this.byId("tab_transactionHistory").setVisible(false);
	//            this.byId("opportunityTotalNetValue_Label").setVisible(false);
	//            this.byId("opportunityTotalNetValue_Text").setVisible(false);
	//        }
	//        this._loadVersionSpecificUI(this.sBackendVersion);
	//        var F = this.byId("fileupload");
	//        var s = this.getView().getModel().sServiceUrl;
	//        F.setUploadUrl(s + "/OpportunityAttachments");
	//        this.mPartnerImgSrc[""] = "sap-icon://person-placeholder";
	//        if (this.extHookHideAccountImage) {
	//            this.bHideImage = this.extHookHideAccountImage();
	//        }
	//        if (this.extHookOfflineEditButton) {
	//            this.extHookOfflineEditButton();
	//        }
	//    },
	//    getXsrfToken: function () {
	//        var t = this.getView().getModel().getHeaders()["x-csrf-token"];
	//        if (!t) {
	//            this.getView().getModel().refreshSecurityToken(function (e, o) {
	//                t = o.headers["x-csrf-token"];
	//            }, function () {
	//                sap.ca.ui.message.showMessageBox({
	//                    type: sap.ca.ui.message.Type.ERROR,
	//                    message: "Could not get XSRF token",
	//                    details: ""
	//                });
	//            }, false);
	//        }
	//        return t;
	//    },
	//    _getBackFunction: function () {
	//        if (this.fullScreenMode) {
	//            if (this.oApplicationFacade.getApplicationModel("Back")) {
	//                this.oApplicationFacade.getApplicationModel("Back").destroy();
	//            }
	//            return function () {
	//                window.history.back(1);
	//            };
	//        } else {
	//            return undefined;
	//        }
	//    },
	//    onBeforeRendering: function () {
	//        this.getView().getModel("controllers").getData().s3Controller = this;
	//    },
	//    _loadVersionSpecificUI: function (b) {
	//        if (parseFloat(b) >= 4) {
	//            this.byId("tab_salesarea").setVisible(true);
	//        } else {
	//            this.byId("tab_salesarea").setVisible(false);
	//        }
	//        if (parseFloat(b) >= 2) {
	//            this._loadWave4UI();
	//            if (!this.fullScreenMode)
	//                this.oHeaderFooterOptions = this.oHeaderFooterOptions4UI;
	//            else
	//                this.oHeaderFooterOptions = this.oHeaderFooterOptions4UI;
	//        } else {
	//            this._loadWave3UI();
	//            this.oHeaderFooterOptions = this.oHeaderFooterOptions3UI;
	//        }
	//        if (parseFloat(b) >= 5) {
	//            this._loadWave8UI();
	//        }
	//    },
	//    _loadWave8UI: function () {
	//        this.byId("tab_notes_v2").setVisible(true);
	//        this.byId("tab_notes").setVisible(false);
	//    },
	//    _loadWave3UI: function () {
	//        this.oVersioningModel.getData().sParticipantsNoDataTextKey = "NO_CONTACTS";
	//        this.byId("salesTeam").insertContent(new sap.m.Button({
	//            text: "{i18n>ADDCONTACT}",
	//            icon: "sap-icon://add",
	//            press: jQuery.proxy(this.addContact, this),
	//            type: "Transparent"
	//        }), 0);
	//    },
	//    _loadWave4UI: function () {
	//        this.oVersioningModel.getData().sParticipantsNoDataTextKey = "NO_PARTICIPANTS1";
	//        this.byId("opportunityHeader").addAggregation("attributes", new sap.m.ObjectAttribute({
	//            text: "{parts:[{path:'i18n>OPPT_EMP_RESPONSIBLE'},{path:'json>/EmployeeResponsibleName'}], formatter:'cus.crm.opportunity.util.Formatter.formatOverviewField'}",
	//            active: true,
	//            press: jQuery.proxy(this.onEmpBusCardLaunch, this),
	//            customData: [
	//                new sap.ui.core.CustomData({
	//                    key: "PartnerNumber",
	//                    value: "{json>/EmployeeResponsibleNumber}"
	//                }),
	//                new sap.ui.core.CustomData({
	//                    key: "PartnerFunctionCode",
	//                    value: "00000014"
	//                }),
	//                new sap.ui.core.CustomData({
	//                    key: "Image",
	//                    value: "{json>/ContactImgSrc}"
	//                }),
	//                new sap.ui.core.CustomData({
	//                    key: "Imager",
	//                    value: "{json>/ImgSrc}"
	//                })
	//            ]
	//        }));
	//        this.byId("Sales_Team").setHeaderToolbar(new sap.m.Toolbar({
	//            content: this.isOffline ? [
	//                new sap.m.Label(),
	//                new sap.m.ToolbarSpacer()
	//            ] : [
	//                new sap.m.Title({ text: "{parts:[{path:'i18n>PARTICIPANTS'},{path:'json>/OpportunitySalesTeamSetNum'}], formatter:'cus.crm.opportunity.util.Formatter.formatTabHeader'}" }),
	//                new sap.m.ToolbarSpacer(),
	//                new sap.m.Button(this.createId("addParticipants"), {
	//                    text: "",
	//                    icon: "sap-icon://add",
	//                    type: "Transparent",
	//                    press: jQuery.proxy(this.showParticipantsF4, this)
	//                })
	//            ]
	//        }));
	//    },
	//    _handleNoteAddedV2: function (e) {
	//        var n = e.getParameter("noteTypeId");
	//        var l = e.getParameter("language");
	//        var t = e.getParameter("content");
	//        if (n && l && t) {
	//            var m = this.getView().getModel();
	//            var h = this.byId("info").getModel("json").getData().Guid;
	//            var E = {
	//                HeaderGuid: h,
	//                Content: t,
	//                CreatedAt: new Date(),
	//                TextLanguageID: l,
	//                TextObjectID: n
	//            };
	//            sap.ca.ui.utils.busydialog.requireBusyDialog();
	//            m.create("/OpportunityComplexNotesSet", E, null, jQuery.proxy(this._noteSavedSuccessCallback, this), jQuery.proxy(this._noteSavedFailCallback, this));
	//        }
	//    },
	//    _handleNoteUpdatedV2: function (e) {
	//        var n = e.getParameter("noteTypeId");
	//        var l = e.getParameter("language");
	//        var t = e.getParameter("content");
	//        var p = e.getParameter("contextPath");
	//        if (n && l && t) {
	//            var m = this.getView().getModel();
	//            var h = this.byId("info").getModel("json").getData().Guid;
	//            var N = "W/" + "\"'" + this._getNonLogNoteEtag(n, l) + "'\"";
	//            var E = {
	//                HeaderGuid: h,
	//                Content: t,
	//                TextLanguageID: l,
	//                TextObjectID: n
	//            };
	//            sap.ca.ui.utils.busydialog.requireBusyDialog();
	//            m.update(p, E, {
	//                fnSuccess: jQuery.proxy(this._noteSavedSuccessCallback, this),
	//                fnError: jQuery.proxy(this._noteSavedFailCallback, this),
	//                merge: true,
	//                eTag: N
	//            });
	//        }
	//    },
	//    _handleNoteDeletedV2: function (e) {
	//        var n = e.getParameter("noteTypeId");
	//        var l = e.getParameter("language");
	//        var p = e.getParameter("contextPath");
	//        if (n && l) {
	//            var m = this.getView().getModel();
	//            var h = this.byId("info").getModel("json").getData().Guid;
	//            var N = "W/" + "\"'" + this._getNonLogNoteEtag(n, l) + "'\"";
	//            sap.ca.ui.utils.busydialog.requireBusyDialog();
	//            m.remove(p, {
	//                fnSuccess: jQuery.proxy(this._noteDeleteSuccessCallback, this),
	//                fnError: jQuery.proxy(this._noteSavedFailCallback, this),
	//                merge: true,
	//                eTag: N
	//            });
	//        }
	//    },
	//    _noteSavedSuccessCallback: function () {
	//        sap.ca.ui.utils.busydialog.releaseBusyDialog();
	//        this._refreshMultiTypeNoteTab();
	//        sap.m.MessageToast.show(this.getView().getModel("i18n").getProperty("NOTE_SUCCESS"));
	//    },
	//    _noteDeleteSuccessCallback: function () {
	//        sap.ca.ui.utils.busydialog.releaseBusyDialog();
	//        this._refreshMultiTypeNoteTab();
	//        sap.m.MessageToast.show(this.getView().getModel("i18n").getProperty("NOTE_DELETED"));
	//    },
	//    _noteSavedFailCallback: function (E) {
	//        sap.ca.ui.utils.busydialog.releaseBusyDialog();
	//        if (E && E.response.statusCode == "412") {
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: this.getView().getModel("i18n").getProperty("MSG_CONFLICTING_DATA")
	//            }, jQuery.proxy(function () {
	//                this._refreshMultiTypeNoteTab();
	//            }, this));
	//        } else {
	//            if (E.response && E.response.body) {
	//                try {
	//                    var o = jQuery.parseJSON(E.response.body);
	//                    if (o.error && o.error.message && o.error.message.value) {
	//                        sap.ca.ui.message.showMessageBox({
	//                            type: sap.ca.ui.message.Type.ERROR,
	//                            message: o.error.message.value
	//                        }, jQuery.proxy(function () {
	//                            return;
	//                        }, this));
	//                        return;
	//                    }
	//                } catch (e) {
	//                    sap.ca.ui.message.showMessageBox({
	//                        type: sap.ca.ui.message.Type.ERROR,
	//                        message: this.getView().getModel("i18n").getProperty("NOTE_FAILED")
	//                    }, jQuery.proxy(function () {
	//                        return;
	//                    }, this));
	//                    return;
	//                }
	//            }
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: this.getView().getModel("i18n").getProperty("NOTE_FAILED")
	//            }, jQuery.proxy(function () {
	//                return;
	//            }, this));
	//        }
	//    },
	//    _getNonLogNoteEtag: function (n, l) {
	//        var N = this.byId("crmNote").getModel().getProperty("/NoteData");
	//        var e = "";
	//        jQuery.each(N, jQuery.proxy(function (i, v) {
	//            var c = v.TextObjectID;
	//            var a = v.TextLanguageID;
	//            if (n === c && l === a) {
	//                e = v.Etag;
	//                return false;
	//            }
	//        }, this));
	//        return e;
	//    },
	//    handleOpen: function (e) {
	//        this.appointmentFlag = false;
	//        this.oppFlag = false;
	//        this.taskFlag = false;
	//        var t = this;
	//        this._actionSheet = new sap.m.ActionSheet({
	//            showCancelButton: true,
	//            placement: sap.m.PlacementType.Top,
	//            buttons: [
	//                new sap.m.Button({
	//                    text: this.getView().getModel("i18n").getProperty("CREATE_APPOINTMENT"),
	//                    press: function (a) {
	//                        t.navToAppointmentDialog(a);
	//                    }
	//                }),
	//                new sap.m.Button({
	//                    text: this.getView().getModel("i18n").getProperty("CREATE_TASK"),
	//                    press: function (a) {
	//                        t.navToTaskDialog(a);
	//                    }
	//                }),
	//                new sap.m.Button({
	//                    text: this.getView().getModel("i18n").getProperty("CREATE_OPPORTUNITY"),
	//                    press: function (a) {
	//                        t.navToOpptDialog(a);
	//                    }
	//                })
	//            ]
	//        });
	//        if (this.extHookHandleOpen) {
	//            this.extHookHandleOpen(e);
	//        }
	//        this._actionSheet.openBy(e.getSource());
	//    },
	//    navToAppointmentDialog: function (e) {
	//        var m = this.getView().getModel();
	//        var h = this.oModel.getContext("/" + this.sPath).getObject();
	//        var g = this.byId("info").getModel("json").getData().Guid;
	//        var t = this.byId("info").getModel("json").getData().ProcessType;
	//        var d;
	//        m.read("AppFollowupTransTypes?Guid='" + g + "'&TransactionType='" + t + "'", null, null, false, function (D, r) {
	//            d = { ProcessTypes: r.data.results };
	//        });
	//        this.appointmentFlag = true;
	//        if (d.ProcessTypes.length == 0) {
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("followupfailure")
	//            });
	//        } else if (d.ProcessTypes.length == 1) {
	//            this.onlyOneAppointmentProcessType = true;
	//            this.processType = d.ProcessTypes[0].ProcessTypeCode;
	//            this.processTypeDesc = d.ProcessTypes[0].Description;
	//            this.privateFlag = d.ProcessTypes[0].PrivateFlag;
	//            this.selectProcess();
	//        } else {
	//            this.oActionSheet = sap.ui.xmlfragment("cus.crm.opportunity.view.ProcessTypeDialog", this);
	//            this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
	//            var j = new sap.ui.model.json.JSONModel();
	//            j.setData(d);
	//            this.oActionSheet.setModel(j, "json");
	//            this.oActionSheet.getAggregation("_dialog").getSubHeader().getContentMiddle()[0].setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
	//            this.oActionSheet.getAggregation("_dialog").getContent()[1].setGrowingScrollToLoad(true);
	//            this.oActionSheet.getAggregation("_dialog").setVerticalScrolling(true);
	//            this.oActionSheet.setTitle(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("APPOINTMENT_TYPE"));
	//            this.oActionSheet.open();
	//        }
	//    },
	//    searchProcess: function (e) {
	//        var v = e.getParameter("value");
	//        if (v !== undefined) {
	//            e.getParameter("itemsBinding").filter([new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, v)]);
	//        }
	//    },
	//    navToOpptDialog: function (e) {
	//        var m = this.getView().getModel();
	//        var g = this.byId("info").getModel("json").getData().Guid;
	//        var t = this.byId("info").getModel("json").getData().ProcessType;
	//        var d = null;
	//        m.read("OpptFollowupTransTypes?Guid=guid'" + g + "'&TransactionType='" + t + "'", null, null, false, function (D, r) {
	//            d = { ProcessTypes: r.data.results };
	//        });
	//        this.oppFlag = true;
	//        if (d.ProcessTypes.length == 0) {
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("followupfailure")
	//            });
	//        } else if (d.ProcessTypes.length == 1) {
	//            this.onlyOneProcessType = true;
	//            this.processType = d.ProcessTypes[0].ProcessTypeCode;
	//            this.processTypeDesc = d.ProcessTypes[0].Description;
	//            this.selectProcess();
	//        } else {
	//            this.oActionSheet = sap.ui.xmlfragment("cus.crm.opportunity.view.ProcessTypeDialog", this);
	//            this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
	//            var j = new sap.ui.model.json.JSONModel();
	//            j.setData(d);
	//            this.oActionSheet.setModel(j, "json");
	//            this.oActionSheet.getAggregation("_dialog").getSubHeader().getContentMiddle()[0].setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
	//            this.oActionSheet.getAggregation("_dialog").getContent()[1].setGrowingScrollToLoad(true);
	//            this.oActionSheet.getAggregation("_dialog").setVerticalScrolling(true);
	//            this.oActionSheet.setTitle(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("OPPORTUNITY_TYPE"));
	//            this.oActionSheet.open();
	//        }
	//    },
	//    navToTaskDialog: function (e) {
	//        var m = this.getView().getModel();
	//        var g = this.byId("info").getModel("json").getData().Guid;
	//        var t = this.byId("info").getModel("json").getData().ProcessType;
	//        var d;
	//        m.read("TaskFollowupTransTypes?Guid='" + g + "'&TransactionType='" + t + "'", null, null, false, function (D, r) {
	//            d = { ProcessTypes: r.data.results };
	//        });
	//        this.taskFlag = true;
	//        if (d.ProcessTypes.length == 0) {
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("followupfailure")
	//            });
	//        } else if (d.ProcessTypes.length == 1) {
	//            this.onlyOneTaskProcessType = true;
	//            this.processType = d.ProcessTypes[0].ProcessTypeCode;
	//            this.processTypeDesc = d.ProcessTypes[0].Description;
	//            this.selectProcess();
	//        } else {
	//            this.oActionSheet = sap.ui.xmlfragment("cus.crm.opportunity.view.ProcessTypeDialog", this);
	//            this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
	//            var j = new sap.ui.model.json.JSONModel();
	//            j.setData(d);
	//            this.oActionSheet.setModel(j, "json");
	//            this.oActionSheet.getAggregation("_dialog").getSubHeader().getContentMiddle()[0].setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
	//            this.oActionSheet.getAggregation("_dialog").getContent()[1].setGrowingScrollToLoad(true);
	//            this.oActionSheet.getAggregation("_dialog").setVerticalScrolling(true);
	//            this.oActionSheet.setTitle(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("TASK_TYPE"));
	//            this.oActionSheet.open();
	//        }
	//    },
	selectProcess: function (e) {
		var h = this.byId("info").getModel("json").getData().Guid;
		var p = "/Opportunities(guid'" + h + "')";
		var o = this.byId("info").getModel("json").getData().Id;
		var s = this.byId("info").getModel("json").getData().UserStatusText;
		var S = this.byId("info").getModel("json").getData().StartDate;
		var A = this.byId("opportunityHeader").getModel("json").getData().ProspectNumber;
		var a = this.byId("opportunityHeader").getModel("json").getData().ProspectName;
		var C = this.byId("opportunityHeader").getModel("json").getData().MainContactId;
		var b = this.byId("opportunityHeader").getModel("json").getData().MainContactName;
		var t = this.byId("opportunityHeader").getModel("json").getData().Description;
		var c = this.byId("opportunityHeader").getModel("json").getData().Guid;
		var E = this.byId("opportunityHeader").getModel("json").getData().EmployeeResponsibleName;
		var d = this.byId("opportunityHeader").getModel("json").getData().EmployeeResponsibleNumber;
		if (!(this.onlyOneAppointmentProcessType || this.onlyOneTaskProcessType || this.onlyOneProcessType)) {
			var f = e.getParameter("selectedItem");
			if (f) {
				this.processType = f.data("ProcessTypeCode");
				this.processTypeDesc = f.data("ProcessTypeDescription");
				this.privateFlag = f.data("PrivateFlag");
			}
		}
		var g = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
		this.oCrossAppNavigator = g && g("CrossApplicationNavigation");
		if (this.oppFlag) {
			var i = this.byId("info").getModel("json").getData().Guid;
			var r = "createFollowup";
			if (this.fullScreenMode)
				r = "fulScrOpptFollowup";
			this.oRouter.navTo(r, {
				contextPath: i,
				processType: this.processType
			}, false);
			this.oppFlag = false;
		} else if (this.appointmentFlag) {
			this.appointmentFlag = false;
			this.onlyOneAppointmentProcessType = false;
			var n = {
				target: {
					semanticObject: "ZMyAppointments", // Customizing//"Appointment",
					action: "create" // Customizing//"myAppointments"
				},
				params: {
					"createFromOppt": "X",
					"processType": this.processType,
					"opportunityId": o,
					"StartDate": S,
					"title": t,
					"prevGuid": c,
					"AccountID": A,
					"ContactID": C,
					"EmpID": d
				}
			};
			if (this.extHookGetExtendedAppDetailsGeneral) {
				n = this.extHookGetExtendedAppDetailsGeneral(n);
			}
			if (this.oCrossAppNavigator) {
				this.oCrossAppNavigator.toExternal(n);
			}
		} else if (this.taskFlag) {
			this.taskFlag = false;
			this.onlyOneTaskProcessType = false;
			var n = {
				target: {
					semanticObject: "ZMyTasks", //Customizing  //"Task",
					action: "create" //Customizing  //"manageTasks"
				},
				params: {
					"createFromOppt": "X",
					"AccountId": A,
					"ContactId": C,
					"processType": this.processType,
					"opportunityId": o,
					"title": t,
					"opportunityGuid": c
				},
				appSpecificRoute: [
					"&",
					"newTask",
					this.processType
				].join("/")
			};

			if (this.extHookGetExtendedAppDetailsGeneral) {
				n = this.extHookGetExtendedAppDetailsGeneral(n);
			}
			if (this.oCrossAppNavigator) {
				this.oCrossAppNavigator.toExternal(n);
			}
		}
	},
	//    getS4Controller: function () {
	//        return this.getView().getModel("controllers").getData().s4Controller;
	//    },
	//    setDefaultTabToInfo: function () {
	//        var t = this.byId("icntab");
	//        if (t && t.getItems().length > 0) {
	//            if (t.getSelectedKey() !== "info")
	//                t.setSelectedKey("Info");
	//            t.setExpanded(true);
	//        }
	//    },
	//    isMainScreen: function () {
	//        return false;
	//    },
	//    _getDiscussID: function () {
	//        var h = window.location.href;
	//        var u = this._getLocation(h);
	//        var a = this.byId("info").getModel("json").getData().Guid;
	//        var p = "/Opportunities(guid'" + a + "')";
	//        return u.pathname + p;
	//    },
	//    _getDiscussType: function () {
	//        var h = window.location.href;
	//        var u = this._getLocation(h);
	//        return u.pathname + "/$metadata#Opportunities";
	//    },
	//    _getLocation: function (h) {
	//        var i = !!h.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
	//        if (i) {
	//            var m = h.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
	//            return m && {
	//                protocol: m[1],
	//                host: m[2],
	//                hostname: m[3],
	//                port: m[4],
	//                pathname: m[5],
	//                search: m[6],
	//                hash: m[7]
	//            };
	//        } else {
	//            return { pathname: h };
	//        }
	//    },
	//    _getShareDisplay: function () {
	//        var d = this.byId("info").getModel("json").getData().Description;
	//        var v = this.byId("info").getModel("json").getData().ExpectedSalesVolume;
	//        var c = this.byId("info").getModel("json").getData().CurrencyCode;
	//        var p = this.byId("info").getModel("json").getData().ProspectName;
	//        var a = this.oFormatter.dateFormatter(this.byId("info").getModel("json").getData().ClosingDate);
	//        var u = this.byId("info").getModel("json").getData().UserStatusText;
	//        var o = new sap.m.ObjectListItem({
	//            title: d,
	//            number: v,
	//            numberUnit: c,
	//            attributes: [
	//                new sap.m.ObjectAttribute({ text: p }),
	//                new sap.m.ObjectAttribute({ text: a })
	//            ],
	//            firstStatus: new sap.m.ObjectStatus({ text: u })
	//        });
	//        return o;
	//    },
	//    getHeaderFooterOptions: function () {
	//        if (!this.isOffline) {
	//            this.oHeaderFooterOptions.oAddBookmarkSettings = { icon: "sap-icon://Fiori2/F0004" };
	//        }
	//        if (sap.ui.Device.system.phone && !this.fullScreenMode)
	//            this.oHeaderFooterOptions.onBack = this._getBackFunction();
	//        else if (sap.ui.Device.system.phone && this.fullScreenMode)
	//            this.oHeaderFooterOptions.onBack = this._getBackFunction();
	//        else if (!sap.ui.Device.system.phone && this.fullScreenMode)
	//            this.oHeaderFooterOptions.onBack = this._getBackFunction();
	//        else
	//            this.oHeaderFooterOptions.onBack = null;
	//        this.extendHeaderFooterOptions(this.oHeaderFooterOptions);
	//        return this.oHeaderFooterOptions;
	//    },
	//    extendHeaderFooterOptions: function (h) {
	//    },
	//    navToSubview: function () {
	//        this.oRouter.navTo("subDetail", { contextPath: this.getView().getBindingContext().getPath().substr(1) }, !sap.ui.Device.system.phone);
	//    },
	//    navToEmpty: function () {
	//        this.oRouter.navTo("noData", {
	//            viewTitle: "DETAIL_TITLE",
	//            languageKey: "NO_ITEMS_AVAILABLE"
	//        });
	//    },
	//    selectedTab: function (c) {
	//        var m = this.getView().getModel();
	//        var t = c.getSource().getSelectedKey();
	//        if (this.byId("info").getModel("json"))
	//            var h = this.byId("info").getModel("json").getData().Guid;
	//        var p = "/Opportunities(guid'" + h + "')";
	//        if (this.extHookSelectedTab) {
	//            this.extHookSelectedTab(c);
	//        }
	//        var s = false;
	//        if (this.extHookSkipTab) {
	//            s = this.extHookSkipTab(c);
	//        }
	//        if (t == "Notes" && !s) {
	//            this.notesTabSelected();
	//        }
	//        if (t == "NotesV2") {
	//            this.multiTypeNotesTabSelected();
	//        }
	//        if (t == "Parties Involved" && !s) {
	//            this.participantsTabSelected();
	//        }
	//        if (t == "Competitors" && !s) {
	//            this.competitorsTabSelected();
	//        }
	//        if (t == "Attachments" && !s) {
	//            this.cleanAttachmentControlError();
	//            this.attachmentsTabSelected();
	//        }
	//        if (t == "TransactionHistory" && !s) {
	//            this.txHistoryTabSelected();
	//        }
	//    },
	navigateDocHistory: function (e) {
		var t = e.getSource().getText();
		var O = "";
		var g = "";
		for (var i = 0; i < this.newResult.length; i++) {
			if (t == this.newResult[i].TransactionId) {
				O = this.newResult[i].ObjectType;
				g = this.newResult[i].Guid;
				break;
			}
		}
		var f = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
		this.oCrossAppNavigator = f && f("CrossApplicationNavigation");
		var n = undefined;
		if (O === "BUS2000111") {
			n = {
				target: {
					semanticObject: "ZMyOpportunities", //semanticObject: "Opportunity",
					action: "create&/display/" + this.oConstants.OPP_END_POINT + "(guid'" + g + "')"
						//action: "manageOpportunity&/display/" + this.oConstants.OPP_END_POINT + "(guid'" + g + "')"
				}
			};
		} else if (O === "BUS2000125") {
			n = {
				target: {
					//semanticObject: "Task",
					//action: "manageTasks&/taskOverview/" + this.oConstants.TASK_END_POINT + "(guid'" + g + "')"
					semanticObject: "ZMyTasks",
					action: "create&/taskOverview/" + this.oConstants.TASK_END_POINT + "(guid'" + g + "')"
				}
			};
		} else if (O === "BUS2000126") {
			n = {
				target: {
					//semanticObject: "Appointment",
					//action: "myAppointments"
					semanticObject: "ZMyAppointments",
					action: "create"
				},
				appSpecificRoute: [
					"&",
					"ZMyAppointments", //"appointment",
					g
				].join("/")
			};
			// Customizing
			n.appSpecificRoute = n.appSpecificRoute.replace("ZMyAppointments", "Appointment");
		} else if (O === "BUS2000108") {
			n = {
				target: {
					semanticObject: "Lead",
					action: "manageLead&/display/" + this.oConstants.LEAD_END_POINT + "(guid'" + g + "')"
				}
			};
		}
		if (this.extHookGetExtendedAppDetailsGeneral) {
			n = this.extHookGetExtendedAppDetailsGeneral(n);
		}
		if (this.oCrossAppNavigator) {
			this.oCrossAppNavigator.toExternal(n);
		}
	},
	//    _handleAddNote: function (e) {
	//        var t = e.getParameter("value");
	//        if (t) {
	//            var a = this;
	//            var m = this.getView().getModel();
	//            var h = this.byId("info").getModel("json").getData().Guid;
	//            var E = {
	//                HeaderGuid: h,
	//                Content: t
	//            };
	//            m.create("/OpportunityNotesSet", E, null, jQuery.proxy(function () {
	//                var a = this;
	//                m.read(a.sPath, null, ["$expand=Notes"], true, function (o, r) {
	//                    a.byId("listItem").setModel(new sap.ui.model.json.JSONModel({ OpportunityNotesSet: o.Notes.results }), "json");
	//                });
	//            }, this), function (M) {
	//                a.displayResponseErrorMessage(M, sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SAVE_FAILED"));
	//            });
	//        }
	//    },
	//    displayResponseErrorMessage: function (m, d) {
	//        var M;
	//        if (m.response) {
	//            M = jQuery.parseJSON(m.response.body).error.message.value;
	//        }
	//        sap.m.MessageToast.show(M || d);
	//    },
	//    changeToString: function (v) {
	//        var s = v.split("%");
	//        var c = s[0];
	//        for (var i = 1; i < s.length; i++) {
	//            c += String.fromCharCode(parseInt(s[i].substring(0, 2), 16)) + s[i].substring(2);
	//        }
	//        return c;
	//    },
	//    onEdit: function () {
	//        var c = this.byId("info").getModel("json").getData().Guid;
	//        var a = "Opportunities(guid'" + c + "')";
	//        var t = this;
	//        var m = this.oModel;
	//        this.sBackendVersion = cus.crm.opportunity.util.schema._getServiceSchemaVersion(this.oModel, "Opportunity");
	//        if (parseFloat(this.sBackendVersion) >= 3) {
	//            m.read("EditAuthorizationCheck", null, { ObjectGuid: m.formatValue(c, "Edm.Guid") }, false, function (d, r) {
	//                if (r.data.EditAuthorizationCheck.ActionSuccessful == "X") {
	//                    if (!sap.ui.Device.system.phone) {
	//                        if (!t.fullScreenMode) {
	//                            t.oRouter.navTo("subDetail", { contextPath: a }, true);
	//                        } else {
	//                            t.oRouter.navTo("edit", { contextPath: a }, false);
	//                        }
	//                    } else {
	//                        if (!t.fullScreenMode) {
	//                            t.oRouter.navTo("subDetail", { contextPath: a }, false);
	//                        } else {
	//                            t.oRouter.navTo("edit", { contextPath: a }, false);
	//                        }
	//                    }
	//                } else {
	//                    sap.ca.ui.message.showMessageBox({
	//                        type: sap.ca.ui.message.Type.ERROR,
	//                        message: r.data.EditAuthorizationCheck.Message,
	//                        details: null
	//                    });
	//                }
	//            }, null);
	//        } else {
	//            if (!t.fullScreenMode) {
	//                t.oRouter.navTo("subDetail", { contextPath: a }, !sap.ui.Device.system.phone);
	//            } else {
	//                t.oRouter.navTo("edit", { contextPath: a }, !sap.ui.Device.system.phone);
	//            }
	//        }
	//    },
	//    onLogChange: function (e) {
	//        var m = this.getView().getModel();
	//        var d = new Object();
	//        d = { OpportunityChangeDocs: [] };
	//        var h = this.byId("info").getModel("json").getData().Guid;
	//        var p = "/" + this.oConstants.OPP_END_POINT + "(guid'" + h + "')";
	//        this.changeLogFragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOG_CHANGE"));
	//        this.changeLogFragment.setModel(e.getSource().getModel("i18n"), "i18n");
	//        this.changeLogFragment.getModel().setData({ OpportunitySalesTeamSet: [] });
	//        var t = this;
	//        m.read(p, null, ["$expand=" + this.oConstants.CHANGE_DOC_END_POINT], true, function (o, r) {
	//            var E = t.oConstants.CHANGE_DOC_END_POINT;
	//            t.oConstantsFactory.mappingPropertyByEntity(o[E].results, E);
	//            d.OpportunityChangeDocs = o[E].results;
	//            for (var i = 0; i < d.OpportunityChangeDocs.length; i++) {
	//                d.OpportunityChangeDocs[i].DateTime = t.oFormatter.formatDateTime(d.OpportunityChangeDocs[i].UpdateDate, d.OpportunityChangeDocs[i].UpdateTime);
	//            }
	//            t.changeLogFragment.getModel().setData(d);
	//            if (t.isOffline) {
	//                var s = new sap.ui.model.Sorter(t.oConstants.SORT_CHANGE_DOC_BY_DATE_TIME, true, false);
	//                t.changeLogFragment.getContent()[0].getBinding("items").sort(s);
	//            }
	//            if (d.OpportunityChangeDocs.length == 0) {
	//                t.changeLogFragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOLOGCHANGE"));
	//            }
	//        });
	//        this.changeLogFragment.open(e);
	//    },
	//    onCancelLogChange: function (e) {
	//        this.changeLogFragment.close();
	//    },
	//    onEmpBusCardLaunch: function (e) {
	//        if (e.getSource().data("PartnerNumber") !== "") {
	//            var p = "/EmployeeCollection('" + e.getSource().data("PartnerNumber") + "')";
	//            var u;
	//            if (!this.bHideImage) {
	//                u = "$expand=WorkAddress,Company,Photo";
	//            } else {
	//                u = "$expand=WorkAddress,Company";
	//            }
	//            var s = e.getSource();
	//            var t = this;
	//            this.oModel.read(p, null, [u], true, function (o, r) {
	//                jQuery.sap.log.info("oData employee response");
	//                var T = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("EMPLOYEE_BC");
	//                var E = "";
	//                var a = "";
	//                var b = "";
	//                var c = "";
	//                var C = "";
	//                var d = "";
	//                var f = "";
	//                var P = " ";
	//                if (o.WorkAddress) {
	//                    E = o.WorkAddress.mobilePhone;
	//                    a = o.WorkAddress.phone;
	//                    b = o.WorkAddress.email;
	//                    c = o.WorkAddress.department;
	//                    C = o.WorkAddress.address;
	//                }
	//                if (o.Company && o.Company.name1) {
	//                    d = o.Company.name1;
	//                }
	//                if (o.fullName && o.fullName !== "") {
	//                    f = o.fullName;
	//                }
	//                if (o.Photo && o.Photo.__metadata) {
	//                    var m = t.oFormatter.formatPhotoUrl(o.Photo.__metadata.media_src);
	//                    P = t.oFormatter.urlConverter(m);
	//                }
	//                var g = {
	//                    title: T,
	//                    name: f,
	//                    imgurl: P,
	//                    department: c,
	//                    contactmobile: E,
	//                    contactphone: a,
	//                    contactemail: b,
	//                    contactemailsubj: "",
	//                    companyname: d,
	//                    companyaddress: C
	//                };
	//                var h = new sap.ca.ui.quickoverview.EmployeeLaunch(g);
	//                h.openBy(s);
	//            }, function (E) {
	//                jQuery.sap.log.error("oData request for employee failed");
	//            });
	//        }
	//    },
	//    onEmployeeLaunchheader: function (e) {
	//        var c = e.getSource().data("PartnerNumber");
	//        var p = "/AccountCollection('" + c + "')";
	//        var l = "sap-icon://person-placeholder";
	//        var m = this.getView().getModel();
	//        if (this.bHideImage) {
	//            var I = " ";
	//        } else {
	//            m.read(p, null, ["$expand=Logo"], false, function (o, r) {
	//                jQuery.sap.log.info("oData account response");
	//                if (o.Logo && o.Logo.__metadata) {
	//                    var d = o.Logo.__metadata.media_src ? o.Logo.__metadata.media_src : "sap-icon://person-placeholder";
	//                    l = d.toString();
	//                }
	//            });
	//            var I = l;
	//        }
	//        var M = this.getView().getModel();
	//        var a = this.byId("info").getModel("json").getData().ProspectNumber;
	//        var b = e.getSource();
	//        var P = e.getSource().data("PartnerFunctionCode");
	//        if (!a || !c) {
	//            sap.ca.ui.message.showMessageBox({
	//                type: sap.ca.ui.message.Type.ERROR,
	//                message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOT_IN_MAIN_CONTACT")
	//            });
	//        } else {
	//            this.AccountId = a;
	//            this.ContactId = c;
	//            var p = "/ContactCollection(accountID='" + a + "',contactID='" + c + "')?$expand=WorkAddress,Account,Account/MainAddress,Account/MainContact,Account/MainContact/WorkAddress";
	//            var B = [];
	//            B.push(M.createBatchOperation(p, "GET"));
	//            M.addBatchReadOperations(B);
	//            M.submitBatch(jQuery.proxy(function (r) {
	//                var d = { Value: "" };
	//                d.Value = r.__batchResponses[0].data;
	//                if (!d.Value) {
	//                    if (this.isOffline) {
	//                        sap.ca.ui.message.showMessageBox({
	//                            type: sap.ca.ui.message.Type.ERROR,
	//                            message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("BP_NOT_FOUND")
	//                        });
	//                    } else {
	//                        sap.ca.ui.message.showMessageBox({
	//                            type: sap.ca.ui.message.Type.ERROR,
	//                            message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOT_IN_MAIN_CONTACT")
	//                        });
	//                    }
	//                } else {
	//                    if (this.isCrossAppSupportedInOffline("MyContacts") || !this.isOffline) {
	//                        var C = jQuery.proxy(function (e) {
	//                            var n = {};
	//                            n.target = {};
	//                            n.target.semanticObject = "ContactPerson";
	//                            n.target.action = "MyContacts&/display/ContactCollection(contactID='" + this.ContactId + "',accountID='" + this.AccountId + "')";
	//                            if (this.extHookGetExtendedAppDetailsGeneral) {
	//                                n = this.extHookGetExtendedAppDetailsGeneral(n);
	//                            }
	//                            this.navToOtherApp = false;
	//                            return n;
	//                        }, this);
	//                    }
	//                    if (!d.Value.Account) {
	//                        sap.ca.ui.message.showMessageBox({
	//                            type: sap.ca.ui.message.Type.ERROR,
	//                            message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOT_IN_MAIN_CONTACT")
	//                        });
	//                    } else {
	//                        if (d.Value.Account.MainContact) {
	//                            if (d.Value.Account.MainContact.WorkAddress) {
	//                                if (d.Value.WorkAddress) {
	//                                    if (d.Value.Account.MainAddress) {
	//                                        var E = {
	//                                            title: "Contact",
	//                                            name: d.Value.fullName,
	//                                            imgurl: I,
	//                                            department: d.Value.department,
	//                                            contactmobile: d.Value.WorkAddress.mobilePhone,
	//                                            contactphone: d.Value.WorkAddress.phone,
	//                                            contactemail: d.Value.WorkAddress.email,
	//                                            contactemailsubj: "App Genrated Mail",
	//                                            companyname: d.Value.Account.name1,
	//                                            companyaddress: d.Value.Account.MainAddress.address,
	//                                            beforeExtNav: C,
	//                                            companycard: {
	//                                                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                                imgurl: I,
	//                                                companyphone: d.Value.Account.MainAddress.phone,
	//                                                maincontactname: d.Value.Account.MainContact.fullName,
	//                                                maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
	//                                                maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
	//                                                maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
	//                                                maincontactemailsubj: "Automatic Mail for Maincontact"
	//                                            }
	//                                        };
	//                                        var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                        o.openBy(b);
	//                                    } else {
	//                                        var E = {
	//                                            title: "Contact",
	//                                            name: d.Value.fullName,
	//                                            imgurl: I,
	//                                            department: d.Value.department,
	//                                            contactmobile: d.Value.WorkAddress.mobilePhone,
	//                                            contactphone: d.Value.WorkAddress.phone,
	//                                            contactemail: d.Value.WorkAddress.email,
	//                                            contactemailsubj: "App Genrated Mail",
	//                                            companyname: d.Value.Account.name1,
	//                                            beforeExtNav: C,
	//                                            companycard: {
	//                                                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                                imgurl: "sap-icon://person-placeholder",
	//                                                maincontactname: d.Value.Account.MainContact.fullName,
	//                                                maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
	//                                                maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
	//                                                maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
	//                                                maincontactemailsubj: "Automatic Mail for Maincontact"
	//                                            }
	//                                        };
	//                                        var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                        o.openBy(e.getSource());
	//                                    }
	//                                } else {
	//                                    if (d.Value.Account.MainAddress) {
	//                                        var E = {
	//                                            title: "Contact",
	//                                            name: d.Value.fullName,
	//                                            imgurl: I,
	//                                            department: d.Value.department,
	//                                            contactemailsubj: "App Genrated Mail",
	//                                            companyname: d.Value.Account.name1,
	//                                            companyaddress: d.Value.Account.MainAddress.address,
	//                                            beforeExtNav: C,
	//                                            companycard: {
	//                                                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                                imgurl: "sap-icon://person-placeholder",
	//                                                companyphone: d.Value.Account.MainAddress.phone,
	//                                                maincontactname: d.Value.Account.MainContact.fullName,
	//                                                maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
	//                                                maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
	//                                                maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
	//                                                maincontactemailsubj: "Automatic Mail for Maincontact"
	//                                            }
	//                                        };
	//                                        var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                        o.openBy(b);
	//                                    } else {
	//                                        var E = {
	//                                            title: "Contact",
	//                                            name: d.Value.fullName,
	//                                            imgurl: I,
	//                                            department: d.Value.department,
	//                                            contactemailsubj: "App Genrated Mail",
	//                                            companyname: d.Value.Account.name1,
	//                                            beforeExtNav: C,
	//                                            companycard: {
	//                                                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                                imgurl: "sap-icon://person-placeholder",
	//                                                maincontactname: d.Value.Account.MainContact.fullName,
	//                                                maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
	//                                                maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
	//                                                maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
	//                                                maincontactemailsubj: "Automatic Mail for Maincontact"
	//                                            }
	//                                        };
	//                                        var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                        o.openBy(b);
	//                                    }
	//                                }
	//                            } else {
	//                                if (d.Value.WorkAddress) {
	//                                    if (d.Value.Account.MainAddress) {
	//                                        var E = {
	//                                            title: "Contact",
	//                                            name: d.Value.fullName,
	//                                            imgurl: I,
	//                                            department: d.Value.department,
	//                                            contactmobile: d.Value.WorkAddress.mobilePhone,
	//                                            contactphone: d.Value.WorkAddress.phone,
	//                                            contactemail: d.Value.WorkAddress.email,
	//                                            contactemailsubj: "App Genrated Mail",
	//                                            companyname: d.Value.Account.name1,
	//                                            companyaddress: d.Value.Account.MainAddress.address,
	//                                            beforeExtNav: C,
	//                                            companycard: {
	//                                                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                                imgurl: "sap-icon://person-placeholder",
	//                                                companyphone: d.Value.Account.MainAddress.phone,
	//                                                maincontactname: d.Value.Account.MainContact.fullName,
	//                                                maincontactemailsubj: "Automatic Mail for Maincontact"
	//                                            }
	//                                        };
	//                                        var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                        o.openBy(b);
	//                                    } else {
	//                                        var E = {
	//                                            title: "Contact",
	//                                            name: d.Value.fullName,
	//                                            imgurl: I,
	//                                            department: d.Value.department,
	//                                            contactmobile: d.Value.WorkAddress.mobilePhone,
	//                                            contactphone: d.Value.WorkAddress.phone,
	//                                            contactemail: d.Value.WorkAddress.email,
	//                                            contactemailsubj: "App Genrated Mail",
	//                                            companyname: d.Value.Account.name1,
	//                                            beforeExtNav: C,
	//                                            companycard: {
	//                                                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                                imgurl: "sap-icon://person-placeholder",
	//                                                maincontactname: d.Value.Account.MainContact.fullName,
	//                                                maincontactemailsubj: "Automatic Mail for Maincontact"
	//                                            }
	//                                        };
	//                                        var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                        o.openBy(b);
	//                                    }
	//                                } else {
	//                                    if (d.Value.Account.MainAddress) {
	//                                        var E = {
	//                                            title: "Contact",
	//                                            name: d.Value.fullName,
	//                                            imgurl: I,
	//                                            department: d.Value.department,
	//                                            contactemailsubj: "App Genrated Mail",
	//                                            companyname: d.Value.Account.name1,
	//                                            companyaddress: d.Value.Account.MainAddress.address,
	//                                            beforeExtNav: C,
	//                                            companycard: {
	//                                                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                                imgurl: "sap-icon://person-placeholder",
	//                                                companyphone: d.Value.Account.MainAddress.phone,
	//                                                maincontactname: d.Value.Account.MainContact.fullName,
	//                                                maincontactemailsubj: "Automatic Mail for Maincontact"
	//                                            }
	//                                        };
	//                                        var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                        o.openBy(b);
	//                                    } else {
	//                                        var E = {
	//                                            title: "Contact",
	//                                            name: d.Value.fullName,
	//                                            imgurl: I,
	//                                            department: d.Value.department,
	//                                            contactemailsubj: "App Genrated Mail",
	//                                            companyname: d.Value.Account.name1,
	//                                            beforeExtNav: C,
	//                                            companycard: {
	//                                                title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                                imgurl: "sap-icon://person-placeholder",
	//                                                maincontactname: d.Value.Account.MainContact.fullName,
	//                                                maincontactemailsubj: "Automatic Mail for Maincontact"
	//                                            }
	//                                        };
	//                                        var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                        o.openBy(b);
	//                                    }
	//                                }
	//                            }
	//                        } else {
	//                            if (d.Value.WorkAddress) {
	//                                if (d.Value.Account.MainAddress) {
	//                                    var E = {
	//                                        title: "Contact",
	//                                        name: d.Value.fullName,
	//                                        imgurl: I,
	//                                        department: d.Value.department,
	//                                        contactmobile: d.Value.WorkAddress.mobilePhone,
	//                                        contactphone: d.Value.WorkAddress.phone,
	//                                        contactemail: d.Value.WorkAddress.email,
	//                                        contactemailsubj: "App Genrated Mail",
	//                                        companyname: d.Value.Account.name1,
	//                                        companyaddress: d.Value.Account.MainAddress.address,
	//                                        beforeExtNav: C,
	//                                        companycard: {
	//                                            title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                            imgurl: "sap-icon://person-placeholder",
	//                                            companyphone: d.Value.Account.MainAddress.phone
	//                                        }
	//                                    };
	//                                    var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                    o.openBy(b);
	//                                } else {
	//                                    var E = {
	//                                        title: "Contact",
	//                                        name: d.Value.fullName,
	//                                        imgurl: I,
	//                                        department: d.Value.department,
	//                                        contactmobile: d.Value.WorkAddress.mobilePhone,
	//                                        contactphone: d.Value.WorkAddress.phone,
	//                                        contactemail: d.Value.WorkAddress.email,
	//                                        contactemailsubj: "App Genrated Mail",
	//                                        companyname: d.Value.Account.name1,
	//                                        beforeExtNav: C,
	//                                        companycard: {
	//                                            title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                            imgurl: "sap-icon://person-placeholder"
	//                                        }
	//                                    };
	//                                    var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                    o.openBy(b);
	//                                }
	//                            } else {
	//                                if (d.Value.Account.MainAddress) {
	//                                    var E = {
	//                                        title: "Contact",
	//                                        name: d.Value.fullName,
	//                                        imgurl: I,
	//                                        department: d.Value.department,
	//                                        contactemailsubj: "App Genrated Mail",
	//                                        companyname: d.Value.Account.name1,
	//                                        companyaddress: d.Value.Account.MainAddress.address,
	//                                        beforeExtNav: C,
	//                                        companycard: {
	//                                            title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                            imgurl: "sap-icon://person-placeholder",
	//                                            companyphone: d.Value.Account.MainAddress.phone
	//                                        }
	//                                    };
	//                                    var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                    o.openBy(b);
	//                                } else {
	//                                    var E = {
	//                                        title: "Contact",
	//                                        name: d.Value.fullName,
	//                                        imgurl: I,
	//                                        department: d.Value.department,
	//                                        contactemailsubj: "App Genrated Mail",
	//                                        companyname: d.Value.Account.name1,
	//                                        beforeExtNav: C,
	//                                        companycard: {
	//                                            title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
	//                                            imgurl: "sap-icon://person-placeholder"
	//                                        }
	//                                    };
	//                                    var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
	//                                    o.openBy(b);
	//                                }
	//                            }
	//                        }
	//                    }
	//                }
	//            }, this), jQuery.proxy(function (E) {
	//                sap.ca.ui.message.showMessageBox({
	//                    type: sap.ca.ui.message.Type.ERROR,
	//                    message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOT_IN_MAIN_CONTACT")
	//                });
	//            }, this), true);
	//        }
	//    },

	onAdjustPanelExpand: function (e) { // Display
		var aPanels = ["projectPanelID", "aromaPanelID", "sosPanelID", "pypPanelID", "ilgiliPanelID", "NotlarID"];
		var sID = e.getSource().sId.split("--")[1];
		if (e.mParameters.expand) {
			for (var i = 0; i < aPanels.length; i++) {
				if (aPanels[i] !== sID) {
					var oPanel = sap.ui.core.Fragment.byId("displayAromaFragment", aPanels[i]);
					oPanel.setExpanded(false);
				}
			}
		}
	},

	onAdjustPanelExpand_E: function (e) { //EDIT
		var aPanels = ["projectPanelID", "aromaPanelID", "sosPanelID", "pypPanelID", "ilgiliPanelID", "NotlarPanelID"];
		var sID = e.getSource().sId.split("--")[1];
		if (e.mParameters.expand) {
			for (var i = 0; i < aPanels.length; i++) {
				if (aPanels[i] !== sID) {
					var oPanel = sap.ui.core.Fragment.byId("editAromaFragment", aPanels[i]);
					oPanel.setExpanded(false);
				}
			}
		}
	},

	onAdjustPanelExpand_C: function (e) { //CREATE
		var aPanels = ["panelID_1", "panelID_2", "panelID_3", "panelID_4", "panelID_5"];
		var sID = e.getSource().sId.split("--")[1];
		if (e.mParameters.expand) {
			for (var i = 0; i < aPanels.length; i++) {
				if (aPanels[i] !== sID) {
					var oPanel = sap.ui.core.Fragment.byId("createAromaFragment_2", aPanels[i]);
					oPanel.setExpanded(false);
				}
			}
		}
	},

	onCheckPypTanim: function (e) {
		var oInput = sap.ui.core.Fragment.byId("createAromaFragment_2", "ZZPYP_TANIM");
		if (e.mParameters.value.length > 0) {
			oInput.setValueState(sap.ui.core.ValueState.None);
		} else {
			oInput.setValueState(sap.ui.core.ValueState.Error);
		}
	},

	onCheckMusteriAdi: function (e) {
		var oInput = sap.ui.core.Fragment.byId("createAromaFragment_2", "ZZMUSTERI_ADI");
		if (e.mParameters.value.length > 0) {
			oInput.setValueState(sap.ui.core.ValueState.None);
		} else {
			oInput.setValueState(sap.ui.core.ValueState.Error);
		}
	},

	onCheckMandatoryInput: function (e) {
		var oSource = e.getSource();
		var sState = oSource.getValueState();
		var sValue = e.mParameters.value;
		if (sState === "Error") {
			if (sValue.length > 0) {
				oSource.setValueState("None");
			} else {
				oSource.setValueState("Error");
			}
		}
	},

	onDisplayMalzemeDetail: function (e) {
		var oSelf = this;
		if (!this.TS_MalzemeDetail) {
			this.TS_MalzemeDetail = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.AromaMalzemeDisplay", this);
			this.TS_MalzemeDetail.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.TS_MalzemeDetail);
		}
		this.TS_MalzemeDetail.open();

		var oModel = this.getView().getModel();
		var oCombo = this.getView().getModel("ComboBox");
		var oParent = e.getSource().getParent();
		var oNodeState = oParent._oNodeState;
		var aNodeState = oNodeState.groupID.split("/");
		//var aNodeState = "/1/1_Childs_0/1_Childs_0_Childs_0/".split("/");
		var sLink = "";
		for (var i = 1; i < aNodeState.length; i++) {
			if (i === 1) {
				sLink += aNodeState[i];
			}
			if (aNodeState[i].indexOf("Childs") > 0) {
				var c = aNodeState[i].split("_");
				sLink += "/" + "Childs/" + c[c.length - 1];
			}
		}

		//var sParentID = oNodeState.parentGroupID.match(/\d+/)[0];
		//var sChildID = oNodeState.groupID.split("_")[2].split("/")[0];
		var oDetail = this.getView().getModel("AromaDetail");
		//var sPath = "/PYPList/PYPs/" + sParentID + "/Childs/" + sChildID;
		var sPath = "/PYPList/PYPs/" + sLink;
		var sHeaderGuid = oDetail.getProperty("/Detail").HeaderGuid;
		var oPath = oDetail.getProperty(sPath);
		var sMalzemeNo = oPath.MalzemeNo;
		var sJenMalzemeNo = oPath.JenMalzemeNo;
		var sPypNo = oPath.PypNo;
		var sTeslimatNo = oPath.TeslimatNo;
		var oGuid = new sap.ui.model.Filter({
			path: "Guid",
			operator: sap.ui.model.FilterOperator.EQ,
			value1: sHeaderGuid
		});
		var oMalzeme = new sap.ui.model.Filter({
			path: "MalzemeNo",
			operator: sap.ui.model.FilterOperator.EQ,
			value1: sMalzemeNo
		});
		var oJen = new sap.ui.model.Filter({
			path: "JenMalzemeNo",
			operator: sap.ui.model.FilterOperator.EQ,
			value1: sJenMalzemeNo
		});
		var oPyp = new sap.ui.model.Filter({
			path: "PypNo",
			operator: sap.ui.model.FilterOperator.EQ,
			value1: sPypNo
		});
		var oTeslimat = new sap.ui.model.Filter({
			path: "TeslimatNo",
			operator: sap.ui.model.FilterOperator.EQ,
			value1: sTeslimatNo
		});
		oModel.read("/CustomizingProductTreeSet", {
			filters: [oGuid, oMalzeme, oJen, oPyp, oTeslimat],
			success: function (resp) {
				oCombo.setProperty("/MalzemeList", resp.results);
			},
			error: function (err) {
				oSelf._onParseErrorMsg(err);
			}
		});
	},

	onEmployeeLaunch: function (e) {
		var m = this.getView().getModel();
		var a = this.byId("info").getModel("json").getData().ProspectNumber;
		var b = e.getSource();
		var c = e.getSource().data("PartnerNumber");
		var P = e.getSource().data("PartnerFunctionCode");
		var I;
		if (!this.bHideImage) {
			var I = e.getSource().data("Image");
		} else
			var I = " ";
		if (P != "00000015" && P != "00000021") {
			sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOT_CONTACT_OR_ACCOUNT"));
		} else if (P == "00000015") {
			var d;
			if (!a || !c) {
				sap.ca.ui.message.showMessageBox({
					type: sap.ca.ui.message.Type.ERROR,
					message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOT_IN_MAIN_CONTACT")
				});
			} else {
				this.AccountId = a;
				this.ContactId = c;
				var p = "/ContactCollection(accountID='" + a + "',contactID='" + c + "')?$expand=" +
					"WorkAddress,Account,Account/MainAddress,Account/MainContact,Account/MainContact/WorkAddress";
				var B = [];
				B.push(m.createBatchOperation(p, "GET"));
				m.addBatchReadOperations(B);
				m.submitBatch(jQuery.proxy(function (r) {
					var d = {
						Value: ""
					};
					d.Value = r.__batchResponses[0].data;
					if (!d.Value) {
						sap.ca.ui.message.showMessageBox({
							type: sap.ca.ui.message.Type.ERROR,
							message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOT_IN_MAIN_CONTACT")
						});
					} else {
						if (this.isCrossAppSupportedInOffline("MyContacts") || !this.isOffline) {
							var C = jQuery.proxy(function (e) {
								var n = {};
								n.target = {};
								n.target.semanticObject = "ContactPerson";
								n.target.action = "MyContacts&/display/ContactCollection(contactID='" + this.ContactId + "',accountID='" + this.AccountId +
									"')";
								if (this.extHookGetExtendedAppDetailsGeneral) {
									n = this.extHookGetExtendedAppDetailsGeneral(n);
								}
								this.navToOtherApp = true;
								this.oRouter.detachRouteMatched(this.detailRouteMatched, this);
								return n;
							}, this);
						}
						if (!d.Value.Account) {
							sap.ca.ui.message.showMessageBox({
								type: sap.ca.ui.message.Type.ERROR,
								message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOT_IN_MAIN_CONTACT")
							});
						} else {
							if (d.Value.Account.MainContact) {
								if (d.Value.Account.MainContact.WorkAddress) {
									if (d.Value.WorkAddress) {
										if (d.Value.Account.MainAddress) {
											var E = {
												title: "Contact",
												description: a, //this.sProspectNumber, // Customizing
												name: d.Value.fullName,
												imgurl: I,
												department: d.Value.department,
												contactmobile: d.Value.WorkAddress.mobilePhone,
												contactphone: d.Value.WorkAddress.phone,
												contactemail: d.Value.WorkAddress.email,
												contactemailsubj: "App Genrated Mail",
												companyname: d.Value.Account.name1,
												companyaddress: d.Value.Account.MainAddress.address,
												beforeExtNav: C,
												companycard: {
													title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
													imgurl: I,
													companyphone: d.Value.Account.MainAddress.phone,
													maincontactname: d.Value.Account.MainContact.fullName,
													maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
													maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
													maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
													maincontactemailsubj: "Automatic Mail for Maincontact"
												}
											};
											var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
											o.openBy(b);
										} else {
											var E = {
												title: "Contact",
												name: d.Value.fullName,
												imgurl: I,
												department: d.Value.department,
												contactmobile: d.Value.WorkAddress.mobilePhone,
												contactphone: d.Value.WorkAddress.phone,
												contactemail: d.Value.WorkAddress.email,
												contactemailsubj: "App Genrated Mail",
												companyname: d.Value.Account.name1,
												beforeExtNav: C,
												companycard: {
													title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
													imgurl: "sap-icon://person-placeholder",
													maincontactname: d.Value.Account.MainContact.fullName,
													maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
													maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
													maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
													maincontactemailsubj: "Automatic Mail for Maincontact"
												}
											};
											var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
											o.openBy(e.getSource());
										}
									} else {
										if (d.Value.Account.MainAddress) {
											var E = {
												title: "Contact",
												name: d.Value.fullName,
												imgurl: I,
												department: d.Value.department,
												contactemailsubj: "App Genrated Mail",
												companyname: d.Value.Account.name1,
												companyaddress: d.Value.Account.MainAddress.address,
												beforeExtNav: C,
												companycard: {
													title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
													imgurl: "sap-icon://person-placeholder",
													companyphone: d.Value.Account.MainAddress.phone,
													maincontactname: d.Value.Account.MainContact.fullName,
													maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
													maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
													maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
													maincontactemailsubj: "Automatic Mail for Maincontact"
												}
											};
											var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
											o.openBy(b);
										} else {
											var E = {
												title: "Contact",
												name: d.Value.fullName,
												imgurl: I,
												department: d.Value.department,
												contactemailsubj: "App Genrated Mail",
												companyname: d.Value.Account.name1,
												beforeExtNav: C,
												companycard: {
													title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
													imgurl: "sap-icon://person-placeholder",
													maincontactname: d.Value.Account.MainContact.fullName,
													maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
													maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
													maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
													maincontactemailsubj: "Automatic Mail for Maincontact"
												}
											};
											var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
											o.openBy(b);
										}
									}
								} else {
									if (d.Value.WorkAddress) {
										if (d.Value.Account.MainAddress) {
											var E = {
												title: "Contact",
												name: d.Value.fullName,
												imgurl: I,
												department: d.Value.department,
												contactmobile: d.Value.WorkAddress.mobilePhone,
												contactphone: d.Value.WorkAddress.phone,
												contactemail: d.Value.WorkAddress.email,
												contactemailsubj: "App Genrated Mail",
												companyname: d.Value.Account.name1,
												companyaddress: d.Value.Account.MainAddress.address,
												beforeExtNav: C,
												companycard: {
													title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
													imgurl: "sap-icon://person-placeholder",
													companyphone: d.Value.Account.MainAddress.phone,
													maincontactname: d.Value.Account.MainContact.fullName,
													maincontactemailsubj: "Automatic Mail for Maincontact"
												}
											};
											var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
											o.openBy(b);
										} else {
											var E = {
												title: "Contact",
												name: d.Value.fullName,
												imgurl: I,
												department: d.Value.department,
												contactmobile: d.Value.WorkAddress.mobilePhone,
												contactphone: d.Value.WorkAddress.phone,
												contactemail: d.Value.WorkAddress.email,
												contactemailsubj: "App Genrated Mail",
												companyname: d.Value.Account.name1,
												beforeExtNav: C,
												companycard: {
													title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
													imgurl: "sap-icon://person-placeholder",
													maincontactname: d.Value.Account.MainContact.fullName,
													maincontactemailsubj: "Automatic Mail for Maincontact"
												}
											};
											var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
											o.openBy(b);
										}
									} else {
										if (d.Value.Account.MainAddress) {
											var E = {
												title: "Contact",
												name: d.Value.fullName,
												imgurl: I,
												department: d.Value.department,
												contactemailsubj: "App Genrated Mail",
												companyname: d.Value.Account.name1,
												companyaddress: d.Value.Account.MainAddress.address,
												beforeExtNav: C,
												companycard: {
													title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
													imgurl: "sap-icon://person-placeholder",
													companyphone: d.Value.Account.MainAddress.phone,
													maincontactname: d.Value.Account.MainContact.fullName,
													maincontactemailsubj: "Automatic Mail for Maincontact"
												}
											};
											var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
											o.openBy(b);
										} else {
											var E = {
												title: "Contact",
												name: d.Value.fullName,
												imgurl: I,
												department: d.Value.department,
												contactemailsubj: "App Genrated Mail",
												companyname: d.Value.Account.name1,
												beforeExtNav: C,
												companycard: {
													title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
													imgurl: "sap-icon://person-placeholder",
													maincontactname: d.Value.Account.MainContact.fullName,
													maincontactemailsubj: "Automatic Mail for Maincontact"
												}
											};
											var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
											o.openBy(b);
										}
									}
								}
							} else {
								if (d.Value.WorkAddress) {
									if (d.Value.Account.MainAddress) {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactmobile: d.Value.WorkAddress.mobilePhone,
											contactphone: d.Value.WorkAddress.phone,
											contactemail: d.Value.WorkAddress.email,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											companyaddress: d.Value.Account.MainAddress.address,
											beforeExtNav: C,
											companycard: {
												title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
												imgurl: "sap-icon://person-placeholder",
												companyphone: d.Value.Account.MainAddress.phone
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b);
									} else {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactmobile: d.Value.WorkAddress.mobilePhone,
											contactphone: d.Value.WorkAddress.phone,
											contactemail: d.Value.WorkAddress.email,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											beforeExtNav: C,
											companycard: {
												title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
												imgurl: "sap-icon://person-placeholder"
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b);
									}
								} else {
									if (d.Value.Account.MainAddress) {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											companyaddress: d.Value.Account.MainAddress.address,
											beforeExtNav: C,
											companycard: {
												title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
												imgurl: "sap-icon://person-placeholder",
												companyphone: d.Value.Account.MainAddress.phone
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b);
									} else {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											beforeExtNav: C,
											companycard: {
												title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
												imgurl: "sap-icon://person-placeholder"
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b);
									}
								}
							}
						}
					}
				}, this), jQuery.proxy(function (E) {
					sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ERROR"));
				}, this), true);
			}
		} else if (P == "00000021") {
			this.accountNum = a;
			if (!a) {
				sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_IS_NULL"));
			} else {
				var p = "AccountCollection(accountID='" + a + "')?$expand=MainAddress,MainContact/WorkAddress,MainContact";
				var B = [];
				var t = this;
				B.push(m.createBatchOperation(p, "GET"));
				m.addBatchReadOperations(B);
				m.submitBatch(jQuery.proxy(function (r) {
					var M = {
						Value: ""
					};
					M.Value = r.__batchResponses[0].data;
					if (!M.Value) {
						if (this.isOffline) {
							sap.ca.ui.message.showMessageBox({
								type: sap.ca.ui.message.Type.ERROR,
								message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("BP_NOT_FOUND")
							});
						} else {
							sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ERROR"));
						}
					} else {
						if (this.isCrossAppSupportedInOffline("MyAccounts") || !this.isOffline) {
							var C = jQuery.proxy(function (e) {
								if (this.isOffline) {
									//var A = "MyAccounts&/detail/AccountCollection(accountID='" + this.accountNum + "')";
									//Customizing
									var A = "create&/detail/AccountCollection(accountID='" + this.accountNum + "')";
								} else {
									//var A = "MyAccounts&/detail/AccountCollection('" + this.accountNum + "')";
									//Customizing
									var A = "create&/detail/AccountCollection('" + this.accountNum + "')";
								}
								this.oRouter.detachRouteMatched(this.detailRouteMatched, this);
								var g = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
								this.oCrossAppNavigator = g && g("CrossApplicationNavigation");
								var n = {
									target: {
										//semanticObject: "Account",
										//Customizing
										semanticObject: "ZMyAccounts",
										action: A
									}
								};
								if (this.extHookGetExtendedAppDetailsGeneral) {
									n = this.extHookGetExtendedAppDetailsGeneral(n);
								}
								if (this.oCrossAppNavigator) {
									this.oCrossAppNavigator.toExternal(n);
								}
							}, this);
						}
						if (M.Value.MainContact) {
							if (M.Value.MainContact.WorkAddress) {
								if (M.Value.MainAddress) {
									var o = {
										title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
										imgurl: I,
										companyname: M.Value.name1,
										companyphone: M.Value.MainAddress.phone,
										companyaddress: M.Value.MainAddress.address,
										maincontactname: M.Value.MainContact.fullName,
										maincontactmobile: M.Value.MainContact.WorkAddress.mobilePhone,
										maincontactphone: M.Value.MainContact.WorkAddress.phone,
										maincontactemail: M.Value.MainContact.WorkAddress.email,
										maincontactemailsubj: "Automatic Mail for Maincontact",
										beforeExtNav: C
									};
									var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
									f.oQuickView.oInitialConfig.headerSubTitle = this.sProspectNumber;
									f.openBy(b);
								} else {
									var o = {
										title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
										imgurl: I,
										companyname: M.Value.name1,
										maincontactname: M.Value.MainContact.fullName,
										maincontactmobile: M.Value.MainContact.WorkAddress.mobilePhone,
										maincontactphone: M.Value.MainContact.WorkAddress.phone,
										maincontactemail: M.Value.MainContact.WorkAddress.email,
										maincontactemailsubj: "Automatic Mail for Maincontact",
										beforeExtNav: C
									};
									var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
									f.openBy(b);
								}
							} else {
								if (M.Value.MainAddress) {
									var o = {
										title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
										imgurl: I,
										companyname: M.Value.name1,
										companyphone: M.Value.MainAddress.phone,
										companyaddress: M.Value.MainAddress.address,
										maincontactname: M.Value.MainContact.fullName,
										beforeExtNav: C
									};
									var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
									f.openBy(b);
								} else {
									var o = {
										title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
										imgurl: I,
										companyname: M.Value.name1,
										maincontactname: M.Value.MainContact.fullName,
										beforeExtNav: C
									};
									var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
									f.openBy(b);
								}
							}
						} else {
							if (M.Value.MainAddress) {
								var o = {
									title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
									imgurl: I,
									companyname: M.Value.name1,
									companyphone: M.Value.MainAddress.phone,
									companyaddress: M.Value.MainAddress.address,
									beforeExtNav: C
								};
								var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
								f.openBy(b);
							} else {
								var o = {
									title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_BC"),
									imgurl: I,
									companyname: M.Value.name1,
									beforeExtNav: C
								};
								var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
								f.openBy(b);
							}
						}
					}
				}, this), jQuery.proxy(function (E) {
					sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ERROR"));
				}, this), true);
			}
		}
	},
	//    onAttachmentSelected: function (e) {
	//        var s = e.getParameter("listItem").getBindingContext().getObject();
	//        var w = window.open(s.__metadata.media_src, "_blank");
	//        w.focus();
	//    },
	//    getRuleForPartnerFunction: function (p) {
	//        if (this.partnerDeterminationMap[this.transactionType]) {
	//            for (var i = 0; i < this.partnerDeterminationMap[this.transactionType].length; i++) {
	//                if (this.partnerDeterminationMap[this.transactionType][i].PartnerFunctionCode === p) {
	//                    return this.partnerDeterminationMap[this.transactionType][i];
	//                }
	//            }
	//        }
	//        return null;
	//    },
	//    getCountForPartnerFunction: function (p) {
	//        var c = 0;
	//        var a = this.byId("Sales_Team").getModel("json").getData().OpportunitySalesTeamSet;
	//        for (var i = 0; i < a.length; i++) {
	//            if (a[i].PartnerFunctionCode === p) {
	//                c++;
	//            }
	//        }
	//        return c;
	//    },
	//    enableAddParticipantsButton: function () {
	//        var p = this.participantsF4Fragment.getContent()[2];
	//        if (p.getSelectedItems().length > 0) {
	//            this.participantsF4Fragment.getBeginButton().setEnabled(true);
	//        } else {
	//            this.participantsF4Fragment.getBeginButton().setEnabled(false);
	//        }
	//    },
	//    searchParticipants: function () {
	//        var s = this.participantsF4Fragment.getContent()[0];
	//        this.participantsF4Fragment.getBeginButton().setEnabled(false);
	//        s.fireChange({ selectedItem: s.getSelectedItem() });
	//    },
	//    onPartnerFunctionChange: function (e) {
	//        if (!this.participantsF4MultiselectFragment) {
	//            this.participantsF4MultiselectFragment = new sap.ui.xmlfragment(this.createId("participantsF4Multiselect_S5"), "cus.crm.opportunity.view.ParticipantsF4Multiselect", this);
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel({}), "json");
	//            this.participantsF4MultiselectFragment.setModel(this.oI18nModel, "i18n");
	//        }
	//        if (e.getSource().getBindingContext("json")) {
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].setMode("SingleSelectLeft");
	//        }
	//        var m = this.getView().getModel(), M = m.getServiceMetadata();
	//        var r = false;
	//        for (var i = 0; i < M.dataServices.schema[0].entityType.length; i++) {
	//            if (M.dataServices.schema[0].entityType[i].name == "Account") {
	//                var v = M.dataServices.schema[0].entityType[i].navigationProperty;
	//                if (v && v.length > 0)
	//                    for (var j = 0; j < v.length; j++) {
	//                        if (v[j].name == "Relationships") {
	//                            r = true;
	//                            break;
	//                        }
	//                    }
	//            }
	//        }
	//        var p = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions"), n = this.participantsF4MultiselectFragment.getContent()[0];
	//        if (!p)
	//            p = this.partnerDeterminationMap[this.transactionType];
	//        var a = false;
	//        var I;
	//        var b = false;
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
	//            if (this.iIndexStatus) {
	//                I = this.IndexValue;
	//            } else {
	//                o = this.selectedBuffer.getBindingContext("json");
	//            }
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
	//            if (this.iIndexStatus) {
	//                I = this.IndexValue;
	//            } else {
	//                o = this.selectedBuffer.getBindingContext("json");
	//            }
	//        } else if (d) {
	//        } else if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() == "SingleSelectLeft") {
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getSubHeader().getContentLeft()[0].clear();
	//            if (e.getSource().getBindingContext("json")) {
	//                var c = e.getSource().getBindingContext("json").getObject();
	//                this.oCurrentPartnerBuffer = c;
	//                this.itemToDelete = c;
	//            } else {
	//                c = this.oCurrentPartnerBuffer;
	//                a = true;
	//            }
	//            if (!this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType")) {
	//                this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "PartnersBasedOnType");
	//            }
	//            var f = this.partnerDeterminationMap[this.transactionType];
	//            var g;
	//            var h;
	//            for (var k = 0; k < f.length; k++) {
	//                if (f[k].PartnerFunctionCode == c.PartnerFunctionCode) {
	//                    g = f[k].PartnerFunctionCategory;
	//                    h = f[k].PartnerFunctionName;
	//                }
	//            }
	//            for (var k = 0; k < p.length; k++) {
	//                if (h == p[k].PartnerFunctionName) {
	//                    I = k;
	//                    this.IndexValue = k;
	//                    this.iIndexStatus = true;
	//                }
	//                t = true;
	//            }
	//        } else {
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getSubHeader().getContentLeft()[0].clear();
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//            var q = e.getParameter("listItem");
	//            this.selectedBuffer = q;
	//            o = q.getBindingContext("json");
	//            t = true;
	//        }
	//        this.accountId = this.byId("info").getModel("json").getData().ProspectNumber;
	//        this.accountName = this.byId("opportunityHeader").getModel("json").getData().ProspectName;
	//        var u = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory");
	//        var w = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp");
	//        if (!this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType")) {
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "PartnersBasedOnType");
	//        }
	//        if (!this.accountName || this.accountName == "")
	//            this.accountName = this.accountId;
	//        if (!this.iIndexStatus)
	//            I = p.indexOf(o.getObject());
	//        this.PartnerName = p[I]["PartnerFunctionName"];
	//        switch (p[I]["PartnerFunctionCategory"]) {
	//        case "0005":
	//        case "0008":
	//            var y, z;
	//            y = jQuery.proxy(function (G, H, R) {
	//                var J = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType");
	//                J.setProperty("/" + encodeURIComponent(G), H.results);
	//                for (var x = 0; x < H.results.length; x++) {
	//                    if (H.results[x].fullName == "")
	//                        H.results[x].fullName = " ";
	//                }
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(G), this.employeeListItemTemplate1, null, []);
	//            }, this, p[I]["PartnerFunctionName"]);
	//            z = jQuery.proxy(function (x) {
	//            }, this);
	//            if (t) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                this.oModel.read("/AccountCollection(accountID='" + this.accountId + "')/EmployeeResponsibles", null, null, false, y, z);
	//            } else if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible() && s) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                this.oModel.read("/AccountCollection(accountID='" + this.accountId + "')/EmployeeResponsibles", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, y, z);
	//            } else if (s.length > 0) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                this.oModel.read("/EmployeeCollection", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, y, z);
	//            } else {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                this.oModel.read("/EmployeeCollection", null, null, false, y, z);
	//            }
	//            if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() == "SingleSelectLeft") {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].setShowNavButton(false);
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getFooter().getContentRight()[0].setEnabled(false);
	//                var P = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getItems();
	//                var A = this.oCurrentPartnerBuffer.PartnerNumber;
	//                for (var B = 0; B < P.length; B++) {
	//                    if (P[B].getDescription() == A) {
	//                        P[B].setSelected(true);
	//                    }
	//                }
	//            } else {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].destroyItems();
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.employeeListItemTemplate1, null, []);
	//                var P = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getItems();
	//                var C = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                var E;
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//                    var D = u.getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (D)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < D.length; k++) {
	//                                if (D[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                    var F = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (F)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < F.length; k++) {
	//                                if (F[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1")) {
	//                    var F = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (F)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < F.length; k++) {
	//                                if (F[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2")) {
	//                    var F = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (F)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < F.length; k++) {
	//                                if (F[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//            }
	//            break;
	//        case "0007":
	//            var y, z;
	//            y = jQuery.proxy(function (G, H, R) {
	//                var J = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType");
	//                J.setProperty("/" + encodeURIComponent(G), H.results);
	//                for (var x = 0; x < H.results.length; x++) {
	//                    if (H.results[x].fullName == "")
	//                        H.results[x].fullName = " ";
	//                }
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(G), this.contactListItemTemplate1, null, []);
	//            }, this, p[I]["PartnerFunctionName"]);
	//            z = jQuery.proxy(function (x) {
	//            }, this);
	//            if (t) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                this.oModel.read("AccountCollection('" + this.accountId + "')/Contacts", null, null, false, y, z);
	//            } else if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible() && s) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                this.oModel.read("AccountCollection('" + this.accountId + "')/Contacts", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, y, z);
	//            } else if (s.length > 0) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                this.oModel.read("/ContactCollection", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, y, z);
	//            } else {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                this.oModel.read("/ContactCollection", null, null, false, y, z);
	//            }
	//            if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() == "SingleSelectLeft") {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].setShowNavButton(false);
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getFooter().getContentRight()[0].setEnabled(false);
	//                var P = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getItems();
	//                var A = this.oCurrentPartnerBuffer.PartnerNumber;
	//                for (var B = 0; B < P.length; B++) {
	//                    if (P[B].getDescription() == A) {
	//                        P[B].setSelected(true);
	//                    }
	//                }
	//            } else {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].destroyItems();
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.contactListItemTemplate1, null, []);
	//                var P = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getItems();
	//                var C = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                var E;
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//                    var D = u.getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (D)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < D.length; k++) {
	//                                if (D[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                    var F = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (F)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < F.length; k++) {
	//                                if (F[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1")) {
	//                    var F = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (F)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < F.length; k++) {
	//                                if (F[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2")) {
	//                    var F = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (F)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < F.length; k++) {
	//                                if (F[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//            }
	//            break;
	//        default:
	//            var y, z;
	//            y = jQuery.proxy(function (G, H, R) {
	//                var J = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType");
	//                J.setProperty("/" + encodeURIComponent(G), H.results);
	//                for (var x = 0; x < H.results.length; x++) {
	//                    if (H.results[x].fullName == "")
	//                        H.results[x].fullName = " ";
	//                }
	//                if (t && r || s.length > 0 && this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible() && r) {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(G), this.accountListItemTemplate2, null, []);
	//                } else if (s.length > 0) {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(G), this.accountListItemTemplate1, null, []);
	//                } else {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(G), this.accountListItemTemplate1, null, []);
	//                }
	//            }, this, p[I]["PartnerFunctionName"]);
	//            z = jQuery.proxy(function (x) {
	//            }, this);
	//            if (t && r) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getContent()[0].setText(this.oResourceBundle.getText("FILTER_ID") + ":" + this.accountName);
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//                this.oModel.read("AccountCollection('" + this.accountId + "')/Relationships?$filter=relationshipCategory eq '" + p[I].RelationshipCategory + "' ", null, null, false, y, z);
	//            } else if (s.length > 0 && r && this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible()) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(true);
	//                this.oModel.read("AccountCollection('" + this.accountId + "')/Relationships?$filter=relationshipCategory eq '" + p[I].RelationshipCategory + "'and substringof('" + s + "',account2FullName) ", null, null, false, y, z);
	//            } else if (s.length > 0) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                this.oModel.read("/AccountCollection", null, "$top=200&$filter=substringof(%27" + encodeURIComponent(s) + "%27,fullName)", false, y, z);
	//            } else {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().setVisible(false);
	//                this.oModel.read("/AccountCollection", null, null, false, y, z);
	//            }
	//            if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() == "SingleSelectLeft") {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].setShowNavButton(false);
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getFooter().getContentRight()[0].setEnabled(false);
	//                var P = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getItems();
	//                var A = this.oCurrentPartnerBuffer.PartnerNumber;
	//                for (var B = 0; B < P.length; B++) {
	//                    if (P[B].getDescription() == A) {
	//                        P[B].setSelected(true);
	//                    }
	//                }
	//            } else {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].destroyItems();
	//                if (t && r || this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getInfoToolbar().getVisible() && r) {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.accountListItemTemplate2, null, []);
	//                } else if (s.length > 0) {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.accountListItemTemplate1, null, []);
	//                } else {
	//                    this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].bindItems("PartnersBasedOnType>/" + encodeURIComponent(p[I]["PartnerFunctionName"]), this.accountListItemTemplate1, null, []);
	//                }
	//                var P = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getItems();
	//                var C = this.participantsF4MultiselectFragment.getModel("PartnersBasedOnType").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                var E;
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategory")) {
	//                    var D = u.getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (D)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < D.length; k++) {
	//                                if (D[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                    var F = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (F)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < F.length; k++) {
	//                                if (F[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1")) {
	//                    var F = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp1").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (F)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < F.length; k++) {
	//                                if (F[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//                if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2")) {
	//                    var F = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp2").getProperty("/" + encodeURIComponent(p[I]["PartnerFunctionName"]));
	//                    if (F)
	//                        for (var i = 0; i < P.length; i++) {
	//                            for (var k = 0; k < F.length; k++) {
	//                                if (F[k]["key"] === P[i].getDescription()) {
	//                                    P[i].setSelected(true);
	//                                }
	//                            }
	//                        }
	//                }
	//            }
	//            break;
	//        }
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].setTitle(this.oResourceBundle.getText("PARTNERS") + " " + p[I]["PartnerFunctionName"]);
	//        n._sSelectedPartnerCategory = p[I]["PartnerFunctionName"];
	//        n._sSelectedPartnerCategoryCode = p[I]["PartnerFunctionCategory"];
	//        n.to(this.participantsF4MultiselectFragment.getContent()[0].getPages()[1]);
	//        if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() == "SingleSelectLeft")
	//            this.participantsF4MultiselectFragment.open();
	//    },
	//    bindS3Header: function (d) {
	//        var s = this.byId("opportunityHeader");
	//        var l = "sap-icon://person-placeholder";
	//        var j = s.getModel("json");
	//        if (this.isOffline) {
	//            var p = "/AccountCollection('" + d.prospectNumber + "')";
	//        } else {
	//            var p = "/AccountCollection('" + d.ProspectNumber + "')";
	//        }
	//        var D = j.oData;
	//        var t = this;
	//        if (this.bHideImage || this.isOffline) {
	//            d.ImgSrc = "sap-icon://person-placeholder";
	//        } else {
	//            if (this.sProspectNumber == d.ProspectNumber && this.mPartnerImgSrc[this.sProspectNumber]) {
	//                d.ImgSrc = this.mPartnerImgSrc[this.sProspectNumber];
	//            } else {
	//                d.ImgSrc = this.mPartnerImgSrc[this.sProspectNumber];
	//                this.sProspectNumber = d.ProspectNumber;
	//                if (this.sProspectNumber !== "") {
	//                    this.oModel.read(p, null, ["$expand=Logo"], false, function (o, r) {
	//                        jQuery.sap.log.info("oData account response");
	//                        if (o.Logo && o.Logo.__metadata) {
	//                            var m = o.Logo.__metadata.media_src ? o.Logo.__metadata.media_src : "sap-icon://person-placeholder";
	//                            l = m.toString();
	//                            var P = function (u) {
	//                                var a = u;
	//                                try {
	//                                    if (u.indexOf("http") >= 0) {
	//                                        a = u.substr(u.indexOf("/sap/opu/"), u.length);
	//                                    }
	//                                } catch (e) {
	//                                }
	//                                return a;
	//                            };
	//                            l = P(l);
	//                        }
	//                    }, jQuery.proxy(this.handleErrors, this));
	//                }
	//                d.ImgSrc = l;
	//                this.mPartnerImgSrc[this.sProspectNumber] = l;
	//            }
	//        }
	//        if (s && s.getModel("json")) {
	//            s.getModel("json").setData(d);
	//        }
	//        delete d.Products;
	//        D = jQuery.extend(true, {}, D, d);
	//        j.oData = D;
	//        j.updateBindings();
	//    },
	//    getParticipants: function () {
	//        var d;
	//        var l = [];
	//        var t = this;
	//        this.partnerFunctionMap = {};
	//        this.byId("Sales_Team").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        this.byId("Sales_Team").getModel("json").setData({
	//            OpportunitySalesTeamSet: [],
	//            OpportunitySalesTeamSetNum: 0
	//        });
	//        this.oModel.read(this.sPath, null, ["$expand=SalesTeam,Competitors"], false, function (o, r) {
	//            t.bindS3Header(r.data);
	//            var a = t.getView().byId("Sales_Team");
	//            var b = new sap.ui.model.json.JSONModel();
	//            d = {
	//                OpportunitySalesTeamSet: r.data.SalesTeam.results,
	//                OpportunitySalesTeamSetNum: r.data.SalesTeam.results.length
	//            };
	//            if (d.OpportunitySalesTeamSet.length == 0) {
	//                t.byId("Sales_Team").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }
	//            var B = [];
	//            var m = {};
	//            var c = 0;
	//            for (var i = 0; i < d.OpportunitySalesTeamSet.length; i++) {
	//                var e = d.OpportunitySalesTeamSet[i].PartnerNumber;
	//                var p = "/AccountCollection('" + e + "')?$expand=Logo";
	//                l[i] = "sap-icon://person-placeholder";
	//                if (!t.mPartnerImgSrc[e] && e !== "") {
	//                    B.push(t.oModel.createBatchOperation(p, "GET"));
	//                    m[c] = i;
	//                    c++;
	//                } else {
	//                    d.OpportunitySalesTeamSet[i].ImgSrc = t.mPartnerImgSrc[e];
	//                }
	//            }
	//            ;
	//            t.oModel.addBatchReadOperations(B);
	//            t.oModel.submitBatch(jQuery.proxy(function (R) {
	//                for (var j = 0; j < c; j++) {
	//                    if (!R.__batchResponses[j].hasOwnProperty("data")) {
	//                        l[j] = "sap-icon://person-placesholder";
	//                    } else {
	//                        if (R.__batchResponses[j].data && R.__batchResponses[j].data.Logo && R.__batchResponses[j].data.Logo.__metadata.media_src) {
	//                            var f = R.__batchResponses[j].data.Logo.__metadata.media_src ? R.__batchResponses[j].data.Logo.__metadata.media_src : "sap-icon://person-placeholder";
	//                            var U = f;
	//                            l[j] = U.toString();
	//                        }
	//                    }
	//                    d.OpportunitySalesTeamSet[m[j]].ImgSrc = l[j];
	//                    t.mPartnerImgSrc[d.OpportunitySalesTeamSet[m[j]].PartnerNumber] = l[j];
	//                }
	//            }, this), jQuery.proxy(function () {
	//            }, this), false);
	//            b.setData(d);
	//            a.setModel(b, "json");
	//            if (r.data.Competitors && r.data.Competitors.results) {
	//                if (r.data.Competitors.results.length === 0) {
	//                    t.byId("tab_competitor").setVisible(false);
	//                } else {
	//                    t.byId("tab_competitor").setVisible(true);
	//                }
	//                var M = t.byId("competitors").getModel("json");
	//                if (M) {
	//                    M.oData.OpportunityCompetitors = r.data.Competitors.results;
	//                    M.updateBindings();
	//                } else {
	//                    t.byId("competitors").setModel(new sap.ui.model.json.JSONModel({ OpportunityCompetitors: r.data.Competitors.results }), "json");
	//                }
	//            }
	//        });
	//        this.refreshMsgLog(true);
	//        if (this.release)
	//            sap.ca.ui.utils.busydialog.releaseBusyDialog();
	//        this.release = false;
	//    },
	//    addParticipants: function () {
	//        this.oModel.clearBatch();
	//        var c = [];
	//        var a = this.participantsF4Fragment.getContent()[0].getSelectedItem().getBindingContext("json").getObject().PartnerFunctionCode;
	//        var h = this.byId("info").getModel("json").getData().Guid;
	//        var b = this.participantsF4Fragment.getContent()[2].getSelectedItems();
	//        var e;
	//        for (var i = 0; i < b.length; i++) {
	//            e = {
	//                HeaderGuid: h,
	//                PartnerNumber: b[i].data("ID"),
	//                PartnerFunctionCode: a
	//            };
	//            c.push(this.oModel.createBatchOperation("OpportunitySalesTeamSet", "POST", e, null));
	//        }
	//        if (c.length > 0) {
	//            this.oModel.addBatchChangeOperations(c);
	//            this.oModel.submitBatch(jQuery.proxy(function (r) {
	//                this.getParticipants();
	//                this.participantsF4Fragment.getContent()[2].removeSelections();
	//                this.participantsF4Fragment.getContent()[1].clear();
	//                this.participantsF4Fragment.close();
	//                if (a === "00000015")
	//                    sap.ui.getCore().getEventBus().publish("cus.crm.opportunity", "contactAdded", { contextPath: "Opportunities(guid'" + h + "')" });
	//            }, this), jQuery.proxy(function (E) {
	//                this.handleErrors(E);
	//            }, this));
	//        }
	//    },
	//    onDeleteParticipant: function (e) {
	//        var c = e.getSource().getBindingContext("json").getObject();
	//        var C = this.getRuleForPartnerFunction(c.PartnerFunctionCode);
	//        if (this.getCountForPartnerFunction(c.PartnerFunctionCode) - 1 < C.CountLow) {
	//            if (C.CountLow === 1) {
	//                sap.ca.ui.message.showMessageToast(this.oResourceBundle.getText("MUST_HAVE_PARTICIPANTS_1", [C.CountLow]));
	//            } else {
	//                sap.ca.ui.message.showMessageToast(this.oResourceBundle.getText("MUST_HAVE_PARTICIPANTS", [C.CountLow]));
	//            }
	//            return;
	//        }
	//        var h = this.byId("info").getModel("json").getData().Guid;
	//        var p = [
	//            "OpportunitySalesTeamSet(HeaderGuid=guid'",
	//            h,
	//            "',PartnerNumber='",
	//            c.PartnerNumber,
	//            "',PartnerFunctionCode='",
	//            c.PartnerFunctionCode,
	//            "')"
	//        ].join("");
	//        var t = this;
	//        sap.m.MessageBox.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("CONFIRM_DELETE"), sap.m.MessageBox.Icon.WARNING, sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("DELETE_FILE"), [
	//            sap.m.MessageBox.Action.OK,
	//            sap.m.MessageBox.Action.CANCEL
	//        ], function (a) {
	//            if (a === sap.m.MessageBox.Action.OK) {
	//                t.oModel.remove(p, null, jQuery.proxy(function () {
	//                    t.getParticipants();
	//                    t.oModel.refresh();
	//                    sap.ui.getCore().getEventBus().publish("cus.crm.opportunity", "opportunityChanged", { contextPath: "Opportunities(guid'" + h + "')" });
	//                    if (c && c.PartnerFunctionCode === "00000015")
	//                        sap.ui.getCore().getEventBus().publish("cus.crm.opportunity", "contactDeleted", { contextPath: "Opportunities(guid'" + h + "')" });
	//                }, t), jQuery.proxy(function (E) {
	//                    t.handleErrors(E);
	//                }, t));
	//            }
	//        });
	//    },
	//    onDeleteCompetitor: function (e) {
	//        var c = e.getSource().getBindingContext("json").getObject();
	//        var h = this.byId("info").getModel("json").getData().Guid;
	//        var p = "00000023";
	//        if (undefined !== this.partnerDeterminationMap[this.transactionType] && this.partnerDeterminationMap[this.transactionType].length) {
	//            for (var i = 0; i < this.partnerDeterminationMap[this.transactionType].length; i++) {
	//                if (this.partnerDeterminationMap[this.transactionType][i].PartnerFunctionName === "Competitors") {
	//                    p = this.partnerDeterminationMap[this.transactionType][i].PartnerFunctionCode;
	//                }
	//            }
	//        }
	//        var P = [
	//            "OpportunitySalesTeamSet(HeaderGuid=guid'",
	//            h,
	//            "',PartnerNumber='",
	//            c.PartnerNumber,
	//            "',PartnerFunctionCode='" + p + "')"
	//        ].join("");
	//        var t = this;
	//        sap.m.MessageBox.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("CONFIRM_DELETE"), sap.m.MessageBox.Icon.WARNING, sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("DELETE_ITEM"), [
	//            sap.m.MessageBox.Action.OK,
	//            sap.m.MessageBox.Action.CANCEL
	//        ], function (a) {
	//            if (a === sap.m.MessageBox.Action.OK) {
	//                t.oModel.remove(P, null, jQuery.proxy(function () {
	//                    t.getParticipants();
	//                    t.oModel.refresh();
	//                    sap.ui.getCore().getEventBus().publish("cus.crm.opportunity", "opportunityChanged", { contextPath: "Opportunities(guid'" + h + "')" });
	//                }, t), jQuery.proxy(function (E) {
	//                    t.handleErrors(E);
	//                }, t));
	//            }
	//        });
	//    },
	//    getChangeable: function (p) {
	//        for (var i = 0; i < this.partnerDeterminationMap[this.transactionType].length; i++) {
	//            if (this.partnerDeterminationMap[this.transactionType].PartnerFunctionCode === p) {
	//                return this.partnerDeterminationMap[this.transactionType].ChangeableFlag;
	//            }
	//        }
	//        return true;
	//    },
	//    showParticipantsF4: function () {
	//        this.iIndexStatus = false;
	//        var s;
	//        if (!this.participantsF4MultiselectFragment) {
	//            this.participantsF4MultiselectFragment = new sap.ui.xmlfragment(this.createId("participantsF4_S3"), "cus.crm.opportunity.view.ParticipantsF4Multiselect", this);
	//            this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel({}), "json");
	//            this.participantsF4MultiselectFragment.setModel(this.oI18nModel, "i18n");
	//            s = this.participantsF4MultiselectFragment.getContent()[0];
	//        }
	//        s = this.participantsF4MultiselectFragment.getContent()[0];
	//        this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions = this.partnerDeterminationMap[this.transactionType];
	//        this.participantsF4MultiselectFragment.getModel("json").updateBindings();
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].bindItems("json>/PartnerFunctions", this.oPartnerFunctionsTemplate, null, []);
	//        s.getPages()[1].getContent()[0].setMode("MultiSelect");
	//        var c = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems();
	//        if (c.length > 0)
	//            for (var k = 0; k < c.length; k++) {
	//                c[k].setInfo(" ");
	//                c[k].setSelected(false);
	//            }
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].setShowNavButton(true);
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getFooter().getContentRight()[0].setEnabled(true);
	//        this.participantsF4MultiselectFragment.open();
	//    },
	//    closeParticipantsF4: function (e) {
	//        this.participantsF4Fragment.getContent()[1].clear();
	//        this.participantsF4Fragment.getContent()[2].removeSelections();
	//        this.participantsF4Fragment.close();
	//    },
	//    addContact: function (e) {
	//        var m = this.getView().getModel();
	//        this.contactF4Fragment.getContent()[0].removeSelections();
	//        this.contactF4Fragment.setModel(new sap.ui.model.json.JSONModel());
	//        this.contactF4Fragment.setModel(this.getView().getModel("i18n"), "i18n");
	//        this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
	//        var a = t.getContent()[0];
	//        t.setVisible(false);
	//        this.contactF4Fragment.getSubHeader().getContentLeft()[0].setValue("");
	//        var o = this.byId("info").getModel("json").getData();
	//        this.opportunity_number = o.ProspectNumber;
	//        this.contactF4Fragment.open();
	//        var j = new sap.ui.model.json.JSONModel();
	//        this.contactF4Fragment.setModel(j, "json");
	//        if (this.opportunity_number != "" && this.opportunity_number != undefined) {
	//            t.setVisible(true);
	//            a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FILTER") + " " + o.ProspectName);
	//            m.read("/AccountCollection(accountID='" + this.opportunity_number + "')/Contacts", null, null, true, jQuery.proxy(function (b, r) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//                if (r.data.results.length === 0)
	//                    this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this));
	//        } else {
	//            t.setVisible(false);
	//            this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	//            this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//            m.read("ContactCollection", null, null, true, jQuery.proxy(function (b, r) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//                if (r.data.results.length === 0)
	//                    this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this));
	//        }
	//    },
	//    setContact: function (e) {
	//        var m = this.getView().getModel();
	//        this.oSelectedContact = e.getSource().getSelectedItem().getBindingContext("json").getObject();
	//        var a = this.byId("info").getModel("json").getData().ProspectNumber;
	//        var h = this.byId("info").getModel("json").getData().Guid;
	//        var t = this;
	//        m.refreshSecurityToken();
	//        m.update("OpportunitySalesTeamSet(PartnerNumber='" + this.oSelectedContact.contactID + "',PartnerFunctionCode='00000015',HeaderGuid=guid'" + h + "')", {
	//            HeaderGuid: h,
	//            PartnerNumber: this.oSelectedContact.contactID,
	//            PartnerFunctionCode: "00000015"
	//        }, {
	//            fnSuccess: jQuery.proxy(function () {
	//                this.getParticipants();
	//            }, this),
	//            fnError: function (E) {
	//                this.handleErrors(E);
	//            },
	//            bMerge: true
	//        });
	//        this.contactF4Fragment.getContent()[0].removeSelections();
	//        var j = new sap.ui.model.json.JSONModel();
	//        j.setData({ ContactCollection: [] });
	//        this.contactF4Fragment.setModel(j, "json");
	//        this.contactF4Fragment.close();
	//    },
	//    closeToolbar: function (e) {
	//        var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
	//        var o = this.contactF4Fragment.getContent()[0];
	//        t.setVisible(false);
	//        o.getBinding("items").aFilters = [];
	//        o.getBinding("items").sFilterParams = "";
	//        o.getBinding("items").refresh();
	//        this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	//        o.setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        this.getView().getModel().read("ContactCollection", null, null, true, jQuery.proxy(function (a, r) {
	//            this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//            if (r.data.results.length === 0)
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//        }, this), jQuery.proxy(function (E) {
	//            this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//        }, this));
	//    },
	//    closeContactF4: function (e) {
	//        var j = new sap.ui.model.json.JSONModel();
	//        j.setData({ ContactCollection: [] });
	//        this.contactF4Fragment.setModel(j, "json");
	//        this.contactF4Fragment.close();
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
	//            var a = this.byId("info").getModel("json").getData().ProspectNumber;
	//            this.getView().getModel().read("/AccountCollection(accountID='" + a + "')/Contacts", null, ["$filter=substringof('" + v + "'" + ",fullName)"], true, jQuery.proxy(function (o, r) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: r.data.results });
	//                if (r.data.results.length === 0)
	//                    this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.contactF4Fragment.getModel("json").setData({ ContactCollection: [] });
	//                this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_CONTACTS"));
	//            }, this));
	//        }
	//    },
	//    handleErrors: function (E) {
	//        sap.ca.ui.utils.busydialog.releaseBusyDialog();
	//        jQuery.sap.log.error(JSON.stringify(E));
	//        var d = "";
	//        try {
	//            d = JSON.parse(E.response.body).error.message.value;
	//        } catch (e) {
	//            d = E.response.body;
	//        }
	//        sap.ca.ui.message.showMessageBox({
	//            type: sap.ca.ui.message.Type.ERROR,
	//            message: E.message,
	//            details: d
	//        }, function (r) {
	//        });
	//    },
	//    getDataForDetailScreen: function (s) {
	//        var i = false;
	//        var e = "$expand=";
	//        e += this.oConstants.COMPETITOR_NAVIGATION + "," + this.oConstants.DOCUMENT_ITEM_END_POINT;
	//        if (this.extHookLogLazyLoad) {
	//            i = this.extHookLogLazyLoad();
	//            e += i ? "" : "," + this.oConstants.CHANGE_DOC_END_POINT;
	//        }
	//        if (parseFloat(this.sBackendVersion) >= 4) {
	//            if (!this.extHookErrMsgLazyLoad || !this.extHookErrMsgLazyLoad()) {
	//                e += "," + this.oConstants.DOC_APPLICATION_LOG_NAVIGATION;
	//            }
	//            var a = this.getView().getModel("controllers").getData().s4Controller;
	//            if (a && a.bSuccessSave) {
	//                delete a.bSuccessSave;
	//            } else {
	//                cus.crm.opportunity.util.Util.refreshHeaderETag(this.sPath, this);
	//            }
	//        }
	//        if (this.bAppLaunched) {
	//            if (!this.isOffline) {
	//                this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("SalesStages", "GET")]);
	//                this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("Priorities", "GET")]);
	//                this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("Currencies", "GET")]);
	//                if (parseFloat(this.sBackendVersion) >= 4)
	//                    this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("RetrieveMaxHitSet", "GET")]);
	//            }
	//            this.oModel.addBatchReadOperations([this.oModel.createBatchOperation(this.sPath + "?" + e, "GET")]);
	//            if (this.extHookGetAdditionalCustomizing) {
	//                this.extHookGetAdditionalCustomizing();
	//            }
	//            this.oModel.submitBatch(jQuery.proxy(this.handleBatchResponses, this), jQuery.proxy(this.handleErrors, this));
	//        } else {
	//            this.oModel.read(this.sPath, null, [e], true, jQuery.proxy(function (o, r) {
	//                this.bindInfoAndProducts(r.data, s);
	//            }, this), jQuery.proxy(this.handleErrors, this));
	//        }
	//        if (this.extHookGetDataForDetailScreen) {
	//            this.extHookGetDataForDetailScreen();
	//        }
	//    },
	//    handleBatchResponses: function (r) {
	//        var f = false;
	//        var e;
	//        var a;
	//        var t = this;
	//        this.bAppLaunched = false;
	//        if (!this.isOffline) {
	//            if (r.__batchResponses[0].statusCode === "200") {
	//                t.SalesStages = r.__batchResponses[0].data.results;
	//            } else {
	//                f = true;
	//                e = r.__batchResponses[0].statusText;
	//                a = JSON.parse(r.__batchResponses[0].response.body).error.message.value + "\n";
	//            }
	//            if (r.__batchResponses[1].statusCode === "200") {
	//                t.Priorities = r.__batchResponses[1].data.results;
	//            } else {
	//                f = true;
	//                e = r.__batchResponses[1].statusText;
	//                a = JSON.parse(r.__batchResponses[1].response.body).error.message.value + "\n";
	//            }
	//            if (r.__batchResponses[2].statusCode === "200") {
	//                t.Currencies = r.__batchResponses[2].data.results;
	//            } else {
	//                f = true;
	//                e = r.__batchResponses[2].statusText;
	//                a = JSON.parse(r.__batchResponses[2].response.body).error.message.value + "\n";
	//            }
	//            if (f) {
	//                sap.ca.ui.message.showMessageBox({
	//                    type: sap.ca.ui.message.Type.ERROR,
	//                    message: e,
	//                    details: a
	//                }, function (R) {
	//                    var i = 0;
	//                    i++;
	//                });
	//            }
	//            if (r.__batchResponses[3])
	//                if (r.__batchResponses[3].hasOwnProperty("data")) {
	//                    if (!this.oApplicationFacade.getApplicationModel("MaxHit")) {
	//                        cus.crm.opportunity.util.Util.initMaxHitModel(this);
	//                    }
	//                    var d = { key: r.__batchResponses[3].data.results[0].MaxHitNumber };
	//                    this.oApplicationFacade.getApplicationModel("MaxHit").setData(d);
	//                }
	//            if (r.__batchResponses[4].hasOwnProperty("data")) {
	//                this.bindInfoAndProducts(r.__batchResponses[4].data, true);
	//            } else {
	//                this.handleErrors(r.__batchResponses[4]);
	//            }
	//        } else {
	//            if (r.__batchResponses[0].hasOwnProperty("data"))
	//                this.bindInfoAndProducts(r.__batchResponses[0].data, true);
	//            else
	//                this.handleErrors(r.__batchResponses[0]);
	//        }
	//        if (this.extHookHandleBatchResponses) {
	//            this.extHookHandleBatchResponses(r);
	//        }
	//    },		// YillikSatisMiktari ValueHelp Kontrolleri
	onChangeFinishRequest: function (e) {
		var bSelected = e.getParameters().selected;
		var oModel = this.getView().getModel("aromaEdit");
		if (bSelected) {
			oModel.setProperty("/BtmsUrunIstk", "X");
		} else {
			oModel.setProperty("/BtmsUrunIstk", "");
		}
	},
	onVHAnnualSalesAmount: function () {
		if (!this.VH_AnnualSalesAmount) {
			this.VH_AnnualSalesAmount = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_AnnualSalesAmount", this);
			this.VH_AnnualSalesAmount.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_AnnualSalesAmount);
		}
		this.VH_AnnualSalesAmount.open();
	},
	onAnnualSalesCancel: function (e) {
		e.getSource().getBinding("items").filter([]);
	},
	onAnnualSalesSearch: function (e) {
		var sValue = e.getParameter("value");
		var oAnnual = new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.EQ, sValue);
		e.getSource().getBinding("items").filter(oAnnual);
	},
	onAnnualSalesSelect: function (e) {
		var oItem = e.getParameter("selectedItem");
		var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		var sAction = this.getView().getModel("ComboBox").getProperty("/ActionForVH");
		if (sAction === "edit") {
			var oModel = this.getView().getModel("aromaEdit");
		} else {
			oModel = this.getView().getModel("aroma");
		}
		oModel.setProperty("/YillikSatisMik2Value", sValue);
		oModel.setProperty("/YillikSatisMik2Key", sKey);
	},

	// TahminiRmcMax ValueHelp Kontrolleri
	onVHEstimatedRMCMax: function () {
		var oCombo = this.getView().getModel("ComboBox");
		oCombo.setProperty("/CurrenciesSet", this.Currencies);
		if (!this.VH_EstimatedRmcMax) {
			this.VH_EstimatedRmcMax = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_EstimatedRmcMax", this);
			this.VH_EstimatedRmcMax.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_EstimatedRmcMax);
		}
		this.VH_EstimatedRmcMax.open();
	},
	onEstimatedRMCCancel: function (e) {
		e.getSource().getBinding("items").filter([]);
	},
	onEstimatedRMCSearch: function (e) {
		var sValue = e.getParameter("value");
		var oRMC = new sap.ui.model.Filter("CurrencyKey", sap.ui.model.FilterOperator.Contains, sValue);
		e.getSource().getBinding("items").filter(oRMC);
	},
	onEstimatedRMCSelect: function (e) {
		var oItem = e.getParameter("selectedItem");
		//var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		var sAction = this.getView().getModel("ComboBox").getProperty("/ActionForVH");
		if (sAction === "edit") {
			var oModel = this.getView().getModel("aromaEdit");
		} else {
			oModel = this.getView().getModel("aroma");
		}
		oModel.setProperty("/TahRmBrm", sKey);
	},

	// IstnnArmMik ValueHelp Kontrolleri
	onVHDesiredAromaAmount: function () {
		if (!this.VH_DesiredAromaAmount) {
			this.VH_DesiredAromaAmount = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_DesiredAromaAmount", this);
			this.VH_DesiredAromaAmount.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_DesiredAromaAmount);
		}
		this.VH_DesiredAromaAmount.open();
	},
	onDesiredAromaAmountCancel: function (e) {
		e.getSource().getBinding("items").filter([]);
	},
	onDesiredAromaAmountSearch: function (e) {
		var sValue = e.getParameter("value");
		var oAmount = new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.EQ, sValue);
		e.getSource().getBinding("items").filter(oAmount);
	},
	onDesiredAromaAmountSelect: function (e) {
		var oItem = e.getParameter("selectedItem");
		//var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		var sAction = this.getView().getModel("ComboBox").getProperty("/ActionForVH");
		if (sAction === "edit") {
			var oModel = this.getView().getModel("aromaEdit");
		} else {
			oModel = this.getView().getModel("aroma");
		}
		oModel.setProperty("/IstnnArmMik2", sKey);
	},

	onDesiredAromaQuantity: function () {
		if (!this.VH_DesiredAromaQuantity) {
			this.VH_DesiredAromaQuantity = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_DesiredAromaQuantity", this);
			this.VH_DesiredAromaQuantity.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_DesiredAromaQuantity);
		}
		this.VH_DesiredAromaQuantity.open();

	},
	onDesiredAromaQuantityCancel: function (e) {
		e.getSource().getBinding("items").filter([]);
	},
	onDesiredAromaQuantitySearch: function (e) {
		var sValue = e.getParameter("value");
		var oQuantity = new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, sValue);
		e.getSource().getBinding("items").filter(oQuantity);
	},
	onDesiredAromaQuantitySelect: function (e) {
		var oItem = e.getParameter("selectedItem");
		//var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		var sAction = this.getView().getModel("ComboBox").getProperty("/ActionForVH");
		if (sAction === "edit") {
			var oModel = this.getView().getModel("aromaEdit");
		} else {
			oModel = this.getView().getModel("aroma");
		}
		oModel.setProperty("/IstenenAromaBirim", sKey);
	},

	// UyguAlani ValueHelp Kontrolleri
	onPracticeArea: function () {
		if (!this.VH_PracticeArea) {
			this.VH_PracticeArea = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.VH_PracticeArea", this);
			this.VH_PracticeArea.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.VH_PracticeArea);
		}
		this.VH_PracticeArea.open();
	},
	onPracticeAreaCancel: function (e) {
		e.getSource().getBinding("items").filter([]);
	},
	onPracticeAreaSearch: function (e) {
		var sValue = e.getParameter("value");
		var oPractice = new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, sValue);
		e.getSource().getBinding("items").filter(oPractice);
	},
	onPracticeAreaSelect: function (e) {
		var oItem = e.getParameter("selectedItem");
		var sValue = oItem.getProperty("title");
		var sKey = oItem.getProperty("description");
		//var sAction = this.getView().getModel("ComboBox").getProperty("/ActionForVH");
		var sAction = this.getView().getModel("Update").getProperty("/EditButton");
		if (sAction) {
			var oModel = this.getView().getModel("aromaEdit");
		} else {
			oModel = this.getView().getModel("aroma");
		}
		oModel.setProperty("/UyguAlani", sKey);
		oModel.setProperty("/TanimUyg", sValue);
		var oPracticeArea = sap.ui.core.Fragment.byId("createAromaFragment_2", "ZZUYGU_ALANI");
		oPracticeArea.setValueState(sap.ui.core.ValueState.None);
	},

	bindInfoAndProducts: function (d, s) {
		var e = [
			this.oConstants.OPP_END_POINT,
			this.oConstants.DOCUMENT_ITEM_END_POINT,
			this.oConstants.DOC_APPLICATION_LOG_NAVIGATION
		];
		d = this.oConstantsFactory.mappingPropertyByEntities(d, e);
		var i = this.byId("info");
		var p = this.byId("Product_Tab");
		var j = this.getView().getModel("json");
		var D = j.oData;
		if (!this.isOffline) {
			var a = this.byId("S3_Header");
			this.transactionType = a.getModel("json").getData().ProcessType;
		}
		if (p) {
			D.Products = d[this.oConstants.DOCUMENT_ITEM_END_POINT].results;
			D.ProductsNum = d[this.oConstants.DOCUMENT_ITEM_END_POINT].results.length;
		}
		j.updateBindings();
		if (this.isOffline) {
			this.byId("Product_Tab").getBinding("items").sort(new sap.ui.model.Sorter(this.oConstants.SORT_PRODUCT_BY_ITEM_GUID, false, false));
		}
		if (D.Products) {
			if (D.Products.length === 0) {
				//this.byId("tab_product").setVisible(false);	//Cuztomizing
			} else {
				//this.byId("tab_product").setVisible(true);	//Customizing
			}
		}
		if (d[this.oConstants.CHANGE_DOC_END_POINT] && d[this.oConstants.CHANGE_DOC_END_POINT].results) {
			if (d.ChangeDocs.results.length === 0) {
				this.byId("log").setVisible(false);
			} else {
				this.byId("log").setVisible(true);
			}
		}
		if (d.Competitors && d.Competitors.results) {
			if (d.Competitors.results.length === 0)
				this.byId("tab_competitor").setVisible(false);
			else
				this.byId("tab_competitor").setVisible(true);
		}
		if (!this.extHookErrMsgLazyLoad || !this.extHookErrMsgLazyLoad()) {
			this.sBackendVersion = cus.crm.opportunity.util.schema._getServiceSchemaVersion(this.oModel, "Opportunity");
			if (this.sBackendVersion >= 4) {
				if (d[this.oConstants.DOC_APPLICATION_LOG_NAVIGATION] && d[this.oConstants.DOC_APPLICATION_LOG_NAVIGATION].results) {
					if (d[this.oConstants.DOC_APPLICATION_LOG_NAVIGATION].results.length === 0) {
						this.setBtnEnabled("errorMsg", false);
					} else {
						this.setBtnEnabled("errorMsg", true);
						var L = this.showErrorMsgFragment.getContent()[0];
						if (L && L.getModel("json")) {
							L.getModel("json").setData({
								OpportunityLogSet: d[this.oConstants.DOC_APPLICATION_LOG_NAVIGATION].results
							});
							var o = d[this.oConstants.DOC_APPLICATION_LOG_NAVIGATION].results.length;
							var m = this.oResourceBundle.getText("ERROR_MESSAGE_TITLE", o);
							this.showErrorMsgFragment.setTitle(m);
						}
					}
				}
			}
		}
		if (s) {
			this.setDefaultTabToInfo();
		}
		this.bindS3Header(d);
	},

	_onGetShapeOfTreeProducts: function (a) {
		var aChilds = [];
		var aNodes = [];
		var oTreeJson = {
			"Products": []
		};
		for (var k in a) { //Seperate nodes and leafs
			if (a[k].NumberParent === "0000000000") {
				aNodes.push(a[k]);
			} else {
				aChilds.push(a[k]);
			}
		}
		for (var n in aNodes) {
			aNodes[n].Nodes = [];
		}
		oTreeJson.Products = aNodes;

		for (var i in aNodes) {
			for (var j in aChilds) {
				if (aNodes[i].NumberInt === aChilds[j].NumberParent) {
					oTreeJson.Products[i].Nodes.push(aChilds[j]);
				}
			}
		}
		//var oTreeModel = new sap.ui.model.json.JSONModel(oTreeJson);
		this.getView().getModel("ProductList").setData(oTreeJson);
		this.getView().getModel("ProductList").setProperty("/AllProducts", a);
		//this.getView().setModel(oTreeModel, "ProductList");
		var oTb = this.getView().byId("customProduct_Tab");
		oTb.setBusy(false);
	},

	_onGetShapeOfTreePYP: function (a) {
		var oTreeJson = {
			"PYPs": []
		};
		var aPyp = a.Pypler.results;
		var aMalzeme = a.Malzemeler.results;
		var a4Seviye = [];
		var a5Seviye = [];
		var a6Seviye = [];
		for (var i in aPyp) {
			if (aPyp[i].UstPypNo === "") {
				a4Seviye.push(aPyp[i]);
				aPyp[i].Childs = [];
			}
			if (aPyp[i].PypNo.charAt(4) === "5") {
				a5Seviye.push(aPyp[i]);
				aPyp[i].Childs = [];
			}
			if (aPyp[i].PypNo.charAt(4) === "6") {
				a6Seviye.push(aPyp[i]);
				aPyp[i].Childs = [];
			}
		}
		for (var e in a4Seviye) {
			for (var f in aMalzeme) {
				if (a4Seviye[e].PypNo === aMalzeme[f].PypNo) {
					a4Seviye[e].Childs.push(aMalzeme[f]);
					delete aMalzeme[f];
				}
			}
		}
		for (var l in a5Seviye) {
			for (var m in aMalzeme) {
				if (a5Seviye[l].PypNo === aMalzeme[m].PypNo) {
					a5Seviye[l].Childs.push(aMalzeme[m]);
					delete aMalzeme[m];
				}
			}
		}
		for (var j in a6Seviye) {
			for (var k in aMalzeme) {
				if (a6Seviye[j].PypNo === aMalzeme[k].PypNo) {
					a6Seviye[j].Childs.push(aMalzeme[k]);
					delete aMalzeme[k];
				}
			}
		}
		for (var n in a5Seviye) {
			for (var p in a6Seviye) {
				if (a5Seviye[n].PypNo === a6Seviye[p].UstPypNo) {
					a5Seviye[n].Childs.push(a6Seviye[p]);
					delete a6Seviye[p];
				}
			}
		}
		for (var s in a4Seviye) {
			for (var t in a6Seviye) {
				if (a4Seviye[s].PypNo === a6Seviye[t].UstPypNo) {
					a4Seviye[s].Childs.push(a6Seviye[t]);
					delete a6Seviye[t];
				}
			}
		}
		for (var y in a4Seviye) {
			for (var z in a5Seviye) {
				if (a4Seviye[y].PypNo === a5Seviye[z].UstPypNo) {
					a4Seviye[y].Childs.push(a5Seviye[z]);
					delete a5Seviye[z];
				}
			}
		}
		oTreeJson.PYPs = a4Seviye;
		var oAromaModel = this.getView().getModel("AromaDetail");
		oAromaModel.setProperty("/PYPList", oTreeJson);
		//return oTreeJson;
	},
	onAddCustomProduct: function () {
		this.getView().getModel("Update").setProperty("/EditButton", false);
		if (!this.oCustomProductFragment) {
			this.oCustomProductFragment = sap.ui.xmlfragment("customProductFragment_2",
				"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.CustomProductDialog", this);
			this.oCustomProductFragment.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.oCustomProductFragment);
		}
		this.oCustomProductFragment.attachBrowserEvent("keydown", function (oEvent) {
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
			oModel = this.getView().getModel("customProducts");
		}
		// TO-DO
		var aProducts = this.getView().getModel("ProductList").getProperty("/Products");
		if (aProducts.length > 0) {
			for (var i = 0; i < aProducts.length; i++) {
				oModel.getProperty("/istekCollection").push(aProducts[i]);
			}
		}
		var oList = sap.ui.core.Fragment.byId("customProductFragment_2", "treeID");
		oList.getBinding("items").refresh();
		this.oCustomProductFragment.open();
		this.getView().getModel("ComboBox").setProperty("/ActionForVH", "Add"); // Value helplerin controlleri hangi fragmentten acilcak
	},
	//onEditToProduct : function () {},
	onNavigateToIstek: function () {
		//var oContext = e.getSource().getBindingContext();
		var oTreeModel = this.getView().getModel("customProducts");
		var oData = oTreeModel.getData();
		var iNumberOfIstek = oData.istekCollection.length + 1;
		oTreeModel.setProperty("/tempIstek/NumberInt", iNumberOfIstek * 100);
		//oData.tempIstek.Description = iNumberOfIstek + ". istek";// Bu set etmedi 
		//oTreeModel.setProperty("/tempIstek/PypTanim",iNumberOfIstek + ". istek");

		var oNavCon = sap.ui.core.Fragment.byId("customProductFragment_2", "navCon");
		var oIstekPage = sap.ui.core.Fragment.byId("customProductFragment_2", "createIstekID");
		oNavCon.to(oIstekPage);
	},
	onNavigateToAroma: function (e) {
		this.getView().getModel("Update").setProperty("/ActionMode", "C");
		this._onCallServiceForClass("", "", "ZZSINIF_1");
		this._onCallServiceForClass("", "", "ZZSINIF_2");
		this.getView().getModel("Update").setProperty("/ActionForDialog", true);
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment_2", "treeID");
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
			var oSelectedObject = oTreeModel.getProperty(sPath);
			if (oSelectedObject.ItemGuid !== undefined) {
				this._onAddAromaToTheIstek(oSelectedObject, sPath);
			} else {
				var sSelectedIstek = sPath.split("/")[2];
				var iParentKalemNo = (parseInt(sSelectedIstek) + 1) * 100;
				//var sPropertyPath = "/istekCollection/" + sSelectedIstek + "/Nodes";
				//var sPypTanim = (oTreeModel.getProperty(sPropertyPath).length + 1) + ". Aroma";
				var oAromaModel = new sap.ui.model.json.JSONModel({
					HeaderGuid: "00000000-0000-0000-0000-000000000000",
					//ProcessingMode : "A",
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
				if (!this.oCreateAromaDialog) {
					this.oCreateAromaDialog = sap.ui.xmlfragment("createAromaFragment_2",
						"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.CreateAromaDialog", this);
					this.oCreateAromaDialog.setModel(this.getView().getModel("i18n"), "i18n");
					this.getView().addDependent(this.oCreateAromaDialog);
				}
				this.oCreateAromaDialog.attachBrowserEvent("keydown", function (oEvent) {
					if (oEvent.which === 27) {
						oEvent.stopPropagation();
						oEvent.preventDefault();
					}
				});
				var oCheckBox = sap.ui.core.Fragment.byId("createAromaFragment_2", "ZZBTMS_URUN_ISTK");
				oCheckBox.setSelected(false);
				this.oCreateAromaDialog.open();
				this._onHideFieldsForBayi("createAromaFragment_2");
				this._onResetAllFormFields(this, "createAromaFragment_2");
				var oInput = sap.ui.core.Fragment.byId("createAromaFragment_2", "relatedPersonID");
				var oInput2 = sap.ui.core.Fragment.byId("createAromaFragment_2", "deliveryPersonID");
				oInput.setValue("");
				oInput2.setValue("");
			}
		}
		this.onCallServiceForCombo("add");
	},
	_onAddAromaToTheIstek: function (oIstek, sPath) {
		var sSelectedIstek = sPath.split("/")[2]; //sPath "/istekCollection/10"
		var oAromaModel = new sap.ui.model.json.JSONModel({
			HeaderGuid: "00000000-0000-0000-0000-000000000000",
			ParentGuid: oIstek.ParentGuid,
			//ProcessingMode : "A",
			ParentID: sSelectedIstek,
			NumberParent: "",
			PypTanim: "",
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
		if (!this.oCreateAromaDialog) {
			this.oCreateAromaDialog = sap.ui.xmlfragment("createAromaFragment_2",
				"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.CreateAromaDialog", this);
			this.oCreateAromaDialog.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.oCreateAromaDialog);
		}
		this.oCreateAromaDialog.attachBrowserEvent("keydown", function (oEvent) {
			if (oEvent.which === 27) {
				oEvent.stopPropagation();
				oEvent.preventDefault();
			}
		});
		var oCheckBox = sap.ui.core.Fragment.byId("createAromaFragment_2", "ZZBTMS_URUN_ISTK");
		oCheckBox.setSelected(false);
		this.oCreateAromaDialog.open();
		this._onHideFieldsForBayi("createAromaFragment_2");
		var oInput = sap.ui.core.Fragment.byId("createAromaFragment_2", "relatedPersonID");
		var oInput2 = sap.ui.core.Fragment.byId("createAromaFragment_2", "deliveryPersonID");
		oInput.setValue("");
		oInput2.setValue("");
	},
	_onHideFieldsForBayi: function (sFragment) {
		var oJson = this.getView().getModel("json");
		var sType = oJson.getProperty("/ProcessType");
		var oUpdate = this.getView().getModel("Update");
		if (sType === "Z008") { // Bayi numune ise double kod gormesin
			oUpdate.setProperty("/BayiDurumu", false);
		} else { // Bayi numune ise double kod gormesin
			oUpdate.setProperty("/BayiDurumu", true);
		}
	},

	onCheckMaterialCode: function (e) {
		var sValue = e.mParameters.value;
		var oUpdate = this.getView().getModel("Update");
		if (oUpdate.getProperty("/EditButton")) {
			this.getView().getModel("aromaEdit").setProperty("/MalzemeKod", sValue.toUpperCase());
		} else {
			this.getView().getModel("aroma").setProperty("/MalzemeKod", sValue.toUpperCase());
		}

		if (sValue.length === 0 || sValue.length >= 8) {
			this.getView().getModel("Update").setProperty("/MaterialCodeState", "None");
			this.onMaterialCodeSubmit(sValue.toUpperCase());
		} else {
			this.getView().getModel("Update").setProperty("/MaterialCodeState", "Warning");
			if (oUpdate.getProperty("/EditButton")) {
				this.getView().getModel("aromaEdit").setProperty("/MalzemeKod", "");
			} else {
				this.getView().getModel("aroma").setProperty("/MalzemeKod", "");
			}
		}
	},

	onMaterialCodeSubmit: function (s) {
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		var oModel = this.getView().getModel("ComboBox");
		var oUpdate = this.getView().getModel("Update");
		if (oUpdate.getProperty("/EditButton") === false) {
			var oAroma = this.getView().getModel("aroma");
			if (this.oCreateAromaDialog) {
				this.oCreateAromaDialog.setBusy(true);
			}
		} else {
			oAroma = this.getView().getModel("aromaEdit");
			if (this.oEditAromaFragment) {
				this.oEditAromaFragment.setBusy(true);
			}
		}
		oAroma.setProperty("/Malzeme", "");
		oAroma.setProperty("/OrijinTanim", "");
		oAroma.setProperty("/DoubleKod", "");
		oAroma.setProperty("/DoubleTanim", "");
		oAroma.setProperty("/ModDesc", "");
		oAroma.setProperty("/Mod", "");
		oAroma.setProperty("/Sinif1", "");
		oAroma.setProperty("/Sinif2", "");
		//this.getView().setBusy(true);
		var oThis = this;
		//"FA100000"
		var sAccountID = this.getView().getModel("json").getProperty("/ProspectNumber");
		var sMalzemeKodu = s; //e.getParameter("value");
		this._onCallServiceForClass("", sMalzemeKodu, "ZZSINIF_1");
		this._onCallServiceForClass("", sMalzemeKodu, "ZZSINIF_2");
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		var sProcessType = this.getView().getModel("json").getProperty("/ProcessType");
		oDataModel.callFunction("/CustomizingMalzemeKodlar", {
			method: "GET",
			urlParameters: {
				"PartnerNo": sAccountID,
				"MalzemeKodu": sMalzemeKodu,
				"ProcessType": sProcessType
			},
			success: function (resp) {
				if (oUpdate.getProperty("/EditButton") === false) {
					if (oThis.oCreateAromaDialog) {
						oThis.oCreateAromaDialog.setBusy(false);
					}
				} else {
					if (oThis.oEditAromaFragment) {
						oThis.oEditAromaFragment.setBusy(false);
					}
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
						oThis.oAddMalzemeDialog = sap.ui.xmlfragment("addMalzemeFragment_2",
							"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.AddAromaMalzeme", oThis);
						oThis.oAddMalzemeDialog.setModel(oThis.getView().getModel("i18n"), "i18n");
						oThis.getView().addDependent(oThis.oAddMalzemeDialog);
					}
					if (s.length !== 0) {
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
						oAroma.setProperty("/MalzemeKod", "");
						oAroma.setProperty("/Malzeme", "");
						oAroma.setProperty("/OrijinTanim", "");
						oAroma.setProperty("/DoubleKod", "");
						oAroma.setProperty("/DoubleTanim", "");
						sap.m.MessageToast.show(oResource.getText("MATERIAL_NOTFOUND"));
					}
				}
			},
			error: function (err) {
				if (oUpdate.getProperty("/EditButton") === false) {
					if (oThis.oCreateAromaDialog) {
						oThis.oCreateAromaDialog.setBusy(false);
					}
				} else {
					if (oThis.oEditAromaFragment) {
						oThis.oEditAromaFragment.setBusy(false);
					}
				}
				oThis._onParseErrorMsg(err);
			}
		});
		//     if (!this.oAddMalzemeDialog) {
		// this.oAddMalzemeDialog = sap.ui.xmlfragment("addMalzemeFragment_2", "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.AddAromaMalzeme",this);
		// this.oAddMalzemeDialog.setModel(this.getView().getModel("i18n"), "i18n");
		// this.getView().addDependent(this.oAddMalzemeDialog);
		//     }
		//     this.oAddMalzemeDialog.open();
	},
	onFoundMaterialSelect: function (e) {
		var oComboModel = this.getView().getModel("ComboBox");
		var oUpdate = this.getView().getModel("Update");
		var sPath = e.getParameter("selectedContexts")[0].sPath;
		var sNumber = sPath.slice(-1);
		var sProperty = "/MalzemeCollection/" + sNumber;
		if (oUpdate.getProperty("/ActionMode") === "E") {
			var oModel = this.getView().getModel("aromaEdit");
		} else {
			oModel = this.getView().getModel("aroma");
		}
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
	onFoundMaterialSearch: function (e) {
		var aFilter = [];
		var sValue = e.getParameter("value");
		if (sValue && sValue.length > 0) {
			var oBilesen = new sap.ui.model.Filter("Bilesen", sap.ui.model.FilterOperator.Contains, sValue);
			aFilter.push(oBilesen);
		}
		e.getSource().getBinding("items").filter(aFilter);
	},
	onFoundMaterialCancel: function () {
		var bAction = this.getView().getModel("Update").getProperty("/EditButton");
		if (bAction) {
			this.getView().getModel("aromaEdit").setProperty("/MalzemeKod", "");
		} else {
			this.getView().getModel("aroma").setProperty("/MalzemeKod", "");
		}
		if (this.oAddMalzemeDialog) {
			//this.oAddMalzemeDialog.close();
		}
	},
	_onCallService_Mode: function (sMalzeme) {
		var oSelf = this;
		var oModel = this.getView().getModel("ComboBox");
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		oDataModel.callFunction("/CustomizingProductModlar", {
			method: "GET",
			urlParameters: {
				"MalzemeKod": sMalzeme
			},
			success: function (resp) {
				oModel.setProperty("/ModeCollection", resp.results);
			},
			error: function (err) {
				oSelf._onParseErrorMsg(err);
			}
		});
	},
	onGetClassServiceByMode: function (e) {
		var oCombo = this.getView().getModel("ComboBox");
		if (oCombo.getProperty("/ActionForVH") === "edit") {
			var oModel = this.getView().getModel("aromaEdit");
		} else {
			oModel = this.getView().getModel("aroma");
		}
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
	_onCallServiceForClass: function (sMode, sMalzeme, sFieldName) {
		var that = this;
		var sModeAction = this.getView().getModel("Update").getProperty("/ActionMode");
		var oModel = this.getView().getModel("ComboBox");
		var sPath = "/" + sFieldName;
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
			success: function (resp) {
				//oModel.setProperty(sPath,resp.results);
				//oModel.setProperty(sPath,resp.results);
				if (resp.results.length > 1) {
					oModel.setProperty("/" + resp.results[1].FieldName, resp.results);
					if (resp.results[1].FieldName === "ZZSINIF_1") {
						if (sModeAction === "C") {
							// Musteri istemedi
							//that.getView().getModel("aroma").setProperty("/Sinif1",resp.results[1].Key);                			                				
						} else {
							// Secili olanin uzerine yazmasin 
							//that.getView().getModel("aromaEdit").setProperty("/Sinif1",resp.results[1].Key);                			                				
						}
					}
					if (resp.results[1].FieldName === "ZZSINIF_2") {
						if (sModeAction === "C") {
							//that.getView().getModel("aroma").setProperty("/Sinif2",resp.results[1].Key);	
						} else {
							// Secili olanin uzerine yazmasin 
							//that.getView().getModel("aromaEdit").setProperty("/Sinif2",resp.results[1].Key);	
						}

					}
				}
				if (resp.results.length === 1) {
					oModel.setProperty("/" + resp.results[0].FieldName, resp.results);
					if (resp.results[0].FieldName === "ZZSINIF_1") {
						if (sModeAction === "C") {
							that.getView().getModel("aroma").setProperty("/Sinif1", resp.results[0].Key);
						} else {
							that.getView().getModel("aromaEdit").setProperty("/Sinif1", resp.results[0].Key);
						}
					}
					if (resp.results[0].FieldName === "ZZSINIF_2") {
						if (sModeAction === "C") {
							that.getView().getModel("aroma").setProperty("/Sinif2", resp.results[0].Key);
						} else {
							that.getView().getModel("aromaEdit").setProperty("/Sinif2", resp.results[0].Key);
						}

					}
				}
			},
			error: function (err) {
				that._onParseErrorMsg(err);
			}
		});
	},
	onCallServiceForValidations: function (e) {
		var oComboModel = this.getView().getModel("ComboBox");
		var oSource = e.getSource();
		var sID = oSource.getSelectedItemId(); // Edit mi Create mi 
		var iAction = sID.indexOf("create");
		if (iAction >= 0) {
			var oModel = this.getView().getModel("aroma");
		} else {
			oModel = this.getView().getModel("aromaEdit");
		}
		var oThis = this;
		var sProjeTuru = oModel.getProperty("/ProjeTuru");
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		oDataModel.callFunction("/CustomizingProductFieldSpecs", {
			method: "GET",
			urlParameters: {
				"ProjeTuru": sProjeTuru
			},
			success: function (resp) {
				oThis._onChangeFormValidations(resp.results, iAction, oComboModel);
			},
			error: function (err) {
				oThis._onParseErrorMsg(err);
			}
		});

	},

	_colsPush: function (aCols, property, label, typeS) {
		if (typeS === undefined || typeS === null)
			aCols.push({
				name: label,
				template: {
					content: property
				}
			});
		else
			aCols.push({
				name: label,
				template: {
					content: property
				}
			});
	},

	_exportExcel: function (jsonModel, path, cols) {
		var oExport = new sap.ui.core.util.Export({
			exportType: new sap.ui.core.util.ExportTypeCSV({
				separatorChar: ";"
			}),
			models: jsonModel,
			rows: {
				path: path //   "/excelData"
			},
			columns: cols
		});

		oExport.saveFile().catch(function (oError) {
			sap.m.MessageToast.show(oError);
		}).then(function () {
			oExport.destroy();
		});
	},

	_columnExcel: function (aCols, nodeModel) {
		// var aColName = ["1.PYP No", "1.Belge Tanıtıcısı", "1.Seviye", "1.Tanım", "1.Müşteri/Alt Müşteri No", "1.Müşteri/Alt Müşteri Ad/Soyad",
		// 	"1.Sorumlu Çalışan No", "1.Sorumlu Çalışan Ad/Soyad", "1.Durum", "1.Satış Aşaması", "1.Olasılık", "1.Öncelik", "1.Başlangıç Tarihi",
		// 	"1.Kapanış Tarihi", "1.Beklenen Satış Hasılatı", "1.Beklenen Satış hasılatı(Ağırlıklı)", "1.Beklenen Toplam Değer", "1.Para Birimi",
		// 	"1.Not (Belge notu)", "2.Belge Tanıtıcısı", "2.Kalem No ", "2.Seviye", "2.PYP No", "2.Malzeme Tanımı", "2.Durum Tanımı",
		// 	"3P.Belge Tanıtıcısı", "3P.Üst Kalem No", "3P.PYP No", "3P.Seviye", "3P.Malzeme Tanımı", "3P.Durum Tanımı", "3P.Sonraki Adım",
		// 	"3P.Proje Türü", "3P.Müşteri Proje Adı", "3P.Müşteri Büyüklüğü", "3P.Satışa Dönüştürme", "3P.Satışa Dnş. Olaslk",
		// 	"3P.Gönderilen Kişi", "3P.Gönderme Şekli", "3P.Kargo Gönderisi", "3P.Müşteri Fab Ziyareti", "3P.Numune Bedeli", "3P.Proaktif",
		// 	"3P.Yıllık satış miktarı", "3P.Yıllık satış miktarı birimi", "3P.Hedef Fiyat Max", "3P.Hedef Fiyat Max Birimi", "3P.Teslim Süresi",
		// 	"3P.Teslim Tarihi", "3P.ARGE Öncelik", "3A.Belge Tanıtıcısı", "3A.Üst Kalem No", "3A.PYP No", "3A.Aroma Özelliği",
		// 	"3A.Bitmiş Ürün Kodu", "3A.Bitmiş Ürün İsteği", "3A.Bitmiş Ürün Adeti", "3A.B.Ü. Reçete", "3A.Çözünürlük", "3A.Malzeme Kodu",
		// 	"3A.Fiziksel Durum", "3A.Alternatif", "3A.İstenen Aroma Miktar", "3A.İstenen A. Miktar Birimi", "3A.İstenen Aroma Adedi",
		// 	"3A.Girilen Kod Açıklama", "3A.Mod", "3A.İstenen Numune Tipi", "3A.Sınıf İsteği", "3A.Sınıf 1", "3A.Sınıf 2", "3A.Ürün Bazı",
		// 	"3A.Ur.Oz(tuz, briks)", "3A.Uygulama", "3A.Uygulama Alanı", "3A.Müşteri Grubu", "3SI.Belge Tanıtıcısı", "3SI.Kalem No", "3SI.PYP No",
		// 	"3SI.Alkol %", "3SI.Aromasız Baz İsmi", "3SI.Asit Aralığı", "3SI.Asit Tipi", "3SI.Boya Tipi	3SI.Brix Aralığı",
		// 	"3SI.Bitmiş Ürün Amb. Tip", "3SI.BÜ Pişirme Süre-Sıck", "3SI.BÜ Süt Dozajı", "3SI.Koruyucu", "3SI.Meyve %",
		// 	"3SI.Numune Ambalaj Tipi", "3SI.Pastörizasyon", "3SI.PH Aralığı", "3SI.Pulp", "3SI.SOS Ambalaj Tipi", "3SI.SOS Özelliği",
		// 	"3SI.SOS Tipi", "3SI.SOS Uygulama Zamani", "3SI.Su Aktivitesi", "3SI.Tatlandırıcı Çeşidi", "3SI.Viskozite ve Ölçüm",
		// 	"3N.Belge Tanıtıcısı", "3N.Kalem No ", "3N.PYP N", "3N.Not"
		// ];

		// for (var i = 0; i < aColName.length; i++) {
		// 	this._colsPush(aCols, aColVal[i], aColName[i]);
		// }
		this._colsPush(aCols, nodeModel[0].ZzprojePyp, "1.PYP No");
		this._colsPush(aCols, nodeModel[0].ObjectId, "1.Belge Tanıtıcısı");
		this._colsPush(aCols, nodeModel[0].Seviye, "1.Seviye");
		this._colsPush(aCols, nodeModel[0].Description, "1.Tanım");
		this._colsPush(aCols, nodeModel[0].Must, "1.Müşteri/Alt Müşteri No");
		this._colsPush(aCols, nodeModel[0].MustName1, "1.Müşteri/Alt Müşteri Ad/Soyad");
		this._colsPush(aCols, nodeModel[0].Sorumlu, "1.Sorumlu Çalışan No");
		this._colsPush(aCols, nodeModel[0].SorName1, "1.Sorumlu Çalışan Ad/Soyad");
		this._colsPush(aCols, nodeModel[0].Txt30, "1.Durum");
		this._colsPush(aCols, nodeModel[0].CurrPhase, "1.Satış Aşaması");
		this._colsPush(aCols, nodeModel[0].Probability, "1.Olasılık");
		this._colsPush(aCols, nodeModel[0].Importance, "1.Öncelik");
		this._colsPush(aCols, nodeModel[0].Startdate, "1.Başlangıç Tarihi");
		this._colsPush(aCols, nodeModel[0].ExpectEnd, "1.Kapanış Tarihi");
		this._colsPush(aCols, nodeModel[0].ExpRevenue, "1.Beklenen Satış Hasılatı");
		this._colsPush(aCols, nodeModel[0].ExpWeightedRevenue, "1.Beklenen Satış hasılatı(Ağırlıklı)");
		this._colsPush(aCols, nodeModel[0].BudgetBp, "1.Beklenen Toplam Değer");
		this._colsPush(aCols, nodeModel[0].Currency, "1.Para Birimi");
		this._colsPush(aCols, nodeModel[0].Tdline, "1.Not (Belge notu)");
		this._colsPush(aCols, nodeModel[0].ObjectId, "2.Belge Tanıtıcısı");
		this._colsPush(aCols, nodeModel[0].NumberInt, "2.Kalem No");
		this._colsPush(aCols, nodeModel[0].IstekSeviye, "2.Seviye");
		this._colsPush(aCols, nodeModel[0].IstekPyp, "2.PYP No");
		this._colsPush(aCols, nodeModel[0].IstekTanim, "2.Malzeme Tanımı");
		this._colsPush(aCols, nodeModel[0].IstekTxt30, "2.Durum Tanımı");
		this._colsPush(aCols, nodeModel[0].ObjectId, "3P.Belge Tanıtıcısı");
		this._colsPush(aCols, nodeModel[0].NumberInt, "3P.Üst Kalem No");
		this._colsPush(aCols, nodeModel[0].AromaPyp, "3P.PYP No");
		this._colsPush(aCols, nodeModel[0].AromaSeviye, "3P.Seviye");
		this._colsPush(aCols, nodeModel[0].AromaTanim, "3P.Malzeme Tanımı");
		this._colsPush(aCols, nodeModel[0].AromaTxt30, "3P.Durum Tanımı");
		this._colsPush(aCols, nodeModel[0].ZzsonrakiAdim, "3P.Sonraki Adım");
		this._colsPush(aCols, nodeModel[0].ZzprojeTuru, "3P.Proje Türü");
		this._colsPush(aCols, nodeModel[0].ZzmusteriAdi, "3P.Müşteri Proje Adı");
		this._colsPush(aCols, nodeModel[0].ZzmusteriBuyuk, "3P.Müşteri Büyüklüğü");
		this._colsPush(aCols, nodeModel[0].ZzsatisaDonus, "3P.Satışa Dönüştürme");
		this._colsPush(aCols, nodeModel[0].Zzlikelihd, "3P.Satışa Dnş. Olaslk");
		this._colsPush(aCols, nodeModel[0].ZzgonderKisi, "3P.Gönderilen Kişi");
		this._colsPush(aCols, nodeModel[0].ZzgondermeSekli, "3P.Gönderme Şekli");
		this._colsPush(aCols, nodeModel[0].ZzkargoOdemesi, "3P.Kargo Gönderisi");
		this._colsPush(aCols, nodeModel[0].ZzmstriFZiyrti, "3P.Müşteri Fab Ziyareti");
		this._colsPush(aCols, nodeModel[0].ZznumuneBedeli, "3P.Numune Bedeli");
		this._colsPush(aCols, nodeModel[0].Zzproaktif, "3P.Proaktif");
		this._colsPush(aCols, nodeModel[0].Zztnyillik, "3P.Yıllık satış miktarı");
		this._colsPush(aCols, nodeModel[0].Zzfld000056, "3P.Yıllık satış miktarı birimi");
		this._colsPush(aCols, nodeModel[0].ZztahRmcBrm, "3P.Hedef Fiyat Max");
		this._colsPush(aCols, nodeModel[0].Zzfld00000a, "3P.Hedef Fiyat Max Birimi");
		this._colsPush(aCols, nodeModel[0].ZzteslimSuresi, "3P.Teslim Süresi");
		this._colsPush(aCols, nodeModel[0].Zzdatum, "3P.Teslim Tarihi");
		this._colsPush(aCols, nodeModel[0].ZzargeOncelik, "3P.ARGE Öncelik");
		this._colsPush(aCols, nodeModel[0].ObjectId, "3A.Belge Tanıtıcısı");
		this._colsPush(aCols, nodeModel[0].NumberInt, "3A.Üst Kalem No");
		this._colsPush(aCols, nodeModel[0].AromaPyp, "3A.PYP No");
		this._colsPush(aCols, nodeModel[0].ZzaromaOzellik, "3A.Aroma Özelliği");
		this._colsPush(aCols, nodeModel[0].ZzbitmisUrun, "3A.Bitmiş Ürün Kodu");
		this._colsPush(aCols, nodeModel[0].ZzbtmsUrunIstk, "3A.Bitmiş Ürün İsteği");
		this._colsPush(aCols, nodeModel[0].ZzbtmsUrunAdet, "3A.Bitmiş Ürün Adeti");
		this._colsPush(aCols, nodeModel[0].ZzbuRecete, "3A.B.Ü. Reçete");
		this._colsPush(aCols, nodeModel[0].Zzcozunurluk, "3A.Çözünürlük");
		this._colsPush(aCols, nodeModel[0].ZzmalzKodu, "3A.Malzeme Kodu");
		this._colsPush(aCols, nodeModel[0].ZzfizikDurum, "3A.Fiziksel Durum");
		this._colsPush(aCols, nodeModel[0].Zzalternatif, "3A.Alternatif");
		this._colsPush(aCols, nodeModel[0].ZzistnnArmMik, "3A.İstenen Aroma Miktar");
		this._colsPush(aCols, nodeModel[0].Zzfld00000p, "3A.İstenen A. Miktar Birimi");
		this._colsPush(aCols, nodeModel[0].AromaAdet, "3A.İstenen Aroma Adedi");
		this._colsPush(aCols, nodeModel[0].ZzkodAciklama, "3A.Girilen Kod Açıklama");
		this._colsPush(aCols, nodeModel[0].Zzmod, "3A.Mod");
		this._colsPush(aCols, nodeModel[0].ZznumuneTipi, "3A.İstenen Numune Tipi");
		this._colsPush(aCols, nodeModel[0].ZzsinifIstegi, "3A.Sınıf İsteği");
		this._colsPush(aCols, nodeModel[0].Zzsinif1, "3A.Sınıf 1");
		this._colsPush(aCols, nodeModel[0].Zzsinif2, "3A.Sınıf 2");
		this._colsPush(aCols, nodeModel[0].ZzurunBazi, "3A.Ürün Bazı");
		this._colsPush(aCols, nodeModel[0].ZzurunOz, "3A.Ur.Oz(tuz, briks)");
		this._colsPush(aCols, nodeModel[0].Zzuygulama, "3A.Uygulama");
		this._colsPush(aCols, (nodeModel[0].ZzuyguAlani + " " + nodeModel[0].Zztanimuyg), "3A.Uygulama Alanı ");
		this._colsPush(aCols, nodeModel[0].Kdgrp, "3A.Müşteri Grubu ");
		this._colsPush(aCols, nodeModel[0].ObjectId, "3SI.Belge Tanıtıcısı");
		this._colsPush(aCols, nodeModel[0].NumberInt, "3SI.Kalem No");
		this._colsPush(aCols, nodeModel[0].AromaPyp, "3SI.PYP No");
		this._colsPush(aCols, nodeModel[0].ZzalkolYuzde, "3SI.Alkol %");
		this._colsPush(aCols, nodeModel[0].ZzaromasizBaz, "3SI.Aromasız Baz İsmi");
		this._colsPush(aCols, nodeModel[0].ZzasitAralik, "3SI.Asit Aralığı");
		this._colsPush(aCols, nodeModel[0].ZzasitTipi, "3SI.Asit Tipi");
		this._colsPush(aCols, nodeModel[0].ZzboyaTipi, "3SI.Boya Tipi");
		this._colsPush(aCols, nodeModel[0].ZzbrixAralik, "3SI.Brix Aralığı");
		this._colsPush(aCols, nodeModel[0].ZzbtmsAmbTip, "3SI.Bitmiş Ürün Amb. Tip");
		this._colsPush(aCols, nodeModel[0].ZzbuSureSicak, "3SI.BÜ Pişirme Süre-Sıck");
		this._colsPush(aCols, nodeModel[0].ZzbuSutDoz, "3SI.BÜ Süt Dozajı");
		this._colsPush(aCols, nodeModel[0].Zzkoruyucu, "3SI.Koruyucu");
		this._colsPush(aCols, nodeModel[0].ZzmeyveYuzde, "3SI.Meyve %");
		this._colsPush(aCols, nodeModel[0].ZznumuneAmbTip, "3SI.Numune Ambalaj Tipi");
		this._colsPush(aCols, nodeModel[0].Zzpastorizasyon, "3SI.Pastörizasyon");
		this._colsPush(aCols, nodeModel[0].ZzphAralik, "3SI.PH Aralığı");
		this._colsPush(aCols, nodeModel[0].ZzpulpYuzde, "3SI.Pulp");
		this._colsPush(aCols, nodeModel[0].ZzsosAmbTip, "3SI.SOS Ambalaj Tipi");
		this._colsPush(aCols, nodeModel[0].ZzsosOzellik, "3SI.SOS Özelliği");
		this._colsPush(aCols, nodeModel[0].ZzsosTipi, "3SI.SOS Tipi");
		this._colsPush(aCols, nodeModel[0].ZzsosUygZmn, "3SI.SOS Uygulama Zamani");
		this._colsPush(aCols, nodeModel[0].ZzsuAktivitesi, "3SI.Su Aktivitesi");
		this._colsPush(aCols, nodeModel[0].ZztatlanCesit, "3SI.Tatlandırıcı Çeşidi");
		this._colsPush(aCols, nodeModel[0].Zzvizkozite, "3SI.Viskozite ve Ölçüm");
		this._colsPush(aCols, nodeModel[0].ObjectId, "3N.Belge Tanıtıcısı");
		this._colsPush(aCols, nodeModel[0].NumberInt, "3N.Kalem No");
		this._colsPush(aCols, nodeModel[0].AromaPyp, "3N.PYP No");
		this._colsPush(aCols, nodeModel[0].Tdline, "3N.Not");

		return aCols;
	},

	onExportExcel: function (oEvent) {
		var that = this;
		var aCols = [];
		var f = [];
		var filter;
		var nodeModel = [];

		var jsonModel = this.getView().getModel("ProductList");
		var nPath = oEvent.getSource().mBindingInfos.visible.binding.getContext().sPath;
		var tPath = nPath.split("/");

		var pypNo = jsonModel.getProperty(nPath).ProjePypNo;

		var oModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_DEALERS_SRV/"
		});

		var guid = this.getView().getModel("json").getData().Guid;

		filter = new sap.ui.model.Filter("ImGuid", sap.ui.model.FilterOperator.EQ, guid);
		f.push(filter);

		filter = new sap.ui.model.Filter("ImStatus", sap.ui.model.FilterOperator.EQ, "-1");
		f.push(filter);

		oModel.read("/EtDealersSet", {
			filters: f,
			success: function (oData) {
				jQuery.each(oData.results, function (id, item) {
					if (pypNo === item.AromaPyp) {
						delete item["__metadata"];
						delete item["ImGuid"];
						delete item["ImKunnr"];
						delete item["ImStatus"];
						delete item["ImTarihf"];
						delete item["ImTarihl"];
						delete item["Status"];
						delete item["IstekStatus"];
						delete item["AromaStatus"];
						nodeModel.push(item);
						return false;
					}
				});

				jsonModel.setProperty("/excelData", nodeModel);
				that._columnExcel(aCols, nodeModel);
				that._exportExcel(jsonModel, "/excelData", aCols);
			},
			error: function (oError) {
				sap.m.MessageToast.show("Excel Verisi Getirilemedi!");
			}
		});

	},

	_onChangeFormValidations: function (aField, iAction, oModel) {
		var oJson = this.getView().getModel("json");
		var sType = oJson.getProperty("/ProcessType");
		var aCheckVal = [];
		if (iAction >= 0) {
			var sFragmentID = "createAromaFragment_2";
		} else {
			sFragmentID = "editAromaFragment";
		}
		jQuery.each(aField, function (key, el) {
			if (sType === "Z008" && el.FieldName !== "ZZHANGI_KOD") {
				if (el.IsMandatory === "X") {
					var oEl1 = sap.ui.core.Fragment.byId(sFragmentID, el.FieldName);
					oEl1.setValueState(sap.ui.core.ValueState.Error);
					aCheckVal.push(el.FieldName);
					oModel.setProperty("/CheckValidations", aCheckVal);
				} else {
					oEl1 = sap.ui.core.Fragment.byId(sFragmentID, el.FieldName);
					oEl1.setValueState(sap.ui.core.ValueState.None);
				}
				if (el.IsReadOnly === "X") {
					var oEl2 = sap.ui.core.Fragment.byId(sFragmentID, el.FieldName);
					oEl2.setEditable(false);
				} else {
					oEl2 = sap.ui.core.Fragment.byId(sFragmentID, el.FieldName);
					oEl2.setEditable(true);
				}
			}
			if (sType === "Z007") {
				if (el.IsMandatory === "X") {
					oEl1 = sap.ui.core.Fragment.byId(sFragmentID, el.FieldName);
					oEl1.setValueState(sap.ui.core.ValueState.Error);
					aCheckVal.push(el.FieldName);
					oModel.setProperty("/CheckValidations", aCheckVal);
				} else {
					oEl1 = sap.ui.core.Fragment.byId(sFragmentID, el.FieldName);
					oEl1.setValueState(sap.ui.core.ValueState.None);
				}
				if (el.IsReadOnly === "X") {
					oEl2 = sap.ui.core.Fragment.byId(sFragmentID, el.FieldName);
					oEl2.setEditable(false);
				} else {
					oEl2 = sap.ui.core.Fragment.byId(sFragmentID, el.FieldName);
					oEl2.setEditable(true);
				}
			}

		});
	},
	onCustomProductKeep: function () {
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment_2", "treeID");
		oListTree.removeSelections(true);
		var oThis = this;
		sap.ui.core.BusyIndicator.show();
		var aProducts = [];
		var oJsonModel = this.getView().getModel("json");
		var sHeaderGuid = oJsonModel.getProperty("/Guid");
		var oModel = this.getView().getModel("customProducts");
		var aCollection = oModel.getProperty("/istekCollection");
		//var oTableTree = this.getView().byId("customProductBasket");
		//var oBinding = oTableTree.getBinding();
		//oBinding.refresh();
		this.oCustomProductFragment.close();
		if (aCollection) {
			for (var i = 0; i < aCollection.length; i++) {
				if (aCollection[i].ItemGuid === undefined) {
					var row = {
						ItemGuid: "00000000-0000-0000-0000-000000000000",
						HeaderGuid: sHeaderGuid,
						//ProcessingMode : "A",
						PypTanim: aCollection[i].PypTanim,
						NumberInt: aCollection[i].NumberInt.toString(),
						NumberParent: "",
						ProductId: aCollection[i].ProductType,
						Quantity: aCollection[i].Quantity
					};
					aProducts.push(row);

					for (var j = 0; j < aCollection[i].Nodes.length; j++) {
						aCollection[i].Nodes[j].HeaderGuid = sHeaderGuid;
						delete aCollection[i].Nodes[j].ParentID;
						delete aCollection[i].Nodes[j].NotesLanguageID;
						delete aCollection[i].Nodes[j].CustomNotes;
						delete aCollection[i].Nodes[j].YillikSatisMik2Value;
						delete aCollection[i].Nodes[j].TanimUyg;
						delete aCollection[i].Nodes[j].TeslimTarihiText;
						delete aCollection[i].Nodes[j].NotesLangType;
						delete aCollection[i].Nodes[j].NotesLanguageID;
						delete aCollection[i].Nodes[j].ModDesc;
						aProducts.push(aCollection[i].Nodes[j]);
					}
				} else {
					for (var k = 0; k < aCollection[i].Nodes.length; k++) {
						if (aCollection[i].Nodes[k].ItemGuid === undefined) {
							aCollection[i].Nodes[k].HeaderGuid = sHeaderGuid;
							aCollection[i].Nodes[k].ParentGuid = aCollection[i].ItemGuid;
							delete aCollection[i].Nodes[k].NumberInt;
							delete aCollection[i].Nodes[k].ParentID;
							delete aCollection[i].Nodes[k].NotesLanguageID;
							delete aCollection[i].Nodes[k].CustomNotes;
							delete aCollection[i].Nodes[k].YillikSatisMik2Value;
							delete aCollection[i].Nodes[k].TanimUyg;
							delete aCollection[i].Nodes[k].TeslimTarihiText;
							delete aCollection[i].Nodes[k].NotesLangType;
							delete aCollection[i].Nodes[k].NotesLanguageID;
							delete aCollection[i].Nodes[k].ModDesc;
							aProducts.push(aCollection[i].Nodes[k]);
						}
					}
				}
			}
		}
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/",
			useBatch: false
		});
		var oJson = this.getView().getModel("json");
		var sGuid = oJson.getProperty("/Guid");
		oModel.setProperty("/ServiceProducts", aProducts);
		var oCreate = {};
		oCreate.Mode = "B";
		oCreate.Guid = sGuid;
		oCreate.Products = aProducts;
		//oCreate = this.getView().getModel("aroma").getData();
		//delete oCreate.MalTeslimAlan;
		//delete oCreate.SorumluCalisan;
		oDataModel.create("/Opportunities", oCreate, {
			success: function (resp) {
				oThis.getView().getModel("customProducts").setProperty("/istekCollection", []);
				sap.ui.core.BusyIndicator.hide();
				if (oThis.oCreateAromaDialog) {
					oThis.oCreateAromaDialog.close();
				}
				if (oThis.oEditAromaFragment) {
					oThis.oEditAromaFragment.close();
				}
				sap.m.MessageToast.show(oResource.getText("SUCCESS_PRODUCT_ADD"));
				oThis._onRefreshProductBindings();
			},
			error: function (err) {
				// TODO: Error mesaji verilecek            
				oThis.getView().getModel("customProducts").setProperty("/istekCollection", []);
				sap.ui.core.BusyIndicator.hide();
				if (oThis.oCreateAromaDialog) {
					oThis.oCreateAromaDialog.close();
				}
				if (oThis.oEditAromaFragment) {
					oThis.oEditAromaFragment.close();
				}
				oThis._onParseErrorMsg(err);
			}
		});

	},
	onCustomProductCancel: function () {
		this.getView().getModel("customProducts").setProperty("/istekCollection", []);
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment_2", "treeID");
		oListTree.removeSelections(true);
		if (this.oCustomProductFragment) {
			this.oCustomProductFragment.close();
		}
	},
	onCustomIstekKeep: function () {
		var oTreeModel = this.getView().getModel("customProducts");
		oTreeModel.setProperty("/tempIstek/ProductType", "REQUEST");
		var oTempIstek = oTreeModel.getProperty("/tempIstek");
		oTreeModel.setProperty("/tempIstek", {
			Nodes: []
		});
		var aIstekCollection = oTreeModel.getProperty("/istekCollection");
		if (oTempIstek.Nodes === undefined) {
			oTempIstek.Nodes = [];
		}
		aIstekCollection.push(oTempIstek);
		var oNavCon = sap.ui.core.Fragment.byId("customProductFragment_2", "navCon");
		var oListPage = sap.ui.core.Fragment.byId("customProductFragment_2", "listIstekID");
		oNavCon.to(oListPage);
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment_2", "treeID");
		var oBinding = oListTree.getBinding();
		oBinding.refresh();
	},
	addAromaNodeToIstek: function () {
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		var oCustomProductModel = this.getView().getModel("customProducts");
		var oAromaModel = this.getView().getModel("aroma");
		var oComboModel = this.getView().getModel("ComboBox");
		var sProjeTuru = oAromaModel.getProperty("/ProjeTuru");
		var aFields = ["PypTanim", "ProjeTuru", "MusteriAdi", "SalesTeam/0/PartnerFunctionCode", "SalesTeam/1/PartnerFunctionCode"]; //,"SalesTeam/1/PartnerFunctionCode"
		var aFields_ID = ["ZZPYP_TANIM", "ZZPROJE_TURU", "ZZMUSTERI_ADI", "deliveryPersonID", "relatedPersonID"]; //,"relatedPersonID"
		var bCheck = false;
		for (var i = 0; i < aFields.length; i++) { // Burasi arapsaci oldu :(
			var sProperty = oAromaModel.getProperty("/" + aFields[i]);
			if (sProperty === undefined || sProperty === "") {
				if (aFields_ID[i] !== "relatedPersonID") {
					var oEl = sap.ui.core.Fragment.byId("createAromaFragment_2", aFields_ID[i]);
					oEl.setValueState(sap.ui.core.ValueState.Error);
					bCheck = true;
				} else {
					oEl = sap.ui.core.Fragment.byId("createAromaFragment_2", aFields_ID[i]);
					oEl.setValueState(sap.ui.core.ValueState.None);
				}
			}
			if (sProperty === "00000015") { //00000015

				if (sProperty === "00000015" && oAromaModel.getProperty("/SalesTeam").length === 1) {
					var oDelivery = sap.ui.core.Fragment.byId("createAromaFragment_2", "deliveryPersonID");
					oDelivery.setValueState(sap.ui.core.ValueState.Error);
					bCheck = true;
				}
				oEl = sap.ui.core.Fragment.byId("createAromaFragment_2", "relatedPersonID");
				oEl.setValueState(sap.ui.core.ValueState.None);
			}
		}
		if (sProjeTuru) {
			var aCheckField = oComboModel.getProperty("/CheckValidations");
			if (aCheckField) {
				for (var j = 0; j < aCheckField.length; j++) {
					var oField = sap.ui.core.Fragment.byId("createAromaFragment_2", aCheckField[j]);
					var sState = oField.getValueState();
					if (sState === "Error") {
						bCheck = true;
					}
				}
			}
		}
		if (bCheck) {
			var sErrorMsg = oResource.getText("ERROR_VALIDATION");
			sap.m.MessageBox.error(sErrorMsg);
		} else {
			var sParentId = oAromaModel.getProperty("/ParentID");
			var oIstek = oCustomProductModel.getProperty("/istekCollection")[sParentId];
			if (oIstek.Nodes === undefined) {
				var iNumberOfNode = oIstek.Nodes.length;
			} else {
				iNumberOfNode = oIstek.Nodes.length;
			}
			var iIstekKalemNo = oIstek.NumberInt;
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
			if (oIstek.Nodes === undefined) {
				oIstek.Nodes.push(oAromaModel.getData());
			} else {
				oIstek.Nodes.push(oAromaModel.getData());
			}
			var bNumber = parseInt(sParentId) + 1;
			sap.m.MessageToast.show(bNumber + "." + oResource.getText("ADDAROMATO_ISTEK"));
			this.oCreateAromaDialog.close();
			var oListTree = sap.ui.core.Fragment.byId("customProductFragment_2", "treeID");
			//oListTree.expandToLevel(1);
			var oBinding = oListTree.getBinding();
			oBinding.refresh();
			var oPage = sap.ui.core.Fragment.byId("customProductFragment_2", "listIstekID");
			oPage.rerender();
			this.getView().getModel("Update").setProperty("/ActionForDialog", false);
		}
	},
	onAddAromaCancel: function () {
		var bEdit = this.getView().getModel("Update").getProperty("/EditButton");
		if (!bEdit) {
			var oValueHelp2 = sap.ui.core.Fragment.byId("createAromaFragment_2", "deliveryPersonID");
			var oValueHelp1 = sap.ui.core.Fragment.byId("createAromaFragment_2", "relatedPersonID");
			oValueHelp2.setValue("");
			oValueHelp1.setValue("");
		}
		this.getView().getModel("Update").setProperty("/ActionForDialog", false);
		if (this.oCreateAromaDialog) {
			this.oCreateAromaDialog.close();
		}
	},
	onCreateNotesToAroma: function () {
		if (!this.oCreateNotesDialog) {
			this.oCreateNotesDialog = sap.ui.xmlfragment("createNotesFragment_2", "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.CreateNotes",
				this);
			this.oCreateNotesDialog.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.oCreateNotesDialog);
		}
		var sLang = sap.ui.getCore().getConfiguration().getLanguage();
		this.getView().getModel("aroma").setProperty("/NotesLanguageID", sLang.toUpperCase());
		this.oCreateNotesDialog.open();
	},
	onAddNotesToAroma: function () {
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
	onAddNotesCancel: function () {
		this.oCreateNotesDialog.close();
		//var oModel = this.getView().getModel("aroma");
		// TO-DO onceki yazdiklarim kalmasin 
		//oModel.getProperty("/CustomNotes");
	},
	onOpenNoteForUpdate: function () {
		if (!this.oUpdateNotesDialog) {
			this.oUpdateNotesDialog = sap.ui.xmlfragment("updateNotesFragment", "cus.crm.opportunity.CRM_OPPRTNTYExtension.view.UpdateNotes",
				this);
			this.oUpdateNotesDialog.setModel(this.getView().getModel("i18n"), "i18n");
			this.getView().addDependent(this.oUpdateNotesDialog);
		}
		this.oUpdateNotesDialog.attachBrowserEvent("keydown", function (oEvent) {
			if (oEvent.which === 27) {
				oEvent.stopPropagation();
				oEvent.preventDefault();
			}
		});
		var sLang = sap.ui.getCore().getConfiguration().getLanguage();
		this.getView().getModel("ComboBox").setProperty("/NotesLanguageID", sLang.toUpperCase());
		var oNoteCombo = sap.ui.core.Fragment.byId("updateNotesFragment", "NotesTypeID");
		var oEdit = this.getView().getModel("aromaEdit");
		var oUpdate = this.getView().getModel("Update");
		var sProjePypNo = oEdit.getProperty("/ProjePypNo");
		if (sProjePypNo.length === 0) { // proje pyp nosu yok is sadece aromsa notu girebilecek
			oNoteCombo.setEditable(false);
			oUpdate.setProperty("/TextObjectID", "Z001");
			var aNotes = oEdit.getProperty("/ComplexNotes/results");
			if (aNotes.length > 0) {
				for (var i = 0; i < aNotes.length; i++) {
					if (aNotes[i].TextObjectID === "Z001") {
						oUpdate.setProperty("/CustomNotes", aNotes[i].Content);
						oUpdate.setProperty("/Mode", "B");
					}
				}
			}
		} else {
			oNoteCombo.setEditable(false);
			oUpdate.setProperty("/TextObjectID", "Z002");
			oUpdate.setProperty("/Mode", "A");
			oUpdate.setProperty("/CustomNotes", "");
		}
		this.oUpdateNotesDialog.open();
	},
	onSelectNotesType: function (e) {
		var oUpdate = this.getView().getModel("Update");
		var oEdit = this.getView().getModel("aromaEdit");
		var sType = oUpdate.getProperty("/TextObjectID");
		this._onChangeNotesEditable(sType, oEdit);
		if (sType === "Z001") { //Aroma Notu
			var aNotes = oEdit.getProperty("/ComplexNotes/results");
			if (aNotes.length > 0) {
				for (var i = 0; i < aNotes.length; i++) {
					if (aNotes[i].TextObjectID === sType) {
						oUpdate.setProperty("/CustomNotes", aNotes[i].Content);
						oUpdate.setProperty("/Mode", "B");
					}
				}
			} else {
				oUpdate.setProperty("/Mode", "A");
			}
		} else {
			oUpdate.setProperty("/CustomNotes", "");
			oUpdate.setProperty("/Mode", "A");
		}
	},
	_onChangeNotesEditable: function (sType, oModel) {
		var oTextArea = sap.ui.core.Fragment.byId("updateNotesFragment", "NoteAreaID");
		oTextArea.setEnabled(true);
		var sStatus = oModel.getProperty("/Status");
		var sProjePYPNo = oModel.getProperty("/ProjePypNo");
		if (sType === "Z001") {
			if (sStatus === "E0001" || sStatus === "E0008") {
				oTextArea.setEnabled(true);
			} else {
				oTextArea.setEnabled(false);
			}
		} else {
			if (sStatus === "E0016" || sStatus === "E0011" || sStatus === "E0012" || sStatus === "E0021" || sProjePYPNo === "") {
				oTextArea.setEnabled(false);
			} else {
				oTextArea.setEnabled(true);
			}
		}
	},
	onSelectNoteLang: function (e) {
		var oUpdate = this.getView().getModel("Update");
		var sKey = e.getSource().getSelectedKey();
		oUpdate.setProperty("/NotesLanguageID", sKey);
	},
	onUpdateNotesToAroma: function () {
		var oUpdate = this.getView().getModel("Update");
		var oEdit = this.getView().getModel("aromaEdit");
		var aNotes = oEdit.getProperty("/ComplexNotes/results");
		var sMode = oUpdate.getProperty("/Mode"); // Aroma Notu create icin Mode A gonder update icin B gonderdik chatbox icin mode hep A
		if (sMode === "B") {
			if (aNotes.length > 0) {
				for (var i = 0; i < aNotes.length; i++) {
					if (aNotes[i].TextObjectID === "Z001") {
						aNotes[i].Content = oUpdate.getProperty("/CustomNotes");
					}
				}
			}
		} else { // Chatbox veya aroma notu create edecekse
			var oNote = {};
			oNote.Content = oUpdate.getProperty("/CustomNotes");
			oNote.Mode = oUpdate.getProperty("/Mode");
			//oNote.TextLanguageID = oUpdate.getProperty("/NotesLanguageID");
			oNote.TextLanguageID = this.getView().getModel("ComboBox").getProperty("/NotesLanguageID");
			oNote.TextObjectID = oUpdate.getProperty("/TextObjectID");
			oNote.CreatedAt = new Date();
			aNotes.push(oNote);

			// if (aNotes.length > 0 ) { 
			//     for ( i=0; i<aNotes.length; i++) {
			//         if (aNotes[i].TextObjectID === "Z001") {	// Aroma notu ise 
			//             aNotes[i].Content = oUpdate.getProperty("/CustomNotes");
			// 			aNotes[i].Mode = oUpdate.getProperty("/Mode");
			// 			aNotes[i].TextLanguageID = this.getView().getModel("ComboBox").getProperty("/NotesLanguageID");
			// 			aNotes[i].CreatedAt = new Date();
			//         }
			//     }
			// } else {	// Ilk defa note giriyor ve aroma notu

			// }
		}
		this.oUpdateNotesDialog.close();
		var oList = sap.ui.core.Fragment.byId("editAromaFragment", "listNote");
		oList.getBinding("items").refresh(true);
	},
	onUpdateNotesCancel: function () {
		this.oUpdateNotesDialog.close();
	},
	onNavBackToProduct: function () {
		var oNavCon = sap.ui.core.Fragment.byId("customProductFragment_2", "navCon");
		var oListTree = sap.ui.core.Fragment.byId("customProductFragment_2", "treeID");
		oListTree.removeSelections(true);
		oNavCon.back();
	},
	onEditProductDetail: function (e) {
		var oTb = this.byId("customProduct_Tab");
		oTb.setBusy(true);
		this.onDisplayProductDetail(e, "edit");
		this.getView().getModel("Update").setProperty("/EditButton", true);
		this.getView().getModel("Update").setProperty("/ActionMode", "E");
		this._onCallServiceForClass("", "", "ZZSINIF_1");
		this._onCallServiceForClass("", "", "ZZSINIF_2");
		this.getView().getModel("ComboBox").setProperty("/ActionForVH", "edit");
	},
	onEditAromaClose: function () {
		this._onChangeHidingPanel(true);
		if (this.oEditAromaFragment) {
			this.oEditAromaFragment.close();
		}
	},
	onEditAromaUpdate: function () {

		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();

		if (this.actionForEdit) {
			this.actionForEdit = false;
			this.oCreateAromaDialog.close();
			sap.m.MessageToast.show(oResource.getText("CHANGE_AROMA"));
			return;
		}
		var oAromaModel = this.getView().getModel("aromaEdit");
		oAromaModel.setProperty("/ProductId", "FLAVOUR");
		var oComboModel = this.getView().getModel("ComboBox");
		var sProjeTuru = oAromaModel.getProperty("/ProjeTuru");
		var aFields = ["PypTanim", "ProjeTuru", "MusteriAdi"];
		var aFields_ID = ["ZZPYP_TANIM", "ZZPROJE_TURU", "ZZMUSTERI_ADI"]; //,"relatedPersonID"
		var bCheck = false;
		for (var i = 0; i < aFields.length; i++) {
			var sProperty = oAromaModel.getProperty("/" + aFields[i]);
			if (sProperty === undefined || sProperty === "") {
				if (aFields_ID[i] !== "relatedPersonID") {
					var oEl = sap.ui.core.Fragment.byId("editAromaFragment", aFields_ID[i]);
					oEl.setValueState(sap.ui.core.ValueState.Error);
					bCheck = true;
				} else {
					oEl = sap.ui.core.Fragment.byId("editAromaFragment", aFields_ID[i]);
					oEl.setValueState(sap.ui.core.ValueState.None);
				}
			}
			if (sProperty === "00000015") { //00000015
				if (sProperty === "00000015" && oAromaModel.getProperty("/SalesTeam").length === 1) {
					var oDelivery = sap.ui.core.Fragment.byId("editAromaFragment", "deliveryPersonID");
					oDelivery.setValueState(sap.ui.core.ValueState.Error);
					bCheck = true;
				}

				oEl = sap.ui.core.Fragment.byId("editAromaFragment", "relatedPersonID");
				oEl.setValueState(sap.ui.core.ValueState.None);
			}
		}
		if (sProjeTuru) {
			var aCheckField = oComboModel.getProperty("/CheckValidations");
			if (aCheckField) {
				for (var j = 0; j < aCheckField.length; j++) {
					var oField = sap.ui.core.Fragment.byId("editAromaFragment", aCheckField[j]);
					var sState = oField.getValue();
					if (sState === "" || sState === undefined) {
						sap.ui.core.Fragment.byId("editAromaFragment", aCheckField[j]).setValueState(sap.ui.core.ValueState.Error);
						bCheck = true;
					}
				}
			}
		}

		//// TODO: eminmisin diye message box ekle 
		if (bCheck) {

			var sErrorMsg = oResource.getText("ERROR_VALIDATION");
			sap.m.MessageBox.error(sErrorMsg);
		} else {
			sap.ui.core.BusyIndicator.show();
			var oThis = this;
			// busy dialog koy 
			var aDelete = ["Acil", "AcilDesc", "AlternatifDesc", "AromaOzellikDesc", "BUReceteDesc", "BoyaTipiDesc", "CozunurlukDesc",
				"Description", "DescriptionUc", "FizikDurumDesc", "GondermeSekliDesc", "HangiKodDesc",
				"IstenenAromaBirim", "ItmLanguage", "ItmType", "ItmTypeUsage", "ItmUsage", "KargoOdemesiDesc", "KodAciklamaDesc",
				"KoruyucuDesc", "MalTeslimAlan", "MaxTonaj", "MinTonaj", "ModDesc", "MstriFZiyrtiDesc", "MusteriBuyukDesc", "MusteriGrubu",
				"NumberExt", "NumuneAmbTipDesc", "NumuneBedeliDesc", "NumuneTipiDesc", "ObjectType", "OrderDate", "OrderedProd",
				"Parent", "PartnerProd", "ProaktifDesc", "Product", "ProductKind", "ProductSrcSys", "ProjeTuruDesc", "SatisaDonOlasDesc",
				"SatisaDonusDesc", "Sinif1Desc", "Sinif2Desc", "SinifIstegiDesc", "SorumluCalisan", "SosAmbTipDesc", "SosTipiDesc",
				"SubstReason", "TahminiTonajDesc", "TeslimSuresiDesc", "UrunBaziDesc", "UygulamaDesc"
			];
			var oJsonModel = this.getView().getModel("json");
			var sGuid = oJsonModel.getProperty("/Guid");
			var oCreate = {};
			var oUpdate = {
				Products: []
			};
			var oEdit = this.getView().getModel("aromaEdit");
			oCreate = oEdit.getData();
			for (var i = 0; i < aDelete.length; i++) {
				var sField = aDelete[i];
				if (oCreate[sField] !== undefined) {
					delete oCreate[sField];
				}
			}
			delete oCreate.Mode;
			delete oCreate.MalTeslimAlan;
			delete oCreate.SorumluCalisan;
			delete oCreate.Pypler;
			oCreate.ComplexNotes = oCreate.ComplexNotes.results;
			//oCreate.Malzemeler = oCreate.Malzemeler.results;
			oCreate.SalesTeam = oCreate.SalesTeam.results;
			oCreate.ItemGuid = oCreate.Guid;
			delete oCreate.Guid;
			var oDataModel = new sap.ui.model.odata.v2.ODataModel({
				serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/",
				useBatch: false
			});
			oUpdate.Mode = "B";
			oUpdate.Guid = sGuid;
			oUpdate.Products.push(oCreate);
			delete oUpdate.Products[0].__metadata;
			var aSalesTeam = oUpdate.Products[0].SalesTeam;
			if (aSalesTeam) {
				for (var j = 0; j < aSalesTeam.length; j++) {
					if (aSalesTeam[j] !== undefined) {
						if (aSalesTeam[j].__metadata !== undefined) {
							delete aSalesTeam[j].__metadata;
						}
					}
				}
			}
			var sMalzemeKod = oEdit.getProperty("/MalzemeKod");
			if (sMalzemeKod !== undefined && sMalzemeKod.length === 0) { // Malzeme kodu yoksa silmis bos gonder
				oEdit.setProperty("/MalzemeKod", "");
				oEdit.setProperty("/Malzeme", "");
				oEdit.setProperty("/OrijinTanim", "");
				oEdit.setProperty("/DoubleKod", "");
				oEdit.setProperty("/DoubleTanim", "");
			}
			oDataModel.create("/Opportunities", oUpdate, {
				success: function () {
					sap.ui.core.BusyIndicator.hide();
					oThis.oEditAromaFragment.close();
					oThis._onChangeHidingPanel(true);
					sap.m.MessageToast.show("Başarı ile güncellendi");
				},
				error: function (err) {
					sap.ui.core.BusyIndicator.hide();
					oThis.oEditAromaFragment.close();
					oThis._onChangeHidingPanel(true);
					var bCompact = !!oThis.getView().$().closest(".sapUiSizeCompact").length;
					oThis._onParseErrorMsg(err);
				}
			});

		}
	},
	onChangePypSonucField: function (e) {
		var bChange = true;
		var oSource = e.getSource();
		var oContext = e.getSource().getBindingContext("aromaEdit");
		var oObject = oContext.getObject();
		var oMalzeme = {};
		oMalzeme.ObjectId = oObject.ObjectId;
		oMalzeme.ParentId = oObject.ParentId;
		oMalzeme.PypNo = oObject.PypNo;
		oMalzeme.RecordId = oObject.RecordId;
		oMalzeme.MalzemeNo = oObject.MalzemeNo;
		oMalzeme.KalemNo = oObject.KalemNo;
		oMalzeme.Sonuc = oSource.getSelectedKey();
		var oModel = this.getView().getModel("aromaEdit");
		var aMalzeme = oModel.getProperty("/Malzemeler");
		for (var i = 0; i < aMalzeme.length; i++) {
			if (oMalzeme.MalzemeNo === aMalzeme[i].MalzemeNo) {
				aMalzeme[i].Sonuc = oMalzeme.Sonuc;
				bChange = false;
			}
		}
		if (bChange) {
			aMalzeme.push(oMalzeme);
		}
	},
	onDeleteProductDetail: function (e) {
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		var oThis = this;
		var oTb = this.byId("customProduct_Tab");
		oTb.setBusy(true);
		var oDelete = {};
		var oProduct = this.getView().getModel("ProductList");
		var oParent = e.getSource().getParent();
		var oNodeState = oParent.getParent()._oNodeState;
		var iParent = oNodeState.groupID.indexOf("Nodes");
		if (iParent < 0) { // istek mi aroma mi? istek
			var sGroupID = oNodeState.groupID.split("/")[1]; //kacinci istek
			var sPath = "/Products/" + sGroupID;
			var sLength = oProduct.getProperty(sPath).Nodes.length;
			if (sLength > 0) { // istege ait aromalar var silemezsin
				oTb.setBusy(false);
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				sap.m.MessageBox.error(
					"İsteğe ait aromalar var önce onları silinmelidir !", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
				return;
			} else {
				sPath = "/Products/" + sGroupID;
				oDelete.HeaderGuid = oProduct.getProperty(sPath).HeaderGuid;
				oDelete.ItemGuid = oProduct.getProperty(sPath).ItemGuid;
				oDelete.ProductGuid = oProduct.getProperty(sPath).ProductGuid;
				oDelete.ProductId = oProduct.getProperty(sPath).ProductId;
				oDelete.ProcessingMode = "D";
				sap.m.MessageBox.confirm(
					oResource.getText("DELETE_PRODUCT_W"), //"Silmek istediginize Emin misiniz ?",
					{
						styleClass: bCompact ? "sapUiSizeCompact" : "",
						onClose: function (oAction) {
							if (oAction === "OK") {
								oThis._onCallProductDelete(oDelete);
							} else {
								oTb.setBusy(false);
							}
						}
					}
				);
			}
			// istekin altinda aroma var once aroma silin !!! 
		} else { // aroma
			var sChildID = oNodeState.groupID.split("_")[2].split("/")[0]; // Kacinci aroma 
			var sParentID = oNodeState.parentGroupID.match(/\d+/)[0]; // aromanin bagli oldugu istek
			sPath = "/Products/" + sParentID + "/Nodes/" + sChildID;
			oDelete.HeaderGuid = oProduct.getProperty(sPath).HeaderGuid;
			oDelete.ItemGuid = oProduct.getProperty(sPath).ItemGuid;
			oDelete.ProductGuid = oProduct.getProperty(sPath).ProductGuid;
			oDelete.ProductId = oProduct.getProperty(sPath).ProductId;
			oDelete.ProcessingMode = "D";
			sap.m.MessageBox.confirm(
				"Silmek istediginize Emin misiniz ?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function (oAction) {
						if (oAction === "OK") {
							oThis._onCallProductDelete(oDelete);
						} else {
							oTb.setBusy(false);
						}
					}
				}
			);
		}

	},
	_onCallProductDelete: function (o) {
		var oThis = this;
		var oTb = this.byId("customProduct_Tab");
		var oModel = this.getView().getModel();
		var aBatchChanges = [];
		var sPath = "OpportunityProducts(HeaderGuid=guid'" + o.HeaderGuid + "',ItemGuid=guid'" + o.ItemGuid + "')";

		aBatchChanges.push(oModel.createBatchOperation(sPath, "MERGE", o));
		oModel.addBatchChangeOperations(aBatchChanges);
		oModel.submitBatch(function (data) {
			oTb.setBusy(false);
			oThis._onRefreshProductBindings();
		}, function (err) {
			oTb.setBusy(false);
			oThis._onParseErrorMsg(err);
		});
	},
	onProductSendReject: function (e) {
		this.onProductSendConfirm(e, true);
	},
	onProductSendConfirm: function (e, bAction) {
		var oTb = this.getView().byId("customProduct_Tab");
		oTb.setBusy(true);
		var oModel = this.getView().getModel("ProductList");
		var oParent = e.getSource().getParent();
		var oNodeState = oParent.getParent()._oNodeState;
		var iParent = oNodeState.groupID.indexOf("Nodes");
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
		var oThis = this;
		sap.m.MessageBox.confirm(
			oResource.getText("EVENTPRODUCT_WARNING"), {
				styleClass: bCompact ? "sapUiSizeCompact" : "",
				onClose: function (oAction) {
					if (oAction === "OK") {
						if (iParent < 0) {
							var sIstek = oNodeState.groupID.match(/\d+/)[0];
							var sPath = "/Products/" + sIstek;
							var sHeaderGuid = oModel.getProperty(sPath).HeaderGuid;
							var sItemGuid = oModel.getProperty(sPath).ItemGuid;
						} else {
							//var sAroma = oNodeState.groupID.slice(-2,-1);   // Kacinci Aroma
							var sAroma = oNodeState.groupID.split("_")[2].split("/")[0]; // Kacinci Aroma
							sIstek = oNodeState.parentGroupID.match(/\d+/)[0]; //Kacinci istek
							sPath = "/Products/" + sIstek;
							sHeaderGuid = oModel.getProperty(sPath).Nodes[sAroma].HeaderGuid;
							sItemGuid = oModel.getProperty(sPath).Nodes[sAroma].ItemGuid;
						}
						if (bAction === undefined) { // Onay verirse
							oThis._onUpdateProductStatus(sHeaderGuid, sItemGuid, "E0008");

						} else { //Iptal ederse
							oThis._onUpdateProductStatus(sHeaderGuid, sItemGuid, "E0017");
						}
					} else {
						oTb.setBusy(false);
					}
				}
			}
		);
	},
	_onUpdateProductStatus: function (H, I, S) {
		var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/",
			defaultUpdateMethod: "PUT"
		});
		//oDataModel.setUseBatch(false);
		var oThis = this;
		var oUpdate = {};
		oUpdate.ItemGuid = I;
		oUpdate.Status = S;
		var sPath = "/CustomizingProductStatuUpdateSet(guid'" + H + "')";
		oDataModel.update(sPath, oUpdate, {
			success: function (resp, oParam) {
				var sStatus = oParam.headers.status;
				if (sStatus === "FAIL") { // Hatayi da succesde dondu backendden
					var oTb = oThis.getView().byId("customProduct_Tab");
					oTb.setBusy(false);
					sap.m.MessageBox.error("Belge Saklanamadi"); // Gecici olarak genel hata verdik
				} else {
					sap.m.MessageToast.show(oResource.getText("PRODUCTSTATUS_UPDATE"));
					oThis._onRefreshProductBindings();
					var sProjePYPNo = oThis.getView().getModel("json").getProperty("/ProjePypNo");
					if (sProjePYPNo.length === 0) {
						oThis.getDataForDetailScreen(true);
					}
				}
			},
			error: function (err) {
				oThis._onParseErrorMsg(err);
				var oTb = oThis.getView().byId("customProduct_Tab");
				oTb.setBusy(false);
			}
		});

	},
	_onRefreshProductBindings: function () {
		var sPath = "/" + this.sPath;
		var aProducts = [];
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		var oThis = this;
		oDataModel.read(sPath, {
			urlParameters: {
				"$expand": "Products"
			},
			success: function (resp) {
				aProducts = resp.Products.results;
				oThis._onGetShapeOfTreeProducts(aProducts);
				var oTb = oThis.getView().byId("customProduct_Tab");
				oTb.getBinding("rows").refresh();
			},
			error: function (err) {
				oThis._onParseErrorMsg(err);
				var oTb = oThis.getView().byId("customProduct_Tab");
				oTb.setBusy(false);
			}
		});

	},
	onSelectRelatedValueHelp: function (e, isDelivery) {
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
	},
	_onCallServiceForPerson: function (isDelivery) {
		var oThis = this;
		var oJsonModel = this.getView().getModel("json");
		var sAccountID = oJsonModel.getProperty("/ProspectNumber");
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
			//var sPath = "/AccountCollection('"+sAccountID+"')";
			oDataModel.read(sPath, {
				//urlParameters : { "$expand" : "Relationships,MainAddress" },
				filters: [oFilter],
				success: function (resp) {
					jQuery.each(resp.results, function (key, el) {
						// if (el.relationshipCategory !== "CRMH02") {
						//     return;
						// }
						var row = {
							FullName: el.account2FullName,
							ID: el.account2ID,
							Address: el.Address
						};
						/*                            for (var i=0;i<el.) {
						                                
						                            }*/
						aCollection.push(row);
					});
					//var oAccount = {};
					//oAccount.FullName = oJsonModel.getProperty("/ProspectName");
					//oAccount.ID = oJsonModel.getProperty("/ProspectNumber");
					//aCollection.push(oAccount); 
					oModel.setProperty("/PersonCollection", aCollection);
					oModel.setProperty("/isDelivery", isDelivery);
					oThis.getView().setBusy(false);
				},
				error: function (err) {
					oThis._onParseErrorMsg(err);
					oThis.getView().setBusy(false);
				}
			});
		} else { //Ilgili Kisiler
			oDataModel.read("/ContactCollection", {
				filters: [new sap.ui.model.Filter({
					path: "accountID",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: sAccountID
				})],
				success: function (resp) {
					jQuery.each(resp.results, function (key, el) {
						var row = {
							FullName: el.fullName,
							ID: el.contactID
						};
						aCollection.push(row);
					});
					oModel.setProperty("/PersonCollection", aCollection);
					oModel.setProperty("/isDelivery", isDelivery);
					oThis.setBusy(false);
				},
				error: function (err) {
					oThis._onParseErrorMsg(err);
					oThis.setBusy(false);
				}
			});
		}
	},
	onSelectDeliveryValueHelp: function () {
		//this.setBusy(true);
		this.onSelectRelatedValueHelp(null, true);
	},
	_onHandlePersonSelectForAdd: function (e) {
		var oModel = this.getView().getModel("AromaDetail");
		var oAromaModel = this.getView().getModel("aroma");
		var bDelivery = oModel.getProperty("/isDelivery");
		var oItem = e.getParameters().selectedItem;
		var sID = oItem.getProperty("info");
		var sFullName = oItem.getProperty("title");
		if (!bDelivery) {
			var row = {
				PartnerNumber: sID,
				PartnerFunctionCode: "00000015"
			};
			var oValueHelp1 = sap.ui.core.Fragment.byId("createAromaFragment_2", "relatedPersonID");
			oValueHelp1.setValue(sFullName);
			oValueHelp1.setValueState(sap.ui.core.ValueState.None);
		} else {
			row = {
				PartnerNumber: sID,
				PartnerFunctionCode: "00000002"
			};
			var oValueHelp2 = sap.ui.core.Fragment.byId("createAromaFragment_2", "deliveryPersonID");
			oValueHelp2.setValue(sFullName);
			oValueHelp2.setValueState(sap.ui.core.ValueState.None);
		}
		var aSalesTeam = oAromaModel.getProperty("/SalesTeam");
		aSalesTeam.push(row);
	},
	onHandlePersonSelect: function (e) {
		//var bAction = this.getView().getModel("Update").getProperty("/ActionForDialog");
		var bAction = this.getView().getModel("Update").getProperty("/EditButton");
		if (!bAction) {
			this._onHandlePersonSelectForAdd(e);
		} else {
			var oModel = this.getView().getModel("AromaDetail");
			var oEdit = this.getView().getModel("aromaEdit");
			var bDelivery = oModel.getProperty("/isDelivery");
			var oItem = e.getParameters().selectedItem;
			var sID = oItem.getProperty("info");
			var sFullName = oItem.getProperty("title");
			if (!bDelivery) {
				var row = {
					PartnerNumber: sID,
					PartnerFunctionCode: "00000015"
				};
				var oValueHelp1 = sap.ui.core.Fragment.byId("editAromaFragment", "relatedPersonID");
				oValueHelp1.setValue(sFullName);
				oValueHelp1.setValueState(sap.ui.core.ValueState.None);
			} else {
				row = {
					PartnerNumber: sID,
					PartnerFunctionCode: "00000002"
				};
				var oValueHelp2 = sap.ui.core.Fragment.byId("editAromaFragment", "deliveryPersonID");
				oValueHelp2.setValue(sFullName);
				oValueHelp2.setValueState(sap.ui.core.ValueState.None);
			}
			var aSalesTeam = oEdit.getProperty("/SalesTeam/results");
			for (var i = 0; i < aSalesTeam.length; i++) {
				if (aSalesTeam[i].PartnerFunctionCode === row.PartnerFunctionCode) {
					delete aSalesTeam[i];
					break;
				}
			}
			aSalesTeam.push(row);
		}
	},

	onHandlePersonSearch: function (e) {
		var sValue = e.getParameter("value");
		var oPractice = new sap.ui.model.Filter("FullName", sap.ui.model.FilterOperator.Contains, sValue);
		e.getSource().getBinding("items").filter(oPractice);
	},

	onDisplayProductDetail: function (e, sMode) {
		var oJson = this.getView().getModel("json");
		var oTb = this.getView().byId("customProduct_Tab");
		oTb.setBusy(true); //Test icin disable yaptim
		//oNodeState.groupID.includes("Childs");
		var oThis = this;
		var oParent = e.getSource().getParent();
		if (sMode === undefined) { // Product display mode
			var oNodeState = oParent._oNodeState;
			var iParent = oNodeState.groupID.indexOf("Nodes");
			//var bExpanded = oNodeState.expanded;
			var sGroupID = oNodeState.groupID.split("_")[2].split("/")[0]; //istege ait kacinci child
			//var sGroupID = oNodeState.groupID.slice(-2,-1); //istege ait kacinci child
			if (oNodeState.parentGroupID.match(/\d+/) === null) {
				oTb.setBusy(false);
			} else {
				var sParentGroupID = oNodeState.parentGroupID.match(/\d+/)[0]; //Child hangi istege ait
			}

		}
		if (sMode === "edit") {
			oNodeState = oParent.getParent()._oNodeState;
			iParent = oNodeState.groupID.indexOf("Nodes");
			//bExpanded = oNodeState.expanded;
			//sGroupID = oNodeState.groupID.slice(-2,-1); //istege ait kacinci child
			sGroupID = oNodeState.groupID.split("_")[2].split("/")[0]; //istege ait kacinci child
			sParentGroupID = oNodeState.parentGroupID.match(/\d+/)[0]; //Child hangi istege ait
		}
		if (iParent >= 0) { // Aroma Detayi
			if (sMode === undefined) {
				if (!this.oDisplayAromaFragment) {
					this.oDisplayAromaFragment = sap.ui.xmlfragment("displayAromaFragment",
						"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.DisplayAromaDialog", this);
					this.oDisplayAromaFragment.setModel(this.getView().getModel("i18n"), "i18n");
					this.getView().addDependent(this.oDisplayAromaFragment);
				}
				this.oDisplayAromaFragment.attachBrowserEvent("keydown", function (oEvent) {
					if (oEvent.which === 27) {
						oEvent.stopPropagation();
						oEvent.preventDefault();
					}
				});
			}
			if (sMode === "edit") {
				if (!this.oEditAromaFragment) {
					this.oEditAromaFragment = sap.ui.xmlfragment("editAromaFragment",
						"cus.crm.opportunity.CRM_OPPRTNTYExtension.view.EditAromaDialog",
						this);
					this.oEditAromaFragment.setModel(this.getView().getModel("i18n"), "i18n");
					this.getView().addDependent(this.oEditAromaFragment);
				}
				this.oEditAromaFragment.attachBrowserEvent("keydown", function (oEvent) {
					if (oEvent.which === 27) {
						oEvent.stopPropagation();
						oEvent.preventDefault();
					}
				});
				this._onResetAllFormFields(this, "editAromaFragment");
				var oInput = sap.ui.core.Fragment.byId("editAromaFragment", "relatedPersonID");
				var oInput2 = sap.ui.core.Fragment.byId("editAromaFragment", "deliveryPersonID");
				oInput.setValue("");
				oInput2.setValue("");
			}
			this.getView().getModel("Update").setProperty("/EditButton", undefined);
			var sPath = "/Products/" + sParentGroupID + "/" + "Nodes/" + sGroupID;
			var oProductModel = this.getView().getModel("ProductList");
			var oChild = oProductModel.getProperty(sPath);
			var sProductGuid = oChild.ItemGuid;
			var oModel = this.getView().getModel();
			var sServicePath = "/CustomizingProductSet(guid'" + sProductGuid + "')";
			oModel.read(sServicePath, {
				urlParameters: {
					"$expand": "Pypler,Malzemeler,SalesTeam,ComplexNotes"
				},
				success: function (resp) {
					oTb.setBusy(false);
					oThis._onGetShapeOfTreePYP(resp);
					if (sMode === undefined) {
						oThis.oDisplayAromaFragment.open();
						oThis._onHideFieldsForBayi("displayAromaFragment");
						var oAromaModel = oThis.getView().getModel("AromaDetail");
						oAromaModel.setProperty("/Detail", resp);
						//oThis.getView().setModel(oAromaModel,"aromaDetail");
						var sType = oJson.getProperty("/ProcessType");
						oAromaModel.setProperty("/Detail/ProcessType", sType);
					}
					if (sMode === "edit") {
						var oTemp = new sap.ui.model.json.JSONModel({});
						oThis.getView().setModel(oTemp, "aromaEdit"); // Sayfayi temizledik
						if (resp.Status !== "E0001" && resp.Status !== "E0018") { //E0012
							oThis._onChangeHidingPanel(false, resp.Status);
						}
						oThis.oEditAromaFragment.open();
						oThis._onHideFieldsForBayi("editAromaFragment");
						//resp.Pypler.results = [];
						//resp.Pypler.results.push(oTreeJson);
						var oEditModel = new sap.ui.model.json.JSONModel(resp);
						oThis.getView().setModel(oEditModel, "aromaEdit");
						var oEdit = oThis.getView().getModel("aromaEdit");
						var sYillikSatisMik2 = oEdit.getProperty("/YillikSatisMik2");
						var sTahRmBrm = oEdit.getProperty("/TahRmBrm");
						var sIstnnArmMik2 = oEdit.getProperty("/IstnnArmMik2");
						if (sYillikSatisMik2 === "") {
							oEdit.setProperty("/YillikSatisMik2", "KG");
							//sYillikSatisMik2 = "KG";
						}
						if (sTahRmBrm === "") {
							oEdit.setProperty("/TahRmBrm", "EUR");
							//sTahRmBrm = "EUR";
						}
						if (sIstnnArmMik2 === "") {
							oEdit.setProperty("/IstnnArmMik2", "G");
							//sIstnnArmMik2 = "G";
						}
						oThis.getView().getModel("aromaEdit").setProperty("/Malzemeler", []);
						var aPerson = resp.SalesTeam.results;
						for (var i = 0; i < aPerson.length; i++) {
							if (aPerson[i].PartnerFunctionCode === "00000015") {
								oEditModel.setProperty("/SorumluCalisan", aPerson[i].PartnerName);
							}
							if (aPerson[i].PartnerFunctionCode === "00000002") {
								oEditModel.setProperty("/MalTeslimAlan", aPerson[i].PartnerName);
							}
						}
						oThis.onCallServiceForCombo("edit");
					}
				},
				error: function (err) {
					oTb.setBusy(false);
					oThis._onParseErrorMsg(err);
				}
			});
		} else {
			oTb.setBusy(false);
			//TO-DO
			//Istek Detayi gosterilecek
		}
	},

	_onChangeHidingPanel: function (bAction, sStatu) {
		var aPanel = ["projectPanelID", "aromaPanelID", "sosPanelID", "pypPanelID", "ilgiliPanelID"];
		var oPanelNot = sap.ui.core.Fragment.byId("editAromaFragment", "NotlarPanelID");
		if (bAction) { // Goster
			for (var i = 0; i < aPanel.length; i++) {
				var oPanel = sap.ui.core.Fragment.byId("editAromaFragment", aPanel[i]);
				oPanel.setVisible(bAction);
			}
			oPanelNot.setVisible(bAction);
		} else { // Gizle
			for (i = 0; i < aPanel.length; i++) {
				oPanel = sap.ui.core.Fragment.byId("editAromaFragment", aPanel[i]);
				oPanel.setVisible(bAction);
			}
			if (sStatu === "E0012" || sStatu === "E0011") {
				oPanel = sap.ui.core.Fragment.byId("editAromaFragment", "pypPanelID");
				oPanel.setVisible(true);
				oPanelNot.setVisible(false);
			}

		}
	},

	onDisplayAromaClose: function () {
		if (this.oDisplayAromaFragment) {
			this.oDisplayAromaFragment.close();
		}
	},
	_onResetAllFormFields: function (oThis, sFragmentName) {
		var aTitle = ["SimpleFormProjectInfo", "SimpleFormAromaInfo", "SimpleFormSOSInfo"];
		for (var i = 0; i < aTitle.length; i++) {
			var oForm = sap.ui.core.Fragment.byId(sFragmentName, aTitle[i]);
			var oContent = oForm.getContent();
			jQuery.each(oContent, function (key, el) {
				var sField = el.getMetadata().getName();
				if (sField === "sap.m.Input" || sField === "sap.m.ComboBox") {
					el.setValueState("None");
				}
			});
		}
	},
	onCallServiceForCombo: function (sMode) {
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		var aCombox = ["ZZPROJE_TURU", "ZZMUSTERI_BUYUK", "ZZSATISA_DONUS", "ZZLIKELIHD", "ZZGONDERME_SEKLI", "ZZKARGO_ODEMESI",
			"ZZMSTRI_F_ZIYRTI", "ZZNUMUNE_BEDELI", "ZZPROAKTIF", "ZZTESLIM_SURESI", "ZZAROMA_OZELLIK", "ZZBU_RECETE", "ZZCOZUNURLUK",
			"ZZFIZIK_DURUM", "ZZALTERNATIF", "ZZHANGI_KOD", "ZZKOD_ACIKLAMA", "ZZNUMUNE_TIPI", "ZZSINIF_ISTEGI", "ZZURUN_BAZI",
			"ZZUYGULAMA", "ZZBOYA_TIPI", "ZZKORUYUCU", "ZZNUMUNE_AMB_TIP", "ZZSOS_AMB_TIP", "ZZSOS_TIPI", "ZZFLD00004C"
		];
		/*            if (sMode === "add") {
		                var oModel = this.getView().getModel("aroma");   
		            } else {
		                oModel = this.getView().getModel("aromaEdit");
		            }*/
		var oModel = this.getView().getModel("ComboBox");
		var oThis = this;
		for (var i = 0; i < aCombox.length; i++) {
			oDataModel.read("/CustomizingSearchHelpSet", {
				filters: [new sap.ui.model.Filter({
					path: "FieldName",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: aCombox[i]
				})],
				success: function (resp) {
					var sPath = "/" + resp.results[0].FieldName;
					oModel.setProperty(sPath, resp.results);
				},
				error: function (err) {
					oThis._onParseErrorMsg(err);
				}
			});
		}
	},
	_onChangeDisableProduct: function () {
		var oController = this;
		var oView = this.getView();
		var oCombo = this.getView().getModel("ComboBox");
		var sProcessType = oCombo.getProperty("/ProcessType");
		if (sProcessType === undefined) {
			var sPath = window.location.hash.split("/")[2]; //window.location.hash.substring(33);
			var oDataModel = new sap.ui.model.odata.v2.ODataModel({
				serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
			});
			var oThis = this;
			var oCombo = this.getView().getModel("ComboBox");
			oDataModel.read("/" + sPath, {
				success: function (resp) {
					oCombo.setProperty("/ProcessType", resp.ProcessType);
					if (resp.ProcessType === "Z007" || resp.ProcessType === "Z008") {
						oController.byId("tab_customProduct").setVisible(true);
						oController.byId("tab_product").setVisible(false);
						oView.rerender();
					}
					if (resp.ProcessType === "Z003" || resp.ProcessType === "Z004") {
						oController.byId("tab_customProduct").setVisible(false);
						oController.byId("tab_product").setVisible(true);
						oView.rerender();
					}
				},
				error: function (err) {
					oController._onParseErrorMsg(err);
				}
			});
		} else {
			if (sProcessType === "Z007" || sProcessType === "Z008") {
				oController.byId("tab_customProduct").setVisible(true);
				oController.byId("tab_product").setVisible(false);
				oView.rerender();
			}
			if (sProcessType === "Z003" || sProcessType === "Z004") {
				oController.byId("tab_customProduct").setVisible(false);
				oController.byId("tab_product").setVisible(true);
				oView.rerender();
			}
		}
	},

	_onCheckUserAuthorization: function (sID) {
		if (sID) {
			var sPartnerNo = sID;
		} else {
			sPartnerNo = "";
		}

		var oUpdate = this.getView().getModel("Update");
		var oDataModel = new sap.ui.model.odata.v2.ODataModel({
			serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
		});
		var oThis = this;
		oDataModel.callFunction("/CustomizingCheckAuthorization", {
			method: "GET",
			urlParameters: {
				"PartnerNo": sPartnerNo
			},
			success: function (resp) {
				if (resp.CustomizingCheckAuthorization.PartnerNo.length === 0) {
					oUpdate.setProperty("/UserAuth", resp.CustomizingCheckAuthorization.HasAutho);
				} else {
					oUpdate.setProperty("/UserAuth_2", resp.CustomizingCheckAuthorization.HasAutho);
				}

			},
			error: function (err) {
				oThis._onParseErrorMsg(err);
			}
		});
	},

	detailRouteMatched: function (e) {
		if (e.getParameter("name") === "detail" || e.getParameter("name") === "detailonly") {
			//Customizing
			this._onChangeDisableProduct();
			this._onCheckUserAuthorization();
			var aProducts = [];
			var sPath = "/" + e.getParameters().arguments.contextPath;
			console.log(sPath);
			var oDataModel = new sap.ui.model.odata.v2.ODataModel({
				serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
			});
			var oThis = this;
			if (sPath !== "/Opportunities") {
				oDataModel.read(sPath, {
					urlParameters: {
						"$expand": "Products"
					},
					success: function (resp) {
						aProducts = resp.Products.results;
						oThis._onGetShapeOfTreeProducts(aProducts);
						oThis._onCheckUserAuthorization(resp.ProspectNumber);
					},
					error: function (err) {
						oThis._onParseErrorMsg(err);
					}
				});
			}
			//}

			this.fullScreenMode = false;
			this.mPartnerImgSrc = {};
			if (this.navToOtherApp) {
				this.navToOtherApp = false;
				return;
			}
			var s = this.getS4Controller();
			if (s && s.bCancel && !this.bAppLaunched) {
				s.bCancel = false;
				this.setDefaultTabToInfo();
				this.refreshMsgLog(false);
				return;
			}
			if (s && s.bEmployeeUpdateSuccess) {
				this.oModel.refresh();
			}
			this.byId("opportunityHeader").setIcon("sap-icon://person-placeholder");
			this.sPath = e.getParameter("arguments").contextPath;
			this.getDataForDetailScreen(true);
			window.setTimeout(jQuery.proxy(function () {
				var S = this.getView().getModel("controllers").getData().s2Controller;
				if (S) {
					S.oApplicationFacade.oApplicationImplementation.oMHFHelper.defineMasterHeaderFooter(S);
					S._checkForOfflineErrors();
				}
				if (this.bAppLaunched) {
					this.bAppLaucnhed = false;
				}
			}, this), 10);
		}
		if (e.getParameter("name") === "display") {
			//Customizing
			this._onChangeDisableProduct();
			this._onCheckUserAuthorization();
			aProducts = [];
			sPath = "/" + e.getParameters().arguments.contextPath;
			oDataModel = new sap.ui.model.odata.v2.ODataModel({
				serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
			});
			oThis = this;
			oDataModel.read(sPath, {
				urlParameters: {
					"$expand": "Products"
				},
				success: function (resp) {
					aProducts = resp.Products.results;
					oThis._onGetShapeOfTreeProducts(aProducts);
					oThis._onCheckUserAuthorization(resp.ProspectNumber);
				},
				error: function (err) {
					oThis._onParseErrorMsg(err);
				}
			});
			//
			this.fullScreenMode = true;
			this.oHeaderFooterOptions = this.oHeaderFooterOptions4UI;
			if (this.navToOtherApp) {
				this.navToOtherApp = false;
				return;
			}
			var s = this.getS4Controller();
			if (s && s.bCancel) {
				s.bCancel = false;
				this.setDefaultTabToInfo();
				return;
			}
			if (s && s.bEmployeeUpdateSuccess) {
				this.oModel.refresh();
			}
			this.byId("opportunityHeader").setIcon("sap-icon://person-placeholder");
			this.sPath = e.getParameter("arguments").contextPath;
			this.getDataForDetailScreen(true);
		}
	},
	onCheckMandatoryCombo: function (e) {
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

	onSelectDeliveryDate: function (e) {
		var oDate = e.getSource().getDateValue();
		var sDeliveryDate = oDate.getFullYear() + "-" + (oDate.getMonth() + 1) + "-" + oDate.getDate() + "T00:00:00";
		var sAction = this.getView().getModel("ComboBox").getProperty("/ActionForVH");
		if (sAction === "edit") {
			var oModel = this.getView().getModel("aromaEdit");
		} else {
			oModel = this.getView().getModel("aroma");
		}
		oModel.setProperty("/TeslimTarih", sDeliveryDate);
	},
	//    searchSalesArea: function (e) {
	//        var v = e.getParameter("query").toLowerCase();
	//        var s = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea").getProperty("/SalesAreaList").results;
	//        var a = new Array();
	//        var i = new Array();
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
	//        var a = this.byId("opportunityHeader").getModel("json").getData().ProspectNumber;
	//        var b = this.byId("opportunityHeader").getModel("json").getData().ProspectName;
	//        if (this.extHookIsEnableAllSetsOrgResults) {
	//            this.allOrgSetsFlag = this.extHookIsEnableAllSetsOrgResults();
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
	//        var c = t.getContent()[0];
	//        if (this.allOrgSetsFlag == true && parseFloat(this.sBackendVersion) >= 6) {
	//            t.getContent()[2].setVisible(true);
	//        }
	//        t.setVisible(false);
	//        if (a !== "") {
	//            t.setVisible(true);
	//            c.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FILTER") + " " + b);
	//            this.oModel.read("/SalesAreas", null, ["$filter=ProspectNumber eq '" + a + "'"], true, jQuery.proxy(function (o, r) {
	//                this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//                this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data] });
	//                if (!this.salesareaF4Fragment.getModel("SalesArea")) {
	//                    this.salesareaF4Fragment.setModel(new sap.ui.model.json.JSONModel(), "SalesArea");
	//                }
	//                var s = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea");
	//                s.setProperty("/SalesAreaList", r.data);
	//                this.salesareaF4Fragment.getModel("json").updateBindings();
	//            }, this), jQuery.proxy(function (E) {
	//                this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: [] });
	//                this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this));
	//        } else {
	//            t.setVisible(false);
	//            this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: [] });
	//            this.salesareaF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//            this.oModel.read("SalesAreas ", null, ["$filter=substringof('" + this.byId("salesorganization_Text").getText() + "')"], true, jQuery.proxy(function (o, r) {
	//                this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data] });
	//                this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this), jQuery.proxy(function (E) {
	//                this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//            }, this));
	//        }
	//        this.salesareaF4Fragment.open();
	//    },
	//    closeSalesAreaF4: function (e) {
	//        if (this.salesareaF4Fragment.getContent()[0].getModel("SalesArea")) {
	//            if (this.allOrgSetsFlag == true && parseFloat(this.sBackendVersion) >= 6) {
	//                var t = this.salesareaF4Fragment.getContent()[0].getInfoToolbar();
	//                t.getContent()[2].setVisible(false);
	//            }
	//            this.salesareaF4Fragment.getContent()[0].getModel("SalesArea").destroy();
	//        }
	//        if (this.salesareaF4Fragment !== undefined) {
	//            this.salesareaF4Fragment.close();
	//            if (this.salesareaF4Fragment.getSubHeader().getContentLeft()[0].getValue() != "")
	//                this.salesareaF4Fragment.getSubHeader().getContentLeft()[0].setValue("");
	//        }
	//    },
	//    setSalesArea: function (e) {
	//        if (this.salesareaF4Fragment.getContent()[0].getModel("SalesArea")) {
	//            this.salesareaF4Fragment.getContent()[0].getModel("SalesArea").destroy();
	//        }
	//        var t = this.getView().byId("salesorganization_Text").getText();
	//        var a = this.getView().byId("distributionchannel_Text").getText();
	//        var b = this.getView().byId("division_Text").getText();
	//        this.oSelectedContact = e.getSource().getSelectedItem().getBindingContext("json").getObject();
	//        this.acc_salesorgid = this.oSelectedContact.SalesOrganizationId;
	//        this.acc_salesorgdesc = this.oSelectedContact.SalesOrganizationText;
	//        var s = this.oFormatter.formatSalesOrganization(this.acc_salesorgdesc, this.acc_salesorgid);
	//        this.getView().byId("salesorganization_Text").setText(s);
	//        this.acc_dischaid = this.oSelectedContact.DistrubutionChannelId;
	//        this.acc_dischadesc = this.oSelectedContact.DistrubutionChannelText;
	//        var d = this.oFormatter.formatDistributionChannel(this.acc_dischadesc, this.acc_dischaid);
	//        this.getView().byId("distributionchannel_Text").setText(d);
	//        this.acc_divid = this.oSelectedContact.DivisionId;
	//        this.acc_divdesc = this.oSelectedContact.DivisionText;
	//        var c = this.oFormatter.formatDivision(this.acc_divdesc, this.acc_divid);
	//        this.getView().byId("division_Text").setText(c);
	//        if (t === s && a === d && b === c) {
	//            this.closeSalesAreaF4(e);
	//            return;
	//        }
	//        this.oModel.clearBatch();
	//        var f = [];
	//        var i = this.getView().byId("info");
	//        var h = i.getModel("json").getData().Guid;
	//        this.salesareaF4Fragment.getContent()[0].getSelectedItems();
	//        var E;
	//        E = {
	//            Guid: h,
	//            SalesOrganization: this.acc_salesorgid,
	//            SalesOrganizationDescription: this.acc_salesorgdesc,
	//            DistributionChannel: this.acc_dischaid,
	//            DistributionChannelDescription: this.acc_dischadesc,
	//            Division: this.acc_divid,
	//            DivisionDescription: this.acc_divdesc
	//        };
	//        this.oModel.update("Opportunities(guid'" + h + "')", E, {
	//            fnSuccess: jQuery.proxy(function (r) {
	//                this.salesareaF4Fragment.getContent()[0].removeSelections();
	//                this.salesareaF4Fragment.close();
	//                cus.crm.opportunity.util.Util.refreshHeaderETag(this.sPath, this);
	//            }, this),
	//            fnError: jQuery.proxy(function (o) {
	//                if (o.response.statusCode === 412) {
	//                    cus.crm.opportunity.util.Util.show412ErrorDialog(this, jQuery.proxy(function () {
	//                        cus.crm.opportunity.util.Util.refreshHeaderETag(this.sPath, this);
	//                    }, this));
	//                    return;
	//                }
	//                this.handleErrors(o);
	//            }, this),
	//            bMerge: true
	//        });
	//        this.closeSalesAreaF4(e);
	//        this.refreshMsgLog(true);
	//    },
	onAccountBusCardLaunch: function (e) {
		var a = e.getSource().data("PartnerNumber");
		var I;
		if (!this.bHideImage && !this.isOffline) {
			I = e.getSource().data("Image");
		} else {
			I = "sap-icon://person-placeholder";
		}
		var m = this.oModel;
		var b = e.getSource();
		if (!a) {
			sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT_IS_NULL"));
		} else {
			var p = "AccountCollection(accountID='" + a + "')?$expand=MainAddress,MainContact/WorkAddress,MainContact";
			var B = [];
			B.push(m.createBatchOperation(p, "GET"));
			m.addBatchReadOperations(B);
			m.submitBatch(jQuery.proxy(function (r) {
				var M = {
					Value: ""
				};
				M.Value = r.__batchResponses[0].data;
				if (!M.Value) {
					if (this.isOffline) {
						sap.ca.ui.message.showMessageBox({
							type: sap.ca.ui.message.Type.ERROR,
							message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("BP_NOT_FOUND")
						});
					} else {
						sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ERROR"));
					}
				} else {
					if (this.isCrossAppSupportedInOffline("MyAccounts") || !this.isOffline) {
						var c = jQuery.proxy(function (E) {
							var n = {};
							n.target = {};
							n.target.semanticObject = "ZMyAccounts"; //Customizing //"Account";
							if (this.isOffline) {
								// Customizing
								//n.target.action = "MyAccounts&/detail/AccountCollection(accountID='" + a + "')";
								n.target.action = "create&/detail/AccountCollection(accountID='" + a + "')";
							} else {
								//Customizing
								//n.target.action = "MyAccounts&/detail/AccountCollection('" + a + "')";
								n.target.action = "create&/detail/AccountCollection('" + a + "')";
							}
							if (this.extHookGetExtendedAppDetailsGeneral) {
								n = this.extHookGetExtendedAppDetailsGeneral(n);
							}
							this.navToOtherApp = true;
							return n;
						}, this);
					}
					if (M.Value.MainContact) {
						if (M.Value.MainContact.WorkAddress) {
							if (M.Value.MainAddress) {
								var C = {
									title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT"),
									imgurl: I,
									companyname: M.Value.name1,
									companyphone: M.Value.MainAddress.phone,
									companyaddress: M.Value.MainAddress.address,
									maincontactname: M.Value.MainContact.fullName,
									maincontactmobile: M.Value.MainContact.WorkAddress.mobilePhone,
									maincontactphone: M.Value.MainContact.WorkAddress.phone,
									maincontactemail: M.Value.MainContact.WorkAddress.email,
									maincontactemailsubj: "Automatic Mail for Maincontact",
									beforeExtNav: c
								};
								var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
								o.openBy(b);
							} else {
								var C = {
									title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT"),
									imgurl: I,
									companyname: M.Value.name1,
									maincontactname: M.Value.MainContact.fullName,
									maincontactmobile: M.Value.MainContact.WorkAddress.mobilePhone,
									maincontactphone: M.Value.MainContact.WorkAddress.phone,
									maincontactemail: M.Value.MainContact.WorkAddress.email,
									maincontactemailsubj: "Automatic Mail for Maincontact",
									beforeExtNav: c
								};
								var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
								o.openBy(b);
							}
						} else {
							if (M.Value.MainAddress) {
								var C = {
									title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT"),
									imgurl: I,
									companyname: M.Value.name1,
									companyphone: M.Value.MainAddress.phone,
									companyaddress: M.Value.MainAddress.address,
									maincontactname: M.Value.MainContact.fullName,
									beforeExtNav: c
								};
								var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
								o.openBy(b);
							} else {
								var C = {
									title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT"),
									imgurl: I,
									companyname: M.Value.name1,
									maincontactname: M.Value.MainContact.fullName,
									beforeExtNav: c
								};
								var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
								o.openBy(b);
							}
						}
					} else {
						if (M.Value.MainAddress) {
							var C = {
								title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT"),
								imgurl: I,
								companyname: M.Value.name1,
								companyphone: M.Value.MainAddress.phone,
								companyaddress: M.Value.MainAddress.address,
								beforeExtNav: c
							};
							var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
							o.openBy(b);
						} else {
							var C = {
								title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ACCOUNT"),
								imgurl: I,
								companyname: M.Value.name1,
								beforeExtNav: c
							};
							var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
							o.openBy(b);
						}
					}
				}
			}, this), jQuery.proxy(function (E) {
				sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ERROR"));
			}, this), true);
		}
	},
	//    notesTabSelected: function () {
	//        var m = this.getView().getModel();
	//        this.byId("listItem").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        this.byId("listItem").getModel("json").oData.OpportunityNotesSet = [];
	//        this.byId("listItem").getModel("json").updateBindings();
	//        m.read(this.sPath, null, ["$expand=Notes"], true, jQuery.proxy(function (o, r) {
	//            var t = this.getView().byId("listItem");
	//            var j = t.getModel("json");
	//            var d = j.oData;
	//            d.OpportunityNotesSet = r.data.Notes.results;
	//            if (d.OpportunityNotesSet.length == 0) {
	//                this.byId("listItem").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NONOTES"));
	//            }
	//            j.updateBindings();
	//        }, this), jQuery.proxy(function (e) {
	//            this.handleErrors(e);
	//        }, this));
	//    },
	//    participantsTabSelected: function () {
	//        var d;
	//        var l = [];
	//        var t = this;
	//        var m = this.oModel;
	//        var p = this.sPath;
	//        this.byId("Sales_Team").setNoDataText(this.oResourceBundle.getText("LOADING_TEXT"));
	//        if (parseFloat(this.sBackendVersion) >= 2 && !this.isOffline) {
	//            this.partnerFunctionMap = {};
	//            var s = this.byId("S3_Header");
	//            this.transactionType = s.getModel("json").getData().ProcessType;
	//            if (!this.partnerDeterminationMap[this.transactionType]) {
	//                this.oModel.read("OpptPartnerFctTypes", null, ["TransactionType='" + this.transactionType + "'"], false, jQuery.proxy(function (o, r) {
	//                    this.partnerDeterminationMap[this.transactionType] = r.data.results;
	//                }, this), jQuery.proxy(function (e) {
	//                }, this));
	//            }
	//        }
	//        this.oModel.read(this.sPath, null, ["$expand=" + this.oConstants.SALES_TEAM_END_POINT], true, function (o, r) {
	//            var a = t.getView().byId("Sales_Team");
	//            var J = a.getModel("json");
	//            var D = J.oData;
	//            var e = t.oConstants.SALES_TEAM_END_POINT;
	//            t.oConstantsFactory.mappingPropertyByEntity(o[e].results, e);
	//            D.OpportunitySalesTeamSet = o[e].results;
	//            D.OpportunitySalesTeamSetNum = D.OpportunitySalesTeamSet.length;
	//            if (t.isOffline) {
	//                var S = new sap.ui.model.Sorter(t.oConstants.SORT_SALES_TEAM_BY_PARTNER_FUNCTION_CODE, false, false);
	//                var b = new sap.ui.model.Sorter(t.oConstants.SORT_SALES_TEAM_BY_PARTNER_NUMBER, false, false);
	//                var c = [
	//                    S,
	//                    b
	//                ];
	//                t.byId("Sales_Team").getBinding("items").sort(c);
	//            }
	//            if (D.OpportunitySalesTeamSet.length == 0) {
	//                t.byId("Sales_Team").setNoDataText(t.oResourceBundle.getText(t.oVersioningModel.getData().sParticipantsNoDataTextKey));
	//            }
	//            var B = [];
	//            if (!t.bHideImage && !t.isOffline) {
	//                for (var i = 0; i < D.OpportunitySalesTeamSet.length; i++) {
	//                    var f = D.OpportunitySalesTeamSet[i].PartnerNumber;
	//                    var p = "/AccountCollection('" + f + "')?$expand=Logo";
	//                    l[i] = "sap-icon://person-placeholder";
	//                    B.push(m.createBatchOperation(p, "GET"));
	//                }
	//                ;
	//                m.addBatchReadOperations(B);
	//                m.submitBatch(jQuery.proxy(function (R) {
	//                    for (var j = 0; j < D.OpportunitySalesTeamSet.length; j++) {
	//                        if (!R.__batchResponses[j].hasOwnProperty("data")) {
	//                            l[j] = "sap-icon://person-placeholder";
	//                        } else {
	//                            if (R.__batchResponses[j].data) {
	//                                if (R.__batchResponses[j].data.Logo && R.__batchResponses[j].data.Logo.__metadata.media_src) {
	//                                    var M = R.__batchResponses[j].data.Logo.__metadata.media_src ? R.__batchResponses[j].data.Logo.__metadata.media_src : "sap-icon://person-placeholder";
	//                                    var U = M;
	//                                    l[j] = t._getRelativePathFromURL(U.toString());
	//                                }
	//                            }
	//                        }
	//                        D.OpportunitySalesTeamSet[j].ImgSrc = l[j];
	//                        t.mPartnerImgSrc[D.OpportunitySalesTeamSet[j].PartnerNumber] = l[j];
	//                    }
	//                    J.updateBindings();
	//                }, this), jQuery.proxy(function (E) {
	//                    sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ERROR"));
	//                }, this), true);
	//            } else {
	//                for (var i = 0; i < D.OpportunitySalesTeamSet.length; i++) {
	//                    D.OpportunitySalesTeamSet[i].ImgSrc = "sap-icon://person-placeholder";
	//                }
	//                J.updateBindings();
	//            }
	//        });
	//    },
	//    competitorsTabSelected: function () {
	//        var m = this.oModel;
	//        var p = this.sPath;
	//        var d;
	//        var l = [];
	//        var t = this;
	//        this.byId("competitors").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
	//        if (parseFloat(this.sBackendVersion) >= 2 && !this.isOffline) {
	//            this.partnerFunctionMap = {};
	//            var s = this.byId("S3_Header");
	//            this.transactionType = s.getModel("json").getData().ProcessType;
	//            if (!this.partnerDeterminationMap[this.transactionType]) {
	//                this.oModel.read("OpptPartnerFctTypes", null, ["TransactionType='" + this.transactionType + "'"], false, jQuery.proxy(function (o, r) {
	//                    this.partnerDeterminationMap[this.transactionType] = r.data.results;
	//                }, this), jQuery.proxy(function (e) {
	//                }, this));
	//            }
	//        }
	//        this.oModel.read(this.sPath, null, ["$expand=Competitors"], true, function (o, r) {
	//            var a = t.getView().byId("competitors");
	//            var j = a.getModel("json");
	//            var D = j.oData;
	//            var e = t.oConstants.COMPETITOR_NAVIGATION;
	//            t.oConstantsFactory.mappingPropertyByEntity(o[e].results, e);
	//            D.OpportunityCompetitors = o[e].results;
	//            if (D.OpportunityCompetitors.length == 0) {
	//                t.byId("competitors").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NOCOMPETITORS"));
	//            }
	//            if (!t.isOffline && !t.bHideImage) {
	//                for (var i = 0; i < D.OpportunityCompetitors.length; i++) {
	//                    var b = D.OpportunityCompetitors[i].PartnerNumber;
	//                    var p = "/AccountCollection('" + b + "')";
	//                    l[i] = "sap-icon://person-placeholder";
	//                    m.read(p, null, ["$expand=Logo"], false, function (o, r) {
	//                        jQuery.sap.log.info("oData account response");
	//                        if (o.Logo && o.Logo.__metadata) {
	//                            var M = o.Logo.__metadata.media_src ? o.Logo.__metadata.media_src : "sap-icon://person-placeholder";
	//                            var U = M;
	//                            l[i] = U.toString();
	//                        }
	//                    });
	//                    D.OpportunityCompetitors[i].ImgSrc = l[i];
	//                }
	//            } else {
	//                for (var i = 0; i < D.OpportunityCompetitors.length; i++) {
	//                    l[i] = "sap-icon://person-placeholder";
	//                }
	//            }
	//            ;
	//            j.updateBindings();
	//            if (t.isOffline) {
	//                var S = new sap.ui.model.Sorter("PartnerNumber", false, false);
	//                t.byId("competitors").getBinding("items").sort(S);
	//            }
	//        });
	//    },
	//    attachmentsTabSelected: function () {
	//        var a = this.getView().byId("info");
	//        var h = a.getModel("json").getData().Guid;
	//        var m = this.oModel;
	//        var p = this.sPath;
	//        var t = this.getView();
	//        m.read(p, null, ["$expand=Attachments"], true, jQuery.proxy(function (b, r) {
	//            var d = { OpportunityAttachments: [] };
	//            var l = r.data.Attachments.results.length;
	//            var e = this.oConstants.ATTACHMENT_END_POINT;
	//            this.oConstantsFactory.mappingPropertyByEntity(b[e].results, e);
	//            for (var i = 0; i < l; i++) {
	//                var v = r.data.Attachments.results[i];
	//                var U = t.getController()._getRelativePathFromURL(v.__metadata.media_src);
	//                var c = v.Url;
	//                var o = {
	//                    name: v.Name,
	//                    url: this.isOffline ? v.__metadata.media_src : c || U,
	//                    uploadedDate: v.CreatedAt,
	//                    contributor: v.CreatedBy,
	//                    fileExtension: this.oFormatter.mimeTypeFormatter(v.MimeType),
	//                    fileId: v.DocumentId,
	//                    media_src: v.__metadata.media_src
	//                };
	//                if (this.exHookExtendUploadCollectionItem) {
	//                    this.exHookExtendUploadCollectionItem(v, o);
	//                }
	//                d.OpportunityAttachments.unshift(o);
	//            }
	//            t.byId("fileupload").setModel(new sap.ui.model.json.JSONModel(d));
	//            var f = t.byId("fileupload");
	//            if (f) {
	//                if (this.isOffline) {
	//                    var u = f._getFileUploader();
	//                    u.setVisible(false);
	//                }
	//                if (!f.getBindingInfo("items")) {
	//                    var F = new sap.m.UploadCollectionItem({
	//                        contributor: "{contributor}",
	//                        documentId: "{fileId}",
	//                        fileName: "{name}",
	//                        fileSize: "{size}",
	//                        mimeType: "{fileExtension}",
	//                        thumbnailUrl: "",
	//                        uploadedDate: "{path: 'uploadedDate', type: 'sap.ui.model.type.Date', formatOptions: { style: 'medium'}}",
	//                        url: "{url}",
	//                        enableEdit: this.isOffline ? false : true,
	//                        enableDelete: this.isOffline ? false : true,
	//                        visibleEdit: this.isOffline ? false : true,
	//                        visibleDelete: this.isOffline ? false : true
	//                    });
	//                    if (this.exHookExtendUploadCollectionItemTemplate) {
	//                        this.exHookExtendUploadCollectionItemTemplate(F);
	//                    }
	//                    f.bindAggregation("items", {
	//                        path: "/OpportunityAttachments",
	//                        template: F,
	//                        sorter: new sap.ui.model.Sorter("uploadedDate", true, false)
	//                    });
	//                }
	//            }
	//        }, this));
	//    },
	//    _getRelativePathFromURL: function (a) {
	//        var u = this._getLocation(a);
	//        if (u.pathname.substring(0, 1) === "/")
	//            return u.pathname;
	//        else
	//            return "/" + u.pathname;
	//    },
	//    onAttachmentChange: function (e) {
	//        var m = this.oModel;
	//        var u = e.getSource();
	//        var f = e.getParameter("mParameters").files[0];
	//        var t = this.sToken || m.getSecurityToken();
	//        u.removeAllHeaderParameters();
	//        var i = this.getView().byId("info");
	//        var h = i.getModel("json").getData().Guid;
	//        var n = h.replace(/-/g, "").toUpperCase();
	//        var c = new sap.m.UploadCollectionParameter({
	//            name: "slug",
	//            value: n
	//        });
	//        u.addHeaderParameter(c);
	//        var C = new sap.m.UploadCollectionParameter({
	//            name: "x-csrf-token",
	//            value: t
	//        });
	//        u.addHeaderParameter(C);
	//        var o = new sap.m.UploadCollectionParameter({
	//            name: "content-disposition",
	//            value: "inline; filename=\"" + encodeURIComponent(f.name) + "\""
	//        });
	//        u.addHeaderParameter(o);
	//        if (!f.type) {
	//            var a;
	//            var F = f.name.split(".");
	//            var b = "";
	//            if (F.length)
	//                b = F[F.length - 1];
	//            if (b && (b.toUpperCase() === "RAR" || b.toUpperCase() === "LOG")) {
	//                a = new sap.m.UploadCollectionParameter({
	//                    name: "content-type",
	//                    value: "application/octet-stream"
	//                });
	//            } else {
	//                a = new sap.m.UploadCollectionParameter({
	//                    name: "content-type",
	//                    value: "multipart/mixed"
	//                });
	//            }
	//            u.addHeaderParameter(a);
	//        }
	//    },
	//    onUploadComplete: function () {
	//        this.attachmentsTabSelected();
	//    },
	//    onFileDeleted: function (e) {
	//        var P = e.getParameters();
	//        var d = P.documentId;
	//        var i = this.byId("fileupload").getItems();
	//        var r = $.grep(i, function (b) {
	//            return b.getDocumentId() == d;
	//        });
	//        if (r.length == 1) {
	//            var U = r[0].getUrl();
	//            var a = U.split("(").pop();
	//            var p = "OpportunityAttachments(";
	//            var u = p + a;
	//            var t = this;
	//            this.oModel.remove(u, null, function (b) {
	//                t.attachmentsTabSelected();
	//            }, function (b) {
	//            });
	//        }
	//    },
	//    onFilenameLengthExceed: function () {
	//        sap.m.MessageToast.show(this.getView().getModel("i18n").getProperty("MSG_EXCEEDING_FILE_NAME_LENGTH"));
	//    },
	//    onFileRenamed: function (e) {
	//        var n = e.getParameter("fileName");
	//        var f = e.getParameter("documentId");
	//        var o = {
	//            "newfilename": n + "",
	//            "fileId": f + ""
	//        };
	//        var h = this.byId("info").getModel("json").getData().Guid;
	//        var p = "OpportunityAttachments(HeaderGuid=guid'" + h + "',DocumentId='" + f + "',DocumentClass='CRM_P_ORD')/$value";
	//        var u = p;
	//        this.oModel.setHeaders(o);
	//        this.oModel.addBatchChangeOperations([this.oModel.createBatchOperation(u, "PUT", o, null)]);
	//        this.oModel.submitBatch(jQuery.proxy(function (d) {
	//            this.attachmentsTabSelected();
	//        }, this));
	//    },
	//    txHistoryTabSelected: function () {
	//        var m = this.oModel;
	//        var h = this.byId("info").getModel("json").getData().Guid;
	//        var p = "/" + this.oConstants.OPP_END_POINT + "(guid'" + h + "')/" + this.oConstants.DOCUMENT_HISTORY_NAVIGATION;
	//        var t = this;
	//        m.read(p, null, null, true, jQuery.proxy(function (o, r) {
	//            t.newResult = o.results;
	//            var e = t.oConstants.DOCUMENT_HISTORY_NAVIGATION;
	//            var e = t.oConstants.DOCUMENT_HISTORY_NAVIGATION;
	//            t.oConstantsFactory.mappingPropertyByEntity(o.results, e);
	//            var a = t.getView().byId("DocHistory_Tab");
	//            var j = a.getModel("json");
	//            var d = j.oData;
	//            d.OpportunityDocHistory = o.results;
	//            d.OpportunityDocHistoryNum = o.results.length;
	//            j.updateBindings();
	//            if (t.isOffline) {
	//                var s = new sap.ui.model.Sorter(t.oConstants.SORT_DOCUMENT_HISTORY_BY_CREATED_AT, false, false);
	//                t.byId("DocHistory_Tab").getBinding("items").sort(s);
	//            }
	//        }, this), jQuery.proxy(function (e) {
	//            this.handleErrors(e);
	//        }, this));
	//    },
	//    multiTypeNotesTabSelected: function () {
	//        this._refreshMultiTypeNoteTab();
	//    },
	//    _refreshMultiTypeNoteTab: function () {
	//        var n = [];
	//        if (!this.noteTypeMap) {
	//            n.push(this.oModel.createBatchOperation("/" + this.oConstants.CUST_DOC_NOTE_LANGU_END_POINT, "GET"));
	//            n.push(this.oModel.createBatchOperation("/" + this.oConstants.CUST_DOC_NOTE_TYPE_END_POINT, "GET"));
	//        }
	//        var o = this.byId("info").getModel("json").getData().Guid;
	//        var N = this.oConstants.OPP_END_POINT + "(guid'" + o + "')?$expand=" + this.oConstants.DOCUMENT_NOTE_END_POINT;
	//        n.push(this.oModel.createBatchOperation(N, "GET"));
	//        this.oModel.addBatchReadOperations(n);
	//        this.oModel.submitBatch(jQuery.proxy(function (r) {
	//            var t = this.byId("info").getModel("json").getData().ProcessType;
	//            if (r.__batchResponses) {
	//                var a = {};
	//                for (var i = 0; i < r.__batchResponses.length; i++) {
	//                    var R = r.__batchResponses[i];
	//                    if (R.data.results && R.data.results.length > 0) {
	//                        if (R.data.results[0][this.oConstants.CUST_DOC_NOTE_LANGU_PROPS.TEXT_LANGU_ID]) {
	//                            var e = this.oConstants.CUST_DOC_NOTE_LANGU_END_POINT;
	//                            var d = {};
	//                            d = R.data;
	//                            this.oConstantsFactory.mappingPropertyByEntity(d.results, e);
	//                            this.noteLanguageList = d.results;
	//                        } else if (R.data.results[0][this.oConstants.CUST_DOC_NOTE_TYPE_PROPS.TEXT_OBJECT_ID]) {
	//                            var e = this.oConstants.CUST_DOC_NOTE_TYPE_END_POINT;
	//                            var d = {};
	//                            d = R.data;
	//                            this.oConstantsFactory.mappingPropertyByEntity(d.results, e);
	//                            var b = d.results;
	//                            this.noteTypeMap = {};
	//                            for (var c = 0; c < b.length; c++) {
	//                                var f = b[c];
	//                                if (!this.noteTypeMap[f.ProcessType]) {
	//                                    this.noteTypeMap[f.ProcessType] = [];
	//                                }
	//                                if (f.TextEditType == this._note_type.log || f.TextEditType == this._note_type.non_log || f.TextEditType == this._note_type.display) {
	//                                    this.noteTypeMap[f.ProcessType].push(f);
	//                                }
	//                            }
	//                        }
	//                    }
	//                    if (R.data[this.oConstants.DOCUMENT_NOTE_END_POINT]) {
	//                        var e = this.oConstants.DOCUMENT_NOTE_END_POINT;
	//                        var d = {};
	//                        d[e] = R.data[e];
	//                        this.oConstantsFactory.mappingPropertyByEntity(d[e].results, this.oConstants.DOCUMENT_NOTE_END_POINT);
	//                        var g = d[e].results;
	//                        var h = [];
	//                        var b = this.noteTypeMap[t];
	//                        if (g && g.length > 0) {
	//                            jQuery.each(g, jQuery.proxy(function (j, v) {
	//                                var k = g[j];
	//                                if (b && b.length > 0) {
	//                                    jQuery.each(b, jQuery.proxy(function (j, v) {
	//                                        var T = b[j];
	//                                        if (k.TextObjectID == T.TextObjectID && (T.TextEditType == this._note_type.log || T.TextEditType == this._note_type.non_log || T.TextEditType == this._note_type.display)) {
	//                                            h.push(k);
	//                                        }
	//                                        k.contextPath = "/" + this.oConstants.DOCUMENT_NOTE_COLLECTION + k.__metadata.uri.split(this.oConstants.DOCUMENT_NOTE_COLLECTION)[1];
	//                                    }, this));
	//                                }
	//                            }, this));
	//                        }
	//                        a.NoteData = h;
	//                    }
	//                }
	//                a.NoteLanguages = this.noteLanguageList;
	//                a.NoteTypes = this.noteTypeMap[t];
	//                this.byId("crmNote").setModel(new sap.ui.model.json.JSONModel(a));
	//            }
	//        }, this), jQuery.proxy(function (e) {
	//            sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("ERROR"));
	//        }, this), true);
	//    },
	//    _saveETag: function (e) {
	//        this.sETag = e;
	//    },
	//    onErrorMsg: function (e) {
	//        if (this.extHookErrMsgLazyLoad && this.extHookErrMsgLazyLoad()) {
	//            this.oModel.read(this.sPath, null, ["$expand=" + this.oConstants.DOC_APPLICATION_LOG_NAVIGATION], false, jQuery.proxy(function (o, r) {
	//                this.sBackendVersion = cus.crm.opportunity.util.schema._getServiceSchemaVersion(this.oModel, "Opportunity");
	//                if (this.sBackendVersion >= 4) {
	//                    var L = this.showErrorMsgFragment.getContent()[0];
	//                    if (L && L.getModel("json")) {
	//                        var R = this.oConstantsFactory.mappingPropertyByEntities(o.OpportunityLogSet.results, this.oConstants.DOC_APPLICATION_LOG_NAVIGATION);
	//                        L.getModel("json").setData({ OpportunityLogSet: R });
	//                        var a = o.OpportunityLogSet.results.length;
	//                        var m = this.oResourceBundle.getText("ERROR_MESSAGE_TITLE", a);
	//                        this.showErrorMsgFragment.setTitle(m);
	//                    }
	//                }
	//            }, this), jQuery.proxy(this.handleErrors, this));
	//        }
	//        this.showErrorMsgFragment.open();
	//    },
	//    onOKParticipantDialog: function (e) {
	//        if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() == "MultiSelect") {
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                this.oModel.clearBatch();
	//                var c = [];
	//                var h = this.byId("info").getModel("json").getData().Guid;
	//                var E;
	//                var p = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
	//                for (var a = 0; a < p.length; a++) {
	//                    if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(p[a].PartnerFunctionName))) {
	//                        var b = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(p[a].PartnerFunctionName));
	//                        for (var i = 0; i < b.length; i++) {
	//                            E = {
	//                                HeaderGuid: h,
	//                                PartnerNumber: b[i].key,
	//                                PartnerFunctionCode: p[a].PartnerFunctionCode
	//                            };
	//                            c.push(this.oModel.createBatchOperation("OpportunitySalesTeamSet", "POST", E, null));
	//                        }
	//                    }
	//                }
	//                if (c.length > 0) {
	//                    sap.ca.ui.utils.busydialog.requireBusyDialog();
	//                    this.release = true;
	//                    this.oModel.addBatchChangeOperations(c);
	//                    this.oModel.submitBatch(jQuery.proxy(function (r) {
	//                        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                            this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").destroy();
	//                        }
	//                        sap.ui.getCore().getEventBus().publish("cus.crm.opportunity", "opportunityChanged", { contextPath: "Opportunities(guid'" + h + "')" });
	//                        this.getParticipants();
	//                    }, this), jQuery.proxy(function (q) {
	//                        this.handleErrors(q);
	//                    }, this));
	//                }
	//            }
	//        } else {
	//            var d = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getSelectedItem();
	//            sap.ca.ui.utils.busydialog.requireBusyDialog();
	//            this.release = true;
	//            var C = this.itemToDelete;
	//            var o = this.getRuleForPartnerFunction(C.PartnerFunctionCode);
	//            var f = this.partnerDeterminationMap[this.transactionType];
	//            var g;
	//            for (var k = 0; k < f.length; k++) {
	//                if (f[k].PartnerFunctionCode == C.PartnerFunctionCode) {
	//                    g = f[k].PartnerFunctionCategory;
	//                }
	//            }
	//            var j = o.CountLow;
	//            if (this.participantsF4MultiselectFragment.getContent()[0]._sSelectedPartnerCategoryCode != g) {
	//                if (this.getCountForPartnerFunction(C.PartnerFunctionCode) - 1 < j) {
	//                    if (j === 1) {
	//                        sap.ca.ui.message.showMessageToast(this.oResourceBundle.getText("MUST_HAVE_PARTICIPANTS_1", [j]));
	//                    } else {
	//                        sap.ca.ui.message.showMessageToast(this.oResourceBundle.getText("MUST_HAVE_PARTICIPANTS", [j]));
	//                    }
	//                    return;
	//                }
	//            }
	//            var h = this.byId("info").getModel("json").getData().Guid;
	//            var P = [
	//                "OpportunitySalesTeamSet(HeaderGuid=guid'",
	//                h,
	//                "',PartnerNumber='",
	//                C.PartnerNumber,
	//                "',PartnerFunctionCode='",
	//                C.PartnerFunctionCode,
	//                "')"
	//            ].join("");
	//            this.oModel.clearBatch();
	//            var c = [];
	//            var h = this.byId("info").getModel("json").getData().Guid;
	//            var E;
	//            var l = this.participantsF4MultiselectFragment.getContent()[0]._sSelectedPartnerCategoryCode;
	//            var p = this.participantsF4MultiselectFragment.getModel("json").getProperty("/PartnerFunctions");
	//            var m;
	//            for (var n = 0; n < p.length; n++) {
	//                if (p[n].PartnerFunctionCategory == l) {
	//                    m = p[n].PartnerFunctionCode;
	//                }
	//            }
	//            E = {
	//                HeaderGuid: h,
	//                PartnerNumber: d.getDescription(),
	//                PartnerFunctionCode: m
	//            };
	//            if (d.getDescription()) {
	//                this.oModel.addBatchChangeOperations([this.oModel.createBatchOperation("OpportunitySalesTeamSet", "POST", E, null)]);
	//                this.oModel.addBatchChangeOperations([this.oModel.createBatchOperation(P, "DELETE")]);
	//                this.oModel.addBatchChangeOperations(c);
	//                this.oModel.submitBatch(jQuery.proxy(function (r) {
	//                    sap.ui.getCore().getEventBus().publish("cus.crm.opportunity", "opportunityChanged", { contextPath: "Opportunities(guid'" + h + "')" });
	//                    this.getParticipants();
	//                }, this), jQuery.proxy(function (q) {
	//                    this.handleErrors(q);
	//                }, this));
	//            }
	//        }
	//        this.participantsF4MultiselectFragment.close();
	//        var N = this.participantsF4MultiselectFragment.getContent()[0];
	//        N.to(this.participantsF4MultiselectFragment.getContent()[0].getPages()[0]);
	//    },
	//    getCountForPartnerFunctionCode: function (p) {
	//        var c = 0;
	//        var a = this.byId("Sales_Team").getModel("json").getData().OpportunitySalesTeamSet;
	//        for (var i = 0; i < a.length; i++) {
	//            var b = this.partnerDeterminationMap[this.transactionType];
	//            var d;
	//            for (var k = 0; k < b.length; k++) {
	//                if (b[k].PartnerFunctionCode == a[i].PartnerFunctionCode) {
	//                    d = b[k].PartnerFunctionCode;
	//                }
	//            }
	//            if (d === p) {
	//                c++;
	//            }
	//        }
	//        return c;
	//    },
	//    onSelectParticipantMinMax: function (e) {
	//        this.unSelect = "";
	//        if (this.lastSelectedItem == e.getParameters().listItem.getDescription())
	//            this.lastSelectedItem = e.getParameters().listItem.getDescription();
	//        var P, a, c, b;
	//        if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() == "MultiSelect") {
	//            c = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getSelectedItem().getBindingContext("json").getObject().PartnerFunctionCode;
	//            b = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getSelectedItem().getBindingContext("json").getObject().PartnerFunctionName;
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp"))
	//                if (!e.getParameters().selected) {
	//                    var d = e.getParameters().listItem.getDescription();
	//                    var f = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(b));
	//                    for (var k = 0; k < f.length; k++) {
	//                        if (f[k].key == d) {
	//                            this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(b)).splice(k, 1);
	//                        }
	//                    }
	//                }
	//            var s = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0];
	//            a = s.indexOfItem(s.getSelectedItem());
	//            if (a > -1)
	//                var g = this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions[a];
	//            P = g.PartnerFunctionCode;
	//        }
	//        var o = this.byId("Sales_Team").getModel("json").oData.OpportunitySalesTeamSet;
	//        var p = this.partnerDeterminationMap[this.transactionType];
	//        var h = true;
	//        for (var x = 0; x < o.length; x++) {
	//            if (o[x].PartnerFunctionText == "Competitor")
	//                h = false;
	//        }
	//        if (this.byId("tab_competitor"))
	//            var l = this.byId("tab_competitor").getModel("json").getData();
	//        if (h && l.Competitors.length)
	//            for (var y = 0; y < l.Competitors.results.length; y++) {
	//                for (var k = 0; k < p.length; k++) {
	//                    if (p[k].PartnerFunctionName == "Competitor") {
	//                        o.push({
	//                            PartnerName: l.Competitors.results[y].PartnerName,
	//                            PartnerNumber: l.Competitors.results[y].PartnerNumber,
	//                            PartnerFunctionText: "Competitor",
	//                            PartnerDetermineProcedure: p[k].PartnerDetermineProcedure,
	//                            PartnerFunctionCategory: p[k].PartnerFunctionCategory,
	//                            PartnerFunctionCode: p[k].PartnerFunctionCode
	//                        });
	//                        h = false;
	//                    }
	//                }
	//            }
	//        if (h)
	//            this.oModel.read(this.sPath, null, ["$expand=Competitors"], false, jQuery.proxy(function (A, B) {
	//                for (var j = 0; j < A.Competitors.results.length; j++) {
	//                    for (var k = 0; k < p.length; k++) {
	//                        if (p[k].PartnerFunctionName == "Competitor") {
	//                            o.push({
	//                                PartnerName: A.Competitors.results[j].PartnerName,
	//                                PartnerNumber: A.Competitors.results[j].PartnerNumber,
	//                                PartnerFunctionText: "Competitor",
	//                                PartnerDetermineProcedure: p[k].PartnerDetermineProcedure,
	//                                PartnerFunctionCategory: p[k].PartnerFunctionCategory,
	//                                PartnerFunctionCode: p[k].PartnerFunctionCode
	//                            });
	//                        }
	//                        ;
	//                    }
	//                }
	//            }, this), jQuery.proxy(this.handleErrors, this));
	//        if (e) {
	//            var m = e.getParameters().listItem.getTitle();
	//            var n = e.getParameters().listItem.getDescription();
	//            if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() == "SingleSelectLeft") {
	//                P = this.participantsF4MultiselectFragment.getContent()[0]._sSelectedPartnerCategoryCode;
	//                this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions = this.partnerDeterminationMap[this.transactionType];
	//                var q = this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions;
	//                for (var k = 0; k < q.length; k++) {
	//                    if (q[k].PartnerFunctionCategory == P)
	//                        a = k;
	//                }
	//            }
	//            for (var i = 0; i < o.length; i++) {
	//                var p = this.partnerDeterminationMap[this.transactionType];
	//                var r;
	//                for (var k = 0; k < p.length; k++) {
	//                    if (p[k].PartnerFunctionCode == o[i].PartnerFunctionCode) {
	//                        r = p[k].PartnerFunctionCode;
	//                    }
	//                }
	//                if (o[i].PartnerNumber == n && r == P) {
	//                    this.unSelect = "unselect";
	//                    sap.m.MessageToast.show(this.oResourceBundle.getText("PARTICIPANT_EXISTS", [
	//                        m,
	//                        b
	//                    ]), { duration: 3500 });
	//                    e.getParameters().listItem.setSelected(false);
	//                    return;
	//                }
	//            }
	//        }
	//        var t = this.getCountForPartnerFunctionCode(P);
	//        var g = this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions[a];
	//        var P = g.PartnerFunctionCode;
	//        var C = g.CountHigh;
	//        var u = g.CountLow;
	//        var v = 0;
	//        if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + b))
	//                v = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(b)).length;
	//        }
	//        if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() == "MultiSelect") {
	//            if (v + t >= C) {
	//                if (e) {
	//                    e.getParameters().listItem.setSelected(false);
	//                }
	//                if (C === 1) {
	//                    sap.m.MessageToast.show(this.oResourceBundle.getText("TOO_MANY_PARTICIPANTS_1", [C]), { duration: 3500 });
	//                } else {
	//                    sap.m.MessageToast.show(this.oResourceBundle.getText("TOO_MANY_PARTICIPANTS", [C]), { duration: 3500 });
	//                }
	//                return;
	//            } else {
	//                if (e.getParameters().selected) {
	//                    if (!this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                        this.participantsF4MultiselectFragment.setModel(new sap.ui.model.json.JSONModel(), "SelectedPartnerCategoryTemp");
	//                    }
	//                    var w = e.getParameters().listItem.getDescription();
	//                    var z = e.getParameters().listItem.getTitle();
	//                    var E = [];
	//                    E.push({
	//                        key: w,
	//                        value: z
	//                    });
	//                    if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(b))) {
	//                        this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").getProperty("/" + encodeURIComponent(b)).push(E[0]);
	//                    } else {
	//                        this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").setProperty("/" + encodeURIComponent(b), E);
	//                    }
	//                }
	//            }
	//        } else {
	//            this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getFooter().getContentRight()[0].setEnabled(true);
	//        }
	//    },
	//    onCancelParticipantDialog: function (e) {
	//        if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() != "SingleSelectLeft") {
	//            if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getId() == e.getSource().getParent().getParent().getId()) {
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getSelectedItem().setSelected(false);
	//            }
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp").destroy();
	//            }
	//        } else {
	//            if (this.participantsF4MultiselectFragment.getModel("PartnersBasedonType")) {
	//                this.participantsF4MultiselectFragment.getModel("PartnersBasedonType").destroy();
	//            }
	//        }
	//        var n = this.participantsF4MultiselectFragment.getContent()[0];
	//        n.to(this.participantsF4MultiselectFragment.getContent()[0].getPages()[0]);
	//        this.participantsF4MultiselectFragment.close();
	//    },
	//    onNavBack: function (e) {
	//        this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getSubHeader().getContentLeft()[0].clear();
	//        if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getMode() != "SingleSelectLeft") {
	//            var s = this.participantsF4MultiselectFragment.getContent()[0]._sSelectedPartnerCategory;
	//            var S;
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp")) {
	//                S = this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp");
	//            }
	//            var c = 0;
	//            if (this.participantsF4MultiselectFragment.getModel("SelectedPartnerCategoryTemp"))
	//                if (S.getProperty("/" + s))
	//                    c = c + S.getProperty("/" + s).length;
	//            var l = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0];
	//            if (c != 0) {
	//                l.getSelectedItem().setInfo(c);
	//            } else if (l.getSelectedItem()) {
	//                l.getSelectedItem().setInfo(" ");
	//            }
	//            l.getSelectedItem().setSelected(false);
	//            var n = this.participantsF4MultiselectFragment.getContent()[0];
	//            n._sSelectedPartnerCategoryAndParticipants = S;
	//            n.to(this.participantsF4MultiselectFragment.getContent()[0].getPages()[0]);
	//        } else {
	//            var a = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems();
	//            if (a.length > 0)
	//                for (var k = 0; k < a.length; k++) {
	//                    a[k].setInfo(" ");
	//                    a[k].setSelected(false);
	//                }
	//            var s = this.participantsF4MultiselectFragment.getContent()[0]._sSelectedPartnerCategoryText;
	//            if (this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getSelectedItem()) {
	//                var b = this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getSelectedItem();
	//                this.participantsF4MultiselectFragment.getContent()[0].getPages()[1].getContent()[0].getSelectedItem().setSelected(false);
	//            }
	//            if (this.participantsF4MultiselectFragment.getContent()[0].PartnerKey && !b) {
	//                var b = this.participantsF4MultiselectFragment.getContent()[0].PartnerKey;
	//            }
	//            var d = this.participantsF4MultiselectFragment.getContent()[0];
	//            this.participantsF4MultiselectFragment.getModel("json").getData().PartnerFunctions = this.partnerDeterminationMap[this.transactionType];
	//            this.participantsF4MultiselectFragment.getModel("json").updateBindings();
	//            var p = this.participantsF4MultiselectFragment.getContent()[0].getPages()[0].getContent()[0].getItems();
	//            for (var k = 0; k < p.length; k++) {
	//                p[k].setSelected(false);
	//            }
	//            var n = this.participantsF4MultiselectFragment.getContent()[0];
	//            n.PartnerKey = b;
	//            n.to(this.participantsF4MultiselectFragment.getContent()[0].getPages()[0]);
	//        }
	//    },
	//    closeErrorMsg: function (e) {
	//        this.showErrorMsgFragment.close();
	//    },
	//    refreshMsgLog: function (s) {
	//        var i = false;
	//        var e = "";
	//        if (this.extHookLogLazyLoad) {
	//            i = this.extHookLogLazyLoad();
	//        }
	//        if (i) {
	//            e = this.isOffline ? "$expand=Competitors,DocumentItems" : "$expand=Competitors,Products";
	//        } else {
	//            e = this.isOffline ? "$expand=ChangeDocs,Competitors,DocumentItems" : "$expand=ChangeDocs,Competitors,Products";
	//        }
	//        if (parseFloat(this.sBackendVersion) >= 4) {
	//            if (!this.extHookErrMsgLazyLoad || !this.extHookErrMsgLazyLoad()) {
	//                e += ",OpportunityLogSet";
	//            }
	//        }
	//        this.oModel.read(this.sPath, null, [e], true, jQuery.proxy(function (o, r) {
	//            this.bindInfoAndProducts(r.data);
	//        }, this), jQuery.proxy(this.handleErrors, this));
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
	//    setSalesAreaSearchinput: function (v) {
	//        this.salesareaF4Fragment.getSubHeader().getContentLeft()[0].setValue(v);
	//        var s = this.salesareaF4Fragment.getContent()[0].getModel("SalesArea").getProperty("/SalesAreaList").results;
	//        var a = new Array();addAromaNodeToIstek
	//        for (var k = 0; k < s.length; k++) {
	//            if (s[k].SalesOrganizationText.toLowerCase().search(v) != -1 || s[k].DistrubutionChannelText.toLowerCase().search(v) != -1 || s[k].DivisionText.toLowerCase().search(v) != -1) {
	//                a.push(s[k]);
	//            }
	//        }
	//        this.salesareaF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText("NO_DATA_TEXT"));
	//        this.salesareaF4Fragment.getModel("json").setData({ SalesAreaCollection: a });
	//        this.salesareaF4Fragment.getModel("json").updateBindings();
	//    },
	//    checkCorssAppsAvialbleInOffline: function (a) {
	//        if (this.isOffline) {
	//            var s = null;
	//            var b = null;
	//            for (var i = 0; i < a.length; i++) {
	//                s = a[i].semanticObject;
	//                b = a[i].action;
	//                var t = this;
	//                cus.crm.opportunity.util.Util.isIntentSupported(s, b).done(function (c) {
	//                    t.aAviliableCrossApps[b] = c;
	//                });
	//            }
	//        }
	//    },
	//    cleanAttachmentControlError: function () {
	//        var a = this.getView().byId("fileupload");
	//        if (a) {
	//            a.destroyAggregation("items", true);
	//            a.sErrorState = undefined;
	//        }
	//    },
	//    isCrossAppSupportedInOffline: function (a) {
	//        if (this.isOffline) {
	//            return this.aAviliableCrossApps[a];
	//        }
	//    }

	_onParseErrorMsg: function (err) {
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