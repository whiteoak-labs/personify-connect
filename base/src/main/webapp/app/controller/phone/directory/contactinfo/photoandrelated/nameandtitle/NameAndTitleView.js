Ext.define('Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.NameAndTitleView', {
    extend: 'Personify.controller.profile.NameAndTitleView',
    control: {
        displayName: {
            
        },
        
        jobTitle: {
            
        }
        
    },
    init: function() {
        this.callParent(arguments);
        this.getView().setRecord(null);
    }
    
//    setPresenterRecord: function(presenter) {
//        if(presenter) {
//            if(presenter.get('name') && presenter.get('name') != '') {
//                this.getDisplayName().setHtml(presenter.get('name'));
//            } else {
//                this.getDisplayName().setHtml('');
//            }
//            
//            if(presenter.get('jobTitle') && presenter.get('jobTitle') != '') {
//                this.getJobTitle().setHtml(presenter.get('jobTitle'));
//            } else {
//                this.getJobTitle().setHtml('');
//            }
//        }
//    }
});
