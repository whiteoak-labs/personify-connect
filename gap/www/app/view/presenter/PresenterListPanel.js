Ext.define('Personify.view.presenter.PresenterListPanel', {
    extend: 'Ext.Panel',
    xtype: 'presenterlistpanel',
    controller: 'Personify.controller.presenter.PresenterListPanel',

    requires: [
        'Personify.controller.presenter.PresenterListPanel',
        'Personify.view.presenter.PresenterList',
        'Personify.view.event.search.SearchPanel'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                layout: 'hbox',
                style: 'margin: 10px 0px;',
                items: [
                    {
                        xtype: 'searchEventPanel',
                        itemId: 'searchFieldPresenter',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        cls: 'clearFilter',
                        pressedCls: 'red-button-pressing-background',
                        itemId: 'btnClearFilter',
                        text: 'Clear Filters',
                        docked: 'right',
                        disabled: true,
                        disabledCls: 'p-button-disabled'
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'presenterlist',
                itemId: 'presenterList'
            }
        ]
    },

    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});