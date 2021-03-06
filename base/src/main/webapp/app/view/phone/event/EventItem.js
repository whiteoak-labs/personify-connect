Ext.define('Personify.view.phone.event.EventItem', {
    extend: 'Ext.Panel',
    config: {
        layout: 'hbox',
        items: [
            {
                layout: {
                    type: 'hbox',
                    pack: 'center',
                    align: 'center'
                },
                items:[
                    {
                        html: '{[Ext.Date.format(Personify.utils.ItemUtil.convertStringToDate(values.startDateTimeString), "j")]}<sup class= "p-phone-itemlist-eventday-ordinalsuffix">{[Ext.Date.format(Personify.utils.ItemUtil.convertStringToDate(values.startDateTimeString), "S")]}</sup>',
                        cls: 'p-phone-itemlist-eventday'
                    }
                ]
            },
            {
                layout : 'vbox',
                cls: 'p-phone-itemlist-eventcontent',
                items: [
                    {
                        layout:'hbox',
                        items: [
                            {
                                html: '{[Personify.utils.ItemUtil.getDisplaysTimeWithTimeZoneCode(values)]}'
                            }
                        ]
                    },
                    {
                        cls: 'p-phone-event-name',
                        html: '{shortName}'
                    },
                    {
                        layout: 'hbox',
                        items: [
                            {
                                html:'{location}',
                                cls: 'p-phone-event-location'
                            },
                            {
                                docked: 'right',
                                cls: 'p-text-registered',
                                html: '{[this.isRegistered(values.registered)]}'
                            }
                        ] 
                    }
                ]
            }
        ]
    }
});