Ext.define('Personify.model.jsonp.user.Geo', {
    extend: 'Personify.model.base.user.Geo',

    config: {
        belongsTo: 'Personify.model.jsonp.user.Address'
    }
});