Ext.define('Personify.view.phone.session.SessionDetail', {
    extend: 'Ext.Container',
    xtype:'sessiondetailphone',
    controller: 'Personify.controller.phone.session.SessionDetaill',
    requires: [
        'Personify.controller.phone.session.SessionDetaill',
        'Personify.view.phone.note.NoteNavigation',
        'Personify.view.phone.rate.Rate'
    ],

    config: {
        layout:'vbox',
        meetingRecord: null,
        sessionRecords: null,
        locationDescription: null,
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Session Details',
                itemId: 'eventToolbar'
            },
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'titleSessionDetail'
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
                        layout: 'hbox',
                        items: [
                            {
                                html: 'Date:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                itemId: 'dateLabel',
                                cls: 'p-panel-phone-same-component-top'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        items: [
                            {
                                html: 'Time:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                itemId: 'timeLabel',
                                cls: 'p-panel-phone-same-component-top'
                            }
                        ]
                    },
                    {
                        layout: {
                            type:'hbox',
                            align:'center'
                        },
                        cls:'p-phone-border-field',
                        itemId: 'mapPanel',
                        listeners: {
                            initialize: function(panel){
                                panel.element.on('tap', function() {
                                    panel.fireEvent('gotomap');
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
                                html: 'Room:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                itemId: 'sessionRoomLabel',
                                cls: 'p-phone-eventdetail-contenttext'
                            },
                            {
                                cls:'p-phone-arrowgrayimage'
                            }
                        ]
                    },
                    {
                        html: 'About:',
                        cls: 'p-phone-eventdetail-titletext'
                    },
                    {
                       itemId: 'descriptionLabel',
                       scrollable :true,
					   height: window.innerHeight/6,
                       cls: 'p-panel-phone-same-component-top'
                    },
                    {
                        layout: {
                            type:'hbox',
                            align:'center'
                        },
                        itemId: 'materialsPanel',
                        listeners: {
                            initialize: function(panel){
                                panel.element.on('tap', function() {
                                    panel.fireEvent('gotomaterials');
                                });
                                panel.element.on('touchstart', function() {
                                    panel.addCls('p-panel-pressing');
                                });
                                panel.element.on('touchend', function() {
                                    panel.removeCls('p-panel-pressing');
                                });
                            }
                        },
                        cls:'p-phone-border-field',
                        items: [
                            {
                                html: 'Materials:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                itemId: 'sessionMaterialsLabel',
                                cls: 'p-phone-eventdetail-contenttext'
                            },
                            {
                                cls:'p-phone-arrowgrayimage'
                            }
                        ]
                    },
                    {
                        layout: {
                            type:'hbox',
                            align:'center'
                        },
                        itemId: 'presenterPanel',
                        listeners: {
                            initialize: function(panel){
                                panel.element.on('tap', function() {
                                    panel.fireEvent('gotopresenters');
                                });
                                panel.element.on('touchstart', function() {
                                    panel.addCls('p-panel-pressing');
                                });
                                panel.element.on('touchend', function() {
                                    panel.removeCls('p-panel-pressing');
                                });
                            }
                        },
                        cls:'p-phone-border-field',
                        items: [
                            {
                                html: 'Presenters:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                itemId: 'sessionPresentersLabel',
                                cls: 'p-phone-eventdetail-contenttext'
                            },
                            {
                                cls:'p-phone-arrowgrayimage'
                            }
                        ]
                    },
                    {
                        layout: {
                            type:'hbox',
                            align:'center'
                        },
                        cls:'p-phone-border-field',
                        itemId: 'notePanel',
                        listeners: {
                            initialize: function(panel){
                                panel.element.on('tap', function() {
                                    panel.fireEvent('gotonotes');
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
                                html: 'Notes:',
                                cls: 'p-phone-eventdetail-titletext'
                            },
                            {
                                itemId: 'sessionNotesLabel',
                                cls: 'p-phone-eventdetail-contenttext'
                            },
                            {
                                cls:'p-phone-arrowgrayimage'
                            }
                        ]
                    },
                    {
                        layout: {
                            type:'hbox',
                            align:'center'
                        },
                        cls:'p-phone-border-field',
                        itemId: 'ratePanel',
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
                        itemId: 'pnlActionButtons',
                        items:[
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-eventdetail-savetocalendar',
                                text: 'Add to My Schedule',
                                itemId: 'addToMySchedule',
                                hidden:true
                            },
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-eventdetail-savetocalendar',
                                text: 'Save to Calendar',
                                pressedCls: 'p-phone-button-blue-pressing',
                                itemId: 'addToCalendar',
                                hidden:true
                            },
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-eventdetail-savetocalendar',
                                text: 'Share',
                                pressedCls: 'p-phone-button-blue-pressing',
                                itemId: 'shareButton',
                                hidden:true
                            }
                        ]
                    }
                ]
            }
        ]
    },

    updateSessionRecords: function(sessionRecords) {
        this.getController().setSessionRecords(sessionRecords);
    }
});
