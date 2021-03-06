Ext.define('Personify.view.event.complexevent.notes.NoteItem', {
    extend: 'Ext.Panel',
    config: {
        layout: 'vbox',
        flex: 1,
        style: 'color: white !important',
        items:[
            {
                layout: 'hbox',
                width: '100%',
                items: [
                    {
                        flex: 6,
                        html: '{[Personify.utils.ItemUtil.getShortContent(values.title, 60)]}'
                    },
                    {
                        flex: 3,
                        html: '{[Personify.utils.ItemUtil.formatJSONDate(values.date)]}'
                    }
                ]
            },
            {
                layout: 'hbox',
                items: [
                    {
                        flex: 7,
                        html: '{[Personify.utils.ItemUtil.getShortContent(values.description, 60)]}'
                    },
                    {
                        flex: 3,
                        xtype: 'button',
                        cls: 'p-button-red-inlist',
                        text: 'Delete Note'
                    }
                ]
            }
        ]
    }
});