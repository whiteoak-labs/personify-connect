Ext.define('Personify.model.jsonp.ProductExhibitor', {
    extend: 'Personify.model.base.ProductExhibitor',
    requires: ['Personify.model.jsonp.Reference'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'brandName', type: 'string', mapping: 'BrandName', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false}            
        ],
           
        belongsTo: 'Personify.model.jsonp.Exhibitor',
           
        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'XBTProducts',
                name: 'XBTProducts',
                storeName: 'ReferenceXBTProducts',
                reader: {
                    type: 'json',
                    rootProperty: 'XBTProducts'
                }
            }
        ]
           
    }
});
