Ext.define('Personify.view.profile.contactinfo.session.SessionList', {
    extend: 'Personify.view.profile.contactinfo.ListInfoTemplate',
    xtype: 'sessionlist',
    config: {
        baseCls: 'phonelist',
        itemCls: 'phonelistitem',
        store: null,
        itemTpl: ''
    },//end config
    
    initialize: function(config) {
        this.callParent(arguments);
        this.initConfig(config);
        this.setItemTpl('<div class="p-label-valueText">{longName}</div>');
    }
});