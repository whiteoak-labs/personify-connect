Ext.define('Personify.controller.presenter.PresenterListPanel',{
    extend: 'Personify.base.Controller',

    control: {
        searchFieldPresenter: {
            seachclearicontap: 'onSearchClearIconTap',
            seachkeyup: 'onSearchKeyUp'
        },
        presenterList: {
            itemtap: 'onItemPresenterTap',
            itemtouchstart: 'onItemTouchStartPresenter',
            itemtouchend: 'onItemTouchEndPresenter'
        },
        btnClearFilter: {
            tap: 'onSearchClearIconTap'
        }
    },

    init: function() {
        this.getSearchFieldPresenter().getController().setPlaceHolder('Search Presenters');
    },

    setStore: function(store) {
        store.setGrouper({
            groupFn: function(record) {
                return record.get('lastName')[0];
            }
        });
        store.setSorters({
            sorterFn: function(record1, record2) {
                var firstName1 = record1.get('lastName');
                var firstName2 = record2.get('lastName');
                var fName1 = firstName1;
                var fName2 = firstName2;
                return fName1 > fName2 ? 1 : (fName1 == fName2 ? 0 : -1);
            }
        });
        store.setRemoteFilter(false);
        store.clearFilter();
        this.getPresenterList().setStore(store);
    },

    setRecord: function(record) {
        this.setStore(record.SpeakersListEvent);
    },

    onItemPresenterTap: function(dataView, index, target, record, event, eOpts) {
        this.getView().fireEvent('selectpresentersitem', record)
    },

    onItemTouchStartPresenter: function(dataview, index, target, record, e, eOpts) {
        target.addCls('x-item-pressed');
    },

    onItemTouchEndPresenter: function(dataview, index, target, record, e, eOpts) {
        target.removeCls('x-item-pressed');
    },

    onSearchKeyUp: function(value, keyCode) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Presenter Search');
        }

        var storePresenter = this.getPresenterList().getStore();

        if(storePresenter) {
            storePresenter.clearFilter();
            if(keyCode == 13 || keyCode == 10) {
                if(value.trim() != '' || value.trim() != null) {
                    this.getBtnClearFilter().setDisabled(false);
                    storePresenter.filter(function(record) {
                        didMatch = (record.get('name').trim().toLowerCase() + " "
                                + record.get('jobTitle').trim().toLowerCase() + " "
                               ).match(value.trim().toLowerCase());
    
                        if(didMatch)
                            return record;
                    });
                } else {
                    return;
                }
            } else {
                return;
            }
        }
    },

    onSearchClearIconTap: function() {
        this.getPresenterList().getStore().clearFilter();
        this.getBtnClearFilter().setDisabled(true);
        this.getSearchFieldPresenter().getController().clearSearchField();
        this.getPresenterList().deselectAll();
    }
});
