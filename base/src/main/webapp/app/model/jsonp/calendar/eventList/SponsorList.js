Ext.define('Personify.model.jsonp.calendar.eventList.SponsorList', {
    extend: 'Personify.model.base.calendar.eventList.SponsorList',
//    belongsTo: 'Personify.model.jsonp.calendar.Event',
    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerId', allowNull: false},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerId', allowNull: false},
            {name: 'sponsorName', type: 'string', mapping: 'SponsorName', allowNull: false},
            {name: 'imageURL', type: 'string', mapping: 'ImageURL', allowNull: false}
        ],

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'SponsorList',
                name: 'SponsorList',
                storeName: 'ReferenceSponsorList',
                reader: {
                    type: 'json',
                    rootProperty: 'SponsorList'
                }
            }
        ]
    }
});