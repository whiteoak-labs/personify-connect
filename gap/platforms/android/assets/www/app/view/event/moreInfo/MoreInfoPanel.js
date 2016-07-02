Ext.define('Personify.view.event.moreInfo.MoreInfoPanel', {
    extend: 'Ext.Container',
    xtype: 'moreinfopanel',
    requires: [
        'Personify.view.event.moreInfo.MoreInfoContent',
        'Personify.view.event.moreInfo.MoreInfoHearder',
        'Personify.view.event.moreInfo.MoreInforFooter',
        'Personify.utils.ItemUtil'
    ],
    config: {
        layout: 'hbox',
        cls: 'moreinfoBanner',
        cls: 'p-panel-addOrFilterPanel',
        xtype: 'panel',
        width: 450,
        height: '100%',
        modal: true,
        hideOnMaskTap: true,
        right: 0,
        top: 0,
        hidden: true,
        layout: 'vbox',
        showAnimation: {
            type: 'slide'
        },
        scrollable: {
             direction: 'vertical',
             directionLock: true
        },
        items: [
            {
                layout: 'hbox',
                cls: 'p-panel-addOrFilterPanel',
                items: [
                    {
                        html: 'Registered'
                    },
                    {
                        xtype: 'button',
                        cls: 'p-close-button',
                        text: 'X',
                        right: 0,
                        listeners: {
                            tap: function() {
                                this.parent.parent.hide();
                            }
                        }
                    }
                ]
            },
            {
                items: [
                    {
                        xtype: 'moreInfoHearder',
                        itemId: 'moreInfoHearder'
                    },
                    {
                        xtype: 'moreInfoContent',
                        minHeight: 200,
                        scrollable: true
                    },
                    {
                        xtype:'moreInfoFooter'
                    }
                ]
            }
        ]
    },//config
    
    applyRecord: function(record) {
        if(record != null)
        {
            var currentUser = Personify.utils.Configuration.getCurrentUser();
           
            if (record[0] != null){
                var day = record[0].startDateTime.getDate();
                var month = this.getMonth(record[0].startDateTime);
                var time = Ext.Date.format(record[0].startDateTime, 'g:i a');
                var dates = Ext.Date.format(record[0].startDateTime, 'm/d/y') + '-'
                          + Ext.Date.format(record[0].endDateTime, 'm/d/y');
                var yourPriceRateStructure = record[0].yourPriceRateStructure? record[0].yourPriceRateStructure.trim().toLowerCase() : 'list';
           
                this.down("#moreInfoHearder").down("#eventDay").setHtml('<br>'+day);
                this.down("#moreInfoHearder").down("#eventMonth").setHtml(month);
                this.down("#moreInfoHearder").down("#eventSummary").setHtml(record[0].name +'<br>' + record[0].description);
                this.down("#moreInfoHearder").down("#timeAndlocation").setHtml('<span class="timeEvent">'+time+'</span> |' +record[0].location);
                this.down("#moreInfoHearder").down("#datesEvent").setHtml(dates);
                this.down("#moreInfoHearder").down("#listPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record[0].price, 2));
           
                if (currentUser.isLogged()) {
           
                    if(yourPriceRateStructure == 'list')
                    {
                        this.down("#moreInfoHearder").down("#memberPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record[0].memberPrice, 2));
                        this.down("#moreInfoHearder").down("#labelListPriceEvent").setHtml('Your Price :');
                        this.down("#moreInfoHearder").down("#listPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record[0].yourPrice, 2));           
                    }
                    else
                    {
                        this.down("#moreInfoHearder").down("#memberPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record[0].yourPrice, 2));
                        this.down("#moreInfoHearder").down("#labelMemberPriceEvent").setHtml('Your Price :');
                    }
                }else{
                    this.down("#moreInfoHearder").down("#memberPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record[0].memberPrice, 2));
                }
           }else{
                var day = record.get('startDateTime').getDate();
                var month = Personify.utils.ItemUtil.getMonthEventView(record.get('startDateTime'));
                var time = Ext.Date.format(record.get('startDateTime'), 'g:i a');
                var dates = Ext.Date.format(record.get('startDateTime'), 'm/d/y') + '-'
                          + Ext.Date.format(record.get('endDateTime'), 'm/d/y');
                var yourPriceRateStructure = record.get('yourPriceRateStructure')? record.get('yourPriceRateStructure').trim().toLowerCase() : 'list';
           
                this.down("#moreInfoHearder").down("#eventDay").setHtml('<br>'+day);
                this.down("#moreInfoHearder").down("#eventMonth").setHtml(month);
                this.down("#moreInfoHearder").down("#eventSummary").setHtml(record.get('name') +'<br>' + record.get('description'));
                this.down("#moreInfoHearder").down("#timeAndlocation").setHtml('<span class="timeEvent">'+time+'</span> |' +record.get('location'));
                this.down("#moreInfoHearder").down("#datesEvent").setHtml(dates);
                this.down("#moreInfoHearder").down("#listPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record.get('price'), 2));
                if (currentUser.isLogged()) {
                    if(yourPriceRateStructure == 'list')
                    {
                        this.down("#moreInfoHearder").down("#memberPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record.get('memberPrice'), 2));
                        this.down("#moreInfoHearder").down("#labelListPriceEvent").setHtml('Your Price :');
                        this.down("#moreInfoHearder").down("#listPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record.get('yourPrice'), 2));
                    }
                    else
                    {
                        this.down("#moreInfoHearder").down("#memberPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record.get('yourPrice'), 2));
                        this.down("#moreInfoHearder").down("#labelMemberPriceEvent").setHtml('Your Price :');
                    }
                }else{
                    this.down("#moreInfoHearder").down("#memberPriceEvent").setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(record.get('memberPrice'), 2));
                }
           
            }
        }
    },
    hide: function() {
        this.destroy();
    }
});