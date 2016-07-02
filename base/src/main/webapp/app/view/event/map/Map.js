Ext.define('Personify.view.event.map.Map', {
    extend: 'Ext.Panel',
    xtype: 'mapevent',
    controller: 'Personify.controller.event.map.Map',

    requires: [
        'Personify.controller.event.map.Map',
        'Personify.view.exhibitor.ExhibitorList',
        'Personify.view.event.complexevent.sessions.myschedule.MyScheduleList',
        'Personify.view.event.map.PinchZoomImage'
    ],

    config: {
        boothNosPresent: null,
        itemId: 'mapEventSchedule',
        meetingRecord: null,
        layout: 'hbox',
        items: [
            {
                flex: 1,
                layout: 'vbox',
                xtype: 'container',
                itemId: 'mapEvent',
                cls: 'mapEvent',
                items: [
                    {
                        itemId: 'mapSegmentedButton',
                        xtype: 'segmentedbutton',
                        layout: 'hbox'
                    },
                    {
                        itemId: 'mapPanel',
                        xtype: 'panel',
                        flex: 6,
                        layout: 'fit',
                        scrollable: null,
                        cls: 'panel-map-schema'
                    },
                    {
                         flex: 4,
                         layout: 'vbox',
                         itemId: 'mapAndAgendaPanel',
                         items: [
                            {
                                xtype: 'segmentedbutton',
                                itemId: 'tabMapEvent',
                                cls: 'segmented-button-container',
                                allowMultiple: false,
                                items: [
                                    {
                                        text: 'My Sessions',
                                        cls: 'event-schedule-tab',
                                        itemId: 'agendaMap',
                                        pressed: true
                                    },
                                    {
                                        text: 'My Exhibitors',
                                        cls: 'my-schedule-tab',
                                        itemId: 'agendaExhibitor'
                                    }
                                ]
                            },
                            {
                                cls:'map-content',
                                flex: 5,
                                layout: 'card',
                                itemId: 'agendaAndExhibitorCardLayout',
                                items: [
                                    {
                                        itemCls:'item-event-complex-list',
                                        itemId:'myAgenda',
                                        grouped: true,
                                        xtype: 'mysessionschedulelist'
                                    },
                                    {
                                        xtype: 'allExhibitorList',
                                        itemId: 'myExhibitor',
                                        hidden: true
                                    }
                                ]
                            }
                         ]
                    }
                ]
            }
        ]    
    },
    updateBoothNosPresent: function(boothNosPresent){
        this.setBoothNosPresent(boothNosPresent);
    },
    
    updateRecord: function(record){
        if(record && record != null){
            this.getController().setRecord(record);
        }
    }
});