Ext.define('Personify.view.event.complexevent.sessions.eventschedule.EventItemList', {
    extend:'Ext.Panel',
    config: {
        layout:'hbox',
        pack:'left',
        items: [
            {
                xtype: 'panel',
                cls: 'dayInfoPanel',
                minHeight: '80px',
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
                style: 'padding: 0px 0px 0px 10px;overflow:auto;height:100%',
                items: [
                    {
                        cls: 'title-event-complex',
                        html: '{title}',
                        style: 'height:90%'
                    },
                    {
                        cls: 'place-event-complex eventLocation',
                        style: 'height:10%;padding:2px 0px;margin-top:4%',
                        html: '{locationDescription}'
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