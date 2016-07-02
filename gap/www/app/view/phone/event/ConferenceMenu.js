Ext.define('Personify.view.phone.event.ConferenceMenu', {
    extend: 'Ext.Panel',
    xtype: 'menueventPanelPhone',
    controller: 'Personify.controller.phone.event.ConferenceMenu',
    
    requires: [
        'Personify.controller.phone.event.ConferenceMenu',
        'Personify.view.phone.common.Toolbar'
    ],
    config: {
        layout: 'vbox',
        cls: 'p-phone-container-conference-background',
        record: null,
        store: null,
        title: null,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'menuToolbar'
            },
            {
                xtype: 'container',
                cls: 'p-phone-taug-panel',
                layout: 'hbox',
                items:[
                    {
                        xtype: 'img',
                        cls: 'p-phone-conference-taug-image',
                        itemId: 'imageEvent',
                        width: 50,
                        height: 50,
                        style: 'background-size: 100%'
                    },
                    {
                        xtype: 'panel',
                        flex: 5,
                        layout: {
                            type: 'vbox',
                            pack: 'center'
                        },
                        items: [
                            {
                                height: 35,
                                xtyle: 'label',
                                cls: 'p-phone-titleEvent',
                                itemId: 'titleEventOfConferenceMenu'
                            }
                        ]
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'dataview',
                itemId: 'menuList',
                itemTpl: '<div class="p-phone-conference-item conference-item-background {css}">{name}</div>',
                baseCls: 'p-phone-conference-list',
                scrollable: true
            },
            {
                height: 45,
                xtype: 'carousel',
                itemId: 'sponsorCarousel',
                cls: 'sponsor-carousel',
                hidden: true
            }
        ]
    }//end config
});