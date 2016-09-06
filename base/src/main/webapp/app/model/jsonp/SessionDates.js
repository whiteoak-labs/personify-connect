Ext.define('Personify.model.jsonp.SessionDates', {
    extend: 'Personify.base.Model',
    requires: [
        'Personify.proxy.RestService',
       'Personify.model.jsonp.Reference',
    ],
    config: {
        belongsTo: 'Personify.model.jsonp.SessionList',
        fields : [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
          {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
          {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'StartDate', type: 'string', mapping: 'StartDate', allowNull: false},
        ],
        associations: [
           {
               type: 'hasOne',
               model: 'Personify.model.jsonp.Reference',
               autoLoad: true,
               associationKey: 'SessionDates',
               name: 'SessionDates',
               storeName: 'SessionDates',
               reader: {
                   type:'json',
                   rootProperty: 'SessionDates'
           }
        }
        ]
    },
});
