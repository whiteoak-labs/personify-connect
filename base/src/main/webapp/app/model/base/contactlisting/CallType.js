Ext.define('Personify.model.base.contactlisting.CallType', {
    extend: 'Personify.base.Model',
    requires: [
    ],
    config:{
        fields: [
            {name: 'subsystemString', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'code', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'option1', type: 'string'},
            {name: 'option2', type: 'string'},
            {name: 'option3', type: 'string'},
            {name: 'option4', type: 'string'},
            {name: 'availableToWebFlag', type: 'boolean'},
            {name: 'displayOrder', type: 'int'},
            {name: 'activeFlag', type: 'boolean'},
            {name: 'helpText', type: 'string'},
            {name: 'option5', type: 'string'},
            {name: 'option6', type: 'string'}
        ]
    }
});
