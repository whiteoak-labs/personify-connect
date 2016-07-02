Ext.define('Personify.model.base.profile.NameCodeList', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'id', type: 'string'},
            {name: 'code', type: 'string'},
            {name: 'description', type: 'string'}
        ]
    }
});