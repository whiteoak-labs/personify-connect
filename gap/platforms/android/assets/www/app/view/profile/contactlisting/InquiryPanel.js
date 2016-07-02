Ext.define('Personify.view.profile.contactlisting.InquiryPanel', {
    extend: 'Ext.Container',
    xtype: 'inquirypanel',
    controller: 'Personify.controller.profile.InquiryPanel',
    requires: 'Personify.controller.profile.InquiryPanel',

    config: {
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        trackingDetailRecord: null,
        parentActivityId: null,
        cls: 'inquiry-page panel-left',
        right: 0,
        top: 50,
        zIndex: 9,
        modal: true,
        layout: 'fit',
        flex: 1,
        hideOnMaskTap: true,
        showAnimation: 'slideIn',
        scrollable: {
             direction: 'vertical',
             directionLock: true
        },
        
        items: [
            {
                cls: 'filterClosePanel addNewContactTrackingPanel',
                layout: 'hbox',
                //docked: 'top',
                items: [
                    {
                        html: 'Add New Contact Tracking',
                        itemId: 'addNewPanelHeaderText',
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
                xtype: 'formpanel',
                scrollable: null,
                cls: 'form-inquiry-panel',
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'topicSelectField',
                        label: 'Select Topic',
                        cls: 'p-textbox-inquiryInfo',
                        labelWidth: '40%'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'subjectSelectField',
                        label: 'Select Subject',
                        cls: 'p-textbox-inquiryInfo',
                        labelWidth: '40%'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'assignToSelectField',
                        label: 'Assign To',
                        cls: 'p-textbox-inquiryInfo',
                        labelWidth: '40%'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'callTypeSelectField',
                        label: 'Select Call Type',
                        cls: 'p-textbox-inquiryInfo',
                        labelWidth: '40%'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Activity text',
                        itemId: 'activityText',
                        cls: 'p-textbox-inquiryInfo',
                        labelWidth: '40%'
                    },
                    {
                        xtype: 'button',
                        text: 'Create',
                        itemId: 'buttonSubmit',
                        cls: 'p-submit-inquiry'
                    }
                ]
            }
        ]
    },
    
    updateTrackingDetailRecord: function(record) {
        if(record) {
            this.getController().setTrackingDetailToEdit(record);
        }
    }
});
