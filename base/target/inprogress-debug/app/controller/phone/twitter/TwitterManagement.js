Ext.define('Personify.controller.phone.twitter.TwitterManagement', {
    extend: 'Personify.base.Controller',

    control: {
        twitterToolbar: {
        }
    },

    init: function() {
        this.getTwitterToolbar().getController().setActionText('News');
    }
});
