Ext.define('Personify.controller.phone.common.Paging', {
    extend: 'Personify.base.Controller',

    control: {
        nextButton: {
            tap: 'onNextButtonTap'
        },
        panelPaging: true
    },

    setPagingNavigationPanel: function(startIndexString, totalResultString, itemPerpage) {
        var me = this,
        	startIndex = parseInt(startIndexString),
            endIndex = parseInt(startIndex + itemPerpage - 1),
            totalResults = parseInt(totalResultString);

            if(totalResults <= endIndex) {
                endIndex = totalResults;
                me.getPanelPaging().setHidden(true);
            } else {
                me.getPanelPaging().setHidden(false);
            }
    },

    onNextButtonTap: function() {
        this.getView().fireEvent('nextButtonTap');
    }
})