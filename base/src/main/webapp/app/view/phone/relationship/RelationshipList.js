Ext.define('Personify.view.phone.relationship.RelationshipList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'relationshiplistphone',
    controller: 'Personify.controller.phone.relationship.RelationshipList',
    
    requires: [
        'Personify.controller.phone.relationship.RelationshipList',
        'Personify.view.phone.relationship.RelationshipTemplate'
    ],
    
    config: {
        emptyText: 'No data',
        itemCls: 'p-purchasehistoryphone-item',
        cls: 'p-phone-directory-purchase-history-nodata',
        selectedCls: '',
        pressedCls: '',
        deferEmptyText: false,
        scrollable: true,
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.relationship.RelationshipTemplate');
        this.setItemTpl(new Ext.XTemplate (
            template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
})