Ext.define('Personify.view.profile.contactinfo.session.SessionItem', {
    extend: 'Ext.Container',
    xtype: 'listItemTemplate',
    cls: 'listItemTemplate',
    config: {
        layout: 'hbox',
        items: [
            
            {
                flex: 1,
                html: '<div class="p-label-valueText">{value}</div>'
            }
        ]
    }
});