Ext.define('Personify.model.jsonp.Inquiry', {
    extend: 'Personify.model.base.Inquiry',
    
    config: {
        fields: [
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'newActivityId', type: 'string', mapping: 'NewActivityId'}
        ]
    }
});
