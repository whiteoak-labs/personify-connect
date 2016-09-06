Ext.define('Personify.model.base.MenuItem', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
             {name: 'name', type: 'string'},
             {name: 'title', type: 'string'},
             {name: 'view', type: 'string'},
             {name: 'css', type: 'string'}
        ]
    }
});
