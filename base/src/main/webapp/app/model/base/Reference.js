Ext.define('Personify.model.base.Reference', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'referenceId', type: 'int'}
        ],
        belongsTo: [
            'Personify.model.base.Sesion'
            //add parent here
        ]
    }
});
