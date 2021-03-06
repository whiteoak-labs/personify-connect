Ext.define('Personify.view.phone.store.PopUpImage', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.store.PopUpImage',
    requires: 'Personify.controller.phone.store.PopUpImage',
    xtype: 'popupimage',

    config: {
        fullscreen: true,
        layout: 'vbox',
        zIndex: 20,
        items: [
           {
               xtype: 'image',
               itemId: 'imageFullScreen',
               flex: 1,
               cls: 'image-store-detail-fullscreen-phone'
           },
           {
               xtype: 'button',
               itemId: 'buttonClose'
           }
        ]
    }
});
