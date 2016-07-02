Ext.define('Personify.controller.phone.store.DetailPanel', {
    extend: 'Personify.base.Controller',
    inject: ['shoppingCartStore'],

    config: {
        filterProduct: null,
        shoppingCartStore: null
    },

    control: {
        filterProduct: {
            tap: 'onTapFilterProduct'
        },
        searchProduct: {
            tap: 'onTapSearchProduct'
        }
    },

    onTapFilterProduct: function(button, e, eOpts) {
        this.getView().fireEvent('onFilterProduct', button);
    },

    onTapSearchProduct: function() {
        this.getView().fireEvent('onTapSearchProduct');
    }
});
