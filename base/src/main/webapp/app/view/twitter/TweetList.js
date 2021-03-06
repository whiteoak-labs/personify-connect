Ext.define('Personify.view.twitter.TweetList',{
    extend:'Ext.Container',
    config: {
        items: [
            {
                xtype: 'container',
                html: '<div class="div_content_twitter"><div class="screen_name-twitter subdiv_content_twitter">{user.screen_name}&nbsp</div><div class="content-twitter subdiv_content_twitter"> {text}</div></div>'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                {
                    flex: 1,
                    xtype: 'label',
                    cls: 'subdiv_feature_twitter time-tweet-twitter',
                    html: '{created_at}'
                },
                {
                    flex: 1,
                    xtype: 'label',
                    cls: 'subdiv_feature_twitter',
                    html: '<div class="reply-feature-twitter">reply<div>'
                },
                {
                    flex: 1,
                    xtype: 'label',
                    html: '<tpl if="favorited==true"><div class="tweet-favorited subdiv_feature_twitter">favorited</div></tpl><tpl if="favorited==false"><div class="favorite-feature-twitter subdiv_feature_twitter">favorite</div></tpl>'
                },
                {
                    flex: 1,
                    xtype: 'label',
                    cls: 'subdiv_feature_twitter',
                    html: '<tpl if="this.checkScreenName(user.screen_name)">retweet</tpl>'
                }
                ]
            },
            {
            	itemId: 'replyContainer',
                xtype: 'container',
                layout: 'hbox',
                cls: 'hidden-twitter reply-container',
                items: [
                    {
                        xtype: 'textareafield',
                        maxLength: 140,
                        cls: 'textareafield-reply'
                    },
                    {
                        xtype: 'container',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'cancel-reply-twitter-button',
                                align: 'right'
                            },
                            {
                                xtype: 'button',
                                text: '<div class="div-reply-twitter-button">reply</div>',
                                cls: 'reply-twitter-button'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});