Ext.define('Personify.view.phone.directory.contactinfo.nameandtitle.NameAndTitleView',{
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.NameAndTitleView',
    requires: 'Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.NameAndTitleView',
    xtype: 'nameandtitleviewphone',
    
    config: {
       items: [
            {
                flex: 1,
                xtype: 'label',
                cls: 'p-text-name',
                itemId: 'displayName'
            },
            {
                flex: 2,
                xtype: 'label',
                cls: 'p-text-jobTitle',
                itemId: 'jobTitle'
            }
        ]
    },
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});
