Ext.define('Personify.model.jsonp.profile.Organization', {
    extend: 'Personify.model.base.profile.Organization',
    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false},
            {name: 'department', type: 'string', mapping: 'Department', allowNull: false},
            {name: 'title', type: 'string', mapping: 'Title', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false},
            {name: 'typeDesc', type: 'string', mapping: 'TypeDesc', allowNull: false},
            {name: 'startDate', type: 'string', mapping: 'StartDate', allowNull: false},
            {name: 'endDate', type: 'string', mapping: 'EndDate', allowNull: false},
            {name: 'location', type: 'string', mapping: 'Location', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],

        belongsTo: 'Personify.model.jsonp.profile.Entry',

        associations: [
            {
            	type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'Organization',
                name: 'Organization',
                storeName: 'ReferenceOrganization',
                reader: {
                    type: 'json',
                    rootProperty: 'Organization'
                }
            }
        ]
    }
});