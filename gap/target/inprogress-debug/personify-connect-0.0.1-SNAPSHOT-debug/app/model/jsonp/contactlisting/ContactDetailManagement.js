Ext.define('Personify.model.jsonp.contactlisting.ContactDetailManagement', {
    extend: 'Personify.model.base.contactlisting.ContactDetailManagement',
    requires: [
        'Personify.model.jsonp.contactlisting.ContactDetail',
        'Personify.model.jsonp.contactlisting.FollowUp'
    ],
    
    
    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id'},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'startIndex', type: 'string', mapping: 'StartIndex'},
            {name: 'pageSize', type: 'string', mapping: 'PageSize'},
            {name: 'totalResults', type: 'string', mapping: 'TotalResults'}
        ],
        associations: [
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.contactlisting.ContactDetail',
                associationKey: 'ContactDetail',
                name: 'ContactDetail',
                storeName: 'ContactDetailStore',
                reader: {
                    implicitIncludes: true,
                    type: 'json',
                    rootProperty: 'ContactDetail'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.contactlisting.FollowUp',
                associationKey: 'Followup',
                name: 'Followup',
                storeName: 'FollowupStore',
                reader: {
                    implicitIncludes: true,
                    type: 'json',
                    rootProperty: 'Followup'
                }
            }
        ]
    }
});
