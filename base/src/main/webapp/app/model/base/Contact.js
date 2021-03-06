Ext.define('Personify.model.base.Contact', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'contactId', type: 'string'},
            {name: 'fax', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'phone', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'int'},
            {name: 'activityId', type: 'int'},
            {name: 'activityDate', type: 'string'},
            {name: 'activityText', type: 'string'},
            {name: 'callTypeCode', type: 'string'},
            {name: 'staffUserId', type: 'string'},
            {name: 'personContacted', type: 'string'},
            {name: 'keyCode', type: 'string'},
            {name: 'marketCode', type: 'string'},
            {name: 'listCode', type: 'string'},
            {name: 'resolvedFlag', type: 'string'},
            {name: 'resolvedDate', type: 'string'},
            {name: 'topic', type: 'string'},
            {name: 'subject', type: 'string'},
            {name: 'privateFlag', type: 'string'},
            {name: 'orgId', type: 'string'},
            {name: 'orgUnitId', type: 'string'},
            {name: 'parentActivityId', type: 'int'},
            {name: 'followup', type: 'string'},
            {name: 'entityKey', type: 'string'},
            {name: 'details'}
        ]
    }
});