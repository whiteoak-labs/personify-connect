Ext.define('Personify.controller.phone.profile.ConnectTwitter', {
    extend: 'Personify.controller.profile.ConnectTwitter',
    requires: 'Personify.model.twitter.User',

    control: {
        connectTwitterToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        usernameTextfield: {},
        passwordTextfield: {},
        authorizeButton: {
            tap:'onAuthorizeButtonTap'
        }
    },

    init: function() {
        this.getConnectTwitterToolbar().getController().setHiddenActionButton(true);
    },

    changeView: function () {
        this.onBack();
    },

    onBack: function() {
        this.getView().fireEvent('back');
    }
});
