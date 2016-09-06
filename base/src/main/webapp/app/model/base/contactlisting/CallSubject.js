Ext.define('Personify.model.base.contactlisting.CallSubject', {
    extend: 'Personify.base.Model',
    requires: [
    ],
    config:{
        fields: [
            {name: 'subsystem', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'code', type: 'string'},
            {name: 'subcode', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'option1', type: 'string'},
            {name: 'option2', type: 'string'},
            {name: 'option3', type: 'string'},
            {name: 'displayOrder', type: 'int'},
            {name: 'activeFlag', type: 'boolean'},
            {name: 'availableToWebFlag', type: 'boolean'}
        ]
    }
});
