Ext.define('Personify.controller.phone.store.OrderPanel', {
    extend: 'Personify.controller.store.OrderPanel',

    control: {
        closeorderForm: {
            tap: 'onCloseForm'
        },

        orderTemplate: {
        },

        btnCancel: {
            'tap': 'onCloseForm'
        },

        btncheckout: {
            'tap': 'onCheckOut'
        },

        shippingAddress: {
            itemtap: 'onTapShippingAddress'
        }
    },

    config: {
        product: null,
        isProductEvent: null,
        callback: null
    }
});
