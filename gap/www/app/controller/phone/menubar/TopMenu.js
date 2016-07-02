Ext.define('Personify.controller.phone.menubar.TopMenu',{
    extend: 'Personify.base.Controller',
    inject: ['shoppingCartStore'],

    config: {
        shoppingCartStore: null
    },

    control: {
        infoButtonOnPhoneMenu: {
            tap: 'onTapInfoButtonOnPhoneMenu'
        },
        buttonNotificationPhone: {
            tap: 'onTapButtonNotificationPhone'
        },
        menubarButton: {
            tap: 'onMenuTopTap'
        },
        buttonShoppingCartPhone: {
            tap: 'onTapButtonShoppingCartPhone'
        }
    },

    init: function() {
        this.getShoppingCartStore().on('load', this.onLoadDone, this);
    },

    destroy: function() {
        this.getShoppingCartStore().un('load', this.onLoadDone, this);
        return this.callParent(arguments);
    },

    onTapInfoButtonOnPhoneMenu: function() {
        this.getView().fireEvent('onTapInfoButtonOnPhoneMenu');
    },

    onMenuTopTap: function(){
        this.getView().fireEvent('onmenutap');
    },

    setTextButtonNotificationPhone: function(value) {
        if(value != '' || value != null) {
            this.getButtonNotificationPhone().setHtml(value);
        }
    },

    setTextButtonShoppingCartPhone: function(value) {
        if (value != '' || value != null) {
            this.getButtonShoppingCartPhone().setHtml(value);
        }
    },

    onTapButtonNotificationPhone: function(){
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getView().fireEvent('onTapButtonNotificationPhone');
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    disableButtonNotificationPhone: function(value) {
        if(value != '' || value != null) {
            this.getButtonNotificationPhone().setDisabled(value);
        }
    },

    onTapButtonShoppingCartPhone: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getView().fireEvent('onTapButtonShoppingCartPhone');
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onLoadDone: function(store, record, success) {
        if (success) {
            var currentUser = Personify.utils.Configuration.getCurrentUser();

            if (currentUser && currentUser.isLogged()) {
                var itemCount = 0;
                store.each(function(record) {
                       itemCount += record.get('quantity');
                   });
                this.getButtonShoppingCartPhone().setHtml(itemCount.toString());
            } else {
                this.getButtonShoppingCartPhone().setHtml('0');
            }
        }
    },

    setEnableShoppingCart: function(enable) {
        this.getButtonShoppingCartPhone().setHidden(!enable);
    }
});
