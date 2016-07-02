Ext.define('Personify.view.phone.event.ConfrerenceNavigation', {
    extend: 'Ext.Container',
    xtype: 'eventnavigationviewphone',
    controller: 'Personify.controller.phone.event.ConfrerenceNavigation',
    requires: [
        'Personify.controller.phone.event.ConfrerenceNavigation',
        'Personify.view.phone.event.ConferenceMenu',
        'Personify.view.phone.presenter.PresenterPanel',
        'Personify.view.phone.note.NoteListPanel',
        'Personify.view.phone.material.MaterialPanelPhone',
        'Personify.view.phone.attendee.Attendee',
        'Personify.view.phone.session.SessionPanel',
        'Personify.view.phone.exhibitor.ExhibitorPanelPhone',
        'Personify.view.phone.map.Map',
        'Personify.view.phone.session.SessionDetail',
        'Personify.view.phone.note.AddNote',
        'Personify.view.phone.map.MapNavigation',
        'Personify.view.phone.note.NoteNavigation'
    ],

    config: {
        cls:'p-main-view-panel',
        layout: 'vbox',
        record: null,
        store: null,
        title: null,
        items: [
            {
                itemId: 'confrerenceNavigationView',
                xtype: 'navigationview',
                navigationBar: false,
                flex: 1,
                items: [
                    {
                        itemId:'menueventPanelPhone',
                        xtype:'menueventPanelPhone'
                    }
               ]
            }
        ]
    }
});
