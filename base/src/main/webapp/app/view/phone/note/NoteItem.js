Ext.define('Personify.view.phone.note.NoteItem', {
    extend: 'Ext.Panel',
    config: {
        layout: {
            type: 'hbox',
            align: 'center'
        },
        flex: 1,
        items:[
            {
                layout: 'vbox',
                flex: 1,
                items:[
                    {
                        layout: 'hbox',
                        width: '100%',
                        items: [
                            {
                                flex: 1,
                                cls: 'p-phone-label-titlenote',
                                html: '{[Personify.utils.ItemUtil.getShortContent(values.title, 60)]}'
                            },
                            {
                                html: '{[Personify.utils.ItemUtil.formatJSONDate(values.date)]}'
                            }
                        ]
                    },
                    {
                        cls: 'p-phone-label-notedescription',
                        html: '{[Personify.utils.ItemUtil.getShortContent(values.description, 60)]}'
                    }
                ]
            },
            {
                xtype: 'button',
                cls: 'p-phone-button-deletenote',
                text: ''
            }

        ]
    }
});
