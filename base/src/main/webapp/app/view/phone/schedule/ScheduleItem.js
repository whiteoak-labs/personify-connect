Ext.define('Personify.view.phone.schedule.ScheduleItem', {
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
                        html: '{[Ext.Date.format(values.startDateTime, "j")]}<sup class= "p-phone-itemlist-eventday-ordinalsuffix">{[Ext.Date.format(values.startDateTime, "S")]}</sup>',
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
                                html: '{[Personify.utils.ItemUtil.getDisplayTimeForEvent(values.startDateTimeString, values.endDateTimeString)]}'
                            }
                        ]
                    },
                    {
                        cls: 'p-phone-event-name',
                        html: '{title}'
                    },
                    {
                        layout: 'hbox',
                        items: [
                            {
                                html: '{location}',
                                cls: 'p-phone-event-location'
                            },
                            {
                                xtype: 'container',
                                docked: 'right',
                                items: [
                                    {
                                        xtype:'button',
                                        cls: 'p-phone-button-removeschedule',
                                        text: 'Remove',
                                        docked:'bottom',
                                        pressedCls: 'p-phone-button-red-pressing'
                                    }
                                ]
                            }
                        ] 
                    }
                ]
            }
        ]
    }
});