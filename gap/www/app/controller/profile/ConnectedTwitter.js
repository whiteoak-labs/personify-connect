Ext.define('Personify.controller.profile.ConnectedTwitter', {
    extend: 'Personify.base.Controller',
    control: {
        view: {
            show: 'onShow'
        },
        unAuthorizeButton: {
            tap:'onUnAuthorizeButton'
        },
        nameTwitter: {}
    },
    
    onShow: function() {
    },

    init: function() {
        this.getNameTwitter().setHtml(TMA.Twitter.getUser().get('screen_name'));
    },
    
    onUnAuthorizeButton: function() {
        TMA.Twitter.unAuthorize();
        this.changeView();
    },

    changeView: function() {
        this.getView().getParent().fireEvent('changeview', 'Personify.view.profile.ConnectTwitter');
    }
});