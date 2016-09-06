Ext.define('Personify.view.phone.store.FeatureItemTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'featureitemtemplate',

    config: {
        baseCls: 'feature-item-template',
        scrollable: null,
        itemTpl: new Ext.XTemplate(
            '<table width="100%" class="table-feature-item-template">' +
                '<tr width="100%">' +
                    '<td width="93px" height="93px" class="img-feature-item-template"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="93px" height="93px"/></td>' +
                    '<td width="80%" height="93px" class="content-feature-item-template">' +
                        '<p class="title-feature-item-template"><b>{[Personify.utils.ItemUtil.getShortContent(values.name, 30)]}</b></p>' +
                        '<p class="list-price-feature-item-template">{[this.checkPriceNull(values.price, values.memberPrice, values.yourPrice, values.yourPriceRateStructure)]}</p>' +
                        '<p class="member-price-feature-item-template">{[this.checkMemberPriceNull(values.price, values.memberPrice, values.yourPrice, values.yourPriceRateStructure)]}</p>' +
                        '<p style="margin: 0px;">{[this.checkMember(values.membersonly)]}' +
                                                '{[this.checkSoldOut(values.subSystem, values.soldout, values.inventoriedProduct)]}' +
                                                '{[this.checkBackOrder(values.allowbackorders, values.availablequantity, values.inventoriedProduct)]}' +
                                                '{[this.checkLimitQuantity(values.allowbackorders, values.availablequantity, values.soldout, values.inventoriedProduct)]}</p>' +
                    '</td>' +
                '</tr>' +
            '</table>',
            {
                checkMemberPriceNull: function(price, memberPrice,yourPrice,rateCode) {
                    var rateCode1 = rateCode? rateCode.trim().toLowerCase() : 'list';
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
                    var rateCode1 = rateCode? rateCode.trim().toLowerCase() : 'list';
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