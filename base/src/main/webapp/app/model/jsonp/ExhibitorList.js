Ext.define('Personify.model.jsonp.ExhibitorList', {
    extend: 'Personify.model.base.ExhibitorList',

    requires: ['Personify.model.jsonp.Reference'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'boothNos', type: 'string', mapping: 'BoothNos', allowNull: false},
            {name: 'exhibitionID', type: 'int', mapping: 'ExhibitionID', allowNull: false},
            {name: 'masterCustomerID', type: 'string', mapping: 'MasterCustomerID', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false},
            {name: 'subCustomerID', type: 'string', mapping: 'SubCustomerID', allowNull: false},
            {name: 'status', type: 'string', mapping: 'Status', allowNull: false},
            {name: 'imageURL', type: 'string', mapping: 'ImageURL', allowNull: false},
            {name: 'webSiteURL', type: 'string', mapping: 'WebSiteURL', allowNull: false},
            {name: 'email', type: 'string', mapping: 'Email', allowNull: false},
            {name: 'phone', type: 'string', mapping: 'Phone', allowNull: false},
            {name: 'fax', type: 'string', mapping: 'Fax', allowNull: false},
            {name: 'isAdded', type: 'boolean', defaultValue: false}
        ],
        associations: [
            {
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'ExhibitorList',
                name: 'ExhibitorList',
                storeName: 'ReferenceExhibitorList',
                reader: {
                    type: 'json',
                    rootProperty: 'ExhibitorList'
                }
            }
        ]
    }
});
