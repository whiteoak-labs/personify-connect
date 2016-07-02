Ext.define('Personify.model.jsonp.calendar.eventList.MaterialList', {
    extend: 'Personify.model.base.calendar.eventList.MaterialList',
//    belongsTo: 'Personify.model.jsonp.calendar.Event',
    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'materialListId', type: 'string', mapping: 'Id', allowNull: false},
            {name: 'title', type: 'string', mapping: 'Title', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'url', type: 'string', mapping: 'URL', allowNull: false},
            {name: 'titleParent', type: 'string'}
        ],

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'MaterialList',
                name: 'MaterialList',
                storeName: 'ReferenceMaterialList',
                reader: {
                    type: 'json',
                    rootProperty: 'MaterialList'
                }
            }
        ]
    }
});