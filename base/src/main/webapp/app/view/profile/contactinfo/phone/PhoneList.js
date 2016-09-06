Ext.define('Personify.view.profile.contactinfo.phone.PhoneList', {
    extend: 'Personify.view.profile.contactinfo.ListInfoTemplate',
    xtype: 'phonelist',
    controller: 'Personify.controller.profile.PhoneList',
    requires: [
        'Personify.controller.profile.PhoneList',
        'Personify.store.jsonp.profile.PhoneNumbers'
    ],
    initialize: function() {
        this.callParent(arguments);
    }
});