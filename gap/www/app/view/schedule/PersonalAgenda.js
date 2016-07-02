Ext.define('Personify.view.schedule.PersonalAgenda', {
    extend: 'Ext.Container',
    xtype: 'personalagenda',
    controller : 'Personify.controller.schedule.PersonalAgenda',
    requires : 'Personify.controller.schedule.PersonalAgenda',
    config: {
        cls: 'p-panel-addOrFilterPanel panel-left',
        xtype: 'panel',
        modal: true,
        hideOnMaskTap: true,
        right: 0,
        height: '90%',
        layout: 'vbox',
        scrollable: true,
        showAnimation: {
            type: 'slide'
        },
        items: [
            {
                layout: 'hbox',
                cls: 'filterClosePanel',
                docked: 'top',
                items: [
                    {
                        html: 'Personal Event',
                        itemId: 'titlePersonalAgenda'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        cls: 'p-close-button',
                        text: 'X',
                        listeners: {
                            tap: function() {
                                this.parent.parent.destroy();
                            }
                        }
                    }
                ]
            },//closePanel
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
                                itemId: 'eventDay',
                                cls:'p-eventDay-personal'
                            },
                            {
                                cls: 'eventMonth',
                                itemId: 'eventMonth'
                            },
                            {
                                cls: 'eventStatus' ,
                                itemId: 'eventType',
                                docked:'bottom'
                            }
                        ]
                    },
                    {
                        cls:'eventItemContent',
                        layout: 'hbox',
                        items: [
                            {
                                width: '100%',
                                layout: 'vbox',
                                items: [
                                    {
                                        itemId: 'timeDisplay'
                                    },
                                    {
                                        cls:'eventSummary',
                                        itemId: 'eventName'
                                    },
                                    {
                                        layout: 'hbox',
                                        docked: 'bottom',
                                        cls:'locationEvent',
                                        items:[
                                            {
                                                itemId: 'location',
                                                cls: 'eventDetailLocation'
                                            },
                                            {
                                                docked: 'right',
                                                xtype:'button',
                                                width: 90,
                                                baseCls: 'p-button-red-inlist',
                                                itemId: 'removeAgendaButton',
                                                text: 'Remove'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                itemId: 'eventDescription'
            }
        ]
    },//config
    
    hide: function() {
        this.destroy();
    }
});