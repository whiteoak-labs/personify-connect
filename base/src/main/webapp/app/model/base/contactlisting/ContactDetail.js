Ext.define('Personify.model.base.contactlisting.ContactDetail', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            
            {name: 'activityId', type: 'string'},
            {name: 'activityDate', type: 'string'},
            {name: 'activityText', type: 'string'},
            {name: 'entityKey', type: 'string'},
            {name: 'callTypeCode', type: 'string'},
            {name: 'staffUserId', type: 'string'},
            {name: 'personContacted', type: 'string'},
            {name: 'keyCode', type: 'string'},
            {name: 'marketCode', type: 'string'},
            {name: 'listCode', type: 'string'},
            {name: 'resolvedFlag', type: 'string'},
            {name: 'resolvedDate', type: 'string'},
            {name: 'topic', type: 'string'},
            {name: 'subject', type:'string'},
            {name: 'privateFlag', type: 'string'},
            {name: 'orgId', type: 'string'},
            {name: 'orgUnitId', type: 'string'},
            {name: 'parentActivityId', type: 'string'},
            {name: 'followup', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
})