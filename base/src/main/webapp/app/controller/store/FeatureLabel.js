Ext.define('Personify.controller.store.FeatureLabel', {
    extend: 'Personify.base.Controller',
    requires: 'Personify.view.store.CartPanel',
    inject: ['shoppingCartStore'],
    control: {
        filterButtonStore: {
            tap: 'onFilterButtonStoreTap'
        },
        searchStorePanel: {
        },
        clearFilter: {
            tap: 'onTapClearFilter'
        }
    },

    config: {
        shoppingCartStore: null
    },
    
    init: function() {
        var me = this;
        me.callParent(arguments);
        //Fixed:3246-8393048
        //me.getSearchStorePanel().getController().setPlaceHolder('Search Titles, Topics, Keywords');
    },
    
    onFilterButtonStoreTap: function() {
        this.getView().fireEvent('onOpenFilterPanel', this.getFilterButtonStore());
    },
    
    onTapClearFilter: function() {
        this.getView().fireEvent('onTapClearFilter', []);
    },

    onTapCartItemCheckout: function() {
        this.getView().fireEvent('ontapcartitemcheckout');
    }
});
