Ext.define('Personify.view.event.complexevent.detailsession.SessionDetail', {
    extend: 'Ext.Panel',
    xtype: 'sessiondetail',
    controller: 'Personify.controller.event.complexevent.detailsession.SessionDetail',

    requires: [
        'Personify.controller.event.complexevent.detailsession.SessionDetail',
        'Personify.view.event.complexevent.detailsession.SessionDescription',
        'Personify.view.event.complexevent.detailsession.SessionHeaderDetail',
        'Personify.view.event.complexevent.detailsession.PresenterList',
        'Personify.view.event.complexevent.detailsession.Notes',
        'Personify.view.event.complexevent.detailsession.Rate',
        'Personify.view.event.advertising.SponsorPanel',
        'Personify.view.event.material.MaterialPanel'
    ],

    config: {
        layout: 'card',
        record: null,
        meetingRecord: null,
        items: [
            {
                layout: 'vbox',
                items: [
                    {
                        itemId: 'headerDetailEvent',
                        xtype: 'headerdetailevent'
                    },
                    {
                        flex: 1,
                        xtype: 'panel',
                        layout: 'vbox',
                        items: [
                            {
                                itemId: 'sessionMenuList',
                                scrollable: null,
                                inline: {
                                    wrap: false
                                },
                                xtype: 'dataview',
                                cls: 'session-menu-list',
                                itemCls: 'item-session-menu-list-without-rate',
                                pressedCls: 'item-pressed-session-menu-list',
                                selectedCls: 'item-selected-session-menu-list',
                                itemTpl: '<div class="{iconClassName} title-name">{title}</div>'
                            },
                            {
                                flex: 1,
                                xtype: 'panel',
                                layout: 'card',
                                itemId: 'cardMainDetailContainer'
                            },
                            {
                                xtype: 'sponsorPanel',
                                itemId: 'sponsorPanel',
                                hidden: true
                            }
                        ]
                    }
                ]
            }
        ]
    }
});