Ext.define('Personify.view.phone.directory.contactinfo.WebsiteList', {
    extend: 'Personify.view.phone.directory.contactinfo.ListInfoTemplate',
    controller: 'Personify.controller.phone.directory.contactinfo.WebsiteList',
    
    requires: [
        'Personify.controller.phone.directory.contactinfo.WebsiteList',
        'Personify.view.phone.directory.contactinfo.ListInfoItemTemplate'
    ],
    
    initialize: function() {
        this.callParent(arguments);
    }
});