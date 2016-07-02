Ext.define('Personify.model.jsonp.calendar.LocationList', {
    extend: 'Personify.model.base.calendar.LocationList',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'code', type: 'string', mapping: 'Code', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'count', type: 'string', mapping: 'Count', allowNull: false}
        ]
    }
});