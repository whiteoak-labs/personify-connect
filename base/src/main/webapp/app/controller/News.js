Ext.define('Personify.controller.News', {
    extend : 'Personify.base.Controller',

    requires : [
        'Personify.model.news.YahooRssItem',
        'Personify.model.personify.news.Feeds'
    ],

    inject : ['personify'],

    config : {
        yahooRss : null,
        personify : null,
        rssStore : null,
        isSelected : false,
        isElement : false,
        flagSelected : null,
        record: null,
        newsStore: null,
        isSelect: false,
        allNewsData: null
    },

    control : {
        searchfieldNews : {
            seachclearicontap : 'onClearicontapNews',
            onsearchtextchange : 'onSearchNews'
        },

        contentPanelNews : {
        },

        contentPanelNewsTitle: {
            tapTitle : 'onTapTitle'
        },
        twitterNewsPanel : true,

        shareNews: {
            tap: 'onTapShareNews'
        },
        newsList: {
            newstitemtap: 'onNewstItemTap',
            select: 'onSelectNewsItem'
        }
    },

    init : function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        if (navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('News');
        }

        var me = this;
        var arrayURL = [];
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        Ext.callback(function() {
            var newsUrlStore = me.getPersonify().getAt(0).NewsStore.FeedsStore;

            for (var i = 0; i < newsUrlStore.getAllCount(); i++) {
                var newsUrlItem = newsUrlStore.getAt(i);

                if (newsUrlItem.get('visible')) {
                    if (newsUrlItem.get('private')) {
                        if (currentUser.isLogged()) {
                            arrayURL.push({ 'name': newsUrlItem.get('title'), 'url': newsUrlItem.get('url') });
                        }
                    } else {
                        arrayURL.push({ 'name': newsUrlItem.get('title'), 'url': newsUrlItem.get('url') });
                    }
                }
            }

            me.loadAllNewsStore(arrayURL);
        }, me, [], 1);
    },

    loadAllNewsStore: function(arrayURL) {
        var me = this;
        me.getView().setMasked({ xtype: 'loadmask' });
        Deft.Promise.all(me.getAllNewsPromise(arrayURL)).then({
            success: function(allData) {
                me.setAllNewsData(allData);
                me.parseNewsData(allData);
            },
            failure: function() {

            }
        }).always(function() {
            me.getView().setMasked(false);
        });
    },

    parseNewsData: function(allData) {
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var newsStore = Ext.create(storeManager.getNewStore());
        var newsModelName = modelManager.getNewsModel();

        for (var i = 0, length = allData.length; i < length; i++) {
            var arrayFeeds = [];
            var itemIndex = 1;
            allData[i].store.each(function(item) {
                //item.set('itemIndex', itemIndex);
                arrayFeeds.push(item);
                itemIndex++;
            });
            var newsModel = Ext.create(newsModelName, {
                name: allData[i].name,
                expanded: false,
                news: arrayFeeds
            });
            newsStore.add(newsModel);
        }
        me.setNewsStore(newsStore);
    },

    getAllNewsPromise: function(arrayUrl) {
        var me = this;
        var arrayPromise = [];

        for (var i = 0; i < arrayUrl.length; i++) {
            var promise = function(url, name) {
                var deferred = Ext.create('Deft.promise.Deferred');
                me.loadNewsStore(url, name, deferred);
                return deferred.promise;
            };
            arrayPromise.push(promise(arrayUrl[i].url, arrayUrl[i].name));
        }

        return arrayPromise;
    },

    loadNewsStore: function(url, name, deferred) {
        if (url) {
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var feedStore = Ext.create(storeManager.getYahooRssStore());
            feedStore.setFeedUrl(url);
            feedStore.load({callback: function(records, operation, success) {
                if (success) {
                    deferred.resolve({ 'name': name, 'store': feedStore });
                } else {
                    deferred.reject();
                }
            }});
        }
    },

    onNewstItemTap: function(record) {
        var tempStore = Ext.create('Ext.data.Store', {
            model : 'Personify.model.news.YahooRssItem'
        });

        if (record != null) {
            this.setRecord(record);
            tempStore.setData(record);
            this.getContentPanelNews().setStore(tempStore);
            this.getContentPanelNewsTitle().setStore(tempStore);
        }
    },

    onSelectNewsItem: function(list, record) {
        if (this.getIsSelect() && !record.get('expanded'))
            record.set('expanded', true);
    },

    onDeselectNewsFeedItem: function(list, record) {
        if (this.getIsSelect() && record.get('expanded'))
            record.set('expanded', false);
    },

    updateNewsStore: function(store) {
        this.updateViewData(store);
    },

    updateViewData: function(newsStore) {
        var firstRecord = null;
        this.getNewsList().setStore(newsStore);
        this.setIsSelect(true);
        this.getNewsList().select(0);

        if (newsStore.getAt(0)) {
            firstRecord = newsStore.getAt(0).get('news')[0];
            if (firstRecord)
                this.onNewstItemTap(firstRecord);
        }
        this.setIsSelect(false);
    },

    onKeyUpSearchFieldNews : function(valueFieldSearch, keyUp) {
        this.onSearchfieldNews(valueFieldSearch);
    },

    onSearchNews : function(value) {
        this.onSearchfieldNews(value);
    },

    onSearchfieldNews : function(value) {
        var temp = value.toLowerCase();
        var allData = this.getAllNewsData();

        if (!value || value == '') {
            for (var i = 0; i < allData.length; i++) {
                var feedStore = allData[i].store;
                feedStore.clearFilter();
            }
            this.parseNewsData(allData);
        } else {
            for (var i = 0; i < allData.length; i++) {
                var feedStore = allData[i].store;
                feedStore.clearFilter();
                feedStore.filterBy(function(record) {
                    if (record.get('title').toLowerCase().indexOf(temp) > -1) {
                        return record;
                    }
                });
            }
            this.parseNewsData(allData);
            this.setIsSelect(true);
            this.getNewsList().selectAll();
            this.setIsSelect(false);
        }
    },

    onClearicontapNews : function() {
        this.onSearchfieldNews('');
    },

    onSelectNewsFeedItem : function(dataview, record, eOpts) {
        this.setContentNewsPanel(record);
        this.setRecord(record);
    },

    setContentNewsPanel : function(record) {
        var tempStore = Ext.create('Ext.data.Store', {
            model : 'Personify.model.news.YahooRssItem'
        });

        if (record != null) {
            tempStore.setData(record);
            this.getContentPanelNews().setStore(tempStore);
            this.getContentPanelNewsTitle().setStore(tempStore);
        }
    },

    onTweetButtonNewsTap : function() {
        var me = this, params, textfieldTwitterNews = me.getTextfieldTwitterNews();

        if (TMA.Twitter.isAuthorized()) {
            if (textfieldTwitterNews.getValue().length > 0) {
                params = {
                    tweet : textfieldTwitterNews.getValue(),
                    success : me.onSucessTweet,
                    failure : me.onFailureTweet,
                    scope : me
                }
                TMA.Twitter.tweet(params)
            } else {
                Ext.Msg.alert('Twitter', 'Empty tweet', Ext.emptyFn);
            }
        } else {
            Ext.Msg.alert('Twitter', 'You have to login twitter', Ext.emptyFn);
        }
    },

    onSucessTweet : function(data) {
        var me = this;
        me.getTwitterTimeline().addNewTweet(data);
    },

    onFailureTweet : function() {
    },

    onTapTitle : function(record) {
           var ref = null;
        if (Ext.os.is.Android) {
            ref = window.open(record.get('link'), '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            ref = window.open(record.get('link'), '_blank', 'location=yes,enableViewportScale=yes');
        }
           Personify.utils.BackHandler.pushActionAndTarget('close', ref);
           ref.addEventListener('exit', function() {
                Personify.utils.BackHandler.popActionAndTarget('close', ref);
            });
    },

    refreshData: function() {
    },

    onTapShareNews: function() {
        var me = this;
        if (window.plugins.social && window.plugins.social['available']) {
            window.plugins.social.available(function(result) {
                if (result == 1) {
                    var body = '';
                    var url = '';
                    var data = me.getRecord();
                    if (data) {
                        body = data.get('title') + " " + data.get('description');
                        url = data.get('link');
                    }
                    window.plugins.social.share(body, url, '');
                } else {
                    Ext.Msg.alert('', 'Social network plugins is not supported.', Ext.emptyFn);
                }
            });
        }
    }
});
