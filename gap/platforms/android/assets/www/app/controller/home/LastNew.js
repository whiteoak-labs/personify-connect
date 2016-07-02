Ext.define('Personify.controller.home.LastNew',{
    extend: 'Personify.base.Controller',
    requires: [
       'Personify.view.News'
    ],
    inject: ['personify'],
    config: {
        personify: null
    },
    control: {
        lastNewsTitle: {
            tapTitle: 'onTapTitle'
        },
        lastNewsContent: true,

        viewMoreNews: {
            tap: 'onViewMoreNewsTap'
        }
    },
    init: function(){
        var me = this;
        me.onUpdateLastNews();
    },
    onViewMoreNewsTap: function() {
        this.getView().fireEvent('onViewMoreNewsTap');
    },
    
    onUpdateLastNews: function() {
        var me = this;

        Ext.callback(function() {
            var yahooRssStore = Ext.create('Personify.store.news.YahooRss');
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            var feedsStore = me.getPersonify().getAt(0).NewsStore.FeedsStore;
            var arrayStore = [];
            var tempStore = null;

            for (var i = 0; i < feedsStore.getCount(); i++) {
                tempStore = feedsStore.getAt(i);
                if (tempStore.get('visible')) {
                    if (tempStore.get('private')) {
                        if (currentUser.isLogged()) {
                            arrayStore.push(tempStore);
                            break;
                        }
                    } else {
                        arrayStore.push(tempStore);
                        break;
                    }
                }
            }

            var url = arrayStore[0].get('url');
            yahooRssStore.setFeedUrl(url);

            yahooRssStore.load({callback: function(records, operation, successs) {
                var itemStore =  Ext.create('Ext.data.Store', {
                    model: 'Personify.model.news.YahooRssItem'
                });

                if (records[0] != null) {
                    var description = records[0].get('description');
                    var innerText = Personify.utils.ItemUtil.removeImageHtmlContent(description);
                    records[0].set({'description': innerText});
                    itemStore.setData(records[0]);

                    if (me['getLastNewsContent'] && !me.getLastNewsContent().isDestroyed) {
                        me.getLastNewsContent().setStore(itemStore);
                        me.getLastNewsTitle().setStore(itemStore);
                    }
                }
            }});
        }, me, [], 1);
    },
    
    onTapTitle: function(record) {
        if (Ext.os.is.Android) {
            window.open(record.get('link'), '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            window.open(record.get('link'), '_blank', 'location=no,enableViewportScale=yes');
        }
    }
});
