Ext.define('Personify.model.jsonp.Presenter', {
    extend: 'Personify.model.base.Presenter',
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