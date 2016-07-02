Ext.define('Personify.controller.phone.menubar.MenuBar',{
    extend: 'Personify.base.Controller',
    inject: ['currentUser'],

    requires: ['Personify.view.phone.aboutAPA.AboutAPAPhone',
               'Personify.view.phone.notification.PanelNotificationPhone'],

    config: {
        currentUser: null
    },

    control: {
        topMenubarButton: {
            onTapInfoButtonOnPhoneMenu: 'onTapInfoButtonOnPhoneMenu',
            onmenutap: 'onOpenMenuBar',
            onTapButtonNotificationPhone: 'onTapButtonNotificationPhone',
            onTapButtonShoppingCartPhone: 'onTapButtonShoppingCartPhone'
        },
        bottomMenuButton: {
            onTapInfoButtonOnPhoneMenu: 'onTapInfoButtonOnPhoneMenu',
            onmenutap: 'onCloseMenuBar',
            onTapButtonNotificationPhone: 'onTapButtonNotificationPhone',
            onTapButtonShoppingCartPhone: 'onTapButtonShoppingCartPhone'
        },
        menubarListItems: {
            openmainview: 'openMainPage',
            openinfopage: 'openInfoPage',
            onmenuitem: 'onMenuItemTap'
        },
        expandedMenu: true
    },

    init: function() {
        var me = this;
        this.callParent(arguments);
        var currentUser = this.getCurrentUser();
        currentUser.modulesConfigurationLoad('phone', function(store) {
            me.updateMenuList(store);
        });
    },

    destroy: function() {
        this.getBottomMenuButton().setShowAnimation(null);
        this.getExpandedMenu().setShowAnimation(null);
        this.getExpandedMenu().setHideAnimation(null);

        return this.callParent(arguments);
    },

    updateMenuList: function(store) {
        var isExits = false;
        var records = store.getData().all;

        for (var i = 0, length = records.length; i < length; i++) {
            if (records[i].get('view') == 'Personify.view.phone.store.Store') {
                isExits = true;
                break;
            }
        }

        this.getTopMenubarButton().getController().setEnableShoppingCart(isExits);
        this.getBottomMenuButton().getController().setEnableShoppingCart(isExits);
        this.getMenubarListItems().getController().setMenuStore(store);
        this.getView().setActiveItem(0);
    },

    openInfoPage: function() {
        this.getView().fireEvent('requestchangeview', 'Personify.view.phone.aboutAPA.AboutAPAPhone', null);
        this.resetSelectedButton();
        this.getMenubarListItems().getController().selectBtn('info');
    },

    openMainPage: function() {
        this.getView().fireEvent('backtomain');
        this.resetSelectedButton();
        this.getMenubarListItems().getController().selectBtn('main');
    },

    resetSelectedButton: function() {
        this.onCloseMenuBar();
        this.getMenubarListItems().getController().resetSelectedButton();
    },

    onMenuItemTap: function(record) {
        var me = this;
        me.onCloseMenuBar();

        if (!Personify.utils.PhoneGapHelper.checkConnection() && record.get('name') != "Events") {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        Ext.callback(function() {
            me.getView().fireEvent('requestchangeview', record.get('view'), {record:record});
        }, me, [], 1);
    },

    onOpenMenuBar: function(){
        this.getView().setHeight(115);
        this.getView().setActiveItem(1);
        this.getMenubarListItems().show();
    },

    onCloseMenuBar: function() {
        Ext.callback(this.closeMenuBar, this, [], 400);
    },

    closeMenuBar: function() {
        this.getView().setHeight(51);
        this.getView().setActiveItem(0);
    },

    setTextButtonNotificationPhone: function(value) {
        if(value != '' || value != null) {
            this.getTopMenubarButton().getController().setTextButtonNotificationPhone('' + value);
            this.getBottomMenuButton().getController().setTextButtonNotificationPhone('' + value);
        }
    },

    setTextButtonShoppingCartPhone: function(value) {
        if (value != '' || value != null) {
            this.getTopMenubarButton().getController().setTextButtonShoppingCartPhone('' + value);
            this.getBottomMenuButton().getController().setTextButtonShoppingCartPhone('' + value);
        }
    },

    onTapButtonNotificationPhone: function() {
        if(!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser.isLogged()) {
            this.getView().fireEvent('requestchangeview', 'Personify.view.phone.notification.PanelNotificationPhone', null);
            this.resetSelectedButton();
            this.disableButtonNotificationPhone(true);
        } else {
            Ext.Viewport.setMasked(false);
            Personify.utils.ItemUtil.needToLogin();
            return;
        }
    },

    disableButtonNotificationPhone: function(value) {
        if(value != '' || value != null) {
            this.getTopMenubarButton().getController().disableButtonNotificationPhone(value);
            this.getBottomMenuButton().getController().disableButtonNotificationPhone(value);
        }
    },

    onTapInfoButtonOnPhoneMenu: function() {
        this.getView().fireEvent('requestchangeview', 'Personify.view.phone.aboutAPA.AboutAPAPhone', null);
        this.resetSelectedButton();
    },

    onTapButtonShoppingCartPhone: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser && currentUser.isLogged()) {
            this.getView().fireEvent('checkoutshoppingcart', this);
        } else {
            var loginForm = Ext.create('Personify.view.phone.login.LoginPhone');
            loginForm.addListener('updatecurrentuser', this.onUpdateCurrentUser, this);
            this.getView().fireEvent('requestchangeview', loginForm, null);
        }
    }
});
