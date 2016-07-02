Ext.define('Personify.view.profile.contactinfo.address.AddressList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'addressList',
    requires: [
        'Personify.view.profile.contactinfo.address.AddressItem'
    ],
    config: {
        baseCls: 'addressList',
        itemCls: 'addressListItem',
        scrollable: null,
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.profile.contactinfo.address.AddressItem');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML,
            {
                isPrimaryString: function(primary) {
                    if(primary == true) {
                        return '<div class="p-div-profile-address-main">Main</div>';
                    }
                    else return '';
                },
                isDelete: function(markForDelete){
                    if(markForDelete == null || markForDelete == false || markForDelete ==""){
                        return true;
                    } else {
                        return false;
                    }
                },
                formater: function(adress){
                    if(adress == null){
                        return "";
                    } else {
                        return adress;
                    }
                }
            }
        ));
        this.callParent(arguments);
        template.destroy();
    }
});
