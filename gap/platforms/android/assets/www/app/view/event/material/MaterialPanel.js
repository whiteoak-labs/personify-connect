Ext.define('Personify.view.event.material.MaterialPanel', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.event.material.MaterialPanel',
    requires: [
        'Personify.controller.event.material.MaterialPanel',
        'Personify.view.event.material.MaterialList'
    ],
    xtype: 'materialPanel',

    config:{
        layout: 'fit',
        items: [
            {
                flex: 5,
                xtype: 'materialList',
                itemId: 'listMaterial'
            }
        ]
    }
});