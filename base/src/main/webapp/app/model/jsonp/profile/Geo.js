Ext.define('Personify.model.jsonp.profile.Geo', {
    extend: 'Personify.model.base.profile.Geo',
    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'latitude', type: 'string', mapping: 'Latitude', allowNull: false},
            {name: 'longitude', type: 'string', mapping: 'Longitude', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],

        belongsTo: 'Personify.model.jsonp.profile.Addresses',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'Geo',
                name: 'Geo',
                storeName: 'ReferenceGeo',
                reader: {
                    type: 'json',
                    rootProperty: 'Geo'
                }
            }
        ]
    }
});