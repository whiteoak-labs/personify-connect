Ext.define('Personify.view.help.Email', {
    extend: 'Ext.Panel',
    requires: 'Personify.view.profile.contactinfo.email.EmailList',
    xtype: 'emailPanel', 
    
    config: {
        items:[
            {
                html: 'Email <hr class="helpHR"/>',
                cls: 'aboutAPAHeaders',
                itemId: 'emailTitle'
            },
            {
                xtype: 'emaillist',
                itemId: 'emailList',
                cls: 'p-about-information'
            }
        ]
    },

    updateStore: function(store) {
        this.down('#emailList').setStore(store);
    },

    updateTitle: function(title) {
        this.down('#emailTitle').setHtml(title + '<hr class="helpHR"/>');
    }
});
