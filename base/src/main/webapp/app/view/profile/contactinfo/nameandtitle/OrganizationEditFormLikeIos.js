Ext.define('Personify.view.profile.contactinfo.nameandtitle.OrganizationEditFormLikeIos', {
    extend: 'Ext.Panel',
    xtype: 'organizationeditformlikeios',
    controller: 'Personify.controller.profile.OrganizationEditFormLikeIos',
    requires: 'Personify.controller.profile.OrganizationEditFormLikeIos',

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'textfield',
                itemId: 'organizationTextField',
                name: 'organization',
                label: 'Organization',
                placeHolder: 'organization',
                required: true,
                autoCapitalize: true,
                clearIcon: true,
                cls: 'nameAndTitleEditText'
            }
        ]
    },
    
    updateRecord: function(newRecord) {
        this.getController().setRecord(newRecord);
    }
})