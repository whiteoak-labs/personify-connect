Ext.define('Personify.view.phone.material.MaterialItemPhone', {
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
                        style: 'margin: 10px 10px 7px;'
                    },
                    {
                        html: '<b>{title}</b>',
                        style: 'font-size: 9pt; margin: 0px 10px 10px;'
                    }
                ]
            },
            {
                xtype: 'panel',
                cls: 'panel-contain-button-material-phone',
                scrollend:true,
                scrollToTopOnRefresh:false,
                items: [
                    {
                        xtype: 'button',
                        itemId: 'pptButtonMaterial',
                        cls: 'btn-ppt-material-phone',
                        centered: true
                    }
                ]
            }
        ]
    }
});