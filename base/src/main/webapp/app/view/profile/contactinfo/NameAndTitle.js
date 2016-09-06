Ext.define('Personify.view.profile.contactinfo.NameAndTitle', {
    extend: 'Ext.Panel',
    xtype: 'nameandtitle',
    controller: 'Personify.controller.profile.NameAndTitle',
    requires: [
        'Personify.controller.profile.NameAndTitle',
        'Personify.view.profile.contactinfo.nameandtitle.NameAndTitleEditFormLikeIos'
    ],
    config: {
        recordEntry: null,
        recordOrganization: null,
        recordName: null,
        editmode: false,
        layout: 'vbox',
        cls: 'contact-info-item--main-container',
        items: [
        ]
    },//end config
    initialize: function() {
        this.callParent(arguments);
        this.setActiveItem(0);
    },
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
})