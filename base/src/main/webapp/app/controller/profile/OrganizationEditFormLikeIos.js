Ext.define('Personify.controller.profile.OrganizationEditFormLikeIos', {
    extend: 'Personify.base.Controller',
    
    control: {
        organizationTextField: {
            
        }
    },
    saveData: function() {
        var record = this.getView().getRecord();
        if(record) {
            record.set('name', this.getOrganizationTextField().getValue());
        }
    },
    
    setRecord: function(record) {
        //binding data to textfields
        if(record) {
            this.getOrganizationTextField().setValue(record.get('name'));
        } else {
            this.getOrganizationTextField().setValue('');
        }
    }
})