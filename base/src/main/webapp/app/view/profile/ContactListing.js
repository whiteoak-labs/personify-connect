Ext.define('Personify.view.profile.ContactListing', {
    xtype: 'contactlisting',
    extend: 'Ext.Container',
    controller: 'Personify.controller.profile.ContactListing',
    
    requires: [
        'Personify.controller.profile.ContactListing',
        'Personify.view.profile.contactlisting.ContactListingTemplate',
        'Personify.view.profile.contactlisting.InquiryPanel',
        'Personify.view.profile.contactlisting.ContactDetailPanel'
    ],
    
    config: {
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        layout: 'vbox',
        flex: 1,
        cls: 'panel-right',
        items: [
            {
                xtype: 'button',
                text: 'New Contact',
                itemId: 'newContactInquiry',
                cls: 'p-new-contact-inquiry'
            },
            {
                xtype: 'label',
                cls:'profile-list-header sub-profile-list-title',
                html: 'Contact Tracking'
            },
            {
                flex: 1,
                layout: 'fit',
                scrollable: null,
                items: [
                    {
                        itemCls: 'p-list-items-contaclisting',
                        style:'background-color:transparent;',
                        itemId: 'contactList',
                        emptyText: 'No data',
                        deferEmptyText: false,
                        xtype: 'dataview',
                        pressedCls : "about-directoryitem-pressed",
                        selectedCls: "about-directoryitem-pressed",
                        scrollable: true,
                        itemTpl: null,
                        flex: 1,
                        scrollToTopOnRefresh: false
                    }
                ]
            }
        ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.profile.contactlisting.ContactListingTemplate');
        this.down("#contactList").setItemTpl(new Ext.XTemplate(
            template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
});
