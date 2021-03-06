Ext.define('Personify.model.base.ModuleConfiguration', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'view', type: 'string'},
            {name: 'css', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'neededLogin', type: 'boolean'},
            {name: 'listeners'},
            {name: 'logged', type: 'boolean'},
            {name: 'notLogged', type: 'boolean'}
        ]
    }
});