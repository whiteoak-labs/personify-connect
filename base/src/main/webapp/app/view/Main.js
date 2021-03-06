Ext.define('Personify.view.Main', {
    extend: 'Ext.Panel',
    controller: 'Personify.controller.Main',
    xtype: 'mainview',

    requires: [
        'Personify.controller.Main',
        'Personify.view.Home',
        'Personify.view.Login',
        'Personify.view.main.MenuBar',
        'Personify.view.Help'
    ],

    config: {
        itemId: 'mainView',
        cls: 'p-body-class',
        layout: 'vbox',
        items: [
            {
                itemId: 'headerPanel',
                layout:'hbox',
                cls: 'headerPanel',
                items:[
                    {
                        itemId:'connectButton',
                        xtype:'button',
                        docked:'left',
                        cls:'p-button-headerconnect',
                        pressedCls: 'p-button-pressing-opacity'
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'center'
                        },
                        flex: 1,
                        items: [
                            {
                                flex: 1,
                                layout: {
                                    type: 'vbox',
                                    align: 'end',
                                    pack: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'image',
                                        itemId: 'iconHeader',
                                        src: '',
                                        cls: 'p-image-iconheaderurl homemenuitem'

                                    }
                                ]
                            },
                            {
                                itemId: 'labelTitle',
                                xtype: 'label',
                                cls: 'labelTitleHeaderPanel',
                                html: 'Main'
                            },
                            {
                                flex: 1,
                                html: ''
                            }
                        ]
                    },
                    {
                        itemId: 'loginPanel',
                        xtype: 'login',
                        width: '80px'
                    }
                ],
                margin: '0px',
            },
            {
                itemId: 'viewPanel',
                xtype: 'panel',
                cls: 'p-panel-main-content',
                layout: 'fit',
                flex: 100,
                style: 'margin-bottom: 52px;',
                items: [
                    {
                        xtype: 'homeview'
                    }
                ]
            },
            {
                xtype: 'menubar',
                itemId: 'menuBar',
                docked: 'bottom'
            }
        ]
    }
});
