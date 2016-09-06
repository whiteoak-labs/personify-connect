Ext.define('Personify.view.phone.Main', {
    extend: 'Ext.Container',
    xtype: 'mainviewphone',
    controller: 'Personify.controller.phone.Main',
    requires: [
        'Personify.controller.phone.Main',
        'Personify.view.NavigationView',
        'Personify.view.phone.ViewWithBanner',
        'Personify.view.phone.menubar.MenuBar'
    ],

    config: {
        cls: 'p-main-view-panel',
        layout: 'vbox',
        itemId: 'mainView',
        items: [
           {
               itemId: 'mainNavigationView',
               xtype: 'panel',
               flex: 1,
               layout: 'card',
               cls: 'main-navigation-view',
               items: [
                    {
                        itemId: 'viewWithBanner',
                        xtype: 'viewwithbanner'
                    }
               ]
           },
           {
                xtype: 'menubarphone',
                itemId: 'menuBar',
                docked: 'bottom'
           }
        ]
    }
});
