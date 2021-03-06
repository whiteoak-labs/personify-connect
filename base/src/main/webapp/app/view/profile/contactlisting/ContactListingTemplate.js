Ext.define('Personify.view.profile.contactlisting.ContactListingTemplate', {
    extend: 'Ext.Panel',
    xtype: 'contactlistingtemplate',
    requires: [
        'Personify.utils.ItemUtil'
    ],
    
    config: {
        layout: 'vbox',
        width: '100%',
        items: [
            {
                html: '{activityText}',
                cls: 'p-text-contactTrackingText'
            },
            {
                html: '{[Personify.utils.ItemUtil.formatContactTrackingDate(values.activityDate)]}'
            }
        ]
    }
});
