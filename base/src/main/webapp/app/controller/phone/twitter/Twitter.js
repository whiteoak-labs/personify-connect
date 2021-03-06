Ext.define('Personify.controller.phone.twitter.Twitter', {
    extend: 'Personify.base.Controller',

    control: {
        twitterToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onChangeParentView'
        }
    },

    onBack: function() {
        this.getView().fireEvent('back');
    },

    onChangeParentView: function() {
        this.getView().fireEvent('requestchangeview', 'Personify.view.phone.news.News', null);
    }
});
