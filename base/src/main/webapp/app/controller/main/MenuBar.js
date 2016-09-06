Ext.define('Personify.controller.main.MenuBar',{
    extend: 'Personify.base.Controller',
    inject: ['currentUser'],

    config: {
        currentUser: null
    },

    control: {
        topMenubarButton: {
            onmenutap: 'onOpenMenuBar',
            onnotificationtap: 'onNotificationButton',
            ontapcartitemcheckout: 'onTapCartItemCheckout'
        },
        bottomMenuButton: {
            onmenutap: 'onCloseMenuBar',
            onnotificationtap: 'onNotificationButton',
            ontapcartitemcheckout: 'onTapCartItemCheckout'
        },
        menubarListItems: {
            openmainview: 'openMainPage',
            openinfopage: 'openInfoPage',
            onmenuitem: 'onMenuItemTap'
        },
        expandedMenu: true
    },

    init: function() {
        this.callParent(arguments);
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
        this.getMenubarListItems().getController().setMenuStore(store);

        for (var i = 0, length = records.length; i < length; i++) {
            if (records[i].get('view') == 'Personify.view.Store') {
                isExits = true;
                break;
            }
        }

        this.getTopMenubarButton().getController().setEnableShoppingCart(isExits);
        this.getBottomMenuButton().getController().setEnableShoppingCart(isExits);
        this.getView().setActiveItem(0);
    },
    
    openInfoPage: function() {
        var main = this.getView().getParent();
        var info = Ext.create('Personify.view.Help');
        Ext.Viewport.add(info);
        info.show();
        this.onCloseMenuBar();
        this.getMenubarListItems().getController().selectBtn('info');
    },

    openMainPage: function() {
        var main = this.getView().getParent();
        main.getController().onConnectButtonTap();
        main.getController().updateViewModules();
        this.resetSelectedButton();
        this.getMenubarListItems().getController().selectBtn('main');
    },
    
    resetSelectedButton: function() {
        this.onCloseMenuBar();
        this.getMenubarListItems().getController().resetSelectedButton();
    },
    
    onMenuItemTap: function(record) {
        if (!Personify.utils.PhoneGapHelper.checkConnection() && record.get('name') != "Events") {
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var islogged = currentUser ? currentUser.isLogged() : false;
        if(record.get('neededLogin') && !islogged){
            Personify.utils.ItemUtil.needToLogin();
            return;
        } else {
            this.getView().fireEvent('openselectview', record.get('view'), {record: record, listeners: record.get('listeners')}, record.get('title'), record.get('css'));
        }
        this.onCloseMenuBar();
    },
    
    onOpenMenuBar: function(){
        this.getView().setHeight(117);
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
    
    setNotificationButton: function(value) {
        this.getTopMenubarButton().getController().setNotificationValue('' + value);
        this.getBottomMenuButton().getController().setNotificationValue('' + value);
    },

    onNotificationButton: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser.isLogged()) {
            this.getView().fireEvent('onNotificationButton');
        } else {
            Personify.utils.ItemUtil.needToLogin();
            return;
        }
    },
    
    disableNotificationButton: function(value) {
        this.getTopMenubarButton().getController().disableNotificationButton(value);
        this.getBottomMenuButton().getController().disableNotificationButton(value);
    },

    onTapCartItemCheckout: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        this.getView().fireEvent('ontapcartitemcheckout');
    }
});