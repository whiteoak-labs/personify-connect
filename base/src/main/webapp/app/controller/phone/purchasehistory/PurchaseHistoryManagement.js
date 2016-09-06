Ext.define('Personify.controller.phone.purchasehistory.PurchaseHistoryManagement', {
    extend: 'Personify.controller.profile.PurchaseHistory',
    
    control: {
        purchaseHistoryList: {
            scrollend: 'onNextButtonTap'
        },
        purchaseHistoryToolbar: {
            onNavigationButtonTap: 'onBack'
        }
    },
    
    init: function() {
        this.callParent(arguments);
        var me = this;
        var record = me.getView().config.record;
        me.getPurchaseHistoryToolbar().getController().setHiddenActionButton(true);
        if(record && record.EntryProfile && record.EntryProfile.getAt(0)) {
            me.loadContactData(record.EntryProfile.getAt(0));
        }
    },
    
    onBack: function() {
        var me = this;
        var thisView = me.getView();
        thisView.fireEvent('back',this, null);
    },
    
    refreshRecordAfterEditing: function() {
        
    }
});
