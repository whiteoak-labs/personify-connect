Ext.define('Personify.view.phone.common.Toolbar', {
    extend: 'Ext.Toolbar',
    xtype : 'ptoolbar',
    controller: 'Personify.controller.phone.common.Toolbar',
    requires: 'Personify.controller.phone.common.Toolbar',

    config: {
        hiddenNavigationButton: false,
        forwardButton: false,
        hiddenActionButton: false,
        cls: 'p-toolbar-container',
        items: [
            {
                cls: 'p-button-back-arrow',
                itemId: 'backButtonArrow',
                pressedCls: '',
                html: ''
            },
            {
                itemId: 'navigationButton',
                text: 'Back',
                zIndex: 9,
                cls: 'p-button-back'
            },
            {
                xtype: 'spacer'
            },
            {
                itemId: 'actionButton',
                text:'Edit',
                cls: 'p-button-action'
            }
        ]
    },

    updateHiddenActionButton: function(value) {
        this.getController().setHiddenActionButton(value);
    },
    updateHiddenNavigationButton: function(value) {
        this.getController().setHiddenNavigationButton(value);
    }
});
