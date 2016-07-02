Ext.define('Personify.view.phone.twitter.TwitterManagement', {
    extend: 'Ext.Container',
    xtype: 'twittermanagement',
    controller: 'Personify.controller.phone.twitter.TwitterManagement',
    requires: [
        'Personify.controller.phone.twitter.TwitterManagement'
    ],

    config: {
        layout: 'vbox',
        itemId: 'twitterManagementPanel',
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'twitterToolbar',
                title: 'Twitter'
            },
            {
                itemId: 'twitterView',
                layout: 'vbox',
                flex: 1,
                items: [
                    {
                        flex: 1,
                        xtype: 'twitterpanel',
                        title: 'Twitter',
                        itemId: 'twitterNewsPanel',
                        iconCls: 'iconTwetterNews',
                        type: 'timeline'
                    }
                ]
            }
        ]
    },

    initialize: function() {
        this.down('#twitterNewsPanel').setHashtag(Personify.utils.Configuration.getConfiguration().first().NewsStore.get('twitterHashtag'));
    }
});
