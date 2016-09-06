Ext.define('Personify.view.phone.store.StoreItemTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'storeitemtemplatephone',

    config: {
        baseCls: 'listNotificationPhone',
        emptyText: '<div class = "p-emptyText-phone">No Product</div>',
        deferEmptyText: false,
        pressedCls: 'listNotificationPhone-selected',
        selectedCls: 'listNotificationPhone-selected',
        scrollable : {
            direction: 'vertical',
            directionLock: true,
            momentumEasing:  {
                momentum: {
                    acceleration: 30,
                    friction: 0.5
                },
                bounce: {
                    acceleration: 0.0001,
                    springTension: 0.9999
                },
                minVelocity: 5
            },
            outOfBoundRestrictFactor: 0
        },
        scrollToTopOnRefresh: false,
        itemTpl: new Ext.XTemplate(
            '<table width="100%" style="margin: 0px;">' +
                '<tr width="100%">' +
                    '<td width="70px" height="70px" class="img-allExhibitorList" style="padding: 0px;"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="70px" height="70px"/></td>' +
                    '<td width="90%" class="cont-allExhibitorList">' +
                        '<p style="margin: 0px 0px 5px;"><b>{[Personify.utils.ItemUtil.checkStringNull(values.name)]}</b></p>' +
                        '<div style="float:left;width:100%;"><p style="margin: 0px;">{[this.checkPriceNull(values.price, values.memberPrice,values.yourPrice,values.yourPriceRateStructure)]}</p><div>' +
                        '<div style="float:left;width:100%;"><p style="margin: 0px;">{[this.checkMemberPriceNull(values.price, values.memberPrice, values.yourPrice,values.yourPriceRateStructure)]}</p></div>' +
                        '<p style="margin: 0px;">{[this.checkMember(values.membersonly)]}' +
                                                '{[this.checkSoldOut(values.subSystem, values.soldout, values.inventoriedProduct)]}' +
                                                '{[this.checkBackOrder(values.allowbackorders, values.availablequantity, values.inventoriedProduct)]}' +
                                                '{[this.checkLimitQuantity(values.allowbackorders, values.availablequantity, values.soldout, values.inventoriedProduct)]}</p>' +
                    '</td>' +
                '</tr>' +
            '</table>',
            {
                checkMemberPriceNull: function(price, memberPrice,yourPrice,rateCode) {
                    rateCode1 = rateCode? rateCode.trim().toLowerCase() : 'list';
                    var currentUser = Personify.utils.Configuration.getCurrentUser();
                    if (currentUser.isLogged()) {
                        if(rateCode1=='list'){
                            if(memberPrice == null || memberPrice == "") {
                                return '';
                            } else {
                                return '<div><span style="float: left;width:100px;">Member Price: </span><span style="color: red;float: left;width:' + Personify.utils.ItemUtil.getWidthPrice(price, memberPrice, 8) + 'px">' + Personify.utils.ItemUtil.formatPurchaseAmount(memberPrice, 2) + '</span></div>';
                            }
                        }
                        else{
                            if(yourPrice == null || yourPrice == "") {
                                return '';
                            } else {
                                return '<div><span style="float: left;width:100px;">Your Price: </span><span style="color: red;float: left;width:' + Personify.utils.ItemUtil.getWidthPrice(price, yourPrice, 8) + 'px">' + Personify.utils.ItemUtil.formatPurchaseAmount(yourPrice, 2) + '</span></div>';
                            }
                        }
                        
                    }
                    else{
                        if(memberPrice == null || memberPrice == "") {
                            return '';
                        } else {
                            return '<div><span style="float: left;width:100px;">Member Price: </span><span style="color: red;float: left;width:' + Personify.utils.ItemUtil.getWidthPrice(price, memberPrice, 8) + 'px">' + Personify.utils.ItemUtil.formatPurchaseAmount(memberPrice, 2) + '</span></div>';
                        }
                    }
                },

                checkPriceNull: function(price, memberPrice,yourPrice,rateCode) {
                    rateCode1 = rateCode? rateCode.trim().toLowerCase() : 'list';
                    var currentUser = Personify.utils.Configuration.getCurrentUser();
                    if (currentUser.isLogged()) {
                        if(rateCode1=='list'){
                            if(yourPrice == null || yourPrice == "") {
                                return '';
                            } else {
                                return '<div><span style="float: left;width:100px;">Your Price: </span><span style="float: left;width:' + Personify.utils.ItemUtil.getWidthPrice(price, memberPrice, 8) + 'px">' + Personify.utils.ItemUtil.formatPurchaseAmount(yourPrice, 2) + '</span></div>';
                            }
                        }else{
                            if(price == null || price == "") {
                                return '';
                            } else {
                                return '<div><span style="float: left;width:100px;">List Price: </span><span style="float: left;width:' + Personify.utils.ItemUtil.getWidthPrice(price, memberPrice, 8) + 'px">' + Personify.utils.ItemUtil.formatPurchaseAmount(price, 2) + '</span></div>';
                            }
                        }
                    }
                    else{
                        if(price == null || price == "") {
                            return '';
                        } else {
                            return '<div><span style="float: left;width:100px;">List Price: </span><span style="float: left;width:' + Personify.utils.ItemUtil.getWidthPrice(price, memberPrice, 8) + 'px">' + Personify.utils.ItemUtil.formatPurchaseAmount(price, 2) + '</span></div>';
                        }
                    }
                },

                checkMember: function(membersonly) {
                    if(membersonly == null || membersonly == false) {
                        return '';
                    } else {
                        return '<p class="member-only-feature-item-template">Member Only</p>';
                    }
                },

                checkSoldOut: function(subSystem, soldout, inventoriedProduct) {
                    if(subSystem == "FND" || inventoriedProduct == false) {
                        return '';
                    }

                    if(soldout == null || soldout == false) {
                        return '';
                    } else {
                        return '<p class="soldout-storeitemtemplatephone">Sold Out</p>';
                    }
                },

                checkBackOrder: function(allowbackorders, availablequantity, inventoriedProduct) {
                    if(inventoriedProduct == false) {
                        return '';
                    } else {
                        if(allowbackorders == true && availablequantity >= 1) {
                            return '';
                        }

                        if(allowbackorders == true && availablequantity == 0) {
                            return '<p class="backorder-storeitemtemplatephone">Back Order</p>';
                        }
                    }
                    return '';
                },

                checkLimitQuantity: function(allowbackorders, availablequantity, soldout, inventoriedProduct) {
                    if(inventoriedProduct == false) {
                        return '';
                    } else {
                        if(allowbackorders == true && availablequantity == 0) {
                            return '';
                        }

                        if(allowbackorders == true && availablequantity <= 10 && availablequantity > 0) {
                            return '<p class="backorder-storeitemtemplatephone" style="width: 115px;">Limited Quantities</p>';
                        }
                    }

                    if(availablequantity < 100 && soldout == false) {
                        return '<p class="backorder-storeitemtemplatephone" style="width: 115px;">Limited Quantities</p>';
                    } else {
                        return '';
                    }
                }
            }
        )
    }
});