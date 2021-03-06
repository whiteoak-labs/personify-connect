Ext.define('Personify.controller.phone.profile.Logout', {
    extend: 'Personify.controller.profile.Logout',

    inject: {
           currentUser: 'currentUser'//, allProductStore: 'allProductStore'
    },

    config:{
        currentUser:null//,
           //allProductStore:null
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

    onLogout: function() {
        this.getView().fireEvent('loggedout');
           //this.getAllProductStore().removeAll();
        this.getView().destroy();
    }
});
