Ext.define('Personify.view.schedule.ScheduleItem', {
    extend: 'Ext.Panel',
    xtype: 'scheduleitem',
    config: {
        layout: 'vbox',
        items: [
            {
                layout: 'hbox',
                baseCls:'eventItems',
                items:[
                    {   
                        layout: 'vbox',
                        docked:'left',
                        cls: 'dayInfoPanel',
                        items: [
                            {
                                html: '{[Personify.utils.ItemUtil.getDayEventView(values.startDateTime)]}',
                                cls:'eventDay'
                            },
                            {
                                cls: 'eventMonth',
                                html:'{[Personify.utils.ItemUtil.getMonthEventView(values.startDateTime)]}'
                            },
                            {
                                html: '{[this.getType(values)]}',
                                cls: 'eventStatus' ,
                                docked:'bottom'
                            }
                        ]
                    },
                    {
                        cls:'eventItemContent',
                        layout: 'hbox',
                        items: [
                            {
                                layout: 'vbox',
                                items: [
                                    {
                                        html: '{[Personify.utils.ItemUtil.getDisplayTimeForEvent(values.startDateTimeString, values.endDateTimeString)]}'
                                    },
                                    {
                                        html: '{title}',
                                        cls:'eventSummary'
                                    },
                                    {
                                        layout: 'hbox',
                                        docked: 'bottom',
                                        cls:'locationEvent',
                                        items:[
                                            {
                                                html: '{location}',
                                                cls: 'eventLocation'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                docked: 'right',
                                items: [
                                    {
                                        xtype:'button',
                                        cls: 'p-button-red-inlist',
                                        text: 'Remove',
                                        docked:'bottom'
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