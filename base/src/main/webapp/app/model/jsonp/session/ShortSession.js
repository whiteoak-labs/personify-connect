Ext.define('Personify.model.jsonp.session.ShortSession', {
    extend: 'Personify.model.base.session.ShortSession',
    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id'},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'sessionId', type: 'int', mapping: 'SessionId'},
            {name: 'shortName', type: 'string', mapping: 'ShortName'},
            {name: 'longName', type: 'string', mapping: 'LongName'}
        ],
        association: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'SessionList',
                name: 'SessionList',
                storeName: 'ReferenceSessionList',
                reader: {
                    type: 'json',
                    rootProperty: 'SessionList'
                }
            }
        ]
    }
});