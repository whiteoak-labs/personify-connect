Ext.define('Personify.view.profile.contactinfo.email.EmailList', {
    extend: 'Personify.view.profile.contactinfo.ListInfoTemplate',
    xtype: 'emaillist',
    controller: 'Personify.controller.profile.EmailList',
    requires: 'Personify.controller.profile.EmailList',

    initialize: function() {
        this.callParent(arguments);
    }
});