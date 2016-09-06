Ext.define('Personify.model.jsonp.ContactExhibitor', {
    extend: 'Personify.model.base.ContactExhibitor',
    requires: ['Personify.model.jsonp.Reference'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'email', type: 'string', mapping: 'EMail', allowNull: false},
            {name: 'contactId', type: 'string', mapping: 'ID', allowNull: false},
            {name: 'fax', type: 'string', mapping: 'Fax', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false},
            {name: 'phone', type: 'string', mapping: 'Phone', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false}
        ],
        belongsTo: 'Personify.model.jsonp.Exhibitor',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'XBTContacts',
                name: 'XBTContacts',
                storeName: 'ReferenceXBTContacts',
                reader: {
                    type: 'json',
                    rootProperty: 'XBTContacts'
                }
            }
        ]
    }
});