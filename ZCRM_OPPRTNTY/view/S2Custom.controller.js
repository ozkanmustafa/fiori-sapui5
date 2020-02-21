jQuery.sap.require("cus.crm.opportunity.CRM_OPPRTNTYExtension.util.customFormatter");
sap.ui.controller("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S2Custom", {
    customFormatter: cus.crm.opportunity.CRM_OPPRTNTYExtension.util.customFormatter,

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S2Custom
	 */
		onInit: function() {
			sap.ca.scfld.md.controller.BaseMasterController.prototype.onInit.call(this);
			var c = new sap.ui.model.json.JSONModel({
				s2Controller: this
			});
			this.oApplicationFacade.setApplicationModel("s2Controller", c);
			var v = this.getView();
			var a = this;
			this.guid = undefined;
			this.accountID = undefined;
			this.opportunityID = undefined;
			this.oModel = this.getView().getModel();
			this.oResourceBundle = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
			// Customizing
			if (!this.sortingDailogFragment) {
				this.sortingDailogFragment = this.isOffline ? new sap.ui.xmlfragment(this.createId("show_Sort_Fragment"),
				'cus.crm.opportunity.view.SortingDialog_Offline', this) : new sap.ui.xmlfragment(this.createId("show_Sort_Fragment"),
				'cus.crm.opportunity.view.SortingDialog', this);
			}
			// this.sortingDailogFragment = this.isOffline ? new sap.ui.xmlfragment(this.createId("show_Sort_Fragment"),
			// 	'cus.crm.opportunity.view.SortingDialog_Offline', this) : new sap.ui.xmlfragment(this.createId("show_Sort_Fragment"),
			// 	'cus.crm.opportunity.view.SortingDialog', this);
			this.sortingDailogFragment.setModel(new sap.ui.model.json.JSONModel());
			this.sortingDailogFragment.setModel(this.oI18nModel, 'i18n');
			// Customizing
			if (!this.oShowSheet) {
				this.oShowSheet = sap.ui.xmlfragment(this.createId("showFragment"), "cus.crm.opportunity.view.showMaxHit", this);
			}
			//this.oShowSheet = sap.ui.xmlfragment(this.createId("showFragment"), "cus.crm.opportunity.view.showMaxHit", this);
			var l = this.getList();
			var t = l.getItems()[0].clone();
			var b = this.getFilters();
			var p = this.oConstants.OPP_PROPS;
			var o = [p.GUID, p.OBJECT_ID, p.DESCRIPTION, p.CLOSING_DATE, p.EXP_SALES_VOLUME, p.CURRENCY_CODE, p.PROSPECT_NO, p.PROSPECT_NAME, p.USER_STS_CODE,
				p.USER_STS_TEXT, p.PROCESS_TYPE, p.PROCESS_TYPE_DESC //Customizing
			];
			if (this.isOffline) {
				var S = [new sap.ui.model.Sorter(p.CLOSING_DATE, false, false), new sap.ui.model.Sorter(p.GUID, false, false)];
			}
			if (this.extHookAddExtraAttributes) {
				this.extHookAddExtraAttributes(o);
			}
			var P = {
				"select": o.join()
			};
			var d = "/" + this.oConstants.OPP_END_POINT;
			if (this.extHookCustomizingPath) {
				d = this.extHookCustomizingPath();
			}
			this.bInitialLoad = true;
			l.bindAggregation("items", {
				path: d,
				template: t,
				filters: b,
				parameters: P,
				sorter: this.isOffline ? S : null
			});
			var m = this.getView().getModel();
			m.setRefreshAfterChange(false);
			var e = function(E) {
				var n = this.getList().getBinding('items').getLength();
				if (this.nGuid !== undefined) {
					this.byId("labelInfo").setText(this.desc);
					this.byId("toolbarInfo").setVisible(true);
				}
				if (this.accountID != undefined && this.desc === undefined) {
					if (!this.bAccountNameFound) {
						this.setAccountName();
					} else {
						this.byId("labelInfo").setText(this.sProspectName);
						this.byId('toolbarInfo').setVisible(true);
					}
				}
				if (typeof cus.crm.myaccounts !== 'undefined' && typeof cus.crm.myaccounts.NavigationHelper !== 'undefined' && typeof cus.crm.myaccounts
					.NavigationHelper.qty !== 'undefined') {
					if (cus.crm.myaccounts.NavigationHelper.qty > n && typeof this.accountID !== 'undefined') {
						sap.ca.ui.message.showMessageToast(this.oApplicationFacade.getResourceBundle().getText("LIST_FILTERED_BY_MYITEMS", [n, cus.crm.myaccounts
							.NavigationHelper.qty
						]));
					};
					cus.crm.myaccounts.NavigationHelper.qty = undefined;
				};
			};
			var C = sap.ui.core.Component.getOwnerIdFor(this.getView());
			var f = sap.ui.component(C);
			if (f && f.getComponentData() && f.getComponentData().startupParameters) {
				var g = f.getComponentData().startupParameters;
				if (f.QtyForAccountID) {
					this.QtyForAccountID = f.QtyForAccountID;
				}
				if (g.accountID != null) {
					if (undefined != g.accountID) {
						this.accountID = g.accountID[0];
					}
				} else if (g.opportunityID != null) {
					this.opportunityID = g.opportunityID[0];
				} else {
					if (g.guid != null) {
						if (undefined != g.guid) {
							this.guid = g.guid[0];
						}
					}
				}
			}
			if (m != undefined) m.attachRequestCompleted(jQuery.proxy(e, this));
			var n = this.getList().getBinding('items').getLength();
			if (n <= 0) {
				this.getList().setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("NO_DATA_TEXT"));
				// Customizing
				//his._onCheckAuthorization();
			}
			this.sBackendVersion = cus.crm.opportunity.util.schema._getServiceSchemaVersion(this.oModel, "Opportunity");
			this.setOpportunityTotalNumber = function(D) {
				var r = D.getParameter("data");
				if (r && r.__count) {
					this.numberOfOpportunity = r.__count;
				}
				if (!this.oApplicationImplementation) {
					this.oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
				}
				var s = this.oApplicationImplementation.oMHFHelper;
				s.defineMasterHeaderFooter(this);
				this._checkForOfflineErrors();
				s.setMasterTitle.apply(s, [this, this.numberOfOpportunity]);
				this.numberOfLeads = 0;
			};
			if (this.bSearchOppTotalNum === undefined || this.bSearchOppTotalNum === true) {
				this.getList().getBinding('items').attachDataReceived(jQuery.proxy(this.setOpportunityTotalNumber), this);
				this.bSearchOppTotalNum = false;
			}
			this._initHeaderFooterOptions();
			this.oApplicationImplementation.oMHFHelper.defineMasterHeaderFooter(this);
			if (this.isOffline) {
				jQuery.sap.require("sap.cus.crm.lib.reuse.offline.Scenario");
				var h = cus.crm.opportunity.util.Util.getAppOfflineInterface();
				var i = this;
				h.readErrorMessages(function() {
					i._checkForOfflineErrors();
				});
				h.attachOnAfterFlush(this._checkForOfflineErrors, this);
				h.attachOnAfterRefresh(this._onOfflineDataRefreshed, this);
				sap.cus.crm.lib.reuse.offline.Scenario.setCurrentOfflineInterface(h);
				sap.ui.Device.orientation.attachHandler(this._onOrientationchange, this);
			}
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S2Custom
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S2Custom
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S2Custom
	 */
	//	onExit: function() {
	//
	//	},

	//	setAccountName: function() {
	//
	//	}
		getFilters: function() {
			var f = [];
			if (undefined != this.accountID && this.nGuid === undefined) {
				f.push(new sap.ui.model.Filter(this.oConstants.OPP_PROPS.PROSPECT_NO, sap.ui.model.FilterOperator.EQ, this.accountID));
			}
			if (undefined != this.opportunityID) {
				f.push(new sap.ui.model.Filter(this.oConstants.OPP_PROPS.OBJECT_ID, sap.ui.model.FilterOperator.EQ, this.opportunityID));
			}
			if (undefined != this.nGuid) {
				f.push(new sap.ui.model.Filter(this.oConstants.OPP_PROPS.GUID, sap.ui.model.FilterOperator.EQ, this.nGuid));
			}
			if (undefined != this.guid) {
				f.push(new sap.ui.model.Filter(this.oConstants.OPP_PROPS.GUID, sap.ui.model.FilterOperator.EQ, this.guid));
			}
			if (this.isOffline) {
				f.push(new sap.ui.model.Filter("isMyOppt", sap.ui.model.FilterOperator.EQ, true));
			}
			// Customizing
			if (this.islem_turu !== false && this.islem_turu !== undefined) {
				f.push(new sap.ui.model.Filter("ProcessType", sap.ui.model.FilterOperator.EQ, this.islem_turu));
			}
			if (this.onay_durumu !== false && this.onay_durumu !== undefined) {
				f.push(new sap.ui.model.Filter("Full_Approval", sap.ui.model.FilterOperator.EQ, this.onay_durumu));
			}
			if (this.sonuc_durumu !== false && this.sonuc_durumu !== undefined) {
				f.push(new sap.ui.model.Filter("FullResult", sap.ui.model.FilterOperator.EQ, this.sonuc_durumu));
			}
			
			return f;
		},
	//	setListItem: function(i) {
	//
	//	}
		goToDetailPage: function(i) {
		    // Customizing for product numune hide. Standard servisi _onCallServiceForType na koydum 
		    // detay sayfasina geciste numune mi satis mi anlamak icin 
		    var sPath = i.getBindingContext().getPath().substr(1);
    	    var oDataModel = new sap.ui.model.odata.v2.ODataModel({
	            serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
            });
            var oThis = this;
            var oCombo = this.getView().getModel("ComboBox");
            oDataModel.read("/" + sPath, {
                success : function (resp) {
                    oCombo.setProperty("/ProcessType",resp.ProcessType);
		            oThis._onCallServiceForType(i,sPath);
                },
                error : function (err) {
                    // TODO: Hata mesaji verilecek
                    sap.m.MessageBox.error(err);
                }
            });
		},
		_onCallServiceForType : function (i,sPath) {           
		    var l = this.getList();
            l.removeSelections();
            i.setSelected(true);
            l.setSelectedItem(i, true);
            this.prevItem = i;
            if (this.firstCall != "") {
                this.firstCall = "";
                this.setBtnEnabled("sort", true);
                this.setBtnEnabled("BTN_S2_ADD", true);
                this.setBtnEnabled("BTN_S2_SHOW", true);
            }
            var c = sap.ui.core.Component.getOwnerIdFor(this.getView());
            var m = sap.ui.component(c);
            this.oRouter.navTo("detail", {
                contextPath: sPath
            }, !sap.ui.Device.system.phone);
		},
	//	datalossDismissed: function(r) {
	//
	//	}
	//	getS3Controller: function() {
	//
	//	}
	//	getS4Controller: function() {
	//
	//	}
		onCustomFilterConfirm : function (e) {
			this.islem_turu = false;
			this.onay_durumu = false;
			this.sonuc_durumu = false;
			var aFilter = e.getParameters().filterItems;
			if (aFilter.length > 0) {
				for (var i=0; i<aFilter.length; i++) {
					if (aFilter[i].mProperties.key.length === 4) {
						this.islem_turu = aFilter[0].mProperties.key;
						// if (aFilter[i].mProperties.key === "S") {
						// 	this.islem_turu = "";
						// } else {
						// 	this.islem_turu = "Z007";
						// }
					}
					if (aFilter[i].mProperties.key.length === 2) {
						if (aFilter[i].mProperties.key === "ON") {
							this.onay_durumu = "X"; 
						} else {
							this.onay_durumu = ""; 
						}
					}
					if (aFilter[i].mProperties.key.length === 3) {
						if (aFilter[i].mProperties.key === "SON") {
							this.sonuc_durumu = "X";				
						} else {
							this.sonuc_durumu = "";
						}
					}
				}
			} else {
				this.islem_turu = false;
				this.onay_durumu = false;
				this.sonuc_durumu = false;
			}
			this.getList().getBinding("items").filter(this.getFilters());
		},
	
		onCreateCustomFilter : function (e) {
			if (!this.CustomFilterDialog) {
    			this.CustomFilterDialog = sap.ui.xmlfragment("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.CustomFilterDialog", this);
    			this.CustomFilterDialog.setModel(this.getView().getModel("i18n"), "i18n");
        		this.getView().addDependent(this.CustomFilterDialog);
			}
			this.CustomFilterDialog.open();
		},
		
		_onCheckAuthorization : function () {
			var that = this;
		    //this.getView().setBusy(true);
			var oUpdate = this.getView().getModel("Update");
    	    var oDataModel = new sap.ui.model.odata.v2.ODataModel({
	            serviceUrl: "/sap/opu/odata/sap/ZCRM_OPPORTUNITY_SRV/"
            });
            oDataModel.callFunction("/CustomizingCheckAuthorization",{
                method : "GET",
                urlParameters : {
                	"PartnerNo" : ""
                },
                success : function (resp) {
                   oUpdate.setProperty("/UserAuth",resp.CustomizingCheckAuthorization.HasAutho);  
                   //that.getView().setBusy(false);
                },
                error : function (err) {
                	//that.getView().setBusy(false);
                	sap.m.MessageBox.error(err);
                    // TODO: Hata Basilacak
                }
            });
			
		},
		
		extHookGetHeaderFooterOptions : function (h) {
			var t = this;	
			if (!h.buttonList) {
				h.buttonList = [];
			} else {
				h.buttonList = [];
			}
			var sIcon = sap.ui.core.IconPool.getIconURI("add-filter");
			var oCustomFilter =  {
				sI18nBtnTxt: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('BTN_FILTER'),
				sId: "BTN_CUSTOMFILTER",
				sIcon: sIcon,
				onBtnPressed: function(k) {
					jQuery.proxy(t.onCreateCustomFilter(k), this);
				}
			};
			h.buttonList.push(oCustomFilter);
			
		},
		getHeaderFooterOptions: function() {
			var t = this;
			if (this.bInitialLoad) {
				this.bInitialLoad = false;
			}
			if (this.bSearch) {
				this.bSearch = false;
			}
			if (this.extHookGetHeaderFooterOptions) 
				this.extHookGetHeaderFooterOptions(this.oHeaderFooterOptions);
				
			return this.oHeaderFooterOptions;
	
		},
		sorting1: function(e) {
            var c = this.oResourceBundle.getText('CLSDATE');
            var a = this.oResourceBundle.getText('ACT');
            var s = this.oResourceBundle.getText('STAT');
            // Customizing add filter Creating date
            var crd = this.oResourceBundle.getText('CRTDATE');
            // Customizing
            this.sortingDailogFragment.getSortItems()[0].setText(crd);
            this.sortingDailogFragment.getSortItems()[1].setText(c);
            this.sortingDailogFragment.getSortItems()[2].setText(a);
            this.sortingDailogFragment.getSortItems()[3].setText(s);
            this.sortingDailogFragment.open();
		},
	//	handleConfirm: function(e) {
	//
	//	}
		applySort: function(k) {
			if (k === this.oConstants.OPP_PROPS.CLOSING_DATE || k === this.oConstants.OPP_PROPS.PROSPECT_NAME || k === this.oConstants.OPP_PROPS.USER_STS_TEXT || k === "PostingDate") {
				if (this.sortingDailogFragment.getSortDescending() === true) {
					var s = new sap.ui.model.Sorter(k, true, false);
				} else {
					var s = new sap.ui.model.Sorter(k, false, false);
				}
			} else var s = new sap.ui.model.Sorter(k, false, false);
			if (this.isOffline) {
				var S = new sap.ui.model.Sorter(this.oConstants.OPP_PROPS.GUID, false, false);
				var o = [s, S];
			} else {
				var o = [s];
			}
			this.getView().byId('list').getBinding("items").aSorters = [];
			this.getView().byId('list').getBinding("items").aSorters = o;
			this.getView().byId('list').getBinding("items").sort(o);
		},
	//	isBackendSearch: function() {
	//
	//	}
		applyBackendSearchPattern: function(f, b) {
			// Customizing
			b.mParameters.select = "Guid,Id,Description,ClosingDate,ExpectedSalesVolum…Number,ProspectName,UserStatusCode,UserStatusText,ProcessType,ProcessTypeDescription";
			this.bSearch = true;
			var a = this.getFilters();
			var o = this.getList();
			this.getList().setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("LOADING_TEXT"));
			var v = f;
			if (v && v.length > 0) {
				if (this.isOffline) {
					v = v.toUpperCase();
				}
				a.push(new sap.ui.model.Filter(this.oConstants.FILTER_DESC, sap.ui.model.FilterOperator.Contains, v));
			}
			b.aApplicationFilters = [];
			b.filter(a);
			var l = this.getList().getBinding("items");
			l.filter(a);		// Customizing
			if (!sap.ui.Device.system.phone) {}
			if (this.nGuid != undefined) l.attachChange(this._selectContextPath, this);
			this.getView().byId("toolbarInfo").setVisible(false);
		},
	//	onCreate: function(e) {
	//
	//	}
	//	handleErrors: function(e) {
	//
	//	}
	//	onShow: function(e) {
	//
	//	}
	//	closeShow: function(e) {
	//
	//	}
	//	saveMaxHit: function(e) {
	//
	//	}
	//	selectProcess: function(e) {
	//
	//	}
	//	searchProcess: function(e) {
	//
	//	}
	//	_handleToolBar: function() {
	//
	//	}
	//	_selectContextPath: function(e) {
	//
	//	}
	//	_selectFirstElement: function(e) {
	//
	//	}
	//	navToEmptyView: function() {
	//
	//	}
	//	_modifyListAfterCreate: function(i) {
	//
	//	}
	//	onDataLoaded: function() {
	//
	//	}
	//	opptListRefreshed: function(e) {
	//
	//	}
	//	applyFilterFromContext: function(c) {
	//
	//	}
	//	onBack: function(e) {
	//
	//	}
	//	dataLossForExit: function(r) {
	//
	//	}
	//	onGrowingFinished: function(e) {
	//
	//	}
	//	_checkForOfflineErrors: function() {
	//
	//	}
	//	displayErrorIndicator: function() {
	//
	//	}
	//	hideErrorIndicator: function() {
	//
	//	}
	//	_displayErrors: function(e) {
	//
	//	}
	//	_onErrorItemPressed: function(c) {
	//
	//	}
	//	_onOfflineDataRefreshed: function() {
	//
	//	}
	//	_onOrientationchange: function() {
	//
	//	}
		_initHeaderFooterOptions: function() {
		    // Customizing for sorting fragment
		    this.sortingDailogFragment = this.isOffline ? new sap.ui.xmlfragment(this.createId("show_Sort_Fragment"),
			'cus.crm.opportunity.view.SortingDialog_Offline', this) : new sap.ui.xmlfragment(this.createId("show_Sort_Fragment"),
			'cus.crm.opportunity.CRM_OPPRTNTYExtension.view.SortingDialog', this);
		    this.sortingDailogFragment.setModel(new sap.ui.model.json.JSONModel());
		    this.sortingDailogFragment.setModel(this.oI18nModel, 'i18n');
		    //
    		var t = this;
    		this.oHeaderFooterOptions = {
    			onBack: jQuery.proxy(this.onBack, this),
    			sI18NMasterTitle: this.oApplicationFacade.getResourceBundle().getText("MASTER_TITLE", this.numberOfOpportunity),
    			oSortOptions: {
    				onSortPressed: function(k) {
    					jQuery.proxy(t.sorting1(k), this);
    				}
    			},
    			aAdditionalSettingButtons: this.isOffline ? [] : [{
    				sI18nBtnTxt: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LIST_SETTING'),
    				sId: "BTN_S2_SHOW",
    				sIcon: "sap-icon://settings",
    				onBtnPressed: function(k) {
    					jQuery.proxy(t.onShow(k), this);
    				}
    			} ],
    			oAddOptions: this.isOffline ? null : {
    				sId: "BTN_S2_ADD",
    				onBtnPressed: function(k) {
    					jQuery.proxy(t.onCreate(k), this);
    				}
    			},
    			buttonList: this.isOffline ? [] : null
    		};
		}

});