Ext.define('Personify.model.jsonp.profile.Photos', {
    extend: 'Personify.model.base.profile.Photos',
    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'value', type: 'string', mapping: 'Value', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],

        belongsTo: 'Personify.model.jsonp.profile.Entry',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'Photos',
                name: 'Photos',
                storeName: 'ReferencePhotos',
                reader: {
                    type: 'json',
                    rootProperty: 'Photos'
                }
            }
        ]
    }
});