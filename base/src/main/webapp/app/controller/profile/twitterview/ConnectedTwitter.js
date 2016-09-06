Ext.define('Personify.controller.profile.twitterview.ConnectedTwitter', {
    extend: 'Personify.base.Controller',
    control: {
        unAuthorizeButton: {
            tap:'onUnAuthorizeButtonTap'
        },
        
        notMeButton: {
            tap : 'onUnAuthorizeButtonTap'
        }
    },
    
    onShow: function() {
    },
    
    onUnAuthorizeButtonTap: function() {
        var me = this;
        TMA.Twitter.unAuthorize();
        
        me.changeView();
    },
    
    changeView: function () {
        var me= this,
        parentView = me.getView().getParent();
        parentView.fireEvent('changeView','connecttwitter')
        
    }
});