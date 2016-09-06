Ext.define('Personify.view.phone.directory.contactinfo.AddressList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'addressListphone',
    requires: [
        'Personify.view.phone.directory.contactinfo.AddressItem'
    ],
    config: {
        scrollable: null,
        disableSelection: true,
        width: '100%',
        pressedCls: '',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.directory.contactinfo.AddressItem');

        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML,
            {
                isPrimaryString: function(primary) {
                    if(primary == true) {
                        return '<div class= "p-phone-directory-main">Main</div>';
                    }
                    else return '';
                },
                isDelete: function(markForDelete){
                    if(markForDelete == null || markForDelete == false || markForDelete ==""){
                        return true;
                    }else{
                        return false;
                    }
                },
                formater: function(adress){
                    if(adress == null){
                        return "";
                    }else{
                        return adress;
                    }
                },
                hasType: function(type) {
                                
                    if(type == null || type == "") {
                        return '';
                    }
                    else
                    {
                        return type.toLowerCase()=='alternatecode'?'AlternateDESC':type;
                    }
                                          }
            }
        ));

        this.callParent(arguments);
        template.destroy();
    }
});
