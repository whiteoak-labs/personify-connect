Ext.define('Personify.model.jsonp.Customer', {
    extend: 'Personify.model.base.Customer',
    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false},
            {name: 'caption', type: 'string', mapping: 'Caption', allowNull: false},
            {name: 'value', type: 'boolean', mapping: 'Value', allowNull: false},
            
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference',
                autoLoad: true,
                associationKey: 'CustomerPreferencesList',
                name: 'CustomerPreferencesList',
                storeName: 'CustomerReference',
                reader: {
                    type:'json',
                    rootProperty: 'CustomerPreferencesList'
                }
            }
        ]
    }
});