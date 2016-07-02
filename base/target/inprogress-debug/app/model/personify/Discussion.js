Ext.define('Personify.model.personify.Discussion', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'url', type: 'string'},
            {name: 'vendorId', type: 'string'},
            {name: 'vendorUsername', type: 'string'},
            {name: 'vendorPassword', type: 'string'},
            {name: 'vendorBlock', type: 'string'}
        ]
    }
});
