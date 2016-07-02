Ext.define('Personify.view.phone.contacttracking.FollowUpTemplate', {
    extend: 'Ext.Panel',
    xtype: 'followuptemplatephone',
    
    config: {
        layout: 'vbox',
        items: [
            {
                html: '{topicString}',
                cls: 'p-phone-directory-contact-tracking-detail-follow-up-list-items'
            }
        ]
    }
});
