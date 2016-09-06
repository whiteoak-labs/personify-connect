Ext.define('Personify.controller.phone.store.FilterStorePanel', {
    extend: 'Personify.base.Controller',

    control: {
        labelSortByValue: true,
        clearFilter: {
            tap: 'onClearFilter'
        }
    },

    updateLabel: function(value) {
        this.getLabelSortByValue().setHtml(value);
    },

    onClearFilter: function() {
        this.getView().fireEvent('clearFilter');
    }

});
