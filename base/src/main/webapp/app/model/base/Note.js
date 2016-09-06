Ext.define('Personify.model.base.Note', {
    extend: 'Personify.base.Model',
    config: {
        fields : [
            {name: 'noteId', type: 'string', mapping: 'id'},
            {name: 'title', type: 'string'},
            {name: 'image', type: 'string'},
            {name: 'date', type: 'datetime', convert: function(value) {
                var d = null;
                if (value) {
                    var bits = value.split(/[-T:]/g);
                    d = new Date(bits[0], bits[1]-1, bits[2]);
                    //d.setHours(bits[3], bits[4], bits[5]);
                }
                return d;
            }},
            {name: 'description', type: 'string'}
        ]
    }
});
