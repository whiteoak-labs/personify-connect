Ext.define('Personify.view.event.complexevent.ComplexEvent', {
    extend: 'Ext.Container',
    xtype: 'complexevent',
    controller: 'Personify.controller.event.complexevent.ComplexEvent',
    
    requires: [
        'Personify.controller.event.complexevent.ComplexEvent',
        'Personify.view.ExhibitorAndDetail',
        'Personify.view.event.complexevent.sessions.SessionsAndDetail',
        'Personify.view.event.eventmenu.EventMenuList',
        'Personify.view.event.complexevent.TwitterPanel',
        'Personify.view.event.addEvent.AddEvent',
        'Personify.store.base.EventMenu',
        'Personify.view.attendee.Attendees',
        'Personify.view.event.material.MaterialPanel',
        'Personify.view.event.map.Map',
        'Personify.view.event.complexevent.notes.NotePanel',
        'Personify.view.event.complexevent.badge.Badge',
        'Personify.view.presenter.PresenterPanel',
        'Personify.view.community.CommunityPanel',
        'Personify.view.eventdescription.DescriptionPanel'
    ],
        
    config: {
        fromMain: null,
        cls: 'card-complex-event',
        layout: 'hbox',
        items: [
            {
                flex: 4,
                cls: 'p-panel-component-left panel-left',
                layout: 'vbox',
                items: [
                    {
                        itemId: 'backToEventButton',
                        baseCls: 'p-button-backToEvent',
                        xtype: 'button',
                        text: '<  Back to Events'
                    },
                    {
                        html: 'Already Registered!',
                        itemId: 'registeredText',
                        cls: 'p-label-already-registered',
                        hidden: true
                    },
                    {
                        itemId: 'menuPanel',
                        xtype: 'eventmenulist',
                        scrollable: null
                    },
                    {
                        itemId: 'twitterPanel',
                        xtype: 'twitterpanel',
                        flex: 1,
                        type: 'search'
                    }
                ]
                
            },
            {
                itemId: 'complexEventScheduleContent',
                cls: 'profile-panel-right',
                flex: 9,
                scrollable: null,
                layout: 'card',
                items: [
                    {
                        xtype: 'sessionsAndDetail',
                        itemId: 'sessionsAndDetail'
                    }
                ]
            }
        ]
    },//end config
    
    refresh: function(user) {
        this.getController().refreshData(user);
    }
});