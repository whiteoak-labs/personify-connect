Ext.define('Personify.controller.profile.NameAndTitle', {
    extend: 'Personify.base.Controller',
    
    requires: [
        'Personify.view.profile.contactinfo.NameAndTitleView',
        'Personify.view.profile.contactinfo.OrganizationView',
        'Personify.view.profile.contactinfo.nameandtitle.NameEditFormLikeIos'
    ],
    
    control: {
    },
    
    config: {
        errorMessage: '\nFollowing fields cannot be blank:'
    },
    
    init: function() {
        this.callParent(arguments);
    },
    
    setRecord: function(record) {
        this.getView().removeAll(true, true);
        
        var organizationView = Ext.create('Personify.view.profile.contactinfo.OrganizationView');
        organizationView.setRecord(record);
        
        var nameAndTitleView = Ext.create('Personify.view.profile.contactinfo.NameAndTitleView');
        nameAndTitleView.setRecord(record);
        
        this.getView().add(nameAndTitleView);
        this.getView().add(organizationView);
    },
    
    setPresenterRecord: function(presenter) {
        this.getView().removeAll(true, true);
        
        var organizationView = Ext.create('Personify.view.profile.contactinfo.OrganizationView');
        organizationView.getController().setPresenterRecord(presenter);
        
        var nameAndTitleView = Ext.create('Personify.view.profile.contactinfo.NameAndTitleView');
        nameAndTitleView.getController().setPresenterRecord(presenter);
        
        this.getView().add(nameAndTitleView);
        this.getView().add(organizationView);
    },
    
    
    updateEditMode: function(newValue) {
        this.getView().removeAll(true, true);
        
        if(newValue == true) {
            var nameEditForm = Ext.create('Personify.view.profile.contactinfo.nameandtitle.NameEditFormLikeIos');
            nameEditForm.getController().setRecord(this.getView().getRecord());
            nameEditForm.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.PhotoAndRelatedEditStore);
            
            var jobTitleEditForm = Ext.create('Personify.view.profile.contactinfo.nameandtitle.TitleEditFormLikeIos');
            jobTitleEditForm.getController().setRecord(this.getView().getRecord());
            jobTitleEditForm.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.JobTitleEditStore);
            
            this.getView().add(nameEditForm);
            this.getView().add(jobTitleEditForm);
        } else {
            this.setRecord(this.getView().getRecord());
        }
    },
    
    validateData: function() {
        var editItems = this.getView().getItems().items;
        var wrongFormatArray = new Array();
        var validateResult;
        var editItems = this.getView().getItems().items;
        for (var i = 0; i < editItems.length; i++) {
            validateResult = editItems[i].getController().validateData();
            if(validateResult != '') {
                wrongFormatArray.push(validateResult);
            }
        }
        if(wrongFormatArray.length != 0) {
            Ext.Array.insert(wrongFormatArray, 0, this.getErrorMessage());
        }
        return wrongFormatArray;
    },
    
    updateParams: function(params) {
        var editItems = this.getView().getItems().items;
        for (var i = 0; i < editItems.length; i++) {
            editItems[i].getController().updateParams(params);
        }
    },
    
    refresh: function() {
        if(this.getView())
        {
            //edit form
            this.getNameAndTitleEditForm().getController().refresh();
            var recordTitle = this.getNameAndTitleEditForm().getController().getRecordTitle();
            //view form
            this.getNameAndTitleView().setRecord(recordTitle);
            var recordOrganization = this.getNameAndTitleEditForm().getController().getRecordOrganization();
            this.getOrganizationView().setRecord(recordOrganization);
        }
        
    }
});
