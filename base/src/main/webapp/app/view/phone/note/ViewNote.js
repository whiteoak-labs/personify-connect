Ext.define('Personify.view.phone.note.ViewNote', {
    extend: 'Ext.Panel',
    xtype: 'viewnotepanelphone',
    controller: 'Personify.controller.phone.note.ViewNote',
    requires: [
        'Personify.controller.phone.note.ViewNote',
        'Personify.view.phone.note.AddNote'
    ],

    config: {
        layout: 'vbox',
        eventId: null,
        sessionId: null,
        record: null,
        isAddNew: null,
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Note',
                itemId: 'eventToolbar'
            },
            {
                xtype: 'addnotepanelphone',
                itemId: 'addNotePanel',
                flex: 1,
                layout: 'vbox'
            },
            {
                layout: 'vbox',
                docked: 'bottom',
                flex: 1,
                cls:'p-phone-button-actioneventdetails',
                items:[
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-eventdetail-savetocalendar',
                        text: 'Share Current',
                        itemId: 'shareCurrentButton'
                    },
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-eventdetail-regiter',
                        text: 'Delete',
                        pressedCls: 'p-phone-button-red-pressing',
                        itemId: 'deleteNoteButton'
                    }
                ]
            }
        ]
    }
});
