Ext.define('Personify.controller.profile.TwitterView', {
    extend: 'Personify.base.Controller',
    control: {
        view: {
            'changeView': 'onChangeView'
        }
    },
    
    onChangeView: function(view) {
        var  me = this,
            twitterView = me.getView();

        twitterView.removeAll(true);
        
        twitterView.add({xtype:view});
    },
    
    loadContactData: function() {
        
    }
    
});