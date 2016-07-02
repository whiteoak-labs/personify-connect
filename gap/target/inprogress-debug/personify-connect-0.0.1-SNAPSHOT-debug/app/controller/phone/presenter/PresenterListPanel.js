Ext.define('Personify.controller.phone.presenter.PresenterListPanel',{
    extend: 'Personify.base.Controller',

    control: {
        searchFieldPresenterPhone: {
            onClearIconTap: 'onClearIconTapSearchFieldPresenterPhone',
            onTextChange: 'onTextChangeSearchFieldPresenterPhone'
        },
        presenterList: {
            itemtap: 'onItemPresenterTap'
        }
    },

    setStore: function(store){
        if(store && store != null) {
            store.setGrouper({
                groupFn: function(record) {
                    var name = record.get('lastName')? record.get('lastName'): record.get('name');
                    return name[0];
                }
            });
            store.setSorters({
                sorterFn: function(record1, record2) {
                    var firstName1 = record1.get('lastName')? record1.get('lastName'): record1.get('name');
                    var firstName2 = record2.get('lastName')? record2.get('lastName'): record2.get('name');
                    var fName1 = firstName1;
                    var fName2 = firstName2;
                    return fName1 > fName2 ? 1 : (fName1 == fName2 ? 0 : -1);
                }
            });
            store.setRemoteFilter(false);
            store.clearFilter();
            this.getPresenterList().setStore(store);
            this.updateLaytouPresenterList();
        }
    },

    onTextChangeSearchFieldPresenterPhone: function(newText) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Attendee Search');
        }

        var storePresenter = this.getPresenterList().getStore()

        if(storePresenter) {
            storePresenter.clearFilter();
            if(newText.trim() != '') {
                storePresenter.filter(function(record) {
                    didMatch = (record.get('name').trim().toLowerCase() + " "
                                + record.get('jobTitle').trim().toLowerCase() + " "
                               ).match(newText.trim().toLowerCase());

                    if(didMatch)
                        return record;
                });
            }
            this.updateLaytouPresenterList();
        }
    },

    onClearIconTapSearchFieldPresenterPhone: function() {
        this.getPresenterList().getStore().clearFilter();
        this.getPresenterList().deselectAll();
        this.updateLaytouPresenterList();
    },

    onItemPresenterTap: function (dataView, index, target, record, event, eOpts){
        this.getView().fireEvent('selectpresentersitem', record);
    },

    updateLaytouPresenterList: function() {
        var list = this.getPresenterList().getViewItems();
        for (var i = 0, length = list.length; i < length; i++) {
            if (i % 2 === 0) {
                list[i].addCls('presenterlistitemeven');
            } else {
                list[i].addCls('presenterlistitemodd');
            }
        }
    }
});