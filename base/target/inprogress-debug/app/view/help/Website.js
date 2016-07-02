Ext.define('Personify.view.help.Website', {
    extend: 'Ext.Panel',
    requires: 'Personify.view.profile.contactinfo.website.WebsiteList',
    xtype: 'websitePanel', 
    
    config: {
        title: 'Websites:',
        flex: 1,
        items:[
            {
                itemId: 'websitesTitle',
                html: 'Websites: <hr class="helpHR"/>',
                cls: 'aboutAPAHeaders'
            },
            {
                xtype: 'websitelist',
                itemId: 'websiteList'
            }
        ]
    },

    updateTitle: function(title) {
        this.down('#websitesTitle').setHtml(title + ' <hr class="helpHR"/>');
    },

    updateStore: function(store) {
        this.down('#websiteList').setStore(store);
    }
});
