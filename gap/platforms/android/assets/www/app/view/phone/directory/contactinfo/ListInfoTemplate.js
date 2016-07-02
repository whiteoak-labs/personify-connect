Ext.define('Personify.view.phone.directory.contactinfo.ListInfoTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'listinfotemplatephone',
    controller: 'Personify.controller.phone.directory.contactinfo.ListInfoTemplate',
    requires: 'Personify.controller.phone.directory.contactinfo.ListInfoTemplate',

    config: {
        cls: 'p-field-info',
        style: 'border-radius: 5px;',
        itemCls: 'p-itemlist-info',
        scrollable: null,
        cls: 'p-list-info',
        disableSelection: true,
        pressedCls:'',
        store: null,
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.directory.contactinfo.ListInfoItemTemplate');

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
                }
            }
        ));

        this.callParent(arguments);
        template.destroy();
    }
});