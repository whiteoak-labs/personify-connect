Ext.define('Personify.store.UserTimelineTwitter',{
    extend: 'Personify.base.Store',
    requires:['Personify.model.twitter.UserTimeTwitter'],
    config: {
        model:'Personify.model.twitter.UserTimeTwitter'
    }
});
