Ext.define('Personify.model.base.ProductExhibitor', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'brandName', type: 'string'},
            {name: 'description', type: 'string'}           
        ]
    }
});