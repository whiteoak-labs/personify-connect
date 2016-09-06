Ext.define('Personify.model.base.Map', {
    extend: 'Personify.base.Model',
    config: {
        fields : [
            {name: 'mapId', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'image', type: 'string'},
            //// Added to Set Product ID
            {name: 'productId', type: 'string'}
        ]
    }
});
