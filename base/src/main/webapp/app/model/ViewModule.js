Ext.define('Personify.model.ViewModule', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'view',
                type: 'string'
            },
            {
                name: 'css',
                type: 'string'
            },
            {
                name: 'title',
                type: 'string'
            },
            {
            	name: 'neededLogin',
                type: 'boolean'
            },
            {
                name: 'fullscreen',
                type: 'boolean'
            },
            {
                name: 'listeners'
            }
        ]
    }
});
