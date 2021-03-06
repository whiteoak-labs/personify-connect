Ext.define('Personify.view.News', {
    extend: 'Ext.Container',
    xtype: 'newPage',
    
    requires: [
        'Personify.controller.News',
        'Personify.view.news.NewsFeedItem',
        'Personify.view.news.NewsPage',
        'Personify.view.Twitter',
        'Personify.view.news.SelectNewsFeed',
        'Personify.view.news.SelectNewsFeedPanel',
        'Personify.view.news.TwitterNewsPanel',
        'Personify.view.profile.twitterview.ConnectTwitter',
        'Personify.view.news.TwitterView',
        'Personify.view.event.complexevent.TwitterPanel',
        'Ext.tab.Panel'
    ],
    controller: 'Personify.controller.News',
    
    config: {
        layout:'hbox',
        flex: 1,
        items: [
            {
                xtype: 'panel',
                flex: 6,
                layout: 'vbox',
                cls: 'p-panel-component-left panel-left',
                items: [
                    {
                        xtype: 'label',
                        html: 'Current Story',
                        cls: 'p-label-title'
                    },
                    {
                        xtype: 'button',
                        itemId: 'shareNews',
                        cls: 'p-button-share-news',
                        text: 'Share'
                    },
                    {
                        layout: 'vbox',
                        flex: 1,
                        scrollable: {
                            direction: 'vertical',
                            directionLock: true
                        },
                        baseCls: 'contentPanelNews',
                        items: [
                            {
                                xtype: 'newspage',
                                itemId: 'contentPanelNewsTitle'
                            },
                            {
                                xtype: 'newspagecontent',
                                style: 'padding-top: 10px;',
                                itemId: 'contentPanelNews'
                            }
                        ]
                    }

                ]
            },
            {
                flex: 4,
                xtype: 'container',
                layout: 'card',
                items: [
                    {
                        styleHtmlContent: true,
                        xtype: 'tabpanel',
                        cls: 'tabpanelButtonNews right-panel',
                        items: [
                            {
                                flex: 1,
                                xtype: 'selectnewsfeedpanel',
                                title: 'News',
                                itemId: 'newsPanel',
                                iconCls: 'iconNewsTabPanel'
                            },
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
            }
        ]
    }, // end config
    
    initialize: function() {
        var me = this;
        var twitterHashTag = Personify.utils.Configuration.getConfiguration().first().NewsStore.get('twitterHashtag');
        if(twitterHashTag && twitterHashTag != '')
        {
           var initialCharacter = twitterHashTag.charAt(0);           
           if(initialCharacter != '@')
                me.down('#twitterNewsPanel').setType('search');
           else
                me.down('#twitterNewsPanel').setType('timeline');
        }
        this.down('#twitterNewsPanel').setHashtag(Personify.utils.Configuration.getConfiguration().first().NewsStore.get('twitterHashtag'));
    },

    refresh: function(user) {
        this.getController().refreshData(user);
    }
});
