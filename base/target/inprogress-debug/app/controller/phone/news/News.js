Ext.define('Personify.controller.phone.news.News', {
    extend: 'Personify.base.Controller',
    requires: [
        'Personify.view.phone.news.NewsManagement',
        'Personify.view.phone.twitter.Twitter'
    ],
    
    control: {
        newsMainPanel: {
            requestchangeview: 'onRequestChangeView'
        },
        newsNavigationView: {
        },
        newsManagementPanel: {
            live: true,
            listeners: {
                back: 'onBack'
            }
        },
        newsToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onChangeParentView'
        }
    },
    
    onRequestChangeView:function(view, config) {
        this.openView(view,config);
    },

    onLoadData: function() {
    },
    
    openView: function(view, config, title, css) {
        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }
        view.addListener('back', this.onBackNews, this);
        view.addListener('requestchangeview', this.onRequestChangeView, this);
        
        if (config && config.record) {
            var listeners = config.record.get('listeners');
            
            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }
        
        var newsNavigationView = this.getNewsNavigationView();
        if (newsNavigationView.getActiveItem().xtype != view.xtype) {
            newsNavigationView.push(view);
        }
    },
    
    onBack: function() {
        var me = this;
            thisView = me.getView();
        thisView.fireEvent('back',this);
    },
    
    onBackNews: function() {
        this.getNewsNavigationView().pop();
    },

    onChangeParentView: function() {
        this.getView().fireEvent('requestchangeview', 'Personify.view.phone.twitter.Twitter', null);
    }
});
