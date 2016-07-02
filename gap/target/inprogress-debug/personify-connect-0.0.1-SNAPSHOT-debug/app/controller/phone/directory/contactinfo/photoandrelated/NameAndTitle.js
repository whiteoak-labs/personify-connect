Ext.define('Personify.controller.phone.directory.contactinfo.photoandrelated.NameAndTitle', {
    extend: 'Personify.controller.profile.NameAndTitle',
    
    requires: [
        'Personify.view.phone.directory.contactinfo.nameandtitle.OrganizationView',
        'Personify.view.phone.directory.contactinfo.nameandtitle.NameAndTitleView',
        'Personify.view.phone.directory.contactinfo.nameandtitle.NameEditForm',
        'Personify.view.phone.directory.contactinfo.nameandtitle.TitleEditForm'
    ],
    
    control: {
    },
    
    config: {
        errorMessage: '\nFollowing fields cannot be blank:',
        isEditing: false
    },
    
    init: function() {
        this.callParent(arguments);
    },
    
    setRecord: function(record) {
        if (this.getIsEditing()) {
            this.updateEditMode(true);
            return;
        }

        this.getView().removeAll(true, true);
        
        var organizationView = Ext.create('Personify.view.phone.directory.contactinfo.nameandtitle.OrganizationView');
        organizationView.setRecord(record);
        
        var nameAndTitleView = Ext.create('Personify.view.phone.directory.contactinfo.nameandtitle.NameAndTitleView');
        nameAndTitleView.setRecord(record);
        
        this.getView().add(nameAndTitleView);
        this.getView().add(organizationView);
    },
    
    updateEditMode: function(newValue) {
        this.setIsEditing(newValue);
        this.getView().removeAll(true, true);
        
        if(newValue == true) {
            var nameEditForm = Ext.create('Personify.view.phone.directory.contactinfo.nameandtitle.NameEditForm');
            nameEditForm.getController().setRecord(this.getView().getRecord());
            nameEditForm.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.PhotoAndRelatedEditStore);
            
            var jobTitleEditForm = Ext.create('Personify.view.phone.directory.contactinfo.nameandtitle.TitleEditForm');
            jobTitleEditForm.getController().setRecord(this.getView().getRecord());
            jobTitleEditForm.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.JobTitleEditStore);
            
            this.getView().add(nameEditForm);
            this.getView().add(jobTitleEditForm);
        } else {
            this.setRecord(this.getView().getRecord());
        }
    }
});
