Ext.define('Personify.view.event.material.MaterialItem', {
    extend: 'Ext.Panel',
    
    config: {
        layout:'hbox',
        flex: 1,
        items: [
            {
                xtype: 'panel',
                flex: 1,
                layout: 'vbox',
                items: [
                    {
                        html: '{titleParent}',
                        style: 'padding-bottom: 7px; font-size: 11pt;'
                    },
                    {
                        html: '<b>{title}</b>',
                        style: 'font-size: 13pt;'
                    }
                ]
            },
            {
                xtype: 'panel',
                cls: 'panel-contain-button-material',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'pptButtonMaterial',
                        cls: 'btn-ppt-material',
                        centered: true
                    }
                ]
            }
        ]
    }
});