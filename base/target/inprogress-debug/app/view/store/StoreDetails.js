Ext.define('Personify.view.store.StoreDetails', {
    extend: 'Ext.dataview.DataView',
    alias: 'widget.storedetail',

    config: {
        baseCls: 'storeDetail',
        pressedCls: 'p-storeitem-pressed',
        scrollable: null,
        
        itemTpl: new Ext.XTemplate(
            '<div class="leftStoreDetail">',
                '{[this.showMemberOnly(values.membersonly)]}',
                '<img class="imageStoreDetail" src="{imageURL}" />',
                '{[this.showSoldOut(values.soldout, values.inventoriedProduct, values.subSystem)]}',
            '</div>',
            '<div class="rightStoreDetail">',
                '<div class="moreStoreTitle">{[Personify.utils.ItemUtil.getShortContent(values.name, 60)]}</div>',
                '<div class="moreStorePrice">',
                    '<div class="moreStoreList">',
                        '{[this.showListPrice(Personify.utils.ItemUtil.getWidthPrice(values.memberPrice, values.price, 7.8),Personify.utils.ItemUtil.formatPurchaseAmount(values.yourPrice, 2),Personify.utils.ItemUtil.formatPurchaseAmount(values.price, 2),values.yourPriceRateStructure)]}',
                    '</div>',
                    '<div class="moreStoreMember">',
                        '{[this.showPrice(Personify.utils.ItemUtil.getWidthPrice(values.memberPrice, values.price, 7.8),Personify.utils.ItemUtil.formatPurchaseAmount(values.yourPrice, 2),Personify.utils.ItemUtil.formatPurchaseAmount(values.memberPrice, 2),values.yourPriceRateStructure)]}',
                    '</div>',
                    '<div class="morestorebackorder">',
                        '{[this.showBackOrder(values.allowbackorders, values.availablequantity, values.inventoriedProduct)]}',
                        '{[this.showLimitQuantity(values.availablequantity, values.soldout, values.inventoriedProduct, values.allowbackorders)]}',
                    '</div>',
                '</div>',
            '</div>',
            {
                showMemberOnly: function(memberonly) {
                    if (memberonly) {
                        return '<div class="storememberonly">Member Only</div>';
                    } else {
                        return '<div class="morestorenoshowmemberonly"></div>';
                    }
                },
                
                showSoldOut: function(soldout, inventoriedProduct, subSytem) {
                    if (inventoriedProduct == false || subSytem == "FND") {
                        return '<div class="morestorenoshow"></div>';
                    }
                    if (soldout) {
                        return '<div class="storesoldout">Sold Out</div>';
                    } else {
                        return '<div class="morestorenoshow"></div>';
                    }
                },
                
                showBackOrder: function(backorder, quantity, inventory) {
                    if (inventory == false) {
                        return '<div class="morestorenoshow"></div>';
                    } else {
                        if (backorder == true && quantity >= 1) {
                            return '<div class="morestorenoshow"></div>';
                        }
                        if (quantity == 0 && backorder == true) {
                            return '<div class="storebackorder">Backorder Available</div>';
                        }
                    }
                    return '<div class="morestorenoshow"></div>';
                },
                
                showLimitQuantity: function(quantity, soldout, inventory, backorder) {
                    if (inventory == false) {
                        return '<div class="morestorenoshow"></div>';
                    } else {
                        if (backorder == true && quantity == 0) {
                            return '<div class="morestorenoshow"></div>';
                        }
                        if (backorder == true && quantity <= 10 && quantity > 0) {
                            return '<div class="storequantity">Limited Quantities</div>';
                        }
                    }
                    
                    if (quantity < 100 && soldout == false) {
                        return '<div class="storequantity">Limited Quantities</div>';
                    } else {
                        return '<div class="morestorenoshow"></div>';
                    }
                },
                                   
                showPrice: function(spanWidth,yourPrice1,memberPrice1,rateCode) {
                                  
                    rateCode1 = rateCode? rateCode.trim().toLowerCase() : 'list';
                    var currentUser = Personify.utils.Configuration.getCurrentUser();
                    if (currentUser.isLogged()) {
                        if(rateCode1=='list'){
                            return '<span style="float: left;width: 83px;">Member Price: </span><span style="width:'+spanWidth+'px" class="moreStoreMemberPrice">'+memberPrice1+'</span>';
                        }else{
                            return '<span style="float: left;width: 83px;">Your Price: </span><span style="width:'+spanWidth+'px" class="moreStoreMemberPrice">'+yourPrice1+'</span>';
                        }
                    } else {
                        return '<span style="float: left;width: 83px;">Member Price: </span><span style="width:'+spanWidth+'px" class="moreStoreMemberPrice">'+memberPrice1+'</span>';
                    }
                },
                showListPrice: function(spanWidth,yourPrice1,listPrice1,rateCode) {
                                   
                    rateCode1 = rateCode? rateCode.trim().toLowerCase() : 'list';
                    var currentUser = Personify.utils.Configuration.getCurrentUser();
                    if (currentUser.isLogged()) {
                        if(rateCode1=='list'){
                            return '<span style="float: left;width: 83px;">Your Price: </span><span style="width:'+spanWidth+'px" class="moreStoreListPrice">'+yourPrice1+'</span>';
                        }else{
                            return '<span style="float: left;width: 83px;">List Price: </span><span style="width:'+spanWidth+'px" class="moreStoreListPrice">'+listPrice1+'</span>';
                        }
                        } else {
                            return '<span style="float: left;width: 83px;">List Price: </span><span style="width:'+spanWidth+'px" class="moreStoreListPrice">'+listPrice1+'</span>';
                        }
                }
            }
        )
    }
});
