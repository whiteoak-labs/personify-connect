Ext.define('Personify.view.phone.presenter.PresenterPanel', {
    extend: 'Ext.Panel',
    xtype: 'presenterpanelphone',
    controller: 'Personify.controller.phone.presenter.PresenterPanel',

    requires: [
        'Personify.controller.phone.presenter.PresenterPanel',
        'Personify.view.phone.presenter.PresenterListPanel',
        'Personify.view.phone.common.Toolbar'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        scrollable: null,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarPresentersPhone',
                title: 'Presenters'
            },
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'presenterTitleBar'
            },
            {
                flex: 1,
                xtype: 'presenterlistpanelphone',
                itemId: 'presenterlistpanelphone',
                cls: 'exhibitorScreenPhone'
            }
        ]
    }
});