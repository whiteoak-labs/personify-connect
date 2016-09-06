Ext.define('Personify.view.phone.directory.contactinfo.PhoneList', {
    extend: 'Personify.view.phone.directory.contactinfo.ListInfoTemplate',
    controller: 'Personify.controller.phone.directory.contactinfo.PhoneList',
    
    requires: [
        'Personify.controller.phone.directory.contactinfo.PhoneList',
        'Personify.view.phone.directory.contactinfo.ListInfoItemTemplate'
    ],
    
    initialize: function() {
        this.callParent(arguments);
    }
});