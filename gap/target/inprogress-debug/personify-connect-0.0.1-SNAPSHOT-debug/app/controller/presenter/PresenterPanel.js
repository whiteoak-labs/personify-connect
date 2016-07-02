Ext.define('Personify.controller.presenter.PresenterPanel',{
    extend: 'Personify.base.Controller',

    control: {
        presenterListPanel: {
            selectpresentersitem: 'onSelectPresenter'
        },
        presenterProfile: {
           closeinfopanel: 'onClosePresenterDetailsButton'
        }
    },

    init: function() {
        this.showListPresenter();
    },

    showListPresenter: function() {
        var presenterListPanel = this.getPresenterListPanel();
        var record = this.getView().getRecord();
        presenterListPanel.setRecord(record);
    },

    onSelectPresenter: function(record) {
        if(record) {
            var presenterDetailsPanel = this.getPresenterProfile();
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var storeName = storeManager.getCustomerBiographyStore();
            var store = Ext.create(storeName);
            store.setDataRequest(record);
            this.getView().setMasked({xtype:'loadmask'});
            var me = this;
            store.load({
                callback: function(records, operation, success) {
                    if (success) {
                        presenterDetailsPanel.setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoPresenter'));
                        presenterDetailsPanel.getController().getCloseContactPanel().show();

                        if (records.length > 0) {
                            presenterDetailsPanel.getController().setBioInfo(records[0]);
                        } else {
                            presenterDetailsPanel.getController().setBioInfo(null);
                        }

                        presenterDetailsPanel.getController().setPresenterRecord(record);
                        me.getView().setActiveItem(1);
                    } else {
                        Ext.Msg.alert('', 'This presenter has no information.', Ext.emptyFn);
                    }
                    me.getView().setMasked(false);
                },
                scope: this
            });
        }
    },

    onClosePresenterDetailsButton: function() {
        this.getView().setActiveItem(0);
        Ext.Viewport.setMasked(false);
    }
});
