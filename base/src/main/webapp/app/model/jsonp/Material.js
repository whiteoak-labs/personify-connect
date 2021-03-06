Ext.define('Personify.model.jsonp.Material', {
    extend: 'Personify.model.base.Material',
    
    config: {
        fields: [
            {name: 'description', type: 'string', mapping: 'description', allowNull: false},
            {name: 'title', type: 'string', mapping: 'title', allowNull: false}
        ]
    }
});
