Ext.define('Personify.view.event.simpleEvent.SimpleEvent', {
    extend: 'Ext.Container',
    xtype: 'simpleEvent',
    controller: 'Personify.controller.event.simpleEvent.SimpleEvent',
    requires: [
        'Personify.controller.event.simpleEvent.SimpleEvent',
        'Personify.view.event.eventmenu.EventMenuList',
        'Personify.view.event.complexevent.TwitterPanel',
        'Personify.view.event.simpleEvent.SimpleEventContent',
        'Personify.view.community.CommunityPanel',
        'Personify.view.event.complexevent.notes.NotePanel',
        'Personify.view.presenter.PresenterPanel',
        'Personify.view.event.material.MaterialPanel',
        'Personify.view.store.OrderPanel'
    ],
    config: {
        fromMain: null,
        layout: 'hbox',
        cls: 'card-complex-event',
        items: [
            {
                flex: 4,
                layout: 'vbox',
                cls: 'p-panel-component-left panel-left',
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
                        xtype: 'button',
                        html: 'Register',
                        itemId: 'addToCartButton',
                        baseCls:'registerBtn',
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        html: 'Register Now',
                        itemId: 'registerButton',
                        baseCls:'registerBtn',
                        hidden: true
                    },
                    {
                        xtype: 'eventmenulist',
                        itemId: 'eventMenu',
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
                flex: 9,
                itemId: 'simpleEventContent',
                scrollable: null,
                layout: 'card',
                items: []
            }
        ]
    },
    refresh: function(user) {
        this.getController().refreshData(user);
    }
});