Ext.define('Personify.view.profile.DisplayOption',{
    extend: 'Ext.Panel',
    alias: 'widget.displayoption',
    controller:'Personify.controller.profile.DisplayOption',

    requires: [
        'Personify.controller.profile.DisplayOption',
        'Personify.view.profile.DisplayOptionItem',
        'Ext.DataView',
        'Personify.store.base.profile.ProfileDisplayOption',
        'Personify.view.profile.ToggleOption'
    ],

    config: {
        cls: 'displayoption panel-left',
        layout: 'vbox',
        items: [
            {
                xtype: 'label',
                cls: 'p-label-title p-label-displayoption',
                html: 'Profile Display Options'
            },
            {/* List of Display Option Items */
                xtype:'dataview',
                itemId: 'optionList',
                scrollable: null,
                itemTpl: null,
                cls: 'displayoption-list panel-left',
                selectedCls:'profile-button-content-selected',
                pressedCls: 'profile-button-content-pressed',
                itemCls: 'profile-list-item',
                store:null
            },
            {
                layout:'vbox',
                items:[
                    {
                        xtype: 'button',
                        text: 'Go to My Online Profile',
                        itemId: 'goOnlineProfile',
                        cls: 'goOnlineProfileButton'
                    },
                    {
                        xtype: 'button',
                        text: 'Logout',
                        itemId: 'logoutButton',
                        cls: 'logoutProfileButon'
                    }
                ]
            },
            {
                xtype: 'toggleoption',
                itemId: 'toggleOption'
            }
         ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.profile.DisplayOptionItem');
        this.down("#optionList").setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
});
