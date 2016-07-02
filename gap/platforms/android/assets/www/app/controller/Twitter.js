Ext.define('Personify.controller.Twitter', {
    extend: 'Personify.base.Controller',
    inject: {
        currentUser: 'currentUser'
    },
    
    config: {
        currentUser: null,
        refreshInterval: null,
        actionTweet: null,
        itemsToLoad: 30,
        page: 1
    },
    control: {
        view: {
            itemtap:'onItemTap',
            reload: 'reLoad',
            itemtouchstart: 'onItemTouchStart',
            itemtouchend: 'onItemTouchEnd',
            scrollend: 'onScrollEnd'
        }
    },
    
    init: function() {
        var me = this;
        this.getView().setMasked({xtype: 'loadmask'});
        me.callParent(arguments);
        me.setRefreshInterval(setInterval(function() {
            me.onRefreshTwitter();
        }, Personify.utils.Configuration.getConfiguration().first().NewsStore.get('refreshInterval') * 1000));
    },

    onRefreshTwitter: function() {
        var me = this;
        var type = this.getView().getType();
        var config = this.getView().getConfigSearch();
        var twitterHashTag = this.getView().getTwitterHashTag();

        switch(type) {
            case 'timeline':
            default:
                this.reLoad(twitterHashTag);
                break;
            case 'search':
                me.onSearch(config);
        }
    },
    
    destroy: function() {
        clearInterval(this.getRefreshInterval());
        this.getView().setStore(null);
        return this.callParent(arguments);
    },
    
    onUserTimeLineSuccess: function(data) {
        if (!this['getView']) {
            return;
        }

        var me = this,
            thisView = me.getView();
        var twitterStore = Ext.create('Personify.store.UserTimelineTwitter', {
            data: data
        });
        thisView.setStore(twitterStore);
        thisView.refresh();
        thisView.setMasked(false);
    },
    
    onUserTimeFailure: function() {
        if (!this['getView']) {
            return;
        }

        this.getView().setMasked(false);
    },
    
    reLoad: function(twitterHashTag) {
        var  me =this;
        TMA.Twitter.userTimeline({ screen_name: twitterHashTag, count: me.getItemsToLoad(), success: me.onUserTimeLineSuccess, failure: me.onUserTimeFailure, scope: me });
    },

    onScrollEnd: function() {
        var  me = this;
        var type = this.getView().getType();

        if (type == 'timeline') {
            var twitterHashTag = this.getView().getTwitterHashTag();
            var page = this.getPage() + 1;
            this.setPage(page);
            this.getView().setMasked({ xtype: 'loadmask' });
            TMA.Twitter.userTimeline({ screen_name: twitterHashTag, count: me.getItemsToLoad(), page: page, success: me.onLoadMoreSuccess, failure: me.onUserTimeFailure, scope: me });
        }
    },

    onLoadMoreSuccess: function(data) {
        if (!this['getView']) {
            return;
        }

        var twitterStore = this.getView().getStore();
        twitterStore.add(data);
        this.getView().refresh();
        this.getView().setMasked(false);
    },

    onSearchMoreSuccess: function(data) {
        var twitterStore = this.getView().getStore();
        twitterStore.add(data.statuses);
        this.getView().refresh();
        this.getView().setMasked(false);
    },
    
    onItemTap: function(dataview, index, target, record, event) {
        var me = this,
            params,
            type = this.getView().getType();

        //favorite tap
        if (event.target.classList.contains('favorite-feature-twitter')) {
            params = {
               tweetId: record.get('id_str'),
               success: me.onSuccessFavorite,
               failure: me.onFailureFavorite,
               scope: target
            };
            TMA.Twitter.favorite(params);
        }
        
        /*
         * reply tap 
         */
        if (event.target.classList.contains('reply-feature-twitter-button')) {
            record.set('isReply', true);
            var inputText = target.query('.x-input-text')[0],
                hashTag = me.getView().getTwitterHashTag();

            if (type == 'timeline') {
                inputText.value = hashTag + " ";
                Personify.utils.ItemUtil.setCaretSelection(inputText, hashTag.length + 1, hashTag.length + 1);
            } else {
                var userName = record.get('user').screen_name;
                inputText.value = "@" + userName + " \n" + hashTag;
                Personify.utils.ItemUtil.setCaretSelection(inputText, userName.length + 2, userName.length + 2);
            }
            me.setActionTweet('reply');
        }

        /*
         * cancel-reply-twitter-button
         */
        if (event.target.classList.contains('cancel-reply-twitter-button')) {
            record.set('isReply', false);
            me.setActionTweet(null);
        }
        
        /*
         * reply twitter button
         */
        if (event.target.classList.contains('reply-twitter-button')) {
            var me = this;

            switch (me.getActionTweet()) {
                case 'reply':
                    var inputText = target.query('.x-input-text')[0],
                        params = {
                            tweet: inputText.value,
                            tweetId : record.get('id_str'),
                            author: TMA.Twitter.getUser().get('screen_name'),
                            success : me.onReplySuccess,
                            failure : me.onReplyError,
                            scope: me
                        };
                    TMA.Twitter.reply(params);
                    break;
                case 'retweet':
                    var params = {
                        tweetId: record.get('id_str'),
                        author: TMA.Twitter.getUser().get('screen_name'),
                        success : me.onTweetSuccess,
                        failure : me.onTweetError,
                        scope: me
                    };
                    TMA.Twitter.retweet(params);
                    break;
            }
            record.set('isReply', false);
            me.setActionTweet(null);

        }

        /*
         * retweet button
         */
        if (event.target.classList.contains('twitter-retweet')) {
            record.set('isReply', true);
            var inputText = target.query('.x-input-text')[0];
            inputText.value = record.get('text');
            inputText.disabled = true;
            this.setActionTweet('retweet');
        }
    },

    onItemTouchStart: function(dataview, index, target, record, e, eOpts) {
        if (e.target.className.indexOf('x-button') >= 0) {
            e.target.classList.add('x-button-pressing');
        } else if (e.target.parentNode && e.target.parentNode.className.indexOf('x-button-label') >= 0) {
            e.target.parentNode.parentNode.classList.add('x-button-pressing');
        }
    },

    onItemTouchEnd: function(dataview, index, target, record, e, eOpts) {
        if (e.target.className.indexOf('x-button') >= 0) {
            e.target.classList.remove('x-button-pressing');
        } else if (e.target.parentNode && e.target.parentNode.className.indexOf('x-button-label') >= 0) {
            e.target.parentNode.parentNode.classList.remove('x-button-pressing');
        }
    },
    
    onSuccessFavorite: function() {
        var target = this,
            el = target.down('.favorite-feature-twitter').dom;
            
            if(el) {
            	el.textContent = 'favorited';
                el.classList.remove('favorite-feature-twitter');
                el.classList.add('tweet-favorited');
            }
    },
    
    onFailureFavorite: function() {
    },
    
    onReplySuccess: function() {
        var me = this;
        var config = me.getView().getConfigSearch();
        var task = new Ext.util.DelayedTask(function() {
            me.onSearch(config);
        }, me);
        Ext.Msg.alert('', 'The tweet is successful.', Ext.emptyFn);
        task.delay(5000);
    },
    
    onReplyError: function() {
    },

    onTweetSuccess: function() {
        var me = this;
        var config = me.getView().getConfigSearch();
        var task = new Ext.util.DelayedTask(function() {
            me.onSearch(config);
        }, me);
        Ext.Msg.alert('', 'The tweet is successful.', Ext.emptyFn);
        task.delay(5000);
    },

    onTweetError: function() {

    },

    onSearch: function(config) {
        if (!TMA.Twitter.isAuthorized()) {
            return;
        }
        var me= this;
        TMA.Twitter.search({config: config, scope: me, success: me.onSuccessSearch, failure: me.onFailureSearch});
    },
    
    onSuccessSearch: function(data) {
        var me = this,
            thisView = me.getView();
        var twitterStore = Ext.create('Personify.store.UserTimelineTwitter');
        twitterStore.setData(data.statuses);
        thisView.setStore(twitterStore);
        thisView.refresh();
        thisView.setMasked(false);
    },

    onFailureSearch: function() {
        this.getView().setMasked(false);
    }
});
