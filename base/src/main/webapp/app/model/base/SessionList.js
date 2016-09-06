Ext.define('Personify.model.base.SessionList', {
    extend: 'Personify.base.Model',
    config: {
        fields : [
                  {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
                  {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
                  {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
                  {name: 'NoDataFound', type: 'boolean', mapping: 'NoDataFound', defaultValue: false},
                  {name: 'AccessDateTime', type: 'string', mapping: 'AccessDateTime', allowNull: false},
                  {name: 'AccessDateTimeString', type: 'string', mapping: 'strAccessDateTime', allowNull: false},
                  {name: 'StartIndex', type: 'int', mapping: 'StartIndex', allowNull: false},
                  {name: 'TotalResults', type: 'int', mapping: 'TotalResults', allowNull: false},
        ]
    }
});
