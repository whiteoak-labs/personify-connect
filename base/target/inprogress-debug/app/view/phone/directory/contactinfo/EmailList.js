Ext.define('Personify.view.phone.directory.contactinfo.EmailList', {
    extend: 'Personify.view.phone.directory.contactinfo.ListInfoTemplate',
    controller: 'Personify.controller.phone.directory.contactinfo.EmailList',

    requires: [
        'Personify.controller.phone.directory.contactinfo.EmailList',
        'Personify.view.phone.directory.contactinfo.ListInfoItemTemplate'
    ],
    
    initialize: function() {
        this.callParent(arguments);
    }
});