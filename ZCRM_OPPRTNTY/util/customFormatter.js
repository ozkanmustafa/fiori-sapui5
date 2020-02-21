/*eslint linebreak-style: ["error", "unix"]*/
jQuery.sap.declare("cus.crm.opportunity.CRM_OPPRTNTYExtension.util.customFormatter");
cus.crm.opportunity.CRM_OPPRTNTYExtension.util.customFormatter = {
    
    isVisibleOnayla : function (sHas,sNo,sHas_2) {
        if (sHas === "X" || sHas_2 === "" || parseInt(sNo) <= 0) {
            return false;
        } else {
        	return true;
        }
    },
    isVisible : function (sNo,sStatu) {
        if (parseInt(sNo) <= 0) { //&& (sStatu !== "E0001" || sStatu !== "E0018") ) {
            return false;
        }
        // if (sStatu === "E0001" || sStatu === "E0018") {
        // 	return true;
        // } else {
        // 	return false;
        // }
        
    },
    isVisibleBayi : function (sHas) {
    	if (sHas === "X") {
    		return false;
    	} else {
    		return true;
    	}
    },
    isEditEnable : function (sStatu) {
        // if (sStatu === "E0015") {
        //     return false;
        // }
    },
    isDeleteEnabled : function (id,s) {/*
        if (id === "ISTEK" && s) {
            var aProduct = this.getView().getModel("ProductList").getProperty("/Products");
            for (var i=0;aProduct.length;i++) {
                if (s === aProduct[i].ProductGuid) {
                    if (aProduct[i].Nodes.length > 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
        
    */},
    
/*    isDelete : function (Id,s) {
        if (Id === "AROMA" && s === "E0001") {
            return true;
        } else {
            return false;
        }
    },*/
    isAcceptEnabled : function (s) {
        if (s === "E0001" || s === "E0018") {
            return true;
        } else {
            return false;
        }
    },
    isRejectEnabled : function (s) {
        if (s === "E0001" || s === "E0018") {
            return true;
        } else {
            return false;
        }
    },
    isMalzeme : function (m) {
        if (m === undefined) {
            return false;
        } else {
            return true;
        }
    },
    isSonucEnabled : function (sNumune,sTeslimat) {
        if (sNumune === "2" || sTeslimat === undefined || sTeslimat === "" ) {
            return false;
        }
    },
/*    isNoteEnabled : function (sStatu) {
        if (sStatu === "E0001" || sStatu === "E0008" || 
        sStatu === "E0016" || sStatu === "E0011" || 
        sStatu === "E0012" || sStatu === "E0021") { 
                return false;
            } else {
                return true;
            }
    },*/
    isEditableNote : function (sType) {
        if (sType === "Z003") {
            return false;
        } else {
            return true; 
        }
    },
    isDoubleKodVisible : function (sType) {
        if (sType === "Z008") {
            return false;
        }
    },
    isMalzemeClick : function (sNo,sTeslimat,sUrunAgaci) {
       var sType = this.getView().getModel("json").getProperty("/ProcessType");
       if (sType === "Z008") {
	       if (sNo === "ZUYG" && sTeslimat && sUrunAgaci === "X") {
	       		return true;
	       } else {
	       		return false;
	       }
       } else {
       		if (sNo === "ZUYG") {
       			return true;
       		} else {
       			return false;
       		}
       }
       
       
        if (sType === "Z007" && sNo === "ZUYG")  {
            return true;
        } else {
            return false;
        }
    },
    isBitmisUrun : function (bUrun) {
        if (bUrun === "X") {
            return true;
        } else {
            return false;
        }
    },
    onChangeStatu : function (sType) {
    	if (sType === "Z008") { // Bayi Numune
    		return "Success";
    	} else
    	if (sType === "Z003") {	// Aromsa Satis
    		return "Warning";
    	} else 
    	if (sType === "Z004") {	// Bayi Satis
    		return "Error";
    	}
    },
    
    isIstekClickable : function (sNo) {
    	if (parseInt(sNo) <= 0) {
    		return false;
    	} else {
    		return true;
    	}
    },
    
    isChangeText : function (sText) {
    	var oResource = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle();
    	if (sText === "X") {
    		var sProductTree = oResource.getText("PRODUCT_TREE_S");
    		return sProductTree;
    	}
    	if (sText === "") {
    		var sProductTree = oResource.getText("PRODUCT_TREE_NS");
    		return sProductTree;
    	}
    },
    
    isHideUrunAgaci : function (sNo) {
    	var sType = this.getView().getModel("json").getProperty("/ProcessType");
    	if (sType === "Z008") {
    		return false;
    	} else {
    		return true;
    	}
    }
}