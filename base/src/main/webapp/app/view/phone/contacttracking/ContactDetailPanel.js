Ext.define('Personify.view.phone.contacttracking.ContactDetailPanel', {
    extend: 'Ext.Container',
    xtype: 'contactdetailpanelphone',
    controller: 'Personify.controller.phone.contacttracking.ContactDetailPanel',
    
    requires: [
        'Personify.controller.phone.contacttracking.ContactDetailPanel',
        'Personify.view.phone.contacttracking.FollowUpTemplate'
    ],
    
    config: {
        currentContact: null,
        layout: 'vbox',
        cls: 'p-phone-directory-contact-tracking-detail-page',
        scrollable: {
             direction: 'vertical',
             directionLock: true
        },
        
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'contactTrackingDetailToolbar',
                docked: 'top',
                title: 'Tracking Detail'
            },
            {
                layout: 'vbox',
                width: '100%',
                itemId: 'contactDetailView',
                cls: 'p-phone-directory-contact-tracking-detail',
                items: [
                    {
                        xtype: 'panel',
                        items: [
                            {
                                itemId: 'callTypeCodeText', 
                                cls : 'p-phone-directory-contact-tracking-detail-email-inbound'
                            },
                            {
                                itemId: 'activityText',
                                cls : 'p-phone-directory-contact-tracking-detail-email-inbound-msg'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        items: [
                            {
                                itemId: 'contactedText',
                                cls: 'p-phone-directory-contact-tracking-detail-email-inbound-info'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        items: [
                            {
                                itemId: 'topicText',
                                cls: 'p-phone-directory-contact-tracking-detail-email-inbound-info'   
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        items: [
                            {
                                itemId: 'subjectText',
                                cls: 'p-phone-directory-contact-tracking-detail-email-inbound-info'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        items: [
                            {
                                itemId: 'ownerText',
                                cls: 'p-phone-directory-contact-tracking-detail-email-inbound-info'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        itemId: 'followUpRecordsHeader',
                        items: [
                            {
                                html: 'Follow-up Records', 
                                cls: 'p-phone-list-directory p-phone-directory-contact-tracking-detail-follow-up'
                            }
                        ]
                    }
                ]
            },
            {
                docked: 'bottom',
                xtype: 'button',
                text: 'Add Follow-up Records',
                itemId: 'addFollowUpButton',
                cls: 'p-phone-button-addtofollowup',
                pressedCls:'red-button-pressing-background'
            },
            {
                itemId: 'followUpList', 
                emptyText: 'No data',
                deferEmptyText: false,
                xtype: 'dataview',
                scrollable: null,
                store : null,
                itemCls: 'p-phone-directory-contact-tracking-detail-follow-up-detail',
                cls: 'p-phone-directory-contact-tracking-detail-follow-up-list',
                selectedCls: 'p-phone-directory-contact-tracking-detail-follow-up-detail-selected',
                pressedCls: 'p-phone-directory-contact-tracking-detail-follow-up-detail-pressed',
                itemTpl: null
            }
        ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.contacttracking.FollowUpTemplate');
        this.down("#followUpList").setItemTpl(new Ext.XTemplate(
            template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    },

    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});
