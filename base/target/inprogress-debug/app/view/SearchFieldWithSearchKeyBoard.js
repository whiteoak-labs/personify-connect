Ext.define("Personify.view.SearchFieldWithSearchKeyBoard",{
    extend: 'Ext.field.Search',
    xtype: 'searchfieldwithsearchkeyboard',
    controller: 'Personify.controller.phone.common.SearchFieldWithSearchKeyBoard',
    requires: 'Personify.controller.phone.common.SearchFieldWithSearchKeyBoard',

    getElementConfig: function() {
        var tpl = this.callParent();
        tpl.tag = 'form';
        tpl.onsubmit = 'return false;';
        return tpl;
    }
});