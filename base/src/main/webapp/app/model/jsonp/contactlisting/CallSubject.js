Ext.define('Personify.model.jsonp.contactlisting.CallSubject', {
    extend: 'Personify.model.base.contactlisting.CallSubject',
    requires: [
    ],
    config:{
        fields: [
            {name: 'subsystem', type: 'string', mapping: 'Subsystem'},
            {name: 'type', type: 'string', mapping: 'Type'},
            {name: 'code', type: 'string', mapping: 'Code'},
            {name: 'subcode', type: 'string', mapping: 'Subcode'},
            {name: 'description', type: 'string', mapping: 'Description'},
            {name: 'option1', type: 'string', mapping: 'Option1'},
            {name: 'option2', type: 'string', mapping: 'Option2'},
            {name: 'option3', type: 'string', mapping: 'Option3'},
            {name: 'displayOrder', type: 'int', mapping: 'DisplayOrder'},
            {name: 'activeFlag', type: 'boolean', mapping: 'ActiveFlag'},
            {name: 'availableToWebFlag', type: 'boolean', mapping: 'AvailableToWebFlag'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.notification.MetaData' ,
                autoLoad: true,
                associationKey: '__metadata',
                name: '__metadata'
            }
        ]
    }
});
