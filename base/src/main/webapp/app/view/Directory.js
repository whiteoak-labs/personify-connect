Ext.define('Personify.view.Directory', {
    extend: 'Ext.Panel',
    xtype: 'directory',
    cls: 'directory',
    controller: 'Personify.controller.tablet.directory.Directory',
    requires: [
        'Personify.controller.tablet.directory.Directory',
        'Personify.view.profile.ContactInfoManagement',
        'Personify.view.directory.directorylist.DirectoryList',
        'Personify.view.directory.DirectoryManagement'
    ],


    config: {
        editmode: true,
        layout: 'hbox',
        cls: 'p-containerPanel',
        flex: 1,
        items: [
            {
                // directory
                flex: 1,
                layout: 'vbox',
                width: '100%',
                xtype: 'directoryManagement',
                cls: 'p-panel-directorylist panel-left',
                itemId: 'directoryManagementPanel'
            },
            {
                flex: 2,
                layout: 'vbox',
                cls: 'panel-right',
                items: [
                    {
                        flex: 1,
                        // contact info
                        itemId: 'contactContainer',
                        layout: 'vbox',
                        margin: '20 0 0 0',
                        width: '100%',
                        items: [
                            {
                                xtype: 'contactinfomanagement',
                                itemId: 'contactInfoManagementPanel',
                                layout: 'vbox',
                                flex: 1
                            }
                        ]
                    },
                    {
                        layout: 'vbox',
                        itemId: 'staffButtonsPanel',
                        width: '100%',
                        //docked: 'bottom',
                        style: 'height: 90px; margin-bottom:3px;padding:0px 20px 0px 10px',
                        items: [
                            {
                                flex: 1,
                                layout: 'hbox',
                                width: '100%',
                                style:'margin-bottom:10px;',
                                items: [
                                    {
                                        flex: 1,
                                        xtype: 'button',
                                        text: 'Contact Information',
                                        itemId: 'contactInformationStaffButton',
                                        cls: 'p-button-staffFunction',
                                        disabledCls:'p-button-directory-disabled'
                                    },
                                    {
                                        flex: 1,
                                        xtype: 'button',
                                        text: 'Purchase History',
                                        itemId: 'contactPurchaseHistoryStaffButton',
                                        cls: 'p-button-staffFunction',
                                        disabledCls:'p-button-directory-disabled'
                                    }
                                ]
                            },
                            {
                                flex: 1,
                                layout: 'hbox',
                                width: '100%',
                                items: [
                                    {
                                        flex: 1,
                                        xtype: 'button',
                                        text: 'Participation History',
                                        itemId: 'participationHistoryStaffButton',
                                        cls: 'p-button-staffFunction',
                                        disabledCls:'p-button-directory-disabled'
                                    },
                                    {
                                        flex: 1,
                                        xtype: 'button',
                                        text: 'Relationship',
                                        itemId: 'relationshipStaffButton',
                                        cls: 'p-button-staffFunction',
                                        disabledCls:'p-button-directory-disabled'
                                    },
                                    {
                                        flex: 1,
                                        xtype: 'button',
                                        text: 'Contact Tracking',
                                        itemId: 'contactListingStaffButton',
                                        cls: 'p-button-staffFunction',
                                        disabledCls:'p-button-directory-disabled'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }//end item
        ]//end items
    }, //end config
    
    initialize: function() {
        this.callParent(arguments);
        this.setMasked({xtype: 'loadmask'});
    }
});