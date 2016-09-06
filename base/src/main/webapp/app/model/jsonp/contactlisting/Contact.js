Ext.define('Personify.model.jsonp.contactlisting.Contact', {
    extend: 'Personify.model.base.contactlisting.Contact',
    
    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id'},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerId'},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerId'},
            
            {name: 'activityId', type: 'string', mapping: 'ActivityId'},
            {name: 'activityDate', type: 'string', mapping: 'ActivityDate'},
            {name: 'activityText', type: 'string', mapping: 'ActivityText'},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference' ,
                associationKey: 'ContactList',
                name: 'ContactList',
                storeName: 'ReferenceContactList',
                reader: {
                    type:'json',
                    rootProperty: 'ContactList'
                }
            }
        ]
    }
})