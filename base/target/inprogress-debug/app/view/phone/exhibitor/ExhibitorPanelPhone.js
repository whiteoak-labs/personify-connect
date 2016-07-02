Ext.define('Personify.view.phone.exhibitor.ExhibitorPanelPhone', {
    extend: 'Ext.Container',
    xtype: 'exhibitorPanelPhone',
    controller: 'Personify.controller.phone.exhibitor.ExhibitorPanelPhone',

    requires: [
        'Personify.controller.phone.exhibitor.ExhibitorPanelPhone',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.exhibitor.AllExhibitorPanelPhone',
        'Personify.view.phone.exhibitor.MyExhibitorPanelPhone',
        'Personify.view.phone.exhibitor.DetailItemListExhibitorPhone'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        scrollable: false,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarExhibitorPanelPhone'
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                flex: 1,
                cls: 'exhibitorScreenPhone',
                items: [
                    {
                        flex: 1,
                        layout: 'card',
                        scrollable: false,
                        itemId: 'cardExhibitorPanelPhone',
                        items:[
                            {
                                flex: 1,
                                xtype: 'allExhibitorPanelPhone',
                                itemId: 'allExhibitorPanelPhone'
                            },
                            {
                                flex: 1,
                                xtype: 'myExhibitorPanelPhone',
                                itemId: 'myExhibitorPanelPhone'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
