Ext.define('Personify.model.jsonp.contactlisting.ContactManagement', {
    extend: 'Personify.model.base.contactlisting.ContactManagement',
    requires: ['Personify.model.jsonp.contactlisting.Contact'],
    
    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id'},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            
            {name: 'pageSize', type: 'string', mapping: 'PageSize'},
            {name: 'totalResults', type: 'string', mapping: 'TotalResults'},
            {name: 'startIndex', type: 'string', mapping: 'StartIndex'}
            
        ],
        associations: [
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.contactlisting.Contact',
                associationKey: 'ContactList',
                name: 'ContactList',
                storeName: 'ContactListStore',
                reader: {
                    type: 'json',
                    rootProperty: 'ContactList'
                }
            }
        ]
    }
});
