Ext.define('Personify.model.base.country.Entry', {
    extend: 'Personify.base.Model',
    
    config: {
        belongsTo: 'Personify.model.base.Country',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'updated', type: 'string'},
            {name: 'link', type: 'string'},
            {name: 'category', type: 'string'}
        ]/*,
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.notification.Author' ,
                autoLoad: true,
                associationKey: 'author',
                name: 'author'
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.base.notification.Content' ,
                autoLoad: true,
                associationKey: 'content',
                name: 'content'
            }
        ]*/
    }
});