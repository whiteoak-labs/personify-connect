Ext.define('Personify.controller.phone.directory.contactinfo.PhoneList', {
    extend: 'Personify.controller.profile.PhoneList',
    
    control: {
        view: {
            itemtap: 'onItemTapPhoneList'
        }
    }
});
