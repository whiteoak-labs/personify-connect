Ext.define('Personify.controller.profile.OrganizationView', {
    extend: 'Personify.base.Controller',
    
    control: {
        organizationName: {
            
        }
    },
    
    setRecord: function(record) {
        if(record) {
            var organizationStore = record.EntryProfile.getAt(0).OrganizationProfile;
        
            if(organizationStore.getCount() > 0) {
                this.getOrganizationName().setHtml(organizationStore.getAt(0).get('name'));
            } else {
                this.getOrganizationName().setHtml('');
            }
        }
    },
    
    setPresenterRecord: function(presenter) {
        if(presenter && presenter.get('employer') && presenter.get('employer') != '') {
            this.getOrganizationName().setHtml(presenter.get('employer'));
        } else {
            this.getOrganizationName().setHtml('');
        }
    }
})