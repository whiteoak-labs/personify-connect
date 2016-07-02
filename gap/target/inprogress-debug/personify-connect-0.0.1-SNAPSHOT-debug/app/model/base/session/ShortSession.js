Ext.define('Personify.model.base.session.ShortSession', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'sessionId', type: 'int'},
            {name: 'shortName', type: 'string'},
            {name: 'longName', type: 'string'}
        ]
    }
});