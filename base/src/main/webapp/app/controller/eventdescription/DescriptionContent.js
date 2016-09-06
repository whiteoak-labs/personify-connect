Ext.define('Personify.controller.eventdescription.DescriptionContent',{
    extend: 'Personify.base.Controller',

    control: {
        imageDescription: true,
        shortDescription: true,
        longDescription: true
    },

    setRecord: function(record) {
        if(record) {
            if(record.get('imageURL')) {
                var img = '<img alt="image" src ="' + record.get('imageURL')+'" />';
                this.getImageDescription().setHtml(img);
            }
            this.getShortDescription().setHtml(record.get('shortDescription'));
            this.getLongDescription().setHtml(record.get('longDescription'));
        }
    }
});