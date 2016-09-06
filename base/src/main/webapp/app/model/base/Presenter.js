Ext.define('Personify.model.base.Presenter', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'id', type: 'string'},
            {name: 'img', type: 'string'},
            {name: 'displayname', type: 'string'},
            {name: 'position', type: 'string'},
            {name: 'company', type: 'string'},
            {name: 'description', type: 'string'}
            
        ]
    }
});