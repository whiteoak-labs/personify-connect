Ext.define('Personify.controller.profile.Bio', {
    extend: 'Personify.controller.profile.template.InfoTemplate',
    
    control: {
        biographyText: {}
    },
    
    setBioInfo: function(record) {
        if(record) {
            this.getBiographyText().setHtml(record.get('biographyText'));
        } else {
            this.getBiographyText().setHtml('');
        }
    }
})