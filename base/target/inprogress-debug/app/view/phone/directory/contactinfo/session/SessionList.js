Ext.define('Personify.view.phone.directory.contactinfo.session.SessionList', {
    extend: 'Personify.view.phone.directory.contactinfo.ListInfoTemplate',
    xtype: 'sessionlistphone',
    config: {
        store: null,
        itemTpl: ''
    },//end config
    
    initialize: function(config) {
        this.callParent(arguments);
        this.initConfig(config);
        this.setItemTpl('<div class="p-phone-session-list">{longName}</div>');
    }
});