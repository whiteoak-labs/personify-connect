Ext.define('Personify.view.phone.directory.contactinfo.ContactInfoEditForm', {
    extend: 'Ext.Panel',
    xtype: 'pcontactinfoeditform',
    controller: 'Personify.controller.phone.directory.contactinfo.ContactInfoEditForm',
    
    requires: [
        'Personify.controller.phone.directory.contactinfo.ContactInfoEditForm',
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
        style: 'background-color: white',
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'memberDetailToolbar',
                docked: 'top',
                title: 'Member Detail'
            },
            {
                xtype: 'panel',
                cls: 'p-phone-panel-contactInfoManagememt',
                layout: 'vbox',
                flex: 1,
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                items: [
                    {
                        margin: '0 10 50 10',
                        xtype: 'contactinfophone',
                        itemId: 'contactinfo'
                    }
                ]
            }
        ]
    }
    
});

