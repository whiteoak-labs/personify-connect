Ext.define('Personify.view.event.complexevent.notes.NotePanel', {
    extend: 'Ext.Panel',
    xtype: 'notepanel',
    controller: 'Personify.controller.event.complexevent.notes.NotePanel',

    requires: [
        'Personify.controller.event.complexevent.notes.NotePanel',
        'Personify.view.event.complexevent.notes.NoteListPanel',
        'Personify.view.event.complexevent.notes.ViewNote'
    ],

    config: {
        flex: 1,
        layout: 'vbox',
        record: null,
        meetingRecord: null,
        items: [
            {

                flex: 1,
                itemId: 'viewNotePanel',
                xtype: 'viewnotepanel'
            },
            {
                flex: 1,
                itemId: 'noteListPanel',
                xtype: 'notelistpanel'
            }
        ]
    }
});