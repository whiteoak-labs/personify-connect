Ext.define('Personify.view.phone.Schedule', {
    extend: 'Ext.Container',
    xtype: 'scheduleviewphone',
    controller: 'Personify.controller.phone.Schedule',
    requires: [
        'Personify.controller.phone.Schedule',
        'Personify.view.phone.schedule.SchedulePanel',
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
        'Personify.view.phone.map.MapNavigation',
        'Personify.view.phone.addevent.AddEvent'
    ],
    config: {
        cls:'p-main-view-panel',
        layout: 'vbox',
        items: [
           {
               itemId:'scheduleNavigationView',
               xtype:'navigationview',
               navigationBar: false,
               flex:1,
               items: [
                    {
                        itemId:'myschedulePanel',
                        xtype:'myschedulePanel'
                    }
               ]
           }
        ]
    }
});
