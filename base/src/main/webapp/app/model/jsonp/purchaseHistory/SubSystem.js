Ext.define('Personify.model.jsonp.purchaseHistory.SubSystem', {
    extend: 'Personify.model.base.purchaseHistory.SubSystem',
    
    config: {
        belongsTo: 'Personify.model.jsonp.PurchaseHistory',
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'subSystem', type: 'string', mapping: 'SubSystem', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],
        associations: [
           {
               type: 'hasOne', 
               model: 'Personify.model.jsonp.Reference',
               autoLoad: true,
               associationKey: 'SubSystemList',
               name: 'SubSystemList'
           }
       ]
    }
});
