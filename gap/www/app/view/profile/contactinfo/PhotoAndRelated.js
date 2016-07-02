Ext.define('Personify.view.profile.contactinfo.PhotoAndRelated', {
    extend: 'Ext.Panel',
    xtype: 'photoandrelated',
    controller: 'Personify.controller.profile.contactinfo.PhotoAndRelated',
    
    requires: [
        'Personify.controller.profile.contactinfo.PhotoAndRelated',
        'Personify.view.profile.contactinfo.NameAndTitle',
        'Personify.view.profile.contactinfo.Photo'
    ],
    
    config: {
        cls: 'p-panel-photoAndRelated',
        layout: 'vbox',
        items: [
            {
                layout: 'hbox',
                itemId: 'photoAndRelatedPanel',
                items: [
                    {
                        xtype: 'photo',
                        itemId: 'photoPanel',
                        cls: 'p-panel-profile-photo'
                    },
                    {
                        flex: 1,
                        xtype: 'nameandtitle',
                        itemId: 'nameAndTitlePanel',
                        cls: 'p-panel-nameandtitle'
                    }
                ]
            }
        ]
    },
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
})