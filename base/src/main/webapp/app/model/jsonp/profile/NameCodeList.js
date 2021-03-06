Ext.define('Personify.model.jsonp.profile.NameCodeList', {
    extend: 'Personify.model.base.profile.NameCodeList',

    config: {
        fields: [
            {name: 'id', type: 'string', mapping: '$id', allowNull: false},
            {name: 'code', type: 'string', mapping: 'Code', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false}
        ]
    }
});
