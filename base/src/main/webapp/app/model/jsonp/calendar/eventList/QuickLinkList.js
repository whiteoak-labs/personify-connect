Ext.define('Personify.model.jsonp.calendar.eventList.QuickLinkList', {
    extend: 'Personify.model.base.calendar.eventList.QuickLinkList',

    config: {
         fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'quicklinkId', type: 'string', mapping: 'Id', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'url', type: 'string', mapping: 'URL', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false}
        ],

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'QuickLinkList',
                name: 'QuickLinkList',
                storeName: 'ReferenceQuickLinkList',
                reader: {
                    type: 'json',
                    rootProperty: 'QuickLinkList'
                }
            }
        ]
    }
});