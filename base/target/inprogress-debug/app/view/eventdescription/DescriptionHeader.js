Ext.define('Personify.view.eventdescription.DescriptionHeader', {
    extend: 'Ext.Container',
    xtype: 'descriptionheadercontent',
    controller: 'Personify.controller.eventdescription.DescriptionHeader',
    requires: 'Personify.controller.eventdescription.DescriptionHeader',
    config:{
        layout: 'vbox',
        cls: 'p-simpleevent-header panel-left-not-gradient',
        items: [
            {
                layout: 'vbox',
                style: 'background: transparent;',
                items: [
                    {
                        cls: 'p-label-description-datetime',
                        itemId: 'timeLabel'
                    },
                    {
                        cls: 'p-label-description-location',
                        itemId: 'titleOfEvent'
                    },
                    {
                        itemId: 'locationFullAddress',
                        listeners: {
                            initialize: function(panel) {
                                panel.element.on('tap', function() {
                                    panel.fireEvent('onTapAddressList');
                                });
                            }
                        }
                    },
                    {
                        cls: 'p-label-location eventSessionDetailLocation',
                        itemId: 'location'
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
                                itemId: 'shareButton',
                                zIndex: 0
                            },
                            {
                                xtype: 'button',
                                text: '',
                                cls: 'p-share-calendar',
                                itemId: 'shareCalendar',
                                zIndex: 0
                            }
                        ]
                    }
                ]
            }
        ]
    },
    updateRecord: function(record){
        if(record){
            this.getController().setRecord(record);
        }
    }
});