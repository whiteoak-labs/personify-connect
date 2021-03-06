Ext.define('Personify.view.phone.directory.contactinfo.ListInfoItemTemplate', {
    extend: 'Ext.Panel',
    
    config: {
        layout: 'hbox',
        flex: 1,
        items: [
            {
                flex: 2,
                xtype: 'label',
                html: '{typeDesc}',
                cls: 'p-phone-label-text'
            },
            {
                flex: 8,
                cls: 'p-phone-label-valueText',
                layout: 'vbox',
                items: [
                    {
                        cls: 'p-phone-directory-labelinfo',
                        html: '{value}'
                    },
                    {
                        html: '{[this.isPrimaryString(values.primary)]}',
                        docked: 'right'
                    }
                ]
            }
        ]
    }
});
