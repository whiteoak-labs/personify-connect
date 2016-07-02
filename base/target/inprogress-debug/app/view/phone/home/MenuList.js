Ext.define('Personify.view.phone.home.MenuList',{
    extend: 'Ext.List',
    controller: 'Personify.controller.phone.home.MenuList',
    requires: 'Personify.controller.phone.home.MenuList',
    xtype: 'menulist',
    config:{
        itemId: 'menuList',
        scrollable: true,
        itemTpl: '<div class="phone-menu-item menu-list-item-background-phone {css}">{name}</div>',
        baseCls: 'p-phone-list-menu-item',
        store:null
    }
});
