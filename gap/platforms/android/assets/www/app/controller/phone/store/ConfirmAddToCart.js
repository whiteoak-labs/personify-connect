Ext.define('Personify.controller.phone.store.ConfirmAddToCart', {
    extend: 'Personify.base.Controller',

    control: {
        cancelButton: {
            tap: 'onTapCancelButton'
        },
        checkoutButton: {
            tap: 'onTapCheckoutButton'
        },
        closeLogoutForm: {
            tap: 'onCloseForm'
        }
    },

    onTapCancelButton: function() {
        this.onCloseForm();
    },

    onCloseForm: function() {
        this.getView().destroy();
    },

    onTapCheckoutButton: function() {
        Ext.ComponentQuery.query('mainviewphone')[0].getController().onTapCartItemCheckout();
        this.onCloseForm();
    }
});
