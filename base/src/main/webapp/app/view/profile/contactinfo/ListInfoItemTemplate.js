Ext.define('Personify.view.profile.contactinfo.ListInfoItemTemplate', {
    extend: 'Ext.Container',
    xtype: 'listItemTemplate',
    cls: 'listItemTemplate',

    config: {
        layout: 'hbox',
        flex: 1,
        items: [
            {
                html: '{[this.hasType(values.typeDesc)]}',
                cls: 'type',
                flex:2
            },
            {
                html: '{value}',
                flex: 6,
                cls: 'p-label-contactinfovalueText'
            },
            {
                flex: 1,
                cls: 'p-div-profile-address-main',
                html: '{[this.isPrimaryString(values.primary)]}'
            }
        ]
    }
});