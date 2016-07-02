Ext.define('Personify.controller.main.TopMenu',{
    extend: 'Personify.base.Controller',
    inject: ['shoppingCartStore'],

    control: {
        notificationButton: {
            tap: 'onNotificationButton'
        },
        menubarButton: {
            tap: 'onMenuTopTap'
        },
        cartItemCheckout: {
            tap: 'onTapCartItemCheckout'
        },
        totalItemCheckout: true
    },

    config: {
        shoppingCartStore: null
    },
    
    init: function() {
        if (this.getShoppingCartStore().getCount()) {
            this.getTotalItemCheckout().setHtml(this.getShoppingCartStore().getCount());
        }
        this.getShoppingCartStore().on('load', this.onLoadDone, this);
    },

    destroy: function() {
        this.getShoppingCartStore().un('load', this.onLoadDone, this);
        return this.callParent();
    },
    
    setNotificationValue: function(value) {
        this.getNotificationButton().setText(value)
    },
    
    onMenuTopTap: function() {
        this.getView().fireEvent('onmenutap');
    },
    
    onNotificationButton: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getView().fireEvent('onnotificationtap');
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },
    
    disableNotificationButton: function(value) {
        this.getNotificationButton().setDisabled(value);
    },

    onTapCartItemCheckout: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getView().fireEvent('ontapcartitemcheckout');
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onLoadDone: function(store, record, success) {
        if (success) {
           var itemCount = 0;
           store.each(function(record) {
              itemCount += record.get('quantity');
          });
            this.getTotalItemCheckout().setHtml(itemCount.toString());
        }
    },

    setEnableShoppingCart: function(enable) {
        this.getCartItemCheckout().setHidden(!enable);
        this.getTotalItemCheckout().setHidden(!enable);
    }
});