Ext.define('Personify.view.phone.note.NoteNavigation', {
    extend: 'Ext.Container',
    xtype: 'notenavigationphone',
    controller: 'Personify.controller.phone.note.NoteNavigation',
    requires: [
        'Personify.controller.phone.note.NoteNavigation',
        'Personify.view.phone.note.AddNote',
        'Personify.view.phone.note.ViewNote',
        'Personify.view.phone.note.NoteListPanel'
    ],

    config: {
        eventId: null,
        sessionId: null,
        title: null,
        cls:'p-main-view-panel',
        layout: 'vbox',
        flex: 1,
        items: [
           {
               itemId:'noteNavigationView',
               xtype:'navigationview',
               navigationBar: false,
               flex:1,
               items: [
               ]
           }
        ]
    }
});
