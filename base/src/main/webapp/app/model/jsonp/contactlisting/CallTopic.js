Ext.define('Personify.model.jsonp.contactlisting.CallTopic', {
    extend: 'Personify.model.base.contactlisting.CallTopic',
    requires: [
    ],
    config:{
        fields: [
            {name: 'subsystemString', type: 'string', mapping: 'SubsystemString'},
            {name: 'type', type: 'string', mapping: 'Type'},
            {name: 'code', type: 'string', mapping: 'Code'},
            {name: 'description', type: 'string', mapping: 'Description'},
            {name: 'option1', type: 'string', mapping: 'Option1'},
            {name: 'option2', type: 'string', mapping: 'Option2'},
            {name: 'option3', type: 'string', mapping: 'Option3'},
            {name: 'option4', type: 'string', mapping: 'Option4'},
            {name: 'availableToWebFlag', type: 'boolean', mapping: 'AvailableToWebFlag'},
            {name: 'displayOrder', type: 'int', mapping: 'DisplayOrder'},
            {name: 'activeFlag', type: 'boolean', mapping: 'ActiveFlag'},
            {name: 'helpText', type: 'string', mapping: 'HelpText'},
            {name: 'option5', type: 'string', mapping: 'Option5'},
            {name: 'option6', type: 'string', mapping: 'Option6'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.notification.MetaData' ,
                autoLoad: true,
                associationKey: '__metadata',
                name: '__metadata'
            },
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.country.Deferred' ,
                autoLoad: true,
                associationKey: 'ApplicationSubcode',
                name: 'ApplicationSubcode'
            }
        ]
    }
});
