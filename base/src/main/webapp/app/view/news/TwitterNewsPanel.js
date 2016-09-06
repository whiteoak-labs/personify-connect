Ext.define('Personify.view.news.TwitterNewsPanel', {
    extend: 'Ext.Panel',
    xtype: 'twitternewspanel',
    controller: 'Personify.controller.news.TwitterNewsPanel',
    requires: [
        'Personify.controller.news.TwitterNewsPanel',
        'Personify.view.Twitter'
    ],
    
    config: {
        cls: 'twitternewspanel',
        width: '100%',
        layout: 'vbox',
        items: [
            {
                xtype: 'textareafield',
                itemId: 'textfieldTwitterNews'
                //maxLength: 140
            },
            {
                xtype: 'panel',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'label',
                        html: 'Character left',
                        style: 'color: white;margin: 5px;'
                    },
                    {
                        xtype: 'label',
                        style: 'color: #090;margin: 5px;',
                        html: '140',
                        itemId: 'labelSizeTweetNews'
                    },
                    {
                        itemId:'tweetButtonNews',
                        xtype: 'button',
                        cls: 'tweetButtonNews',
                        text: 'Tweet'
                    }
                ]
            },
            {
                //itemId:'twitterTimeline',
                xtype: 'twitter',
                type: 'timeline',
                flex:10
            }
        ]
    }
});
