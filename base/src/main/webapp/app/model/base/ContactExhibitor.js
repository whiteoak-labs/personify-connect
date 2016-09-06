Ext.define('Personify.model.base.ContactExhibitor', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'email', type: 'string'},
            {name: 'contactId', type: 'string'},
            {name: 'fax', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'phone', type: 'string'},
            {name: 'type', type: 'string'}
        ]
    }
});