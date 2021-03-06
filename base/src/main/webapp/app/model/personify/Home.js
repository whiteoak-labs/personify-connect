Ext.define('Personify.model.personify.Home', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            { name: 'modulesUrl', type: 'string', defaultValue: 'data/home_modules.json' },
            { name: 'notificationRefreshInterval', type: 'int', defaultValue: 30}
        ]
    }
});
