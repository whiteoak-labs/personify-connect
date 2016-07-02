Ext.define('Personify.store.UserTimeTwitter',{
    extend: 'Personify.base.Store',
    requires:['Personify.model.twitter.UserTimeTwitter'],
    config: {
        model:'Personify.model.twitter.UserTimeTwitter',
        storeId:'UserTimeTwitter'
        
    }
});
