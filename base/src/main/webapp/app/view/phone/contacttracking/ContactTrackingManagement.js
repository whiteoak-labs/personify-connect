Ext.define('Personify.view.phone.contacttracking.ContactTrackingManagement', {
    xtype: 'contacttrackingphone',
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.contacttracking.ContactTrackingManagement',

    requires: [
        'Personify.controller.phone.contacttracking.ContactTrackingManagement',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.contacttracking.ContactTrackingTemplate',
        'Personify.view.profile.contactlisting.InquiryPanel',
        'Personify.view.profile.contactlisting.ContactDetailPanel',
        'Personify.view.phone.common.Paging'
    ],
    
    config: {
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        layout: 'vbox',
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'contactTrackingToolbar',
                docked: 'top',
                title: 'Contact Tracking'
            },
            {
                flex: 1,
                layout: 'fit',
                cls:'p-phone-directory-contact-tracking-detail-page',
                scrollable: null,
                items: [
                    {
                        xtype: 'dataview',
                        itemId: 'contactList',
                        emptyText: 'No data',
                        deferEmptyText: false,
                        scrollable: true,
                        store : null,
                        itemCls: 'p-phone-contacktraking-item',
                        cls: 'p-phone-directory-purchase-history-nodata',
                        selectedCls: 'p-purchasehistoryphone-item-selected',
                        pressedCls: 'p-purchasehistoryphone-item-pressed',
                        itemTpl: null,
                        flex: 1,
                        scrollToTopOnRefresh: false
                    }
                ]
            }
        ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.contacttracking.ContactTrackingTemplate');

        this.down("#contactList").setItemTpl(new Ext.XTemplate(
            template.element.dom.innerHTML));

        this.callParent(arguments);
        template.destroy();
    }
});
