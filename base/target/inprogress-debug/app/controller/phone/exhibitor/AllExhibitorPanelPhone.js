Ext.define('Personify.controller.phone.exhibitor.AllExhibitorPanelPhone', {
    extend: 'Personify.base.Controller',

    control: {
        allExhibitorTitleBar: true,
        searchFieldAllExhibitorPanelPhone: {
            onClearIconTap: 'onClearIconTapAllExhibitorPanelPhone',
            onTextChange: 'onTextChangeAllExhibitorPanelPhone'
        },
        btnOpenMyExhibitorsList: {
            tap: 'onTapBtnOpenMyExhibitorsList'
        },
        allExhibitorListPhone: {
            itemtap: 'onTapAllExhibitorListPhoneItem'
        }
    },

    setRecord: function(record) {
        if (record) {
            var storeAllExhibitor = record.ExhibitorStore;
            this.getAllExhibitorTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(record.get('shortName'), 48));
            if (storeAllExhibitor) {
                storeAllExhibitor.clearFilter();
                this.getAllExhibitorListPhone().setStore(storeAllExhibitor);
                this.updateLayoutExhibitorList();
            } else {
                this.onGetData(record);
            }
        }
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
        record.ExhibitorStore = storeAllExhibitor;
        storeAllExhibitor.load({
            callback: function(records, operation, success) {
                if(records.length > 0) {
                    me.getAllExhibitorListPhone().setStore(record.ExhibitorStore);
                    this.updateLayoutExhibitorList();
                }
            },
            scope: me
        });
    },

    onClearIconTapAllExhibitorPanelPhone: function() {
        this.getAllExhibitorListPhone().getStore().clearFilter();
        this.getAllExhibitorListPhone().deselectAll();
        this.updateLayoutExhibitorList();
    },

    onTextChangeAllExhibitorPanelPhone: function(newText) {
        var storeAllExhibitor = this.getAllExhibitorListPhone().getStore();

        if(storeAllExhibitor) {
            storeAllExhibitor.clearFilter();
            if(newText.trim() != '') {
                storeAllExhibitor.filter(function(record) {
                    didMatch = (record.get('name').trim().toLowerCase() + " "
                                + record.get('boothNos').trim().toLowerCase() + " "
                               ).match(newText.trim().toLowerCase());

                    if(didMatch)
                        return record;
                });
            }
            this.updateLayoutExhibitorList();
        }
    },

    onTapBtnOpenMyExhibitorsList: function() {
        this.getView().fireEvent('openMyExhibitorsList');
        this.getSearchFieldAllExhibitorPanelPhone().getController().clearSearchField();
    },

    onTapAllExhibitorListPhoneItem: function(me, index, target, record, e, eOpts) {
        this.getView().fireEvent('onTapAllExhibitorListPhoneItem', record);
    },

    updateLayoutExhibitorList: function() {
        var list = this.getAllExhibitorListPhone().getViewItems();
        for (var i = 0, length = list.length; i < length; i++) {
            if (i % 2 === 0) {
                list[i].addCls('presenterlistitemeven');
            } else {
                list[i].addCls('presenterlistitemodd');
            }
        }
    }
});
