Ext.define('Personify.controller.phone.session.SearchHeader', {
    extend: 'Personify.base.Controller',
           
    control: {
        filterSession: {
            tap: 'onTapFilterSession'
        },
        searchSession: {
            tap: 'onTapSearchSession'
        }
    },

    onTapFilterSession: function(button, e, eOpts) {
        this.getView().fireEvent('onFilterSession', button);
    },

    onTapSearchSession: function() {
        this.getView().fireEvent('onTapSearchSession');
    }
});
