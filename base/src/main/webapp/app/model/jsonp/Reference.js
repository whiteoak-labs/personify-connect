Ext.define('Personify.model.jsonp.Reference', {
    extend: 'Personify.model.base.Reference',
    requires:[
        'Personify.proxy.RestService'
    ],
    config: {
        fields: [
            {name: 'referenceId', type: 'int', mapping: '$ref', allowNull: false}
        ],
        belongsTo: [
            //add parents here
            'Personify.model.jsonp.Sesion',
            'Personify.model.jsonp.session.FloorPlan',
            'Personify.model.jsonp.session.Speaker',
            'Personify.model.jsonp.session.Track',
            'Personify.model.jsonp.session.Coord'
        ]
    }
});
