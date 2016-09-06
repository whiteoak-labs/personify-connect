Ext.define('Personify.model.base.ICalendar', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'productID', type: 'string'}
        ]
    }
});
