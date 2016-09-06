Ext.define('Personify.controller.exhibitor.ExhibitorPanel', {
    extend: 'Personify.base.Controller',

    control: {
        /*btnClearFilter: {
            tap: 'onClearicontapEx'
        },*/
        searchFieldExhibitor: {
            seachclearicontap: 'onClearicontapEx',
            onsearchtextchange: 'onSearchExhibitorItem'
        },
        exhibitorList: {
            tapAllExhibitorItem: 'ontapAllExhibitorItem',
            onTapBtnDelProductAllExhibitor: 'onTapBtnDelProductAllExhibitor'//,
          // scrollend: 'onNextButtonTap'
        }
    },

    init: function() {
        this.getSearchFieldExhibitor().getController().setPlaceHolder('Search Exhibitors or Booth Number');
    },

    setExhibitorStore: function(store) {
        if (store) {
            var storeFilters = store.getFilters();

            if (storeFilters.length > 0) {
                store.clearFilter();
            }

            var defaultFilter = this.getView().getDefaultFilter();

            if (defaultFilter) {
                store.filter([defaultFilter]);
            }
        }

        this.getExhibitorList().setStore(store);
    },
/*
    onSearchExhibitorItem1: function(valueFieldSearch) {
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Exhibitor Search');
        }

        var storeExhibitor = this.getExhibitorList().getStore();
        var filter = [];
        var defaultFilter = this.getView().getDefaultFilter();

        if (defaultFilter) {
            filter.push(defaultFilter);
        }
        var textFilter = function(record) {
            didMatch = (record.get('name').trim().toLowerCase() + " "
                + record.get('boothNos').trim().toLowerCase() + " "
                ).match(valueFieldSearch.trim().toLowerCase());

            if (didMatch)
                return record;
        };
        filter.push(textFilter);

        if (storeExhibitor) {
            storeExhibitor.clearFilter();
            if(valueFieldSearch.trim() != '' || valueFieldSearch.trim() != null) {
                this.getBtnClearFilter().setDisabled(false);
                storeExhibitor.filter(filter);
            }
        }
    },

    onClearicontapEx1: function() {
        this.getExhibitorList().getStore().clearFilter();
        var defaultFilter = this.getView().getDefaultFilter();
        if (defaultFilter) {
            this.getExhibitorList().getStore().filter([defaultFilter]);
        }
        this.getBtnClearFilter().setDisabled(true);
        this.getSearchFieldExhibitor().getController().clearSearchField();
        this.getExhibitorList().deselectAll();
    },
*/
    ontapAllExhibitorItem: function(me, index, target, record, e, eOpts) {
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Exhibitor Detail');
        }
        this.getView().getParent().fireEvent('onexhibitortap', record);
    },

    onTapBtnDelProductAllExhibitor: function(record) {
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if(currentUser && currentUser.isLogged()) {
            var store = this.getExhibitorList().getStore(),
                exhibitorId = record.get('recordId') || null,
                customerId = currentUser.get('masterCustomerId') || null,
                subCustomerId = currentUser.get('subCustomerId') || null,
                productId = me.getView().getRecord().get('productID') || null;           
           
            if(!record.get('isAdded')) {
                Personify.utils.Sqlite.insertTableExhibitor(exhibitorId, productId, customerId, subCustomerId, function(success) {
                    if(success) {
                        record.set('isAdded', true);
                                                            
                                                            
                        for (var i = 0; i < store.getCount(); i++) {
                            if (store.getAt(i) != null){
                                var recordEx =store.getAt(i);
                                                            
                                if (exhibitorId == recordEx.get('recordId')) {
                                    if (!recordEx.get('isAdded')) {
                                        recordEx.set('isAdded', true);
                                    }
                                                            
                                                            
                                }
                            }
                        }
                                                            
                        Ext.Msg.alert('', 'Exhibitor has been added to your exhibitors.', Ext.emptyFn);                         
                        me.getView().fireEvent('updateAddMyScheduleButton', record);
                    } else {
                        Ext.Msg.alert('', 'Add Exhibitor Failed.', Ext.emptyFn);
                    }
                });
            } else {
                Personify.utils.Sqlite.deleteMyExhibitor(exhibitorId, productId, customerId, subCustomerId, function(success) {
                    if(success) {
                        record.set('isAdded', false);
                                                         
                        for (var i = 0; i < store.getCount(); i++) {
                            if (store.getAt(i) != null){
                                var recordEx =store.getAt(i);
                                            
                                if (exhibitorId == recordEx.get('recordId')) {
                                    if (recordEx.get('isAdded')) {
                                        recordEx.set('isAdded', false);
                                    }
                                                        
                                }
                            }
                        }
                        Ext.Msg.alert('', 'Exhibitor has been removed.', Ext.emptyFn);
                        me.getView().fireEvent('updateAddMyScheduleButton', record);
                    } else {
                        Ext.Msg.alert('', 'Delete Exhibitor Failed.', Ext.emptyFn);
                    }
                });
            }
        } else {
            Personify.utils.ItemUtil.needToLogin();
        }
    },
    onNextButtonTap: function (dataView, index, target, record, event, eOpts) {
        this.getView().fireEvent('nextbuttontap', record);
    },
    onSearchExhibitorItem: function(value, keyCode) {
        if(navigator.onLine && window.plugins.app47) {
           window.plugins.app47.sendGenericEvent('Exhibitor Search');
        }
        this.getView().fireEvent('onsearchexhibitoritem',value);
    },
    onClearicontapEx: function() {
        this.getView().fireEvent('onclearicontapex');
    }
});
