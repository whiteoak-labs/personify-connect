Ext.define('Personify.view.event.complexevent.detailsession.SessionHeaderDetail', {
    extend: 'Ext.Container',
    xtype: 'headerdetailevent',
    controller: 'Personify.controller.event.complexevent.detailsession.SessionHeaderDetail',
    requires: 'Personify.controller.event.complexevent.detailsession.SessionHeaderDetail',

    config: {
        layout: 'vbox',
        cls: 'p-headerdetailevent panel-left-not-gradient',
        items: [
            {
                layout: 'vbox',
                items: [
                    {
                        layout:'vbox',
                        docked: 'left',
                        style: 'background-color: #364249',
                        items: [
                            {
                                itemId: 'daySession',
                                cls: 'daySession-p-headerdetail-simpleevent'
                            },
                            {
                                itemId: 'timeSession',
                                width: '90px'
                            },
                            {
                                itemId: 'timeZone',
                                cls: 'timeZoneSession'
                            },
                            {
                                itemId: 'statusSession'
                            }
                        ]
                    },
                    {
                        layout: 'vbox',
                        cls: 'p-headerdetailevent-content',
                        items: [
                            {
                                cls: 'p-label-title-event',
                                itemId: 'titleHeaderDetail'
                            },
                            {
                                layout: 'hbox',
                                style: 'font-size: 11pt',
                                items: [
                                    {
                                        layout:'vbox',
                                        items: [
                                            {
                                                html: 'List Price :',
                                                itemId:'labelListPrice'
                                            },
                                            {
                                                html: 'Member Price :',
                                                itemId:'labelMemberPrice'
                                            }
                                        ]
                                    },
                                    {
                                        layout:'vbox',
                                        items: [
                                            {
                                                itemId:'price'
                                            },
                                            {
                                                itemId:'memberPrice',
                                                cls: 'member-price-moredetail-page'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'vbox',
                                docked: 'right',
                                cls: 'panel-contain-button',
                                items: [
                                    {
                                        xtype: 'button',
                                        html: '',
                                        cls: 'p-button-AddToSchedule',
                                        itemId: 'inMySchedule'
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: '',
                                                cls: 'p-button-share',
                                                itemId: 'shareButton'
                                             },
                                             {
                                                 xtype: 'button',
                                                 text: '', 
                                                 cls: 'p-share-calendar',
                                                 itemId: 'shareCalendar'
                                             }
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Map It',
                                        itemId: 'mapItDetailComplex',
                                        cls: 'p-button-map'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Close',
                                        itemId: 'backToSessionList',
                                        cls: 'p-button-red-inlist',
                                        style: 'right: -10px; width: 110px; margin-top: 5px; font-size: 13px'
                                    }
                                ]
                            },
                            {
                                cls: 'p-label-location eventSessionDetailLocation',
                                itemId: 'location'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});