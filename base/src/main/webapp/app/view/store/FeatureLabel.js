Ext.define('Personify.view.store.FeatureLabel', {
    extend: 'Ext.Panel',
    xtype: 'featurelabel',
    requires: [
        'Personify.controller.store.FeatureLabel',
        'Personify.view.store.filter.FilterPanel',
        'Personify.view.event.search.SearchPanel'
    ],
    controller: 'Personify.controller.store.FeatureLabel',
    
    config: {
        layout: 'vbox',
        items: [
            {
                layout: 'hbox',
                items: [
                    {
                        flex: 1,
                        itemId: 'searchStorePanel',
                        xtype: 'searchEventPanel',
                        cls: 'p-searchField-searchStore'
                    },
                    {
                        layout: 'hbox',
                        flex: 1,
                        items: [
                            {
                                xtype: 'button',
                                text: 'Product Category',
                                cls: 'filterEventButton',
                                itemId: 'filterButtonStore',
                                style: 'width: 55%; height: 40px; margin: 10px;'
                            },
                            {
                                flex: 1,
                                xtype: 'button',
                                cls: 'clearFilter',
                                pressedCls: 'red-button-pressing-background',
                                itemId: 'clearFilter',
                                text: 'Clear',
                                disabled: true,
                                disabledCls: 'p-button-disabled'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
