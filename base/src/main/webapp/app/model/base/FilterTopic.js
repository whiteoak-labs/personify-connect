Ext.define('Personify.model.base.FilterTopic', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'description', type: 'string', mapping: 'name'},
            {name: 'text', type: 'string', mapping: 'name'},
            {name: 'count', type: 'string', mapping: 'number'},
            {name: 'code', type: 'string', mapping: 'value'},
            {name: 'checked',type: 'string'}
        ]
    }
});
