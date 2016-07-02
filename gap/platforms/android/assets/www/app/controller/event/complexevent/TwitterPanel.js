Ext.define('Personify.controller.event.complexevent.TwitterPanel', {
    extend: 'Personify.base.Controller',

    control: {
        twitterTextField: {
            focus: 'onOpenTwitterInputPanel'
        },
        twitterInputPanel: {

        },
        twitterInputField: {
            keyup: 'onInputTwitter',
            clearicontap: 'onInputTwitter'
        },
        tweetButton: {
            tap: 'onTweet'
        },
        cancelButton: {
            tap: 'onCancelPanel'
        },
        searchTwitter: {},
        countTwitter: {},
        requireLoginPanel: {}
    },

    config: {
        maxLength: 140
    },

    init: function() {
            
        if (TMA.Twitter.isAuthorized()) {
            this.getSearchTwitter().setHidden(false);
            this.getTwitterTextField().setHidden(false);
            this.getRequireLoginPanel().setHidden(true);
        } else {
            this.getRequireLoginPanel().setHidden(false);
            this.getSearchTwitter().setHidden(true);
            this.getTwitterTextField().setHidden(true);
        }
        this.getTwitterInputField().setMaxLength(this.getMaxLength());
    },

    onOpenTwitterInputPanel: function() {
        var hasTag = this.getView().getHashtag();
        this.getTwitterTextField().hide();
        this.getTwitterInputPanel().show();
        this.getTwitterInputField().setValue(hasTag);
        this.getTwitterInputField().focus();
        this.setCountText();
    },

    onInputTwitter: function(field, e, eOpts) {
        this.setCountText();
    },

    onTweet: function() {
        if (TMA.Twitter.isAuthorized()) {
            var me = this;
            var content = this.getTwitterInputField().getValue();
            if (content.length > 0) {
                var params = {
                    tweet: content,
                    author: TMA.Twitter.getUser().get('screen_name'),
                    success : me.onTweetSuccess,
                    failure : me.onTweetError,
                    scope: me
                };
                TMA.Twitter.tweet(params);
            }
        } else {
            Ext.Msg.alert('Twitter', 'Please login twitter before create new tweet.', Ext.emptyFn);
        }
        this.onCloseInputForm();
    },

    onTweetSuccess: function() {
        Ext.Msg.alert('', 'The tweet is successful.', Ext.emptyFn);
    },

    onTweetError: function() {

    },

    setCountText: function() {
        var count = this.getTwitterInputField().getValue().length;
        var remain = this.getMaxLength() - count;
        this.getCountTwitter().setHtml(remain);
        if (count == 0) {
            this.getTweetButton().setDisabled(true);
        } else {
            this.getTweetButton().setDisabled(false);
        }
    },

    onCloseInputForm: function() {
        this.getTwitterTextField().show();
        this.getTwitterInputPanel().hide();
    },

    onCancelPanel: function() {
        this.getTwitterTextField().show();
        this.getTwitterInputPanel().hide();
    }
});
