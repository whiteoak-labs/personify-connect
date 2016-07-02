Ext.define('Personify.controller.profile.Logout', {
    extend: 'Personify.base.Controller', 
    
    inject: {
        currentUser: 'currentUser', allProductStore: 'allProductStore'
    },
    
    config:{
           currentUser:null,
           allProductStore:null
    },
    
    control: {
        btnLogout: {
            tap: 'onLogout'
        },
        btnCancel: {
            tap: 'onCancel'
        },
        closeLogoutForm : {
            tap: 'onCancel'
        }
    },

    init: function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Logout');
        }
    },

    onLogout: function() {
        this.getView().destroy();
        var mainView = Ext.ComponentQuery.query('#mainView')[0];
        mainView.getController().logout();
           this.getAllProductStore().removeAll();
    },
    
    onCancel: function() {
        this.getView().destroy();
    }
});
