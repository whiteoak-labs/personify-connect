Ext.define('Personify.view.phone.Event', {
    extend: 'Ext.Container',
    xtype: 'eventviewphone',
    controller: 'Personify.controller.phone.Event',
    requires: [
        'Personify.controller.phone.Event',
        'Personify.view.phone.event.EventPanel',
        'Personify.view.phone.event.ConfrerenceNavigation',
        'Personify.view.phone.event.EventDetail',
        'Personify.view.phone.presenter.PresenterPanel',
        'Personify.view.phone.note.NoteListPanel',
        'Personify.view.phone.material.MaterialPanelPhone',
        'Personify.view.phone.attendee.Attendee',
        'Personify.view.phone.session.SessionPanel',
        'Personify.view.phone.exhibitor.ExhibitorPanelPhone',
        'Personify.view.phone.map.Map',
        'Personify.view.phone.session.SessionDetail',
        'Personify.view.phone.note.AddNote',
        'Personify.view.phone.map.MapNavigation'
    ],

    config: {
        cls:'p-main-view-panel',
        layout: 'vbox',
        items: [
           {
               itemId:'eventNavigationView',
               xtype:'navigationview',
               navigationBar: false,
               flex:1,
               items: [
                    {
                        itemId:'eventPanelPhone',
                        xtype:'eventPanelPhone'
                    }
               ]
           }
        ]
    }
});
