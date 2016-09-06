Ext.define('Personify.controller.phone.directory.contactinfo.PhotoAndRelated', {
    extend: 'Personify.controller.profile.contactinfo.PhotoAndRelated',
    
    control: {
        photoPanel: {
            
        },
        
        nameAndTitlePanel: {
            
        }
    },

    config: {
        isEditing: false
    },
    
    init: function () {
    },
    
    setRecord: function(newRecord) {
        this.getPhotoPanel().getController().setIsEditing(this.getIsEditing());
        this.getNameAndTitlePanel().getController().setIsEditing(this.getIsEditing());

        this.getPhotoPanel().setRecord(newRecord);
        this.getNameAndTitlePanel().setRecord(newRecord);
        this.updateEditMode(this.getIsEditing());
    },
    
//    setPresenterRecord: function(presenter) {
//        this.getPhotoPanel().getController().setPresenterRecord(presenter);
//        this.getNameAndTitlePanel().getController().setPresenterRecord(presenter);
//    },
//    
    updateEditMode: function(newValue) {
        this.setIsEditing(newValue);

        this.getNameAndTitlePanel().getController().updateEditMode(newValue);
        this.getPhotoPanel().getController().updateEditMode(newValue);
    }
//    
//    validateData: function() {
//        return this.getNameAndTitlePanel().getController().validateData();
//    },
//    
//    updateParams: function(params) {
//        this.getNameAndTitlePanel().getController().updateParams(params);
//    }
})