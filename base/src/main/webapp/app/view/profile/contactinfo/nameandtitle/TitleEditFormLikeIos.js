Ext.define('Personify.view.profile.contactinfo.nameandtitle.TitleEditFormLikeIos', {
    extend: 'Ext.form.Panel',
    xtype: 'titleeditformlikeios',
    controller: 'Personify.controller.profile.TitleEditFormLikeIos',
    requires: 'Personify.controller.profile.TitleEditFormLikeIos',

    config: {
        scrollable: null,
        record: null,
        items: [
            {
                xtype: 'fieldset',
                itemId: 'titleFieldSet',
                baseCls:'p-fieldset-nameeditform'
            }
        ]
    }
})
