Ext.define('Personify.view.phone.schedule.PersonalAgenda', {
    extend: 'Ext.Panel',
    xtype: 'personalAgendaPhone',
    controller: 'Personify.controller.phone.schedule.PersonalAgenda',
    
    requires: [
        'Personify.controller.phone.schedule.PersonalAgenda',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.schedule.ScheduleList'
    ],
    config: {
        layout: 'vbox',
        cls: 'p-phone-background-white',
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Personal Meeting',
                itemId: 'eventToolbar'
            },
            {
                layout: 'vbox',
                cls: 'p-phone-event-detail',
                flex: 1,
                scrollable: true,
                items: [
                    {
                        layout: 'hbox',
                        cls: 'p-phone-event-personal-header',
                        items: [
                            {
                                layout: 'vbox',
                                cls: 'p-phone-calendar-day-personal-event',
                                items: [
                                    {
                                        layout: {
                                            type: 'hbox',
                                            pack: 'center',
                                            align: 'center'
                                        },
                                        items:[
                                            {
                                                itemId:'numberOfDate',
                                                cls: 'p-phone-itemlist-eventday-personal-event'
                                            }
                                        ]
                                    },
                                    {
                                        itemId: 'monthAndYear'
                                    }
                                ]
                            },
                            {
                                flex: 1,
                                itemId: 'titleOfEvent',
                                cls: 'p-phone-eventdetail-header'
                            },
                            {
                                docked: 'bottom',
                                html: '<hr>'
                            }
                        ]
                    },
                    {
                        html: 'About:',
                        cls: 'p-phone-eventdetail-titletext'
                    },
                    {
                        itemId: 'description',
                        cls: 'p-panel-phone-same-component-top'
                    },
                    {
                        layout: {
                            type:'hbox',
                            align:'center'
                        },
                        cls:'p-phone-border-field',
                        items: [
                            {
                                html: 'Location:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                itemId: 'location',
                                cls: 'p-phone-eventdetail-location'
                            }
                        ]
                    },
                    {
                        layout: {
                            type:'hbox',
                            align:'center'
                        },
                        cls:'p-phone-border-field',
                        items: [
                            {
                                html: 'When:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                itemId: 'timeDisplay'
                            }
                        ]
                    },
                    {
                        layout: 'vbox',
                        flex: 1,
                        cls:'p-phone-button-actioneventdetails',
                        items:[
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-eventdetail-regiter',
                                text: 'Remove',
                                itemId: 'deleteAgendaButton',
                                pressedCls: 'p-phone-button-red-pressing'
                            }
                        ]
                    }
                ]
            }
        ]
    }//end config
});