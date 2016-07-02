Ext.define('Personify.view.event.complexevent.sessions.eventschedule.EventItemList', {
    extend:'Ext.Panel',

    config: {
        layout:'hbox',
        items: [
            {
                xtype: 'panel',
                cls: 'dayInfoPanel',
                height: '80px',
                layout: 'vbox',
                items: [
                    {
                        flex: 3,
                        html: '{startDateTimeString:this.changeTime}'
                    },
                    {
                        flex: 1,
                        html: '{[Personify.utils.ItemUtil.checkProductStatus(values.productStatus)]}'
                    }
                ]
            },
            {
                xtype: 'panel',
                flex:1,
                layout: 'vbox',
                style: 'padding: 0px 0px 0px 10px',
                items: [
                    {
                        cls: 'title-event-complex',
                        html: '{title}',
                        flex: 3
                    },
                    {
                        flex: 1,
                        cls: 'place-event-complex eventLocation',
                        html: '{location}'
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                	type: 'vbox',
                	pack: 'end'
                },
                items: [
                    {
                        xtype: 'button',
                        text: '{[this.changeButtonText(values.isAdded)]}',
                        baseCls: '{[this.changeButtonCls(values.isAdded)]}'
                    }
                ]
            }
        ]
    }
});