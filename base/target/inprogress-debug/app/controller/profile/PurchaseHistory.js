Ext.define('Personify.controller.profile.PurchaseHistory', {
    extend: 'Personify.base.Controller',
    
    control : {
        purchaseHistoryList: {
            scrollend: 'onNextButtonTap'
        }
    },
    
    config: {
        params: null,
        currentContact: null,
        totalPurchaseHistoryResult: 0
    },

    init: function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Profile Purchase History');
        }

        var params = {
            MasterCustomerId: "",
            SubCustomerId: "",
            StartIndex: 1,
            ItemsPerPage: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'),
            Subsystem: 'ALL'
        };
        this.setParams(params);
    },
    
    loadContactData: function(record) {
        this.setCurrentContact(record);
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = Ext.create(storeManager.getPurchaseHistoryStore());
        
        var params = me.getParams();
        params['MasterCustomerId'] = record.get('masterCustomerId');
        params['SubCustomerId'] = record.get('subCustomerId');
        
        store.setDataRequest(me.getParams());
        if(store.getHaveData() == false) {
            store.on (
                {
                    beforeload: function() {
                        me.getView().setMasked({
                            xtype: 'loadmask',
                            message: 'Loading',
                            indicator: true,
                            centered: true,
                            fullscreen: true
                        });
                    },//beforeload
                    
                    load: function() {
                        if (store.getHaveData() == true) {
                            me.getView().setMasked(false);

                            if (!me.getView().isDestroyed) {
                                var currentStore = me.getPurchaseHistoryList().getStore();

                                if (currentStore) {
                                    store.getPurchaseListStore().each(function(purchaseRecord) {
                                        currentStore.add(purchaseRecord);
                                    });
                                    me.getPurchaseHistoryList().setStore(currentStore);
                                } else {
                                    me.getPurchaseHistoryList().setStore(store.getPurchaseListStore());
                                    currentStore = store.getPurchaseListStore();
                                }

                                if (store.getAt(0)) {
                                    var totalResult = store.getAt(0).get('totalResults');
                                    me.setTotalPurchaseHistoryResult(totalResult);
                                }
                            }
                        }
                    }//load
                }//on
            );
        }
        store.load();
        return store;
    },
    
    onPrevioustButtonTap: function() {
        var currentContact = this.getCurrentContact();
        if(currentContact) {
            this.getParams()['StartIndex'] = this.getParams()['StartIndex'] - (Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'));
            this.loadContactData(currentContact);
        }
    },
    
    onNextButtonTap: function() {
        var currentContact = this.getCurrentContact();
        var currentTotalItem = 0;
        var purchaseHistoryStore = this.getPurchaseHistoryList().getStore();

        if (purchaseHistoryStore) {
            currentTotalItem = purchaseHistoryStore.getCount();
        }

        if (currentContact && currentTotalItem < this.getTotalPurchaseHistoryResult()) {
            this.getParams()['StartIndex'] = this.getParams()['StartIndex'] + (Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'));
            this.loadContactData(currentContact);
        }
    },
    
    setLoadedStore: function(store) {
        this.getPurchaseHistoryList().setStore(store.getPurchaseListStore());
        this.getPurchaseHistoryPagingPanel().getController().setPagingNavigationPanel(store.getAt(0).get('startIndex'), store.getAt(0).get('totalResults'), Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'));
        this.getPurchaseHistoryPagingPanel().setHidden(store.getPurchaseListStore().getCount() == 0);
    }
});
