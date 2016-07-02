Ext.define('Personify.view.Exhibitor', {
    extend: 'Ext.Panel',
    xtype: 'exhibitor',
    controller: 'Personify.controller.Exhibitor',

    requires: [
        'Personify.controller.Exhibitor',
        'Personify.view.exhibitor.ExhibitorPanel'
    ],

    config: {
        cls: 'panelExhibitor',
        meetingRecord: null,
        layout: 'vbox',
        items: [
            {
                xtype: 'segmentedbutton',
                cls: 'segmented-button-container',
                itemId: 'segmentedbutton',
                allowMultiple: false,
                items: [
                    {
                        text: 'All Exhibitors',
                        cls: 'event-schedule-tab',
                        itemId: 'segmentButtonAllExhibitor',
                        pressed: true
                    },
                    {
                        text: 'My Exhibitors',
                        cls: 'my-schedule-tab',
                        itemId: 'segmentButtonMyExhibitor'
                    }
                ] // end items segmentedButtonExhibitor
            },
            {
                layout: 'card',
                itemId: 'panelExhibitorList',
                flex: 1,
                items: [
                    {
                        flex: 1,
                        xtype: 'exhibitorPanel',
                        itemId: 'allExhibitorList'
                    },
                    {
                        flex: 1,
                        xtype: 'exhibitorPanel',
                        itemId: 'myExhibitorList',
                        defaultFilter: {
                            filterFn: function(record) {
                                if (record.get('isAdded')) {
                                    return record;
                                }
                            }
                        }
                    }
                ]
            }
        ] // end items of panelExhibitor
    }, // end config
    
    updateRecord: function(record){
        if(record && record != null){
            this.getController().setRecord(record);
        }
    }
});