Ext.define('Personify.model.jsonp.Contact', {
    extend: 'Personify.model.base.Contact',
    requires: ['Personify.model.jsonp.Reference'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'email', type: 'string', mapping: 'EMail', allowNull: false},
            {name: 'contactId', type: 'string', mapping: 'ID', allowNull: false},
            {name: 'fax', type: 'string', mapping: 'Fax', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false},
            {name: 'phone', type: 'string', mapping: 'Phone', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false},
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerId', allowNull: false},
            {name: 'subCustomerId', type: 'int', mapping: 'SubCustomerId', allowNull: false},
            {name: 'activityId', type: 'int', mapping: 'ActivityId', allowNull: false},
            {name: 'activityDate', type: 'string', mapping: 'ActivityDate', allowNull: false},
            {name: 'activityText', type: 'string', mapping: 'ActivityText', allowNull: false},
            {name: 'callTypeCode', type: 'string', mapping: 'CallTypeCode', allowNull: false},
            {name: 'staffUserId', type: 'string', mapping: 'StaffUserId', allowNull: false},
            {name: 'personContacted', type: 'string', mapping: 'PersonContacted', allowNull: false},
            {name: 'keyCode', type: 'string', mapping: 'KeyCode', allowNull: false},
            {name: 'marketCode', type: 'string', mapping: 'MarketCode', allowNull: false},
            {name: 'listCode', type: 'string', mapping: 'ListCode', allowNull: false},
            {name: 'resolvedFlag', type: 'string', mapping: 'ResolvedFlag', allowNull: false},
            {name: 'resolvedDate', type: 'string', mapping: 'ResolvedDate', allowNull: false},
            {name: 'topic', type: 'string', mapping: 'Topic', allowNull: false},
            {name: 'subject', type: 'string', mapping: 'Subject', allowNull: false},
            {name: 'privateFlag', type: 'string', mapping: 'PrivateFlag', allowNull: false},
            {name: 'orgId', type: 'string', mapping: 'OrgId', allowNull: false},
            {name: 'orgUnitId', type: 'string', mapping: 'OrgUnitId', allowNull: false},
            {name: 'parentActivityId', type: 'int', mapping: 'ParentActivityId', allowNull: false},
            {name: 'followup', type: 'string', mapping: 'Followup', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],
        belongsTo: 'Personify.model.jsonp.Exhibitor',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'ContactList',
                name: 'ContactList',
                storeName: 'ReferenceContactList',
                reader: {
                    type: 'json',
                    rootProperty: 'ContactList'
                }
            },
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'ContactDetail',
                name: 'ContactDetail',
                storeName: 'ReferenceContactDetail',
                reader: {
                    type: 'json',
                    rootProperty: 'ContactDetail'
                }
            },
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'Contacts',
                name: 'Contacts',
                storeName: 'ReferenceContacts',
                reader: {
                    type: 'json',
                    rootProperty: 'Contacts'
                }
            }
        ]
    }
});