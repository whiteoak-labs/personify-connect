Ext.define('Personify.store.jsonp.Material', {
    extend: 'Personify.store.base.Material',
    
    config: {
        storeId: 'Material',
        model: 'Personify.model.jsonp.Material',
        
        autoLoad: true,
        data: [
            {
                description: 'Session: Session number one',
                title: 'Key note number one'
            },
            {
                description: 'Session: Session number two',
                title: 'Key note number two'
            },
            {
                description: 'Session: Session number three',
                title: 'Key note number three'
            },
            {
                description: 'Session: Session number four',
                title: 'Key note number four'
            }
        ]
    }
});


