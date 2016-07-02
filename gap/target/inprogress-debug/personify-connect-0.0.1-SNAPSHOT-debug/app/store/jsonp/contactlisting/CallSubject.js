Ext.define('Personify.store.jsonp.contactlisting.CallSubject', {
    extend: 'Personify.store.base.contactlisting.CallSubject',
    requires: 'Personify.model.jsonp.contactlisting.CallSubject',
    
    config: {
        model: 'Personify.model.jsonp.contactlisting.CallSubject',
        haveData: false,
        autoLoad: true,
        implicitIncludes: true
    }
});
