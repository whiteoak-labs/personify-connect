Ext.define('Personify.view.phone.contacttracking.InquiryPanel', {
    extend: 'Ext.Container',
    xtype: 'inquirypanelphone',
    controller: 'Personify.controller.phone.contacttracking.InquiryPanel',
    
    requires: [
        'Personify.controller.phone.contacttracking.InquiryPanel',
        'Personify.view.phone.common.Toolbar'
    ],
    
    config: {
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        trackingDetailRecord: null,
        parentActivityId: null,
        layout: 'vbox',
        style: 'background-color: white',
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'inquiryPanelToolbar',
                docked: 'top',
                title: 'New Contact Tracking'
            },
            {
                xtype: 'formpanel',
                scrollable: null,
                cls: 'p-phone-directory-new-contact-tracking-form-page',
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'topicSelectField',
                        label: 'Select Topic',
                        cls: 'p-phone-directory-new-contact-tracking',
                        labelWidth: '40%'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'subjectSelectField',
                        label: 'Select Subject',
                        cls: 'p-phone-directory-new-contact-tracking',
                        labelWidth: '40%'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'assignToSelectField',
                        label: 'Assign To',
                        cls: 'p-phone-directory-new-contact-tracking',
                        labelWidth: '40%'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'callTypeSelectField',
                        label: 'Select Call Type',
                        cls: 'p-phone-directory-new-contact-tracking',
                        labelWidth: '40%'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Activity text',
                        itemId: 'activityText',
                        cls: 'p-phone-directory-new-contact-tracking',
                        labelWidth: '40%'
                    }
                ]
            }
        ]
    }
});
