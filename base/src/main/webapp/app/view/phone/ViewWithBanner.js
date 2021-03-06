Ext.define("Personify.view.phone.ViewWithBanner",{
    extend: 'Ext.Container',
    xtype: 'viewwithbanner',
    controller: 'Personify.controller.phone.ViewWithBanner',

    requires: [
        'Personify.controller.phone.ViewWithBanner',
        'Personify.view.phone.home.HomeMainView',
        'Personify.view.phone.news.News',
        'Personify.view.phone.Event',
        'Personify.view.phone.store.Store',
        'Personify.view.phone.profile.Profile',
        'Personify.view.phone.directory.Directory',
        'Personify.view.phone.Schedule',
        'Personify.view.phone.schedule.ScheduleItem'
    ],

    config: {
        layout: 'vbox',
        cls: 'p-view-with-banner',
        items: [
            {
                xtype: 'panel',
                cls: 'banner-container'
            },
            {
                itemId: 'mainViewContainer',
                layout: 'fit',
                flex: 1,
                cls: 'main-view-container',
                items: [
                    {
                        itemId: 'homeMainView',
                        xtype: 'homemainview'
                    }
                ]
            }
        ]
    }
});