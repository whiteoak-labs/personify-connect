Ext.define('Personify.view.profile.DisplayOptionItem',{
    extend: 'Ext.Button',
    xtype: 'displayoptionitem',
    requires: ['Ext.Button'],

    config: {
        text: '{name}',
        labelCls: '{cls}'
    }
});