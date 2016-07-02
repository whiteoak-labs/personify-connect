Ext.define('Personify.controller.profile.NameAndTitleEditFormLikeIos', {
    extend: 'Personify.base.Controller',
    
    control: {
        namePanel: {
        },
        entryPanel: {
        },
        organizationPanel: {
            
        }
    },
    
    saveData: function() {
        this.getNamePanel().getController().saveData();
        this.getEntryPanel().getController().saveData();
        this.getOrganizationPanel().getController().saveData();
    },
    
    validation: function(){
        var saveNameMsg = this.getNamePanel().getController().validation();
        var saveEntryMsg = this.getEntryPanel().getController().validation();
        return saveNameMsg + saveEntryMsg;
    },
    refresh: function() {
        var recordName = this.getNamePanel().getRecord();
        if(recordName) {
            this.getNamePanel().getController().setRecord(recordName);
        }
        
        var recordTitle = this.getEntryPanel().getRecord();
        if(recordTitle) {
            this.getEntryPanel().getController().setRecord(recordTitle);
        }
        
        var recordOrganization = this.getOrganizationPanel().getRecord();
        if(recordOrganization) {
            this.getOrganizationPanel().getController().setRecord(recordOrganization);
        }
    },
    
    setRecordEntry: function(record) {
        this.getEntryPanel().setRecord(record);
    },
    
    setRecordOrganization: function(record) {
        this.getOrganizationPanel().setRecord(record);
    },
    
    setRecordName: function(record) {
        this.getNamePanel().setRecord(record);
    },
    
    getRecordTitle: function() {
        return this.getEntryPanel().getRecord();
    },
    
    getRecordOrganization: function() {
        return this.getOrganizationPanel().getRecord();
    }
});