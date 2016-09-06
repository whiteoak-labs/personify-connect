Ext.define('Personify.controller.store.ConfirmAddToCart', {
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
       },
       view: {
           show:'onShow',
           hide:'onHide',
       }
    },

    onTapCancelButton: function() {
        this.onCloseForm();
    },

    onCloseForm: function() {
        this.getView().hide();
    },

    onTapCheckoutButton: function() {
        Ext.ComponentQuery.query('mainview')[0].getController().onTapCartItemCheckout();
        this.onCloseForm();
    },
           
   onHide: function() {
       Personify.utils.BackHandler.popActionAndTarget('hide', this.getView());
       this.getView().destroy();
   },
   
   onShow: function() {
       Personify.utils.BackHandler.pushActionAndTarget('hide', this.getView());
   },
});
