Ext.define('Personify.controller.tablet.common.Paging', {
    extend: 'Personify.base.Controller',
    
    control: {
        nextButton: {
            tap: 'onNextButtonTap'
        }
    },
    
    setPagingNavigationPanel: function(startIndexString, totalResultString, itemPerpage) {
        var me = this;
        var startIndex = parseInt(startIndexString),
            endIndex = parseInt(startIndex + itemPerpage - 1),
            totalResults = parseInt(totalResultString);
            
            if(totalResults <= endIndex) {
                endIndex = totalResults;
                this.getNextButton().setHidden(true);
            } else {
                this.getNextButton().setHidden(false);
                this.getNextButton().setBaseCls('p-button-paging');
            }
    },
    
    onNextButtonTap: function() {
        this.getView().fireEvent('nextButtonTap');
    }
})