Ext.define('Personify.model.jsonp.profile.Emails', {
    extend: 'Personify.model.base.profile.Emails',
    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'emailsId', type: 'string', mapping: 'Id', allowNull: false},
            {name: 'value', type: 'string', mapping: 'Value', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false},
            {name: 'typeDesc', type: 'string', mapping: 'TypeDesc', allowNull: false},
            {name: 'primary', type: 'boolean', mapping: 'Primary', allowNull: false},
            {name: 'markForDelete', type: 'boolean', mapping: 'MarkForDelete', allowNull: false},
            {name: 'profileRoles', type: 'string', mapping: 'ProfileRoles', allowNull: false},
            {name: 'urls', type: 'string', mapping: 'Urls', allowNull: false},
            {name: 'roles', type: 'string', mapping: 'Roles', allowNull: false},
            {name: 'profileEmails', type: 'string', mapping: 'ProfileEmails', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],

        belongsTo: 'Personify.model.jsonp.profile.Entry',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'Emails',
                name: 'Emails',
                storeName: 'ReferenceEmails',
                reader: {
                    type: 'json',
                    rootProperty: 'Emails'
                }
            }
        ]
    }
});