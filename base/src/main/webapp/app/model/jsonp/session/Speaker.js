Ext.define('Personify.model.jsonp.session.Speaker', {
    extend: 'Personify.model.base.session.Speaker',
    requires:[
        'Personify.proxy.RestService'
    ],
    config: {
        belongsTo: 'Personify.model.jsonp.Session'
    }
});