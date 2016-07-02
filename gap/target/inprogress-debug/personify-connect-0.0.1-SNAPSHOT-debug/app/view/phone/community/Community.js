Ext.define('Personify.view.phone.community.Community', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.community.Community',
    requires: 'Personify.controller.phone.community.Community',

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Community',
                itemId: 'communityToolbar'
            },
            {
                xtype: 'label',
                html: 'Comming soon'
            }
        ]
    }
});
