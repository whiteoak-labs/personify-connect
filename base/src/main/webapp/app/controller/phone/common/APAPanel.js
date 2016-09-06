Ext.define('Personify.controller.phone.common.APAPanel', {
    extend: 'Personify.base.Controller',
    control: {
        backToMainView: {
            tap: 'onBackToMainView'
        },
        toolbarPhone: {
            onNavigationButtonTap: 'onNavigationButtonTap'
        }
    },
    setTitleOfToolbar: function(title){
        this.getToolbarPhone().setTitle(title);
    },
    setNotificationLabel: function(text){
        this.getNotificationLabel().setHtml(text);
    },
    setToolbarUI: function(value){
        this.getToolbarPhone().getController().setUI(value);
    },
    setHiddenActionButton: function(value) {
         this.getToolbarPhone().getController().setHiddenActionButton(value);
    },
    setHiddenNavigationButton: function(value) {
        this.getToolbarPhone().getController().setHiddenNavigationButton(value);
    },
    onNavigationButtonTap: function() {
        this.getView().fireEvent('back');
    },
    
    onBackToMainView: function() {
        this.getView().fireEvent('backtomain');
    }
});