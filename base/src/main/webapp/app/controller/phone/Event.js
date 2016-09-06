Ext.define('Personify.controller.phone.Event', {
    extend: 'Personify.base.Controller',

    control: {
        eventNavigationView: true,
        eventPanelPhone: {
            live:true,
            listeners: {
                requestchangeview: 'onRequestChangeView',
                requestopendetail: 'openView',
                backtomain: 'onBackToMain'
            }
        }
    },

    onLoadData: function() {
        this.getEventPanelPhone().getController().onGetData();
    },

    openView: function(view, config) {
        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }
        view.addListener('back', this.onBack, this);
        view.addListener('backtomain', this.onBackToMain, this);
        view.addListener('requestchangeview', this.onRequestChangeView, this);
        view.addListener('requestopendetail', this.openView, this);
        view.addListener('removeagenda', this.onRemoveAgenda, this);
        view.addListener('addagenda', this.onAddAgenda, this);
        view.addListener('refreshagenda', this.onRefreshAgenda, this);
        view.addListener('updatecurrentuser', this.onUpdateCurrentUser, this);

        if (config) {
            var listeners = config.record.get('listeners');

            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }

        var eventNavigationView = this.getEventNavigationView();
        if (eventNavigationView.getActiveItem().xtype != view.xtype) {
            eventNavigationView.push(view);
        }
    },

    onRequestChangeView: function(view, config) {
        this.getView().fireEvent('requestchangeview', view, config);
    },

    onBack: function() {
        var me = this,
            eventNavigationView = me.getEventNavigationView();
        eventNavigationView.pop();

        if (eventNavigationView.getActiveItem().getController()['onRefreshData']) {
            eventNavigationView.getActiveItem().getController().onRefreshData(function(){});
        }

        if (!eventNavigationView.getActiveItem().getController()['getExpandEvent']) {
            return;
        }

        var eventPanelViewController =  eventNavigationView.getActiveItem().getController(),
            itemExpanded = eventPanelViewController.getExpandEvent(),
            eventRecord = eventPanelViewController.getEventRecord(),
            index = 0;

        eventPanelViewController.setFlagSelected(false);
        eventPanelViewController.setItemSelected(false);

        if (itemExpanded != null) {
            for (var item in eventRecord) {
                if (index === itemExpanded) {
                    Ext.Viewport.setMasked({xtype: 'loadmask',  message: 'Loading...'});

                    setTimeout(function() {
                        if (Ext.get(eventPanelViewController.getSelectEventItem().getViewItems()[index].id.trim()).down('.p-filter-button-new')) {
                            eventPanelViewController.getSelectEventItem().select(eventRecord[item]);
                        }

                        Ext.Viewport.setMasked(false);
                    }, 100);
                    break;
                }
                index++;
            }
        }

        /////eventPanelViewController.checkAndCompileFilter();
    },

    onBackToEvent: function() {
        var me = this,
            eventNavigationView = me.getEventNavigationView(),
            itemNumber = eventNavigationView.getInnerItems().length;

        if (itemNumber > 1) {
            eventNavigationView.popToRoot();
        }
    },

    onBackToMain: function(){
        this.getView().fireEvent('backtomain');
    },

    onRemoveAgenda: function(record, callback){
        this.getView().fireEvent('removeagenda', record, callback);
    },

    onAddAgenda: function(record, eventId, callback){
        this.getView().fireEvent('addagenda', record, eventId, callback);
    },

    onRefreshAgenda: function(record, isAdd, callback){
        this.getView().fireEvent('refreshagenda', callback);
    },

    onUpdateCurrentUser: function(user, callback) {
        var me = this;
        this.getView().fireEvent('updatecurrentuser', user, function(){
            var eventPanelPhone = me.getEventPanelPhone();
            if(eventPanelPhone){
                eventPanelPhone.getController().onUpdateEventList();
            }
            var currentView = me.getEventNavigationView().getActiveItem();
            if (currentView.xtype == "eventDetailPhone") {
                currentView.refresh(callback);
            }else{
                callback(true);
            }
        });
    }
});
