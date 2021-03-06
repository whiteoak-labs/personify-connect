Ext.define('Personify.view.phone.directory.contactinfo.nameandtitle.TitleEditForm', {
    extend: 'Ext.form.Panel',
    xtype: 'titleeditformlikeiosphone',
    controller: 'Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.TitleEditForm',
    requires: 'Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.TitleEditForm',

    config: {
        scrollable: null,
        cls:'p-phone-fieldset-directory-nameandtitleform',
        record: null,
        items: [
            {
                xtype: 'fieldset',
                cls:'p-phone-field-directory-editform',
                itemId: 'titleFieldSet'
            }
        ]
    }
})
