Ext.define('Personify.view.phone.directory.contactinfo.nameandtitle.NameEditForm', {
    extend: 'Ext.form.Panel',
    xtype: 'nameeditformlikeiosphone',
    controller: 'Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.NameEditForm',
    requires: 'Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.NameEditForm',

    config: {
        scrollable: null,
        record: null,
        items: [
            {
                xtype: 'fieldset',
                cls:'p-phone-fieldset-directory-nameandtitleform',
                itemId: 'nameFieldSet'
            }
        ]
    }
});
