Ext.define('Personify.controller.phone.exhibitor.MyExhibitorPanelPhone', {
    extend: 'Personify.base.Controller',

    control: {
        myExhibitorTitleBar: true,
        searchFieldMyExhibitorListPhone: {
            onClearIconTap: 'onClearIconTapMyExhibitorListPhone',
            onTextChange: 'onTextChangeMyExhibitorListPhone',
            onSearchKeyUp: 'onTextChangeMyExhibitorListPhone'
        },
        btnOpenAllExhibitorsList: {
            tap: 'onTapBtnOpenAllExhibitorsList'
        },
        myExhibitorListPhone: {
            itemtap: 'onTapMyExhibitorListPhoneItem'
        }
    },

    setRecord: function(record){
        if(record) {
            var storeMyExhibitor = record.MyExhibitorStore;
            this.getMyExhibitorTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(record.get('shortName'), 48));
            if (storeMyExhibitor) {
                this.getMyExhibitorListPhone().setStore(storeMyExhibitor);
            } else {
                this.getMyExhibitorFromSql(record);
            }
        }
    },

    getMyExhibitorFromSql: function(record) {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if(currentUser && currentUser.isLogged()) {
            var me = this,
                storeAllExhibitor = record.ExhibitorStore,
                storeManager = Personify.utils.ServiceManager.getStoreManager(),
                storeExhibitorName = storeManager.getExhibitorListStore(),
                storeMyExhibitor = Ext.create(storeExhibitorName),
                productId = record.get('productID') || null,
                customerId = currentUser.get('masterCustomerId'),
                subCustomerId = currentUser.get('subCustomerId');

            Personify.utils.Sqlite.getMyExhibitor(productId, customerId, subCustomerId, function(result) {
                if(typeof result == 'object' && result.length > 0) {
                     storeAllExhibitor.each(function(recordEx) {
                         for(var i = 0; i < result.length; i++) {
                             if(result[i].exhibitorId == recordEx.get('recordId')) {
                                 if (!recordEx.get('isAdded')) {
                                     recordEx.set('isAdded', true);
                                 }
                                 storeMyExhibitor.add(recordEx);
                                 break;
                             }
                         }
                    });
                }
                record.MyExhibitorStore = storeMyExhibitor;
                me.getMyExhibitorListPhone().setStore(record.MyExhibitorStore);
            });
        }
    },

    onClearIconTapMyExhibitorListPhone: function() {
        var storeMyExhibitor = this.getMyExhibitorListPhone().getStore();
        storeMyExhibitor.clearFilter();
        this.getMyExhibitorListPhone().deselectAll();
    },

    onTextChangeMyExhibitorListPhone: function(newText) {
        var storeMyExhibitor = this.getMyExhibitorListPhone().getStore();

        if(storeMyExhibitor) {
            storeMyExhibitor.clearFilter();
            if(newText.trim() != '') {
                storeMyExhibitor.filter(function(record) {
                    didMatch = (record.get('name').trim().toLowerCase() + " "
                                + record.get('boothNos').trim().toLowerCase() + " "
                               ).match(newText.trim().toLowerCase());
    
                    if(didMatch)
                        return record;
                });
            }
        }
    },

    onTapBtnOpenAllExhibitorsList: function() {
        this.getView().fireEvent('openAllExhibitorsList');
        this.getSearchFieldMyExhibitorListPhone().getController().clearSearchField();
    },

    onTapMyExhibitorListPhoneItem: function(me, index, target, record, e, eOpts) {
        this.getView().fireEvent('onTapMyExhibitorListPhoneItem', record);
    }
});
