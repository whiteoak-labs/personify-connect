Ext.define('Personify.store.offline.Presenter', {
    extend: 'Personify.store.base.Presenter',
    requires: [
        'Personify.model.jsonp.Presenter'
    ],
    
    config: {
        model: 'Personify.model.jsonp.Presenter'
    } 
});