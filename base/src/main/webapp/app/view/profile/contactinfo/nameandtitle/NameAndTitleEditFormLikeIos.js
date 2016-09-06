Ext.define('Personify.view.profile.contactinfo.nameandtitle.NameAndTitleEditFormLikeIos', {
    extend: 'Ext.Panel',
    xtype: 'nameandtitleeditformlikeios',
    controller: 'Personify.controller.profile.NameAndTitleEditFormLikeIos',
    
    requires: [
        'Personify.controller.profile.NameAndTitleEditFormLikeIos',
        'Personify.view.profile.contactinfo.nameandtitle.NameEditFormLikeIos',
        'Personify.view.profile.contactinfo.nameandtitle.TitleEditFormLikeIos',
        'Personify.view.profile.contactinfo.nameandtitle.OrganizationEditFormLikeIos'
    ],
    config: {        
        layout: 'vbox',
        cls: 'p-panel-nameAndTitleEditForm',
        items: [
            {
                xtype: 'nameeditformlikeios',
                itemId: 'namePanel'
            },
            
            {
                xtype: 'organizationeditformlikeios',
                itemId: 'organizationPanel',
                hidden: true
            },
            {
                xtype: 'titleeditformlikeios',
                itemId: 'entryPanel'
                
            }
        ]
    }//end config
})