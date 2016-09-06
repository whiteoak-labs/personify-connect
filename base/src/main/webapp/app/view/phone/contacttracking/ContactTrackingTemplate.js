Ext.define('Personify.view.phone.contacttracking.ContactTrackingTemplate', {
    extend: 'Ext.Panel',
    xtype: 'contacttrackingtemplatephone',
    requires: [
        'Personify.utils.ItemUtil'
    ],
    
    config: {
        layout: 'vbox',
        items: [
            {
                html: '{activityText}',
                cls: 'p-phone-directory-list-summary-text'        
            },
            {
                html: '{[Personify.utils.ItemUtil.formatContactTrackingDate(values.activityDate)]}'
            }
        ]
    }
});
