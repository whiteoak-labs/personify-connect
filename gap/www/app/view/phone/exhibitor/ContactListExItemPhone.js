Ext.define('Personify.view.phone.exhibitor.ContactListExItemPhone', {
    extend: 'Ext.dataview.List',
    xtype: 'contactListExItemPhone',
    requires: 'Personify.view.phone.exhibitor.ContactItemExItemPhone',

    config: {
        baseCls: 'productListExItemPhone',
        scrollable: true,
        emptyText: '<div class = "p-emptyText-phone">No Contact</div>',
        deferEmptyText: false,
        disableSelection : true,
        pressedCls: 'productListExItem-item-pressed',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.exhibitor.ContactItemExItemPhone');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
});
