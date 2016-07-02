Ext.define('Personify.model.base.EventMenu', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'view', type: 'string'},
            {name: 'css', type: 'string'},
            {name: 'needRegisterdOrStaff', type: 'boolean'},
            {name: 'menuItem', type: 'string'}
        ]
    }
});
