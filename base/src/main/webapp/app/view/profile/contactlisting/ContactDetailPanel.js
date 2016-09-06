Ext.define('Personify.view.profile.contactlisting.ContactDetailPanel', {
    extend: 'Ext.Container',
    xtype: 'contactdetail',
    controller: 'Personify.controller.profile.ContactDetailPanel',
    requires: [
        'Personify.controller.profile.ContactDetailPanel',
        'Personify.view.profile.contactlisting.FollowUpTemplate'
    ],

    config: {
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        currentContact: null,
        layout: 'vbox',
        cls: 'inquiry-page panel-left', 
        right: 0,
        top: 50,
        zIndex: 9,
        modal: true,
        hideOnMaskTap: true,
        showAnimation: 'slideIn',
        scrollable: {
             direction: 'vertical',
             directionLock: true
        },
        
        items: [
            {
                cls: 'filterClosePanel',
                layout: 'hbox',
                docked: 'top',
                items: [
                    {
                        html: 'Tracking Detail',
                        itemId: 'detailPanelHeaderText',
                        cls: 'p-store-itemDetail-header'
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
                layout: 'vbox',
                width: '100%',
                itemId: 'contactDetailView',
                cls: 'p-panel-contactDetailView',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'p-panel-trackingInfo',
                        items: [
                            {
                                cls: 'p-text-callTypeCode',
                                itemId: 'callTypeCodeText'
                            },
                            {
                                cls: 'p-text-activity',
                                itemId: 'activityText'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        cls: 'p-panel-trackingInfo',
                        items: [
                            {
                                itemId: 'contactedText'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        cls: 'p-panel-trackingInfo',
                        items: [
                            {
                                itemId: 'topicText'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        cls: 'p-panel-trackingInfo',
                        items: [
                            {
                                itemId: 'subjectText'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        cls: 'p-panel-trackingInfo',
                        items: [
                            {
                                itemId: 'ownerText'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        itemId: 'followUpRecordsHeader',
                        cls: 'p-panel-followUp-header',
                        items: [
                            {
                                cls: 'p-text-followUp-header',
                                html: 'Follow-up Records'
                            }
                        ]
                    }
                ]
            },
            {
                layout: 'hbox',
                docked: 'bottom',
                margin: '20 0',
                items: [
                    {
                        flex: 1,
                        xtype: 'button',
                        text: 'Edit Tracking Detail',
                        itemId: 'editTrackingDetailButton',
                        cls: 'p-button-trackingDetail-action',
                        margin: '0 10 0 0'
                    },
                    {
                        flex: 1,
                        xtype: 'button',
                        text: 'Add Follow-up Records',
                        itemId: 'addFollowUpButton',
                        cls: 'p-button-trackingDetail-action'
                    }
                ]
            },
            {
                itemCls: 'p-listItem-followUpRecord',
                itemId: 'followUpList', 
                emptyText: 'No data',
                cls:'p-list-nodatacontactdetail',
                deferEmptyText: false,
                xtype: 'dataview',
                scrollable: null,
                store : null,
                itemTpl: null
            }
        ]
    },
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    },

    initialize: function() {
        var template = Ext.create('Personify.view.profile.contactlisting.FollowUpTemplate');
        this.down("#followUpList").setItemTpl(new Ext.XTemplate(
            template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
});
