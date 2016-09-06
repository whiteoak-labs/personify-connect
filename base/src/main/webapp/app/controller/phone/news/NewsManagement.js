Ext.define('Personify.controller.phone.news.NewsManagement', {
    extend: 'Personify.controller.News',
    inject: ['personify'],
    requires: [
         'Personify.view.phone.news.NewsItemTemplate',
         'Personify.view.phone.news.DetailNews',
         'Personify.model.personify.news.Feeds'
    ],

    config: {
        personify: null,
        isSelect: false,
        allNewsData: null
    },

    control: {
        newsToolbar: {
        },
        newsList: {
            newstitemtap: 'onNewstItemTap',
            select: 'onSelectNewsItem'
        },
        searchNewsPhone: {
            seachclearicontap : 'onClearicontapNews',
            onsearchtextchange : 'onSearchNews'
        },
        newsView: true
    },

    init: function() {
        this.getNewsToolbar().getController().setActionText('Twitter');
        this.callParent(arguments);
    },

    refreshData: function() {
        this.init();
    },

    onNewstItemTap: function(record, feedRecord) {
        this.getView().fireEvent('requestchangeview', 'Personify.view.phone.news.DetailNews', { newsRecord: record, feedRecord: feedRecord} );
    },

    onSelectNewsItem: function(list, record) {
        if (this.getIsSelect() && !record.get('expanded'))
            record.set('expanded', true);
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

    updateNewsStore: function(store) {
        this.updateViewData(store);
    },

    updateViewData: function(newsStore) {
        this.getNewsList().setStore(newsStore);
        this.setIsSelect(true);
        this.getNewsList().select(0);
        this.setIsSelect(false);
    },

    onItemTapListNews: function(list, index, target, record, e, eOpts, data) {
        this.setIsElement(true);
        this.getView().fireEvent('requestchangeview', 'Personify.view.phone.news.DetailNews', {record:record, feedRecord: list.getFeedRecord()});
    },

    onBack: function() {
        var me = this;
            thisView = me.getView();
        thisView.fireEvent('back',this);
    }
});
