Ext.define('Personify.model.jsonp.contactlisting.ContactDetail', {
    extend: 'Personify.model.base.contactlisting.ContactDetail',
    requires: [
        'Personify.model.jsonp.Reference'
    ],
    
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
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'},
            {name: 'callTypeCode', type: 'string', mapping: 'CallTypeCode'},
            {name: 'staffUserId', type: 'string', mapping: 'StaffUserId'},
            {name: 'personContacted', type: 'string', mapping: 'PersonContacted'},
            {name: 'keyCode', type: 'string', mapping: 'KeyCode'},
            {name: 'marketCode', type: 'string', mapping: 'MarketCode'},
            {name: 'listCode', type: 'string', mapping: 'ListCode'},
            {name: 'resolvedFlag', type: 'string', mapping: 'ResolvedFlag'},
            {name: 'resolvedDate', type: 'string', mapping: 'ResolvedDate'},
            {name: 'topic', type: 'string', mapping: 'Topic'},
            {name: 'subject', type:'string', mapping: 'Subject'},
            {name: 'privateFlag', type: 'string', mapping: 'PrivateFlag'},
            {name: 'orgId', type: 'string', mapping: 'OrgId'},
            {name: 'orgUnitId', type: 'string', mapping: 'OrgUnitId'},
            {name: 'parentActivityId', type: 'string', mapping: 'ParentActivityId'},
            {name: 'followup', type: 'string', mapping: 'Followup'},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference' ,
                associationKey: 'ContactDetail',
                name: 'ContactDetail',
                storeName: 'ReferenceContactDetail',
                reader: {
                    type:'json',
                    rootProperty: 'ContactDetail'
                }
            }
        ]
    }
})