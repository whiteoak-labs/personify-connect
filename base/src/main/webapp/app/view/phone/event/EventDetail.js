Ext.define('Personify.view.phone.event.EventDetail', {
    extend: 'Ext.Panel',
    xtype: 'eventDetailPhone',
    controller: 'Personify.controller.phone.event.EventDetail',

    requires: [
        'Personify.controller.phone.event.EventDetail',
        'Personify.view.phone.common.Toolbar'
    ],
    config: {
        layout: 'vbox',
        cls: 'p-phone-background-white',
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Event Details',
                itemId: 'eventToolbar'
            },
            {
                layout: 'vbox',
                cls: 'p-phone-event-detail',
                flex: 1,
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                items: [
                    {
                        itemId: 'titleOfEvent',
                        cls: 'p-phone-eventdetail-header'
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
                                layout: 'vbox',
                                cls: 'p-phone-eventdetail-border-field-content',
                                items: [
                                    {
                                        itemId: 'locationFullAddress',
                                        style:'font-weight:bold',
                                        listeners: {
                                            initialize: function(panel) {
                                                panel.element.on('tap', function() {
                                                    panel.fireEvent('onTapAddressList');
                                                });
                                            }
                                        }
                                    },
                                    {
                                        itemId: 'location',
                                        cls: 'p-phone-eventdetail-location'
                                    }
                                ]
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
                                cls: 'p-phone-eventdetail-border-field-content p-phone-eventdetail-when',
                                itemId: 'timeLabel'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        cls: 'p-phone-price-field p-phone-border-field',
                        itemId: 'pricingPanel',
                        items: [
                            {
                                html: 'Pricing:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                layout: 'vbox',
                                cls: 'p-phone-eventdetail-pricing',
                                items: [
                                    {
                                        layout: 'hbox',
                                        items: [
                                            {
                                                flex:2,
                                                html: 'List Price: ',
                                                cls: 'p-phone-list-price-container',
                                                itemId : 'labelListPrice'
                                            },
                                            {
                                                flex:1,
                                                itemId : 'price'
                                            }
                                        ]
                                    },
                                    {
                                        layout: 'hbox',
                                        items: [
                                            {
                                                flex:2,
                                                html: 'Member Price: ',
                                                style:'font-weight:bold',
                                                cls: 'p-phone-list-price-container',
                                                itemId : 'labelMemberPrice',
                                            },
                                            {
                                                flex:1,
                                                itemId : 'memberPrice',
                                                style:'font-weight:bold;color:red;'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout: {
                            type:'hbox',
                            align:'center'
                        },
                        cls:'p-phone-border-field',
                        itemId: 'rateEventPanel',
                        hidden: true,
                        listeners: {
                            initialize: function(panel) {
                                panel.element.on('tap', function() {
                                    panel.fireEvent('gotorate');
                                });
                                panel.element.on('touchstart', function() {
                                    panel.addCls('p-panel-pressing');
                                });
                                panel.element.on('touchend', function() {
                                    panel.removeCls('p-panel-pressing');
                                });
                            }
                        },
                        items: [
                            {
                                html: 'Rate:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                cls:'p-phone-arrowgrayimage'
                            }
                        ]
                    },
                    {
                        layout: 'vbox',
                        cls:'p-phone-button-actioneventdetails',
                        items:[
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-eventdetail-savetocalendar',
                                text: 'Save to Calendar',
                                pressedCls: 'p-phone-button-blue-pressing',
                                itemId: 'saveToMyCalendar',
                                 hidden:true
                            },
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-eventdetail-savetocalendar',
                                text: 'Add to My Schedule',
                                itemId: 'addToMySchedule'
                            },
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-eventdetail-addtocart',
                                text: 'Register',
                                pressedCls: 'p-phone-button-blue-pressing',
                                itemId: 'addToCart',
                                hidden: true
                            },
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-eventdetail-regiter',
                                text: 'Register Now',
                                pressedCls: 'p-phone-button-red-pressing',
                                itemId: 'registerNow',
                                hidden: true
                            },
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-eventdetail-savetocalendar',
                                text: 'Share',
                                pressedCls: 'p-phone-button-blue-pressing',
                                itemId: 'shareEventPhone'
                            }
                        ]
                    }
                ]
            },
            {
                layout: 'vbox',
                docked: 'bottom',
                flex: 1,
                cls:'p-phone-button-actioneventdetails',
                items:[
                    {
                        cls: 'p-phone-text-alreadyRegistered',
                        html: 'Already Registered',
                        itemId: 'alreadyRegistered',
                        hidden: true
                    }
                ]
            }
        ]
    },//end config

    refresh: function(callback){
        this.getController().onRefreshData(callback);
    }
});
