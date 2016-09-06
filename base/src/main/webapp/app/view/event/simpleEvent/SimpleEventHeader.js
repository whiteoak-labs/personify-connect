Ext.define('Personify.view.event.simpleEvent.SimpleEventHeader', {
    extend: 'Ext.Container',
    xtype: 'simpleEventHeader',
    controller: 'Personify.controller.event.simpleEvent.SimpleEventHeader',
    requires: 'Personify.controller.event.simpleEvent.SimpleEventHeader',

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
                                                width: 105,
                                                itemId:'labelListPrice'
                                            },
                                            {
                                                html: 'Member Price :',
                                                width: 105,
                                                itemId:'labelMemberprice'
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
                                        cls: 'p-button-map',
                                        hidden: true
                                    }
                                ]
                            },
                            {
                                cls: 'p-label-location',
                                itemId: 'fullAddress',
                                listeners: {
                                    initialize: function(panel) {
                                        panel.element.on('tap', function() {
                                            panel.fireEvent('onTapAddressList');
                                        });
                                    }
                                }
                            },
                            {
                                cls: 'p-label-location eventDetailLocation',
                                itemId: 'location'
                            }
                        ]
                    }
                ]
            }
        ]
    },

    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});