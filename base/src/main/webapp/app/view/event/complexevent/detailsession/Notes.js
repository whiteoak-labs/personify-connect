Ext.define('Personify.view.event.complexevent.detailsession.Notes', {
    extend: 'Ext.Panel',
    xtype: 'sessionnotes',
    controller: 'Personify.controller.event.complexevent.detailsession.Notes',

    requires: [
        'Personify.controller.event.complexevent.detailsession.Notes',
        'Personify.view.event.complexevent.notes.NoteListPanel',
        'Personify.view.event.complexevent.notes.AddNote'
    ],

    config: {
        flex: 1,
        layout: 'vbox',
        record: null,
        meetingRecord: null,
        sessionId: null,
        eventId: null,
        showCloseButton: false,
        items: [
            {
                xtype: 'panel',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'shareCurrentButton',
                        text: 'Share Current',
                        cls: 'p-button-sharewithtitle',
                        style: 'margin: 10px;width: 140px;',
                        docked: 'left'
                    },
                    {
                        xtype: 'button',
                        itemId: 'closeButton',
                        text: 'Close',
                        cls: 'p-button-closechildpanelevent',
                        style: 'margin: 10px; width: 80px',
                        docked: 'right',
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        itemId: 'deleteNoteButton',
                        text: 'Delete',
                        cls: 'p-button-cancelNote',
                        docked: 'right',
                        hidden: true
                    }
                ]
            },
            {
                flex: 1,
                itemId: 'addNotePanel',
                xtype: 'addnotepanel'
            }
        ]
    }
});