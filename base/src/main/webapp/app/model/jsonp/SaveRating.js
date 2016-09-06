Ext.define('Personify.model.jsonp.SaveRating', {
    extend: 'Personify.model.base.SaveRating',
    config: {
        fields: [
            {name: 'ratingId', type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', mapping: 'InternalKey'},
            {name: 'navigationKey', mapping: 'NavigationKey'},
            {name: 'productStarRatingId', type: 'string', mapping: 'ProductStarRatingId'}
            ]
    }
});