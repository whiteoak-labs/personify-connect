Ext.define('Personify.view.phone.material.MaterialPanelPhone', {
    extend: 'Ext.Container',
    xtype: 'materialPanelPhone',
    controller: 'Personify.controller.phone.material.MaterialPanelPhone',

    requires: [
        'Personify.controller.phone.material.MaterialPanelPhone',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.material.MaterialListPhone'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarMaterialPanelPhone',
                title: 'Materials'
            },
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'materialTitleBar'
            },
            {
                flex: 1,
                cls: 'p-phone-materiallistphone-container',
                xtype: 'materialListPhone',                
                itemId: 'materialListPhone'
            }
        ]
    }
});