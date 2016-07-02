Ext.define('Personify.controller.news.TwitterNewsPanel', {
    extend: 'Personify.base.Controller',
    
    control: {
        tweetButtonNews: {
            tap: 'onTweetButtonNewsTap'
        },
        textfieldTwitterNews: {
            keyup: 'onTextfieldTwitterNews'
        },
        twitter: true,
        labelSizeTweetNews: true
    },
    
    onTweetButtonNewsTap: function() {
        var me = this,
            params,
           textfieldTwitterNews = me.getTextfieldTwitterNews();
        if(TMA.Twitter.isAuthorized()) {
            if(textfieldTwitterNews.getValue().length > 0) {
                params = {
                    tweet: textfieldTwitterNews.getValue(),
                    success: me.onSucessTweet,
                    failure: me.onFailureTweet,
                    scope: me
                };
                TMA.Twitter.tweet(params);
            }
            else {
                Ext.Msg.alert('Twitter','Empty tweet',Ext.emptyFn);
            }
        }
        else {
            Ext.Msg.alert('Twitter','You have to login twitter',Ext.emptyFn);
        }
    },
    
    onTextfieldTwitterNews: function(textfield, e, operation) {
        var size = 140;
        
        if (textfield.getValue().length > size) {
            return false;
        }
        
        this.getLabelSizeTweetNews().setHtml(size - textfield.getValue().length);
    },
    
    onSucessTweet: function() {
        this.getTwitter().fireEvent('reload');
    }
});
