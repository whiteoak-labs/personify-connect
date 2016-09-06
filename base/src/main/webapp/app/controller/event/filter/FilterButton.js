Ext.define('Personify.controller.event.filter.FilterButton',{
    extend: 'Personify.base.Controller',

    control: {
        filterEvent: {
            tap: 'onOpenFilterPanel'
        },
        clearFilter: {
            tap: 'onClearFilter'
        }
    },//control

    onOpenFilterPanel: function() {
        this.getView().fireEvent('onOpenFilterPanel');
    },

    setDisabledClearFilterButton: function(value) {
        this.getClearFilter().setDisabled(value);
    },

    setDisabledFilterEventButton: function(value) {
        this.getFilterEvent().setDisabled(value);
    },

    onClearFilter: function() { 
        this.getView().fireEvent('onclearfilter');
        this.setDisabledClearFilterButton(true);
    }
});