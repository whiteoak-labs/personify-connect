Ext.define('Personify.view.event.events.EventItem', {
    xtype: 'eventitem',
    extend: 'Ext.Panel',
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
                                html:'{[this.isMembersOnly(values.membersOnly)]}'
                            },
                            {
                                html: '{[Personify.utils.ItemUtil.getDayEventView(Personify.utils.ItemUtil.convertStringToDate(values.startDateTimeString))]}',
                                cls:'eventDay'
                            },
                            {
                                cls: 'eventMonth',
                                html:'{[Personify.utils.ItemUtil.getMonthEventView(Personify.utils.ItemUtil.convertStringToDate(values.startDateTimeString))]}'
                            },
                            {
                                html: '{[Personify.utils.ItemUtil.getMeetingTag(values.meetingTag)]}',
                                cls: '{[Personify.utils.ItemUtil.getMeetingTagCls(values.meetingTag)]}' ,
                                docked:'bottom'
                            }
                        ]
                    },
                    {
                        cls:'eventItemContent',
                        layout: 'vbox',
                        items: [
                            {
                                html: '{[Personify.utils.ItemUtil.getDisplaysTimeWithTimeZoneCode(values)]}'
                            },
                            {
                                html: '{shortName}',
                                cls:'eventSummary'
                            },
                            {
                                layout: 'hbox',
                                docked: 'bottom',
                                cls:'locationEvent',
                                items:[
                                   
                                    {
                                        html: '{[Personify.utils.ItemUtil.getTypeOfEvent(values.eventType)]}'
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
        ]
    }
});