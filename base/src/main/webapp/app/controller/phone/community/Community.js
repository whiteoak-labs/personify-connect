Ext.define('Personify.controller.phone.community.Community', {
    extend: 'Personify.base.Controller',
    
    control: {
        communityToolbar: {
            onNavigationButtonTap: 'onBack'
        }
    },
    
    onBack: function() {
        var me = this;
            thisView = me.getView();
        thisView.fireEvent('back',this);
    }
});
