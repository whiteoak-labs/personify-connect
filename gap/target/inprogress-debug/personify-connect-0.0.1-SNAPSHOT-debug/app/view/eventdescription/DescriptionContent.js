Ext.define('Personify.view.eventdescription.DescriptionContent', {
    extend: 'Ext.Container',
    xtype: 'descriptioncontent',
    controller: 'Personify.controller.eventdescription.DescriptionContent',
    requires: 'Personify.controller.eventdescription.DescriptionContent',

    config:{
        cls: 'p-panel-description',
        layout: 'vbox',
        flex: 1,
        scrollable: true,
        items: [
            {
                layout: 'hbox',
                cls: 'p-panel-description-container',
                style: 'margin-bottom: 35px',
                items: [
                    {
                        itemId: 'imageDescription',
                        cls: 'p-img-description',
                        width: 210,
                        style: 'margin-right: 15px',
                    },
                    {
                        flex: 2,
                        itemId: 'shortDescription'
                    }
                ]
            },
            {
                flex: 2,
                itemId: 'longDescription'
            }
        ]
    },

    updateRecord: function(record) {
        if (record) {
           var imageUrl=record.get('imageURL');
           var imageDiv = this.down("#imageDescription");
           
           var image = Ext.create('Ext.Img', {
                        src: imageUrl,
                        width: 210,
                        height: 210,
                        listeners: {
                                 load: function (img, evt) {
                                    imageDiv.show();
                                 }, // load
                                 error: function (img, evt) {
                                    imageDiv.hide();
                                 } // error
                             } // listeners
                         });
           imageDiv.hide();
           if(imageUrl)
            {
                imageDiv.add(image);
            }
            this.down("#shortDescription").setHtml(record.get('shortDescription'));
            this.down("#longDescription").setHtml(record.get('longDescription'));
        }
    }
});