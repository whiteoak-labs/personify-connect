Ext.define('Personify.view.event.complexevent.TwitterPanel', {
    extend: 'Ext.Panel',
    xtype: 'twitterpanel',
    controller: 'Personify.controller.event.complexevent.TwitterPanel',
    
    requires: [
        'Personify.controller.event.complexevent.TwitterPanel',
        'Personify.view.Twitter'
    ],
    config: {
        cls: 'twitterPanel',
        layout: 'vbox',
        scrollable: null,
        record: null,
        hashtag: null,
        type: null,
        items: [
            {
                xtype: 'label',
                itemId: 'twitterHashTagLabel',
                baseCls: 'p-header-twitter',
                cls: 'p-text-twitter'
            },
            {
                xtype: 'textfield',
                itemId: 'twitterTextField',
                cls: 'p-twitter-textfield',
                placeHolder: 'share'
            },
            {
                layout: 'vbox',
                itemId: 'twitterInputPanel',
                hidden: true,
                items: [
                    {
                        xtype: 'textareafield',
                        itemId: 'twitterInputField',
                        cls: 'p-twitter-inputfield'
                    },
                    {
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                itemId: 'countTwitter',
                                html: '0',
                                cls: 'p-count-twitter'
                            },
                            {
                                xtype: 'button',
                                text: 'Tweet',
                                cls: 'p-button-twitter',
                                itemId: 'tweetButton',
                                docked: 'right'
                            },
                            {
                                xtype: 'button',
                                itemId: 'cancelButton',
                                text: 'Cancel',
                                cls: 'p-button-twitter',
                                docked: 'right'
                            }
                        ]
                    }
                ]
            },
            {
                itemId: 'searchTwitter',
                flex: 6,
                xtype: 'twitter'
            },
            {
                flex: 6,
                itemId: 'requireLoginPanel',
                html: 'Please authorize this application to access your Twitter account from Profile.',
                cls: 'p-require-login-panel'
            }
        ]
    },

    updateRecord: function(newRecord) {
        var me = this,
            twitterPanel = me.down('#searchTwitter');
        
        if (newRecord) {
            var twitterHashTag = newRecord.get('twitterHashTag');
            
            if (twitterPanel) {
                me.setHashtag(twitterHashTag);
                twitterPanel.setTwitterHashTag(twitterHashTag);
                me.down('#twitterHashTagLabel').setHtml(twitterHashTag);
            }
        } else {
            if (twitterPanel) {
                twitterPanel.setTwitterHashTag('');
            }
        }
    },
    
    updateHashtag: function(hashtag) {
        this.down('#searchTwitter').setType(this.getType());
        this.down('#searchTwitter').setTwitterHashTag(hashtag);
        this.down('#twitterHashTagLabel').setHtml(hashtag);
    }
});
