Ext.define('Personify.view.profile.contactinfo.NameAndTitleView',{
    extend: 'Ext.Container',
    controller: 'Personify.controller.profile.NameAndTitleView',
    requires: 'Personify.controller.profile.NameAndTitleView',
    xtype: 'nameandtitleview',
    
    config: {
       items: [
            {
                flex: 1,
                xtype: 'label',
                cls: 'displayName',
                itemId: 'displayName'
            },
            {
                flex: 2,
                xtype: 'label',
                cls: 'displayTitle',
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
