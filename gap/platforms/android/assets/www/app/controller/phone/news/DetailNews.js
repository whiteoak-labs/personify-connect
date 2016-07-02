Ext.define('Personify.controller.phone.news.DetailNews', {
    extend: 'Personify.base.Controller',
    
    control: {
        contentPanelNews: true,
        detailPanel: {
            
        },
        /*showImage: {
            tap: 'onShowImage'
        },*/
        newsToolbar: {
            onNavigationButtonTap: 'onBack'
        }
    },
    
    config: {
      //store for save temp data
        tempStore: true
    },
    
    init: function() {
        this.getNewsToolbar().getController().setHiddenActionButton(true);
        var tempStore = Ext.create('Ext.data.Store', {
            model: 'Personify.model.news.YahooRssItem'
        });
        var newsRecord = this.getView().getNewsRecord();

        if (newsRecord != null) {
            tempStore.setData(newsRecord);
        }

        this.getContentPanelNews().setStore(tempStore);
        this.getDetailPanel().getController().setRecord(newsRecord);
        this.getDetailPanel().getController().setFeedRecord(this.getView().getFeedRecord());
    },
    
    onShowImage: function() {
        var store = this.getContentPanelNews().getStore();
        var description = store.getAt(0).get('description');
        var innerText = Personify.utils.ItemUtil.removeImageHtmlContent(description);
        store.getAt(0).set({'description': innerText});
        store.sync();
        this.getContentPanelNews().setStore(store);
    },
    
    onBack: function() {
        var me = this;
            thisView = me.getView();
        thisView.fireEvent('back',this);
    }
});
