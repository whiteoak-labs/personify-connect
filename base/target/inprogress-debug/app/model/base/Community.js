Ext.define('Personify.model.base.Community', {
    extend: 'Personify.base.Model',
    config: {
        fields : [
            {name: 'message', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'type', type: 'string'}
        ]
    }
});
