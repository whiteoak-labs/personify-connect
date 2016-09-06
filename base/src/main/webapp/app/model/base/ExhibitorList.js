Ext.define('Personify.model.base.ExhibitorList', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'boothNos', type: 'string'},
            {name: 'exhibitionID', type: 'int'},
            {name: 'masterCustomerID', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'subCustomerID', type: 'int'},
            {name: 'status', type: 'string'},
            {name: 'imageURL', type: 'string'},
            {name: 'webSiteURL', type: 'string'},
            {name: 'isAdded', type: 'boolean', defaultValue: false}
        ]
    }
});
