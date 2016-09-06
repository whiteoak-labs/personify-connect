Ext.define('Personify.model.jsonp.Staff', {
    extend: 'Personify.model.base.Staff',
    requires: ['Personify.proxy.RestService'],
    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'staffId', type: 'string', mapping: 'StaffId', allowNull: false},
            {name: 'staffName', type: 'string', mapping: 'StaffName', allowNull: false}
            
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference',
                autoLoad: true,
                associationKey: 'StaffList',
                name: 'StaffList',
                storeName: 'StaffReference',
                reader: {
                    type:'json',
                    rootProperty: 'StaffList'
                }
            }
        ]
    }
});