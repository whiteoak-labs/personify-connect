Ext.define('Personify.view.profile.contactlisting.FollowUpTemplate', {
    extend: 'Ext.Panel',
    xtype: 'followuptemplate',
    
    config: {
        layout: 'vbox',
        items: [
            {
                html: '{topicString}',
                cls: 'p-text-topicString'
            }
        ]
    }
});
