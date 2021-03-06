Ext.define('Personify.view.help.Settings',{
    extend: 'Ext.Container',
    controller: 'Personify.controller.help.Settings',
    requires: [
        'Personify.controller.help.Settings'
    ],
    config:{
        zIndex: 10,
        right: 0,
        top: 50,
        cls: 'helpPanel panel-left',
        layout: 'vbox',
        showAnimation: {
            type: 'slide'
        },
        items:[
            {
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'center'
                },
                cls: 'filterClosePanel',
                docked: 'top',
                items: [
                    {
                        html: 'Settings Page'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        cls: 'p-close-button',
                        text: 'X',
                        listeners: {
                            tap: function() {
                                this.parent.parent.hide();
                            }
                        }
                    }
                ]
            },
            {
                layout: 'hbox',
                items:[
                    {
                        html: 'Config ID: ',
                        cls: 'p-label-title',
                        style: 'margin-top: 6px;'
                    },
                    {
                        xtype: 'fieldset',
                        flex:1,
                        cls: 'p-fieldset-settingsapp47id',
                        items: [
                            {
                                xtype: 'textfield',
                                cls: 'nameAndTitleEditText',
                                itemId: 'settingOption'
                            }
                        ]
                    }
                ]
            },
            {
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        cls: 'p-button-applysettings',
                        pressedCls: 'red-button-pressing-background',
                        text: 'Apply',
                        itemId: 'applysetting'
                    }
                ]
            }
        ]
    }
});