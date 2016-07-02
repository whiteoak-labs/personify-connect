Ext.define('Personify.controller.phone.directory.contactinfo.WebsiteList', {
    extend: 'Personify.controller.profile.WebsiteList',
    
    control: {
        view: {
            itemtap: 'onItemTapWebsiteList'
        }
    }
});