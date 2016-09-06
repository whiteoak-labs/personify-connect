Ext.define('Personify.model.jsonp.SessionList', {
    extend: 'Personify.model.base.SessionList',
    requires: [
        'Personify.proxy.RestService',
        'Personify.model.jsonp.Session',
        'Personify.model.jsonp.SessionDates',       
    ],
    config: {
        useCache: false,
        fields : [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
          {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
          {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
          {name: 'NoDataFound', type: 'boolean', mapping: 'NoDataFound', defaultValue: false},
            {name: 'AccessDateTime', type: 'string', mapping: 'AccessDateTime', allowNull: false},
            {name: 'AccessDateTimeString', type: 'string', mapping: 'strAccessDateTime', allowNull: false},
            {name: 'StartIndex', type: 'int', mapping: 'StartIndex', allowNull: false},
            {name: 'TotalResults', type: 'int', mapping: 'TotalResults', allowNull: false},
        ],
        associations: [
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.Session',
                autoLoad: true,
                associationKey: 'SessionList',
                name: 'SessionList',
                storeName: 'SessionsStore',
                reader: {
                    type:'json',
                    rootProperty: 'SessionList'
                }
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.SessionDates',
                autoLoad: true,
                associationKey: 'SessionDates',
                name: 'SessionDates',
                storeName: 'SessionDatesStore',
                reader: {
                    type:'json',
                    rootProperty: 'SessionDates'
                }
            },
        ]
    },
});
