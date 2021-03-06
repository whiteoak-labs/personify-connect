Ext.define('Personify.view.presenter.PresenterPanel', {
    extend: 'Ext.Panel',
    xtype: 'presenterpanel',
    controller: 'Personify.controller.presenter.PresenterPanel',

    requires: [
        'Personify.controller.presenter.PresenterPanel',
        'Personify.view.presenter.PresenterListPanel',
        'Personify.view.profile.ContactInfo'
    ],

    config: {
        layout: 'card',
        flex: 1,
        items: [
            {
                flex: 1,
                xtype: 'presenterlistpanel',
                itemId: 'presenterListPanel'
            },
            {
                flex: 1,
                xtype: 'contactinfo',
                itemId:'presenterProfile'
            }
        ]
    }
});