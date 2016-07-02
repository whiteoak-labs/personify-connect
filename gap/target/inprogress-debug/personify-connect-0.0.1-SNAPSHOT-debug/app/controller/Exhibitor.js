Ext.define('Personify.controller.Exhibitor', {
    extend: 'Personify.base.Controller',

    control: {
        segmentedbutton: true,
        segmentButtonAllExhibitor: {
            tap: 'onTapSegBtnAllEx'
        },
        segmentButtonMyExhibitor: {
            tap: 'onTapSegBtnMyEx'
        },
        panelExhibitorList: {
            onexhibitortap: 'ontapAllExhibitorItem'
        },
        allExhibitorList: {
            updateExhibitorStore: 'updateExhibitorStore',
            updateAddMyScheduleButton: 'updateAddMyScheduleButton'
        },
        myExhibitorList: {
            updateExhibitorStore: 'updateExhibitorStore'
        }
    },

    config: {
        exhibitorStore: null
    },

    init: function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Exhibitor List');
        }
    },

    setRecord: function(record) {
        var me = this;
        var view = this.getView();

        if (view && !view.isDestroyed) {
            this.getAllExhibitorList().setRecord(record);
            this.getMyExhibitorList().setRecord(record);
            this.getView().setRecord(record);

            if (record) {
                if (record.ExhibitorStore) {
                    this.setExhibitorStore(record.ExhibitorStore);
                    this.getAllExhibitorFromSql(record, function(exhibitorStore) {
                          me.setExhibitorData(exhibitorStore);
                    });
                } else {
                    this.onGetData(record);
                }
            }
        }
    },

    setExhibitorData: function(exhibitorStore) {
        this.getAllExhibitorList().setStore(exhibitorStore);

        var storeManager = Personify.utils.ServiceManager.getStoreManager(),
            storeExhibitorName = storeManager.getExhibitorStore(),
            myExhibitorStore = Ext.create(storeExhibitorName);

        exhibitorStore.each(function(record) {
            myExhibitorStore.add(record);
        });

        this.getMyExhibitorList().setStore(myExhibitorStore);
    },

    onGetData: function(record) {
        var me = this,
            attributesExhibitorStore = {
                "ItemsPerPage": "10",
                "XbtID": record.get('xbtProductID'),
                "XbtParentProduct": record.get('xbtParentProduct'),
                "StartIndex": "0",
                "XbtProductCode": record.get('xbtProductCode')
            },
            storeManager = Personify.utils.ServiceManager.getStoreManager(),
            storeExhibitorName = storeManager.getExhibitorStore(),
            storeAllExhibitor = Ext.create(storeExhibitorName);

        storeAllExhibitor.setDataRequest(attributesExhibitorStore);

        storeAllExhibitor.load({
            callback: function(records, operation, success) {
                me.setExhibitorData(storeAllExhibitor);
            },
            scope: me
        });
    },

    onTapSegBtnAllEx: function() {
        var card = this.getPanelExhibitorList(),
            item = this.getAllExhibitorList();
        card.setActiveItem(item);
    },

    onTapSegBtnMyEx: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser(),
            card = this.getPanelExhibitorList(),
            item = this.getMyExhibitorList();

        if (currentUser && currentUser.isLogged()) {
            card.setActiveItem(item);
        } else {
            var allitemsg = this.getSegmentButtonAllExhibitor(),
                segmentedbutton = this.getSegmentedbutton();
            segmentedbutton.setPressedButtons(allitemsg);
            Personify.utils.ItemUtil.needToLogin();
        }
    },

    getAllExhibitorFromSql: function(record, callback) {
        var currentUser = Personify.utils.Configuration.getCurrentUser(),
            storeAllExhibitor = this.getExhibitorStore();

        if (currentUser && currentUser.isLogged()) {
            var productId = record.get('productID') || null,
                customerId = currentUser.get('masterCustomerId'),
                subCustomerId = currentUser.get('subCustomerId');
            Personify.utils.Sqlite.getMyExhibitor(productId, customerId, subCustomerId, function(result) {
                if(typeof result == 'object' && result.length > 0) {
                    storeAllExhibitor.each(function(recordEx) {
                        for(var i = 0; i < result.length; i++) {
                            if(result[i].exhibitorId == recordEx.get('recordId')) {
                                recordEx.set('isAdded', true);
                            }
                        }
                    });
                }

                if (typeof callback == 'function') {
                    callback(storeAllExhibitor);
                }
            });
        } else {
            if (typeof callback == 'function') {
                callback(storeAllExhibitor);
            }
        }
    },

    ontapAllExhibitorItem: function(record) {
        this.getView().fireEvent('onexhibitortap', record);
    },

    updateExhibitorStore: function(){
        var record = this.getView().getRecord();
        this.getAllExhibitorFromSql(record);
    },

    onTapInMySchedule: function(record) {
        this.getAllExhibitorList().getController().onTapBtnDelProductAllExhibitor(record);
    },

    updateAddMyScheduleButton: function(record) {
        this.getView().fireEvent('updateAddMyScheduleButton', record);
    }
});
