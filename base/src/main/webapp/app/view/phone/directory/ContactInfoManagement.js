Ext.define('Personify.view.phone.directory.ContactInfoManagement', {
    extend: 'Ext.Panel',
    xtype: 'pcontactinfomanagement',
    controller: 'Personify.controller.phone.directory.ContactInfoManagement',
    
    requires: [
        'Personify.controller.phone.directory.ContactInfoManagement',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.directory.contactinfo.ContactInfo'
    ],
    
    config: {
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        selectedRecord: null,
        countryListStore: null,
        enableEditToolBox: true,
        canedit: null,
        layout: 'fit',
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'memberDetailToolbar',
                docked: 'top',
                title: 'Member Details'
            },
            {
                xtype: 'panel',
                cls: 'p-phone-panel-contactInfoManagememt',
                layout: 'vbox',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                items: [
                    {
                        margin: '0 10 50 10',
                        items: [
                            {
                                xtype: 'contactinfophone',
                                itemId: 'contactinfo',
                                margin: '5 0 0 0'
                            },
                            {
                                itemId: 'staffAddToMyAddressBook'
                            },
                            {
                                layout: 'vbox',
                                height: 80,
                                itemId: 'staffButtonsPanel',
                                hidden: true,
                                items: [
                                    {
                                        flex: 1,
                                        layout: 'hbox',
                                        style: 'margin-bottom: 10px',
                                        items: [
                                            {
                                                flex: 1,
                                                xtype: 'button',
                                                text: 'Participation History',
                                                cls: 'p-field-info p-phone-button-profileFunction',
                                                itemId: 'participationHistoryButton',
                                                style: 'margin-right: 5px'
                                            },
                                            {
                                                flex: 1,
                                                xtype: 'button',
                                                text: 'Purchase History',
                                                cls: 'p-field-info p-phone-button-profileFunction',
                                                itemId: 'purchaseHistoryButton',
                                                style: 'margin-left: 5px'
                                            }
                                        ]
                                    },
                                    {
                                        flex: 1,
                                        layout: 'hbox',
                                        style: 'margin-bottom: 10px',
                                        items: [
                                            {
                                                flex: 1,
                                                xtype: 'button',
                                                text: 'Relationship',
                                                cls: 'p-field-info p-phone-button-profileFunction',
                                                itemId: 'relationshipButton',
                                                style: 'margin-right: 5px'
                                            },
                                            {
                                                flex: 1,
                                                xtype: 'button',
                                                text: 'Contact Tracking',
                                                cls: 'p-field-info p-phone-button-profileFunction',
                                                itemId: 'contactTrackingButton',
                                                style: 'margin-left: 5px'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }

                ]
            }
        ]
    },
    
    updateEnableEditToolBox: function(newValue) {
        this.getController().updateEnableEditToolBox(newValue);
    },
    
    applyRecord: function(record) {
        //this.getController().setRecord(record);
    }
});

