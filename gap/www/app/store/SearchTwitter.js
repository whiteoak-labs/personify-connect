Ext.define('Personify.store.SearchTwitter',{
    extend: 'Personify.base.Store',
    requires:['Personify.model.twitter.SearchListTwitter'],
    config: {
        model:'Personify.model.twitter.SearchListTwitter',
        storeId:'SearchTwitter'
        
    }
});
