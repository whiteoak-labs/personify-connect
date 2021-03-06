Ext.define('Personify.view.profile.contactinfo.photo.PhotoFrame', {
    extend: 'Ext.dataview.DataView',
    xtype: 'photoframe',
    config: {
        store: null,
        itemTpl: new Ext.XTemplate('<img src="{[this.checkNull(values.value)]}" width="100" height="100">',
        {
            checkNull: function(value) {
                if (value == null){
                    return "resources/image/directory/defaultAvatar.png";
                } else {
                    return value;
                }
            }
        }
        )
    },
    initialize: function() {
        this.callParent(arguments);
    }
});