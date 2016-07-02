Ext.define('Personify.view.Help', {
    extend: 'Ext.Container',
    xtype: 'helppanel',
    requires: 'Personify.view.help.AboutAPA',

    config: {
        itemId: 'helppanel',
        zIndex: 10,
        right: 0,
        top: 50,
        cls: 'helpPanel panel-left',
        layout: 'vbox',
        showAnimation: {
            type: 'slide'
        },
        modal: true,
        scrollable: null,
        hideOnMaskTap: true,
        hidden: true,
        items: [
            {
                xtype: 'panel',
                items: [
                    {
                        xtype: 'button',
                        cls: 'p-close-button',
                        style: 'margin: 10px;',
                        text: 'X',
                        docked: 'right',
                        listeners: {
                            tap: function() {
                                this.parent.parent.destroy();
                            }
                        }
                    }
                ]
            },
            {
                flex: 1,
                itemId: 'aboutAPAPanel',
                xtype: 'aboutAPApanel'
            }
        ]
    },

    hide: function() {
        this.destroy();
    }
});