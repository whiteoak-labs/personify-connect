Ext.define('Personify.controller.news.TwitterView', {
    extend: 'Personify.base.Controller',
    requires: 'Personify.view.news.TwitterNewsPanel',
    
    control: {
        view: {
            'changeView': 'onChangeView'
        }
    },
    
    onChangeView: function() {
        twitterView = this.getView();
        twitterView.removeAll(true);
        twitterView.add({xtype: 'twitternewspanel'});
    }
});
