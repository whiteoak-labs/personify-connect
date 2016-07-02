Ext.define('Personify.controller.profile.contactinfo.PhotoAndRelated', {
    extend: 'Personify.controller.profile.template.InfoInterface',
    
    control: {
        photoPanel: {
            
        },
        
        nameAndTitlePanel: {
            
        }
    },
    
    init: function () {
    },
    
    setRecord: function(newRecord) {
        this.getPhotoPanel().setRecord(newRecord);
        this.getNameAndTitlePanel().setRecord(newRecord);
    },
    
    setPresenterRecord: function(presenter) {
        this.getPhotoPanel().getController().setPresenterRecord(presenter);
        this.getNameAndTitlePanel().getController().setPresenterRecord(presenter);
    },
    
    updateEditMode: function(newValue) {
        this.getNameAndTitlePanel().getController().updateEditMode(newValue);
        this.getPhotoPanel().getController().updateEditMode(newValue);
    },
    
    validateData: function() {
        return this.getNameAndTitlePanel().getController().validateData();
    },
    
    updateParams: function(params) {
        this.getNameAndTitlePanel().getController().updateParams(params);
    }
})