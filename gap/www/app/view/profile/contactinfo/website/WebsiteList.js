Ext.define('Personify.view.profile.contactinfo.website.WebsiteList', {
    extend: 'Personify.view.profile.contactinfo.ListInfoTemplate',
    xtype: 'websitelist',
    controller: 'Personify.controller.profile.WebsiteList',
    requires: 'Personify.controller.profile.WebsiteList',
    initialize: function() {
        this.callParent(arguments);
    }
});