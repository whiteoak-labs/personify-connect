Ext.define('Personify.controller.profile.NameAndTitleView', {
    extend: 'Personify.base.Controller',
    control: {
        displayName: {
            
        },
        jobTitle: {
            
        }
        
    },
    init: function() {
        this.callParent(arguments);
        this.getView().setRecord(null);
    },
    
    setRecord: function(record) {
        if(record){
            this.getDisplayName().setHtml(record.EntryProfile.getAt(0).get('displayName'));
            this.getJobTitle().setHtml(record.EntryProfile.getAt(0).get('jobTitle'));
        }
    },
    
    setPresenterRecord: function(presenter) {
        if(presenter) {
            if(presenter.get('name') && presenter.get('name') != '') {
                this.getDisplayName().setHtml(presenter.get('name'));
            } else {
                this.getDisplayName().setHtml('');
            }
            
            if(presenter.get('jobTitle') && presenter.get('jobTitle') != '') {
                this.getJobTitle().setHtml(presenter.get('jobTitle'));
            } else {
                this.getJobTitle().setHtml('');
            }
        }
    }
});
