Ext.define('Personify.model.jsonp.contactlisting.FollowUp', {
    extend: 'Personify.model.base.contactlisting.FollowUp',
    
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
            {name: 'callTypeCode', type: 'string', mapping: 'CallTypeCode'},
            {name: 'staffUserId', type: 'string', mapping: 'StaffUserId'},
            {name: 'personContacted', type: 'string', mapping: 'PersonContacted'},
            {name: 'keyCode', type: 'string', mapping: 'KeyCode'},
            {name: 'marketCode', type: 'string', mapping: 'MarketCode'},
            {name: 'listCode', type: 'string', mapping: 'ListCode'},
            {name: 'resolvedFlag', type: 'string', mapping: 'ResolvedFlag'},
            {name: 'resolvedFlag', type: 'string', mapping: 'ResolvedFlag'},
            {name: 'topic', type: 'string', mapping: 'Topic'},
            {name: 'topicString', type:'string'},
            {name: 'subject', type: 'string', mapping: 'Subject'},
            {name: 'privateFlag', type: 'string', mapping: 'PrivateFlag'},
            {name: 'orgId', type: 'string', mapping: 'OrgId'},
            {name: 'orgUnitId', type: 'string', mapping: 'OrgUnitId'},
            {name: 'parentActivityId', type: 'string', mapping: 'ParentActivityId'},
            {name: 'contactDetail', type: 'string', mapping: 'ContactDetail'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference' ,
                associationKey: 'Followup',
                name: 'Followup',
                storeName: 'ReferenceFollowup',
                reader: {
                    type:'json',
                    rootProperty: 'Followup'
                }
            }
        ]
    }
})