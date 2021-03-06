Ext.define('Personify.model.jsonp.DirectoryManagement', {
    extend: 'Personify.model.base.DirectoryManagement',
    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'pageSize', type: 'string', mapping: 'PageSize'},
            {name: 'totalResults', type: 'string', mapping: 'TotalResults'},
            {name: 'startIndex', type: 'string', mapping: 'StartIndex'}
        ],
        associations: [
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.Directory',
                associationKey: 'DirectoryResultsList',
                name: 'DirectoryResultsList',
                storeName: 'DirectoryStore',
                reader: {
                    type: 'json',
                    rootProperty: 'DirectoryResultsList'
                }
            }
        ]
    }
});