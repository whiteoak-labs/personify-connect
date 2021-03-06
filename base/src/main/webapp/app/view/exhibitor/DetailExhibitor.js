Ext.define('Personify.view.exhibitor.DetailExhibitor', {
    extend: 'Ext.Container',
    xtype: 'detailExhibitor',
    controller: 'Personify.controller.exhibitor.DetailExhibitor',

    requires: [
        'Personify.controller.exhibitor.DetailExhibitor',
        'Personify.view.exhibitor.DescExhibitorItem',
        'Personify.view.exhibitor.AboutExhibitorPanel',
        'Personify.view.exhibitor.ProductExhibitorItem',
        'Personify.view.exhibitor.ContactExhibitorItem'
    ],

    config: {
        layout: 'vbox',
        meetingRecord: null,
        items: [
            {
                xtype: 'panel',
                cls: 'descExhibitorItem panel-left-not-gradient',
                layout: 'hbox',
                items: [
                    {
                        flex: 4,
                        xtype: 'descExhibitorItem',
                        itemId: 'descExhibitorItem'
                    },
                    {
                        xtype: 'panel',
                        cls: 'panelExDesc',
                        width: '124px',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'button',
                                html: '',
                                cls: 'p-button-AddToSchedule',
                                itemId: 'inMySchedule',
                                style: 'margin: 7px 0px 0px;'
                            },
                            {
                                xtype: 'button',
                                text: 'Map It',
                                itemId: 'btnMapExhibitor',
                                cls: 'p-button-map',
                                style: 'margin: 7px 0px 0px;'
                            },
                            {
                                xtype: 'button',
                                text: 'Close',
                                itemId: 'backToExhibitorList',
                                cls: 'p-button-red-inlist',
                                style: 'width: 110px; margin-top: 10px; font-size: 13px'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                itemId: 'detailDescExhibitorItem',
                cls: 'detailDescExhibitorItem',
                flex: 8,
                layout: 'vbox',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        cls: 'segmentedButtonDetailEx',
                        pressedCls: 'segmentedButtonPressedDetailEx',
                        itemId: 'segmentedButtonDetail',
                        allowMultiple: false,
                        items: [
                            {
                                text: 'About',
                                baseCls: 'segmentButtonItemDetailEx',
                                itemId: 'segmentButtonDetailAboutEx',
                                pressed: true
                            },
                            {
                                text: 'Related Products',
                                baseCls: 'segmentButtonItemDetailEx',
                                itemId: 'segmentButtonDetailProductEx'
                            },
                            {
                                text: 'Contacts',
                                baseCls: 'segmentButtonItemDetailEx',
                                itemId: 'segmentButtonDetailContactEx'
                            },
                            {
                                text: 'Notes',
                                baseCls: 'segmentButtonItemDetailEx',
                                itemId: 'segmentButtonDetailNoteEx'
                            }
                        ] // end items segmentedButtonDetailEx
                    },
                    {
                        xtype: 'panel',
                        itemId:'panelContDetailDescExhibitorItem',
                        cls: 'panelContDetailDescExhibitorItem',
                        layout: 'vbox',
                        flex: 1,
                        scrollable: null,
                        items: [
                            {
                                xtype: 'aboutExhibitorPanel',
                                cls: 'productExhibitorItem',
                                itemId: 'aboutExhibitorPanel'
                            }
                        ]
                    }
                ] // end items of detailDescExhibitorItem
            }
        ]
    },
    
    updateRecord: function(record){
        if(record && record != null){
            this.getController().setRecord(record);
        }
    }
});