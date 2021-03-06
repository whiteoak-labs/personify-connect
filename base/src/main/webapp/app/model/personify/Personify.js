Ext.define('Personify.model.personify.Personify', {
    extend: 'Personify.base.Model',
    requires: [
        'Personify.model.personify.Store',
        'Personify.model.personify.News',
        'Personify.model.personify.About',
        'Personify.model.personify.Config',
        'Personify.model.personify.Directory',
        'Personify.model.personify.Profile',
        'Personify.model.personify.Events',
        'Personify.model.personify.Home',
        'Personify.model.personify.Discussion'
    ],
    
    config: {
        fields: [
        ],
        associations: [
            {
                type: 'hasOne', 
                model: 'Personify.model.personify.Store',
                autoLoad: true,
                name: 'Product',
                associationKey: 'store',
                instanceName: 'ProductStore'
            },
            {
                type: 'hasOne', 
                model: 'Personify.model.personify.News',
                autoLoad: true,
                associationKey: 'news',
                name: 'News',
                instanceName: 'NewsStore'
            },
            {
                type: 'hasOne', 
                model: 'Personify.model.personify.About',
                autoLoad: true,
                associationKey: 'about',
                name: 'About',
                instanceName: 'AboutStore'
            },
            {
                type: 'hasOne', 
                model: 'Personify.model.personify.Config',
                autoLoad: true,
                associationKey: 'config',
                name: 'Config',
                instanceName: 'ConfigStore'
            },
            {
                type: 'hasOne', 
                model: 'Personify.model.personify.Directory',
                autoLoad: true,
                associationKey: 'directory',
                name: 'Directory',
                instanceName: 'DirectoryStore'
            },
            {
                type: 'hasOne', 
                model: 'Personify.model.personify.Profile',
                autoLoad: true,
                associationKey: 'profile',
                name: 'Profile',
                instanceName: 'ProfileStore'
            },
            {
                type: 'hasOne', 
                model: 'Personify.model.personify.Events',
                autoLoad: true,
                associationKey: 'events',
                name: 'Events',
                instanceName: 'EventsStore'
            },
            {
                type: 'hasOne',
                model: 'Personify.model.personify.Home',
                autoLoad: true,
                associationKey: 'home',
                name: 'Home',
                instanceName: 'HomeStore'
            },
            {
                type: 'hasOne',
                model: 'Personify.model.personify.Discussion',
                autoLoad: true,
                associationKey: 'discussion',
                name: 'Discussion',
                instanceName: 'DiscussionStore'
            }
       ]
    }
});
