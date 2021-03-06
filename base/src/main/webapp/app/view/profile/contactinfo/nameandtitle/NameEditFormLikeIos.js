Ext.define('Personify.view.profile.contactinfo.nameandtitle.NameEditFormLikeIos', {
    extend: 'Ext.form.Panel',
    xtype: 'nameeditformlikeios',
    controller: 'Personify.controller.profile.NameEditFormLikeIos',
    requires: 'Personify.controller.profile.NameEditFormLikeIos',

    config: {
        scrollable: null,
        record: null,
        items: [
            {
                xtype: 'fieldset',
                itemId: 'nameFieldSet',
                baseCls:'p-fieldset-nameeditform'
            }
        ]
    }
});
