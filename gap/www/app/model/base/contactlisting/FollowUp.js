Ext.define('Personify.model.base.contactlisting.FollowUp', {
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
            {name: 'callTypeCode', type: 'string'},
            {name: 'staffUserId', type: 'string'},
            {name: 'personContacted', type: 'string'},
            {name: 'keyCode', type: 'string'},
            {name: 'marketCode', type: 'string'},
            {name: 'listCode', type: 'string'},
            {name: 'resolvedFlag', type: 'string'},
            {name: 'resolvedFlag', type: 'string'},
            {name: 'topic', type: 'string'},
            {name: 'topicString', type:'string'},
            {name: 'subject', type: 'string'},
            {name: 'privateFlag', type: 'string'},
            {name: 'orgId', type: 'string'},
            {name: 'orgUnitId', type: 'string'},
            {name: 'parentActivityId', type: 'string'},
            {name: 'contactDetail', type: 'string'}
        ]
    }
});
