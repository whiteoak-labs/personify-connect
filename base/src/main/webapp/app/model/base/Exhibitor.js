Ext.define('Personify.model.base.Exhibitor', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'boothNos', type: 'string'},
            {name: 'exhibitionID', type: 'int'},
            {name: 'exhibitionParentCode', type: 'string'},
            {name: 'exhibitionProductCode', type: 'string'},
            {name: 'masterCustomerID', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'subCustomerID', type: 'int'},
            {name: 'status', type: 'string'},
            {name: 'imageURL', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'phone', type: 'string'},
            {name: 'webSiteURL', type: 'string'},
            {name: 'directoryDescription', type: 'string'},
            {name: 'fax', type: 'string'},
            {name: 'isAdded', type: 'boolean', defaultValue: false}
        ]
    }
});
