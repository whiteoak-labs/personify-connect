Ext.define('Personify.controller.phone.directory.contactinfo.EmailList', {
    extend: 'Personify.controller.profile.EmailList',
    
    control: {
        view: {
            itemtap: 'onItemTapEmailList'
        }
    }
});
